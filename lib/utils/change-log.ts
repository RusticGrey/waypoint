import { prisma } from '@/lib/prisma';

export async function logChange({
  studentId,
  changeType,
  entityType,
  entityId,
  action,
  fieldName,
  oldValue,
  newValue,
  description,
}: {
  studentId: string;
  changeType: 'Profile_Update' | 'Goal_Progress' | 'New_Addition' | 'Improvement' | 'Milestone';
  entityType: string;
  entityId?: string;
  action: 'Created' | 'Updated' | 'Deleted' | 'Completed';
  fieldName?: string;
  oldValue?: string;
  newValue?: string;
  description: string;
}) {
  try {
    await prisma.changeLog.create({
      data: {
        studentId,
        changeType,
        entityType,
        entityId,
        action,
        fieldName,
        oldValue,
        newValue,
        description,
      },
    });
  } catch (error) {
    console.error('Failed to log change:', error);
  }
}

export function generateChangeDescription(
  action: string,
  entityType: string,
  entityName: string,
  field?: string,
  oldValue?: string,
  newValue?: string
): string {
  switch (action) {
    case 'Created':
      return `Added new ${entityType.toLowerCase()}: ${entityName}`;
    case 'Updated':
      if (field && oldValue && newValue) {
        return `Updated ${entityType.toLowerCase()} "${entityName}" - ${field}: ${oldValue} → ${newValue}`;
      }
      return `Updated ${entityType.toLowerCase()}: ${entityName}`;
    case 'Deleted':
      return `Removed ${entityType.toLowerCase()}: ${entityName}`;
    case 'Completed':
      return `Completed ${entityType.toLowerCase()}: ${entityName}`;
    default:
      return `${action} ${entityType.toLowerCase()}: ${entityName}`;
  }
}
