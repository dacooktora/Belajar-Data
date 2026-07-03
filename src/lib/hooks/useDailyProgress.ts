import { useState, useEffect, useCallback, useMemo } from 'react';
import { useProgress } from './useProgress';
import { DailyProgress, SessionProgress, SubtopicProgress, QuizProgress, PracticeProgress, AssignmentProgress } from '@/lib/types/progress.types';
import { getDayId, getCurrentDayId } from '@/lib/utils/helpers';

export interface UseDailyProgressOptions {
  /** Day ID (1-180) */
  dayId?: number;
  /** Auto-save setiap perubahan */
  autoSave?: boolean;
  /** Callback ketika progress hari berubah */
  onProgressChange?: (progress: DailyProgress) => void;
}

export interface UseDailyProgressReturn {
  /** Progress hari ini */
  dayProgress: DailyProgress | null;
  /** Loading state */
  isLoading: boolean;
  /** Error state */
  error: Error | null;

  /** Ambil progress hari tertentu */
  getDayProgress: (dayId: number) => DailyProgress | null;
  /** Update progress hari tertentu */
  updateDayProgress: (dayId: number, data: Partial<DailyProgress>) => void;

  /** Update session progress */
  updateSession: (sessionNumber: number, data: Partial<SessionProgress>) => void;
  /** Update subtopic progress */
  updateSubtopic: (subtopicId: string, data: Partial<SubtopicProgress>) => void;
  /** Update quiz progress */
  updateQuiz: (quizId: string, data: Partial<QuizProgress>) => void;
  /** Update practice progress */
  updatePractice: (practiceId: string, data: Partial<PracticeProgress>) => void;
  /** Update assignment progress */
  updateAssignment: (assignmentId: string, data: Partial<AssignmentProgress>) => void;

  /** Update evaluation (understanding, focus, energy) */
  updateEvaluation: (data: { understandingLevel?: number; focusLevel?: number; energyLevel?: number; topicsNeedsReview?: string[]; notes?: string }) => void;

  /** Toggle subtopic completion */
  toggleSubtopic: (subtopicId: string, completed: boolean) => void;

  /** Hari ini selesai? */
  isDayComplete: boolean;
  /** Persentase completion hari ini */
  completionPercentage: number;
  /** Total jam belajar hari ini */
  totalHoursStudied: number;
  /** Jumlah sesi selesai */
  sessionsCompleted: number;
  /** Jumlah subtopik selesai */
  subtopicsCompleted: number;

  /** Refresh dari storage */
  refresh: () => void;
}

/**
 * Hook untuk mengelola progress harian
 */
