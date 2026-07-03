'use client';

import { cn } from '@/lib/utils/helpers';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface WeekData {
  week: number;
  label: string;
  isActive: boolean;
  completionPercentage: number;
}

interface WeekNavigatorProps {
  weeks: WeekData[];
  activeWeek: number;
  onWeekChange: (week: number) => void;
}

export function WeekNavigator({
  weeks,
  activeWeek,
  onWeekChange,
}: WeekNavigatorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {weeks.map((week) => (
        <button
          key={week.week}
          onClick={() => onWeekChange(week.week)}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all',
            week.isActive
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300'
              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-600 dark:text-gray-400'
          )}
        >
          <span className="text-sm font-medium">{week.label}</span>
          <Badge
            variant={week.isActive ? 'primary' : 'secondary'}
            size="xs"
          >
            {Math.round(week.completionPercentage)}%
          </Badge>
        </button>
      ))}
    </div>
  );
}
