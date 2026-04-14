export const dynamic = 'force-dynamic';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { isNewStudent } from '@/lib/api-helpers/profile';
import { NavClientComponent } from '@/components/dashboard/NavClientComponent';
import { featureFlags } from '@/lib/feature-flags';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/');
  }

  const showMeetings = process.env.NEXT_PUBLIC_ENABLE_MEETINGS === 'true';

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
    <div className="min-h-screen bg-white text-slate-900">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
          <div className="flex items-center gap-8">
            <Link href={`/${session.user.role}`} className="text-2xl font-bold text-blue-600 hover:text-blue-700">
              {featureFlags.branding.logoText}
            </Link>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">
                <span className="font-medium text-gray-900">{session.user.name}</span>
                <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                  {session.user.role}
                </span>
              </div>

              <div className="w-px h-6 bg-gray-300"></div>
              
              <NavClientComponent role={session.user.role} isAdmin={session.user.isAdmin} studentPhase={studentPhase} />
              
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

      {(session.user.role === 'counselor' || session.user.role === 'counselor' || !newStudentCheck) && (
        <footer className="bg-white border-t mt-auto">
          <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-gray-500">
              © 2026 {featureFlags.branding.name}. {featureFlags.branding.fullTitle}.
            </p>
          </div>
        </footer>
      )}
    </div>
  );
}
