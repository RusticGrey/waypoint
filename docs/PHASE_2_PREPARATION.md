# College Knowledge Repository - Phase 2 Preparation

**Date:** April 26, 2026  
**Status:** Phase 1 Complete ✅ | Ready for Phase 2 APIs  
**Context Preserved At:** 86% usage

---

## Phase 1 Completion Summary

### Schema Refactoring ✅

The database schema has been successfully refactored to support a robust college knowledge repository system.

#### Key Models Added/Modified

**RankingSourcePrompt** (NEW - Versioning)
```prisma
model RankingSourcePrompt {
  id              String   @id @default(cuid())
  rankingSourceId String
  rankingSource   RankingSource @relation(fields: [rankingSourceId], references: [id])
  promptText      String   @db.Text
  version         Int      @default(1)
  isActive        Boolean  @default(true)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  documents       CollegeDocument[]
  
  @@unique([rankingSourceId, version])
}
```

**CollegeDocument** (MODIFIED - Multi-file, academic year context)
```prisma
model CollegeDocument {
  id               String   @id @default(cuid())
  collegeId        String
  college          College  @relation(fields: [collegeId], references: [id])
  rankingSourceId  String?
  rankingSource    RankingSource? @relation("documents", fields: [rankingSourceId], references: [id])
  promptId         String
  prompt           RankingSourcePrompt @relation(fields: [promptId], references: [id])
  academicYear     Int      // e.g., 2025 for 2025-2026 cycle
  
  mimeType         String   // application/pdf, image/png, etc.
  documentType     String   // e.g., "US_News_Rankings", "Princeton_Review", etc.
  approvalStatus   ApprovalStatus @default(PENDING)
  
  fileUrl          String
  fileName         String
  fileSize         Int
  uploadedAt       DateTime @default(now())
  
  approvedByUserId String?
  approvalNotes    String?
  
  rankingData      CollegeRankingData? @relation("sourceDocuments")
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt
  
  @@index([collegeId])
  @@index([rankingSourceId])
  @@index([promptId])
}
```

**CollegeRankingData** (MODIFIED - Academic year tracking, approval workflow)
```prisma
model CollegeRankingData {
  id              String   @id @default(cuid())
  collegeId       String
  college         College  @relation(fields: [collegeId], references: [id])
  rankingSourceId String
  rankingSource   RankingSource @relation(fields: [rankingSourceId], references: [id])
  
  academicYear    Int      // e.g., 2025
  rankingDataJSON Json     // Extracted ranking data
  
  approvalStatus  ApprovalStatus @default(PENDING)
  approvedByUserId String?
  
  sourceDocumentIds String[] // Array of CollegeDocument IDs
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  @@unique([collegeId, rankingSourceId, academicYear])
  @@index([collegeId])
  @@index([rankingSourceId])
}
```

**RankingSource** (MODIFIED - Relation updates)
```prisma
model RankingSource {
  id           String   @id @default(cuid())
  name         String   // "US_News", "QS_World", etc.
  description  String?
  
  documents    CollegeDocument[] @relation("documents")
  prompts      RankingSourcePrompt[]
  data         CollegeRankingData[]
  collegeMappings CollegeRankingMapping[]
  
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
```

#### Approval Status Enum
```prisma
enum ApprovalStatus {
  PENDING      // Uploaded, waiting for extraction
  EXTRACTED    // LLM extraction complete, in review queue
  APPROVED     // Approved by counselor, ready for use
  REJECTED     // Rejected with notes
}
```

### Migration Command
```bash
npx prisma migrate dev --name college_knowledge_repository_refactor
```
(Confirm destructive changes when prompted)

---

## Phase 2: API Implementation

### Overview
Implement 5 core API endpoints to manage the knowledge repository lifecycle.

### 1. Upload API - Multi-file Support
**Endpoint:** `POST /api/admin/colleges/{collegeId}/knowledge/upload`

**Responsibilities:**
- Accept multiple files (PDF, images, documents)
- Require `academicYear` parameter (e.g., 2025)
- Require `rankingSourceId` parameter
- Optional `mimeTypeOverride` for document classification
- Create `CollegeDocument` records with `PENDING` status
- Store files in cloud storage (configured via .env)

**Request:**
```json
{
  "academicYear": 2025,
  "rankingSourceId": "src_123",
  "documents": [
    { "file": File, "mimeTypeOverride": "application/pdf" }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "uploadedDocuments": [
    {
      "id": "doc_456",
      "fileName": "usnews-2025.pdf",
      "approvalStatus": "PENDING",
      "academicYear": 2025
    }
  ]
}
```

### 2. Extract-Batch API - LLM Processing
**Endpoint:** `POST /api/admin/colleges/knowledge/extract-batch`

**Responsibilities:**
- Fetch all documents with `PENDING` status
- Fetch latest **active** `RankingSourcePrompt` for each source
- Send documents + prompt to LLM (Claude/GPT-4V)
- Extract structured ranking data
- Create `CollegeRankingData` record with `EXTRACTED` status
- Return `draftId` for review
- Update `CollegeDocument` status to `EXTRACTED`

**Request:**
```json
{
  "batchSize": 10
}
```

**Response:**
```json
{
  "success": true,
  "draftId": "draft_789",
  "processed": 10,
  "samples": [
    {
      "collegeId": "col_123",
      "rankingSourceId": "src_456",
      "academicYear": 2025,
      "extractedData": { /* JSON */ }
    }
  ]
}
```

### 3. Approval Endpoint - Review & Transition
**Endpoint:** `POST /api/admin/colleges/knowledge/approve`

**Responsibilities:**
- Accept `draftId` or specific `CollegeRankingData` IDs
- Allow counselor to review extracted JSON
- Option to:
  - Approve (transition to `APPROVED`)
  - Reject (transition to `REJECTED` with notes)
  - Request modifications
