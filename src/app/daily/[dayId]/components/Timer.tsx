'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils/helpers';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface TimerProps {
  dayId: number;
  isRunning: boolean;
  elapsedSeconds: number;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
  onSkip: () => void;
  isComplete: boolean;
}

export function Timer({
  dayId,
  isRunning,
  elapsedSeconds,
  onStart,
  onPause,
  onResume,
  onStop,
  onSkip,
  isComplete,
}: TimerProps) {
  const [totalSeconds, setTotalSeconds] = useState(elapsedSeconds);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    setTotalSeconds(elapsedSeconds);
  }, [elapsedSeconds]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hours > 0) {
      return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const getColor = () => {
    if (isComplete) return 'text-green-500';
    if (isRunning) return 'text-blue-500 animate-pulse-soft';
    return 'text-gray-500';
  };

  if (isComplete) {
    return (
      <Card variant="default" padding="md" className="border-green-200 bg-green-50 dark:bg-green-950/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎉</span>
            <div>
              <h4 className="font-semibold text-green-800 dark:text-green-300">Hari Selesai!</h4>
              <p className="text-sm text-green-600 dark:text-green-400">
                Total waktu belajar: {formatTime(totalSeconds)}
              </p>
            </div>
          </div>
          <Badge variant="success" size="lg">✅ Selesai</Badge>
        </div>
      </Card>
    );
  }

  return (
    <Card variant="default" padding="md">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className={cn(
              'text-3xl font-bold font-mono transition-colors',
              getColor()
            )}>
              {formatTime(totalSeconds)}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Waktu Belajar</div>
          </div>
          <div className="flex flex-wrap gap-2">
            {!isRunning ? (
              <Button variant="primary" size="sm" onClick={onStart}>
                ▶️ Mulai
              </Button>
            ) : (
              <Button variant="outline" size="sm" onClick={onPause}>
                ⏸️ Jeda
              </Button>
            )}
            {isRunning && (
              <Button variant="outline" size="sm" onClick={onResume}>
                ▶️ Lanjut
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={onStop}>
              ⏹️ Selesai
            </Button>
            <Button variant="secondary" size="sm" onClick={onSkip}>
              ⏭️ Lewati
            </Button>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Target: 10 jam</span>
            <span>{Math.min(Math.round((totalSeconds / 3600) / 10 * 100), 100)}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
              style={{ width: `${Math.min((totalSeconds / 3600) / 10 * 100, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
