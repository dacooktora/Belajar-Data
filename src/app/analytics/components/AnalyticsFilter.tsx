'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { AnalyticsTimeframe, AnalyticsMetricType } from '@/lib/types/analytics.types';

interface AnalyticsFilterProps {
  onFilterChange: (filters: {
    timeframe: AnalyticsTimeframe;
    metrics: AnalyticsMetricType[];
    startDate: string;
    endDate: string;
    minScore: number;
    maxScore: number;
  }) => void;
  initialFilters?: {
    timeframe?: AnalyticsTimeframe;
    metrics?: AnalyticsMetricType[];
    startDate?: string;
    endDate?: string;
    minScore?: number;
    maxScore?: number;
  };
}

export function AnalyticsFilter({ onFilterChange, initialFilters = {} }: AnalyticsFilterProps) {
  const [timeframe, setTimeframe] = useState<AnalyticsTimeframe>(initialFilters.timeframe || 'monthly');
  const [metrics, setMetrics] = useState<AnalyticsMetricType[]>(initialFilters.metrics || []);
  const [startDate, setStartDate] = useState(initialFilters.startDate || '');
  const [endDate, setEndDate] = useState(initialFilters.endDate || '');
  const [minScore, setMinScore] = useState(initialFilters.minScore || 0);
  const [maxScore, setMaxScore] = useState(initialFilters.maxScore || 100);

  const metricOptions = [
    { value: 'study_time', label: '⏰ Waktu Belajar' },
    { value: 'completion_rate', label: '✅ Completion Rate' },
    { value: 'quiz_score', label: '🧪 Quiz Score' },
    { value: 'productivity', label: '⚡ Produktivitas' },
    { value: 'consistency', label: '🔥 Konsistensi' },
    { value: 'mastery', label: '📚 Penguasaan' },
    { value: 'engagement', label: '📊 Engagement' },
    { value: 'retention', label: '💾 Retention' },
  ];

  const timeframeOptions = [
    { value: 'daily', label: '📅 Harian' },
    { value: 'weekly', label: '📆 Mingguan' },
    { value: 'monthly', label: '📊 Bulanan' },
    { value: 'quarterly', label: '📈 Kuartalan' },
    { value: 'yearly', label: '📉 Tahunan' },
    { value: 'custom', label: '📌 Kustom' },
  ];

  const handleMetricToggle = (metric: AnalyticsMetricType) => {
    setMetrics((prev) =>
      prev.includes(metric)
        ? prev.filter((m) => m !== metric)
        : [...prev, metric]
    );
  };

  const handleApply = () => {
    onFilterChange({
      timeframe,
      metrics,
      startDate,
      endDate,
      minScore,
      maxScore,
    });
  };

  const handleReset = () => {
    setTimeframe('monthly');
    setMetrics([]);
    setStartDate('');
    setEndDate('');
    setMinScore(0);
    setMaxScore(100);
    onFilterChange({
      timeframe: 'monthly',
      metrics: [],
      startDate: '',
      endDate: '',
      minScore: 0,
      maxScore: 100,
    });
  };

  const isCustomTimeframe = timeframe === 'custom';

  return (
    <Card variant="default" padding="lg">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-gray-900 dark:text-white">🔍 Filter Analytics</h4>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleReset}>
              ↺ Reset
            </Button>
            <Button variant="primary" size="sm" onClick={handleApply}>
              Terapkan
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Periode Waktu
            </label>
            <Select
              options={timeframeOptions}
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value as AnalyticsTimeframe)}
              className="w-full"
            />
          </div>
          {isCustomTimeframe && (
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Dari
                </label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Sampai
                </label>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Metrik yang Ditampilkan
          </label>
          <div className="flex flex-wrap gap-2">
            {metricOptions.map((option) => {
              const isSelected = metrics.includes(option.value as AnalyticsMetricType);
              return (
                <button
                  key={option.value}
                  onClick={() => handleMetricToggle(option.value as AnalyticsMetricType)}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-sm font-medium transition-all border-2',
                    isSelected
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 text-gray-600 dark:text-gray-400'
                  )}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
          {metrics.length === 0 && (
            <p className="text-xs text-gray-400 mt-1">Pilih setidaknya satu metrik</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nilai Minimum
            </label>
            <Input
              type="number"
              min={0}
              max={100}
              value={minScore}
              onChange={(e) => setMinScore(parseInt(e.target.value) || 0)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nilai Maksimum
            </label>
            <Input
              type="number"
              min={0}
              max={100}
              value={maxScore}
              onChange={(e) => setMaxScore(parseInt(e.target.value) || 100)}
            />
          </div>
        </div>

        {metrics.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
            <span className="text-xs text-gray-500 dark:text-gray-400">Filter aktif:</span>
            {metrics.map((metric) => {
              const option = metricOptions.find((m) => m.value === metric);
              return (
                <Badge
                  key={metric}
                  variant="primary"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  {option?.label || metric}
                  <button
                    onClick={() => handleMetricToggle(metric)}
                    className="ml-1 hover:text-red-500"
                  >
                    ✕
                  </button>
                </Badge>
              );
            })}
            {minScore > 0 || maxScore < 100 ? (
              <Badge variant="secondary" size="sm">
                Score: {minScore}% - {maxScore}%
              </Badge>
            ) : null}
          </div>
        )}
      </div>
    </Card>
  );
}
