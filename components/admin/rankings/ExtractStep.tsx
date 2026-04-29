"use client";

import React, { useState, useEffect } from "react";
import { ExtractStepProps } from "./types";
import { Button } from "@/components/ui/button";
import { Zap, Terminal, Loader2, Sparkles, AlertCircle, Info, ExternalLink, Database, CheckCircle2, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { JsonEditor } from "./JsonEditor";
import { cn } from "@/lib/utils";

export const ExtractStep: React.FC<ExtractStepProps & { 
  onApprove: (action: "approve" | "reject" | "modify", dataId: string) => Promise<void>;
  approvalNotes: string;
  setApprovalNotes: (notes: string) => void;
  correctedJson: Record<string, any> | null;
  setCorrectedJson: (json: Record<string, any>) => void;
}> = ({
  selectedDocuments,
  onExtract,
  onSaveGlobal,
  loading,
  extractionProgress,
  samples,
  draftId,
  initialPrompt,
  llmStatus: externalLlmStatus,
  onApprove,
  approvalNotes,
  setApprovalNotes,
  correctedJson,
  setCorrectedJson,
}) => {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [isModified, setIsModified] = useState(false);
  
  const displayStatus = externalLlmStatus || (loading ? "Processing..." : "");

  useEffect(() => {
    setPrompt(initialPrompt);
    setIsModified(false);
  }, [initialPrompt]);

  const handlePromptChange = (val: string) => {
    setPrompt(val);
    setIsModified(val !== initialPrompt);
  };

  const isPromptEmpty = !prompt.trim();

  // Unified data source for review
  const currentData = samples?.[0];

  const renderValue = (val: any): React.ReactNode => {
    if (Array.isArray(val)) {
      if (val.length === 0) return <span className="text-slate-300 font-medium italic">Empty</span>;
      return (
        <div className="space-y-2">
          {val.map((item, i) => (
            <div key={i} className="p-2 bg-white/50 rounded-lg border border-slate-100 shadow-sm text-[11px]">
              {typeof item === 'object' ? renderValue(item) : String(item)}
            </div>
          ))}
        </div>
      );
    }
    if (val && typeof val === 'object') {
      return (
        <div className="grid grid-cols-1 gap-2">
          {Object.entries(val).map(([k, v]) => (
            <div key={k} className="flex gap-2 items-start">
              <span className="text-[9px] font-black uppercase text-slate-400 min-w-[80px] mt-0.5">{k.replace(/_/g, ' ')}:</span>
              <span className="text-slate-900">{typeof v === 'object' ? renderValue(v) : String(v)}</span>
            </div>
          ))}
        </div>
      );
    }
    return val !== null && val !== undefined && val !== "" 
      ? String(val) 
      : <span className="text-slate-300 font-medium italic">Not Found</span>;
  };

  const renderFields = (obj: any, prefix = "") => {
    return Object.entries(obj).map(([key, value]) => {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        return (
          <div key={fullKey} className="space-y-4 pt-4 first:pt-0">
            <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-tight border-l-4 border-brand-500 pl-3 mb-4">{key.replace(/_/g, ' ')}</h4>
            <div className="ml-4 space-y-4">
              {renderFields(value, fullKey)}
            </div>
          </div>
        );
      }
      
      return (
        <div key={fullKey} className="pb-4 border-b border-slate-50 last:border-0 group">
          <label className="block text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 group-hover:text-brand-600 transition-colors">
            {key.replace(/_/g, ' ')}
          </label>
          <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100 font-bold text-slate-900 text-sm shadow-sm">
            {renderValue(value)}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="space-y-12">
      {/* Configuration Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-50/50 p-6 rounded-[32px] border border-slate-100 shadow-sm">
             <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 ml-1">
               Source Context ({selectedDocuments.length})
             </h3>
             <div className="space-y-2 max-h-[320px] overflow-y-auto pr-2 custom-scrollbar">
                {selectedDocuments.map((doc, idx) => (
                  <div key={doc.id || idx} className="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-2xl shadow-sm">
                    <Database className="w-4 h-4 text-brand-500" />
                    <span className="text-[10px] font-bold text-slate-600 truncate uppercase">{doc.fileName || "Doc"}</span>
                  </div>
                ))}
             </div>
          </div>

          <div className="space-y-4">
             {!loading && (
                <Button
                  onClick={() => onExtract(prompt)}
                  disabled={isPromptEmpty}
                  className="w-full bg-slate-900 hover:bg-black text-white font-black uppercase tracking-widest text-[10px] py-8 rounded-3xl shadow-xl transition-all active:scale-[0.98] disabled:opacity-20"
                >
                  <Zap className="w-4 h-4 mr-2 fill-white" />
                  {samples && samples.length > 0 ? 'Refine Extraction' : 'Kickoff AI Analysis'}
                </Button>
             )}

             {loading && (
               <div className="space-y-6 bg-brand-50/50 p-8 rounded-[32px] border border-brand-100">
                  <div className="flex flex-col items-center gap-3 text-center">
                    <Sparkles className="w-6 h-6 text-brand-600 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-brand-700">{displayStatus}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden shadow-inner ring-4 ring-white">
                    <div className="bg-brand-600 h-full transition-all duration-500" style={{ width: `${extractionProgress}%` }} />
                  </div>
               </div>
             )}
          </div>
        </div>

        <div className="lg:col-span-8 space-y-4">
           <div className="flex items-center justify-between ml-1">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-brand-600">Runtime Instructions</h3>
              {isModified && <Badge variant="warning" className="text-[8px] h-4 uppercase border-none px-3">Modified</Badge>}
           </div>
           <div className="relative bg-slate-950 rounded-[32px] overflow-hidden shadow-2xl border border-white/5">
              <Textarea
                value={prompt}
                onChange={(e) => handlePromptChange(e.target.value)}
                disabled={loading}
                className="font-mono text-[11px] h-[340px] bg-transparent text-brand-300 border-none focus:ring-0 transition-all resize-none leading-relaxed p-8 custom-scrollbar"
                placeholder="Enter AI instructions..."
              />
           </div>
        </div>
      </div>

      {/* Results Workspace - Side-by-Side */}
      {samples && samples.length > 0 && !loading && (
         <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div className="flex items-center gap-3 mb-8">
               <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center border border-green-100">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
               </div>
               <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Validation Workspace</h2>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Manually refine and approve synthesized facts</p>
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
               {/* Left Side: Editable JSON */}
               <div className="space-y-4">
                  <div className="flex items-center justify-between ml-1">
                     <h3 className="text-[10px] font-black uppercase text-slate-400">JSON Buffer (Editable)</h3>
                     <Badge variant="neutral" className="text-[8px] border-none bg-slate-100 text-slate-400">v1.0</Badge>
                  </div>
                  <div className="rounded-[32px] overflow-hidden border border-slate-200 shadow-xl">
                     <JsonEditor
                       json={correctedJson || currentData.data}
                       readOnly={false}
                       onChange={(val) => setCorrectedJson(val)}
                       height="600px"
                     />
                  </div>
               </div>

               {/* Right Side: Human Readable Preview */}
               <div className="space-y-4">
                  <h3 className="text-[10px] font-black uppercase text-brand-600 ml-1">Human-Readable Preview</h3>
                  <div className="bg-slate-50/50 rounded-[40px] border border-slate-100 p-8 md:p-12 h-[600px] overflow-y-auto custom-scrollbar shadow-inner text-left">
                     <div className="space-y-8">
                        {renderFields(correctedJson || currentData.data || {})}
                     </div>
                  </div>
               </div>
            </div>

            {/* Approval Action Area */}
            <div className="mt-12 p-10 bg-slate-900 rounded-[40px] shadow-2xl flex flex-col items-center text-center gap-8 border-t-8 border-brand-500">
               <div className="max-w-2xl w-full space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Reviewer Verification Comments</label>
                  <Textarea 
                    value={approvalNotes}
                    onChange={(e) => setApprovalNotes(e.target.value)}
                    className="bg-white/5 border-white/10 text-white rounded-2xl h-24 focus:ring-brand-500 transition-all text-sm placeholder:text-slate-600 p-6"
                    placeholder="Provide context for this approval or specific adjustments made..."
                  />
               </div>

               <div className="flex gap-4 w-full max-w-xl">
                  <Button
                    onClick={() => onApprove("approve", currentData.id)}
                    className="flex-[2] bg-brand-600 hover:bg-brand-700 text-white font-black uppercase tracking-widest text-xs py-8 rounded-3xl shadow-2xl shadow-brand-500/20 transition-all active:scale-[0.98]"
                  >
                    <CheckCircle2 className="w-5 h-5 mr-2 stroke-[3px]" />
                    Approve & Publish to Directory
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => onApprove("reject", currentData.id)}
                    className="flex-1 border-2 border-white/10 hover:bg-red-500 hover:border-red-500 text-slate-400 hover:text-white font-black uppercase tracking-widest text-xs py-8 rounded-3xl transition-all"
                  >
                    <X className="w-5 h-5 mr-2" />
                    Discard
                  </Button>
               </div>
            </div>
         </div>
      )}
    </div>
  );
};
