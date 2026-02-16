import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { isNewStudent } from '@/lib/api-helpers/profile';
import { boolean } from 'zod';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/');
  }

  let newStudentCheck = false;
  let studentPhase = 'Onboarding';

  if (session.user.role === 'student') {
    const student = await prisma.student.findUnique({
      where: { userId: session.user.id },
      select: { phase: true },
    });
    studentPhase = student?.phase || 'Onboarding';
    
    // Check if this is a new student (fallback for onboarding check)
    newStudentCheck = await isNewStudent(session.user.id);
  }  

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-8">
              <Link href={`/${session.user.role}`} className="text-2xl font-bold text-blue-600 hover:text-blue-700">
                WayPoint
              </Link>
              
              { (session.user.role === 'student') && (studentPhase !== 'Onboarding') && (
                <nav className="hidden md:flex gap-6">
                  <Link href="/student" className="text-gray-700 hover:text-blue-600 font-medium">
                    Dashboard
                  </Link>
                  <Link href="/student/profile" className="text-gray-700 hover:text-blue-600 font-medium">
                    Profile
                  </Link>
                  
                  {studentPhase !== 'Onboarding' && (
                    <>
                      <Link href="/student/goals" className="text-gray-700 hover:text-blue-600 font-medium">
                        Goals
                      </Link>
                      <Link href="/student/test-scores" className="text-gray-700 hover:text-blue-600 font-medium">
                        Test Scores
                      </Link>
                      <Link href="/student/history" className="text-gray-700 hover:text-blue-600 font-medium">
                        History
                      </Link>
                    </>
                  )}

                  {studentPhase === 'College_Applications' && (
                    <>
                      <Link href="/student/colleges" className="text-gray-700 hover:text-blue-600 font-medium">
                        Colleges
                      </Link>
                      <Link href="/student/applications" className="text-gray-700 hover:text-blue-600 font-medium">
                        Applications
                      </Link>
                      <Link href="/student/analysis" className="text-gray-700 hover:text-blue-600 font-medium">
                        Analysis
                      </Link>
                    </>
                  )}
                </nav>
              )}

              {session.user.role === 'coordinator' && (
                <nav className="hidden md:flex gap-6">
                  <Link href="/coordinator" className="text-gray-700 hover:text-blue-600 font-medium">
                    Dashboard
                  </Link>
                  <Link href="/coordinator/meetings" className="text-gray-700 hover:text-blue-600 font-medium">
                    Meetings
                  </Link>
                </nav>
              )}

              {session.user.role === 'counselor' && (
                <nav className="hidden md:flex gap-6">
                  <Link href="/counselor" className="text-gray-700 hover:text-blue-600 font-medium">
                    Dashboard
                  </Link>
                  <Link href="/counselor/manage-users" className="text-gray-700 hover:text-blue-600 font-medium">
                    Manage Users
                  </Link>
                  <Link href="/admin/subjects" className="text-gray-700 hover:text-blue-600 font-medium">
                    Manage Courses
                  </Link>
                </nav>
              )}
            </div>

            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">
                <span className="font-medium text-gray-900">{session.user.name}</span>
                <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                  {session.user.role}
                </span>
              </div>
              
              <Link
                href="/api/auth/signout"
                className="text-sm text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md hover:bg-gray-100"
              >
                Logout
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="py-8">
        {children}
      </main>

      {(session.user.role === 'counselor' || session.user.role === 'coordinator' || !newStudentCheck) && (
        <footer className="bg-white border-t mt-auto">
          <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-gray-500">
              © 2026 WayPoint. College Counseling Platform.
            </p>
          </div>
        </footer>
      )}
    </div>
  );
}