export function useDailyProgress(options: UseDailyProgressOptions = {}): UseDailyProgressReturn {
  const { dayId = getCurrentDayId(), autoSave = true, onProgressChange } = options;

  const {
    progress: mainProgress,
    getDayProgress: getMainDayProgress,
    updateDayProgress: updateMainDayProgress,
    isLoading: mainLoading,
    error: mainError,
    refresh: mainRefresh,
  } = useProgress({ autoSave });

  const [dayProgress, setDayProgress] = useState<DailyProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  /**
   * Load day progress
   */
  const loadDayProgress = useCallback(() => {
    setIsLoading(true);
    try {
      const progress = getMainDayProgress(dayId);
      setDayProgress(progress);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load day progress'));
    } finally {
      setIsLoading(false);
    }
  }, [dayId, getMainDayProgress]);

  /**
   * Update day progress
   */
  const updateDayProgress = useCallback((dayId: number, data: Partial<DailyProgress>) => {
    updateMainDayProgress(dayId, data);
    const updated = getMainDayProgress(dayId);
    setDayProgress(updated);
    if (updated) {
      onProgressChange?.(updated);
    }
  }, [updateMainDayProgress, getMainDayProgress, onProgressChange]);

  /**
   * Update session progress
   */
  const updateSession = useCallback((sessionNumber: number, data: Partial<SessionProgress>) => {
    if (!dayProgress) return;

    const sessions = [...dayProgress.sessions];
    const index = sessions.findIndex((s) => s.sessionNumber === sessionNumber);

    if (index >= 0) {
      sessions[index] = { ...sessions[index], ...data };
    } else {
      sessions.push({
        sessionNumber,
        sessionId: `session_${sessionNumber}`,
        title: `Sesi ${sessionNumber}`,
        status: 'pending',
        durationMinutes: 0,
        plannedDurationMinutes: 0,
        isBreak: false,
        completedSubtopicIds: [],
        totalSubtopics: 0,
        completionPercentage: 0,
        notes: '',
        resourcesViewed: {
          videoIds: [],
          articleIds: [],
          documentationIds: [],
          interactiveIds: [],
        },
        resourceViewTime: {
          videos: 0,
          articles: 0,
          documentations: 0,
          interactives: 0,
        },
        understandingLevel: 0,
        focusLevel: 0,
        distractionsDuringSession: [],
        quizTaken: false,
        practiceCompleted: false,
        needReview: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        startTime: '',
        endTime: '',
        durationMinutes: 0,
      });
    }

    const updatedDay = {
      ...dayProgress,
      sessions,
      updatedAt: new Date().toISOString(),
    };

    // Update completion
    const completedSessions = updatedDay.sessions.filter((s) => s.status === 'completed').length;
    updatedDay.completionPercentage = updatedDay.sessions.length > 0
      ? (completedSessions / updatedDay.sessions.length) * 100
      : 0;
    updatedDay.isComplete = updatedDay.completionPercentage >= 100;
    updatedDay.status = updatedDay.isComplete ? 'completed' : 'in_progress';

    updateMainDayProgress(dayId, updatedDay);
    setDayProgress(updatedDay);
    onProgressChange?.(updatedDay);
  }, [dayProgress, dayId, updateMainDayProgress, onProgressChange]);

  /**
   * Update subtopic progress
   */
  const updateSubtopic = useCallback((subtopicId: string, data: Partial<SubtopicProgress>) => {
    if (!dayProgress) return;

    const subtopics = [...dayProgress.subtopics];
    const index = subtopics.findIndex((s) => s.subtopicId === subtopicId);

    if (index >= 0) {
      subtopics[index] = { ...subtopics[index], ...data };
    } else {
      subtopics.push({
        subtopicId,
        subtopicName: `Subtopik ${subtopicId}`,
        sessionNumber: 0,
        status: 'not_started',
        timeSpentMinutes: 0,
        estimatedTimeMinutes: 0,
        understandingLevel: 0,
        confidenceLevel: 0,
        isBookmarked: false,
        notes: '',
        keyTakeaways: [],
        questions: [],
        resourcesViewed: [],
        practiceAttempted: false,
        needReview: false,
        reviewCount: 0,
        masteryLevel: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        startTime: '',
        completedAt: '',
        practiceScore: 0,
      });
    }

    const updatedDay = {
      ...dayProgress,
      subtopics,
      updatedAt: new Date().toISOString(),
    };

    updateMainDayProgress(dayId, updatedDay);
    setDayProgress(updatedDay);
    onProgressChange?.(updatedDay);
  }, [dayProgress, dayId, updateMainDayProgress, onProgressChange]);

  /**
   * Toggle subtopic completion
   */
  const toggleSubtopic = useCallback((subtopicId: string, completed: boolean) => {
    if (!dayProgress) return;

    const subtopics = [...dayProgress.subtopics];
    const index = subtopics.findIndex((s) => s.subtopicId === subtopicId);

    if (index >= 0) {
      subtopics[index] = {
        ...subtopics[index],
        status: completed ? 'mastered' : 'not_started',
        updatedAt: new Date().toISOString(),
      };
    }

    const updatedDay = {
      ...dayProgress,
      subtopics,
      updatedAt: new Date().toISOString(),
    };

    updateMainDayProgress(dayId, updatedDay);
    setDayProgress(updatedDay);
    onProgressChange?.(updatedDay);
  }, [dayProgress, dayId, updateMainDayProgress, onProgressChange]);

  /**
   * Update quiz progress
   */
  const updateQuiz = useCallback((quizId: string, data: Partial<QuizProgress>) => {
    if (!dayProgress) return;

    const updatedDay = {
      ...dayProgress,
      quiz: {
        ...dayProgress.quiz,
        ...data,
        updatedAt: new Date().toISOString(),
      },
      updatedAt: new Date().toISOString(),
    };

    updateMainDayProgress(dayId, updatedDay);
    setDayProgress(updatedDay);
    onProgressChange?.(updatedDay);
  }, [dayProgress, dayId, updateMainDayProgress, onProgressChange]);

  /**
   * Update practice progress
   */
  const updatePractice = useCallback((practiceId: string, data: Partial<PracticeProgress>) => {
    if (!dayProgress) return;

    const practices = [...dayProgress.practice];
    const index = practices.findIndex((p) => p.practiceId === practiceId);

    if (index >= 0) {
      practices[index] = { ...practices[index], ...data };
    } else {
      practices.push({
        practiceId,
        title: `Praktik ${practiceId}`,
        sessionNumber: 0,
        status: 'not_started',
        timeSpentMinutes: 0,
        estimatedTimeMinutes: 0,
        attempts: 0,
        isCompleted: false,
        selfAssessment: 0,
        needReview: false,
        notes: '',
        filesSubmitted: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        startTime: '',
        completedAt: '',
        score: 0,
        maxScore: 0,
        percentageScore: 0,
        feedback: '',
        reviewerNotes: '',
        mistakes: [],
        lessonsLearned: [],
        reviewedAt: '',
      });
    }

    const updatedDay = {
      ...dayProgress,
      practice: practices,
      updatedAt: new Date().toISOString(),
    };

    updateMainDayProgress(dayId, updatedDay);
    setDayProgress(updatedDay);
    onProgressChange?.(updatedDay);
  }, [dayProgress, dayId, updateMainDayProgress, onProgressChange]);

  /**
   * Update assignment progress
   */
  const updateAssignment = useCallback((assignmentId: string, data: Partial<AssignmentProgress>) => {
    if (!dayProgress) return;

    const updatedDay = {
      ...dayProgress,
      assignment: {
        ...dayProgress.assignment,
        ...data,
        updatedAt: new Date().toISOString(),
      },
      updatedAt: new Date().toISOString(),
    };

    updateMainDayProgress(dayId, updatedDay);
    setDayProgress(updatedDay);
    onProgressChange?.(updatedDay);
  }, [dayProgress, dayId, updateMainDayProgress, onProgressChange]);

  /**
   * Update evaluation
   */
  const updateEvaluation = useCallback((data: {
    understandingLevel?: number;
    focusLevel?: number;
    energyLevel?: number;
    topicsNeedsReview?: string[];
    notes?: string;
  }) => {
    if (!dayProgress) return;

    const updatedDay = {
      ...dayProgress,
      understandingScore: data.understandingLevel ?? dayProgress.understandingScore,
      focusScore: data.focusLevel ?? dayProgress.focusScore,
      energyScore: data.energyLevel ?? dayProgress.energyScore,
      topicsNeedsReview: data.topicsNeedsReview ?? dayProgress.topicsNeedsReview,
      personalNotes: data.notes ?? dayProgress.personalNotes,
      updatedAt: new Date().toISOString(),
    };

    updateMainDayProgress(dayId, updatedDay);
    setDayProgress(updatedDay);
    onProgressChange?.(updatedDay);
  }, [dayProgress, dayId, updateMainDayProgress, onProgressChange]);

  // Memoized computed values
  const isDayComplete = useMemo(() => {
    return dayProgress?.isComplete || false;
  }, [dayProgress]);

  const completionPercentage = useMemo(() => {
    return dayProgress?.completionPercentage || 0;
  }, [dayProgress]);

  const totalHoursStudied = useMemo(() => {
    return dayProgress ? dayProgress.totalMinutesStudied / 60 : 0;
  }, [dayProgress]);

  const sessionsCompleted = useMemo(() => {
    return dayProgress ? dayProgress.sessions.filter((s) => s.status === 'completed').length : 0;
  }, [dayProgress]);

  const subtopicsCompleted = useMemo(() => {
    return dayProgress ? dayProgress.subtopics.filter((s) => s.status === 'mastered' || s.status === 'understood').length : 0;
  }, [dayProgress]);

  // Load day progress on mount and when dayId changes
  useEffect(() => {
    loadDayProgress();
  }, [loadDayProgress]);

  useEffect(() => {
    setIsLoading(mainLoading);
    setError(mainError);
  }, [mainLoading, mainError]);

  return {
    dayProgress,
    isLoading,
    error,

    getDayProgress: getMainDayProgress,
    updateDayProgress,

    updateSession,
    updateSubtopic,
    updateQuiz,
    updatePractice,
    updateAssignment,

    updateEvaluation,
    toggleSubtopic,

    isDayComplete,
    completionPercentage,
    totalHoursStudied,
    sessionsCompleted,
    subtopicsCompleted,

    refresh: mainRefresh,
  };
}

export default useDailyProgress;
