import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { GeminiExtractor } from '@/lib/scraping/llm/geminiExtractor';

/**
 * GLOSSARY RESOLUTION HELPER
 * Resolves acronyms using KnowledgeGlossary + Autonomous Learning fallback.
 */
async function resolve_terms(input: string | string[], extractor?: GeminiExtractor) {
  const terms = Array.isArray(input) ? input : [input];
  
  // 1. Load current glossary
  let glossary: any[] = [];
  try {
    const p = prisma as any;
    const glossaryModel = p.knowledgeGlossary || p.KnowledgeGlossary;
    if (glossaryModel) glossary = await glossaryModel.findMany();
  } catch (e) {}
  
  return await Promise.all(terms.map(async (t) => {
    if (!t) return "";
    const termStr = String(t).toLowerCase().trim();
    
    // a) Check Glossary
    const entry = glossary.find((g: any) => g?.term?.toLowerCase() === termStr);
    if (entry) return entry.expansion;

    // b) UNIVERSAL AUTO-LEARN: If it's a short acronym, try to expand it via AI
    if (extractor && t.length < 10 && !t.includes(' ')) {
      console.log(`[Beacon AI] Unrecognized short-form "${t}". Attempting universal expansion...`);
      try {
        const model = (extractor as any).genAI.getGenerativeModel({ 
          model: process.env.LLM_MODEL_CHAT || "gemini-2.5-flash",
          generationConfig: { responseMimeType: "application/json" }
        });
        const prompt = `Identify the full formal name of the academic institution or major/subject referred to as "${t}". 
        Return JSON: {"fullName": "...", "type": "college" | "subject" | "other"}
        If you are unsure, set fullName to "UNKNOWN".`;
        
        const res = await model.generateContent(prompt);
        const data = JSON.parse((await res.response).text());
        
        if (data.fullName && data.fullName !== "UNKNOWN") {
           console.log(`[Beacon AI] Learned new term: ${t} -> ${data.fullName}`);
           
           // DEFENSIVE UPSERT
           try {
             const p = prisma as any;
             const glossaryModel = p.knowledgeGlossary || p.KnowledgeGlossary;
             if (glossaryModel) {
               await glossaryModel.upsert({
                 where: { term: termStr },
                 update: { expansion: data.fullName, category: data.type || "general" },
                 create: { term: termStr, expansion: data.fullName, category: data.type || "general" }
               });
             }
           } catch (dbErr) {
             console.warn("[Knowledge Chat] Glossary upsert failed:", dbErr);
           }
           
           return data.fullName;
        }
      } catch (err) {
        console.error("[Beacon AI] Auto-learning turn failed:", err);
      }
    }
    
    return String(t).trim();
  }));
}

/**
 * TOOL EXECUTION: get_college_ids
 * Resolves names to technical IDs. Acronym resolution is now handled globally in resolve_terms.
 */
async function exec_get_college_ids(args: { names: string[] }, extractor: GeminiExtractor) {
  const names = Array.isArray(args.names) ? args.names : [args.names];
  console.log("[Beacon Tool] Executing get_college_ids for:", names);
  
  // 1. Resolve terms using the Universal Learning engine
  const resolvedNames = await resolve_terms(names, extractor);
  
  // 2. Fetch all colleges for matching
  const allColleges = await prisma.college.findMany({
    select: { id: true, name: true, shortName: true }
  });

  // FUZZY NORMALIZATION: Strip all non-alphanumeric for matching
  const normalize = (str: string) => String(str || "").toLowerCase().replace(/[^a-z0-9]/g, "").trim();

  return resolvedNames.map(inputName => {
    const inputNorm = normalize(inputName);
    if (!inputNorm) return { input: inputName, id: "NOT_FOUND" };

    const match = allColleges.find(c => {
      const nameNorm = normalize(c.name);
      const shortNameNorm = normalize(c.shortName || "");
      
      const exactMatch = nameNorm === inputNorm;
      const shortMatch = shortNameNorm === inputNorm;
      const partialMatch = nameNorm.includes(inputNorm) || inputNorm.includes(nameNorm);
      
      return exactMatch || shortMatch || (partialMatch && nameNorm.length > 5);
    });

    if (match) console.log(`[Beacon Debug] get_college_ids success: "${inputName}" -> ${match.name}`);
    return match ? { input: inputName, id: match.id, fullName: match.name } : { input: inputName, id: "NOT_FOUND" };
  });
}

/**
 * TOOL EXECUTION: get_subject_rankings
 */
async function exec_get_subject_rankings(args: { collegeIds: string[] }) {
  console.log("[Beacon Tool] get_subject_rankings for:", args.collegeIds);
  const data = await prisma.collegeInsight.findMany({
    where: { collegeId: { in: args.collegeIds }, status: "approved" },
    include: { college: { select: { name: true } }, dataSource: { select: { displayName: true } } }
  });

  return data.map(d => ({
    college: d.college.name,
    source: d.dataSource.displayName,
    year: d.academicYear,
    rankings: (d.data as any)?.rankings_comprehensive?.subject_and_specialty_rankings || []
  }));
}

