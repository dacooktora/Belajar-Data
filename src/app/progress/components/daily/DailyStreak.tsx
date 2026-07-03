'use client';

import { cn } from '@/lib/utils/helpers';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { StreakData, StreakMilestone } from '@/lib/types/progress.types';

interface DailyStreakProps {
  streak: StreakData | null;
}

export function DailyStreak({ streak }: DailyStreakProps) {
  if (!streak) {
    return (
      <Card variant="default" padding="lg">
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          Belum ada data streak
        </div>
      </Card>
    );
  }

  const getStreakEmoji = (days: number) => {
    if (days >= 180) return '👑';
    if (days >= 90) return '🌟';
    if (days >= 30) return '🔥';
    if (days >= 7) return '💪';
    if (days >= 3) return '📈';
    return '🌱';
  };

  const getStreakColor = (days: number) => {
    if (days >= 180) return 'from-yellow-400 to-orange-500';
    if (days >= 90) return 'from-purple-400 to-pink-500';
    if (days >= 30) return 'from-orange-400 to-red-500';
    if (days >= 7) return 'from-blue-400 to-purple-500';
    if (days >= 3) return 'from-green-400 to-blue-500';
    return 'from-gray-400 to-gray-500';
  };

  const streakEmoji = getStreakEmoji(streak.currentStreak);
  const streakColor = getStreakColor(streak.currentStreak);

  const weekDays = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
  const today = new Date().getDay();
  const weekStart = (today + 6) % 7;

  const streakDays = streak.streakHistory || [];
  const last7Days = weekDays.map((day, index) => {
    const dayIndex = (weekStart + index) % 7;
    const isToday = dayIndex === today;
    const date = new Date();
    date.setDate(date.getDate() - (today - dayIndex + 7) % 7);
    const dateStr = date.toISOString().split('T')[0];
    const isActive = streakDays.some(s => s.date.split('T')[0] === dateStr && s.isActive);

    return {
      day,
      isToday,
      isActive,
      date: dateStr,
    };
  });

  const nextMilestone = streak.milestones?.find(m => !m.isUnlocked);

  return (
    <Card variant="elevated" padding="lg">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0 text-center">
          <div
            className={cn(
              'w-20 h-20 rounded-full flex items-center justify-center text-4xl mx-auto shadow-lg',
              'bg-gradient-to-br',
              streakColor
            )}
          >
            {streakEmoji}
          </div>
          <div className="mt-2">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {streak.currentStreak}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">hari berturut-turut</div>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg text-center">
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                {streak.longestStreak}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Terpanjang</div>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg text-center">
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                {streak.totalDaysActive || 0}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Hari Aktif</div>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg text-center">
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                {Math.round(streak.consistencyScore || 0)}%
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Konsistensi</div>
            </div>
            {nextMilestone && (
              <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg text-center">
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  {nextMilestone.day - streak.currentStreak} hari
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Menuju {nextMilestone.badge}</div>
              </div>
            )}
          </div>

          <div className="mt-3 flex justify-between">
            {last7Days.map((day) => (
              <div
                key={day.day}
                className="flex flex-col items-center"
              >
                <div className="text-xs text-gray-400">{day.day}</div>
                <div
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-xs mt-1 transition-all',
                    day.isActive
                      ? 'bg-green-500 text-white'
                      : day.isToday
                      ? 'border-2 border-blue-500 text-gray-700'
                      : 'bg-gray-100 text-gray-400'
                  )}
                >
                  {day.isActive ? '✓' : day.isToday ? '•' : '-'}
                </div>
              </div>
            ))}
          </div>

          {streak.milestones && streak.milestones.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {streak.milestones.slice(0, 5).map((milestone) => (
                <Badge
                  key={milestone.day}
                  variant={milestone.isUnlocked ? 'success' : 'secondary'}
                  size="xs"
                >
                  {milestone.isUnlocked ? '✅' : '🔒'} {milestone.badge}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
