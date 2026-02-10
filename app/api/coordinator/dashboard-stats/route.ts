import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id || session.user.role !== 'coordinator') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Get students assigned to this coordinator
    const students = await prisma.student.findMany({
      where: { coordinator_id: session.user.id },
      include: {
        user: {
          select: {
            first_name: true,
            last_name: true,
          },
        },
      },
    });
    
    const studentIds = students.map(s => s.user_id);
    
    // Get upcoming meetings
    const upcomingMeetings = await prisma.meeting.findMany({
      where: {
        coordinator_id: session.user.id,
        meeting_date: {
          gte: new Date(),
        },
      },
      include: {
        student: {
          include: {
            user: {
              select: {
                first_name: true,
                last_name: true,
              },
            },
          },
        },
      },
      orderBy: {
        meeting_date: 'asc',
      },
      take: 5,
    });
    
    // Get all applications for assigned students
    const applications = await prisma.collegeApplication.findMany({
      where: {
        student_id: { in: studentIds },
      },
      include: {
        student: {
          include: {
            user: {
              select: {
                first_name: true,
                last_name: true,
              },
            },
          },
        },
        college: {
          select: {
            name: true,
          },
        },
      },
    });
    
    // Calculate deadlines across all students
    const upcomingDeadlines = applications
      .filter(app => app.application_deadline)
      .map(app => ({
        student: `${app.student.user.first_name} ${app.student.user.last_name}`,
        college: app.college.name,
        deadline: app.application_deadline,
        daysRemaining: Math.ceil(
          (new Date(app.application_deadline!).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
        ),
      }))
      .filter(d => d.daysRemaining >= 0 && d.daysRemaining <= 30)
      .sort((a, b) => a.daysRemaining - b.daysRemaining)
      .slice(0, 10);
    
    return NextResponse.json({
      totalStudents: students.length,
      upcomingMeetings,
      upcomingDeadlines,
      applicationStats: {
        total: applications.length,
        submitted: applications.filter(a => ['Submitted', 'Accepted', 'Rejected', 'Waitlisted'].includes(a.application_status)).length,
        inProgress: applications.filter(a => a.application_status === 'In_Progress').length,
      },
    });
  } catch (error) {
    console.error('Coordinator dashboard stats error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    );
  }
}
