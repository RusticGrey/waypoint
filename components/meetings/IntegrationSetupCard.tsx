'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface IntegrationSetupCardProps {
  status: {
    googleConnected: boolean;
    zoomConnected: boolean;
    preferredConference: 'Zoom' | 'GoogleMeet';
  };
  role?: 'coordinator' | 'counselor';
}

export function IntegrationSetupCard({ status: initialStatus, role = 'coordinator' }: IntegrationSetupCardProps) {
  const [status, setStatus] = useState(initialStatus);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const togglePreference = async (platform: 'Zoom' | 'GoogleMeet') => {
    setLoading(true);
    try {
      const res = await fetch('/api/integrations/preferences', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ preferredConference: platform }),
      });
      if (res.ok) {
        setStatus(prev => ({ ...prev, preferredConference: platform }));
      }
    } catch (error) {
      console.error('Failed to update preference:', error);
    } finally {
      setLoading(false);
    }
  };

  const bothConnected = status.googleConnected && status.zoomConnected;

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>1. Connect Google Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">
                Required for availability checking and event synchronization.
              </p>
              {status.googleConnected ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Connected
                </span>
              ) : (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  Not Connected
                </span>
              )}
            </div>
            {!status.googleConnected && (
              <Button onClick={() => window.location.href = '/api/auth/google'}>
                Connect Google
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>2. Connect Zoom</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">
                Required for cloud recording and automated transcripts.
              </p>
              {status.zoomConnected ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Connected
                </span>
              ) : (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  Not Connected
                </span>
              )}
            </div>
            {!status.zoomConnected && (
              <Button onClick={() => window.location.href = '/api/auth/zoom'}>
                Connect Zoom
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {bothConnected && (
        <Card className="border-blue-200 bg-blue-50/50">
          <CardHeader>
            <CardTitle className="text-blue-900">3. Conference Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-blue-800">
              Select your default platform for new meetings.
            </p>
            <div className="flex gap-4">
              <button
                disabled={loading}
                onClick={() => togglePreference('Zoom')}
                className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                  status.preferredConference === 'Zoom'
                    ? 'border-blue-500 bg-white shadow-md'
                    : 'border-gray-200 bg-gray-50 opacity-60'
                }`}
              >
                <div className="font-bold text-lg">Zoom</div>
                <div className="text-xs text-gray-500">Supports AI intelligence & transcripts</div>
              </button>
              <button
                disabled={loading}
                onClick={() => togglePreference('GoogleMeet')}
                className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                  status.preferredConference === 'GoogleMeet'
                    ? 'border-blue-500 bg-white shadow-md'
                    : 'border-gray-200 bg-gray-50 opacity-60'
                }`}
              >
                <div className="font-bold text-lg">Google Meet</div>
                <div className="text-xs text-gray-500">Fast, but no AI transcripts currently</div>
              </button>
            </div>
            {status.preferredConference === 'GoogleMeet' && (
              <p className="text-xs text-amber-700 bg-amber-50 p-2 rounded border border-amber-100">
                Note: Transcripts not available on current Google Workspace plan — meetings will complete normally but AI notes will not be generated.
              </p>
            )}
            <div className="pt-4">
              <Button className="w-full" onClick={() => router.push(`/${role}/meetings`)}>
                Go to Meetings Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
