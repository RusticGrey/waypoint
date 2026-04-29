"use client";

import React, { useState, useEffect } from "react";
import { ReviewStepProps } from "./types";
import { JsonEditor } from "./JsonEditor";
import { Button } from "@/components/ui/button";
import { AlertCircle, Check, X } from "lucide-react";

export const ReviewStep: React.FC<ReviewStepProps> = ({
  extractedData,
  onApprove,
  loading,
  approvalNotes,
  setApprovalNotes,
  correctedJson,
  setCorrectedJson,
}) => {
  const [selectedDataId, setSelectedDataId] = useState<string>("");
  const [notesError, setNotesError] = useState<string | null>(null);

  useEffect(() => {
    if (extractedData.length > 0 && !selectedDataId) {
      setSelectedDataId(extractedData[0].id);
    }
  }, [extractedData]);

  const currentData = extractedData.find((d) => d.id === selectedDataId);

  const handleNotesChange = (text: string) => {
    if (text.length > 500) {
      setNotesError("Notes must be 500 characters or less");
      return;
    }
    setNotesError(null);
    setApprovalNotes(text);
  };

  const handleApprove = async () => {
    if (notesError) return;
    await onApprove("approve", selectedDataId);
  };

  const handleReject = async () => {
    if (notesError) return;
    await onApprove("reject", selectedDataId);
  };

  const handleModify = async () => {
    if (notesError || !correctedJson) {
      setNotesError("JSON must be valid to modify");
      return;
    }
    await onApprove("modify", selectedDataId);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Step Header */}
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
          Verification & Approval
        </h2>
        <p className="text-slate-500 font-medium max-w-md mx-auto">
          Manually review AI extractions to ensure data accuracy before institutional publishing.
        </p>
      </div>

      {/* Data Selection */}
      {extractedData.length > 1 && (
        <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100 mb-6">
          <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">
            Currently Reviewing
          </label>
          <select
            value={selectedDataId}
            onChange={(e) => setSelectedDataId(e.target.value)}
            disabled={loading}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-brand-500 outline-none transition-all font-bold text-slate-700"
          >
            {extractedData.map((data) => (
              <option key={data.id} value={data.id}>
                {data.collegeName} • {data.dataSourceName} •{" "}
                {data.academicYear}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Main Content */}
      {currentData && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Original Data */}
          <div className="space-y-3">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
              AI Processed Baseline
            </h3>
            <div className="rounded-3xl overflow-hidden shadow-sm border border-slate-100">
              <JsonEditor
                json={currentData.data}
                readOnly={true}
                height="500px"
              />
            </div>
          </div>

          {/* Human Readable Extracted Fields */}
          <div className="space-y-3">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-brand-600 ml-1">
              Extracted Insights for Verification
            </h3>
            <div className="bg-white rounded-[32px] border border-brand-100 shadow-xl overflow-hidden ring-4 ring-brand-50/50 p-8 custom-scrollbar max-h-[540px] overflow-y-auto text-left">
              <div className="space-y-6">
                {(() => {
                  const data = correctedJson || currentData.data || {};
                  
                  // Recursive function to render nested fields beautifully
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
                  
                  return renderFields(data);
                })()}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Approval Notes */}
      <div className="pt-6 border-t border-slate-100 mt-8">
        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 ml-1">
          Reviewer Audit Comments
        </label>
        <textarea
          value={approvalNotes}
          onChange={(e) => handleNotesChange(e.target.value)}
          placeholder="Optional: Provide context for approval or reasons for rejection..."
          maxLength={500}
          disabled={loading}
          className="w-full px-5 py-4 border border-slate-200 rounded-2xl bg-slate-50/30 focus:ring-2 focus:ring-brand-500 outline-none transition-all font-medium text-slate-700 placeholder-slate-300 resize-none"
          rows={3}
        />
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right">
          {approvalNotes.length}/500 characters
        </div>
        {notesError && (
          <div className="text-xs text-red-600 dark:text-red-400 mt-1 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {notesError}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-8">
        <Button
          onClick={handleApprove}
          disabled={loading || !currentData}
          className="flex-[2] bg-brand-600 hover:bg-brand-700 text-white font-black uppercase tracking-widest text-xs py-6 rounded-2xl shadow-xl shadow-brand-100 transition-all active:scale-[0.98]"
        >
          <Check className="w-4 h-4 mr-2 stroke-[3px]" />
          Approve & Publish
        </Button>
        <Button
          onClick={handleReject}
          disabled={loading || !currentData}
          variant="outline"
          className="flex-1 border-2 border-slate-200 hover:bg-red-50 hover:border-red-200 hover:text-red-700 text-slate-500 font-black uppercase tracking-widest text-xs py-6 rounded-2xl transition-all"
        >
          <X className="w-4 h-4 mr-2 stroke-[3px]" />
          Reject
        </Button>
      </div>
    </div>
  );
};
