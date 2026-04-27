# College Knowledge Repository & Rankings

## Overview
Waypoint's College Knowledge Repository is a centralized hub for multi-source college data. Instead of brittle web scraping, it uses a human-in-the-loop "HTML Blob Upload" approach combined with LLM-powered extraction (Gemini/Claude). This creates a future-proof repository of both raw documents and structured metrics, enabling advanced counselor tools and student-facing AI advisors.

## Architecture: The Knowledge Loop

1.  **Data Acquisition (Counselor)**: Counselors visit premium sources (US News, Niche, etc.) in their personal browser and save key pages (Overall, Admissions, Academics, Finance) as HTML.
2.  **Ingestion & Preservation**: Counselors upload these HTML blobs to Waypoint. The system stores the raw HTML to preserve original source context.
3.  **LLM Extraction**: Using configurable `ExtractionTemplates`, an LLM (Gemini) parses the HTML into structured JSON data.
4.  **Knowledge Retrieval**: The stored data and raw text form the basis for:
    *   **Structured Dashboards**: Comparative ranking tables.
    *   **Unstructured Querying**: A sleek Counselor Chatbot for open-ended questions.

## Data Models

### `CollegeDocument`
Stores the source material.
- `section`: admissions, academics, finance, campus, or overall.
- `rawHtmlContent`: Complete source HTML.
- `extractedData`: JSON blob of metrics extracted by LLM.
- `htmlHash`: For deduplication.

### `ExtractionTemplate`
Configurable prompts for the LLM.
- `promptTemplate`: The specific instructions for the LLM.
- `outputSchema`: Expected JSON structure.
- `fields`: Array of metrics to be highlighted in UI.

### `CollegeDataQuery`
Logs of interactions with the knowledge base.
- `queryText`: Natural language question.
- `results`: The AI-generated answer.

## Key Workflows

### 1. Document Upload & Processing
- **Endpoint**: `POST /api/admin/college-documents/upload`
- **Logic**: 
  - Receives HTML file + Section Label.
  - Matches section to latest `ExtractionTemplate`.
  - Calls Gemini API with HTML + Prompt.
  - Validates JSON output against schema.
  - Stores `CollegeDocument`.

### 2. Counselor Chat Interface
- **Interface**: A sleek, side-panel chat UI.
- **Workflow**:
  - Counselor asks: "What are the common financial aid packages at CMU?"
  - System retrieves `finance` documents for CMU.
  - LLM synthesizes a response using the `extractedData` and raw text.
  - Supports follow-up questions.

### 3. Future Roadmap: Student Advisor
- **Student Profile Integration**: Chatbot will combine College Knowledge with the Student's `AcademicProfile` and `TestScores`.
- **Personalized Fit**: "Based on my 1450 SAT and interest in CS, how do my chances look for these 3 schools?"

## Technical Implementation
- **Parsing**: `cheerio` (pre-processing) + `Gemini-1.5-Flash` (extraction).
- **Storage**: Supabase PostgreSQL (JSONB for extracted data).
- **UI**: Tailwind CSS + Shadcn UI components for a modern "Vibe" experience.
