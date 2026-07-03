'use client';

import { useMemo } from 'react';
import { cn } from '@/lib/utils/helpers';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { AnalyticsData, AnalyticsTimeframe } from '@/lib/types/analytics.types';

interface ProductivityHeatmapProps {
  data: AnalyticsData['productivity'] | undefined;
  timeframe: AnalyticsTimeframe;
}

export function ProductivityHeatmap({ data, timeframe }: ProductivityHeatmapProps) {
  const heatmapData = useMemo(() => {
    if (!data) return [];

    // Generate 7x24 grid (days x hours)
    const grid: { day: string; hour: number; value: number }[] = [];

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const hours = Array.from({ length: 24 }, (_, i) => i);

    // Use peak productivity times as data source
    const peakTimes = data.peakProductivityTimes || [];

    days.forEach((day, dayIndex) => {
      hours.forEach((hour) => {
        const peak = peakTimes.find((p) => {
          const hourNum = parseInt(p.time.split(':')[0]);
          return hourNum === hour;
        });

        const value = peak ? peak.productivity : 0;
        grid.push({
          day,
          hour,
          value,
        });
      });
    });

    return grid;
  }, [data]);

  const getColor = (value: number) => {
    if (value === 0) return 'bg-gray-100 dark:bg-gray-800';
    if (value >= 80) return 'bg-green-500';
    if (value >= 60) return 'bg-blue-400';
    if (value >= 40) return 'bg-yellow-400';
    if (value >= 20) return 'bg-orange-300';
    return 'bg-red-300';
  };

  const getLabel = (value: number) => {
    if (value === 0) return '-';
    if (value >= 80) return '🔥';
    if (value >= 60) return '💪';
    if (value >= 40) return '📈';
    if (value >= 20) return '📊';
    return '⏳';
  };

  const hours = Array.from({ length: 24 }, (_, i) => i);

  if (heatmapData.length === 0) {
    return (
      <Card variant="default" padding="lg">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-4">🔥 Heatmap Produktivitas</h4>
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          Belum ada data produktivitas
        </div>
      </Card>
    );
  }

  return (
    <Card variant="default" padding="lg">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-gray-900 dark:text-white">🔥 Heatmap Produktivitas</h4>
            <Badge variant="secondary" size="sm">
        {timeframe === 'daily' ? 'Harian' : timeframe === 'weekly' ? 'Mingguan' : 'Bulanan'}
      </Badge>
    </div>

    <div className="overflow-x-auto">
      <div className="min-w-[600px]">
        <div className="grid grid-cols-25 gap-1">
          <div className="col-span-1" />
          {hours.map((hour) => (
            <div key={hour} className="text-center text-[10px] text-gray-400 font-medium">
              {hour}
            </div>
          ))}
        </div>

        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => {
          const dayData = heatmapData.filter((d) => d.day === day);
          return (
            <div key={day} className="grid grid-cols-25 gap-1 mt-1">
              <div className="text-[10px] text-gray-400 font-medium flex items-center">
                {day}
              </div>
              {dayData.map((item) => (
                <div
                  key={`${item.day}-${item.hour}`}
                  className={cn(
                    'w-full aspect-square rounded transition-all duration-200 hover:scale-110 hover:shadow-lg',
                    getColor(item.value),
                    'relative group'
                  )}
                >
                  <div className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    {getLabel(item.value)}
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>

    <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs">
      <div className="flex items-center gap-1">
        <span className="w-3 h-3 rounded bg-gray-100 dark:bg-gray-800" />
        <span className="text-gray-500">0%</span>
      </div>
      <div className="flex items-center gap-1">
        <span className="w-3 h-3 rounded bg-red-300" />
        <span className="text-gray-500">20%</span>
      </div>
      <div className="flex items-center gap-1">
        <span className="w-3 h-3 rounded bg-orange-300" />
        <span className="text-gray-500">40%</span>
      </div>
      <div className="flex items-center gap-1">
        <span className="w-3 h-3 rounded bg-yellow-400" />
        <span className="text-gray-500">60%</span>
      </div>
      <div className="flex items-center gap-1">
        <span className="w-3 h-3 rounded bg-blue-400" />
        <span className="text-gray-500">80%</span>
      </div>
      <div className="flex items-center gap-1">
        <span className="w-3 h-3 rounded bg-green-500" />
        <span className="text-gray-500">100%</span>
      </div>
    </div>

    {data?.peakProductivityTimes && data.peakProductivityTimes.length > 0 && (
      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
        <h5 className="text-xs font-medium text-blue-800 dark:text-blue-300 mb-1">
          ⚡ Waktu Produktivitas Puncak
        </h5>
        <div className="flex flex-wrap gap-2">
          {data.peakProductivityTimes.map((peak) => (
            <Badge key={peak.time} variant="primary" size="sm">
              {peak.time} • {Math.round(peak.productivity)}% produktif
            </Badge>
          ))}
        </div>
      </div>
    )}

    {data?.distractions && data.distractions.length > 0 && (
      <div className="mt-3 p-3 bg-red-50 dark:bg-red-950/30 rounded-lg">
        <h5 className="text-xs font-medium text-red-800 dark:text-red-300 mb-1">
          ⚠️ Distraksi Utama
        </h5>
        <div className="space-y-1">
          {data.distractions.slice(0, 3).map((distraction) => (
            <div key={distraction.source} className="flex items-center justify-between text-xs">
              <span className="text-red-600 dark:text-red-400">{distraction.source}</span>
              <span className="text-red-500">
                {distraction.frequency}x • {Math.round(distraction.productivityLoss)}% loss
              </span>
            </div>
          ))}
        </div>
      </div>
    )}
  </Card>
);
}

export default ProductivityHeatmap;
