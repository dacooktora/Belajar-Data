'use client';

import { ReactNode, createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useProgress } from '@/lib/hooks/useProgress';
import { useDailyProgress } from '@/lib/hooks/useDailyProgress';
import { useStreak } from '@/lib/hooks/useStreak';
import { useAnalytics } from '@/lib/hooks/useAnalytics';
import { ProgressData, DailyProgress, StreakData, AnalyticsData } from '@/lib/types';

interface ProgressContextType {
  progress: ProgressData | null;
  dailyProgress: DailyProgress | null;
  streak: StreakData | null;
  analytics: AnalyticsData | null;
  isLoading: boolean;
  error: Error | null;
  refresh: () => void;
  updateDayProgress: (dayId: number, data: Partial<DailyProgress>) => void;
  updateSession: (sessionNumber: number, data: any) => void;
  updateSubtopic: (subtopicId: string, data: any) => void;
  updateQuiz: (quizId: string, data: any) => void;
  updatePractice: (practiceId: string, data: any) => void;
  updateAssignment: (assignmentId: string, data: any) => void;
  updateEvaluation: (data: any) => void;
  toggleSubtopic: (subtopicId: string, completed: boolean) => void;
  checkAndUpdateStreak: () => void;
  resetProgress: () => void;
  exportProgress: () => string;
  importProgress: (json: string) => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const { 
    progress,
    getDayProgress,
    updateDayProgress: updateMainDayProgress,
    getOverallStats,
    resetProgress,
    exportProgress,
    importProgress,
    refresh: refreshProgress,
    isLoading: progressLoading,
    error: progressError,
  } = useProgress({ autoSave: true });

  const {
    dayProgress,
    updateSession,
    updateSubtopic,
    updateQuiz,
    updatePractice,
    updateAssignment,
    updateEvaluation,
    toggleSubtopic,
    refresh: refreshDaily,
    isLoading: dailyLoading,
    error: dailyError,
  } = useDailyProgress({ autoSave: true });

  const {
    streak,
    checkAndUpdateStreak,
    refresh: refreshStreak,
    isLoading: streakLoading,
    error: streakError,
  } = useStreak({ autoSave: true });

  const {
    analytics,
    recalculate,
    refresh: refreshAnalytics,
    isLoading: analyticsLoading,
    error: analyticsError,
  } = useAnalytics({ autoRecalculate: true });

  const refresh = useCallback(() => {
    refreshProgress();
    refreshDaily();
    refreshStreak();
    refreshAnalytics();
  }, [refreshProgress, refreshDaily, refreshStreak, refreshAnalytics]);

  const updateDayProgress = useCallback((dayId: number, data: Partial<DailyProgress>) => {
    updateMainDayProgress(dayId, data);
    setTimeout(() => {
      recalculate();
      checkAndUpdateStreak();
    }, 500);
  }, [updateMainDayProgress, recalculate, checkAndUpdateStreak]);

  useEffect(() => {
    setIsLoading(
      progressLoading || dailyLoading || streakLoading || analyticsLoading
    );
    setError(progressError || dailyError || streakError || analyticsError);
  }, [progressLoading, dailyLoading, streakLoading, analyticsLoading, progressError, dailyError, streakError, analyticsError]);

  useEffect(() => {
    if (dayProgress) {
      checkAndUpdateStreak();
    }
  }, [dayProgress, checkAndUpdateStreak]);

  const value = {
    progress,
    dailyProgress: dayProgress,
    streak,
    analytics,
    isLoading,
    error,
    refresh,
    updateDayProgress,
    updateSession,
    updateSubtopic,
    updateQuiz,
    updatePractice,
    updateAssignment,
    updateEvaluation,
    toggleSubtopic,
    checkAndUpdateStreak,
    resetProgress,
    exportProgress,
    importProgress,
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgressContext() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgressContext must be used within a ProgressProvider');
  }
  return context;
}
