const { PrismaClient } = require('@prisma/client');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const path = require('path');

// Load .env.local manually
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, 'utf8');
  envConfig.split('\n').forEach(line => {
    const trimmedLine = line.trim();
    if (!trimmedLine || trimmedLine.startsWith('#')) return;
    const firstEquals = trimmedLine.indexOf('=');
    if (firstEquals === -1) return;
    const key = trimmedLine.substring(0, firstEquals).trim();
    let value = trimmedLine.substring(firstEquals + 1).trim();
    value = value.replace(/^["']|["']$/g, '');
    process.env[key] = value;
  });
}

const prisma = new PrismaClient();

async function testLlmExtraction() {
  const collegeId = 'carnegie-mellon-university';
  const sourceName = 'us_news';
  const apiKey = process.env.GOOGLE_AI_API_KEY;
  const modelName = process.env.LLM_MODEL_NAME || 'gemini-1.5-flash';

  if (!apiKey) {
    console.error('GOOGLE_AI_API_KEY not found');
    process.exit(1);
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: modelName });

  try {
    console.log(`\n--- Phase 1: LLM Handshake ---`);
    const ping = await model.generateContent("READY?");
    console.log(`Handshake: [${(await ping.response).text().trim()}]`);

    console.log(`\n--- Phase 2: Fetching All Documents ---`);
    const docs = await prisma.collegeDocument.findMany({
      where: { collegeId, sourceType: sourceName }
    });

    console.log(`Found ${docs.length} documents.`);

    const extractWithFocus = async (focusDescription, schema) => {
      console.log(`\n--- Executing: ${focusDescription} ---`);
      const parts = [
        { text: `You are the Lead Data Architect for Waypoint. Your mission is FORCED TRANSCRIPTION of institutional data for ${collegeId}.
        
        GOAL: Produce a payload that matches this level of detail or MORE.
        
        GOLDEN SCHEMA TO FILL:
        ${JSON.stringify(schema, null, 2)}
        
        INSTRUCTIONS:
        1. Hunt for every sub-specialty rank in "Computer Science", "Engineering", and "Business".
        2. Capture SAT/ACT ranges exactly (e.g. 750-785).
        3. Identify unique opportunities like "Senior Capstone", "Co-ops", and "Masters of Robotics".
        4. Look for culture indicators like "Academic Grit" or "Collaborative peers".
        
        Return ONLY valid JSON.` }
      ];

      docs.forEach(doc => {
        parts.push({
          inlineData: {
            data: doc.rawHtmlContent.split(',').pop(),
            mimeType: doc.metadata?.mimeType || "application/pdf"
          }
        });
      });

      const startTime = Date.now();
      const result = await model.generateContent(parts);
      const response = await result.response;
      console.log(`Response received in ${Date.now() - startTime}ms`);
      return response.text();
    };

    const fullSchema = {
      institutional_identity: { name: "", location: { city: "", state: "", country: "" }, type: "", setting: "", campus_size_acres: 0 },
      rankings_comprehensive: { overall_national: 0, most_innovative: 0, best_value: 0, undergraduate_research: 0, subject_and_specialty_rankings: [] },
      admissions_engine: { acceptance_rate: 0, application_fee: 0, deadlines: {}, middle_50_percentile_stats: {} },
      academic_roi_and_outcomes: { student_faculty_ratio: "", freshman_retention_rate: 0, graduation_rate_4yr: 0, major_performance_data: [] },
      international_context: { percent_international_undergrad: 0, english_proficiency_minimums: {} },
      supplementary_admissions_insights: { unique_academic_opportunities: [], campus_culture_indicators: [], specialized_facilities: [], innovative_standing: "", other_notable_data: {} }
    };

    const finalResult = await extractWithFocus("Comprehensive Data Extraction", fullSchema);
    console.log('\n--- FINAL EXTRACTED DATA ---');
    console.log(finalResult);
    console.log('----------------------------');

  } catch (err) {
    console.error('\nExtraction Error:', err);
  } finally {
    await prisma.$disconnect();
  }
}

testLlmExtraction();
