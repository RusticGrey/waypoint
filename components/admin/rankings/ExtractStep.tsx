 "use client";

import React, { useState, useEffect } from "react";
import { ExtractStepProps } from "./types";
import { Button } from "@/components/ui/button";
import { Zap, FileText, Terminal, Loader2, Sparkles, AlertCircle, Info, ExternalLink, Database } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

export const ExtractStep: React.FC<ExtractStepProps> = ({
  selectedDocuments,
  onExtract,
  onSaveGlobal,
  loading,
  extractionProgress,
  samples,
  draftId,
  initialPrompt,
  llmStatus: externalLlmStatus,
}) => {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [isModified, setIsModified] = useState(false);
  
  // Use external status if provided, otherwise internal fallback
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

  return (
    <div className="space-y-8">
      {/* Step Header */}
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
          Extraction Workshop
        </h2>
        <p className="text-slate-500 font-medium max-w-md mx-auto">
          Review your selected sources and refine the AI extraction instructions for this batch.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Selected Documents - SLIM SIDEBAR */}
        <div className="lg:col-span-4 space-y-4 border-r border-slate-100 pr-8">
          <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
            Reference Set ({selectedDocuments.length})
          </h3>
          <div className="grid gap-2 max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
            {selectedDocuments.map((doc, idx) => (
              <div
                key={doc.id || idx}
                className="flex items-center gap-3 p-2 bg-slate-50/50 border border-slate-100 rounded-xl transition-all hover:bg-white"
              >
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm border border-slate-100 shrink-0">
                  <FileText className="w-4 h-4 text-slate-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-black text-slate-600 truncate uppercase tracking-tight">
                    {doc.metadata?.fileName || "Source"}
                  </p>
                  <p className="text-[8px] font-bold text-slate-300 uppercase tracking-tighter truncate">
                    {doc.sourceType || "General"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Prompt Editor - EXPANDED AREA */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between ml-1">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-brand-600 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" /> AI Extraction Instructions
            </h3>
            {loading && <Loader2 className="w-4 h-4 animate-spin text-brand-600" />}
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-500 to-slate-500 rounded-[28px] blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
            <div className="relative bg-slate-950 rounded-[24px] overflow-hidden shadow-2xl">
              <div className="flex items-center gap-2 px-6 py-3 bg-slate-900/50 border-b border-white/5">
                <Terminal className="w-3 h-3 text-brand-400" />
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">LLM Runtime Environment</span>
              </div>
              <Textarea
                value={prompt}
                onChange={(e) => handlePromptChange(e.target.value)}
                disabled={loading}
                className="font-mono text-[11px] h-[360px] bg-transparent text-brand-300 border-none focus:ring-0 transition-all resize-none leading-relaxed p-6 custom-scrollbar"
                placeholder="Enter AI instructions... (Required to proceed)"
              />
            </div>
          </div>

          {isModified && !loading && (
            <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100 flex gap-3 animate-in slide-in-from-top-2">
               <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
               <div className="space-y-2">
                 <p className="text-[10px] text-amber-700 font-bold uppercase leading-normal tracking-tight">
                   You've modified the instructions for this session. 
                 </p>
                 <button 
                  onClick={() => onSaveGlobal(prompt)}
                  className="text-[10px] text-amber-800 font-black uppercase tracking-widest underline flex items-center gap-1 hover:text-amber-900"
                >
                   Apply these changes to Global Template <ExternalLink className="w-3 h-3" />
                 </button>
               </div>
            </div>
          )}

          {!isModified && (
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex gap-3">
               <AlertCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
               <p className="text-[10px] text-slate-400 font-bold uppercase leading-normal tracking-tight">
                 Changes to these instructions only apply to this session. To update permanently, use the Global Template Manager.
               </p>
            </div>
          )}
        </div>
      </div>

      {/* Action Area */}
      <div className="pt-8 border-t border-slate-100 mt-8">
        {isPromptEmpty && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="text-xs font-black uppercase tracking-tight">No instructions found. You must provide a prompt to proceed with AI extraction.</p>
          </div>
        )}

        {!loading && (
          <Button
            onClick={() => onExtract(prompt)}
            disabled={isPromptEmpty}
            className="w-full bg-brand-600 hover:bg-brand-700 text-white font-black uppercase tracking-widest text-xs py-8 rounded-3xl shadow-2xl shadow-brand-200 transition-all active:scale-[0.98] disabled:opacity-20"
          >
            <Zap className="w-5 h-5 mr-2 fill-white stroke-[3px]" />
            {samples && samples.length > 0 ? 'Re-execute' : 'Execute'} AI Extraction on {selectedDocuments.length} Sources
          </Button>
        )}

        {loading && (
          <div className="space-y-6 py-4">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="flex items-center gap-3 px-4 py-2 bg-brand-50 rounded-full border border-brand-100 shadow-sm animate-pulse">
                <Sparkles className="w-4 h-4 text-brand-600" />
                <span className="text-[10px] font-black uppercase tracking-widest text-brand-700">{displayStatus}</span>
              </div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Engine: Multimodal Vision • Context: {selectedDocuments.length} Docs</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between px-1">
                 <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Analysis Progress</span>
                 <span className="text-xs font-black text-slate-900">{Math.floor(extractionProgress)}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden shadow-inner">
                <div
                  className="bg-brand-600 h-full transition-all duration-500 shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                  style={{ width: `${extractionProgress}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {draftId && !loading && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
            <div className="bg-green-50 border border-green-100 rounded-[40px] p-10 text-center shadow-sm">
               <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md border border-green-100 mx-auto mb-6">
                 <Sparkles className="w-10 h-10 text-green-500" />
               </div>
               <Badge className="bg-green-100 text-green-700 font-black uppercase tracking-widest text-[9px] mb-4 border-none px-4 py-1">Analysis Complete</Badge>
               <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-3">AI Extraction Finalized</h3>
               
               <p className="text-slate-500 text-sm font-medium mb-8">
                 The AI has successfully analyzed the documents. Review the extracted data below and proceed to final verification.
               </p>
               
               <Button
                onClick={() => onExtract()} 
                className="w-full max-w-md mx-auto bg-slate-900 hover:bg-black text-white font-black uppercase tracking-widest text-xs py-8 rounded-3xl shadow-2xl shadow-slate-900/20 transition-all active:scale-[0.95] hover:-translate-y-1"
              >
                Proceed to Verification & Approval
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Inline Sample Preview - Show raw LLM output */}
      {samples && samples.length > 0 && (
         <div className="mt-8 pt-8 border-t border-slate-100 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center justify-between mb-6">
               <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Raw AI Engine Output</h3>
               <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest flex items-center gap-1.5">
                 <Terminal className="w-3 h-3" /> Unfiltered Response
               </span>
            </div>
            <div className="space-y-4">
               {samples.map((sample: any, idx) => (
                 <div key={idx} className="group bg-slate-950 rounded-[32px] overflow-hidden shadow-2xl border border-white/5">
                   <div className="px-6 py-3 bg-slate-900/50 border-b border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Database className="w-3 h-3 text-brand-400" />
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Pipeline: {sample.rankingSourceName}</span>
                      </div>
                      <Badge variant="neutral" className="bg-white/5 text-[8px] border-none text-slate-400">Raw Buffer</Badge>
                   </div>
                   <div className="p-8">
                     <pre className="font-mono text-[11px] text-brand-200 leading-relaxed overflow-x-auto whitespace-pre-wrap custom-scrollbar max-h-[400px]">
                       {sample.rawLlmResponse || JSON.stringify(sample.extractedData, null, 2)}
                     </pre>
                   </div>
                 </div>
               ))}
            </div>
         </div>
      )}
    </div>
  );
};
