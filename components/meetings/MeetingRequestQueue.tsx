'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface MeetingRequestQueueProps {
  requests: any[];
  onUpdate: () => void;
}

export function MeetingRequestQueue({ requests, onUpdate }: MeetingRequestQueueProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-black">Pending Requests</h2>
      {requests.length === 0 ? (
        <p className="text-gray-500 italic">No pending requests.</p>
      ) : (
        requests.map((request) => (
          <MeetingRequestCard key={request.id} request={request} onUpdate={onUpdate} />
        ))
      )}
    </div>
  );
}

function MeetingRequestCard({ request, onUpdate }: { request: any; onUpdate: () => void }) {
  const [loading, setLoading] = useState(false);
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [hostNote, setHostNote] = useState('');

  const handleAccept = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/meetings/requests/${request.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Accepted' }),
      });
      if (res.ok) {
        onUpdate();
      } else {
        const data = await res.json();
        alert(`Failed to accept request: ${data.error || 'Unknown error'}${data.details ? `\nDetails: ${data.details}` : ''}`);
      }
    } catch (error) {
      console.error('Accept error:', error);
      alert('An error occurred while accepting the request.');
    } finally {
      setLoading(false);
    }
  };

  const handleDecline = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/meetings/requests/${request.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Declined', hostNote }),
      });
      if (res.ok) onUpdate();
    } catch (error) {
      console.error('Decline error:', error);
    } finally {
      setLoading(false);
      setShowDeclineModal(false);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h3 className="font-bold text-lg text-black">
              {request.student.user.firstName} {request.student.user.lastName}
            </h3>
            <p className="text-sm text-gray-700">
              {new Date(request.requestedStart).toLocaleString()} - {new Date(request.requestedEnd).toLocaleTimeString()}
            </p>
            <p className="text-sm font-medium text-blue-600 font-bold">{request.meetingType}</p>
            {request.studentNote && (
              <div className="mt-2 p-2 bg-gray-50 rounded text-sm text-gray-700 italic border-l-2 border-gray-300">
                "{request.studentNote}"
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <Button onClick={handleAccept} disabled={loading}>
              Accept
            </Button>
            <Button variant="outline" onClick={() => setShowDeclineModal(true)} disabled={loading}>
              Decline
            </Button>
          </div>
        </div>

        {showDeclineModal && (
          <div className="mt-4 p-4 border-t space-y-3">
            <label className="text-sm font-medium">Reason for declining (optional)</label>
            <textarea
              className="w-full p-2 border rounded text-sm"
              value={hostNote}
              onChange={(e) => setHostNote(e.target.value)}
              placeholder="Provide a reason or suggestion..."
            />
            <div className="flex gap-2">
              <Button onClick={handleDecline} disabled={loading} className="bg-red-600 hover:bg-red-700 text-white border-none">
                Confirm Decline
              </Button>
              <Button variant="secondary" onClick={() => setShowDeclineModal(false)} disabled={loading}>
                Cancel
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
