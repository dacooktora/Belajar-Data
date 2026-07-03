'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils/helpers';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';

export interface DayCardProps {
  day: number;
  month: number;
  week: number;
  title: string;
  subtitle?: string;
  status: 'completed' | 'in_progress' | 'not_started' | 'locked' | 'skipped';
  progress: number;
  totalSessions: number;
  completedSessions: number;
  totalHours: number;
  completedHours: number;
  topics: string[];
  quizScore?: number;
  assignmentStatus?: 'not_started' | 'in_progress' | 'submitted' | 'reviewed' | 'accepted' | 'rejected';
  date?: string;
  className?: string;
  onClick?: () => void;
  compact?: boolean;
}

export function DayCard({
  day,
  month,
  week,
  title,
  subtitle,
  status,
  progress,
  totalSessions,
  completedSessions,
  totalHours,
  completedHours,
  topics,
  quizScore,
  assignmentStatus,
  date,
  className,
  onClick,
  compact = false,
}: DayCardProps) {
  const statusColors = {
    completed: 'border-green-200 bg-green-50',
    in_progress: 'border-blue-200 bg-blue-50',
    not_started: 'border-gray-200 bg-gray-50',
    locked: 'border-gray-300 bg-gray-100',
    skipped: 'border-yellow-200 bg-yellow-50',
  };

  const statusBadges = {
    completed: { label: '✅ Selesai', variant: 'success' },
    in_progress: { label: '🔄 Sedang Berjalan', variant: 'primary' },
    not_started: { label: '⏳ Belum Dimulai', variant: 'secondary' },
    locked: { label: '🔒 Terkunci', variant: 'secondary' },
    skipped: { label: '⏭️ Dilewati', variant: 'warning' },
  } as const;

  const assignmentStatusBadges = {
    not_started: { label: '📝 Belum', variant: 'secondary' },
    in_progress: { label: '✍️ Dikerjakan', variant: 'primary' },
    submitted: { label: '📤 Dikirim', variant: 'info' },
    reviewed: { label: '👀 Ditinjau', variant: 'warning' },
    accepted: { label: '✅ Diterima', variant: 'success' },
    rejected: { label: '❌ Ditolak', variant: 'danger' },
  } as const;

  const getQuizScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

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
          <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
            {day}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-gray-900 truncate">
                Hari {day}
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
        {/* Day Number */}
        <div
          className={cn(
            'flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold shadow-lg',
            'bg-gradient-to-br from-blue-500 to-purple-500 text-white'
          )}
        >
          {day}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h4 className="text-base font-bold text-gray-900">
              Hari {day}: {title}
            </h4>
            <Badge variant={statusBadges[status].variant as any} size="sm">
              {statusBadges[status].label}
            </Badge>
            {date && (
              <span className="text-xs text-gray-400">{date}</span>
            )}
          </div>

          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          )}

          {/* Topics */}
          <div className="flex flex-wrap gap-2 mt-3">
            {topics.map((topic) => (
              <Badge key={topic} variant="secondary" size="sm">
                {topic}
              </Badge>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-3">
            <div>
              <div className="text-xs text-gray-400">Progress</div>
              <div className="text-sm font-semibold text-gray-700">
                {Math.round(progress)}%
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-400">Sesi</div>
              <div className="text-sm font-semibold text-gray-700">
                {completedSessions}/{totalSessions}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-400">Jam Belajar</div>
              <div className="text-sm font-semibold text-gray-700">
                {completedHours}/{totalHours} jam
              </div>
            </div>
            {quizScore !== undefined && (
              <div>
                <div className="text-xs text-gray-400">Quiz Score</div>
                <div className={cn(
                  'text-sm font-semibold',
                  getQuizScoreColor(quizScore)
                )}>
                  {quizScore}%
                </div>
              </div>
            )}
          </div>

          {/* Assignment Status */}
          {assignmentStatus && (
            <div className="mt-2">
              <Badge
                variant={assignmentStatusBadges[assignmentStatus].variant as any}
                size="sm"
              >
                {assignmentStatusBadges[assignmentStatus].label}
              </Badge>
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

export default DayCard;
