'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils/helpers';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';

export interface SubtopicCardProps {
  id: string;
  name: string;
  content: string;
  status: 'not_started' | 'viewed' | 'studied' | 'understood' | 'needs_review' | 'mastered';
  estimatedTime: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  keywords: string[];
  examples?: {
    title: string;
    description: string;
  }[];
  isCompleted: boolean;
  onToggleComplete?: (id: string, completed: boolean) => void;
  onExpand?: (id: string) => void;
  className?: string;
  compact?: boolean;
}

export function SubtopicCard({
  id,
  name,
  content,
  status,
  estimatedTime,
  difficulty,
  keywords,
  examples = [],
  isCompleted,
  onToggleComplete,
  onExpand,
  className,
  compact = false,
}: SubtopicCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const statusColors = {
    not_started: 'border-gray-200 bg-gray-50',
    viewed: 'border-blue-100 bg-blue-50',
    studied: 'border-blue-200 bg-blue-50',
    understood: 'border-green-200 bg-green-50',
    needs_review: 'border-yellow-200 bg-yellow-50',
    mastered: 'border-purple-200 bg-purple-50',
  };

  const statusLabels = {
    not_started: '⏳ Belum',
    viewed: '👀 Dilihat',
    studied: '📖 Dipelajari',
    understood: '✅ Dipahami',
    needs_review: '🔄 Perlu Ulang',
    mastered: '🏆 Dikuasai',
  };

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

  const handleToggle = () => {
    onToggleComplete?.(id, !isCompleted);
  };

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
    onExpand?.(id);
  };

  if (compact) {
    return (
      <div
        className={cn(
          'rounded-lg border-2 p-3 transition-all',
          statusColors[status],
          className
        )}
      >
        <div className="flex items-center gap-3">
          <Checkbox
            checked={isCompleted}
            onChange={handleToggle}
            className="flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-medium text-sm text-gray-900 truncate">
                {name}
              </span>
              <Badge
                variant="secondary"
                size="xs"
                className={difficultyColors[difficulty]}
              >
                {difficultyLabels[difficulty]}
              </Badge>
            </div>
            <div className="text-xs text-gray-400">
              ⏱️ {estimatedTime} menit • {statusLabels[status]}
            </div>
          </div>
          <Button
            variant="ghost"
            size="xs"
            onClick={handleExpand}
            aria-label="Expand"
          >
            <svg
              className={cn(
                'w-4 h-4 transition-transform',
                isExpanded && 'rotate-180'
              )}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Card
      variant="default"
      padding="md"
      className={cn(
        'transition-all border-l-4',
        isCompleted ? 'border-l-green-500' : 'border-l-blue-500',
        statusColors[status],
        className
      )}
    >
      <div className="flex items-start gap-3">
        <Checkbox
          checked={isCompleted}
          onChange={handleToggle}
          className="flex-shrink-0 mt-1"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h4 className="font-semibold text-gray-900">{name}</h4>
            <Badge
              variant="secondary"
              size="sm"
              className={difficultyColors[difficulty]}
            >
              {difficultyLabels[difficulty]}
            </Badge>
            <Badge variant="secondary" size="xs">
              {statusLabels[status]}
            </Badge>
          </div>

          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{content}</p>

          {/* Keywords */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            {keywords.map((keyword) => (
              <Badge key={keyword} variant="secondary" size="xs">
                #{keyword}
              </Badge>
            ))}
          </div>

          {/* Examples */}
          {isExpanded && examples.length > 0 && (
            <div className="mt-3 p-3 bg-gray-50 rounded-lg">
              <h5 className="text-sm font-medium text-gray-700 mb-2">📌 Contoh</h5>
              {examples.map((example, idx) => (
                <div key={idx} className="mb-2 last:mb-0">
                  <div className="text-sm font-medium text-gray-700">
                    {example.title}
                  </div>
                  <div className="text-sm text-gray-500">
                    {example.description}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
            <span>⏱️ {estimatedTime} menit</span>
            <button
              onClick={handleExpand}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              {isExpanded ? 'Sembunyikan' : 'Lihat detail'}
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default SubtopicCard;
