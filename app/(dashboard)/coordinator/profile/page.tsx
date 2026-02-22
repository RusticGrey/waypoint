import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { IntegrationSetupCard } from '@/components/meetings/IntegrationSetupCard';

export default async function CoordinatorProfilePage({ searchParams }: { searchParams: { reason?: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return null;

  const config = await prisma.userIntegrationConfig.findUnique({
    where: { userId: session.user.id },
  });

  const status = {
    googleConnected: config?.googleConnected || false,
    zoomConnected: config?.zoomConnected || false,
    preferredConference: (config?.preferredConference as 'Zoom' | 'GoogleMeet') || 'Zoom',
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {searchParams.reason === 'setup_required' && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-lg mb-6 flex items-start gap-3">
          <span className="text-xl">⚠️</span>
          <div>
            <p className="font-bold">Setup Required</p>
            <p className="text-sm mt-1">
              You must connect Google Calendar before managing meetings. Zoom is optional but recommended.
            </p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-black">Coordinator Profile</h1>
        <Link href="/coordinator">
          <Button variant="outline">← Back to Dashboard</Button>
        </Link>
      </div>
      
      <div className="space-y-8">
        <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Availability Settings</h2>
              <p className="text-sm text-gray-600 mt-1">Set your weekly working hours for student meetings.</p>
            </div>
            <Link href="/coordinator/meetings/availability">
              <Button>Manage Availability</Button>
            </Link>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Meeting Integrations</h2>
          <IntegrationSetupCard status={status} />
        </section>
      </div>
    </div>
  );
}
