'use client';

import { useMemo, useState } from 'react';
import { cn } from '@/lib/utils/helpers';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { AnalyticsData } from '@/lib/types/analytics.types';

interface QuizPerformanceProps {
  data: AnalyticsData['quiz'] | undefined;
  detailed?: boolean;
}

export function QuizPerformance({ data, detailed = false }: QuizPerformanceProps) {
  const [showWeakTopics, setShowWeakTopics] = useState(true);

  if (!data) {
    return (
      <Card variant="default" padding="lg">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-4">🧪 Performa Quiz</h4>
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          Belum ada data quiz
        </div>
      </Card>
    );
  }

  const scoreData = data.scoresOverTime || [];
  const weakTopics = data.weakTopics || [];
  const strongTopics = data.strongTopics || [];

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return 'success' as const;
    if (score >= 60) return 'warning' as const;
    return 'danger' as const;
  };

  return (
    <Card variant="default" padding="lg">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-gray-900 dark:text-white">🧪 Performa Quiz</h4>
        <Badge variant="secondary" size="sm">
          {data.quizzesTaken} quiz dikerjakan
        </Badge>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg text-center">
          <div className="text-xs text-gray-500 dark:text-gray-400">Total Quiz</div>
          <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{data.totalQuizzes}</div>
        </div>
        <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg text-center">
          <div className="text-xs text-gray-500 dark:text-gray-400">Pass Rate</div>
          <div className="text-lg font-bold text-green-600 dark:text-green-400">
            {data.passRate.toFixed(1)}%
          </div>
        </div>
        <div className="p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg text-center">
          <div className="text-xs text-gray-500 dark:text-gray-400">Rata-rata</div>
          <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
            {data.averageScore.toFixed(1)}%
          </div>
        </div>
        <div className="p-3 bg-orange-50 dark:bg-orange-950/30 rounded-lg text-center">
          <div className="text-xs text-gray-500 dark:text-gray-400">Tertinggi</div>
          <div className="text-lg font-bold text-orange-600 dark:text-orange-400">
            {data.highestScore.toFixed(1)}%
          </div>
        </div>
      </div>

      {scoreData.length > 0 && (
        <div className="mb-4">
          <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">📈 Tren Nilai</h5>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {scoreData.slice(-10).map((item) => (
              <div key={item.date} className="flex items-center gap-3">
                <div className="flex-shrink-0 w-24 text-xs text-gray-500 dark:text-gray-400">
                  {new Date(item.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                </div>
                <div className="flex-1 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={cn(
                      'h-full rounded-full transition-all duration-500',
                      item.score >= item.passingScore ? 'bg-green-500' : 'bg-red-500'
                    )}
                    style={{ width: `${item.score}%` }}
                  />
                </div>
                <div className="flex-shrink-0 w-20 text-right text-xs font-medium text-gray-700 dark:text-gray-300">
                  {Math.round(item.score)}%
                </div>
                <Badge
                  variant={item.status === 'passed' ? 'success' : 'danger'}
                  size="xs"
                >
                  {item.status === 'passed' ? '✅' : '❌'}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      {detailed && (
        <div className="space-y-4">
          {weakTopics.length > 0 && (
            <div>
              <h5 className="text-sm font-medium text-red-600 dark:text-red-400 mb-2">
                🔴 Topik Lemah
              </h5>
              <div className="space-y-2">
                {weakTopics.map((topic) => (
                  <div key={topic.topic} className="p-2 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-800">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{topic.topic}</span>
                      <Badge
                        variant={
                          topic.urgency === 'critical' ? 'danger' :
                          topic.urgency === 'high' ? 'warning' : 'primary'
                        }
                        size="xs"
                      >
                        {topic.urgency}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-xs text-gray-600 dark:text-gray-400">
                      <span>Nilai: {topic.averageScore.toFixed(1)}%</span>
                      <span>{topic.questionCount} soal</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {strongTopics.length > 0 && (
            <div>
              <h5 className="text-sm font-medium text-green-600 dark:text-green-400 mb-2">
                🟢 Topik Kuat
              </h5>
              <div className="flex flex-wrap gap-2">
                {strongTopics.map((topic) => (
                  <Badge key={topic.topic} variant="success" size="sm">
                    {topic.topic} ({Math.round(topic.averageScore)}%)
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}
