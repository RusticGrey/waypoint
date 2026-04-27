import { prisma } from '@/lib/prisma';
import puppeteer from 'puppeteer';
import { USNewsAdapter } from './sources/usNewsAdapter';
import { RankingSourceAdapter } from './sources/rankingSourceAdapter';
import { GeminiExtractor } from './llm/geminiExtractor';

export class MultiSourceOrchestrator {
  private adapters: Map<string, RankingSourceAdapter> = new Map();
  private extractor: GeminiExtractor;

  constructor(geminiApiKey: string) {
    this.extractor = new GeminiExtractor(geminiApiKey);
    // Register adapters
    const usNews = new USNewsAdapter();
    this.adapters.set(usNews.name, usNews);
  }

  async scrapeAndPropose(
    collegeId: string,
    sourceName: string,
    academicYear: string,
    fields: string[],
    organizationId: string
  ) {
    console.log(`[SCRAPER] [ORCHESTRATOR] Starting job for College ID: ${collegeId}, Year: ${academicYear}`);
    const adapter = this.adapters.get(sourceName);
    if (!adapter) throw new Error(`Adapter for ${sourceName} not found`);

    // 1. Get ranking source
    const source = await prisma.rankingSource.findUnique({
      where: { name: sourceName }
    });
    if (!source) throw new Error(`Source ${sourceName} not found in DB`);

    // 1.5 Check for premium credentials in DB
    const credentials = await prisma.rankingSourceCredential.findUnique({
      where: {
        rankingSourceId_organizationId: {
          rankingSourceId: source.id,
          organizationId,
        },
      },
    });

    // 2. Get college mapping for source
    const mapping = await prisma.rankingSourceCollege.findUnique({
      where: {
        rankingSourceId_collegeId: {
          rankingSourceId: source.id,
          collegeId: collegeId,
        },
      },
    });

    if (!mapping) throw new Error(`No mapping found for college ${collegeId} in ${sourceName}`);

    console.log(`[SCRAPER] [ORCHESTRATOR] Found mapping: ${mapping.sourceProfileUrl}`);

    // 3. Identify fields already present to enable selective scraping
    const existingData = await prisma.collegeRankingData.findUnique({
      where: {
        collegeId_rankingSourceId_academicYear: {
          collegeId,
          rankingSourceId: source.id,
          academicYear,
        },
      },
    });

    const fieldsToScrape = fields.filter(f => !existingData?.fieldsPresent.includes(f));
    if (fieldsToScrape.length === 0 && existingData) {
      console.log(`[SCRAPER] [ORCHESTRATOR] All fields already present in DB. Skipping scrape.`);
      return existingData;
    }

    console.log(`[SCRAPER] [ORCHESTRATOR] Selective scraping fields: ${fieldsToScrape.join(', ')}`);

    // 4. Perform scraping with Puppeteer
    const browser = await puppeteer.launch({ 
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-http2'] 
    });
    const page = await browser.newPage();
    
    // Set user agent to avoid bot detection
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    try {
      // Login if credentials exist
      if (credentials) {
        const loggedIn = await adapter.login(page, {
          email: credentials.encryptedEmail, // decrypted in real scenario
          password: credentials.encryptedPassword
        });
        if (!loggedIn) {
          console.warn(`Login failed for ${sourceName}, proceeding as anonymous`);
        }
      }

      await page.goto(mapping.sourceProfileUrl, { 
        waitUntil: 'networkidle2',
        timeout: 60000 
      });
      
      console.log(`[SCRAPER] [ORCHESTRATOR] Page rendered. Passing HTML to LLM...`);
      const html = await page.content();
      const extraction = await this.extractor.extract(html, fieldsToScrape);

      console.log(`[SCRAPER] [ORCHESTRATOR] LLM extraction complete. Confidence: ${(extraction.confidence * 100).toFixed(1)}%`);

      // 5. Return the proposal
      return {
        collegeId,
        sourceId: source.id,
        academicYear,
        proposedData: extraction.data,
        fieldsFound: extraction.fieldsFound,
        confidence: extraction.confidence,
        modelUsed: extraction.modelUsed,
      };
    } finally {
      await browser.close();
    }
  }

  async approveData(proposal: any, approvedByUserId: string) {
    return await prisma.collegeRankingData.upsert({
      where: {
        collegeId_rankingSourceId_academicYear: {
          collegeId: proposal.collegeId,
          rankingSourceId: proposal.sourceId,
          academicYear: proposal.academicYear,
        },
      },
      create: {
        collegeId: proposal.collegeId,
        rankingSourceId: proposal.sourceId,
        academicYear: proposal.academicYear,
        acceptanceRate: proposal.proposedData.acceptanceRate,
        rankings: proposal.proposedData.rankings,
        costOfAttendance: proposal.proposedData.costOfAttendance,
        admissionsData: proposal.proposedData.admissionsData,
        fieldsPresent: proposal.fieldsFound,
        llmModelUsed: proposal.modelUsed,
        approvedByUserId,
        approvedAt: new Date(),
      },
      update: {
        acceptanceRate: proposal.proposedData.acceptanceRate,
        rankings: proposal.proposedData.rankings,
        costOfAttendance: proposal.proposedData.costOfAttendance,
        admissionsData: proposal.proposedData.admissionsData,
        fieldsPresent: {
          set: proposal.fieldsFound
        },
        llmModelUsed: proposal.modelUsed,
        approvedByUserId,
        approvedAt: new Date(),
      }
    });
  }
}