- Update `approvedByUserId` and `approvalNotes`
- Optionally provide corrected JSON for approval

**Request:**
```json
{
  "action": "approve",
  "dataId": "ranking_999",
  "approvalNotes": "Data verified against official source",
  "correctedJson": null
}
```

**Response:**
```json
{
  "success": true,
  "dataId": "ranking_999",
  "newStatus": "APPROVED",
  "approvedAt": "2026-04-26T17:30:00Z"
}
```

### 4. Query Endpoint - Year Fallback
**Endpoint:** `GET /api/admin/colleges/{collegeId}/knowledge/rankings`

**Responsibilities:**
- Fetch approved `CollegeRankingData` for given year
- If no data for year → fallback to most recent approved data
- Include source document metadata
- Support filtering by `rankingSourceId`
- Return academic year in response

**Query Params:**
```
?academicYear=2025&rankingSourceId=src_123
```

**Response:**
```json
{
  "collegeId": "col_123",
  "academicYear": 2025,
  "rankings": [
    {
      "rankingSourceId": "src_456",
      "rankingDataJSON": { /* ranked fields */ },
      "approvalStatus": "APPROVED",
      "sourceDocumentIds": ["doc_123", "doc_124"]
    }
  ],
  "fallbackYear": 2024
}
```

### 5. Chat Endpoint Update - Approved Data Only
**Endpoint:** `POST /api/student/chat` (MODIFY existing)

**Responsibilities:**
- Query approved `CollegeRankingData` only
- Include academic year in context
- Show source citations with document metadata
- Format: "According to [RankingSource] (Academic Year 2025, sourced from [DocumentName])..."
- Exclude `PENDING` or `REJECTED` data

**Enhanced Response:**
```json
{
  "message": "Based on the latest data...",
  "citations": [
    {
      "rankingSourceId": "src_123",
      "academicYear": 2025,
      "documentName": "usnews-2025.pdf",
      "approvalDate": "2026-04-20"
    }
  ]
}
```

---

## Phase 3: UI Implementation

### Workflow: Upload → Extract → Review → Success

**4-Step Components:**

1. **UploadStep**
   - File drag-and-drop
   - College & year selection
   - Multi-file support
   - Progress tracking

2. **ExtractStep**
   - Trigger batch extraction
   - Show processing queue
   - Display extraction progress
   - Preview sample results

3. **ReviewStep**
   - JSON editor (Monaco/CodeMirror)
   - Side-by-side before/after
   - Approve/Reject/Modify options
   - Approval notes textarea

4. **SuccessStep**
   - Confirmation with document count
   - Academic year confirmation
   - Link to review dashboard

**Supporting Component: JsonEditor**
- Syntax highlighting
- Validation feedback
- Comparison view
- Diff highlighting

---

## Database State After Phase 1

### Current Migration
Latest: `20260426111602_rename_extraction_template_to_ranking_source_prompt`

### Test Data Available
- Seed script: `prisma/seed-rankings.ts`
- Contains sample RankingSources and RankingSourcePrompts
- Ready for API testing

---

## Implementation Checklist for Phase 2

### APIs
- [ ] Upload endpoint (multi-file, academicYear, mimeType)
- [ ] Extract-batch endpoint (LLM integration, prompt versioning)
- [ ] Approval endpoint (review, transition states)
- [ ] Query endpoint (year fallback logic)
- [ ] Update chat endpoint (approved data, citations)

### Features
- [ ] Cloud storage integration (.env setup)
- [ ] LLM prompt management (latest version fetching)
- [ ] Batch processing with queue management
- [ ] Error handling & retry logic
- [ ] Audit logging for approvals

### Testing
- [ ] Unit tests for extraction logic
- [ ] Integration tests for API flows
- [ ] E2E tests for full workflow
- [ ] Year fallback logic validation

---

## Tech Notes

### Key Decisions
1. **Version Control:** RankingSourcePrompt versioning prevents old documents being re-extracted with new prompts
2. **Academic Year:** Mandatory field enables year-aware queries and fallback logic
3. **Approval Workflow:** State machine prevents unapproved data leakage
4. **Draft IDs:** Batch processing returns draftId for atomicity and audit trail

### Integration Points
- **Cloud Storage:** Configure S3/GCS bucket path in .env
- **LLM:** Claude API (lib/scraping/llm) or GPT-4V
- **Prisma:** Relations use camelCase throughout
- **Auth:** Counselor/Admin role checks required

### Error Handling
- Document upload failures → log & notify
- LLM extraction timeouts → queue for retry
- Invalid extracted JSON → validation error with sample
- Approval conflicts → prevent double-approval

---

## Next Steps to Begin Phase 2

1. **Branch:** Create feature branch `phase-2/api-refactoring`
2. **Environment:** Ensure cloud storage credentials in .env.local
3. **Migration:** Run `npx prisma migrate dev --name college_knowledge_repository_refactor`
4. **Verification:** Test schema with `npx prisma studio`
5. **Start Coding:** Implement APIs in order (upload → extract → approval → query → chat update)

---

## Key Files to Review/Update

```
app/api/admin/colleges/knowledge/
├── upload/route.ts          # NEW
├── extract-batch/route.ts   # NEW
├── approve/route.ts         # NEW
└── query/route.ts           # NEW

lib/scraping/
├── llm/                      # Update for prompt version handling
└── multiSourceOrchestrator.ts # Update for approval workflow

app/(dashboard)/admin/
└── colleges/knowledge/       # NEW UI components for Phase 3
```

---

**Document Created:** 2026-04-26 | **Status:** Ready for Phase 2 Implementation