import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { GeminiExtractor } from '@/lib/scraping/llm/geminiExtractor';

/**
 * DEEP SCHEMA RESILIENCE HELPERS
 */

// Finds a value anywhere in the object tree by matching key substring
function findDeepValue(obj: any, keyword: string, depth = 0): any {
  if (!obj || typeof obj !== 'object' || depth > 5) return null;
  
  // 1. Check direct keys
  try {
    const keys = Object.keys(obj);
    const exactMatch = keys.find(k => k.toLowerCase() === keyword.toLowerCase());
    if (exactMatch) return obj[exactMatch];

    const partialMatch = keys.find(k => k.toLowerCase().includes(keyword.toLowerCase()));
    if (partialMatch) return obj[partialMatch];

    // 2. Recurse
    for (const key of keys) {
      const val = obj[key];
      if (val && typeof val === 'object' && !Array.isArray(val)) {
        const found = findDeepValue(val, keyword, depth + 1);
        if (found !== null) return found;
      }
    }
  } catch (e) {
    return null;
  }
  return null;
}

// Finds an array anywhere in the object tree by matching key substring
function findDeepArray(obj: any, keyword: string, depth = 0): any[] {
  if (!obj || typeof obj !== 'object' || depth > 5) return [];
  
  try {
    // 1. Check direct keys
    const keys = Object.keys(obj);
    const match = keys.find(k => k.toLowerCase().includes(keyword.toLowerCase()) && Array.isArray(obj[k]));
    if (match) return obj[match];

    // 2. Recurse
    for (const key of keys) {
      const val = obj[key];
      if (val && typeof val === 'object' && !Array.isArray(val)) {
        const found = findDeepArray(val, keyword, depth + 1);
        if (found.length > 0) return found;
      }
    }
  } catch (e) {
    return [];
  }
  return [];
}

/**
 * GLOSSARY RESOLUTION HELPER
 */
async function resolve_terms(input: string | string[], extractor?: GeminiExtractor) {
  const terms = Array.isArray(input) ? input : [input];
  let glossary: any[] = [];
  try {
    const p = prisma as any;
    const glossaryModel = p.knowledgeGlossary || p.KnowledgeGlossary;
    if (glossaryModel) glossary = await glossaryModel.findMany();
  } catch (e) {}
  
  return await Promise.all(terms.map(async (t) => {
    if (!t) return "";
    const termStr = String(t).toLowerCase().trim();
    const entry = glossary.find((g: any) => g?.term?.toLowerCase() === termStr);
    if (entry) return entry.expansion;
    if (extractor && t.length < 10 && !t.includes(' ')) {
      try {
        const model = (extractor as any).genAI.getGenerativeModel({ 
          model: process.env.LLM_MODEL_CHAT || "gemini-2.5-flash",
          generationConfig: { responseMimeType: "application/json" }
        });
        const prompt = `Identify the full formal name of the academic institution or major/subject referred to as "${t}". Return JSON: {"fullName": "...", "type": "college" | "subject" | "other"}`;
        const res = await model.generateContent(prompt);
        const data = JSON.parse((await res.response).text());
        if (data.fullName && data.fullName !== "UNKNOWN") return data.fullName;
      } catch (err) {}
    }
    return String(t).trim();
  }));
}

/**
 * TOOL EXECUTION: get_college_ids
 */
async function exec_get_college_ids(args: { names: string[] }, extractor: GeminiExtractor) {
  const resolvedNames = await resolve_terms(args.names, extractor);
  const allColleges = await prisma.college.findMany({ select: { id: true, name: true, shortName: true } });
  const normalize = (str: string) => String(str || "").toLowerCase().replace(/[^a-z0-9]/g, "").trim();

  return resolvedNames.map(inputName => {
    const inputNorm = normalize(inputName);
    if (!inputNorm) return { input: inputName, id: "NOT_FOUND" };
    const match = allColleges.find(c => normalize(c.name) === inputNorm || normalize(c.shortName || "") === inputNorm || normalize(c.name).includes(inputNorm));
    return match ? { input: inputName, id: match.id, fullName: match.name } : { input: inputName, id: "NOT_FOUND" };
  });
}

/**
 * TOOL EXECUTION: get_subject_rankings
 */
