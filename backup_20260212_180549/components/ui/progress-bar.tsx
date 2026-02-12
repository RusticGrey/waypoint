interface ProgressBarProps {
  percentage: number;
  label?: string;
  showLabel?: boolean;
}

export function ProgressBar({ percentage, label, showLabel = true }: ProgressBarProps) {
  const getColor = (pct: number) => {
    if (pct >= 80) return 'bg-green-600';
    if (pct >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div>
      {showLabel && label && (
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          <span className="text-sm font-medium text-gray-700">{percentage}%</span>
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full transition-all ${getColor(percentage)}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
