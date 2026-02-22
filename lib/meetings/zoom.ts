import { prisma } from '@/lib/prisma';
import { encrypt, decrypt } from '@/lib/utils/tokenEncryption';
import crypto from 'crypto';

const ZOOM_CLIENT_ID = process.env.ZOOM_CLIENT_ID;
const ZOOM_CLIENT_SECRET = process.env.ZOOM_CLIENT_SECRET;
const ZOOM_REDIRECT_URI = process.env.ZOOM_REDIRECT_URI;
const ZOOM_WEBHOOK_SECRET_TOKEN = process.env.ZOOM_WEBHOOK_SECRET_TOKEN;

export function getZoomAuthUrl(userId: string) {
  const url = new URL('https://zoom.us/oauth/authorize');
  url.searchParams.append('response_type', 'code');
  url.searchParams.append('client_id', ZOOM_CLIENT_ID || '');
  url.searchParams.append('redirect_uri', ZOOM_REDIRECT_URI || '');
  url.searchParams.append('state', userId);
  return url.toString();
}

export async function exchangeZoomCode(code: string, userId: string) {
  const basicAuth = Buffer.from(`${ZOOM_CLIENT_ID}:${ZOOM_CLIENT_SECRET}`).toString('base64');

  const response = await fetch('https://zoom.us/oauth/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basicAuth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: ZOOM_REDIRECT_URI || '',
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Zoom token exchange failed: ${error}`);
  }

  const tokens = await response.json();

  // Get Zoom user ID
  const userResponse = await fetch('https://api.zoom.us/v2/users/me', {
    headers: {
      Authorization: `Bearer ${tokens.access_token}`,
    },
  });
  const zoomUser = await userResponse.json();

  await prisma.userIntegrationConfig.upsert({
    where: { userId },
    create: {
      userId,
      zoomAccessToken: encrypt(tokens.access_token),
      zoomRefreshToken: encrypt(tokens.refresh_token),
      zoomTokenExpiry: new Date(Date.now() + tokens.expires_in * 1000),
      zoomUserId: zoomUser.id,
      zoomConnected: true,
    },
    update: {
      zoomAccessToken: encrypt(tokens.access_token),
      zoomRefreshToken: encrypt(tokens.refresh_token),
      zoomTokenExpiry: new Date(Date.now() + tokens.expires_in * 1000),
      zoomUserId: zoomUser.id,
      zoomConnected: true,
    },
  });
}

async function getValidAccessToken(userId: string): Promise<string> {
  const config = await prisma.userIntegrationConfig.findUnique({
    where: { userId },
  });

  if (!config || !config.zoomConnected || !config.zoomAccessToken || !config.zoomRefreshToken) {
    throw new Error('Zoom not connected');
  }

  // Refresh if expires within 5 minutes
  if (config.zoomTokenExpiry && config.zoomTokenExpiry.getTime() < Date.now() + 5 * 60 * 1000) {
    const basicAuth = Buffer.from(`${ZOOM_CLIENT_ID}:${ZOOM_CLIENT_SECRET}`).toString('base64');
    const response = await fetch('https://zoom.us/oauth/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basicAuth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: decrypt(config.zoomRefreshToken),
      }),
    });

    if (!response.ok) {
      throw new Error('Zoom token refresh failed');
    }

    const tokens = await response.json();
    await prisma.userIntegrationConfig.update({
      where: { userId },
      data: {
        zoomAccessToken: encrypt(tokens.access_token),
        zoomRefreshToken: encrypt(tokens.refresh_token),
        zoomTokenExpiry: new Date(Date.now() + tokens.expires_in * 1000),
      },
    });

    return tokens.access_token;
  }

  return decrypt(config.zoomAccessToken);
}

export async function createZoomMeeting(
  hostUserId: string,
  details: {
    title: string;
    startTime: string;
    duration: number;
    agenda?: string;
  }
) {
  const accessToken = await getValidAccessToken(hostUserId);

  const response = await fetch('https://api.zoom.us/v2/users/me/meetings', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      topic: details.title,
      type: 2, // Scheduled meeting
      start_time: details.startTime,
      duration: details.duration,
      agenda: details.agenda,
      settings: {
        auto_recording: 'cloud',
        join_before_host: false,
        mute_upon_entry: true,
        participant_video: true,
        host_video: true,
      },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Zoom meeting creation failed: ${error}`);
  }

  const meeting = await response.json();

  return {
    meetingId: meeting.id.toString(),
    joinUrl: meeting.join_url,
    hostUrl: meeting.start_url,
  };
}

export async function deleteZoomMeeting(hostUserId: string, meetingId: string) {
  const accessToken = await getValidAccessToken(hostUserId);

  await fetch(`https://api.zoom.us/v2/meetings/${meetingId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export function verifyZoomWebhook(body: any, timestamp: string, signature: string): boolean {
  if (!ZOOM_WEBHOOK_SECRET_TOKEN) return false;
  
  const message = `v0:${timestamp}:${JSON.stringify(body)}`;
  const hash = crypto
    .createHmac('sha256', ZOOM_WEBHOOK_SECRET_TOKEN)
    .update(message)
    .digest('hex');
  
  return `v0=${hash}` === signature;
}
