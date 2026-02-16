import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect('/login');
  }

  // Check if student has completed onboarding
  // Only check if profiles exist (consistent with middleware and API logic)
  const student = await prisma.student.findUnique({
    where: { userId: session.user.id },
    include: {
      personalProfile: true,
      academicProfile: true,
    },
  });

  // If onboarding not complete (missing profiles), redirect to onboarding
  // Also check if the student is still in the Onboarding phase
  if (student && (student.phase === 'Onboarding')) {
    // Auto-fix for students with 100% completion but still in Onboarding phase
    if (student.profileCompletionPct === 100) {
      console.log('Auto-updating student phase to Profile_Building due to 100% completion');
      await prisma.student.update({
        where: { userId: session.user.id },
        data: { phase: 'Profile_Building' },
      });
      // Allow access to children (dashboard)
    } else {
      redirect('/onboarding');
    }
  }

  return <>{children}</>;
}
