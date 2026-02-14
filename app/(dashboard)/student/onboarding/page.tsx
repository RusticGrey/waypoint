import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import OnboardingWizard from '@/components/forms/onboarding/OnboardingWizard';

export default async function OnboardingPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect('/login');
  }

  // Check if student has already completed onboarding
  const student = await prisma.Student.findUnique({
    where: { userId: session.user.id },
    include: {
      personalProfile: true,
      academicProfile: true,
    },
  });

  // If both profiles exist, onboarding is complete - redirect to dashboard
  if (student?.personalProfile && student?.academicProfile) {
    redirect('/student');
  }

  return (
    <div className="max-w-5xl mx-auto px-4">
      <div className="mb-8 text-center">
        <div className="mb-4">
          <h1 className="text-4xl font-bold text-gray-900">WayPoint</h1>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-2"></div>
        </div>
        <h2 className="text-2xl font-semibold text-gray-800">Build Your Profile</h2>
        <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
          Complete these 6 steps to create your comprehensive student profile. 
          This will take approximately 15-20 minutes.
        </p>
      </div>
      <OnboardingWizard student={student} userId={session.user.id}/>
    </div>
  );
}
