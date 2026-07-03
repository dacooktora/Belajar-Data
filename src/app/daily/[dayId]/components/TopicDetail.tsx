'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils/helpers';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { Subtopic, SubtopicProgress } from '@/lib/types';

interface TopicDetailProps {
  subtopic: Subtopic;
  progress: SubtopicProgress | undefined;
  onToggleComplete: (subtopicId: string, completed: boolean) => void;
  onUpdateProgress: (subtopicId: string, data: Partial<SubtopicProgress>) => void;
  dayId: number;
}

export function TopicDetail({
  subtopic,
  progress,
  onToggleComplete,
  onUpdateProgress,
  dayId,
}: TopicDetailProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const isComplete = progress?.status === 'mastered' || progress?.status === 'understood';
  const statusLabel = progress?.status || 'not_started';

  const statusConfigs = {
    not_started: { label: '⏳ Belum', color: 'bg-gray-100 text-gray-600' },
    viewed: { label: '👀 Dilihat', color: 'bg-blue-100 text-blue-600' },
    studied: { label: '📖 Dipelajari', color: 'bg-indigo-100 text-indigo-600' },
    understood: { label: '✅ Dipahami', color: 'bg-green-100 text-green-600' },
    needs_review: { label: '🔄 Perlu Ulang', color: 'bg-yellow-100 text-yellow-600' },
    mastered: { label: '🏆 Dikuasai', color: 'bg-purple-100 text-purple-600' },
  };

  const config = statusConfigs[statusLabel as keyof typeof statusConfigs] || statusConfigs.not_started;

  const handleToggle = () => {
    onToggleComplete(subtopic.name, !isComplete);
  };

  const handleStatusChange = (status: any) => {
    onUpdateProgress(subtopic.name, { status });
  };

  return (
    <Card
      variant="default"
      padding="md"
      className={cn(
        'transition-all border-l-4',
        isComplete ? 'border-l-green-500' : 'border-l-blue-500'
      )}
    >
      <div className="flex items-start gap-3">
        <Checkbox
          checked={isComplete}
          onChange={handleToggle}
          className="flex-shrink-0 mt-1"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h4 className="font-semibold text-gray-900 dark:text-white">
              {subtopic.name}
            </h4>
            <Badge variant="secondary" size="xs" className={config.color}>
              {config.label}
            </Badge>
            <Badge variant="secondary" size="xs">
              ⏱️ {subtopic.estimatedTime || 30}m
            </Badge>
            <Badge
              variant="secondary"
              size="xs"
              className={
                subtopic.difficulty === 'pemula' ? 'bg-green-100 text-green-800' :
subtopic.difficulty === 'menengah' ? 'bg-yellow-100 text-yellow-800' :
subtopic.difficulty === 'lanjutan' ? 'bg-orange-100 text-orange-800' :
'bg-red-100 text-red-800'
              }
            >
              {subtopic.difficulty || 'Pemula'}
            </Badge>
          </div>

          <div
            className={cn(
              'text-sm text-gray-600 dark:text-gray-300 mt-1 prose prose-sm max-w-none',
              !isExpanded && 'line-clamp-3'
            )}
            dangerouslySetInnerHTML={{ __html: subtopic.content || '' }}
          />

          {subtopic.keywords && subtopic.keywords.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {subtopic.keywords.map((keyword) => (
                <Badge key={keyword} variant="secondary" size="xs">
                  #{keyword}
                </Badge>
              ))}
            </div>
          )}

          {subtopic.examples && subtopic.examples.length > 0 && isExpanded && (
            <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
              <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">📌 Contoh</h5>
              {subtopic.examples.map((example, idx) => (
                <div key={idx} className="mb-2 last:mb-0">
                  <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    {example.title}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {example.description}
                  </div>
                  {example.code && (
                    <pre className="mt-1 p-2 bg-gray-100 dark:bg-gray-800 rounded text-xs overflow-x-auto">
                      {example.code}
                    </pre>
                  )}
                </div>
              ))}
            </div>
          )}

          {subtopic.miniPractice && isExpanded && (
            <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
              <h5 className="text-sm font-medium text-blue-800 dark:text-blue-300">
                💻 Latihan Mini: {subtopic.miniPractice.title}
              </h5>
              <p className="text-sm text-blue-600 dark:text-blue-400">
                {subtopic.miniPractice.instructions}
              </p>
              <p className="text-xs text-blue-500 dark:text-blue-400 mt-1">
                ⏱️ {subtopic.miniPractice.estimatedTime} menit
              </p>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-2 mt-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
            >
              {isExpanded ? 'Sembunyikan' : 'Lihat detail'}
            </button>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => handleStatusChange('needs_review')}
              className="text-yellow-600"
            >
              🔄 Butuh Ulang
            </Button>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => handleStatusChange('mastered')}
              className="text-purple-600"
            >
              🏆 Kuasai
            </Button>
            {subtopic.additionalResources && subtopic.additionalResources.length > 0 && isExpanded && (
              <div className="flex gap-2">
                {subtopic.additionalResources.map((res, idx) => (
                  <a
                    key={idx}
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    📎 {res.title}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