/**
 * TOOL EXECUTION: get_specific_ranking
 */
async function exec_get_specific_ranking(args: { collegeIds: string[], subject: string }, extractor: GeminiExtractor) {
  console.log(`[Beacon Tool] get_specific_ranking for subject "${args.subject}" across colleges:`, args.collegeIds);
  const resolvedSubject = String((await resolve_terms(args.subject, extractor))[0] || "").toLowerCase().trim();
  
  const data = await prisma.collegeInsight.findMany({
    where: { collegeId: { in: args.collegeIds }, status: "approved" },
    include: { college: { select: { name: true } }, dataSource: { select: { displayName: true } } }
  });

  const results = data.map(d => {
    const rankings = (d.data as any)?.rankings_comprehensive?.subject_and_specialty_rankings || [];
    
    // POWER MATCH: Token-based overlap detection
    const searchTokens = resolvedSubject.split(/\s+/).filter(t => t.length > 2);
    
    let matchedItem: any = null;

    // Deep hierarchical search (Department -> Sub-specialty)
    for (const r of rankings) {
      const deptName = String(r?.department || r?.name || "").toLowerCase();
      
      // Check top-level department
      if (deptName && (deptName.includes(resolvedSubject) || resolvedSubject.includes(deptName))) {
        matchedItem = { rank: r.rank, name: r.department || r.name };
        break;
      }
      
      // Check sub-specialties array if it exists
      if (Array.isArray(r.sub_specialties)) {
        const subMatch = r.sub_specialties.find((sub: any) => {
          const subName = String(sub?.name || "").toLowerCase();
          return subName && (subName.includes(resolvedSubject) || resolvedSubject.includes(subName));
        });
        if (subMatch) {
          matchedItem = { rank: subMatch.rank, name: subMatch.name };
          break;
        }
      }

      // Final token fallback for department
      if (searchTokens.length > 0) {
        const matchedTokens = searchTokens.filter(t => deptName.includes(t));
        if (matchedTokens.length >= Math.ceil(searchTokens.length * 0.75)) {
          matchedItem = { rank: r.rank, name: r.department || r.name };
          break;
        }
      }
    }
    
    const res = { 
      college: d.college.name, 
      source: d.dataSource.displayName,
      subject: resolvedSubject, 
      rank: matchedItem ? matchedItem.rank : "No specific rank found in this record" 
    };
    console.log(`[Beacon Debug] get_specific_ranking result for ${d.college.name}:`, res.rank);
    return res;
  });

  console.log(`[Beacon Debug] get_specific_ranking found matches for ${results.filter(r => r.rank !== "No specific rank found in this record").length} colleges`);
  return results;
}

/**
 * TOOL EXECUTION: get_admissions_stats
 */
async function exec_get_admissions_stats(args: { collegeIds: string[] }) {
  console.log("[Beacon Tool] get_admissions_stats for:", args.collegeIds);
  const data = await prisma.collegeInsight.findMany({
    where: { collegeId: { in: args.collegeIds }, status: "approved" },
    include: { college: { select: { name: true } } }
  });
  const results = data.map(d => {
    const r = d.data as any;
    return { 
      college: d.college.name, 
      admissions_stats: r?.admissions_engine,
      deadlines_and_insights: r?.supplementary_admissions_insights || "No deadline information available"
    };
  });
  console.log(`[Beacon Debug] get_admissions_stats retrieved ${results.length} records`);
  return results;
}

/**
 * TOOL EXECUTION: get_financial_stats
 */
async function exec_get_financial_stats(args: { collegeIds: string[] }) {
  console.log("[Beacon Tool] get_financial_stats for:", args.collegeIds);
  const data = await prisma.collegeInsight.findMany({
    where: { collegeId: { in: args.collegeIds }, status: "approved" },
    include: { college: { select: { name: true } } }
  });
  const results = data.map(d => {
    const r = d.data as any;
    return { 
      college: d.college.name, 
      financial_profile: r?.financial_profile || "No financial data available",
      roi_and_outcomes: r?.academic_roi_and_outcomes || "No ROI data available"
    };
  });
  console.log(`[Beacon Debug] get_financial_stats retrieved ${results.length} records`);
  return results;
}

/**
 * TOOL EXECUTION: search_intelligence_repository
 * Upgraded: Now returns the specific rankings automatically for speed.
 */
