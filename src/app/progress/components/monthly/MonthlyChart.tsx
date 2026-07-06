'use client';

import { useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { ProgressData } from '@/lib/types';
import { cn } from '@/lib/utils/helpers';

interface MonthlyChartProps {
  month: number;
  progress: ProgressData | null;
}

export function MonthlyChart({ month, progress }: MonthlyChartProps) {
  const chartData = useMemo(() => {
    const startDay = (month - 1) * 30 + 1;
    const endDay = month * 30;

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
  }, [month, progress]);

  const maxHours = Math.max(...chartData.map(d => d.hours), 1);
  const weeks = [];
  for (let i = 0; i < chartData.length; i += 7) {
    weeks.push(chartData.slice(i, i + 7));
  }

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
        📊 Chart Harian - Bulan {month}
      </h3>

      <div className="space-y-4">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex}>
            <div className="text-xs text-gray-400 mb-1">Minggu {weekIndex + 1}</div>
            {week.map((item) => (
              <div key={item.day} className="flex items-center gap-2 py-0.5">
                <div className="flex-shrink-0 w-10 text-xs text-gray-500 dark:text-gray-400">
                  {item.label}
                </div>
                <div className="flex-1 h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={cn(
                      'h-full rounded-full transition-all duration-500',
                      getStatusColor(item.status)
                    )}
                    style={{ width: `${Math.min((item.hours / maxHours) * 100, 100)}%` }}
                  />
                </div>
                <div className="flex-shrink-0 w-16 text-right">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {item.hours.toFixed(1)}h
                  </span>
                </div>
              </div>
            ))}
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
