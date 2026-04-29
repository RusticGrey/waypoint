"use client";

import React, { useState, useCallback, useEffect, useMemo, useRef } from "react";
import { DocsStep } from "./DocsStep";
import { UploadStep } from "./UploadStep";
import { ExtractStep } from "./ExtractStep";
import { ReviewStep } from "./ReviewStep";
import { WorkflowState, College, DataSource } from "./types";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, X, Sparkles, Plus, Database, FileSearch, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface KnowledgeWorkflowProps {
  colleges: College[];
  dataSources: DataSource[];
  initialCollegeId?: string;
  initialDocuments?: any[];
  onComplete?: () => void;
}

export const KnowledgeWorkflow: React.FC<KnowledgeWorkflowProps> = ({
  colleges,
  dataSources,
  initialCollegeId,
  initialDocuments = [],
  onComplete,
}) => {
  const currentYear = new Date().getFullYear();
  const months = new Date().getMonth();
  const defaultYear = months > 4 ? `${currentYear}-${currentYear + 1}` : `${currentYear - 1}-${currentYear}`;

  const [activeTab, setActiveTab] = useState<"docs" | "extract">("docs");

  const [state, setState] = useState<WorkflowState>({
    currentStep: "docs",
    selectedCollege: initialCollegeId || "",
    selectedSource: "",
    academicYear: defaultYear,
    uploadedDocuments: initialDocuments,
    extractedData: [],
    draftId: null,
    approvalNotes: "",
    correctedJson: null,
    loading: false,
    error: null,
  });

  const [skippedFiles, setSkippedFiles] = useState<string[]>([]);
  const [selectedDocumentIds, setSelectedDocumentIds] = useState<string[]>([]);
  const selectedDocumentIdsRef = useRef<string[]>([]);
  useEffect(() => {
    selectedDocumentIdsRef.current = selectedDocumentIds;
  }, [selectedDocumentIds]);

  const [extractionProgress, setExtractionProgress] = useState(0);
  const [samples, setSamples] = useState<any[]>([]);
  const [llmStatus, setLlmStatus] = useState("");
  const [activePrompt, setActivePrompt] = useState("");
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  // 1. Sync documents from PROPS only once on mount or when initialCollegeId changes
  useEffect(() => {
    if (initialDocuments && initialDocuments.length > 0) {
      setState(prev => ({ ...prev, uploadedDocuments: initialDocuments }));
    }
  }, [initialCollegeId]);

  // 2. Check for pending unreviewed extractions for THIS college across ALL years
  useEffect(() => {
    const checkPending = async () => {
      const collegeId = state.selectedCollege || initialCollegeId;
      if (!collegeId) return;

      try {
        // Query for ALL years to find any pending extractions for this institution
        const res = await fetch(`/api/admin/colleges/knowledge/query?collegeId=${collegeId}&status=pending&academicYear=ALL`);
        if (res.ok) {
          const data = await res.json();
          const unapproved = data.rankings?.filter((r: any) => r.status === 'pending') || [];
          
          if (unapproved.length > 0) {
            console.log("[Workflow] Auto-resuming pending extractions:", unapproved.length);
            const mapped = unapproved.map((r: any) => ({
                id: r.id,
                collegeId: r.collegeId,
                collegeName: data.collegeName || "Institution",
                dataSourceId: r.dataSourceId,
                dataSourceName: r.dataSourceName || "Source",
                academicYear: r.academicYear,
                data: r.rankingDataJSON || {},
                status: r.status
            }));
            
            setSamples(mapped);
            
            // Set source prompt
            const promptRes = await fetch(`/api/admin/colleges/knowledge/prompts?dataSourceId=${mapped[0].dataSourceId}`);
            let promptText = "";
            if (promptRes.ok) {
              const prompts = await promptRes.json();
              if (prompts.length > 0) promptText = prompts[0].promptText;
            }

            setState(prev => ({
              ...prev,
              selectedSource: mapped[0].dataSourceId,
              academicYear: mapped[0].academicYear,
              extractedData: mapped,
              currentStep: "extract",
              draftId: "extracted"
            }));

            setActivePrompt(promptText);
            setActiveTab("extract"); 
          }
        }
      } catch (err) {
        console.error("Failed to check pending reviews:", err);
      }
    };
    checkPending();
  }, [initialCollegeId, state.selectedCollege]);

  const steps = ["docs", "extract", "review", "success"] as const;
  type Step = typeof steps[number];
  const currentStepIndex = steps.indexOf(state.currentStep as any);

  const goToStep = (step: Step) => {
    setState(prev => ({ ...prev, currentStep: step }));
  };

  const handleUploadNew = () => {
    setSkippedFiles([]);
    if (!state.selectedSource && dataSources.length > 0) {
      const active = dataSources.find(s => s.isActive) || dataSources[0];
      setState(prev => ({ ...prev, selectedSource: active.id }));
    }
    setIsUploadOpen(true);
  };

  const handleInitializeExtraction = async (documentIds: string[]) => {
    setSelectedDocumentIds(documentIds);
    setState(prev => ({ ...prev, loading: true }));
    
    // Find source type of first doc to fetch prompt
    const firstDoc = state.uploadedDocuments.find(d => d.id === documentIds[0]);
    const dataSourceId = firstDoc?.dataSourceId || "us-news";
    
    try {
      const res = await fetch(`/api/admin/colleges/knowledge/prompts?dataSourceId=${dataSourceId}`);
      const templates = await res.json();
      const matches = templates.filter((t: any) => t.dataSourceId === dataSourceId && t.isActive);
      matches.sort((a: any, b: any) => b.version - a.version);
      
      setActivePrompt(matches.length > 0 ? matches[0].promptText : "");
      setActiveTab("extract");
    } catch (err) {
      console.error("Failed to fetch prompt:", err);
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  };

  const handleDeleteDocument = async (id: string) => {
    if (!confirm("Delete this document?")) return;
    try {
      const res = await fetch(`/api/admin/colleges/knowledge/documents/${id}`, { method: "DELETE" });
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
        content: string;
        contentType?: string;
      }>
    ) => {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        if (documents.length > 0) {
          const response = await fetch("/api/admin/colleges/knowledge/upload", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              collegeId: state.selectedCollege,
              academicYear: state.academicYear,
              dataSourceId: state.selectedSource,
              documents,
            }),
          });

          if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            throw new Error(errData.error || "Upload failed");
          }

          const data = await response.json();
          const uploadedDocs = data.uploadedDocuments || [];
          if (data.skippedFiles && data.skippedFiles.length > 0) {
            setSkippedFiles(data.skippedFiles);
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
          setIsUploadOpen(false);
        }
      } catch (error: any) {
        setState((prev) => ({
          ...prev,
          error: error.message || "Failed to upload documents",
          loading: false,
        }));
      }
    },
    [state.selectedCollege, state.academicYear, state.selectedSource]
  );

  const handleProceedToReview = useCallback(() => {
    setState(prev => ({ 
      ...prev, 
      currentStep: "review", 
      extractedData: samples 
    }));
  }, [samples]);

  const handleExtract = useCallback(async (customPrompt?: string) => {
    if (samples.length > 0 && typeof customPrompt !== 'string') {
       handleProceedToReview();
       return;
    }

    setState((prev) => ({ ...prev, loading: true, error: null }));
    setExtractionProgress(5);
    setLlmStatus("Initializing LLM Extraction Pipeline...");

    const progressInterval = setInterval(() => {
      setExtractionProgress(prev => {
        if (prev >= 92) return prev;
        const jump = Math.random() * 2;
        return prev + jump;
      });
    }, 2500);

    try {
      const res = await fetch("/api/admin/colleges/knowledge/extract-batch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          documentIds: selectedDocumentIdsRef.current,
          customPrompt: typeof customPrompt === 'string' ? customPrompt : undefined
        }),
      });

      clearInterval(progressInterval);

      if (!res.ok) throw new Error("Extraction failed");
      const data = await res.json();
      
      setLlmStatus("Synthesis complete!");
      setExtractionProgress(100);
      
      const finalSamples = (data.samples || []).map((s: any) => ({
        ...s,
        data: s.extractedData // Normalize key mismatch from API
      }));

      setState(prev => ({
        ...prev,
        extractedData: finalSamples,
        currentStep: "extract",
        draftId: "extracted",
        loading: false
      }));
      
      setSamples(finalSamples);

    } catch (error) {
      clearInterval(progressInterval);
      console.error(error);
      setState((prev) => ({
        ...prev,
        error: "Failed to extract documents",
        loading: false,
      }));
    }
  }, [samples, handleProceedToReview]);

  const handleApprove = useCallback(
    async (
      action: "approve" | "reject" | "modify",
      dataId: string
    ) => {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const response = await fetch("/api/admin/colleges/knowledge/approve", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action,
            dataId,
            approvalNotes: state.approvalNotes,
            correctedJson: state.correctedJson,
          }),
        });

        if (!response.ok) throw new Error("Approval failed");

        setState((prev) => ({
          ...prev,
          loading: false,
          approvalNotes: "",
          correctedJson: null,
          error: action === 'approve' ? null : 'Insight rejected and discarded.',
          extractedData: action === 'approve' 
            ? prev.extractedData.map(item => item.id === dataId ? { ...item, status: 'approved' } : item)
            : prev.extractedData.filter(item => item.id !== dataId)
        }));

        if (action === 'approve') {
           alert("Insight successfully approved and published!");
           onComplete?.();
        }
      } catch (error: any) {
        setState((prev) => ({ ...prev, error: "Failed to process approval", loading: false }));
      }
    },
    [state.approvalNotes, state.correctedJson]
  );

  const handleNewWorkflow = () => {
    setState({
      currentStep: "docs",
      selectedCollege: initialCollegeId || "",
      selectedSource: "",
      academicYear: defaultYear,
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

  const selectedCollegeObj = useMemo(() => colleges.find(c => c.id === state.selectedCollege), [colleges, state.selectedCollege]);

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Sub-Tab Navigation */}
      <div className="mb-8 flex p-1 bg-slate-100 rounded-2xl w-fit border border-slate-200 shadow-inner">
          {[
            { id: 'docs', label: 'Staged Repository', icon: Database },
            { id: 'extract', label: 'Extract & Approve', icon: FileSearch },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "flex items-center gap-2 px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                activeTab === tab.id
                  ? "bg-white text-brand-600 shadow-md ring-1 ring-slate-200"
                  : "text-slate-400 hover:text-slate-600"
              )}
            >
              <tab.icon className={cn("w-3.5 h-3.5", activeTab === tab.id ? "text-brand-600" : "text-slate-400")} />
              {tab.label}
            </button>
          ))}
      </div>

      <div className="bg-white rounded-[40px] shadow-2xl border border-slate-100 p-8 min-h-[500px]">
        {activeTab === "docs" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center">
                     <Database className="w-5 h-5 text-brand-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900 uppercase">Staged Assets</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Reference documents for AI synthesis</p>
                  </div>
               </div>
               <Button
                  onClick={handleUploadNew}
                  className="bg-brand-600 hover:bg-brand-700 text-white font-black uppercase tracking-widest text-[10px] h-12 px-6 rounded-2xl shadow-lg shadow-brand-100 transition-all active:scale-[0.98]"
                >
                  <Plus className="w-4 h-4 mr-2 stroke-[3px]" />
                  Staging New Source
                </Button>
            </div>

            <DocsStep
              documents={state.uploadedDocuments}
              onUploadNew={handleUploadNew}
              onInitializeExtraction={handleInitializeExtraction}
              onDelete={handleDeleteDocument}
              loading={state.loading}
            />
          </div>
        )}

        {activeTab === "extract" && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <ExtractStep
              selectedDocuments={state.uploadedDocuments.filter(d => selectedDocumentIds.includes(d.id))}
              onExtract={handleExtract}
              onSaveGlobal={async () => {}} 
              loading={state.loading}
              extractionProgress={extractionProgress}
              samples={samples}
              draftId={state.draftId}
              initialPrompt={activePrompt}
              llmStatus={llmStatus}
              onApprove={handleApprove}
              approvalNotes={state.approvalNotes}
              setApprovalNotes={(notes) => setState(prev => ({ ...prev, approvalNotes: notes }))}
              correctedJson={state.correctedJson}
              setCorrectedJson={(json) => setState(prev => ({ ...prev, correctedJson: json }))}
            />
          </div>
        )}
      </div>

      <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
        <DialogContent className="max-w-[90vw] md:max-w-6xl w-full p-0 bg-white rounded-[40px] border-none shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
          <div className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar">
            <UploadStep
              onUpload={handleUpload}
              colleges={colleges}
              dataSources={dataSources}
              selectedCollege={state.selectedCollege}
              setSelectedCollege={(id) => setState(prev => ({ ...prev, selectedCollege: id }))}
              selectedSource={state.selectedSource}
              setSelectedSource={(id) => setState(prev => ({ ...prev, selectedSource: id }))}
              academicYear={state.academicYear}
              setAcademicYear={(year) => setState(prev => ({ ...prev, academicYear: year }))}
              loading={state.loading}
              error={state.error}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
