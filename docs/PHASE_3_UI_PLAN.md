# Phase 3: UI Implementation - Knowledge Repository Workflow

**Date:** April 26, 2026  
**Status:** Starting Implementation  
**Focus:** 4-Step Workflow Components

---

## Phase 3 Overview

Build a 4-step workflow UI for college knowledge repository management:

```
UploadStep → ExtractStep → ReviewStep → SuccessStep
```

---

## Component Architecture

### Main Workflow Container
**File:** `components/admin/rankings/KnowledgeWorkflow.tsx`

```tsx
// State management for workflow
- currentStep: "upload" | "extract" | "review" | "success"
- uploadedDocuments: CollegeDocument[]
- extractedData: CollegeRankingData[]
- selectedCollege: string
- selectedSource: string
- academicYear: string
```

### Step Components

#### 1. UploadStep
**File:** `components/admin/rankings/UploadStep.tsx`

**Features:**
- File drag-and-drop area
- College selector dropdown
- Ranking source selector
- Academic year input (string format: "2025-2026")
- Multi-file support with progress indicators
- Upload button with loading state

**Props:**
```tsx
interface UploadStepProps {
  onUpload: (documents: UploadedDocument[]) => Promise<void>;
  colleges: College[];
  rankingSources: RankingSource[];
  loading: boolean;
}
```

#### 2. ExtractStep
**File:** `components/admin/rankings/ExtractStep.tsx`

**Features:**
- Display uploaded documents summary
- Batch extraction trigger button
- Processing queue display
- Progress indicators for extraction
- Sample extracted data preview (mock)
- Status badges (Pending, Extracting, Extracted)

**Props:**
```tsx
interface ExtractStepProps {
  uploadedCount: number;
  onExtract: () => Promise<void>;
  loading: boolean;
  extractionProgress: number;
  samples?: ExtractionSample[];
}
```

#### 3. ReviewStep
**File:** `components/admin/rankings/ReviewStep.tsx`

**Features:**
- Display extracted ranking data in JSON editor
- Before/after comparison view
- Modify JSON capability
- Approval notes textarea
- Approve/Reject/Modify buttons
- Validation feedback

**Props:**
```tsx
interface ReviewStepProps {
  extractedData: CollegeRankingData[];
  onApprove: (action: "approve" | "reject" | "modify") => Promise<void>;
  loading: boolean;
  approvalNotes: string;
  setApprovalNotes: (notes: string) => void;
}
```

#### 4. SuccessStep
**File:** `components/admin/rankings/SuccessStep.tsx`

**Features:**
- Success confirmation message
- Summary of approved documents
- Document count and college names
- Academic year confirmation
- Link to review dashboard
- Button to start new upload

**Props:**
```tsx
interface SuccessStepProps {
  approvedCount: number;
  collegeName: string;
  academicYear: string;
  onNewWorkflow: () => void;
}
```

### Utility Components

#### JsonEditor
**File:** `components/admin/rankings/JsonEditor.tsx`

**Features:**
- Syntax highlighting (use `react-syntax-highlighter`)
- Read-only mode for display
- Edit mode with validation
- Copy to clipboard button
- Format/beautify JSON
- Line numbers
- Search functionality

**Props:**
```tsx
interface JsonEditorProps {
  json: Record<string, any>;
  readOnly?: boolean;
  onChange?: (json: Record<string, any>) => void;
  height?: string;
  theme?: "light" | "dark";
}
```

---

## State Flow Diagram

