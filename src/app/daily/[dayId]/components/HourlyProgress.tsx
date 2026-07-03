'use client';

import { cn } from '@/lib/utils/helpers';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface HourlyProgressProps {
  hourlyProgress: any;
  dayProgress: any;
  onStartTimer: () => void;
  onPauseTimer: () => void;
  onResumeTimer: () => void;
  onStopTimer: () => void;
  onSkipSession: () => void;
  onAddBreak: (minutes: number) => void;
  isTimerRunning: boolean;
  elapsedSeconds: number;
}

export function HourlyProgress({
  hourlyProgress,
  dayProgress,
  onStartTimer,
  onPauseTimer,
  onResumeTimer,
  onStopTimer,
  onSkipSession,
  onAddBreak,
  isTimerRunning,
  elapsedSeconds,
}: HourlyProgressProps) {
  if (!hourlyProgress) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        Belum ada data progress per jam
      </div>
    );
  }

  const totalHours = hourlyProgress.hours?.length || 10;
  const completedHours = hourlyProgress.hours?.filter((h: any) => !h.isBreak && h.status === 'completed').length || 0;
  const studyHours = hourlyProgress.hours?.filter((h: any) => !h.isBreak).length || 0;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in_progress': return 'bg-blue-500';
      case 'skipped': return 'bg-yellow-500';
      default: return 'bg-gray-200 dark:bg-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return '✅ Selesai';
      case 'in_progress': return '🔄 Berjalan';
      case 'skipped': return '⏭️ Dilewati';
      default: return '⏳ Menunggu';
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">Progress per Jam</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {completedHours}/{studyHours} jam selesai
          </p>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {Math.round((completedHours / studyHours) * 100)}%
          </div>
          <ProgressBar
            value={(completedHours / studyHours) * 100}
            max={100}
            size="sm"
            color="blue"
            showPercentage={false}
            className="w-32"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {hourlyProgress.hours?.map((hour: any, index: number) => (
          <div
            key={index}
            className={cn(
              'p-3 rounded-lg border-2 transition-all',
              hour.isBreak ? 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800' :
              hour.status === 'completed' ? 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800' :
              hour.status === 'in_progress' ? 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800' :
              hour.status === 'skipped' ? 'bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-800' :
              'bg-gray-50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700'
            )}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900 dark:text-white">
                    {hour.timeRange}
                  </span>
                  {hour.isBreak ? (
                    <Badge variant="secondary" size="xs">☕ Break</Badge>
                  ) : (
                    <Badge
                      variant={
                        hour.status === 'completed' ? 'success' :
                        hour.status === 'in_progress' ? 'primary' :
                        hour.status === 'skipped' ? 'warning' : 'secondary'
                      }
                      size="xs"
                    >
                      {getStatusLabel(hour.status)}
                    </Badge>
                  )}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                  {hour.isBreak ? hour.notes || `Break ${hour.minutesPlanned} menit` : `Sesi ${hour.sessionNumber}`}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {hour.isBreak ? `${hour.minutesStudied || 0}m` : `${hour.minutesStudied || 0}m`}
                </div>
                <div className="text-xs text-gray-400">
                  {hour.isBreak ? `/${hour.minutesPlanned}m` : `/${hour.minutesPlanned}m`}
                </div>
              </div>
            </div>
            {!hour.isBreak && (
              <ProgressBar
                value={(hour.minutesStudied / hour.minutesPlanned) * 100}
                max={100}
                size="xs"
                color={hour.status === 'completed' ? 'green' : hour.status === 'in_progress' ? 'blue' : 'yellow'}
                showPercentage={false}
                className="mt-2"
              />
            )}
          </div>
        ))}
      </div>

      {dayProgress?.status === 'in_progress' && !dayProgress?.isComplete && (
        <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-semibold text-blue-800 dark:text-blue-300">
                ⏰ {isTimerRunning ? 'Timer berjalan' : 'Timer dijeda'}
              </h4>
              <p className="text-sm text-blue-600 dark:text-blue-400">
                {formatTime(elapsedSeconds)}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {!isTimerRunning ? (
                <Button variant="primary" size="sm" onClick={onResumeTimer}>
                  ▶️ Lanjutkan
                </Button>
              ) : (
                <Button variant="outline" size="sm" onClick={onPauseTimer}>
                  ⏸️ Jeda
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={onStopTimer}>
                ⏹️ Selesai
              </Button>
              <Button variant="secondary" size="sm" onClick={onSkipSession}>
                ⏭️ Lewati
              </Button>
              <Button variant="secondary" size="sm" onClick={() => onAddBreak(15)}>
                ☕ +15m Break
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
