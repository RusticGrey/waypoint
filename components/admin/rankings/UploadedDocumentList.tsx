'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { 
  FileText, Calendar, User, CheckCircle2, 
  AlertCircle, Clock, Trash2, Loader2,
  RefreshCw, Play
} from 'lucide-react';
import { ux } from '@/lib/ux';
import { Checkbox } from '@/components/ui/checkbox';
import { ExtractionResultEditor } from './ExtractionResultEditor';

interface UploadedDocumentListProps {
  documents: any[];
  onUpdate?: () => void;
}

export function UploadedDocumentList({ documents, onUpdate }: UploadedDocumentListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isExtracting, setIsExtracting] = useState(false);
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
  const [newSectionValue, setNewSectionValue] = useState("");

  const toggleSelect = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === pendingDocs.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(pendingDocs.map(d => d.id)));
    }
  };

  const handleExtract = async () => {
    if (selectedIds.size === 0) return;
    setIsExtracting(true);
    try {
      const res = await fetch(`/api/counselor/documents/extract-batch`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ documentIds: Array.from(selectedIds) })
      });
      if (!res.ok) throw new Error('Failed to extract batch');
      setSelectedIds(new Set());
      if (onUpdate) onUpdate();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsExtracting(false);
    }
  };

  const pendingDocs = documents?.filter(d => d.extractionStatus === 'pending') || [];

  const handleUpdateSection = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/colleges/knowledge/documents/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section: newSectionValue })
      });
      if (!res.ok) throw new Error('Failed to update section');
      setEditingSectionId(null);
      if (onUpdate) onUpdate();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this document? All its extracted data will be removed.')) return;
    
    setDeletingId(id);
    try {
      const res = await fetch(`/api/counselor/documents/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        if (onUpdate) onUpdate();
      } else {
        throw new Error('Failed to delete document');
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  if (!documents || documents.length === 0) {
    return (
      <div className="py-12 text-center border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50">
        <FileText className="w-12 h-12 text-slate-200 mx-auto mb-4" />
        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No documents uploaded yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {pendingDocs.length > 0 && (
        <div className="flex items-center justify-between bg-slate-50 border border-slate-200 p-3 rounded-xl mb-4">
          <div className="flex items-center gap-3">
            <Checkbox 
              checked={selectedIds.size === pendingDocs.length && pendingDocs.length > 0}
              onCheckedChange={toggleSelectAll}
              className="border-slate-300"
            />
            <span className="text-xs font-black uppercase tracking-widest text-slate-600">
              {selectedIds.size} Selected
            </span>
          </div>
          <Button 
            size="sm" 
            onClick={handleExtract} 
            disabled={selectedIds.size === 0 || isExtracting}
            className="h-8 bg-brand-600 text-white hover:bg-brand-500 text-[10px] uppercase font-black"
          >
            {isExtracting ? (
              <><Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" /> Extracting...</>
            ) : (
              <><Play className="w-3.5 h-3.5 mr-2" /> Extract Selected</>
            )}
          </Button>
        </div>
      )}

      {documents.map((doc) => {
        // If the document is already extracted or failed, show the rich editor/reviewer
        if (doc.extractionStatus !== 'pending') {
          return (
            <ExtractionResultEditor 
              key={doc.id} 
              document={doc} 
              onUpdate={onUpdate} 
              onDelete={() => onUpdate && onUpdate()} 
            />
          );
        }

        // For pending documents, show the simple row with a checkbox
        return (
          <Card key={doc.id} className={cn(ux.card.base, "border-slate-100 hover:border-brand-200 transition-all")}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Checkbox 
                    checked={selectedIds.has(doc.id)}
                    onCheckedChange={() => toggleSelect(doc.id)}
                    className="border-slate-300 data-[state=checked]:bg-brand-600 data-[state=checked]:border-brand-600 mt-1"
                  />
                  <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">
                      {doc.metadata?.fileName || 'Unnamed Document'}
                    </h4>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase">
                        <Calendar className="w-3 h-3" />
                        {new Date(doc.uploadedAt).toLocaleDateString()}
                      </span>
                      <span className="text-slate-200 text-[10px]">•</span>
                      {editingSectionId === doc.id ? (
                        <div className="flex items-center gap-1">
                          <input 
                            className="text-[10px] border rounded px-1 w-24 h-5"
                            value={newSectionValue}
                            onChange={(e) => setNewSectionValue(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleUpdateSection(doc.id)}
                            autoFocus
                          />
                          <button onClick={() => handleUpdateSection(doc.id)} className="text-[8px] text-brand-600 font-black">SAVE</button>
                        </div>
                      ) : (
                        <span 
                          className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase cursor-pointer hover:text-brand-600"
                          onClick={() => {
                            setEditingSectionId(doc.id);
                            setNewSectionValue(doc.section || "General");
                          }}
                        >
                          <Clock className="w-3 h-3" />
                          {doc.section || "General"}
                        </span>
                      )}
                      <Badge 
                        variant="warning" 
                        className="text-[9px] h-4 uppercase"
                      >
                        Pending Extraction
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    onClick={() => handleDelete(doc.id)}
                    disabled={!!deletingId}
                    className="h-8 w-8 p-0 text-red-400 hover:text-red-600 hover:bg-red-50"
                  >
                    {deletingId === doc.id ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Trash2 className="w-3.5 h-3.5" />
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
