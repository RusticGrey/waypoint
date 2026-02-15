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
