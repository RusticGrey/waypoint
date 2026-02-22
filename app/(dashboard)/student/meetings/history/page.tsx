import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { ProgressReportHistory } from '@/components/meetings/ProgressReportHistory';

export default async function ProgressReportHistoryPage({ params }: { params: { studentId: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return null;

  // For students, the param is implicitly their own or they are on a path like /student/meetings/history
  // The route is app/api/progress-report/[studentId]/history
  // The page is app/(dashboard)/student/meetings/history/page.tsx or app/(dashboard)/coordinator/students/[studentId]/history/page.tsx
  
  // Let's check the context of where this page is being called from.
  // Student path: app/(dashboard)/student/meetings/history/page.tsx
  // Coordinator path: app/(dashboard)/coordinator/students/[studentId]/history/page.tsx

  const studentId = params.studentId || session.user.id;

  if (session.user.role === 'student' && studentId !== session.user.id) {
    return notFound();
  }

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Progress Report History</h1>
        <a href="../" className="text-sm text-blue-600 hover:underline">← Back</a>
      </div>
      <ProgressReportHistory studentId={studentId} />
    </div>
  );
}
