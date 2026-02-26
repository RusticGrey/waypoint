'use client';

import { useState, useEffect } from 'react';
import { MeetingCompletionForm } from '@/components/meetings/MeetingCompletionForm';
import { Button } from '@/components/ui/button';

export default function CounselorMeetingDetailClient({ initialMeeting }: { initialMeeting: any }) {
  const [meeting, setMeeting] = useState(initialMeeting);
  const [isEditing, setIsEditing] = useState(false);

  // Sync state if initialMeeting changes
  useEffect(() => {
    setMeeting(initialMeeting);
  }, [initialMeeting]);

  const now = new Date();
  const startTime = new Date(meeting.startTime);
  const isPastOrOngoing = startTime <= now;
  const isCompleted = meeting.status === 'Completed';

  const handleSuccess = () => {
    setIsEditing(false);
    window.location.reload();
  };

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'Confident': return 'text-green-600 bg-green-50 border-green-100';
      case 'Stable': return 'text-blue-600 bg-blue-50 border-blue-100';
      case 'Stressed': return 'text-orange-600 bg-orange-50 border-orange-100';
      case 'Anxious': return 'text-red-600 bg-red-50 border-red-100';
      default: return 'text-gray-600 bg-gray-50 border-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Completion/Edit Form */}
      {(!isCompleted && isPastOrOngoing && meeting.status !== 'Cancelled') || isEditing ? (
        <div className="animate-in fade-in slide-in-from-top-4 duration-500">
          <MeetingCompletionForm 
            meeting={meeting} 
            isEdit={isEditing} 
            onSuccess={handleSuccess} 
          />
        </div>
      ) : null}

      {/* Notes Display */}
      {isCompleted && !isEditing && meeting.note && (
        <div className="space-y-6 pt-4 border-t">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              📝 Meeting Summary & Notes
            </h2>
            <Button 
              variant="outline" 
              onClick={() => setIsEditing(true)}
              className="text-blue-600 border-blue-200 hover:bg-blue-50"
            >
              Edit Notes
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             {meeting.note.studentMood && (
                <div className={`p-4 rounded-lg border ${getMoodColor(meeting.note.studentMood)}`}>
                   <p className="text-[10px] font-bold uppercase tracking-widest opacity-70 mb-1">Student Sentiment</p>
                   <p className="text-sm font-bold">{meeting.note.studentMood}</p>
                </div>
             )}
             {meeting.note.nextMeetingDate && (
                <div className="p-4 rounded-lg border border-blue-100 bg-blue-50/50 text-blue-800">
                   <p className="text-[10px] font-bold uppercase tracking-widest opacity-70 mb-1">Target Next Meeting</p>
                   <p className="text-sm font-bold">
                      {new Date(meeting.note.nextMeetingDate).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                   </p>
                </div>
             )}
          </div>

          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 space-y-6">
            <div>
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Discussion Notes (Counselor)</h3>
              <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{meeting.note.counselorNotes || meeting.note.notes}</p>
            </div>
            
            {meeting.note.actionItems?.length > 0 && (
              <div>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Action Items</h3>
                <ul className="list-disc list-inside space-y-1">
                  {meeting.note.actionItems.map((item: string, i: number) => (
                    <li key={i} className="text-sm text-gray-700">{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {meeting.note.studentNotes && (
              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-2">Student Notes & Feedback</h3>
                <p className="text-sm text-gray-600 italic">"{meeting.note.studentNotes}"</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
