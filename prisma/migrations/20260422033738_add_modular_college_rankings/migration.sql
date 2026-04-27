-- CreateTable
CREATE TABLE "RankingSource" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "base_url" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RankingSource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RankingSourceCollege" (
    "id" TEXT NOT NULL,
    "ranking_source_id" TEXT NOT NULL,
    "college_id" TEXT NOT NULL,
    "source_profile_url" TEXT NOT NULL,
    "sections" JSONB NOT NULL DEFAULT '{}',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RankingSourceCollege_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CollegeRankingData" (
    "id" TEXT NOT NULL,
    "college_id" TEXT NOT NULL,
    "ranking_source_id" TEXT NOT NULL,
    "academic_year" TEXT NOT NULL,
    "acceptance_rate" DOUBLE PRECISION,
    "rankings" JSONB,
    "cost_of_attendance" JSONB,
    "admissions_data" JSONB,
    "fields_present" TEXT[],
    "extraction_method" TEXT NOT NULL DEFAULT 'LLM',
    "llm_model_used" TEXT,
    "scraped_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "approved_at" TIMESTAMP(3),
    "approved_by_user_id" TEXT,

    CONSTRAINT "CollegeRankingData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RankingSourceCredential" (
    "id" TEXT NOT NULL,
    "ranking_source_id" TEXT NOT NULL,
    "organization_id" TEXT NOT NULL,
    "encrypted_email" TEXT,
    "encrypted_password" TEXT,
    "encrypted_api_key" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "last_tested_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RankingSourceCredential_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RankingSource_name_key" ON "RankingSource"("name");

-- CreateIndex
CREATE UNIQUE INDEX "RankingSourceCollege_ranking_source_id_college_id_key" ON "RankingSourceCollege"("ranking_source_id", "college_id");

-- CreateIndex
CREATE UNIQUE INDEX "CollegeRankingData_college_id_ranking_source_id_academic_ye_key" ON "CollegeRankingData"("college_id", "ranking_source_id", "academic_year");

-- CreateIndex
CREATE UNIQUE INDEX "RankingSourceCredential_ranking_source_id_organization_id_key" ON "RankingSourceCredential"("ranking_source_id", "organization_id");

-- AddForeignKey
ALTER TABLE "RankingSourceCollege" ADD CONSTRAINT "RankingSourceCollege_ranking_source_id_fkey" FOREIGN KEY ("ranking_source_id") REFERENCES "RankingSource"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RankingSourceCollege" ADD CONSTRAINT "RankingSourceCollege_college_id_fkey" FOREIGN KEY ("college_id") REFERENCES "College"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollegeRankingData" ADD CONSTRAINT "CollegeRankingData_college_id_fkey" FOREIGN KEY ("college_id") REFERENCES "College"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollegeRankingData" ADD CONSTRAINT "CollegeRankingData_ranking_source_id_fkey" FOREIGN KEY ("ranking_source_id") REFERENCES "RankingSource"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollegeRankingData" ADD CONSTRAINT "CollegeRankingData_approved_by_user_id_fkey" FOREIGN KEY ("approved_by_user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RankingSourceCredential" ADD CONSTRAINT "RankingSourceCredential_ranking_source_id_fkey" FOREIGN KEY ("ranking_source_id") REFERENCES "RankingSource"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RankingSourceCredential" ADD CONSTRAINT "RankingSourceCredential_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
