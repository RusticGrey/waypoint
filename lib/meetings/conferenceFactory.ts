import { prisma } from '@/lib/prisma';
import { createZoomMeeting } from './zoom';
import { createEvent } from './googleCalendar';

export interface ConferenceResult {
  platform: 'Zoom' | 'GoogleMeet';
  conferenceId: string;
  conferenceJoinUrl: string;
  conferenceHostUrl: string | null;
  googleCalendarEventId: string | null;
}

export async function createConferenceMeeting(
  hostUserId: string,
  details: {
    title: string;
    description: string;
    startTime: string;
    endTime: string;
    studentEmail: string;
    durationMinutes: number;
    agenda?: string;
  }
): Promise<ConferenceResult> {
  const config = await prisma.userIntegrationConfig.findUnique({
    where: { userId: hostUserId },
  });

  const preferredConference = config?.preferredConference || 'Zoom';

  if (preferredConference === 'Zoom') {
    // 1. Create Zoom Meeting
    const zoomMeeting = await createZoomMeeting(hostUserId, {
      title: details.title,
      startTime: details.startTime,
      duration: details.durationMinutes,
      agenda: details.agenda,
    });

    // 2. Create GCal Event with Zoom Link in description
    // Note: We always create a fresh event here to replace the tentative one.
    const gcalEvent = await createEvent(hostUserId, {
      title: details.title,
      description: `${details.description}\n\nJoin Zoom Meeting: ${zoomMeeting.joinUrl}`,
      startTime: details.startTime,
      endTime: details.endTime,
      studentEmail: details.studentEmail,
      requestMeetLink: false,
      transparency: 'opaque',
    });

    return {
      platform: 'Zoom',
      conferenceId: zoomMeeting.meetingId,
      conferenceJoinUrl: zoomMeeting.joinUrl,
      conferenceHostUrl: zoomMeeting.hostUrl,
      googleCalendarEventId: gcalEvent.eventId,
    };
  } else {
    // Google Meet path
    const gcalEvent = await createEvent(hostUserId, {
      title: details.title,
      description: details.description,
      startTime: details.startTime,
      endTime: details.endTime,
      studentEmail: details.studentEmail,
      requestMeetLink: true,
      transparency: 'opaque',
    });

    if (!gcalEvent.meetLink) {
      throw new Error('Google Meet link could not be generated — check that the Google account supports Meet.');
    }

    return {
      platform: 'GoogleMeet',
      conferenceId: gcalEvent.eventId,
      conferenceJoinUrl: gcalEvent.meetLink,
      conferenceHostUrl: null,
      googleCalendarEventId: gcalEvent.eventId,
    };
  }
}
