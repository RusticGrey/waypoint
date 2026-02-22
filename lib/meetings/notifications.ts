import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_PORT === '465',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const from = process.env.SMTP_FROM || 'noreply@waypoint-pilot.vercel.app';

function formatDate(date: Date, timezone: string) {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
    timeStyle: 'long',
    timeZone: timezone,
  }).format(date);
}

function generateICS(meeting: any) {
  const start = new Date(meeting.startTime);
  const end = new Date(meeting.endTime);
  const formatDate = (d: Date) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  
  const content = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Waypoint//Meeting//EN',
    'BEGIN:VEVENT',
    `UID:${meeting.id}`,
    `DTSTAMP:${formatDate(new Date())}`,
    `DTSTART:${formatDate(start)}`,
    `DTEND:${formatDate(end)}`,
    `SUMMARY:${meeting.meetingType} - Waypoint`,
    `DESCRIPTION:Join Meeting: ${meeting.conferenceJoinUrl}`,
    `LOCATION:${meeting.conferenceJoinUrl}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  return {
    filename: 'meeting.ics',
    content,
    contentType: 'text/calendar'
  };
}

export async function sendMeetingConfirmation(meeting: any) {
  const { student, host, startTime, timezone, conferenceJoinUrl, meetingType } = meeting;

  const dateStr = formatDate(new Date(startTime), timezone);
  const icalEvent = generateICS(meeting);

  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #2563eb;">Meeting Confirmed</h1>
      <p>Your <strong>${meetingType}</strong> has been confirmed.</p>
      
      <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 5px 0;"><strong>Time:</strong> ${dateStr}</p>
        <p style="margin: 5px 0;"><strong>Host:</strong> ${host.firstName} ${host.lastName}</p>
        <p style="margin: 5px 0;"><strong>Student:</strong> ${student.user.firstName} ${student.user.lastName}</p>
      </div>

      <div style="text-align: center; margin: 30px 0;">
        <a href="${conferenceJoinUrl}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
          Join Meeting
        </a>
      </div>
      
      <p style="color: #6b7280; font-size: 14px; margin-top: 20px;">
        Or copy this link: <a href="${conferenceJoinUrl}">${conferenceJoinUrl}</a>
      </p>
      
      <p style="color: #6b7280; font-size: 14px;">
        A calendar invitation has been attached to this email.
      </p>
    </div>
  `;

  await Promise.all([
    transporter.sendMail({
      from,
      to: student.user.email,
      subject: `Confirmed: ${meetingType} with ${host.firstName}`,
      html,
      attachments: [icalEvent],
    }),
    transporter.sendMail({
      from,
      to: host.email,
      subject: `Confirmed: ${meetingType} with ${student.user.firstName}`,
      html,
      attachments: [icalEvent],
    }),
  ]);
}

export async function sendMeetingRequest(request: any) {
  const { host, student, requestedStart, meetingType, studentNote } = request;

  const dateStr = formatDate(new Date(requestedStart), 'UTC'); // Fallback to UTC for requests

  const html = `
    <h1>New Meeting Request</h1>
    <p><strong>Student:</strong> ${student.user.firstName} ${student.user.lastName}</p>
    <p><strong>Type:</strong> ${meetingType}</p>
    <p><strong>Requested Time:</strong> ${dateStr}</p>
    <p><strong>Student Note:</strong> ${studentNote || 'None'}</p>
    <p><a href="${process.env.NEXTAUTH_URL}/coordinator/meetings">View Request</a></p>
  `;

  await transporter.sendMail({
    from,
    to: host.email,
    subject: `New Meeting Request from ${student.user.firstName}`,
    html,
  });
}

export async function sendRequestUpdate(request: any) {
  const { student, status, suggestedStart, hostNote } = request;

  let statusText = status;
  if (status === 'ChangeSuggested') statusText = 'a counter-proposal';

  const html = `
    <h1>Meeting Request Update</h1>
    <p>Your meeting request status has changed to: <strong>${statusText}</strong>.</p>
    ${hostNote ? `<p><strong>Host Note:</strong> ${hostNote}</p>` : ''}
    ${suggestedStart ? `<p><strong>Suggested Time:</strong> ${formatDate(new Date(suggestedStart), 'UTC')}</p>` : ''}
    <p><a href="${process.env.NEXTAUTH_URL}/student/meetings">View Update</a></p>
  `;

  await transporter.sendMail({
    from,
    to: student.user.email,
    subject: `Meeting Request Update`,
    html,
  });
}

export async function sendMeetingReminder(meeting: any) {
  const { student, host, startTime, timezone, conferenceJoinUrl } = meeting;

  const dateStr = formatDate(new Date(startTime), timezone);

  const html = `
    <h1>Meeting Reminder</h1>
    <p>This is a reminder for your upcoming meeting.</p>
    <p><strong>Time:</strong> ${dateStr}</p>
    <p><strong>Join URL:</strong> <a href="${conferenceJoinUrl}">${conferenceJoinUrl}</a></p>
  `;

  await Promise.all([
    transporter.sendMail({
      from,
      to: student.user.email,
      subject: `Reminder: Meeting in 24 hours`,
      html,
    }),
    transporter.sendMail({
      from,
      to: host.email,
      subject: `Reminder: Meeting in 24 hours`,
      html,
    }),
  ]);
}

export async function sendActionItemAssigned(studentUser: any, count: number, meetingId: string) {
  const html = `
    <h1>New Action Items Assigned</h1>
    <p>You have ${count} new action item(s) from your recent meeting.</p>
    <p><a href="${process.env.NEXTAUTH_URL}/student/meetings/${meetingId}">View Meeting Details & Action Items</a></p>
  `;

  await transporter.sendMail({
    from,
    to: studentUser.email,
    subject: `New Action Items Assigned`,
    html,
  });
}
