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
  const student = await prisma.student.findUnique({
    where: { userId: session.user.id },
    select: {
      phase: true,
      profileCompletionPct: true,
    },
  });

  // If onboarding not complete (< 100%), redirect to onboarding
  // even if they are in the Onboarding phase.
  if (student && student.phase === 'Onboarding' && student.profileCompletionPct < 100) {
    redirect('/onboarding');
  }

  return <>{children}</>;
}
