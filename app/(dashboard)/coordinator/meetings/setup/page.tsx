import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { IntegrationSetupCard } from '@/components/meetings/IntegrationSetupCard';

export default async function MeetingSetupPage() {
  const session = await getServerSession(authOptions);
  
  const config = await prisma.userIntegrationConfig.findUnique({
    where: { userId: session!.user.id },
  });

  const status = {
    googleConnected: config?.googleConnected || false,
    zoomConnected: config?.zoomConnected || false,
    preferredConference: (config?.preferredConference as 'Zoom' | 'GoogleMeet') || 'Zoom',
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-900">Meeting Setup</h1>
      <IntegrationSetupCard status={status} />
    </div>
  );
}
