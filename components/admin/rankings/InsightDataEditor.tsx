'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { 
  Save, X, Loader2, AlertCircle, FileJson, Search 
} from 'lucide-react';

interface InsightDataEditorProps {
  insight: any;
  onSave: (updatedInsight: any) => void;
  onCancel: () => void;
}

export function InsightDataEditor({ insight, onSave, onCancel }: InsightDataEditorProps) {
  const [jsonText, setJsonText] = useState(JSON.stringify(insight.data || {}, null, 2));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    try {
      const parsedData = JSON.parse(jsonText);
      setSaving(true);
      setError(null);

      const res = await fetch('/api/admin/colleges/knowledge/insight-data', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          insightId: insight.id,
          data: parsedData
        }),
      });

      if (res.ok) {
        const result = await res.json();
        onSave(result.insight);
      } else {
        throw new Error('Failed to update insight data');
      }
    } catch (err: any) {
      setError(err.message || 'Invalid JSON format');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="flex-1 overflow-y-auto p-8 space-y-6">
        <div className="flex items-center justify-between">
           <div className="flex items-center gap-2">
             <FileJson className="w-4 h-4 text-brand-600" />
             <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 text-left">Structured Data Payload</span>
           </div>
           <Badge variant="brand" className="text-[8px] h-4 uppercase font-black">JSON v1.0</Badge>
        </div>

        <div className="space-y-4">
           <Textarea 
             value={jsonText}
             onChange={(e) => setJsonText(e.target.value)}
             className="font-mono text-xs h-[600px] bg-white border-slate-200 text-slate-700 focus:ring-4 focus:ring-brand-500/5 focus:border-brand-500 transition-all resize-none leading-relaxed p-7 rounded-[24px] shadow-sm overflow-y-auto custom-scrollbar"
           />
           {error && (
             <div className="flex items-center gap-2 text-red-500 text-[10px] font-black uppercase tracking-widest bg-red-50 p-3 rounded-xl border border-red-100">
               <AlertCircle className="w-3.5 h-3.5" />
               {error}
             </div>
           )}
        </div>

        <div className="flex items-start gap-4 p-5 bg-white border border-slate-200 rounded-[24px] shadow-sm">
           <Search className="w-5 h-5 text-brand-500 mt-0.5" />
           <div>
              <p className="text-[10px] text-slate-900 font-black uppercase tracking-widest text-left">Manual Override Mode</p>
              <p className="text-[11px] text-slate-500 font-medium leading-relaxed mt-1 text-left">
                 You are directly editing the source of truth for this institutional record. Any changes made here will be reflected in counselor tools and student profiles immediately.
              </p>
           </div>
        </div>
      </div>

      <div className="p-8 bg-white border-t border-slate-100 flex items-center justify-end gap-3 flex-shrink-0">
         <Button variant="ghost" onClick={onCancel} className="text-slate-500 hover:bg-slate-50 text-[10px] uppercase font-black h-11 px-6 rounded-xl">
            Cancel
         </Button>
         <Button onClick={handleSave} disabled={saving} className="bg-brand-600 hover:bg-brand-700 text-white border-none shadow-lg shadow-brand-100 text-[10px] uppercase font-black h-11 px-8 rounded-xl transition-all">
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin mr-2" /> : <><Save className="w-3.5 h-3.5 mr-2" /> Save Changes & Approve</>}
         </Button>
      </div>
    </div>
  );
}
