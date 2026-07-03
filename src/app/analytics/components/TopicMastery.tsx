'use client';

import { useMemo } from 'react';
import { cn } from '@/lib/utils/helpers';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { AnalyticsData } from '@/lib/types/analytics.types';

interface TopicMasteryProps {
  data?: any;
}

export function TopicMastery({ data }: TopicMasteryProps) {
  const masteryData = useMemo(() => {
    if (!data) return [];

    return data.skills.map((skill) => ({
      name: skill.name,
      level: skill.level,
      percentage: skill.percentage || 0,
      status: skill.status || 'not_started',
      category: skill.category || 'other',
    }));
  }, [data]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'expert': return 'bg-purple-500';
      case 'advanced': return 'bg-blue-500';
      case 'intermediate': return 'bg-yellow-500';
      case 'learning': return 'bg-orange-500';
      default: return 'bg-gray-300 dark:bg-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'expert': return 'Expert';
      case 'advanced': return 'Mahir';
      case 'intermediate': return 'Menengah';
      case 'learning': return 'Belajar';
      default: return 'Belum';
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'expert': return 'success' as const;
      case 'advanced': return 'primary' as const;
      case 'intermediate': return 'warning' as const;
      case 'learning': return 'secondary' as const;
      default: return 'secondary' as const;
    }
  };

  if (masteryData.length === 0) {
    return (
      <Card variant="default" padding="lg">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-4">📚 Penguasaan Topik</h4>
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          Belum ada data penguasaan topik
        </div>
      </Card>
    );
  }

  return (
    <Card variant="default" padding="lg">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-gray-900 dark:text-white">📚 Penguasaan Topik</h4>
        <Badge variant="secondary" size="sm">
          {masteryData.filter(s => s.status !== 'not_started').length}/{masteryData.length} aktif
        </Badge>
      </div>

      <div className="space-y-4">
        {masteryData.map((skill) => (
          <div key={skill.name} className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  {skill.name}
                </span>
                <Badge
                  variant={getStatusBadgeVariant(skill.status)}
                  size="xs"
                >
                  {getStatusLabel(skill.status)}
                </Badge>
              </div>
              <span className="font-bold text-gray-900 dark:text-white">
                {Math.round(skill.percentage)}%
              </span>
            </div>
            <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className={cn(
                  'h-full rounded-full transition-all duration-500',
                  getStatusColor(skill.status)
                )}
                style={{ width: `${Math.min(skill.percentage, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {data?.overallMasteryLevel !== undefined && (
        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg text-center">
          <div className="text-sm text-gray-500 dark:text-gray-400">Rata-rata Penguasaan</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {data.overallMasteryLevel.toFixed(1)}%
          </div>
        </div>
      )}
    </Card>
  );
}
