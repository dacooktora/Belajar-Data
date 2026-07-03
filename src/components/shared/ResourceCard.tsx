'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils/helpers';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export interface ResourceCardProps {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'video' | 'article' | 'documentation' | 'interactive' | 'dataset';
  platform: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  duration?: string;
  channel?: string;
  readTime?: number;
  isRequired: boolean;
  tags: string[];
  language?: string;
  className?: string;
  onMarkComplete?: (id: string) => void;
  isCompleted?: boolean;
  compact?: boolean;
}

export function ResourceCard({
  id,
  title,
  description,
  url,
  type,
  platform,
  difficulty,
  duration,
  channel,
  readTime,
  isRequired,
  tags,
  language = 'Indonesia',
  className,
  onMarkComplete,
  isCompleted = false,
  compact = false,
}: ResourceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const typeIcons = {
    video: '🎬',
    article: '📄',
    documentation: '📚',
    interactive: '💻',
    dataset: '📊',
  };

  const typeColors = {
    video: 'from-red-400 to-red-500',
    article: 'from-blue-400 to-blue-500',
    documentation: 'from-purple-400 to-purple-500',
    interactive: 'from-green-400 to-green-500',
    dataset: 'from-orange-400 to-orange-500',
  };

  const typeLabels = {
    video: 'Video',
    article: 'Artikel',
    documentation: 'Dokumentasi',
    interactive: 'Interaktif',
    dataset: 'Dataset',
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

  const icon = typeIcons[type] || '📎';
  const color = typeColors[type] || 'from-gray-400 to-gray-500';
  const typeLabel = typeLabels[type] || type;

  if (compact) {
    return (
      <div
        className={cn(
          'rounded-xl border-2 p-3 transition-all cursor-pointer hover:shadow-md',
          isCompleted ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-white',
          className
        )}
        onClick={() => onMarkComplete?.(id)}
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
                {title}
              </span>
              {isRequired && (
                <Badge variant="danger" size="xs">Wajib</Badge>
              )}
              {isCompleted && (
                <Badge variant="success" size="xs">✅</Badge>
              )}
            </div>
            <div className="text-xs text-gray-500 truncate">{platform}</div>
          </div>
          <div className="text-right">
            <Badge
              variant="secondary"
              size="xs"
              className={difficultyColors[difficulty]}
            >
              {difficultyLabels[difficulty]}
            </Badge>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card
      variant={isCompleted ? 'default' : 'default'}
      padding="md"
      className={cn(
        'transition-all border-l-4',
        isCompleted ? 'border-l-green-500 bg-green-50/50' : 'border-l-blue-500',
        className
      )}
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div
          className={cn(
            'flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-md',
            'bg-gradient-to-br',
            color
          )}
        >
          {icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h4 className="font-semibold text-gray-900">{title}</h4>
            <Badge variant="secondary" size="sm">{typeLabel}</Badge>
            {isRequired && (
              <Badge variant="danger" size="sm">⭐ Wajib</Badge>
            )}
            {isCompleted && (
              <Badge variant="success" size="sm">✅ Selesai</Badge>
            )}
          </div>

          <p className="text-sm text-gray-500 mt-1">{description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" size="xs">
                #{tag}
              </Badge>
            ))}
            <Badge variant="secondary" size="xs">
              🌐 {language}
            </Badge>
          </div>

          {/* Info */}
          <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
            <span>📱 {platform}</span>
            {duration && <span>⏱️ {duration}</span>}
            {readTime && <span>📖 {readTime} menit</span>}
            {channel && <span>📺 {channel}</span>}
          </div>
        </div>

        {/* Action */}
        <div className="flex-shrink-0 flex flex-col gap-2">
          <Button
            variant={isCompleted ? 'outline' : 'primary'}
            size="sm"
            asChild
          >
            <Link href={url} target="_blank" rel="noopener noreferrer">
              {isCompleted ? '📖 Buka Ulang' : '🔗 Buka'}
            </Link>
          </Button>
          {onMarkComplete && (
            <Button
              variant={isCompleted ? 'ghost' : 'outline'}
              size="sm"
              onClick={() => onMarkComplete(id)}
            >
              {isCompleted ? '✅ Selesai' : '☑️ Tandai Selesai'}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}

export default ResourceCard;
