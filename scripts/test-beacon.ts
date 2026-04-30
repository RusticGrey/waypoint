import { PrismaClient } from '@prisma/client';
import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';
import { ExtractionEngine } from '../lib/extraction/extractionEngine';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const prisma = new PrismaClient();

function findSection(data: any, keyword: string): any {
  if (!data || typeof data !== 'object') return null;
  const key = Object.keys(data).find(k => k.toLowerCase().includes(keyword.toLowerCase()));
  return key ? data[key] : null;
}

async function resolve_terms(input: string | string[], genAI: any) {
  const terms = Array.isArray(input) ? input : [input];
  return await Promise.all(terms.map(async (t) => {
    if (!t) return "";
    const termStr = String(t).toLowerCase().trim();
    return String(t).trim();
  }));
}

async function exec_search_intelligence_repository(args: { searchTopic: string }, genAI: any) {
  const resolvedTopic = args.searchTopic.toLowerCase().trim();
  
  const inventory = await prisma.collegeInsight.findMany({
    where: { status: "approved" },
    include: { college: { select: { name: true } }, dataSource: { select: { displayName: true } } }
  });

  const matches = inventory.map(i => {
    const rankings = (i.data as any)?.rankings_comprehensive?.subject_and_specialty_rankings || (i.data as any)?.['2_rankings_and_performance']?.departmental_rankings || [];
    
    let matchedItem: any = null;

    for (const r of rankings) {
      const deptName = String(r?.department || r?.name || "").toLowerCase();
      if (deptName && (deptName.includes(resolvedTopic) || resolvedTopic.includes(deptName))) {
        matchedItem = { rank: r.rank || r.overall_rank, name: r.department || r.name };
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

    if (matchedItem) {
      return { college: i.college.name, rank: matchedItem.rank, subject: matchedItem.name };
    }
    return null;
  }).filter(Boolean);

  return matches;
}

async function exec_get_global_college_metrics(args: { academicYear?: string }) {
  const filter: any = { status: "approved" };
  const data = await prisma.collegeInsight.findMany({
    where: filter,
    include: { college: { select: { name: true } } }
  });
  return data.map(d => {
    const admissions = findSection(d.data, 'admissions');
    const financial = findSection(d.data, 'financial');
    return {
      college: d.college.name,
      acceptanceRate: admissions?.acceptance_rate,
      tuition: financial?.sticker_price_tuition_fees || financial?.sticker_price_total,
      netPrice: financial?.avg_annual_cost_after_aid
    };
  });
}

const TOOLS = {
  functionDeclarations: [
    {
      name: "get_global_college_metrics",
      description: "Returns a high-level summary of EVERY college. Use for cross-college queries like < 10% acceptance rate, or sorting by tuition.",
      parameters: { type: SchemaType.OBJECT, properties: { academicYear: { type: SchemaType.STRING } } }
    },
    {
      name: "search_intelligence_repository",
      description: "Global search for discovery queries or finding the best/top colleges for a specific major or subject.",
      parameters: { type: SchemaType.OBJECT, properties: { searchTopic: { type: SchemaType.STRING } }, required: ["searchTopic"] }
    }
  ]
};

async function testQuery(query: string) {
  console.log(`\n\n--- TESTING: ${query} ---`);
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!);
  
  const systemInstruction = `
    You are an AI assistant. 
    You are highly encouraged to sort, filter, and compare data provided by your tools. 
    If a user asks for "top" or "best" colleges for a subject, use search_intelligence_repository to fetch the verified rankings from the database and present them. You are an analyst presenting verified data, not making subjective judgments.
  `;

  const model = genAI.getGenerativeModel({ 
    model: 'gemini-2.5-flash',
    tools: [TOOLS] as any,
    systemInstruction
  });

  const chat = model.startChat();
  let currentResult = await chat.sendMessage(query);
  let response = await currentResult.response;
  
  let loopCount = 0;
  while (loopCount < 3) {
    const parts = response.candidates?.[0]?.content?.parts || [];
    const calls = parts.filter((p: any) => !!p.functionCall);
    if (calls.length === 0) break;
    
    const toolResponses = await Promise.all(calls.map(async (p: any) => {
      const call = p.functionCall;
      let res;
      if (call.name === "get_global_college_metrics") res = await exec_get_global_college_metrics(call.args as any);
      else if (call.name === "search_intelligence_repository") res = await exec_search_intelligence_repository(call.args as any, genAI);
      else res = { message: "Mocked for test." };
      return { functionResponse: { name: call.name, response: { content: res } } };
    }));

    currentResult = await chat.sendMessage(toolResponses);
    response = await currentResult.response;
    loopCount++;
  }

  console.log("FINAL ANSWER:\n", response.text());
}

async function run() {
  await testQuery("sort the colleges by the cost of attendance");
  await testQuery("which are the top universities for AI speciality");
}

run();
