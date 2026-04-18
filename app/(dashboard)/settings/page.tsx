import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import SettingsClient from './SettingsClient';

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect('/login');
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) redirect('/login');

  let student = null;
  let counselorSettings = null;

  if (user.role === 'student') {
    student = await prisma.student.findUnique({
      where: { userId: user.id },
    });
  } else if (user.role === 'counselor') {
    counselorSettings = await prisma.counselorSettings.findUnique({
      where: { userId: user.id },
    });
  }

  return (
    <SettingsClient 
      user={JSON.parse(JSON.stringify(user))} 
      student={JSON.parse(JSON.stringify(student))}
      counselorSettings={JSON.parse(JSON.stringify(counselorSettings))}
    />
  );
}
