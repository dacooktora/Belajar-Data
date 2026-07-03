'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils/helpers';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { Practice, PracticeProgress } from '@/lib/types';

interface PracticeSectionProps {
  practice: Practice;
  progress: PracticeProgress | undefined;
  onUpdate: (practiceId: string, data: Partial<PracticeProgress>) => void;
  dayId: number;
  sessionNumber: number;
}

export function PracticeSection({
  practice,
  progress,
  onUpdate,
  dayId,
  sessionNumber,
}: PracticeSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [notes, setNotes] = useState(progress?.notes || '');
  const [selfAssessment, setSelfAssessment] = useState(progress?.selfAssessment || 0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isCompleted = progress?.status === 'completed';
  const isInProgress = progress?.status === 'in_progress';

  const handleSubmit = () => {
    setIsSubmitting(true);
    onUpdate(practice.id, {
      status: 'completed',
      notes,
      selfAssessment,
      completedAt: new Date().toISOString(),
      isCompleted: true,
    });
    setIsSubmitting(false);
  };

  const handleStart = () => {
    onUpdate(practice.id, {
      status: 'in_progress',
      startTime: new Date().toISOString(),
    });
  };

  return (
    <Card
      variant="default"
      padding="md"
      className={cn(
        'transition-all border-l-4',
        isCompleted ? 'border-l-green-500' : isInProgress ? 'border-l-blue-500' : 'border-l-gray-300'
      )}
    >
      <div className="flex items-start gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h4 className="font-semibold text-gray-900 dark:text-white">
              {practice.title}
            </h4>
            <Badge
              variant={isCompleted ? 'success' : isInProgress ? 'primary' : 'secondary'}
              size="sm"
            >
              {isCompleted ? '✅ Selesai' : isInProgress ? '🔄 Sedang Dikerjakan' : '⏳ Belum Dikerjakan'}
            </Badge>
            <Badge variant="secondary" size="xs">
              ⏱️ {practice.estimatedTime}m
            </Badge>
            <Badge
              variant="secondary"
              size="xs"
              className={
                practice.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                practice.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }
            >
              {practice.difficulty || 'Sedang'}
            </Badge>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            {(practice as any).description || 'Latihan praktik'}
          </p>

          {(practice as any).skillsPracticed && (practice as any).skillsPracticed.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
              {(practice as any).skillsPracticed.map((skill: any) => (
            <Badge key={skill} variant="secondary" size="xs">
                  {skill}
                </Badge>
              ))}
            </div>
          )}

          {isExpanded && (
            <div className="mt-3 space-y-3">
              <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">📋 Instruksi</h5>
                <ol className="list-decimal list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  {practice.instructions.split('\n').map((instruction: string, idx: number) => (
                  <li key={idx}>{instruction}</li>
                  ))}
                </ol>
              </div>

              {practice.tips && practice.tips.length > 0 && (
                <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h5 className="text-sm font-medium text-blue-800 dark:text-blue-300">💡 Tips</h5>
                  <ul className="list-disc list-inside text-sm text-blue-600 dark:text-blue-400">
                    {practice.tips.split('\n').map((tip: string, idx: number) => (
                      <li key={idx}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}

              {practice.commonMistakes && practice.commonMistakes.length > 0 && (
                <div className="p-3 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-800">
                  <h5 className="text-sm font-medium text-red-800 dark:text-red-300">⚠️ Kesalahan Umum</h5>
                  <ul className="list-disc list-inside text-sm text-red-600 dark:text-red-400">
                    {practice.commonMistakes.split('\n').map((mistake: string, idx: number) => (
                    <li key={idx}>{mistake}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="space-y-3">
                <Textarea
                  label="Catatan Pengerjaan"
                  placeholder="Tulis catatan selama mengerjakan praktik..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Penilaian Diri (1-10)
                  </label>
                  <div className="flex gap-2">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setSelfAssessment(i + 1)}
                        className={cn(
                          'w-10 h-10 rounded-lg border-2 transition-all font-semibold',
                          selfAssessment === i + 1
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30 text-blue-600'
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 text-gray-500'
                        )}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                </div>

                {practice.evaluationCriteria && practice.evaluationCriteria.length > 0 && (
                  <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                    <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">📊 Kriteria Penilaian</h5>
                    {practice.evaluationCriteria.map((criteria, idx) => (
                      <div key={idx} className="flex justify-between text-sm py-1 border-b border-gray-200 dark:border-gray-700 last:border-0">
                        <span className="text-gray-600 dark:text-gray-400">{criteria.criterion}</span>
                        <span className="font-medium text-gray-700 dark:text-gray-300">{criteria.weight}%</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-2 mt-3">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
            >
              {isExpanded ? 'Sembunyikan' : 'Lihat detail'}
            </button>
            {!isCompleted && !isInProgress && (
              <Button variant="primary" size="sm" onClick={handleStart}>
                🚀 Mulai Praktik
              </Button>
            )}
            {isInProgress && (
              <Button variant="primary" size="sm" onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? '⏳ Menyimpan...' : '✅ Submit Praktik'}
              </Button>
            )}
            {isCompleted && (
              <Badge variant="success" size="sm">✅ Selesai</Badge>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
