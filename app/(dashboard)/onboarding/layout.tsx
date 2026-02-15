import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function OnboardingLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  // const session = await getServerSession(authOptions);

  // // Ensure user is logged in
  // if (!session) {
  //   redirect('/login');
  // }

  // // Ensure user is a student
  // if (session.user?.role !== 'student') {
  //   redirect('/');
  // }

  // // Check if user is a new student or has incomplete profile
  // const newStudent = await isNewStudent(session.user.id);
  // if (!newStudent) {
  //   redirect('/student');
  // }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="py-12">
        {children}
      </div>
    </div>
  );
}