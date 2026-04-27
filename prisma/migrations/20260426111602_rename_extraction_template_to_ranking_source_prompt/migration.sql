/*
  Warnings:

  - You are about to drop the column `template_id` on the `CollegeDocument` table. All the data in the column will be lost.
  - You are about to drop the `ExtractionTemplate` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CollegeDocument" DROP CONSTRAINT "CollegeDocument_template_id_fkey";

-- DropIndex
DROP INDEX "CollegeDocument_college_id_section_idx";

-- AlterTable
ALTER TABLE "CollegeDocument" DROP COLUMN "template_id",
ADD COLUMN     "prompt_id" TEXT;

-- DropTable
DROP TABLE "ExtractionTemplate";

-- CreateTable
CREATE TABLE "RankingSourcePrompt" (
    "id" TEXT NOT NULL,
    "ranking_source_id" TEXT NOT NULL,
    "prompt_text" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RankingSourcePrompt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RankingSourcePrompt_ranking_source_id_version_key" ON "RankingSourcePrompt"("ranking_source_id", "version");

-- CreateIndex
CREATE INDEX "CollegeDocument_college_id_idx" ON "CollegeDocument"("college_id");

-- AddForeignKey
ALTER TABLE "CollegeDocument" ADD CONSTRAINT "CollegeDocument_prompt_id_fkey" FOREIGN KEY ("prompt_id") REFERENCES "RankingSourcePrompt"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RankingSourcePrompt" ADD CONSTRAINT "RankingSourcePrompt_ranking_source_id_fkey" FOREIGN KEY ("ranking_source_id") REFERENCES "RankingSource"("id") ON DELETE CASCADE ON UPDATE CASCADE;
