import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { IntegrationSetupCard } from '@/components/meetings/IntegrationSetupCard';

export default async function CoordinatorProfilePage() {
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
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Coordinator Profile</h1>
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
