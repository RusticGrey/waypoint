import { z } from 'zod';
import { getEnumValues } from '@/lib/utils/enums';

const enums = getEnumValues();

// Create reusable enum validators
const createEnumSchema = (enumArray: string[]) => {
  return z.enum(enumArray as [string, ...string[]]);
};

export const activitySchema = z.object({
  activityName: z.string().min(1, 'Activity name is required'),
  category: createEnumSchema(enums.activityCategories),
  role: z.string().optional(),
  gradeLevels: z.array(createEnumSchema(enums.gradeLevels)).min(1, 'Select at least one grade level'),
  hoursPerWeek: z.number().min(0, 'Hours must be positive').max(168, 'Cannot exceed 168 hours per week'),
  weeksPerYear: z.number().min(0, 'Weeks must be positive').max(52, 'Cannot exceed 52 weeks per year'),
  description: z.string().min(10, "Please provide a description (at least 10 characters)").max(500, 'Description too long').optional().nullable(),
});

export const achievementSchema = z.object({
  achievementType: createEnumSchema(enums.achievementTypes),
  title: z.string().min(1, 'Title is required'),
  organization: z.string().optional(),
  gradeLevel: createEnumSchema(enums.gradeLevels),
  dateAchieved: z.string().optional().nullable(),
  description: z.string().min(10, 'Please provide a description (at least 10 characters)'),
  metrics: z.string().optional(),
  recognitionLevel: createEnumSchema(enums.recognitionLevels).optional(),
  verifiableLink: z.string().url('Must be a valid URL').optional().or(z.literal('')),
});

// Modified project schema - make start_date optional for form validation
export const projectSchema = z.object({
  experienceType: createEnumSchema(enums.projectTypes),
  title: z.string().min(1, 'Title is required'),
  organization: z.string().optional(),
  location: z.string().optional(),
  startDate: z.string().optional(), // Made optional since we build it from dropdowns
  endDate: z.string().optional().nullable(),
  isOngoing: z.boolean().default(false),
  roleTitle: z.string().optional(),
  description: z.string().min(20, 'Please provide a detailed description (at least 20 characters)'),
  outcomes: z.string().optional(),
  skillsLearned: z.string().optional(),
  projectLink: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  mentorName: z.string().optional(),
  mentorEmail: z.string().email('Invalid email').optional().or(z.literal('')),
});

export type ActivityInput = z.infer<typeof activitySchema>;
export type AchievementInput = z.infer<typeof achievementSchema>;
export type ProjectInput = z.infer<typeof projectSchema>;
