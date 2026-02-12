import { z } from 'zod';

export const activitySchema = z.object({
  activity_name: z.string().min(1, 'Activity name is required'),
  category: z.string().min(1, 'Category is required'),
  role: z.string().optional(),
  grade_levels: z.array(z.enum(['ninth', 'tenth', 'eleventh', 'twelfth'])).min(1, 'Select at least one grade level'),
  hours_per_week: z.number().min(0, 'Hours must be positive').max(168, 'Cannot exceed 168 hours per week'),
  weeks_per_year: z.number().min(0, 'Weeks must be positive').max(52, 'Cannot exceed 52 weeks per year'),
  description: z.string().min(10, 'Please provide a description (at least 10 characters)').max(500, 'Description too long'),
});

export const achievementSchema = z.object({
  achievement_type: z.enum(['Award_Honor', 'Competition', 'Leadership', 'Social_Impact', 'Extracurricular']),
  title: z.string().min(1, 'Title is required'),
  organization: z.string().optional(),
  grade_level: z.enum(['ninth', 'tenth', 'eleventh', 'twelfth']),
  date_achieved: z.string().optional().nullable(),
  description: z.string().min(10, 'Please provide a description (at least 10 characters)'),
  metrics: z.string().optional(),
  recognition_level: z.enum(['School', 'Inter_School', 'District', 'City', 'State', 'National', 'International']).optional(),
  verifiable_link: z.string().url('Must be a valid URL').optional().or(z.literal('')),
});

// Modified project schema - make start_date optional for form validation
export const projectSchema = z.object({
  experience_type: z.enum(['Academic_Project', 'Independent_Project', 'Research', 'Internship', 'Summer_Program', 'Work_Experience']),
  title: z.string().min(1, 'Title is required'),
  organization: z.string().optional(),
  location: z.string().optional(),
  start_date: z.string().optional(), // Made optional since we build it from dropdowns
  end_date: z.string().optional().nullable(),
  is_ongoing: z.boolean().default(false),
  role_title: z.string().optional(),
  description: z.string().min(20, 'Please provide a detailed description (at least 20 characters)'),
  outcomes: z.string().optional(),
  skills_learned: z.string().optional(),
  project_link: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  mentor_name: z.string().optional(),
  mentor_email: z.string().email('Invalid email').optional().or(z.literal('')),
  status: z.enum(['Completed', 'In_Progress', 'Planned']).default('Completed'),
});

export type ActivityInput = z.infer<typeof activitySchema>;
export type AchievementInput = z.infer<typeof achievementSchema>;
export type ProjectInput = z.infer<typeof projectSchema>;
