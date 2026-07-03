'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils/helpers';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';

export interface MonthCardProps {
  month: number;
  title: string;
  subtitle: string;
  status: 'completed' | 'in_progress' | 'not_started' | 'locked';
  progress: number;
  totalDays: number;
  completedDays: number;
  skills: string[];
  tools: string[];
  icon?: string;
  color?: string;
  startDate?: string;
  endDate?: string;
  totalHours?: number;
  className?: string;
  onClick?: () => void;
  compact?: boolean;
}

export function MonthCard({
  month,
  title,
  subtitle,
  status,
  progress,
  totalDays,
  completedDays,
  skills,
  tools,
  icon,
  color,
  startDate,
  endDate,
  totalHours,
  className,
  onClick,
  compact = false,
}: MonthCardProps) {
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

  const monthColors = [
    'from-blue-500 to-blue-600',
    'from-green-500 to-green-600',
    'from-yellow-500 to-yellow-600',
    'from-orange-500 to-orange-600',
    'from-purple-500 to-purple-600',
    'from-pink-500 to-pink-600',
  ];

  const monthIcons = ['📗', '📘', '📙', '📕', '📚', '🎯'];

  const gradientColor = color || monthColors[(month - 1) % monthColors.length];
  const iconEmoji = icon || monthIcons[(month - 1) % monthIcons.length];

  if (compact) {
    return (
      <div
        className={cn(
          'rounded-xl border-2 p-4 transition-all cursor-pointer hover:shadow-md',
          statusColors[status],
          className
        )}
        onClick={onClick}
      >
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-xl',
              'bg-gradient-to-br',
              gradientColor
            )}
          >
            {iconEmoji}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-gray-900">
                Bulan {month}
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
            'flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg',
            'bg-gradient-to-br',
            gradientColor
          )}
        >
          {iconEmoji}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="text-lg font-bold text-gray-900">
              Bulan {month}: {title}
            </h3>
            <Badge variant={statusBadges[status].variant as any} size="md">
              {statusBadges[status].label}
            </Badge>
          </div>

          <p className="text-sm text-gray-500 mt-1">{subtitle}</p>

          {/* Skills & Tools */}
          <div className="flex flex-wrap gap-2 mt-3">
            {skills.slice(0, 4).map((skill) => (
              <Badge key={skill} variant="secondary" size="sm">
                {skill}
              </Badge>
            ))}
            {skills.length > 4 && (
              <Badge variant="secondary" size="sm">
                +{skills.length - 4} lagi
              </Badge>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {tools.map((tool) => (
              <Badge key={tool} variant="primary" size="xs">
                {tool}
              </Badge>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
            <div>
              <div className="text-xs text-gray-400">Progress</div>
              <div className="text-sm font-semibold text-gray-700">
                {Math.round(progress)}%
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-400">Hari</div>
              <div className="text-sm font-semibold text-gray-700">
                {completedDays}/{totalDays}
              </div>
            </div>
            {totalHours && (
              <div>
                <div className="text-xs text-gray-400">Total Jam</div>
                <div className="text-sm font-semibold text-gray-700">
                  {totalHours} jam
                </div>
              </div>
            )}
            {startDate && endDate && (
              <div>
                <div className="text-xs text-gray-400">Periode</div>
                <div className="text-sm font-semibold text-gray-700">
                  {startDate} - {endDate}
                </div>
              </div>
            )}
          </div>

          {/* Progress Bar */}
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

export default MonthCard;
