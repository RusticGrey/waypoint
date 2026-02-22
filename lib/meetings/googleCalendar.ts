import { google } from 'googleapis';
import { prisma } from '@/lib/prisma';
import { encrypt, decrypt } from '@/lib/utils/tokenEncryption';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;

export function getAuthUrl(userId: string) {
  const oauth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI
  );

  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/calendar.events',
      'https://www.googleapis.com/auth/calendar.readonly',
    ],
    state: userId,
  });
}

export async function exchangeCode(code: string, userId: string) {
  const oauth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI
  );

  const { tokens } = await oauth2Client.getToken(code);

  await prisma.userIntegrationConfig.upsert({
    where: { userId },
    create: {
      userId,
      googleAccessToken: tokens.access_token ? encrypt(tokens.access_token) : null,
      googleRefreshToken: tokens.refresh_token ? encrypt(tokens.refresh_token) : null,
      googleTokenExpiry: tokens.expiry_date ? new Date(tokens.expiry_date) : null,
      googleConnected: true,
    },
    update: {
      googleAccessToken: tokens.access_token ? encrypt(tokens.access_token) : null,
      googleRefreshToken: tokens.refresh_token ? encrypt(tokens.refresh_token) : null,
      googleTokenExpiry: tokens.expiry_date ? new Date(tokens.expiry_date) : null,
      googleConnected: true,
    },
  });
}

async function getAuthenticatedClient(userId: string) {
  const config = await prisma.userIntegrationConfig.findUnique({
    where: { userId },
  });

  if (!config || !config.googleConnected) {
    throw new Error('Google Calendar not connected');
  }

  const oauth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI
  );

  oauth2Client.setCredentials({
    access_token: config.googleAccessToken ? decrypt(config.googleAccessToken) : undefined,
    refresh_token: config.googleRefreshToken ? decrypt(config.googleRefreshToken) : undefined,
    expiry_date: config.googleTokenExpiry?.getTime(),
  });

  oauth2Client.on('tokens', async (tokens) => {
    if (tokens.access_token) {
      await prisma.userIntegrationConfig.update({
        where: { userId },
        data: {
          googleAccessToken: encrypt(tokens.access_token),
          googleTokenExpiry: tokens.expiry_date ? new Date(tokens.expiry_date) : null,
          ...(tokens.refresh_token ? { googleRefreshToken: encrypt(tokens.refresh_token) } : {}),
        },
      });
    }
  });

  return oauth2Client;
}

export async function getFreeBusy(hostUserId: string, timeMin: string, timeMax: string) {
  const client = await getAuthenticatedClient(hostUserId);
  const calendar = google.calendar({ version: 'v3', auth: client });

  const config = await prisma.userIntegrationConfig.findUnique({
    where: { userId: hostUserId },
  });

  const calendarId = config?.googleCalendarId || 'primary';

  const response = await calendar.freebusy.query({
    requestBody: {
      timeMin,
      timeMax,
      items: [{ id: calendarId }],
    },
  });

  const busy = response.data.calendars?.[calendarId]?.busy || [];
  return busy;
}

export async function createEvent(
  hostUserId: string,
  details: {
    title: string;
    description: string;
    startTime: string;
    endTime: string;
    studentEmail: string;
    requestMeetLink: boolean;
    transparency?: 'opaque' | 'transparent';
  }
) {
  const client = await getAuthenticatedClient(hostUserId);
  const calendar = google.calendar({ version: 'v3', auth: client });

  const config = await prisma.userIntegrationConfig.findUnique({
    where: { userId: hostUserId },
  });

  const calendarId = config?.googleCalendarId || 'primary';

  const event: any = {
    summary: details.title,
    description: details.description,
    start: { dateTime: details.startTime },
    end: { dateTime: details.endTime },
    attendees: [{ email: details.studentEmail }],
    transparency: details.transparency || 'opaque',
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 1440 },
        { method: 'popup', minutes: 30 },
      ],
    },
  };

  if (details.requestMeetLink) {
    event.conferenceData = {
      createRequest: {
        requestId: Math.random().toString(36).substring(7),
        conferenceSolutionKey: { type: 'hangoutsMeet' },
      },
    };
  }

  const response = await calendar.events.insert({
    calendarId,
    requestBody: event,
    conferenceDataVersion: details.requestMeetLink ? 1 : 0,
  });

  let meetLink = null;
  if (details.requestMeetLink) {
    meetLink = response.data.conferenceData?.entryPoints?.find(
      (ep) => ep.entryPointType === 'video'
    )?.uri || null;
  }

  return {
    eventId: response.data.id!,
    meetLink,
  };
}

export async function updateEvent(
  hostUserId: string,
  eventId: string,
  updates: {
    title?: string;
    description?: string;
    transparency?: 'opaque' | 'transparent';
  }
) {
  const client = await getAuthenticatedClient(hostUserId);
  const calendar = google.calendar({ version: 'v3', auth: client });

  const config = await prisma.userIntegrationConfig.findUnique({
    where: { userId: hostUserId },
  });
  const calendarId = config?.googleCalendarId || 'primary';

  const existing = await calendar.events.get({ calendarId, eventId });
  
  await calendar.events.patch({
    calendarId,
    eventId,
    requestBody: {
      summary: updates.title || existing.data.summary,
      description: updates.description || existing.data.description,
      transparency: updates.transparency || existing.data.transparency,
    },
  });
}

export async function deleteEvent(hostUserId: string, eventId: string) {
  const client = await getAuthenticatedClient(hostUserId);
  const calendar = google.calendar({ version: 'v3', auth: client });

  const config = await prisma.userIntegrationConfig.findUnique({
    where: { userId: hostUserId },
  });

  const calendarId = config?.googleCalendarId || 'primary';

  await calendar.events.delete({
    calendarId,
    eventId,
  });
}
