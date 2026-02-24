'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AvatarInitials } from '@/components/meetings/AvatarInitials';
import { formatDate } from '@/lib/meetings/meetingUtils';

interface MeetingRequestProps {
  requests: any[];
  onUpdate: () => void;
}

export function MeetingRequest({ requests, onUpdate }: MeetingRequestProps) {
  if (requests.length === 0) {
    return (
      <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200">
        <CardContent className="p-6 text-center">
          <p className="text-gray-600 font-medium">No pending requests</p>
          <p className="text-sm text-gray-500 mt-1">All caught up! 🎉</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {requests.map((request) => (
        <MeetingRequestCard key={request.id} request={request} onUpdate={onUpdate} />
      ))}
    </div>
  );
}

function MeetingRequestCard({ request, onUpdate }: { request: any; onUpdate: () => void }) {
  const [loading, setLoading] = useState(false);
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [hostNote, setHostNote] = useState('');

  const handleAction = async (status: 'Accepted' | 'Declined') => {
    setLoading(true);
    try {
      const res = await fetch(`/api/meetings/requests/${request.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status,
          ...(status === 'Declined' && { hostNote }),
        }),
      });

      if (res.ok) {
        onUpdate();
        setShowDeclineModal(false);
        setHostNote('');
      } else {
        const data = await res.json();
        alert(`Failed: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Request action error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-l-4 border-l-yellow-400 bg-white hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start gap-3">
            <AvatarInitials
              firstName={request.student.user.firstName}
              lastName={request.student.user.lastName}
              size="md"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-900">
                {request.student.user.firstName} {request.student.user.lastName}
              </h3>
              <p className="text-sm text-gray-600">{request.meetingType}</p>
              <p className="text-xs text-gray-500 mt-1">
                📅 {formatDate(request.requestedStart)} • ⏰ {new Date(request.requestedStart).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>

          {/* Student Note */}
          {request.studentNote && (
            <div className="p-3 bg-blue-50 border-l-2 border-blue-300 rounded text-sm text-gray-700">
              <p className="font-medium text-blue-900 mb-1">Student's Message:</p>
              <p className="italic">"{request.studentNote}"</p>
            </div>
          )}

          {/* Actions */}
          {!showDeclineModal ? (
            <div className="flex gap-2 pt-2">
              <Button
                onClick={() => handleAction('Accepted')}
                disabled={loading}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                ✅ Accept
              </Button>
              <Button
                onClick={() => setShowDeclineModal(true)}
                disabled={loading}
                variant="outline"
                className="flex-1 text-gray-700 border-gray-300 hover:bg-red-50"
              >
                ❌ Decline
              </Button>
            </div>
          ) : (
            <div className="space-y-3 pt-2 border-t">
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                value={hostNote}
                onChange={(e) => setHostNote(e.target.value)}
                placeholder="Optional: Explain why or suggest an alternative time..."
                rows={3}
              />
              <div className="flex gap-2">
                <Button
                  onClick={() => handleAction('Declined')}
                  disabled={loading}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                >
                  Confirm Decline
                </Button>
                <Button
                  onClick={() => {
                    setShowDeclineModal(false);
                    setHostNote('');
                  }}
                  disabled={loading}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
