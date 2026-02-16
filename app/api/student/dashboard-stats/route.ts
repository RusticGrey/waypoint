evemimport { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Fetch all relevant data
    const [student, applications, goals, activities, achievements, projects] = await Promise.all([
      prisma.student.findUnique({
        where: { userId: session.user.id },
        select: { phase: true },
      }),
      prisma.collegeApplication.findMany({
        where: { studentId: session.user.id },
        include: {
          college: {
            select: {
              name: true,
            },
          },
        },
      }),
      prisma.profileGoal.findMany({
        where: {
          studentId: session.user.id,
          status: { in: ['Not_Started', 'In_Progress'] },
        },
      }),
      prisma.activity.count({
        where: { studentId: session.user.id },
      }),
      prisma.achievement.count({
        where: { studentId: session.user.id },
      }),
      prisma.projectExperience.count({
        where: { studentId: session.user.id },
      }),
    ]);
    
    // Calculate upcoming deadlines
    const upcomingDeadlines = applications
      .filter(app => app.applicationDeadline)
      .map(app => ({
        College: app.college.name,
        deadline: app.applicationDeadline ? app.applicationDeadline.toISOString() : null,
        daysRemaining: Math.ceil(
          (new Date(app.applicationDeadline!).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
        ),
      }))
      .filter(d => d.daysRemaining >= 0)
      .sort((a, b) => a.daysRemaining - b.daysRemaining)
      .slice(0, 5);
    
    // Application stats
    const applicationStats = {
      total: applications.length,
      submitted: applications.filter(a => ['Submitted', 'Accepted', 'Rejected', 'Waitlisted', 'Deferred'].includes(a.applicationStatus)).length,
      inProgress: applications.filter(a => a.applicationStatus === 'In_Progress').length,
      notStarted: applications.filter(a => a.applicationStatus === 'Not_Started').length,
      decisions: {
        accepted: applications.filter(a => a.applicationStatus === 'Accepted').length,
        rejected: applications.filter(a => a.applicationStatus === 'Rejected').length,
        waitlisted: applications.filter(a => a.applicationStatus === 'Waitlisted').length,
        pending: applications.filter(a => ['Submitted'].includes(a.applicationStatus)).length,
      },
    };
    
    return NextResponse.json({
      phase: student?.phase || 'Onboarding',
      upcomingDeadlines,
      applicationStats,
      activeGoals: goals.length,
      profileStats: {
        activities,
        achievements,
        projects,
      },
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    );
  }
}
