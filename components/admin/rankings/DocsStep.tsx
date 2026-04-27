"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { FileText, Calendar, Database, Plus, Play, Trash2, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface DocsStepProps {
  documents: any[];
  onUploadNew: () => void;
  onInitializeExtraction: (documentIds: string[]) => void;
  onDelete: (id: string) => Promise<void>;
  loading: boolean;
}

export const DocsStep: React.FC<DocsStepProps> = ({
  documents,
  onUploadNew,
  onInitializeExtraction,
  onDelete,
  loading,
}) => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");

  const toggleSelect = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const toggleSelectAll = (docs: any[]) => {
    const docIds = docs.map(d => d.id);
    const allSelected = docIds.every(id => selectedIds.has(id));
    
    const next = new Set(selectedIds);
    if (allSelected) {
      docIds.forEach(id => next.delete(id));
    } else {
      docIds.forEach(id => next.add(id));
    }
    setSelectedIds(next);
  };

  const filteredDocuments = documents.filter((doc) =>
    (doc.metadata?.fileName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (doc.sourceType || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (doc.section || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group by Source Type
  const groupedDocuments: Record<string, any[]> = {};
  filteredDocuments.forEach(doc => {
    // Robust source identification: metadata > sourceType > fallback
    const sourceName = doc.metadata?.rankingSourceName || doc.sourceType || "Uncategorized";
    if (!groupedDocuments[sourceName]) groupedDocuments[sourceName] = [];
    groupedDocuments[sourceName].push(doc);
  });

  return (
    <div className="space-y-8">
      {/* Header with Search & Upload Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-1">
            Institutional Documents
          </h2>
          <p className="text-slate-500 font-medium">
            Review your source repository and stage files for AI analysis.
          </p>
        </div>
        <Button
          onClick={onUploadNew}
          className="bg-brand-600 hover:bg-brand-700 text-white font-black uppercase tracking-widest text-[10px] px-6 py-6 rounded-2xl shadow-xl shadow-brand-100 transition-all active:scale-[0.98]"
        >
          <Plus className="w-4 h-4 mr-2 stroke-[3px]" />
          Upload New Source
        </Button>
      </div>

      {/* Search & Actions Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-50/50 p-4 rounded-3xl border border-slate-100 shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
          <input
            type="text"
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-brand-500 outline-none transition-all text-sm font-medium text-slate-700"
          />
        </div>

        {selectedIds.size > 0 && (
          <Button
            onClick={() => onInitializeExtraction(Array.from(selectedIds))}
            className="w-full sm:w-auto bg-slate-900 hover:bg-black text-white font-black uppercase tracking-widest text-[10px] px-8 py-3 rounded-2xl shadow-lg transition-all animate-in zoom-in-95"
          >
            <Play className="w-3 h-3 mr-2 fill-white" />
            Process {selectedIds.size} Selected
          </Button>
        )}
      </div>

      {/* Document List */}
      <div className="space-y-8">
        {Object.entries(groupedDocuments).map(([source, docs]) => (
          <div key={source} className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                <Database className="w-3 h-3" /> {source}
              </h3>
              <button 
                onClick={() => toggleSelectAll(docs)}
                className="text-[9px] font-black uppercase tracking-widest text-brand-600 hover:text-brand-700 transition-colors"
              >
                {docs.every(d => selectedIds.has(d.id)) ? "Deselect All" : "Select All"}
              </button>
            </div>
            
            <div className="grid gap-2">
              {docs.map((doc) => {
                const date = doc.uploadedAt ? new Date(doc.uploadedAt) : new Date();
                const isValidDate = !isNaN(date.getTime());
                const formattedDate = isValidDate ? date.toLocaleDateString() : "Unknown Date";
                const docTypeLabel = (doc.documentType || 'html').toUpperCase().replace('_', ' ');

                return (
                <div
                  key={doc.id}
                  className={cn(
                    "group flex items-center justify-between p-3 bg-white border rounded-2xl transition-all hover:shadow-sm",
                    selectedIds.has(doc.id) ? "border-brand-300 bg-brand-50/20" : "border-slate-100"
                  )}
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <Checkbox
                      checked={selectedIds.has(doc.id)}
                      onCheckedChange={() => toggleSelect(doc.id)}
                      className="border-slate-300 data-[state=checked]:bg-brand-600 data-[state=checked]:border-brand-600 rounded-md"
                    />
                    <div className={cn(
                      "w-8 h-8 rounded-xl flex items-center justify-center transition-colors",
                      selectedIds.has(doc.id) ? "bg-white shadow-sm border border-brand-100" : "bg-slate-50"
                    )}>
                      <FileText className={cn("w-4 h-4", selectedIds.has(doc.id) ? "text-brand-600" : "text-slate-300")} />
                    </div>
                    <div className="flex-1 min-w-0 flex items-center justify-between gap-6">
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <h4 className="text-[11px] font-black text-slate-900 truncate uppercase tracking-tight">
                          {doc.metadata?.fileName || "Unnamed Source"}
                        </h4>
                        <Badge variant="neutral" className="text-[8px] font-bold px-1.5 py-0 border-slate-200 text-slate-400 bg-transparent shrink-0">
                          {docTypeLabel}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-6 shrink-0">
                        <span className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                          <Calendar className="w-3 h-3" />
                          {formattedDate}
                        </span>
                        <div className="flex items-center gap-2">
                          <div className={cn(
                            "w-2 h-2 rounded-full shadow-sm",
                            doc.extractionStatus === "pending" ? "bg-amber-400" : "bg-green-500"
                          )} />
                          <span className={cn(
                            "text-[9px] font-black uppercase tracking-widest",
                            doc.extractionStatus === "pending" ? "text-amber-600" : "text-green-600"
                          )}>
                            {doc.extractionStatus === "pending" ? "Staged" : "Analyzed"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pl-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(doc.id)}
                      className="h-10 w-10 p-0 rounded-2xl text-slate-300 hover:text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )})}
            </div>
          </div>
        ))}

        {filteredDocuments.length === 0 && (
          <div className="py-20 text-center border-3 border-dashed border-slate-100 rounded-[40px] bg-slate-50/30">
            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-sm border border-slate-100 mx-auto mb-6">
               <FileText className="w-10 h-10 text-slate-200" />
            </div>
            <h3 className="text-lg font-bold text-slate-400 uppercase tracking-widest">No Documents Found</h3>
            <p className="text-slate-300 text-xs font-black uppercase tracking-tight mt-2">Upload a new source to begin institutional processing</p>
          </div>
        )}
      </div>
    </div>
  );
};
