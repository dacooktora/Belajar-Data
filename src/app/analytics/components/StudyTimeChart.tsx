'use client';

import { useMemo } from 'react';
import { cn } from '@/lib/utils/helpers';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { AnalyticsTimeframe } from '@/lib/types/analytics.types';
import type { AnalyticsData } from '@/lib/hooks/useAnalytics';

interface StudyTimeChartProps {
  data: AnalyticsData['studyTime'] | undefined;
  timeframe: AnalyticsTimeframe;
  detailed?: boolean;
}

export function StudyTimeChart({ data, timeframe, detailed = false }: StudyTimeChartProps) {
  const chartData = useMemo(() => {
    if (!data) return [];

    switch (timeframe) {
      case 'daily':
  return data.dailyDistribution.map((d) => ({
    label: d.day,
    value: d.hours,
    percentage: d.percentage,
    trend: 'stable', 
  }));
      case 'weekly':
        return data.weeklyDistribution.map((w) => ({
          label: `Minggu ${w.week}`,
          value: w.hours,
          percentage: w.percentage,
          trend: w.trend,
        }));
      case 'monthly':
        return data.monthlyDistribution.map((m) => ({
          label: `Bulan ${m.month}`,
          value: m.hours,
          percentage: m.percentage,
          trend: m.trend,
        }));
      default:
        return data.monthlyDistribution.map((m) => ({
          label: `Bulan ${m.month}`,
          value: m.hours,
          percentage: m.percentage,
          trend: m.trend,
        }));
    }
  }, [data, timeframe]);

  const maxValue = Math.max(...chartData.map((d) => d.value), 1);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '↑';
      case 'down': return '↓';
      default: return '→';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-500';
      case 'down': return 'text-red-500';
      default: return 'text-gray-400';
    }
  };

  if (!data || chartData.length === 0) {
    return (
      <Card variant="default" padding="lg">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-4">⏰ Waktu Belajar</h4>
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          Belum ada data waktu belajar
        </div>
      </Card>
    );
  }

  return (
    <Card variant="default" padding="lg">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-gray-900 dark:text-white">⏰ Waktu Belajar</h4>
        <Badge variant="secondary" size="sm">
          Total: {data.totalHours.toFixed(1)} jam
        </Badge>
      </div>

      <div className="space-y-3">
        {chartData.map((item, index) => (
          <div key={index} className="group">
            <div className="flex items-center justify-between text-sm mb-0.5">
              <span className="text-gray-600 dark:text-gray-400">{item.label}</span>
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-900 dark:text-white">
                  {item.value.toFixed(1)} jam
                </span>
                {item.trend && (
                  <span className={cn('text-xs', getTrendColor(item.trend))}>
                    {getTrendIcon(item.trend)}
                  </span>
                )}
                {detailed && (
                  <span className="text-xs text-gray-400">
                    ({item.percentage.toFixed(1)}%)
                  </span>
                )}
              </div>
            </div>
            <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-700 group-hover:brightness-110"
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {data.averageDailyHours !== undefined && detailed && (
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div className="text-xs text-gray-500 dark:text-gray-400">Rata-rata Harian</div>
            <div className="font-bold text-gray-900 dark:text-white">
              {data.averageDailyHours.toFixed(1)} jam
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-500 dark:text-gray-400">Maksimal Harian</div>
            <div className="font-bold text-gray-900 dark:text-white">
              {data.maxDailyHours.toFixed(1)} jam
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-500 dark:text-gray-400">Median</div>
            <div className="font-bold text-gray-900 dark:text-white">
              {data.medianDailyHours.toFixed(1)} jam
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-500 dark:text-gray-400">Konsistensi</div>
            <div className="font-bold text-gray-900 dark:text-white">
              {data.consistencyScore.toFixed(1)}%
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
