import { z } from 'zod';
import { getEnumValues } from '@/lib/utils/enums';

const enums = getEnumValues();

// Create reusable enum validators
const createEnumSchema = (enumArray: string[]) => {
  return z.enum(enumArray as [string, ...string[]]);
};

export const personalProfileSchema = z.object({
  preferredName: z.string().optional(),
  dateOfBirth: z.string().optional(),
  phone: z.string().optional(),
  currentSchool: z.string().min(1, 'School name is required'),
  schoolLocation: z.string().min(1, 'School location is required'),
  parentName: z.string().min(1, 'Parent name is required'),
  parentEmail: z.string().email('Invalid email'),
  parentPhone: z.string().min(1, 'Parent phone is required'),
  residency: z.string().optional(),
  citizenship: z.string().optional(),
});

export const transcriptSchema = z.object({
  courseName: z.string().min(1, 'Course name is required'),
  gradeLevel: createEnumSchema(enums.gradeLevels),
  curriculumType: createEnumSchema(enums.curriculumTypes).optional().nullable().or(z.literal('')),
  otherCurriculumName: z.string().optional().nullable().or(z.literal('')),
  gradingSystemType: createEnumSchema(enums.gradingSystemTypes).optional().nullable().or(z.literal('')),
  semester: createEnumSchema(enums.semesterTypes),
  gradeValue: z.string().min(1, 'Grade is required'),
  credits: z.number().optional().nullable(),
  honorsLevel: createEnumSchema(enums.honorsLevels).default('Standard'),
  isBoardExam: z.boolean().default(false),
});

export const testScoreSchema = z.object({
  testType: z.string().min(1, 'Test type is required'),
  testName: z.string().optional().nullable(),
  testDate: z.string().min(1, 'Test date is required'),
  compositeScore: z.coerce.number().int().min(0, 'Score must be positive'),
  mathScore: z.number().int().optional().nullable(),
  englishScore: z.number().int().optional().nullable(),
  scienceScore: z.number().int().optional().nullable(),
  readingWritingScore: z.number().int().optional().nullable(),
  listeningScore: z.number().int().optional().nullable(),
  speakingScore: z.number().int().optional().nullable(),
  writingScore: z.number().int().optional().nullable(),
  comments: z.string().optional().nullable(),
});

export type PersonalProfileInput = z.infer<typeof personalProfileSchema>;
export type TranscriptInput = z.infer<typeof transcriptSchema>;
export type TestScoreInput = z.infer<typeof testScoreSchema>;
