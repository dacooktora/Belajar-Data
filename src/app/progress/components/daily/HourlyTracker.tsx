'use client';

import { cn } from '@/lib/utils/helpers';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { DailyProgress } from '@/lib/types/progress.types';

interface HourlyTrackerProps {
  dayId: number;
  dayProgress: DailyProgress | null;
}

export function HourlyTracker({ dayId, dayProgress }: HourlyTrackerProps) {
  const hours = dayProgress?.sessions || [];
  const totalHours = 8;

  const getHourStatus = (index: number) => {
    const session = hours[index];
    if (!session) return 'pending';
    return session.status;
  };

  const getHourLabel = (index: number) => {
    const startHour = 8 + index;
    const endHour = startHour + 1;
    return `${String(startHour).padStart(2, '0')}:00 - ${String(endHour).padStart(2, '0')}:00`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in_progress': return 'bg-blue-500 animate-pulse-soft';
      case 'skipped': return 'bg-yellow-500';
      default: return 'bg-gray-200 dark:bg-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return '✅ Selesai';
      case 'in_progress': return '🔄 Berjalan';
      case 'skipped': return '⏭️ Dilewati';
      default: return '⏳ Menunggu';
    }
  };

  const completedHours = hours.filter(h => h.status === 'completed').length;

  return (
    <Card variant="default" padding="lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900 dark:text-white">
          ⏰ Tracker per Jam
        </h3>
        <Badge variant="primary" size="sm">
          {completedHours}/{totalHours} jam selesai
        </Badge>
      </div>

      <div className="space-y-2">
        {Array.from({ length: totalHours }).map((_, index) => {
          const status = getHourStatus(index);
          const label = getHourLabel(index);
          const session = hours[index];
          const progress = session?.completionPercentage || 0;

          return (
            <div
              key={index}
              className={cn(
                'flex items-center gap-3 p-2 rounded-lg border-2 transition-all',
                status === 'completed' ? 'border-green-200 bg-green-50 dark:bg-green-950/30' :
                status === 'in_progress' ? 'border-blue-200 bg-blue-50 dark:bg-blue-950/30' :
                status === 'skipped' ? 'border-yellow-200 bg-yellow-50 dark:bg-yellow-950/30' :
                'border-gray-200 bg-gray-50 dark:bg-gray-900/50'
              )}
            >
              <div className="flex-shrink-0 w-24 text-sm font-medium text-gray-700 dark:text-gray-300">
                {label}
              </div>
              <div className="flex-1">
                <ProgressBar
                  value={progress}
                  max={100}
                  size="sm"
                  color={status === 'completed' ? 'green' : status === 'in_progress' ? 'blue' : 'yellow'}
                  showPercentage={false}
                />
              </div>
              <div className="flex-shrink-0">
                <Badge
                  variant={
                    status === 'completed' ? 'success' :
                    status === 'in_progress' ? 'primary' :
                    status === 'skipped' ? 'warning' : 'secondary'
                  }
                  size="xs"
                >
                  {getStatusLabel(status)}
                </Badge>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
