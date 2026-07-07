'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils/helpers';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Tooltip } from '@/components/ui/Tooltip';

export interface WeekCardProps {
  week: number;
  month: number;
  title: string;
  description: string;
  status: 'completed' | 'in_progress' | 'not_started' | 'locked';
  progress: number;
  totalDays: number;
  completedDays: number;
  topics: string[];
  skills: string[];
  days?: {
    day: number;
    title: string;
    status: 'completed' | 'in_progress' | 'not_started';
  }[];
  className?: string;
  onClick?: () => void;
  compact?: boolean;
}

export function WeekCard({
  week,
  month,
  title,
  description,
  status,
  progress,
  totalDays,
  completedDays,
  topics,
  skills,
  days = [],
  className,
  onClick,
  compact = false,
}: WeekCardProps) {
  const statusColors = {
    completed: 'border-green-200 bg-green-50',
    in_progress: 'border-blue-200 bg-blue-50',
    not_started: 'border-gray-200 bg-gray-50',
    locked: 'border-gray-300 bg-gray-100',
  };

  const statusBadges = {
    completed: { label: '✅ Selesai', variant: 'success' },
    in_progress: { label: '🔄 Sedang Berjalan', variant: 'primary' },
    not_started: { label: '⏳ Belum Dimulai', variant: 'secondary' },
    locked: { label: '🔒 Terkunci', variant: 'secondary' },
  } as const;

  const weekColors = [
    'from-blue-400 to-blue-500',
    'from-cyan-400 to-cyan-500',
    'from-teal-400 to-teal-500',
    'from-emerald-400 to-emerald-500',
  ];

  const weekIcons = ['📅', '📆', '🗓️', '📋'];

  const gradientColor = weekColors[(week - 1) % weekColors.length];
  const iconEmoji = weekIcons[(week - 1) % weekIcons.length];

  if (compact) {
    return (
      <div
        className={cn(
          'rounded-xl border-2 p-3 transition-all cursor-pointer hover:shadow-md',
          statusColors[status],
          className
        )}
        onClick={onClick}
      >
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm',
              'bg-gradient-to-br',
              gradientColor
            )}
          >
            {iconEmoji}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-gray-900">
                Minggu {week}
              </span>
              <Badge variant={statusBadges[status].variant as any} size="xs">
                {statusBadges[status].label}
              </Badge>
            </div>
            <div className="text-xs text-gray-500 truncate">{title}</div>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-gray-700">
              {Math.round(progress)}%
            </div>
            <div className="text-xs text-gray-400">
              {completedDays}/{totalDays} hari
            </div>
          </div>
        </div>
        <ProgressBar
          value={progress}
          max={100}
          size="sm"
          color={status === 'completed' ? 'green' : 'blue'}
          showPercentage={false}
          className="mt-2"
        />
      </div>
    );
  }

  return (
    <Card
      variant={status === 'in_progress' ? 'elevated' : 'default'}
      padding="lg"
      hover={status !== 'locked' ? 'lift' : 'none'}
      className={cn(
        'transition-all cursor-pointer',
        status === 'locked' && 'opacity-60 cursor-not-allowed',
        className
      )}
      onClick={status !== 'locked' ? onClick : undefined}
    >
      <div className="flex flex-col md:flex-row gap-4">
        {/* Icon */}
        <div
          className={cn(
            'flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg',
            'bg-gradient-to-br',
            gradientColor
          )}
        >
          {iconEmoji}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h4 className="text-base font-bold text-gray-900">
              Minggu {week}: {title}
            </h4>
            <Badge variant={statusBadges[status].variant as any} size="sm">
              {statusBadges[status].label}
            </Badge>
          </div>

          <p className="text-sm text-gray-500 mt-1">{description}</p>

          {/* Topics */}
          <div className="flex flex-wrap gap-2 mt-3">
            {topics.map((topic) => (
              <Badge key={topic} variant="secondary" size="sm">
                {topic}
              </Badge>
            ))}
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-2 mt-2">
            {skills.map((skill) => (
              <Badge key={skill} variant="info" size="xs">
                {skill}
              </Badge>
            ))}
          </div>

          {/* Days */}
          {days.length > 0 && (
            <div className="mt-3 grid grid-cols-3 sm:grid-cols-7 gap-1">
              {days.map((day) => {
                const dayStatus = {
                  completed: 'bg-green-500 text-white',
                  in_progress: 'bg-blue-500 text-white',
                  not_started: 'bg-gray-200 text-gray-400',
                };
                return (
                  <Tooltip key={day.day} content={day.title} position="top">
                    <div
                      className={cn(
                        'text-center py-1 px-1 rounded-lg text-xs font-medium transition-colors',
                        dayStatus[day.status]
                      )}
                    >
                      H-{day.day}
                    </div>
                  </Tooltip>
                );
              })}
            </div>
          )}

          {/* Progress */}
          <div className="mt-3">
            <ProgressBar
              value={progress}
              max={100}
              size="md"
              color={status === 'completed' ? 'green' : 'blue'}
              showPercentage={false}
            />
          </div>
        </div>

        {/* Action */}
        <div className="flex-shrink-0 flex items-center">
          {status === 'completed' ? (
            <Button variant="outline" size="sm">
              📋 Review
            </Button>
          ) : status === 'in_progress' ? (
            <Button variant="primary" size="sm">
              Lanjutkan →
            </Button>
          ) : status === 'not_started' ? (
            <Button variant="primary" size="sm">
              Mulai →
            </Button>
          ) : (
            <Button variant="secondary" size="sm" disabled>
              🔒 Terkunci
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}

export default WeekCard;
