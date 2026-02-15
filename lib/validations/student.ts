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
});

export const academicProfileSchema = z.object({
  curriculumType: createEnumSchema(enums.curriculumTypes),
  gradingSystemType: createEnumSchema(enums.gradingSystemTypes),
  currentGpa: z.string().optional(),
});

export const transcriptSchema = z.object({
  courseName: z.string().min(1, 'Course name is required'),
  gradeLevel: createEnumSchema(enums.gradeLevels),
  semester: createEnumSchema(enums.semesterTypes),
  gradeValue: z.string().min(1, 'Grade is required'),
  credits: z.number().optional(),
  honorsLevel: createEnumSchema(enums.honorsLevels).default('Standard'),
  isBoardExam: z.boolean().default(false),
});

export const testScoreSchema = z.object({
  testType: z.string().min(1, 'Test type is required'),
  testDate: z.string().min(1, 'Test date is required'),
  compositeScore: z.number({ required_error: "Score is required" }).int().min(0, 'Score must be positive'),
  mathScore: z.number().int().optional(),
  englishScore: z.number().int().optional(),
  scienceScore: z.number().int().optional(),
  readingWritingScore: z.number().int().optional(),
});

export type PersonalProfileInput = z.infer<typeof personalProfileSchema>;
export type AcademicProfileInput = z.infer<typeof academicProfileSchema>;
export type TranscriptInput = z.infer<typeof transcriptSchema>;
export type TestScoreInput = z.infer<typeof testScoreSchema>;
