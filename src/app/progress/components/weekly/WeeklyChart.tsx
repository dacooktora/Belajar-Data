'use client';

import { useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { ProgressData } from '@/lib/types';
import { getDayId, getMonthFromDayId } from '@/lib/utils/helpers';
import { cn } from '@/lib/utils/helpers'; // ← TAMBAHKAN

interface WeeklyChartProps {
  week: number;
  progress: ProgressData | null;
}

export function WeeklyChart({ week, progress }: WeeklyChartProps) {
  const chartData = useMemo(() => {
    const month = Math.ceil(week / 4);
    const weekInMonth = ((week - 1) % 4) + 1;
    const startDay = (weekInMonth - 1) * 7 + 1 + (month - 1) * 30;
    const endDay = Math.min(startDay + 6, month * 30);

    const data = [];
    for (let d = startDay; d <= endDay; d++) {
      const dayProgress = progress?.daily[d];
      const hours = (dayProgress?.totalMinutesStudied || 0) / 60;
      const completion = dayProgress?.completionPercentage || 0;
      const status = dayProgress?.status || 'not_started';

      data.push({
        day: d,
        label: `H-${d}`,
        hours,
        completion,
        status,
        isComplete: status === 'completed',
      });
    }
    return data;
  }, [week, progress]);

  const maxHours = Math.max(...chartData.map((d: any) => d.hours), 1);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in_progress': return 'bg-blue-500';
      case 'reviewing': return 'bg-purple-500';
      case 'skipped': return 'bg-yellow-500';
      default: return 'bg-gray-300 dark:bg-gray-700';
    }
  };

  return (
    <Card variant="default" padding="lg">
      <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
        📊 Chart Mingguan
      </h3>

      <div className="space-y-3">
      {chartData.map((item: any) => (
          <div key={item.day} className="flex items-center gap-3">
            <div className="flex-shrink-0 w-12 text-xs text-gray-500 dark:text-gray-400">
              {item.label}
            </div>
            <div className="flex-1">
              <div className="relative h-6 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={cn(
                    'absolute inset-y-0 left-0 rounded-full transition-all duration-500',
                    getStatusColor(item.status)
                  )}
                  style={{ width: `${Math.min((item.hours / maxHours) * 100, 100)}%` }}
                />
                <div
                  className="absolute inset-y-0 left-0 flex items-center px-2 text-xs font-medium text-white"
                  style={{
                    width: `${Math.min((item.completion / 100) * 100, 100)}%`,
                    backgroundColor: 'rgba(0,0,0,0.2)',
                  }}
                />
              </div>
            </div>
            <div className="flex-shrink-0 w-16 text-right">
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                {item.hours.toFixed(1)}h
              </span>
            </div>
            <div className="flex-shrink-0 w-12 text-right">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {Math.round(item.completion)}%
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-3 justify-center text-xs text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-green-500" />
          <span>Selesai</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-blue-500" />
          <span>Berjalan</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-purple-500" />
          <span>Review</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-yellow-500" />
          <span>Dilewati</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-700" />
          <span>Belum</span>
        </div>
      </div>
    </Card>
  );
}
