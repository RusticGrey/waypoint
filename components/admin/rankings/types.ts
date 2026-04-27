// Shared types for Knowledge Repository UI components

export interface College {
  id: string;
  name: string;
}

export interface RankingSource {
  id: string;
  name: string;
  displayName: string;
  isActive: boolean;
}

export interface UploadedDocument {
  id: string;
  fileName?: string;
  approvalStatus?: string;
  academicYear?: string;
  mimeType?: string;
  sourceType?: string;
  extractionStatus?: string;
  extractedAt?: string;
  extractedData?: any;
  uploadedAt: string;
  metadata?: any;
}

export interface ExtractionSample {
  collegeId: string;
  collegeName: string;
  rankingSourceId: string;
  rankingSourceName: string;
  academicYear: string;
  extractedData: Record<string, any>;
  rankingDataJSON?: Record<string, any>;
}

export interface CollegeRankingData {
  id: string;
  collegeId: string;
  collegeName: string;
  rankingSourceId: string;
  rankingSourceName: string;
  academicYear: string;
  rankingDataJSON: Record<string, any>;
  approvalStatus: "pending" | "approved" | "rejected";
  sourceDocumentIds: string[];
}

export interface WorkflowState {
  currentStep: "docs" | "extract" | "review" | "success";
  selectedCollege: string;
  selectedSource: string;
  academicYear: string;
  uploadedDocuments: UploadedDocument[];
  extractedData: CollegeRankingData[];
  draftId: string | null;
  approvalNotes: string;
  correctedJson: Record<string, any> | null;
  loading: boolean;
  error: string | null;
}

export interface UploadStepProps {
  onUpload: (documents: Array<{
    fileName: string;
    rawHtmlContent: string;
    mimeType?: string;
    documentType?: string;
  }>) => Promise<void>;
  colleges: College[];
  rankingSources: RankingSource[];
  selectedCollege: string;
  setSelectedCollege: (id: string) => void;
  selectedSource: string;
  setSelectedSource: (id: string) => void;
  academicYear: string;
  setAcademicYear: (year: string) => void;
  loading: boolean;
  error: string | null;
}

export interface ExtractStepProps {
  selectedDocuments: any[];
  onExtract: (customPrompt?: string) => Promise<void>;
  onSaveGlobal: (prompt: string) => Promise<void>;
  loading: boolean;
  extractionProgress: number;
  samples: ExtractionSample[];
  draftId: string | null;
  initialPrompt: string;
  llmStatus?: string;
}

export interface ReviewStepProps {
  extractedData: CollegeRankingData[];
  onApprove: (action: "approve" | "reject" | "modify", dataId: string) => Promise<void>;
  loading: boolean;
  approvalNotes: string;
  setApprovalNotes: (notes: string) => void;
  correctedJson: Record<string, any> | null;
  setCorrectedJson: (json: Record<string, any>) => void;
}

export interface SuccessStepProps {
  approvedCount: number;
  collegeName: string;
  academicYear: string;
  onNewWorkflow: () => void;
  approvedDocuments: UploadedDocument[];
}

export interface JsonEditorProps {
  json: Record<string, any>;
  readOnly?: boolean;
  onChange?: (json: Record<string, any>) => void;
  height?: string;
  theme?: "light" | "dark";
  error?: string;
}