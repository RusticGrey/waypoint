import { prisma } from '@/lib/prisma';

export async function logChange({
  student_id,
  change_type,
  entity_type,
  entity_id,
  action,
  field_name,
  old_value,
  new_value,
  description,
}: {
  student_id: string;
  change_type: 'Profile_Update' | 'Goal_Progress' | 'New_Addition' | 'Improvement' | 'Milestone';
  entity_type: string;
  entity_id?: string;
  action: 'Created' | 'Updated' | 'Deleted' | 'Completed';
  field_name?: string;
  old_value?: string;
  new_value?: string;
  description: string;
}) {
  try {
    await prisma.changeLog.create({
      data: {
        student_id,
        change_type,
        entity_type,
        entity_id,
        action,
        field_name,
        old_value,
        new_value,
        description,
      },
    });
  } catch (error) {
    console.error('Failed to log change:', error);
  }
}

export function generateChangeDescription(
  action: string,
  entity_type: string,
  entity_name: string,
  field?: string,
  old_value?: string,
  new_value?: string
): string {
  switch (action) {
    case 'Created':
      return `Added new ${entity_type.toLowerCase()}: ${entity_name}`;
    case 'Updated':
      if (field && old_value && new_value) {
        return `Updated ${entity_type.toLowerCase()} "${entity_name}" - ${field}: ${old_value} → ${new_value}`;
      }
      return `Updated ${entity_type.toLowerCase()}: ${entity_name}`;
    case 'Deleted':
      return `Removed ${entity_type.toLowerCase()}: ${entity_name}`;
    case 'Completed':
      return `Completed ${entity_type.toLowerCase()}: ${entity_name}`;
    default:
      return `${action} ${entity_type.toLowerCase()}: ${entity_name}`;
  }
}