async function exec_search_intelligence_repository(args: { searchTopic: string }, extractor: GeminiExtractor) {
  const resolvedTopic = String((await resolve_terms(args.searchTopic, extractor))[0] || "").toLowerCase().trim();
  console.log(`[Beacon Tool] search_intelligence_repository for: "${resolvedTopic}"`);
  
  const inventory = await prisma.collegeInsight.findMany({
    where: { status: "approved" },
    include: { college: { select: { name: true } }, dataSource: { select: { displayName: true } } }
  });

  const searchTokens = resolvedTopic.split(/\s+/).filter(t => t.length > 2);

  const matches = inventory.map(i => {
    const rankings = (i.data as any)?.rankings_comprehensive?.subject_and_specialty_rankings || [];
    const dataStr = JSON.stringify(i.data).toLowerCase();
    
    let matchedItem: any = null;

    // Deep hierarchical search (Department -> Sub-specialty)
    for (const r of rankings) {
      const deptName = String(r?.department || r?.name || "").toLowerCase();
      if (deptName && (deptName.includes(resolvedTopic) || resolvedTopic.includes(deptName))) {
        matchedItem = { rank: r.rank, name: r.department || r.name };
        break;
      }
      if (Array.isArray(r.sub_specialties)) {
        const subMatch = r.sub_specialties.find((sub: any) => {
          const subName = String(sub?.name || "").toLowerCase();
          return subName && (subName.includes(resolvedTopic) || resolvedTopic.includes(subName));
        });
        if (subMatch) { matchedItem = { rank: subMatch.rank, name: subMatch.name }; break; }
      }
    }

    if (matchedItem || dataStr.includes(resolvedTopic)) {
      return { 
        college: i.college.name, 
        source: i.dataSource.displayName, 
        rank: matchedItem ? matchedItem.rank : "Found match in documents",
        subject: matchedItem ? matchedItem.name : resolvedTopic
      };
    }
    return null;
  }).filter(Boolean).slice(0, 15);

  console.log(`[Beacon Debug] Global search found ${matches.length} matches`);
  return matches;
}

/**
 * MAIN POST HANDLER
 */
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'counselor') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { query, history } = await req.json();
    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    const extractor = new GeminiExtractor(process.env.GOOGLE_AI_API_KEY!);
    const model = (extractor as any).genAI.getGenerativeModel({ 
      model: process.env.LLM_MODEL_CHAT || 'gemini-2.5-flash',
      tools: [GeminiExtractor.TOOLS] as any,
      systemInstruction: GeminiExtractor.SYSTEM_INSTRUCTION
    });

    // Start Chat Session with Sequence Validation
    let cleanHistory = (history || [])
      .map((h: any) => ({
        role: h.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: h.content || "" }]
      }));

    const firstUserIndex = cleanHistory.findIndex((h: any) => h.role === 'user');
    cleanHistory = firstUserIndex !== -1 ? cleanHistory.slice(firstUserIndex) : [];

    const chat = model.startChat({ history: cleanHistory });

    // RECURSIVE AGENTIC LOOP
    console.log(`[Beacon AI] Processing query: "${query}"`);
    let currentResult = await chat.sendMessage(query);
    let response = await currentResult.response;
    
    let loopCount = 0;
    const MAX_LOOPS = 5;

    while (loopCount < MAX_LOOPS) {
      const parts = response.candidates?.[0]?.content?.parts || [];
      const calls = parts.filter((p: any) => !!p.functionCall);
      
      if (calls.length === 0) break;

      console.log(`[Beacon AI] [Loop ${loopCount + 1}] LLM requested ${calls.length} Tool(s)`);
      
      const toolResponses = await Promise.all(calls.map(async (p: any) => {
        const call = p.functionCall;
        let toolResult;
        
        try {
          if (call.name === "get_college_ids") toolResult = await exec_get_college_ids(call.args as any, extractor);
          else if (call.name === "get_subject_rankings") toolResult = await exec_get_subject_rankings(call.args as any);
          else if (call.name === "get_specific_ranking") toolResult = await exec_get_specific_ranking(call.args as any, extractor);
          else if (call.name === "get_admissions_stats") toolResult = await exec_get_admissions_stats(call.args as any);
          else if (call.name === "get_financial_stats") toolResult = await exec_get_financial_stats(call.args as any);
          else if (call.name === "search_intelligence_repository") toolResult = await exec_search_intelligence_repository(call.args as any, extractor);
          else if (call.name === "learn_new_acronym") {
             toolResult = { success: true, message: "Use get_college_ids instead for college names" };
          }
        } catch (err) {
          console.error(`[Beacon AI] Tool ${call.name} execution failed:`, err);
          toolResult = { error: "Local tool execution failed" };
        }

        return { functionResponse: { name: call.name, response: { content: toolResult } } };
      }));

      // Send tool findings back to Agent
      currentResult = await chat.sendMessage(toolResponses);
      response = await currentResult.response;
      loopCount++;
    }

    let finalAnswer = response.text();
    if (!finalAnswer || finalAnswer.trim().length === 0) {
        finalAnswer = "I found verified data in the repository, but encountered a technical issue formatting the response. Please try specifying a single college.";
    }

    return NextResponse.json({ 
        answer: finalAnswer,
        modelUsed: process.env.LLM_MODEL_CHAT || 'gemini-2.5-flash'
    });

  } catch (error: any) {
    console.error('Beacon AI Agentic API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
