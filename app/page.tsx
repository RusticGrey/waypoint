import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { isNewStudent } from '@/lib/api-helpers/profile';

export default async function Home() {
  const session = await getServerSession(authOptions);

  // If not logged in, redirect to login
  if (!session) {
    redirect('/login');
  }

  console.log('User session:', session);
  // If logged in as student
  if (session.user?.role === 'student') {
    // Check if this is a new student
    const newStudentCheck = await isNewStudent(session.user.id);
    if (newStudentCheck) {
      redirect('/onboarding');
    }
    
    // Otherwise, go to student dashboard
    redirect('/student');
  }

  // If logged in as coordinator or counselor, redirect to their dashboard
  if (session.user?.role === 'coordinator') {
    redirect('/coordinator');
  }

  if (session.user?.role === 'counselor') {
    redirect('/counselor');
  }

  // Fallback redirect
  redirect('/login');
}