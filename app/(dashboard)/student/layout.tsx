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
  if (student && (!student.profileCompletionPct || student.profileCompletionPct < 100)) {
    redirect('/onboarding');
  }

  return <>{children}</>;
}
