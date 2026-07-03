'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils/helpers';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';

export interface ProjectCardProps {
  id: number;
  title: string;
  description: string;
  month: number;
  status: 'not_started' | 'planning' | 'in_progress' | 'reviewing' | 'submitted' | 'approved' | 'rejected' | 'revision_needed';
  skills: string[];
  tools: string[];
  deliverables: string[];
  estimatedTime: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  progress?: number;
  score?: number;
  feedback?: string;
  className?: string;
  onStart?: (id: number) => void;
  onContinue?: (id: number) => void;
  onReview?: (id: number) => void;
  compact?: boolean;
}

export function ProjectCard({
  id,
  title,
  description,
  month,
  status,
  skills,
  tools,
  deliverables,
  estimatedTime,
  difficulty,
  progress = 0,
  score,
  feedback,
  className,
  onStart,
  onContinue,
  onReview,
  compact = false,
}: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const statusColors = {
    not_started: 'border-gray-200 bg-gray-50',
    planning: 'border-yellow-200 bg-yellow-50',
    in_progress: 'border-blue-200 bg-blue-50',
    reviewing: 'border-purple-200 bg-purple-50',
    submitted: 'border-cyan-200 bg-cyan-50',
    approved: 'border-green-200 bg-green-50',
    rejected: 'border-red-200 bg-red-50',
    revision_needed: 'border-orange-200 bg-orange-50',
  };

  const statusBadges = {
    not_started: { label: '⏳ Belum Dimulai', variant: 'secondary' },
    planning: { label: '📝 Perencanaan', variant: 'warning' },
    in_progress: { label: '🔄 Sedang Dikerjakan', variant: 'primary' },
    reviewing: { label: '👀 Sedang Ditinjau', variant: 'info' },
    submitted: { label: '📤 Dikirim', variant: 'cyan' },
    approved: { label: '✅ Disetujui', variant: 'success' },
    rejected: { label: '❌ Ditolak', variant: 'danger' },
    revision_needed: { label: '🔄 Revisi', variant: 'warning' },
  } as const;

  const difficultyColors = {
    easy: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    hard: 'bg-orange-100 text-orange-800',
    expert: 'bg-red-100 text-red-800',
  };

  const difficultyLabels = {
    easy: 'Mudah',
    medium: 'Sedang',
    hard: 'Sulit',
    expert: 'Expert',
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const canStart = status === 'not_started';
  const canContinue = status === 'planning' || status === 'in_progress' || status === 'revision_needed';
  const canReview = status === 'reviewing' || status === 'submitted';
  const isApproved = status === 'approved';
  const isRejected = status === 'rejected';

  if (compact) {
    return (
      <div
        className={cn(
          'rounded-xl border-2 p-3 transition-all cursor-pointer hover:shadow-md',
          statusColors[status],
          className
        )}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-gray-900 truncate">
                {title}
              </span>
              <Badge variant={statusBadges[status].variant as any} size="xs">
                {statusBadges[status].label}
              </Badge>
            </div>
            <div className="text-xs text-gray-500 truncate">
              Bulan {month} • {estimatedTime}
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-gray-700">
              {Math.round(progress)}%
            </div>
            <div className="text-xs text-gray-400">Progress</div>
          </div>
        </div>
        <ProgressBar
          value={progress}
          max={100}
          size="sm"
          color={isApproved ? 'green' : status === 'rejected' ? 'red' : 'blue'}
          showPercentage={false}
          className="mt-2"
        />
      </div>
    );
  }

  return (
    <Card
      variant="default"
      padding="lg"
      className={cn(
        'transition-all border-l-4',
        isApproved ? 'border-l-green-500' :
        isRejected ? 'border-l-red-500' :
        status === 'in_progress' ? 'border-l-blue-500' :
        'border-l-gray-300',
        statusColors[status],
        className
      )}
    >
      <div className="flex flex-col md:flex-row gap-4">
        {/* Icon */}
        <div
          className={cn(
            'flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg',
            isApproved ? 'bg-green-500' :
            isRejected ? 'bg-red-500' :
            status === 'in_progress' ? 'bg-blue-500' :
            'bg-gradient-to-br from-purple-500 to-pink-500'
          )}
        >
          {isApproved ? '🎉' : isRejected ? '😞' : status === 'in_progress' ? '🔄' : '📊'}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h4 className="text-base font-bold text-gray-900">{title}</h4>
            <Badge variant="secondary" size="sm">Bulan {month}</Badge>
            <Badge variant={statusBadges[status].variant as any} size="sm">
              {statusBadges[status].label}
            </Badge>
            <Badge
              variant="secondary"
              size="sm"
              className={difficultyColors[difficulty]}
            >
              {difficultyLabels[difficulty]}
            </Badge>
          </div>

          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{description}</p>

          {/* Skills & Tools */}
          <div className="flex flex-wrap gap-2 mt-3">
            {skills.map((skill) => (
              <Badge key={skill} variant="secondary" size="sm">
                {skill}
              </Badge>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mt-1">
            {tools.map((tool) => (
              <Badge key={tool} variant="primary" size="xs">
                {tool}
              </Badge>
            ))}
          </div>

          {/* Deliverables */}
          <div className="mt-3">
            <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
              Deliverables
            </h5>
            <div className="flex flex-wrap gap-2">
              {deliverables.map((item) => (
                <Badge key={item} variant="outline" size="sm">
                  {item}
                </Badge>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-3">
            <div>
              <div className="text-xs text-gray-400">Estimasi Waktu</div>
              <div className="text-sm font-semibold text-gray-700">
                {estimatedTime}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-400">Progress</div>
              <div className="text-sm font-semibold text-gray-700">
                {Math.round(progress)}%
              </div>
            </div>
            {score !== undefined && (
              <div>
                <div className="text-xs text-gray-400">Nilai</div>
                <div className={cn(
                  'text-sm font-semibold',
                  getScoreColor(score)
                )}>
                  {score}%
                </div>
              </div>
            )}
          </div>

          {/* Progress */}
          <div className="mt-3">
            <ProgressBar
              value={progress}
              max={100}
              size="md"
              color={isApproved ? 'green' : status === 'rejected' ? 'red' : 'blue'}
              showPercentage={false}
            />
          </div>

          {/* Feedback */}
          {feedback && (
            <div className="mt-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-xs font-medium text-gray-500">Feedback:</span>
              <p className="text-sm text-gray-700 mt-0.5">{feedback}</p>
            </div>
          )}
        </div>

        {/* Action */}
        <div className="flex-shrink-0 flex flex-col gap-2">
          {isApproved ? (
            <Button variant="outline" size="sm" onClick={() => onReview?.(id)}>
              📋 Lihat Hasil
            </Button>
          ) : canStart ? (
            <Button variant="primary" size="sm" onClick={() => onStart?.(id)}>
              🚀 Mulai Project
            </Button>
          ) : canContinue ? (
            <Button variant="primary" size="sm" onClick={() => onContinue?.(id)}>
              ▶️ Lanjutkan
            </Button>
          ) : canReview ? (
            <Button variant="primary" size="sm" onClick={() => onReview?.(id)}>
              👀 Lihat Review
            </Button>
          ) : isRejected ? (
            <Button variant="primary" size="sm" onClick={() => onContinue?.(id)}>
              🔄 Revisi
            </Button>
          ) : null}
          {(status === 'in_progress' || status === 'planning') && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Sembunyikan' : 'Detail'}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}

export default ProjectCard;
