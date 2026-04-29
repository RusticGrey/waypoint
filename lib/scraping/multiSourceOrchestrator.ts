import { prisma } from '@/lib/prisma';
import { GeminiExtractor } from './llm/geminiExtractor';

export class MultiSourceOrchestrator {
  private extractor: GeminiExtractor;

  constructor(geminiApiKey: string) {
    this.extractor = new GeminiExtractor(geminiApiKey);
  }

  async approveData(insightId: string, approvedByUserId: string, manualData?: any) {
    // 1. Get the pending insight
    const insight = await prisma.collegeInsight.findUnique({
      where: { id: insightId },
      include: { college: true }
    });

    if (!insight) throw new Error(`Insight with ID ${insightId} not found`);

    // 2. Use manual data if provided, otherwise use extracted data
    const finalData = manualData || insight.data;

    // 3. Update insight status to approved
    const updatedInsight = await prisma.collegeInsight.update({
      where: { id: insightId },
      data: {
        data: finalData,
        status: 'approved',
        approvedAt: new Date(),
        approvedByUserId
      }
    });

    // 4. Sync core metrics to College model
    const metrics = finalData.admissions_engine || finalData.admissions || {};
    const identity = finalData.institutional_identity || {};

    await prisma.college.update({
      where: { id: insight.collegeId },
      data: {
        // Update name and country if extracted
        name: identity.name || insight.college.name,
        country: identity.country || insight.college.country,
        // Update core metrics
        acceptanceRate: metrics.acceptance_rate || metrics.acceptanceRate || insight.college.acceptanceRate,
        avgGpa: metrics.avg_gpa || metrics.avgGpa || insight.college.avgGpa,
        avgSat: metrics.middle_50_percentile_stats?.sat_math?.p75 ? 
                (metrics.middle_50_percentile_stats.sat_math.p75 + metrics.middle_50_percentile_stats.sat_reading?.p75 || 0) : 
                (metrics.avgSat || insight.college.avgSat),
        avgAct: metrics.middle_50_percentile_stats?.act_composite?.p75 || metrics.avgAct || insight.college.avgAct
      }
    });

    return updatedInsight;
  }
}
