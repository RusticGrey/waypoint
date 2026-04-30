import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { ExtractionEngine } from '@/lib/extraction/extractionEngine';

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
async function resolve_terms(input: string | string[], extractor?: ExtractionEngine) {
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
async function exec_get_college_ids(args: { names: string[] }, extractor: ExtractionEngine) {
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
 * DOMAIN MAPPING HELPERS
 */
const DOMAIN_KEYWORDS: Record<string, string[]> = {
  'admissions': ['admission', 'apply', 'acceptance', 'deadline', 'requirement', 'test', 'sat', 'act', 'gpa'],
  'finance': ['cost', 'financ', 'tuition', 'aid', 'price', 'sticker', 'scholarship', 'endowment'],
  'academics': ['academic', 'major', 'program', 'faculty', 'ratio', 'graduation', 'retention', 'subject'],
  'rankings': ['rank', 'standing', 'position', 'best'],
  'identity': ['identity', 'found', 'enrollment', 'type', 'setting', 'calendar', 'affil']
};

function matchesDomain(key: string, domain: string): boolean {
  const k = key.toLowerCase();
  const keywords = DOMAIN_KEYWORDS[domain.toLowerCase()] || [domain.toLowerCase()];
  
  // Strip numeric prefixes like "1_"
  const cleanKey = k.replace(/^\d+_/, "");
  
  return keywords.some(kw => cleanKey.includes(kw) || k.includes(kw));
}

/**
 * TOOL EXECUTION: fetch_intelligence_domain
 * REPLACES: get_subject_rankings, get_specific_ranking, get_admissions_stats, get_financial_stats, get_global_college_metrics, search_intelligence_repository
 */
async function exec_fetch_intelligence_domain(args: { domain: string, collegeIds?: string[] }) {
  const filter: any = { status: "approved" };
  if (args.collegeIds && args.collegeIds.length > 0) {
    filter.collegeId = { in: args.collegeIds };
  }

  const allInsights = await prisma.collegeInsight.findMany({
    where: filter,
    include: { college: { select: { name: true } }, dataSource: { select: { displayName: true } } }
  });

  return allInsights.map(insight => {
    const data = insight.data as any;
    let combinedData: any = {};
    let foundMatch = false;

    if (data && typeof data === 'object') {
      Object.keys(data).forEach(key => {
        if (matchesDomain(key, args.domain)) {
          foundMatch = true;
          if (typeof data[key] === 'object' && data[key] !== null && !Array.isArray(data[key])) {
            combinedData = { ...combinedData, ...data[key] };
          } else {
            combinedData[key] = data[key];
          }
        }
      });
    }

    if (!foundMatch) return null;

    return {
      college: insight.college.name,
      source: insight.dataSource.displayName,
      year: insight.academicYear,
      [args.domain]: combinedData
    };
  }).filter(Boolean);
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

    const extractor = new ExtractionEngine(process.env.GOOGLE_AI_API_KEY!);
    const model = (extractor as any).genAI.getGenerativeModel({ 
      model: process.env.LLM_MODEL_CHAT || 'gemini-2.5-flash',
      tools: [ExtractionEngine.TOOLS] as any,
      systemInstruction: ExtractionEngine.SYSTEM_INSTRUCTION
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
          else if (call.name === "fetch_intelligence_domain") toolResult = await exec_fetch_intelligence_domain(call.args as any);
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
