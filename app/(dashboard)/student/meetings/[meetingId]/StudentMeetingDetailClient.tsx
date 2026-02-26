'use client';

import { useState, useEffect } from 'react';
import { StudentNoteForm } from '@/components/meetings/StudentNoteForm';
import { Button } from '@/components/ui/button';

export default function StudentMeetingDetailClient({ initialMeeting }: { initialMeeting: any }) {
  const [meeting, setMeeting] = useState(initialMeeting);
  const [isEditing, setIsEditing] = useState(false);

  // Sync state if initialMeeting changes
  useEffect(() => {
    setMeeting(initialMeeting);
  }, [initialMeeting]);

  const isCompleted = meeting.status === 'Completed';

  const handleSuccess = () => {
    setIsEditing(false);
    window.location.reload();
  };

  return (
    <div className="space-y-8">
      {/* Student Note/Feedback Form - Show if editing OR if completed and no notes yet */}
      {isCompleted && (!meeting.note?.studentNotes || isEditing) && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-500">
          <StudentNoteForm 
            meeting={meeting} 
            isEdit={isEditing} 
            onSuccess={handleSuccess} 
          />
        </div>
      )}

      {/* Session Summary & Action Items Display (Read-only for student) */}
      {isCompleted && meeting.note && (
        <div className="space-y-6 pt-4 border-t animate-in fade-in slide-in-from-bottom-2 duration-700">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              📝 Session Summary & Action Items
            </h2>
            {!isEditing && (
              <Button 
                variant="outline" 
                onClick={() => setIsEditing(true)}
                className="text-blue-600 border-blue-200 hover:bg-blue-50"
              >
                {meeting.note.studentNotes ? 'Edit Your Comments' : 'Add Comments'}
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {/* Note: Student mood is hidden from students as it's a counselor-only observation */}
             {meeting.note.nextMeetingDate && (
                <div className="p-4 rounded-lg border border-blue-100 bg-blue-50/50 text-blue-800">
                   <p className="text-[10px] font-bold uppercase tracking-widest opacity-70 mb-1">Proposed Next Session</p>
                   <p className="text-sm font-bold">
                      {new Date(meeting.note.nextMeetingDate).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                   </p>
                </div>
             )}
          </div>

          <div className="bg-blue-50/30 rounded-lg p-8 border border-blue-100 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-blue-600 uppercase tracking-widest">Counselor's Summary</h3>
                <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {meeting.note.counselorNotes || meeting.note.notes || 'No summary provided.'}
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-blue-600 uppercase tracking-widest">Your Action Items</h3>
                {meeting.note.actionItems?.length > 0 ? (
                  <div className="bg-white p-6 rounded-xl border border-blue-100 shadow-sm">
                    <ul className="space-y-3">
                      {meeting.note.actionItems.map((item: string, i: number) => (
                        <li key={i} className="text-sm text-gray-700 flex items-start gap-3">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold mt-0.5">
                            {i + 1}
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 italic">No specific action items listed.</p>
                )}
              </div>
            </div>

            {meeting.note.studentNotes && !isEditing && (
              <div className="border-t border-blue-100 pt-6">
                <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-3">Your Feedback & Comments</h3>
                <div className="bg-white/50 p-4 rounded-lg border border-blue-50">
                  <p className="text-sm text-gray-600 italic">"{meeting.note.studentNotes}"</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
