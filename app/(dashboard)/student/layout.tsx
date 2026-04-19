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
      transcripts: true,
    },
  });

  // If onboarding not complete (missing profiles), redirect to onboarding
  // Also check if the student is still in the Onboarding phase
  if (student && (student.phase === 'Onboarding')) {
    // NOTE: Auto-advance disabled. Counselors must now manually approve transition 
    // from Onboarding to Profile Building.
    /*
    if (student.profileCompletionPct === 100) {
      console.log('Auto-updating student phase to Profile_Building due to 100% completion');
      await prisma.student.update({
        where: { userId: session.user.id },
        data: { phase: 'Profile_Building' },
      });
    } else {
      redirect('/onboarding');
    }
    */
    redirect('/onboarding');
  }

  return <>{children}</>;
}
