import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Fetch all relevant data
    const [applications, goals, activities, achievements, projects] = await Promise.all([
      prisma.collegeApplication.findMany({
        where: { student_id: session.user.id },
        include: {
          College: {
            select: {
              name: true,
            },
          },
        },
      }),
      prisma.profileGoal.findMany({
        where: { 
          student_id: session.user.id,
          status: { in: ['Not_Started', 'In_Progress'] },
        },
      }),
      prisma.activity.count({
        where: { student_id: session.user.id },
      }),
      prisma.achievement.count({
        where: { student_id: session.user.id },
      }),
      prisma.projectExperience.count({
        where: { student_id: session.user.id },
      }),
    ]);
    
    // Calculate upcoming deadlines
    const upcomingDeadlines = applications
      .filter(app => app.application_deadline)
      .map(app => ({
        College: app.college.name,
        deadline: app.application_deadline,
        daysRemaining: Math.ceil(
          (new Date(app.application_deadline!).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
        ),
      }))
      .filter(d => d.daysRemaining >= 0)
      .sort((a, b) => a.daysRemaining - b.daysRemaining)
      .slice(0, 5);
    
    // Application stats
    const applicationStats = {
      total: applications.length,
      submitted: applications.filter(a => ['Submitted', 'Accepted', 'Rejected', 'Waitlisted', 'Deferred'].includes(a.application_status)).length,
      inProgress: applications.filter(a => a.application_status === 'In_Progress').length,
      notStarted: applications.filter(a => a.application_status === 'Not_Started').length,
      decisions: {
        accepted: applications.filter(a => a.application_status === 'Accepted').length,
        rejected: applications.filter(a => a.application_status === 'Rejected').length,
        waitlisted: applications.filter(a => a.application_status === 'Waitlisted').length,
        pending: applications.filter(a => ['Submitted'].includes(a.application_status)).length,
      },
    };
    
    return NextResponse.json({
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
