'use client';

import { cn } from '@/lib/utils/helpers';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Badge } from '@/components/ui/Badge';

export interface ProgressSummaryProps {
  totalDays: number;
  completedDays: number;
  totalHours: number;
  completedHours: number;
  totalTopics: number;
  completedTopics: number;
  totalQuizzes: number;
  completedQuizzes: number;
  totalAssignments: number;
  completedAssignments: number;
  streakDays: number;
  className?: string;
}

export function ProgressSummary({
  totalDays,
  completedDays,
  totalHours,
  completedHours,
  totalTopics,
  completedTopics,
  totalQuizzes,
  completedQuizzes,
  totalAssignments,
  completedAssignments,
  streakDays,
  className,
}: ProgressSummaryProps) {
  const dayProgress = (completedDays / totalDays) * 100;
  const hourProgress = (completedHours / totalHours) * 100;
  const topicProgress = (completedTopics / totalTopics) * 100;
  const quizProgress = (completedQuizzes / totalQuizzes) * 100;
  const assignmentProgress = (completedAssignments / totalAssignments) * 100;
  const overallProgress = (completedDays / totalDays) * 100;

  const stats = [
    {
      label: 'Hari',
      value: `${completedDays}/${totalDays}`,
      progress: dayProgress,
      color: 'blue',
      icon: '📅',
    },
    {
      label: 'Jam Belajar',
      value: `${completedHours}/${totalHours}`,
      progress: hourProgress,
      color: 'green',
      icon: '⏰',
    },
    {
      label: 'Topik',
      value: `${completedTopics}/${totalTopics}`,
      progress: topicProgress,
      color: 'purple',
      icon: '📚',
    },
    {
      label: 'Quiz',
      value: `${completedQuizzes}/${totalQuizzes}`,
      progress: quizProgress,
      color: 'yellow',
      icon: '🧪',
    },
    {
      label: 'Tugas',
      value: `${completedAssignments}/${totalAssignments}`,
      progress: assignmentProgress,
      color: 'orange',
      icon: '📋',
    },
  ];

  return (
    <Card variant="elevated" padding="lg" className={cn('', className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">📊 Ringkasan Progress</h3>
        <Badge variant="primary" size="lg">
          🔥 {streakDays} hari streak!
        </Badge>
      </div>

      {/* Overall Progress */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="font-medium text-gray-700">Overall Progress</span>
          <span className="font-bold text-gray-900">{Math.round(overallProgress)}%</span>
        </div>
        <ProgressBar
          value={overallProgress}
          max={100}
          size="lg"
          color="gradient"
          showPercentage={false}
          animated
        />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mt-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="p-3 bg-gray-50 rounded-lg text-center"
          >
            <div className="text-2xl mb-1">{stat.icon}</div>
            <div className="text-sm font-semibold text-gray-900">{stat.value}</div>
            <div className="text-xs text-gray-500">{stat.label}</div>
            <ProgressBar
              value={stat.progress}
              max={100}
              size="xs"
              color={stat.color as any}
              showPercentage={false}
              className="mt-1"
            />
          </div>
        ))}
      </div>
    </Card>
  );
}

export default ProgressSummary;
