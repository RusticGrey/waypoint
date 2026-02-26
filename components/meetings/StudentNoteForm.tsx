'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StudentNoteFormProps {
  meeting: any;
  onSuccess?: () => void;
  isEdit?: boolean;
}

export function StudentNoteForm({ meeting, onSuccess, isEdit = false }: StudentNoteFormProps) {
  const [loading, setLoading] = useState(false);
  const [studentNotes, setStudentNotes] = useState(meeting.note?.studentNotes || '');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/meetings/scheduled/${meeting.id}/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentNotes,
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
    <Card className={`border-2 border-blue-100 shadow-md`}>
      <CardHeader className="bg-blue-50/50">
        <CardTitle className={`text-lg font-bold text-blue-800 flex items-center gap-2`}>
          {isEdit ? '📝 Edit Your Comments' : '💬 Add Your Comments'}
        </CardTitle>
        <p className={`text-xs text-blue-700`}>
          Share your feedback or questions about this session.
        </p>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-gray-500">My Notes & Feedback</label>
            <textarea
              value={studentNotes}
              onChange={(e) => setStudentNotes(e.target.value)}
              placeholder="What are your thoughts on today's session?"
              className={`w-full min-h-[120px] p-3 text-sm border rounded-md focus:ring-2 focus:ring-blue-500 outline-none`}
            />
          </div>

          <div className="flex gap-3">
             {isEdit && onSuccess && (
                <Button type="button" variant="outline" onClick={onSuccess} className="flex-1">
                   Cancel
                </Button>
             )}
             <Button 
               type="submit" 
               disabled={loading}
               className={`flex-[2] bg-blue-600 hover:bg-blue-700 text-white font-bold`}
             >
               {loading ? 'Saving...' : 'Save My Comments'}
             </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
