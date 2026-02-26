'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface MeetingCompletionFormProps {
  meeting: any;
  onSuccess?: () => void;
  isEdit?: boolean;
}

export function MeetingCompletionForm({ meeting, onSuccess, isEdit = false }: MeetingCompletionFormProps) {
  const [loading, setLoading] = useState(false);
  const [counselorNotes, setCounselorNotes] = useState(meeting.note?.counselorNotes || '');
  const [actionItems, setActionItems] = useState(meeting.note?.actionItems?.join('\n') || '');
  const [studentMood, setStudentMood] = useState(meeting.note?.studentMood || '');
  const [nextMeetingDate, setNextMeetingDate] = useState(
    meeting.note?.nextMeetingDate ? new Date(meeting.note.nextMeetingDate).toISOString().split('T')[0] : ''
  );
  
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!counselorNotes.trim()) {
      alert('Please provide meeting notes before completing the session.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/meetings/scheduled/${meeting.id}/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          counselorNotes,
          actionItems: actionItems.split('\n').filter(i => i.trim()),
          studentMood,
          nextMeetingDate: nextMeetingDate ? new Date(nextMeetingDate).toISOString() : null,
          meetingDate: meeting.startTime,
          meetingType: meeting.meetingType,
        }),
      });

      if (res.ok) {
        router.refresh();
        if (onSuccess) onSuccess();
        else window.location.reload();
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to save notes');
      }
    } catch (err) {
      console.error('Save error:', err);
      alert('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className={`border-2 ${isEdit ? 'border-blue-100' : 'border-green-100'} shadow-md`}>
      <CardHeader className={isEdit ? 'bg-blue-50/50' : 'bg-green-50/50'}>
        <CardTitle className={`text-lg font-bold ${isEdit ? 'text-blue-800' : 'text-green-800'} flex items-center gap-2`}>
          {isEdit ? '📝 Edit Session Notes' : '✅ Finalize Session'}
        </CardTitle>
        <p className={`text-xs ${isEdit ? 'text-blue-700' : 'text-green-700'}`}>
          {isEdit ? 'Update the discussion notes and action items.' : 'Attach notes and action items to complete this meeting.'}
        </p>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="space-y-2">
               <label className="text-xs font-bold uppercase text-gray-500">Student Sentiment / Mood</label>
               <select 
                 value={studentMood}
                 onChange={(e) => setStudentMood(e.target.value)}
                 className="w-full p-2 text-sm border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
               >
                 <option value="">Select mood...</option>
                 <option value="Confident">Confident / Excited</option>
                 <option value="Stable">Stable / On Track</option>
                 <option value="Stressed">Stressed / Overwhelmed</option>
                 <option value="Anxious">Anxious / Concerned</option>
                 <option value="Neutral">Neutral</option>
               </select>
             </div>
             <div className="space-y-2">
               <label className="text-xs font-bold uppercase text-gray-500">Tentative Next Meeting</label>
               <input 
                 type="date"
                 value={nextMeetingDate}
                 onChange={(e) => setNextMeetingDate(e.target.value)}
                 className="w-full p-2 text-sm border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
               />
             </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-gray-500">Counselor Summary (Discussion & Decisions)</label>
            <textarea
              required
              value={counselorNotes}
              onChange={(e) => setCounselorNotes(e.target.value)}
              placeholder="What did you discuss with the student?"
              className={`w-full min-h-[120px] p-3 text-sm border rounded-md focus:ring-2 outline-none ${isEdit ? 'focus:ring-blue-500' : 'focus:ring-green-500'}`}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-gray-500">Action Items (One per line)</label>
            <textarea
              value={actionItems}
              onChange={(e) => setActionItems(e.target.value)}
              placeholder="Next steps for the student..."
              className={`w-full min-h-[100px] p-3 text-sm border rounded-md focus:ring-2 outline-none ${isEdit ? 'focus:ring-blue-500' : 'focus:ring-green-500'}`}
            />
          </div>

          <div className="flex gap-3 pt-2">
             {isEdit && onSuccess && (
                <Button type="button" variant="outline" onClick={onSuccess} className="flex-1">
                   Cancel
                </Button>
             )}
             <Button 
               type="submit" 
               disabled={loading}
               className={`flex-[2] ${isEdit ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'} text-white font-bold`}
             >
               {loading ? 'Saving...' : isEdit ? 'Update Notes' : 'Complete & Close Meeting'}
             </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