```
┌─────────────────────────────────────────────────┐
│      KnowledgeWorkflow (Container)              │
├─────────────────────────────────────────────────┤
│                                                 │
│  if (step === "upload")                         │
│    → <UploadStep />                             │
│       └─ onUpload() → POST /api/.../upload      │
│          → step = "extract"                     │
│                                                 │
│  if (step === "extract")                        │
│    → <ExtractStep />                            │
│       └─ onExtract() → POST /api/.../extract    │
│          → step = "review"                      │
│                                                 │
│  if (step === "review")                         │
│    → <ReviewStep />                             │
│       └─ onApprove() → POST /api/.../approve    │
│          → step = "success"                     │
│                                                 │
│  if (step === "success")                        │
│    → <SuccessStep />                            │
│       └─ onNewWorkflow() → step = "upload"      │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## API Integration Points

### UploadStep → Upload API
```ts
POST /api/admin/colleges/knowledge/upload
Body: {
  collegeId: string
  academicYear: string
  rankingSourceId: string
  documents: Array<{
    fileName: string
    rawHtmlContent: string
    mimeType?: string
    documentType?: string
  }>
}
Response: {
  success: boolean
  uploadedDocuments: CollegeDocument[]
}
```

### ExtractStep → Extract-Batch API
```ts
POST /api/admin/colleges/knowledge/extract-batch
Body: {
  batchSize?: number (default: 10)
}
Response: {
  success: boolean
  draftId: string
  processed: number
  samples: ExtractionSample[]
}
```

### ReviewStep → Approval API
```ts
POST /api/admin/colleges/knowledge/approve
Body: {
  action: "approve" | "reject" | "modify"
  dataId: string
  approvalNotes?: string
  correctedJson?: Record<string, any>
}
Response: {
  success: boolean
  newStatus: "approved" | "rejected" | "pending"
}
```

---

## Form Validation

### UploadStep Validation
```ts
- College ID: required, valid UUID
- Academic Year: required, format "YYYY-YYYY"
- Ranking Source: required, valid UUID
- Files: required, at least 1 file, max 10 files, max 50MB each
```

### ReviewStep Validation
```ts
- Approval Notes: optional, max 500 characters
- Corrected JSON: optional, must be valid JSON if provided
- Action: required, one of approve/reject/modify
```

---

## File Structure

```
components/admin/rankings/
├── KnowledgeWorkflow.tsx      (Main container)
├── UploadStep.tsx             (Step 1)
├── ExtractStep.tsx            (Step 2)
├── ReviewStep.tsx             (Step 3)
├── SuccessStep.tsx            (Step 4)
├── JsonEditor.tsx             (Utility)
└── types.ts                   (Shared types)

hooks/
├── useKnowledgeWorkflow.ts    (Custom hook for workflow state)
└── useJsonValidation.ts       (JSON validation hook)

app/(dashboard)/admin/
└── rankings/
    └── knowledge/
        └── page.tsx           (Page component)
```

---

## Dependencies

```json
{
  "react": "^18.0.0",
  "react-hook-form": "^7.45.0",
  "zod": "^3.22.0",
  "react-syntax-highlighter": "^15.5.0",
  "lucide-react": "^0.263.0"
}
```

---

## UI/UX Design Patterns

### Step Indicators
- Horizontal progress bar showing 4 steps
- Current step highlighted
- Completed steps with checkmarks
- Disabled steps grayed out

### Loading States
- Skeleton loaders during API calls
- Spinner for async operations
- Toast notifications for errors
- Progress indicators for batch operations

### Error Handling
- Toast error messages
- Inline validation feedback
- Retry buttons for failed operations
- Clear error descriptions

### Responsive Design
- Mobile-first approach
- Responsive layout for tablets/desktops
- Full-width file dropzone
- Scrollable tables on small screens

---

## Implementation Order

1. **Create shared types** (`types.ts`)
2. **Create JsonEditor** (reusable component)
3. **Create UploadStep** (form handling)
4. **Create ExtractStep** (progress display)
5. **Create ReviewStep** (JSON editor integration)
6. **Create SuccessStep** (confirmation)
7. **Create KnowledgeWorkflow** (orchestration)
8. **Create custom hooks** (state management)
9. **Create page component** (routing)

---

## Testing Checklist

- [ ] UploadStep file upload validation
- [ ] ExtractStep batch processing
- [ ] ReviewStep JSON editor functionality
- [ ] SuccessStep redirection
- [ ] API error handling
- [ ] Form validation feedback
- [ ] Responsive design on mobile
- [ ] Tab navigation between steps
- [ ] State persistence on refresh (optional)

---

## Next Session Tasks

When resuming Phase 3:

1. Start with `types.ts` - Define all TypeScript interfaces
2. Build `JsonEditor.tsx` - Foundation for ReviewStep
3. Build `UploadStep.tsx` - First user interaction
4. Build `ExtractStep.tsx` - API integration
5. Build `ReviewStep.tsx` - Complex component
6. Build `SuccessStep.tsx` - Completion screen
7. Build `KnowledgeWorkflow.tsx` - Orchestration
8. Integrate with routing

---

**Status:** Phase 3 Plan Ready  
**Next:** Implementation in fresh session