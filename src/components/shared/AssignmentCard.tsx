'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils/helpers';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';

export interface AssignmentCardProps {
  id: string;
  title: string;
  description: string;
  status: 'not_started' | 'draft' | 'submitted' | 'reviewed' | 'revised' | 'accepted' | 'rejected' | 'resubmitted';
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  deadline: string;
  estimatedTime: string;
  deliverables: string[];
  skills: string[];
  tools: string[];
  score?: number;
  feedback?: string;
  submissionDate?: string;
  className?: string;
  onStart?: () => void;
  onSubmit?: () => void;
  onReview?: () => void;
  compact?: boolean;
}

export function AssignmentCard({
  id,
  title,
  description,
  status,
  difficulty,
  deadline,
  estimatedTime,
  deliverables,
  skills,
  tools,
  score,
  feedback,
  submissionDate,
  className,
  onStart,
  onSubmit,
  onReview,
  compact = false,
}: AssignmentCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const statusColors = {
    not_started: 'border-gray-200 bg-gray-50',
    draft: 'border-yellow-200 bg-yellow-50',
    submitted: 'border-blue-200 bg-blue-50',
    reviewed: 'border-purple-200 bg-purple-50',
    revised: 'border-orange-200 bg-orange-50',
    accepted: 'border-green-200 bg-green-50',
    rejected: 'border-red-200 bg-red-50',
    resubmitted: 'border-cyan-200 bg-cyan-50',
  };

  const statusBadges = {
    not_started: { label: '⏳ Belum Dikerjakan', variant: 'secondary' },
    draft: { label: '📝 Draft', variant: 'warning' },
    submitted: { label: '📤 Dikirim', variant: 'primary' },
    reviewed: { label: '👀 Sedang Ditinjau', variant: 'info' },
    revised: { label: '🔄 Revisi', variant: 'warning' },
    accepted: { label: '✅ Diterima', variant: 'success' },
    rejected: { label: '❌ Ditolak', variant: 'danger' },
    resubmitted: { label: '📤 Dikirim Ulang', variant: 'cyan' },
  } as const;

  const difficultyColors = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-orange-100 text-orange-800',
    expert: 'bg-red-100 text-red-800',
  };

  const difficultyLabels = {
    beginner: 'Pemula',
    intermediate: 'Menengah',
    advanced: 'Lanjutan',
    expert: 'Expert',
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const canSubmit = status === 'draft' || status === 'not_started' || status === 'revised';
  const isAccepted = status === 'accepted';
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
            <div className="text-xs text-gray-500 truncate">{description}</div>
          </div>
          {score !== undefined && (
            <div className="text-right">
              <div className={cn(
                'text-sm font-bold',
                getScoreColor(score)
              )}>
                {score}%
              </div>
              <div className="text-xs text-gray-400">Nilai</div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <Card
      variant="default"
      padding="lg"
      className={cn(
        'transition-all border-l-4',
        isAccepted ? 'border-l-green-500' :
        isRejected ? 'border-l-red-500' :
        status === 'submitted' ? 'border-l-blue-500' :
        status === 'reviewed' ? 'border-l-purple-500' :
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
            isAccepted ? 'bg-green-500' :
            isRejected ? 'bg-red-500' :
            status === 'submitted' ? 'bg-blue-500' :
            'bg-gradient-to-br from-orange-500 to-red-500'
          )}
        >
          {isAccepted ? '🎉' : isRejected ? '😞' : status === 'submitted' ? '📤' : '📋'}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h4 className="text-base font-bold text-gray-900">{title}</h4>
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

          <p className="text-sm text-gray-500 mt-1">{description}</p>

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
              <div className="text-xs text-gray-400">Deadline</div>
              <div className="text-sm font-semibold text-gray-700">
                {deadline}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-400">Estimasi Waktu</div>
              <div className="text-sm font-semibold text-gray-700">
                {estimatedTime}
              </div>
            </div>
            {submissionDate && (
              <div>
                <div className="text-xs text-gray-400">Dikirim</div>
                <div className="text-sm font-semibold text-gray-700">
                  {submissionDate}
                </div>
              </div>
            )}
          </div>

          {/* Score & Feedback */}
          {score !== undefined && (
            <div className="mt-3 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Nilai:</span>
                <span className={cn(
                  'text-xl font-bold',
                  getScoreColor(score)
                )}>
                  {score}%
                </span>
                <span className="text-sm text-gray-500">
                  {score >= 80 ? '🌟 Luar Biasa!' :
                   score >= 60 ? '👍 Bagus!' :
                   '📚 Perlu Belajar Lagi'}
                </span>
              </div>
              <ProgressBar
                value={score}
                max={100}
                size="sm"
                color={score >= 80 ? 'green' : score >= 60 ? 'yellow' : 'red'}
                showPercentage={false}
                className="mt-1"
              />
              {feedback && (
                <div className="mt-2 p-2 bg-white rounded border border-gray-200">
                  <span className="text-xs font-medium text-gray-500">Feedback:</span>
                  <p className="text-sm text-gray-700 mt-0.5">{feedback}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action */}
        <div className="flex-shrink-0 flex flex-col gap-2">
          {isAccepted ? (
            <Button variant="outline" size="sm" onClick={onReview}>
              📋 Lihat Hasil
            </Button>
          ) : canSubmit ? (
            <Button variant="primary" size="sm" onClick={onSubmit}>
              {status === 'revised' ? '📤 Kirim Ulang' : '📤 Submit'}
            </Button>
          ) : status === 'submitted' ? (
            <Button variant="secondary" size="sm" disabled>
              ⏳ Menunggu Penilaian
            </Button>
          ) : status === 'reviewed' ? (
            <Button variant="primary" size="sm" onClick={onReview}>
              👀 Lihat Review
            </Button>
          ) : isRejected ? (
            <Button variant="primary" size="sm" onClick={onSubmit}>
              🔄 Revisi
            </Button>
          ) : null}
          {status !== 'not_started' && status !== 'submitted' && (
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

export default AssignmentCard;
