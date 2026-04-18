export const dynamic = 'force-dynamic';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { isNewStudent } from '@/lib/api-helpers/profile';
import { NavClientComponent } from '@/components/dashboard/NavClientComponent';
import { featureFlags } from '@/lib/feature-flags';
import { ux } from '@/lib/ux';
import { Badge } from '@/components/ui/badge';

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
    
    newStudentCheck = await isNewStudent(session.user.id);
  }  

  return (
    <div className="min-h-screen bg-surface-soft text-slate-900 flex flex-col">
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-8">
            {/* Left: Brand */}
            <div className="flex-shrink-0">
              <Link href={`/${session.user.role}`} className="text-2xl font-black text-brand-600 tracking-tighter">
                {featureFlags.branding.logoText}
              </Link>
            </div>

            {/* Middle: Navigation */}
            <div className="flex-1 overflow-x-auto no-scrollbar">
              <NavClientComponent 
                role={session.user.role} 
                isAdmin={session.user.isAdmin} 
                studentPhase={studentPhase} 
              />
            </div>

            {/* Right: User Profile & Logout */}
            <div className="flex items-center gap-6 flex-shrink-0">
              <Link href="/settings" className="hidden sm:flex flex-col items-end group">
                <span className="text-sm font-bold text-slate-900 leading-none mb-1 group-hover:text-brand-600 transition-colors">{session.user.name}</span>
                <Badge variant="brand" className="scale-90 origin-right group-hover:bg-brand-100 transition-all">{session.user.role}</Badge>
              </Link>

              <div className="w-px h-8 bg-slate-200"></div>
              
              <Link
                href="/api/auth/signout"
                className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-red-600 transition-colors"
              >
                Logout
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      {(session.user.role === 'counselor' || !newStudentCheck) && (
        <footer className="bg-white border-t border-slate-200 mt-auto">
          <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <p className="text-center text-[10px] font-bold uppercase tracking-widest text-slate-400">
              © 2026 {featureFlags.branding.name}. {featureFlags.branding.fullTitle}.
            </p>
          </div>
        </footer>
      )}
    </div>
  );
}
