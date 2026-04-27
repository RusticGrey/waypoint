-- CreateTable
CREATE TABLE "CollegeDocument" (
    "id" TEXT NOT NULL,
    "college_id" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "source_type" TEXT NOT NULL,
    "raw_html_content" TEXT NOT NULL,
    "html_hash" TEXT NOT NULL,
    "extracted_data" JSONB,
    "extraction_status" TEXT NOT NULL DEFAULT 'pending',
    "extracted_at" TIMESTAMP(3),
    "uploaded_by_user_id" TEXT NOT NULL,
    "uploaded_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metadata" JSONB NOT NULL DEFAULT '{}',
    "template_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CollegeDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExtractionTemplate" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "source_type" TEXT NOT NULL,
    "prompt_template" TEXT NOT NULL,
    "output_schema" JSONB NOT NULL,
    "fields" TEXT[],
    "version" INTEGER NOT NULL DEFAULT 1,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExtractionTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CollegeDataQuery" (
    "id" TEXT NOT NULL,
    "college_id" TEXT NOT NULL,
    "query_type" TEXT NOT NULL,
    "query_text" TEXT NOT NULL,
    "results" JSONB NOT NULL,
    "documents_used" TEXT[],
    "created_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CollegeDataQuery_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CollegeDocument_college_id_section_idx" ON "CollegeDocument"("college_id", "section");

-- CreateIndex
CREATE INDEX "CollegeDocument_source_type_idx" ON "CollegeDocument"("source_type");

-- CreateIndex
CREATE UNIQUE INDEX "ExtractionTemplate_section_source_type_version_key" ON "ExtractionTemplate"("section", "source_type", "version");

-- AddForeignKey
ALTER TABLE "CollegeDocument" ADD CONSTRAINT "CollegeDocument_college_id_fkey" FOREIGN KEY ("college_id") REFERENCES "College"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollegeDocument" ADD CONSTRAINT "CollegeDocument_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "ExtractionTemplate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollegeDataQuery" ADD CONSTRAINT "CollegeDataQuery_college_id_fkey" FOREIGN KEY ("college_id") REFERENCES "College"("id") ON DELETE CASCADE ON UPDATE CASCADE;
