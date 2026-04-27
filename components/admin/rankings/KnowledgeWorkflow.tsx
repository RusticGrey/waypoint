"use client";

import React, { useState, useCallback, useEffect } from "react";
import { DocsStep } from "./DocsStep";
import { UploadStep } from "./UploadStep";
import { ExtractStep } from "./ExtractStep";
import { ReviewStep } from "./ReviewStep";
import { SuccessStep } from "./SuccessStep";
import { WorkflowState, College, RankingSource } from "./types";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle, X, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface KnowledgeWorkflowProps {
  colleges: College[];
  rankingSources: RankingSource[];
  initialCollegeId?: string;
  initialDocuments?: any[];
}

export const KnowledgeWorkflow: React.FC<KnowledgeWorkflowProps> = ({
  colleges,
  rankingSources,
  initialCollegeId,
  initialDocuments = [],
}) => {
  const [state, setState] = useState<WorkflowState>({
    currentStep: "docs",
    selectedCollege: initialCollegeId || "",
    selectedSource: "",
    academicYear: "",
    uploadedDocuments: initialDocuments,
    extractedData: [],
    draftId: null,
    approvalNotes: "",
    correctedJson: null,
    loading: false,
    error: null,
  });

  const [pendingReviews, setPendingReviews] = useState<any[]>([]);
  const [showResumePrompt, setShowResumePrompt] = useState(false);
  const [skippedFiles, setSkippedFiles] = useState<string[]>([]);
  const [selectedDocumentIds, setSelectedDocumentIds] = useState<string[]>([]);
  // Use a ref to ensure the latest selected IDs are always available in callbacks
  const selectedDocumentIdsRef = React.useRef<string[]>([]);
  useEffect(() => {
    selectedDocumentIdsRef.current = selectedDocumentIds;
  }, [selectedDocumentIds]);

  const [extractionProgress, setExtractionProgress] = useState(0);
  const [samples, setSamples] = useState<any[]>([]);
  const [llmStatus, setLlmStatus] = useState("");
  const [activePrompt, setActivePrompt] = useState("");
  const [isPromptModified, setIsPromptModified] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  // Check for pending unreviewed extractions on mount
  useEffect(() => {
    const checkPending = async () => {
      try {
        const res = await fetch('/api/admin/colleges/knowledge/query?status=pending');
        if (res.ok) {
          const data = await res.json();
          // Filter for data that hasn't been approved yet
          const unapproved = data.results?.filter((r: any) => !r.approvedAt) || [];
          if (unapproved.length > 0) {
            // Map backend results to Workflow expectations
            const mapped = unapproved.map((r: any) => ({
                id: r.id,
                collegeId: r.collegeId,
                collegeName: r.college?.name || "Unknown College",
                rankingSourceId: r.rankingSourceId,
                rankingSourceName: r.rankingSource?.displayName || "Unknown Source",
                academicYear: r.academicYear,
                rankingDataJSON: r.rankings || {},
                extractedData: r.rankings || {},
            }));
            setPendingReviews(mapped);
            setShowResumePrompt(true);
          }
        }
      } catch (err) {
        console.error("Failed to check pending reviews:", err);
      }
    };
    checkPending();
  }, []);

  // Sync documents if they change from props
  useEffect(() => {
    setState(prev => ({ 
      ...prev, 
      uploadedDocuments: initialDocuments,
      // Reset selected documents if they are no longer in the list
      selectedDocumentIds: prev.uploadedDocuments 
        ? selectedDocumentIds.filter(id => initialDocuments.some(d => d.id === id))
        : []
    }));
  }, [initialDocuments]);

  const handleResumePending = () => {
    setState(prev => ({
      ...prev,
      currentStep: "review",
      extractedData: pendingReviews,
      selectedCollege: pendingReviews[0].collegeId,
    }));
    setShowResumePrompt(false);
  };

  // Step Progress Indicator - Upload is now a popup, not a stage
  const steps = ["docs", "extract", "review", "success"] as const;
  type Step = typeof steps[number];
  const currentStepIndex = steps.indexOf(state.currentStep as any);

  const goToStep = (step: Step) => {
    setState(prev => ({ ...prev, currentStep: step }));
  };

  const handleUploadNew = () => {
    setSkippedFiles([]);
    setIsUploadOpen(true);
  };

  const handleInitializeExtraction = async (documentIds: string[]) => {
    console.log("Initializing extraction for IDs:", documentIds);
    setSelectedDocumentIds(documentIds);
    setState(prev => ({ ...prev, loading: true }));
    
    // Fetch the prompt for the first selected document's source
    const firstDoc = state.uploadedDocuments.find(d => d.id === documentIds[0]);
    const sourceType = firstDoc?.sourceType || "us_news";
    
    try {
      const res = await fetch(`/api/counselor/extraction-templates`);
      const templates = await res.json();
      const matches = templates.filter((t: any) => t.rankingSource?.name === sourceType && t.isActive);
      matches.sort((a: any, b: any) => b.version - a.version);
      
      if (matches.length > 0) {
        setActivePrompt(matches[0].promptText);
      } else {
        setActivePrompt("");
      }
      
      goToStep("extract");
    } catch (err) {
      console.error("Failed to fetch prompt:", err);
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  };

  const handleSaveGlobalPrompt = async (prompt: string) => {
    setState((prev) => ({ ...prev, loading: true }));
    const firstDoc = state.uploadedDocuments.find(d => selectedDocumentIds.includes(d.id));
    const sourceType = firstDoc?.sourceType || "us_news";

    try {
      const res = await fetch(`/api/counselor/extraction-templates`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sourceType, promptText: prompt })
      });
      if (!res.ok) throw new Error("Failed to save global template");
      setIsPromptModified(false);
    } catch (err) {
      console.error(err);
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  const handleDeleteDocument = async (id: string) => {
    if (!confirm("Delete this document?")) return;
    try {
      const res = await fetch(`/api/counselor/documents/${id}`, { method: "DELETE" });
      if (res.ok) {
        setState(prev => ({
          ...prev,
          uploadedDocuments: prev.uploadedDocuments.filter(d => d.id !== id)
        }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpload = useCallback(
    async (
      documents: Array<{
        fileName: string;
        rawHtmlContent: string;
        mimeType?: string;
        documentType?: string;
      }>
    ) => {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        let uploadedDocs = [];
        
        if (documents.length > 0) {
          const response = await fetch("/api/admin/colleges/knowledge/upload", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              collegeId: state.selectedCollege,
              academicYear: state.academicYear,
              rankingSourceId: state.selectedSource,
              documents,
            }),
          });

          if (!response.ok) throw new Error("Upload failed");

          const data = await response.json();
          uploadedDocs = data.uploadedDocuments;
          if (data.skippedFiles && data.skippedFiles.length > 0) {
            setSkippedFiles(data.skippedFiles);
          }
        }

        setState((prev) => {
          const combined = [...prev.uploadedDocuments, ...uploadedDocs];
          const unique = Array.from(new Map(combined.map(d => [d.id, d])).values());
          return {
            ...prev,
            uploadedDocuments: unique,
            loading: false,
          };
        });
        setIsUploadOpen(false); // Close modal on success
      } catch (error) {
        setState((prev) => ({
          ...prev,
          error: "Failed to upload documents",
          loading: false,
        }));
      }
    },
    [state.selectedCollege, state.academicYear, state.selectedSource]
  );

  const handleExtract = useCallback(async (customPrompt?: string) => {
    if (state.currentStep === "extract" && state.extractedData.length > 0 && !customPrompt) {
       goToStep("review");
       return;
    }

    if (customPrompt) {
      setActivePrompt(customPrompt);
    }

    setState((prev) => ({ ...prev, loading: true, error: null }));
    setExtractionProgress(0);
    setLlmStatus("Planning Extraction Groups...");

    try {
      // 1. Dry run to get groups
      const dryRunRes = await fetch("/api/admin/colleges/knowledge/extract-batch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          documentIds: selectedDocumentIdsRef.current,
          dryRun: true 
        }),
      });

      if (!dryRunRes.ok) throw new Error("Planning failed");
      const { groups } = await dryRunRes.json();

      if (!groups || groups.length === 0) {
        setExtractionProgress(100);
        setState(prev => ({ ...prev, loading: false }));
        return;
      }

      // 2. Orchestrate sequential extraction
      const samplesMap: Record<string, any> = {};
      let currentDraftId = null;

      for (let i = 0; i < groups.length; i++) {
        const group = groups[i];
        const progressPerBatch = 100 / groups.length;
        const baseProgress = i * progressPerBatch;

        setLlmStatus(`Extracting: ${group.key} (${i + 1}/${groups.length})...`);
        setExtractionProgress(baseProgress + 5);

        try {
          const res = await fetch("/api/admin/colleges/knowledge/extract-batch", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
              documentIds: group.documentIds,
              customPrompt
            }),
          });

          if (!res.ok) throw new Error(`Batch ${i+1} failed`);

          const data = await res.json();
          currentDraftId = data.draftId;

          // Merge results by College + Source + Year
          if (data.samples) {
            for (const sample of data.samples) {
              const mergeKey = `${sample.collegeId}-${sample.rankingSourceId}-${sample.academicYear}`;
              if (!samplesMap[mergeKey]) {
                samplesMap[mergeKey] = sample;
              } else {
                // Stable ID: Keep the FIRST ID we got for this group (it's the database ID)
                const stableId = samplesMap[mergeKey].id;
                
                // Deep merge the extractedData
                samplesMap[mergeKey].extractedData = {
                  ...samplesMap[mergeKey].extractedData,
                  ...sample.extractedData,
                  id: stableId, // Ensure ID doesn't get overwritten by something else
                  // Handle nested objects if they exist
                  rankings_comprehensive: {
                    ...(samplesMap[mergeKey].extractedData.rankings_comprehensive || {}),
                    ...(sample.extractedData.rankings_comprehensive || {})
                  },
                  admissions_engine: {
                    ...(samplesMap[mergeKey].extractedData.admissions_engine || {}),
                    ...(sample.extractedData.admissions_engine || {})
                  }
                };
                // Ensure rankingDataJSON is also updated
                samplesMap[mergeKey].rankingDataJSON = samplesMap[mergeKey].extractedData;
              }
            }
            setSamples(Object.values(samplesMap)); // Live update merged view
          }
        } catch (err) {
          console.error(err);
        }
        
        setExtractionProgress(baseProgress + progressPerBatch);
      }

      const finalSamples = Object.values(samplesMap);
      setExtractionProgress(100);
      setLlmStatus("All batches complete!");

      setState((prev) => ({
        ...prev,
        extractedData: finalSamples,
        draftId: currentDraftId,
        currentStep: finalSamples.length > 0 ? "extract" : prev.currentStep,
        loading: false,
      }));

    } catch (error) {
      console.error(error);
      setState((prev) => ({
        ...prev,
        error: "Failed to extract documents",
        loading: false,
      }));
    }
  }, [state.currentStep, state.draftId, selectedDocumentIds]);

  const handleApprove = useCallback(
    async (
      action: "approve" | "reject" | "modify",
      dataId: string
    ) => {
      console.log(`[Workflow] Attempting ${action} for dataId:`, dataId);
      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const payload = {
          action,
          dataId,
          approvalNotes: state.approvalNotes,
          correctedJson: state.correctedJson,
        };
        console.log("[Workflow] Approval payload:", payload);

        const response = await fetch("/api/admin/colleges/knowledge/approve", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          console.error("[Workflow] Approval API failed:", response.status, errData);
          throw new Error(errData.error || "Approval failed");
        }

        const data = await response.json();
        console.log("[Workflow] Approval success:", data);

        setState((prev) => ({
          ...prev,
          currentStep:
            action === "approve"
              ? "success"
              : prev.currentStep,
          loading: false,
          approvalNotes: "",
          correctedJson: null,
          // Update the specific item in extractedData if it was modified
          extractedData: prev.extractedData.map(item => 
            item.id === dataId ? { ...item, rankingDataJSON: state.correctedJson || item.rankingDataJSON } : item
          )
        }));
      } catch (error: any) {
        console.error("[Workflow] Approval error handle:", error);
        setState((prev) => ({
          ...prev,
          error: "Failed to process approval",
          loading: false,
        }));
      }
    },
    [state.approvalNotes, state.correctedJson]
  );

  const handleNewWorkflow = () => {
    setState({
      currentStep: "docs",
      selectedCollege: initialCollegeId || "",
      selectedSource: "",
      academicYear: "",
      uploadedDocuments: initialDocuments,
      extractedData: [],
      draftId: null,
      approvalNotes: "",
      correctedJson: null,
      loading: false,
      error: null,
    });
    setExtractionProgress(0);
    setSelectedDocumentIds([]);
    setSamples([]);
  };

  const selectedCollege = colleges.find(
    (c) => c.id === state.selectedCollege
  );

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Step Indicator - COMPACT VIEW */}
      <div className="mb-8 bg-slate-50/50 p-4 rounded-[24px] border border-slate-100">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          {steps.map((step, idx) => (
            <React.Fragment key={step}>
              <div className="flex items-center gap-3 group">
                <button
                  onClick={() => idx < currentStepIndex && goToStep(step)}
                  disabled={idx >= currentStepIndex}
                  className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-xl text-[10px] font-black transition-all",
                    idx <= currentStepIndex
                      ? "bg-slate-900 text-white shadow-md shadow-slate-200"
                      : "bg-white border border-slate-200 text-slate-400",
                    idx === currentStepIndex && "ring-4 ring-brand-100 bg-brand-600",
                    idx < currentStepIndex && "cursor-pointer hover:bg-slate-800"
                  )}
                >
                  {idx + 1}
                </button>
                <span className={cn(
                  "text-[9px] font-black uppercase tracking-widest hidden sm:inline-block",
                  idx <= currentStepIndex ? "text-slate-900" : "text-slate-300"
                )}>
                  {step === "docs" ? "Repo" : step}
                </span>
              </div>
              {idx < steps.length - 1 && (
                <div className="w-8 h-px bg-slate-200" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {showResumePrompt && (
          <div className="mb-8 p-6 bg-brand-50 border-2 border-brand-200 rounded-[32px] flex flex-col md:flex-row items-center justify-between gap-6 animate-in slide-in-from-top-4 duration-500">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-600 rounded-2xl flex items-center justify-center shadow-lg shadow-brand-200">
                   <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                   <h3 className="text-sm font-black text-brand-900 uppercase tracking-tight">Pending Reviews Found</h3>
                   <p className="text-xs text-brand-700 font-medium">You have {pendingReviews.length} extracted item(s) waiting for verification.</p>
                </div>
             </div>
             <div className="flex gap-3 w-full md:w-auto">
                <Button 
                  variant="outline" 
                  onClick={() => setShowResumePrompt(false)}
                  className="flex-1 md:flex-none border-brand-200 text-brand-700 font-bold text-[10px] uppercase tracking-widest h-12 px-6 rounded-xl hover:bg-white"
                >
                  Dismiss
                </Button>
                <Button 
                  onClick={handleResumePending}
                  className="flex-1 md:flex-none bg-brand-600 text-white font-black text-[10px] uppercase tracking-widest h-12 px-6 rounded-xl shadow-lg shadow-brand-200 hover:bg-brand-700"
                >
                  Resume Review
                </Button>
             </div>
          </div>
        )}

      {/* Step Content */}
      <div className="bg-white rounded-[32px] shadow-2xl shadow-slate-200/40 border border-slate-100 p-6 md:p-8 min-h-[500px]">
        {state.currentStep === "docs" && (
          <div className="space-y-6">
            {skippedFiles.length > 0 && (
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-black text-amber-900 uppercase tracking-tight">Duplicate Documents Skipped</h4>
                  <p className="text-xs text-amber-700 mt-1">The following files were already in the repository and were not re-uploaded:</p>
                  <ul className="mt-2 space-y-1">
                    {skippedFiles.map((file, idx) => (
                      <li key={idx} className="text-[10px] font-mono text-amber-800 bg-amber-100/50 px-2 py-1 rounded w-fit">{file}</li>
                    ))}
                  </ul>
                </div>
                <button onClick={() => setSkippedFiles([])} className="ml-auto text-amber-400 hover:text-amber-600 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
            <DocsStep
              documents={state.uploadedDocuments}
              onUploadNew={handleUploadNew}
              onInitializeExtraction={handleInitializeExtraction}
              onDelete={handleDeleteDocument}
              loading={state.loading}
            />
          </div>
        )}

        {state.currentStep === "extract" && (
          <ExtractStep
            selectedDocuments={state.uploadedDocuments.filter(d => selectedDocumentIds.includes(d.id))}
            onExtract={handleExtract}
            onSaveGlobal={handleSaveGlobalPrompt}
            loading={state.loading}
            extractionProgress={extractionProgress}
            samples={samples}
            draftId={state.draftId}
            initialPrompt={activePrompt}
            llmStatus={llmStatus}
          />
        )}

        {state.currentStep === "review" && state.extractedData.length > 0 && (
          <ReviewStep
            extractedData={state.extractedData}
            onApprove={handleApprove}
            loading={state.loading}
            approvalNotes={state.approvalNotes}
            setApprovalNotes={(notes) =>
              setState((prev) => ({ ...prev, approvalNotes: notes }))
            }
            correctedJson={state.correctedJson}
            setCorrectedJson={(json) =>
              setState((prev) => ({ ...prev, correctedJson: json }))
            }
          />
        )}

        {state.currentStep === "success" && selectedCollege && (
          <SuccessStep
            approvedCount={selectedDocumentIds.length}
            collegeName={selectedCollege.name}
            academicYear={state.academicYear}
            onNewWorkflow={handleNewWorkflow}
            approvedDocuments={state.uploadedDocuments.filter(d => selectedDocumentIds.includes(d.id))}
          />
        )}
      </div>

      {/* Upload Modal */}
      <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
        <DialogContent 
          className="rounded-3xl p-0 border-none overflow-hidden"
          style={{ maxWidth: '1000px', width: '90vw' }}
        >
          <div className="p-8 md:p-12 bg-white">
            <UploadStep
              onUpload={handleUpload}
              colleges={colleges}
              rankingSources={rankingSources}
              selectedCollege={state.selectedCollege}
              setSelectedCollege={(id) =>
                setState((prev) => ({ ...prev, selectedCollege: id }))
              }
              selectedSource={state.selectedSource}
              setSelectedSource={(id) =>
                setState((prev) => ({ ...prev, selectedSource: id }))
              }
              academicYear={state.academicYear}
              setAcademicYear={(year) =>
                setState((prev) => ({ ...prev, academicYear: year }))
              }
              loading={state.loading}
              error={state.error}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
