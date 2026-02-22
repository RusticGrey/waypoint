import { redirect } from 'next/navigation';

export default function MeetingSetupPage({ searchParams }: { searchParams: { reason?: string } }) {
  const query = searchParams.reason ? `?reason=${searchParams.reason}` : '';
  redirect(`/coordinator/profile${query}`);
}
