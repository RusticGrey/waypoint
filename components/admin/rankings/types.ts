// Shared types for Knowledge Repository UI components

export interface College {
  id: string;
  name: string;
}

export interface DataSource {
  id: string;
  name: string;
  displayName: string;
  isActive: boolean;
}

export interface UploadedDocument {
  id: string;
  fileName?: string;
  status?: string;
  academicYear?: string;
  contentType?: string;
  dataSourceId?: string;
  extractedAt?: string;
  uploadedAt: string;
}

export interface ExtractionSample {
  id: string;
  collegeId: string;
  collegeName: string;
  dataSourceId: string;
  dataSourceName: string;
  academicYear: string;
  extractedData: Record<string, any>;
  data: Record<string, any>;
}

export interface CollegeInsight {
  id: string;
  collegeId: string;
  collegeName: string;
  dataSourceId: string;
  dataSourceName: string;
  academicYear: string;
  data: Record<string, any>;
  status: "pending" | "approved" | "rejected";
}

export interface WorkflowState {
  currentStep: "docs" | "extract" | "review" | "success";
  selectedCollege: string;
  selectedSource: string;
  academicYear: string;
  uploadedDocuments: UploadedDocument[];
  extractedData: CollegeInsight[];
  draftId: string | null;
  approvalNotes: string;
  correctedJson: Record<string, any> | null;
  loading: boolean;
  error: string | null;
}

export interface UploadStepProps {
  onUpload: (documents: Array<{
    fileName: string;
    content: string;
    contentType?: string;
  }>) => Promise<void>;
  colleges: College[];
  dataSources: DataSource[];
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
  extractedData: CollegeInsight[];
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