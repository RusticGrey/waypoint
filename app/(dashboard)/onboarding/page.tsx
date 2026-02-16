import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import OnboardingWizard from '@/components/forms/onboarding/OnboardingWizard';
import { isNewStudent } from '@/lib/api-helpers/profile';

export default async function OnboardingPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect('/login');
  }

  // Check if this is a new student
  const newStudentCheck = await isNewStudent(session.user.id);
  if (!newStudentCheck) {
    redirect('/student');
  }
  
  // Check student's profile completion status
  const student = await prisma.student.findUnique({
    where: { userId: session.user.id },
    include: {
      personalProfile: true,
      academicProfile: true,
      transcripts: true,
      activities: true,
      achievements: true,
      projectExperiences: true,
    },
  });

  // // If profile is 100% complete, redirect to dashboard
  // if (student && student.profileCompletionPct >= 100) {
  //   redirect('/student');
  // }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <div className="mb-4">
          <h1 className="text-4xl font-bold text-gray-900">Student Profile</h1>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-2"></div>
        </div>
        {/* <h2 className="text-2xl font-semibold text-gray-800">Build Your Profile</h2> */}
        <p className="mt-2 text-gray-600 max-w-4xl mx-auto">
          Complete these steps to create your comprehensive student profile. 
          This will take approximately 15-20 minutes.
        </p>
      </div>
      <OnboardingWizard student={student} userId={session.user.id}/>
    </div>
  );
}
