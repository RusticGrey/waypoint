'use client';

import { useState } from 'react';
import { ux } from '@/lib/ux';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { 
  FileJson, Save, X, Loader2, CheckCircle2, 
  AlertCircle, Edit3, Trash2, Terminal,
  Check, Eye, Database, FileText, CheckCircle, Search
} from 'lucide-react';

interface ExtractionResultEditorProps {
  document: any;
  onUpdate?: () => void;
  onDelete?: () => void;
}

export function ExtractionResultEditor({ document, onUpdate, onDelete }: ExtractionResultEditorProps) {
  const [activeTab, setActiveTab] = useState<'data' | 'prompt'>('data');
  const [isEditing, setIsEditing] = useState(false);
  const [jsonText, setJsonText] = useState(JSON.stringify(document.extractedData || {}, null, 2));
  const [saving, setSaving] = useState(false);
  const [approving, setApproving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const handleSave = async () => {
    try {
      const parsedData = JSON.parse(jsonText);
      setSaving(true);
      setError(null);

      const res = await fetch(`/api/counselor/documents/${document.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          extractedData: parsedData,
          extractionStatus: 'extracted' // Promote to extracted if edited
        }),
      });

      if (res.ok) {
        setIsEditing(false);
        if (onUpdate) onUpdate();
      } else {
        throw new Error('Failed to update extraction results');
      }
    } catch (err: any) {
      setError(err.message || 'Invalid JSON format');
    } finally {
      setSaving(false);
    }
  };

  const handleApprove = async () => {
    setApproving(true);
    try {
      if (document.isAggregatedDraft) {
        // Approving a Draft Record (from batch extraction)
        const syncRes = await fetch(`/api/admin/college-rankings/approve`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            draftId: document.id,
            proposal: {
               collegeId: document.collegeId,
               sourceName: document.sourceType,
               academicYear: new Date().getFullYear().toString(),
               proposedData: document.extractedData,
               confidence: 1.0,
               modelUsed: "Aggregated Verified Expert"
            } 
          }),
        });

        if (!syncRes.ok) throw new Error('Failed to sync Draft to College Insights');
      } else {
        // Legacy: Approving an individual document
        const res = await fetch(`/api/counselor/documents/${document.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ extractionStatus: 'extracted' }),
        });

        if (!res.ok) throw new Error('Failed to approve document extraction');

        const syncRes = await fetch(`/api/admin/college-rankings/approve`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            proposal: {
               collegeId: document.collegeId,
               sourceName: document.sourceType,
               academicYear: new Date().getFullYear().toString(),
               proposedData: document.extractedData,
               confidence: 1.0,
               modelUsed: "Verified Expert"
            } 
          }),
        });

        if (!syncRes.ok) throw new Error('Failed to sync to College Insights');
      }
      
      if (onUpdate) onUpdate();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setApproving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this document and its extracted data?')) return;
    
    setDeleting(true);
    try {
      const res = await fetch(`/api/counselor/documents/${document.id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        if (onDelete) onDelete();
      } else {
        throw new Error('Failed to delete document');
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setDeleting(false);
    }
  };

  const isPending = document.extractionStatus !== 'extracted' && document.extractionStatus !== 'failed';

  return (
    <Card className={cn(
      ux.card.base, 
      "border-slate-200 overflow-hidden shadow-sm",
      isPending && "ring-2 ring-amber-500/20 border-amber-200 bg-amber-50/5"
    )}>
      <CardHeader className="py-5 bg-white border-b border-slate-50 px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={cn(
              "w-10 h-10 rounded-2xl flex items-center justify-center shadow-sm",
              isPending ? "bg-amber-50 text-amber-600" : "bg-brand-50 text-brand-600"
            )}>
              <FileJson className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-xs font-black uppercase tracking-widest text-slate-900">
                {document.metadata?.fileName || 'Document Extraction'}
              </CardTitle>
              <div className="flex items-center gap-3 mt-1">
                <Badge 
                  variant={document.extractionStatus === 'extracted' ? 'success' : 'warning'} 
                  className="text-[8px] h-4 uppercase tracking-tighter"
                >
                  {document.extractionStatus === 'extracted' ? 'Approved' : 'Review Required'}
                </Badge>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight flex items-center gap-1">
                   <FileText className="w-2.5 h-2.5" />
                   {document.sourceType} • {new Date(document.uploadedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!isEditing && (
              <>
                <div className="flex p-1 bg-slate-100/50 rounded-xl mr-2 border border-slate-100">
                  <button 
                    onClick={() => setActiveTab('data')}
                    className={cn(
                      "px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all",
                      activeTab === 'data' ? "bg-white text-brand-600 shadow-sm border border-slate-100" : "text-slate-400 hover:text-slate-600"
                    )}
                  >
                    Results
                  </button>
                  <button 
                    onClick={() => setActiveTab('prompt')}
                    className={cn(
                      "px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all",
                      activeTab === 'prompt' ? "bg-white text-brand-600 shadow-sm border border-slate-100" : "text-slate-400 hover:text-slate-600"
                    )}
                  >
                    Instructions
                  </button>
                </div>
                {isPending && (
                  <Button 
                    onClick={handleApprove} 
                    disabled={approving}
                    className="h-9 text-[10px] uppercase font-black px-4 bg-green-600 text-white hover:bg-green-700 border-none shadow-lg shadow-green-100"
                  >
                    {approving ? <Loader2 className="w-3.5 h-3.5 animate-spin mr-2" /> : <Check className="w-3.5 h-3.5 mr-2" />} 
                    Approve Data
                  </Button>
                )}
                <Button variant="ghost" onClick={() => setIsEditing(true)} className="h-9 text-[10px] uppercase font-black px-4 hover:bg-slate-50">
                  <Edit3 className="w-3.5 h-3.5 mr-2" /> Edit JSON
                </Button>
                <Button variant="ghost" onClick={handleDelete} disabled={deleting} className="h-9 text-[10px] uppercase font-black px-4 text-red-400 hover:text-red-600 hover:bg-red-50">
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </>
            )}
            {isEditing && (
              <>
                <Button variant="ghost" onClick={() => setIsEditing(false)} className="h-9 text-[10px] uppercase font-black px-4">
                  <X className="w-3.5 h-3.5 mr-2" /> Discard
                </Button>
                <Button onClick={handleSave} disabled={saving} className="h-9 text-[10px] uppercase font-black px-6 bg-brand-600 text-white">
                  {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin mr-2" /> : <><Save className="w-3.5 h-3.5 mr-2" /> Save & Commit</>}
                </Button>
              </>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {activeTab === 'data' ? (
          <div className="bg-slate-50/30 p-6 border-b border-slate-50">
            {isEditing ? (
              <div className="space-y-4">
                <Textarea 
                  value={jsonText}
                  onChange={(e) => setJsonText(e.target.value)}
                  className="font-mono text-xs h-[400px] bg-white border-slate-200 text-slate-700 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/5 transition-all resize-none leading-relaxed p-6 rounded-2xl shadow-inner"
                />
                {error && (
                  <div className="flex items-center gap-2 text-red-500 text-[10px] font-black uppercase tracking-widest bg-red-50 p-3 rounded-xl border border-red-100">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {error}
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                   {document.extractedData && Object.entries(document.extractedData).map(([key, value]) => {
                     if (typeof value !== 'object') {
                       return (
                         <div key={key} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-1">
                           <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{key.replace(/([A-Z])/g, ' $1')}</span>
                           <span className="text-sm font-bold text-slate-800 truncate">{String(value)}</span>
                         </div>
                       );
                     }
                     return null;
                   })}
                </div>
                
                <div className="bg-white rounded-2xl border border-slate-200 shadow-inner overflow-hidden mt-4">
                  <div className="bg-slate-50 border-b border-slate-100 p-3 flex items-center justify-between">
                     <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                       <Search className="w-3 h-3" /> Raw JSON Payload
                     </span>
                  </div>
                  <div className="bg-slate-950 p-6">
                     <pre className="font-mono text-[11px] text-brand-300 max-h-[300px] overflow-auto leading-relaxed custom-scrollbar">
                      {JSON.stringify(document.extractedData || { message: "Waiting for manual extraction..." }, null, 2)}
                    </pre>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-slate-50/50 p-8 space-y-6">
            <div className="flex items-center gap-2 text-slate-400">
              <Terminal className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Active Template Logic</span>
            </div>
            <div className="text-[11px] text-slate-600 font-medium leading-relaxed max-h-[300px] overflow-auto whitespace-pre-wrap font-mono bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              {document.template?.promptTemplate || "No prompt history available for this legacy record."}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
