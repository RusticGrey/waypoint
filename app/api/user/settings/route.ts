import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { firstName, lastName, password, timezone, notificationsEnabled, defaultMeetingDuration, bufferTime } = body;

    const userId = session.user.id;
    const role = session.user.role;

    // Update basic User model
    const userUpdateData: any = {};
    if (firstName) userUpdateData.firstName = firstName;
    if (lastName) userUpdateData.lastName = lastName;
    if (timezone) userUpdateData.timezone = timezone;
    if (password) {
      userUpdateData.passwordHash = await bcrypt.hash(password, 10);
    }

    if (Object.keys(userUpdateData).length > 0) {
      await prisma.user.update({
        where: { id: userId },
        data: userUpdateData,
      });
    }

    // Update Role-specific models
    if (role === 'student') {
      const studentData: any = {};
      if (notificationsEnabled !== undefined) studentData.notificationsEnabled = notificationsEnabled;

      if (Object.keys(studentData).length > 0) {
        await prisma.student.update({
          where: { userId },
          data: studentData,
        });
      }
    } else if (role === 'counselor') {
      const counselorSettingsData: any = {};
      if (defaultMeetingDuration !== undefined) counselorSettingsData.defaultMeetingDuration = parseInt(defaultMeetingDuration);
      if (bufferTime !== undefined) counselorSettingsData.bufferTime = parseInt(bufferTime);

      if (Object.keys(counselorSettingsData).length > 0) {
        await prisma.counselorSettings.upsert({
          where: { userId },
          create: {
            userId,
            ...counselorSettingsData,
          },
          update: counselorSettingsData,
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Settings update error:', error);
    return NextResponse.json({ error: 'Failed to update settings', details: error.message }, { status: 500 });
  }
}
