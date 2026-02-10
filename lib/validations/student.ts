import { z } from 'zod';

export const personalProfileSchema = z.object({
  preferred_name: z.string().optional(),
  date_of_birth: z.string().optional(),
  phone: z.string().optional(),
  current_school: z.string().min(1, 'School name is required'),
  school_location: z.string().min(1, 'School location is required'),
  parent_name: z.string().min(1, 'Parent name is required'),
  parent_email: z.string().email('Invalid email'),
  parent_phone: z.string().min(1, 'Parent phone is required'),
});

export const academicProfileSchema = z.object({
  curriculum_type: z.enum([
    'CBSE',
    'ICSE',
    'IB',
    'CAIE',
    'State_Board',
    'US_High_School',
    'Other',
  ]),
  grading_system_type: z.enum([
    'Marks_Out_Of_100',
    'Percentage',
    'IB_Scale',
    'Letter_Grade',
    'Other',
  ]),
  current_gpa: z.string().optional(),
});

export const transcriptSchema = z.object({
  course_name: z.string().min(1, 'Course name is required'),
  grade_level: z.enum(['ninth', 'tenth', 'eleventh', 'twelfth']),
  semester: z.enum(['Fall', 'Spring', 'Full_Year']),
  grade_value: z.string().min(1, 'Grade is required'),
  credits: z.number().optional(),
  honors_level: z.enum(['Standard', 'Honors', 'AP', 'IB_HL', 'IB_SL']).default('Standard'),
  is_board_exam: z.boolean().default(false),
});

export type PersonalProfileInput = z.infer<typeof personalProfileSchema>;
export type AcademicProfileInput = z.infer<typeof academicProfileSchema>;
export type TranscriptInput = z.infer<typeof transcriptSchema>;
