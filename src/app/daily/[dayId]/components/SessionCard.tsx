'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils/helpers';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Tooltip } from '@/components/ui/Tooltip';

interface SessionCardProps {
  sessionNumber: number;
  title: string;
  description: string;
  time: string;
  duration: number;
  status: 'pending' | 'in_progress' | 'completed' | 'skipped';
  type: 'learning' | 'break' | 'review' | 'quiz' | 'practice' | 'assignment';
  topics: string[];
  resources?: {
    videos: number;
    articles: number;
    practices: number;
  };
  progress?: number;
  isBreak?: boolean;
  breakActivity?: string;
  className?: string;
  onClick?: () => void;
  compact?: boolean;
}

export function SessionCard({
  sessionNumber,
  title,
  description,
  time,
  duration,
  status,
  type,
  topics,
  resources,
  progress = 0,
  isBreak = false,
  breakActivity,
  className,
  onClick,
  compact = false,
}: SessionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const statusColors = {
    pending: 'border-gray-200 bg-gray-50',
    in_progress: 'border-blue-200 bg-blue-50',
    completed: 'border-green-200 bg-green-50',
    skipped: 'border-yellow-200 bg-yellow-50',
  };

  const statusBadges = {
    pending: { label: '⏳ Menunggu', variant: 'secondary' },
    in_progress: { label: '🔄 Berlangsung', variant: 'primary' },
    completed: { label: '✅ Selesai', variant: 'success' },
    skipped: { label: '⏭️ Dilewati', variant: 'warning' },
  } as const;

  const typeIcons = {
    learning: '📖',
    break: '☕',
    review: '📝',
    quiz: '🧪',
    practice: '💻',
    assignment: '📋',
  };

  const typeColors = {
    learning: 'from-blue-400 to-blue-500',
    break: 'from-green-400 to-green-500',
    review: 'from-yellow-400 to-yellow-500',
    quiz: 'from-purple-400 to-purple-500',
    practice: 'from-orange-400 to-orange-500',
    assignment: 'from-red-400 to-red-500',
  };

  const typeLabels = {
    learning: 'Belajar',
    break: 'Istirahat',
    review: 'Review',
    quiz: 'Quiz',
    practice: 'Praktik',
    assignment: 'Tugas',
  };

  const icon = typeIcons[type] || '📌';
  const color = typeColors[type] || 'from-gray-400 to-gray-500';
  const typeLabel = typeLabels[type] || type;

  const isCompleted = status === 'completed';
  const isInProgress = status === 'in_progress';

  if (isBreak) {
    return (
      <Card
        variant="default"
        padding="md"
        className={cn(
          'border-l-4 border-l-green-400 bg-green-50/50',
          className
        )}
      >
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-xl">
            ☕
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900">Istirahat</span>
              <Badge variant="secondary" size="xs">{time}</Badge>
              <Badge variant="secondary" size="xs">{duration} menit</Badge>
            </div>
            {breakActivity && (
              <p className="text-sm text-gray-500 mt-0.5">{breakActivity}</p>
            )}
          </div>
        </div>
      </Card>
    );
  }

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
              color
            )}
          >
            {icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-gray-900 truncate">
                Sesi {sessionNumber}
              </span>
              <Badge variant={statusBadges[status].variant as any} size="xs">
                {statusBadges[status].label}
              </Badge>
            </div>
            <div className="text-xs text-gray-500 truncate">{title}</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-400">{time}</div>
            <div className="text-xs text-gray-400">{duration}m</div>
          </div>
        </div>
        {status === 'in_progress' && (
          <ProgressBar
            value={progress}
            max={100}
            size="sm"
            color="blue"
            showPercentage={false}
            className="mt-2"
          />
        )}
      </div>
    );
  }

  return (
    <Card
      variant={isInProgress ? 'elevated' : 'default'}
      padding="md"
      hover={status !== 'skipped' ? 'lift' : 'none'}
      className={cn(
        'transition-all cursor-pointer',
        statusColors[status],
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            'flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-md',
            'bg-gradient-to-br',
            color
          )}
        >
          {icon}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h4 className="font-semibold text-gray-900">
              Sesi {sessionNumber}: {title}
            </h4>
            <Badge variant={statusBadges[status].variant as any} size="sm">
              {statusBadges[status].label}
            </Badge>
            <Badge variant="secondary" size="xs">{typeLabel}</Badge>
          </div>

          <p className="text-sm text-gray-500 mt-1">{description}</p>

          <div className="flex flex-wrap gap-2 mt-2">
            {topics.map((topic) => (
              <Badge key={topic} variant="secondary" size="xs">
                {topic}
              </Badge>
            ))}
          </div>

          {resources && (
            <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
              {resources.videos > 0 && (
                <span>🎬 {resources.videos} video</span>
              )}
              {resources.articles > 0 && (
                <span>📄 {resources.articles} artikel</span>
              )}
              {resources.practices > 0 && (
                <span>💻 {resources.practices} praktik</span>
              )}
            </div>
          )}

          {isInProgress && (
            <div className="mt-3">
              <ProgressBar
                value={progress}
                max={100}
                size="sm"
                color="blue"
                showPercentage={false}
              />
            </div>
          )}

          <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
            <span>⏰ {time}</span>
            <span>⏱️ {duration} menit</span>
          </div>
        </div>

        <div className="flex-shrink-0 flex items-center">
          {isCompleted ? (
            <Tooltip content="Review sesi ini">
              <Button variant="ghost" size="sm">
                📋
              </Button>
            </Tooltip>
          ) : isInProgress ? (
            <Button variant="primary" size="sm">
              Lanjutkan →
            </Button>
          ) : status === 'pending' ? (
            <Button variant="primary" size="sm">
              Mulai →
            </Button>
          ) : (
            <Button variant="secondary" size="sm" disabled>
              ⏭️ Dilewati
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
