import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id || (session.user.role !== 'counselor' && session.user.role !== 'counselor')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const isAdmin = session.user.isAdmin;
    const organizationId = session.user.organizationId;
    
    // Base query for students
    const studentWhereClause: any = {
      user: { organizationId }
    };
    
    if (!isAdmin) {
      studentWhereClause.counselorId = session.user.id;
    }
    
    // Get students
    const students = await prisma.student.findMany({
      where: studentWhereClause,
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });
    
    const studentIds = students.map(s => s.userId);
    
    // Base query for meetings (Now using the new Meeting model)
    const meetingWhereClause: any = {
      startTime: {
        gte: new Date(),
      },
      studentId: { in: studentIds }
    };
    
    if (!isAdmin) {
      meetingWhereClause.hostId = session.user.id;
    }
    
    // Get upcoming meetings
    const upcomingMeetings = await prisma.meeting.findMany({
      where: meetingWhereClause,
      include: {
        student: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
      orderBy: {
        meetingDate: 'asc',
      },
      take: 5,
    });
    
    // Get all applications for students in scope
    const applications = await prisma.collegeApplication.findMany({
      where: {
        studentId: { in: studentIds },
      },
      include: {
        student: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
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
    
    // Calculate deadlines
    const upcomingDeadlines = applications
      .filter(app => app.applicationDeadline)
      .map(app => ({
        Student: `${app.student.user.firstName} ${app.student.user.lastName}`,
        College: app.college.name,
        deadline: app.applicationDeadline,
        daysRemaining: Math.ceil(
          (new Date(app.applicationDeadline!).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
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
        submitted: applications.filter(a => ['Submitted', 'Accepted', 'Rejected', 'Waitlisted'].includes(a.applicationStatus)).length,
        inProgress: applications.filter(a => a.applicationStatus === 'In_Progress').length,
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
