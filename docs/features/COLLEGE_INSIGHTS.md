# College Insights & Beacon AI

## Overview
The College Insights system is Waypoint's centralized engine for gathering, processing, and utilizing multi-source college data. Moving beyond brittle, traditional web scraping, it employs a human-in-the-loop "Document Repository" approach combined with advanced LLM-powered extraction (Gemini). This architecture creates a high-fidelity database of college insights that powers advanced counselor dashboards and the **Beacon AI** conversational agent.

---

## 1. The Knowledge Repository
The foundation of the system is the **Knowledge Repository**, which stores raw source material for every institution.

*   **CollegeDocument**: Stores raw HTML or PDF content uploaded by counselors. This preserves the original source context (e.g., a specific admissions page from US News) and allows for re-extraction if requirements change.
*   **DataSource**: Defines the origin of the information (e.g., US News, Niche, Common App).
*   **KnowledgeGlossary**: A mapping of acronyms and shorthands (e.g., "MIT" -> "Massachusetts Institute of Technology") used to resolve user queries and normalize data.

---

## 2. LLM Extraction Engine
Structured data is derived from raw documents using a sophisticated extraction pipeline.

*   **Automated Extraction**: When a document is uploaded, the system identifies the relevant **DataSourcePrompt** (extraction template) and calls Gemini 2.5 Flash.
*   **Structured JSON (CollegeInsight)**: The LLM transforms messy HTML into clean, validated JSON blocks stored in the `CollegeInsight` model.
*   **Human-in-the-Loop Review**: Before data goes live, counselors can review the extracted JSON via a dedicated editor, making manual corrections and "approving" the record.
*   **Schema Resilience**: The system handles varying JSON structures by grouping data into functional domains (Admissions, Finance, Academics, etc.).

---

## 3. Data Synchronization Pipeline
To maintain consistency between development and production environments, Waypoint uses a specialized sync pipeline.

*   **Incremental Export**: The `export-intelligence.ts` script generates timestamped JSON delta files containing newly approved insights and colleges.
*   **Atomic Seeding**: `seed-intelligence.ts` consumes these delta files and performs "upserts" into the target database.
*   **ID Agnosticism**: The sync logic uses natural keys (College Name + Source + Year) to resolve relationships, preventing unique constraint errors and allowing IDs to differ between environments.

---

## 4. Beacon AI: Conversational Intelligence
**Beacon AI** is the agentic interface that brings the College Insights repository to life for counselors and students.

### User Experience
Instead of navigating complex tables, users simply chat with Beacon AI:
*   *"Which colleges have a Nov 1 ED deadline?"*
*   *"Show me a comparison of tuition and aid for the Ivy League."*
*   *"What is the engineering ranking for Carnegie Mellon?"*

### Architecture: The "Domain Fetch" Approach
Beacon AI does not use limited, pre-defined filters. Instead, it utilizes a powerful **Agentic Tooling** system:

1.  **Context Identification**: The AI analyzes the user query to identify the required data "domain" (e.g., `admissions`, `finance`).
2.  **Global Domain Fetching**: It calls the `fetch_intelligence_domain` tool, which instantly pulls the relevant JSON sections for **every approved college** in the database.
3.  **Fuzzy Key Matching**: The tool automatically handles data inconsistencies, ignoring numeric prefixes (like `1_admissions`) and merging related keys (like `Financials` and `Cost_of_attendance`) on the fly.
4.  **In-Memory Reasoning**: Leveraging Gemini's 1M+ token context window, the AI performs complex filtering, sorting, and comparison natively within its own reasoning engine, providing far more accurate and nuanced answers than traditional database queries.

---

## Technical Stack
*   **Extraction & AI**: Google Gemini 2.5 Flash
*   **Database**: PostgreSQL (JSONB for unstructured metrics)
*   **ORM**: Prisma (with schema-resilient seeding)
*   **Sync**: Custom TypeScript CLI tools for incremental delta generation
