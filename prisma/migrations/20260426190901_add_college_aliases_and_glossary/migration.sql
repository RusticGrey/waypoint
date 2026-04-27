-- AlterTable
ALTER TABLE "College" ADD COLUMN     "aliases" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- CreateTable
CREATE TABLE "KnowledgeGlossary" (
    "id" TEXT NOT NULL,
    "term" TEXT NOT NULL,
    "expansion" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'general',
    "context" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KnowledgeGlossary_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "KnowledgeGlossary_term_key" ON "KnowledgeGlossary"("term");