async function exec_get_subject_rankings(args: { collegeIds: string[] }) {
  const data = await prisma.collegeInsight.findMany({
    where: { collegeId: { in: args.collegeIds }, status: "approved" },
    include: { college: { select: { name: true } }, dataSource: { select: { displayName: true } } }
  });

  return data.map(d => ({
    college: d.college.name,
    source: d.dataSource.displayName,
    year: d.academicYear,
    rankings: findDeepArray(d.data, 'rank') 
  }));
}

/**
 * TOOL EXECUTION: get_specific_ranking
 */
async function exec_get_specific_ranking(args: { collegeIds: string[], subject: string }, extractor: GeminiExtractor) {
  const resolvedSubject = String((await resolve_terms(args.subject, extractor))[0] || "").toLowerCase().trim();
  const data = await prisma.collegeInsight.findMany({
    where: { collegeId: { in: args.collegeIds }, status: "approved" },
    include: { college: { select: { name: true } }, dataSource: { select: { displayName: true } } }
  });

  return data.map(d => {
    const rankings = findDeepArray(d.data, 'rank');
    const searchTokens = resolvedSubject.split(/\s+/).filter(t => t.length > 2);
    let matchedItem: any = null;

    for (const r of rankings) {
      const name = String(r?.department || r?.name || "").toLowerCase();
      if (name && (name.includes(resolvedSubject) || resolvedSubject.includes(name))) {
        matchedItem = { rank: r.rank || r.overall_rank || r.value, name: r.department || r.name };
        break;
      }
      if (Array.isArray(r.sub_specialties)) {
        const subMatch = r.sub_specialties.find((sub: any) => String(sub?.name || "").toLowerCase().includes(resolvedSubject));
        if (subMatch) { matchedItem = { rank: subMatch.rank, name: subMatch.name }; break; }
      }
    }
    
    return { 
      college: d.college.name, 
      source: d.dataSource.displayName,
      subject: resolvedSubject, 
      rank: matchedItem ? matchedItem.rank : "No specific rank found in this record" 
    };
  });
}

/**
 * TOOL EXECUTION: get_admissions_stats
 */
async function exec_get_admissions_stats(args: { collegeIds: string[] }) {
  const data = await prisma.collegeInsight.findMany({
    where: { collegeId: { in: args.collegeIds }, status: "approved" },
    include: { college: { select: { name: true } } }
  });
  return data.map(d => ({
    college: d.college.name, 
    admissions_stats: findDeepValue(d.data, 'admissions') || d.data,
    deadlines: findDeepValue(d.data, 'deadline') || "See admissions stats"
  }));
}

/**
 * TOOL EXECUTION: get_financial_stats
 */
async function exec_get_financial_stats(args: { collegeIds: string[] }) {
  const data = await prisma.collegeInsight.findMany({
    where: { collegeId: { in: args.collegeIds }, status: "approved" },
    include: { college: { select: { name: true } } }
  });
  return data.map(d => ({
    college: d.college.name, 
    financial_profile: findDeepValue(d.data, 'financial') || d.data,
    outcomes: findDeepValue(d.data, 'outcome') || findDeepValue(d.data, 'roi') || "Not specified"
  }));
}

/**
 * TOOL EXECUTION: get_global_college_metrics
 */
async function exec_get_global_college_metrics(args: { academicYear?: string }) {
  const filter: any = { status: "approved" };
  if (args.academicYear) filter.academicYear = args.academicYear;
  const data = await prisma.collegeInsight.findMany({
    where: filter,
    include: { college: { select: { name: true } } }
  });

  return data.map(d => {
    return {
      college: d.college.name,
      academicYear: d.academicYear,
      acceptanceRate: findDeepValue(d.data, 'acceptance_rate') || findDeepValue(d.data, 'acceptance'),
      satMath75: findDeepValue(d.data, 'sat_math')?.p75 || findDeepValue(d.data, 'sat_math_p75'),
      satReading75: findDeepValue(d.data, 'sat_reading')?.p75 || findDeepValue(d.data, 'sat_rw')?.p75 || findDeepValue(d.data, 'sat_reading_p75'),
      tuition: findDeepValue(d.data, 'tuition') || findDeepValue(d.data, 'sticker_price')
    };
  });
}

