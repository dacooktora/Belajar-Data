import { useState, useEffect, useCallback, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { StreakData, StreakDay, StreakMilestone } from '@/lib/types/progress.types';
import { STREAK_MILESTONES } from '@/lib/utils/constants';
import { getDaysBetweenDates, addDays } from '@/lib/utils/helpers';

export interface UseStreakOptions {
  /** User ID untuk multi-user (optional) */
  userId?: string;
  /** Tanggal mulai (default: hari ini) */
  startDate?: Date;
  /** Auto-save setiap perubahan */
  autoSave?: boolean;
  /** Callback ketika streak berubah */
  onStreakChange?: (streak: StreakData) => void;
}

export interface UseStreakReturn {
  /** Data streak */
  streak: StreakData | null;
  /** Loading state */
  isLoading: boolean;
  /** Error state */
  error: Error | null;

  /** Streak saat ini */
  currentStreak: number;
  /** Streak terpanjang */
  longestStreak: number;
  /** Apakah streak aktif hari ini */
  isStreakActive: boolean;

  /** Cek dan update streak */
  checkAndUpdateStreak: (date?: Date) => void;
  /** Reset streak */
  resetStreak: () => void;
  /** Ambil riwayat streak */
  getStreakHistory: () => StreakDay[];
  /** Ambil milestone berikutnya */
  getNextMilestone: () => StreakMilestone | null;

  /** Hari menuju milestone berikutnya */
  daysToNextMilestone: number;
  /** Next milestone */
  nextMilestone: StreakMilestone | null;

  /** Refresh dari storage */
  refresh: () => void;
}

/**
 * Hook untuk mengelola streak belajar
 */
export function useStreak(options: UseStreakOptions = {}): UseStreakReturn {
  const { userId = 'default', startDate = new Date(), autoSave = true, onStreakChange } = options;

  const storageKey = `streak_${userId}`;

  // Default streak data
  const defaultStreak: StreakData = {
    type: 'daily',
    currentStreak: 0,
    longestStreak: 0,
    lastDate: new Date().toISOString(),
    streakHistory: [],
    totalDaysActive: 0,
    totalWeeksActive: 0,
    totalMonthsActive: 0,
    bestMonth: '',
    bestWeek: '',
    averageDailyActivity: 0,
    consistencyScore: 0,
    streakTarget: 180,
    currentTargetProgress: 0,
    isOnTrack: false,
    milestones: STREAK_MILESTONES.map((m) => ({
      day: m.days,
      type: 'daily',
      achievedAt: '',
      badge: m.badge,
      description: m.description,
      isUnlocked: false,
    })),
    notes: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const {
    value: streak,
    setValue: setStreak,
    isLoading: storageLoading,
    error: storageError,
    reload: refresh,
  } = useLocalStorage<StreakData>(storageKey, defaultStreak, {
    serialize: true,
    onStorageChange: () => {
      if (autoSave) {
        checkAndUpdateStreak();
      }
    },
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  /**
   * Check dan update streak
   */
  const checkAndUpdateStreak = useCallback((date: Date = new Date()) => {
    if (!streak) return;

    const today = new Date(date);
    today.setHours(0, 0, 0, 0);

    const lastDate = streak.lastDate ? new Date(streak.lastDate) : null;
    if (lastDate) {
      lastDate.setHours(0, 0, 0, 0);
    }

    const daysDiff = lastDate ? getDaysBetweenDates(lastDate, today) : 0;

    let newStreak = { ...streak };
    let streakUpdated = false;

    // Cek apakah hari ini sudah dicatat
    const todayExists = streak.streakHistory.some(
      (s) => new Date(s.date).toDateString() === today.toDateString()
    );

    if (!todayExists) {
      // Jika selisih 1 hari, streak bertambah
      if (daysDiff === 1) {
        newStreak.currentStreak += 1;
        if (newStreak.currentStreak > newStreak.longestStreak) {
          newStreak.longestStreak = newStreak.currentStreak;
        }

        // Cek milestone
        newStreak.milestones = newStreak.milestones.map((m) => {
          if (m.day === newStreak.currentStreak && !m.isUnlocked) {
            return { ...m, isUnlocked: true, achievedAt: new Date().toISOString() };
          }
          return m;
        });

        newStreak.streakHistory.push({
          date: today.toISOString(),
          isActive: true,
          minutesStudied: 0,
          subtopicsCompleted: 0,
          quizzesTaken: 0,
          pointsEarned: 0,
          hasReflection: false,
          streakType: 'daily',
        });

        streakUpdated = true;
      }
      // Jika selisih 0 hari (hari ini sudah di-record)
      else if (daysDiff === 0) {
        // Tidak ada perubahan
      }
      // Jika selisih > 1 hari, streak reset
      else if (daysDiff > 1) {
        newStreak.currentStreak = 1;
        newStreak.streakHistory.push({
          date: today.toISOString(),
          isActive: true,
          minutesStudied: 0,
          subtopicsCompleted: 0,
          quizzesTaken: 0,
          pointsEarned: 0,
          hasReflection: false,
          streakType: 'daily',
        });
        streakUpdated = true;
      }
    }

    // Update total days active
    newStreak.totalDaysActive = newStreak.streakHistory.filter((s) => s.isActive).length;

    // Update target progress
    newStreak.currentTargetProgress = (newStreak.currentStreak / newStreak.streakTarget) * 100;
    newStreak.isOnTrack = newStreak.currentStreak >= newStreak.streakTarget;

    // Update average daily activity
    const totalMinutes = newStreak.streakHistory.reduce((sum, s) => sum + s.minutesStudied, 0);
    newStreak.averageDailyActivity = newStreak.totalDaysActive > 0
      ? totalMinutes / newStreak.totalDaysActive
      : 0;

    // Update consistency score
    const totalDays = getDaysBetweenDates(new Date(newStreak.createdAt), new Date());
    newStreak.consistencyScore = totalDays > 0
      ? (newStreak.totalDaysActive / totalDays) * 100
      : 0;

    if (streakUpdated) {
      newStreak.lastDate = today.toISOString();
      newStreak.updatedAt = new Date().toISOString();

      setStreak(newStreak);
      onStreakChange?.(newStreak);
    }

    return newStreak;
  }, [streak, setStreak, onStreakChange]);

  /**
   * Reset streak
   */
  const resetStreak = useCallback(() => {
    setStreak({
      ...defaultStreak,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    onStreakChange?.(defaultStreak);
  }, [setStreak, defaultStreak, onStreakChange]);

  /**
   * Get streak history
   */
  const getStreakHistory = useCallback((): StreakDay[] => {
    if (!streak) return [];
    return streak.streakHistory;
  }, [streak]);

  /**
   * Get next milestone
   */
  const getNextMilestone = useCallback((): StreakMilestone | null => {
    if (!streak) return null;

    const unlockedMilestones = streak.milestones.filter((m) => m.isUnlocked);
    const nextMilestone = streak.milestones.find((m) => !m.isUnlocked);

    return nextMilestone || null;
  }, [streak]);

  // Memoized computed values
  const currentStreak = useMemo(() => {
    return streak?.currentStreak || 0;
  }, [streak]);

  const longestStreak = useMemo(() => {
    return streak?.longestStreak || 0;
  }, [streak]);

  const isStreakActive = useMemo(() => {
    if (!streak) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const lastDate = new Date(streak.lastDate);
    lastDate.setHours(0, 0, 0, 0);
    return today.getTime() === lastDate.getTime() && streak.currentStreak > 0;
  }, [streak]);

  const daysToNextMilestone = useMemo(() => {
    const next = getNextMilestone();
    if (!next) return 0;
    return Math.max(0, next.day - currentStreak);
  }, [currentStreak, getNextMilestone]);

  const nextMilestone = useMemo(() => {
    return getNextMilestone();
  }, [getNextMilestone]);

  // Initialize streak
  useEffect(() => {
    if (streak && autoSave) {
      checkAndUpdateStreak();
    }
    setIsLoading(storageLoading);
    setError(storageError);
  }, [streak, storageLoading, storageError, autoSave, checkAndUpdateStreak]);

  return {
    streak,
    isLoading,
    error,

    currentStreak,
    longestStreak,
    isStreakActive,

    checkAndUpdateStreak,
    resetStreak,
    getStreakHistory,
    getNextMilestone,

    daysToNextMilestone,
    nextMilestone,

    refresh,
  };
}

export default useStreak;