/**
 * TOOL EXECUTION: search_intelligence_repository
 */
async function exec_search_intelligence_repository(args: { searchTopic: string }, extractor: GeminiExtractor) {
  const resolvedTopic = String((await resolve_terms(args.searchTopic, extractor))[0] || "").toLowerCase().trim();
  const inventory = await prisma.collegeInsight.findMany({
    where: { status: "approved" },
    include: { college: { select: { name: true } }, dataSource: { select: { displayName: true } } }
  });

  return inventory.map(i => {
    const rankings = findDeepArray(i.data, 'rank');
    let matchedItem: any = null;
    for (const r of rankings) {
      const name = String(r?.department || r?.name || "").toLowerCase();
      if (name && (name.includes(resolvedTopic) || resolvedTopic.includes(name))) {
        matchedItem = { rank: r.rank || r.overall_rank || r.value, name: r.department || r.name };
        break;
      }
    }
    if (matchedItem || JSON.stringify(i.data).toLowerCase().includes(resolvedTopic)) {
      return { college: i.college.name, source: i.dataSource.displayName, rank: matchedItem ? matchedItem.rank : "Found match", subject: matchedItem ? matchedItem.name : resolvedTopic };
    }
    return null;
  }).filter(Boolean).slice(0, 15);
}

/**
 * MAIN POST HANDLER
 */
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'counselor') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { query, history } = await req.json();
    if (!query) return NextResponse.json({ error: 'Query is required' }, { status: 400 });

    const extractor = new GeminiExtractor(process.env.GOOGLE_AI_API_KEY!);
    const model = (extractor as any).genAI.getGenerativeModel({ 
      model: process.env.LLM_MODEL_CHAT || 'gemini-2.5-flash',
      tools: [GeminiExtractor.TOOLS] as any,
      systemInstruction: GeminiExtractor.SYSTEM_INSTRUCTION
    });

    let cleanHistory = (history || []).map((h: any) => ({ role: h.role === 'assistant' ? 'model' : 'user', parts: [{ text: h.content || "" }] }));
    const firstUserIndex = cleanHistory.findIndex((h: any) => h.role === 'user');
    cleanHistory = firstUserIndex !== -1 ? cleanHistory.slice(firstUserIndex) : [];

    const chat = model.startChat({ history: cleanHistory });
    let currentResult = await chat.sendMessage(query);
    let response = await currentResult.response;
    
    let loopCount = 0;
    while (loopCount < 5) {
      const parts = response.candidates?.[0]?.content?.parts || [];
      const calls = parts.filter((p: any) => !!p.functionCall);
      if (calls.length === 0) break;

      const toolResponses = await Promise.all(calls.map(async (p: any) => {
        const call = p.functionCall;
        let toolResult;
        try {
          if (call.name === "get_college_ids") toolResult = await exec_get_college_ids(call.args as any, extractor);
          else if (call.name === "get_subject_rankings") toolResult = await exec_get_subject_rankings(call.args as any);
          else if (call.name === "get_specific_ranking") toolResult = await exec_get_specific_ranking(call.args as any, extractor);
          else if (call.name === "get_admissions_stats") toolResult = await exec_get_admissions_stats(call.args as any);
          else if (call.name === "get_financial_stats") toolResult = await exec_get_financial_stats(call.args as any);
          else if (call.name === "get_global_college_metrics") toolResult = await exec_get_global_college_metrics(call.args as any);
          else if (call.name === "search_intelligence_repository") toolResult = await exec_search_intelligence_repository(call.args as any, extractor);
          else toolResult = { error: "Unknown tool" };
        } catch (err) {
          toolResult = { error: "Local tool execution failed" };
        }
        return { functionResponse: { name: call.name, response: { content: toolResult } } };
      }));

      currentResult = await chat.sendMessage(toolResponses);
      response = await currentResult.response;
      loopCount++;
    }

    return NextResponse.json({ answer: response.text(), modelUsed: process.env.LLM_MODEL_CHAT || 'gemini-2.5-flash' });
  } catch (error: any) {
    console.error('Beacon AI Agentic API Error:', error);
    return NextResponse.json({ 
      error: 'Beacon Search Engine encountered an error',
      details: error.message 
    }, { status: 500 });
  }
}
