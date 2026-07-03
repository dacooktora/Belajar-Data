import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useDailyProgress } from './useDailyProgress';
import { SessionProgress } from '@/lib/types/progress.types';

export interface UseHourlyProgressOptions {
  /** Day ID (1-180) */
  dayId?: number;
  /** Total jam belajar per hari (default: 10) */
  totalHours?: number;
  /** Auto-save setiap perubahan */
  autoSave?: boolean;
  /** Callback ketika progress berubah */
  onProgressChange?: (progress: HourlyProgressData) => void;
}

export interface HourlyProgressData {
  /** Progress per jam (0-9) */
  hours: {
    hour: number;
    sessionNumber: number;
    timeRange: string;
    status: 'pending' | 'in_progress' | 'completed' | 'skipped';
    minutesStudied: number;
    minutesPlanned: number;
    isBreak: boolean;
    notes: string;
  }[];
  /** Total waktu belajar */
  totalMinutesStudied: number;
  /** Total waktu break */
  totalBreakMinutes: number;
  /** Status hari */
  dayStatus: 'not_started' | 'in_progress' | 'completed' | 'reviewing';
  /** Timer state */
  timer: {
    isRunning: boolean;
    startTime: string | null;
    elapsedSeconds: number;
    currentHour: number;
    currentSession: number;
  };
}

export interface UseHourlyProgressReturn {
  /** Data progress per jam */
  hourlyProgress: HourlyProgressData | null;
  /** Loading state */
  isLoading: boolean;
  /** Error state */
  error: Error | null;

  /** Mulai timer belajar */
  startTimer: () => void;
  /** Pause timer */
  pauseTimer: () => void;
  /** Resume timer */
  resumeTimer: () => void;
  /** Stop timer dan complete session */
  stopTimer: () => void;
  /** Skip session */
  skipSession: () => void;
  /** Tambah break */
  addBreak: (minutes: number) => void;

  /** Ambil progress session tertentu */
  getSessionProgress: (sessionNumber: number) => HourlyProgressData['hours'][0] | null;
  /** Update session progress */
  updateSessionProgress: (sessionNumber: number, data: Partial<HourlyProgressData['hours'][0]>) => void;

  /** Total waktu belajar (dalam menit) */
  totalStudyMinutes: number;
  /** Total break (dalam menit) */
  totalBreakMinutes: number;
  /** Session saat ini */
  currentSession: number;
  /** Status session saat ini */
  currentSessionStatus: 'pending' | 'in_progress' | 'completed' | 'skipped';
  /** Apakah timer sedang berjalan */
  isTimerRunning: boolean;
  /** Waktu berlalu (detik) */
  elapsedSeconds: number;
  /** Progress persentase hari ini */
  dayProgress: number;
  /** Jam yang sudah selesai */
  completedHours: number;

  /** Refresh dari storage */
  refresh: () => void;
}

/**
 * Hook untuk mengelola progress per jam (10 jam/hari)
 */
export function useHourlyProgress(options: UseHourlyProgressOptions = {}): UseHourlyProgressReturn {
  const {
    dayId = 1,
    totalHours = 10,
    autoSave = true,
    onProgressChange,
  } = options;

  const {
    dayProgress,
    updateSession: updateMainSession,
    isLoading: dailyLoading,
    error: dailyError,
    refresh: dailyRefresh,
  } = useDailyProgress({ dayId, autoSave });

  const [hourlyProgress, setHourlyProgress] = useState<HourlyProgressData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);

  const timerRef = useRef<{
    isRunning: boolean;
    startTime: number | null;
    elapsedSeconds: number;
    currentHour: number;
    currentSession: number;
  }>({
    isRunning: false,
    startTime: null,
    elapsedSeconds: 0,
    currentHour: 0,
    currentSession: 1,
  });

  /**
   * Generate default hourly progress
   */
  const generateDefaultHourly = useCallback((): HourlyProgressData => {
    const hours = [];
    const startHour = 8; // 08:00

    for (let i = 0; i < totalHours; i++) {
      const hour = startHour + i;
      const isBreak = i === 1 || i === 3 || i === 5; // Break di jam 2, 4, 6 (10:00, 12:30, 15:30)

      // Map ke session number
      let sessionNumber = i + 1;
      if (isBreak) {
        sessionNumber = i + 1;
      } else {
        // Hitung session belajar berdasarkan jam
        const studySessions = i - Math.floor((i + 1) / 2);
        sessionNumber = Math.min(studySessions + 1, 8);
      }

      hours.push({
        hour: i,
        sessionNumber,
        timeRange: `${String(hour).padStart(2, '0')}:00 - ${String(hour + 1).padStart(2, '0')}:00`,
        status: 'pending' as const,
        minutesStudied: 0,
        minutesPlanned: isBreak ? 30 : 60,
        isBreak,
        notes: isBreak ? 'Istirahat' : '',
      });
    }

    return {
      hours,
      totalMinutesStudied: 0,
      totalBreakMinutes: 0,
      dayStatus: 'not_started',
      timer: {
        isRunning: false,
        startTime: null,
        elapsedSeconds: 0,
        currentHour: 0,
        currentSession: 1,
      },
    };
  }, [totalHours]);

  /**
   * Load hourly progress from day progress
   */
  const loadHourlyProgress = useCallback(() => {
    setIsLoading(true);
    try {
      if (dayProgress) {
        // Extract session data from day progress
        const hours = [];
        const startHour = 8;
        let totalMinutes = 0;
        let breakMinutes = 0;

        for (let i = 0; i < totalHours; i++) {
          const hour = startHour + i;
          const isBreak = i === 1 || i === 3 || i === 5;

          let sessionNumber = i + 1;
          if (isBreak) {
            sessionNumber = i + 1;
          } else {
            const studySessions = i - Math.floor((i + 1) / 2);
            sessionNumber = Math.min(studySessions + 1, 8);
          }

          // Cari session di day progress
          const session = dayProgress.sessions.find((s) => s.sessionNumber === sessionNumber);

          const sessionStatus = session?.status || 'pending';
          const minutesStudied = session?.durationMinutes || 0;

          if (!isBreak) {
            totalMinutes += minutesStudied;
          } else {
            breakMinutes += minutesStudied || 30;
          }

          hours.push({
            hour: i,
            sessionNumber,
            timeRange: `${String(hour).padStart(2, '0')}:00 - ${String(hour + 1).padStart(2, '0')}:00`,
            status: sessionStatus as 'pending' | 'in_progress' | 'completed' | 'skipped',
            minutesStudied,
            minutesPlanned: isBreak ? 30 : 60,
            isBreak,
            notes: session?.notes || (isBreak ? 'Istirahat' : ''),
          });
        }

        setHourlyProgress({
          hours,
          totalMinutesStudied: totalMinutes,
          totalBreakMinutes: breakMinutes,
          dayStatus: dayProgress.status,
          timer: {
            isRunning: timerRef.current.isRunning,
            startTime: timerRef.current.startTime ? new Date(timerRef.current.startTime).toISOString() : null,
            elapsedSeconds: timerRef.current.elapsedSeconds,
            currentHour: timerRef.current.currentHour,
            currentSession: timerRef.current.currentSession,
          },
        });
        setError(null);
      } else {
        const defaultProgress = generateDefaultHourly();
        setHourlyProgress(defaultProgress);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load hourly progress'));
    } finally {
      setIsLoading(false);
    }
  }, [dayProgress, totalHours, generateDefaultHourly]);

  /**
   * Start timer
   */
  const startTimer = useCallback(() => {
    if (!hourlyProgress) return;

    // Cek apakah hari sudah selesai
    if (hourlyProgress.dayStatus === 'completed') return;

    // Cek apakah masih ada session yang belum selesai
    const pendingSessions = hourlyProgress.hours.filter((h) => h.status === 'pending' || h.status === 'in_progress');
    if (pendingSessions.length === 0) return;

    timerRef.current.isRunning = true;
    timerRef.current.startTime = Date.now();

    // Update current session
    const currentHour = hourlyProgress.hours.findIndex((h) => h.status === 'pending' || h.status === 'in_progress');
    if (currentHour >= 0) {
      timerRef.current.currentHour = currentHour;
      timerRef.current.currentSession = hourlyProgress.hours[currentHour].sessionNumber;

      // Update session status to in_progress
      const updatedHours = [...hourlyProgress.hours];
      updatedHours[currentHour] = {
        ...updatedHours[currentHour],
        status: 'in_progress',
      };

      const updatedProgress = {
        ...hourlyProgress,
        hours: updatedHours,
        timer: {
          ...hourlyProgress.timer,
          isRunning: true,
          startTime: new Date(Date.now()).toISOString(),
        },
        dayStatus: 'in_progress' as const,
      };

      setHourlyProgress(updatedProgress);
      onProgressChange?.(updatedProgress);

      // Update main progress
      updateMainSession(
        updatedHours[currentHour].sessionNumber,
        {
          status: 'in_progress',
          startTime: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      );
    }

    // Start timer interval
    if (timerInterval) {
      clearInterval(timerInterval);
    }

    const interval = setInterval(() => {
      if (timerRef.current.isRunning && timerRef.current.startTime) {
        timerRef.current.elapsedSeconds = Math.floor((Date.now() - timerRef.current.startTime) / 1000);

        // Update progress
        setHourlyProgress((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            timer: {
              ...prev.timer,
              elapsedSeconds: timerRef.current.elapsedSeconds,
            },
          };
        });
      }
    }, 1000);

    setTimerInterval(interval);
  }, [hourlyProgress, updateMainSession, onProgressChange, timerInterval]);

  /**
   * Pause timer
   */
  const pauseTimer = useCallback(() => {
    timerRef.current.isRunning = false;
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }

    setHourlyProgress((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        timer: {
          ...prev.timer,
          isRunning: false,
        },
      };
    });
  }, [timerInterval]);

  /**
   * Resume timer
   */
  const resumeTimer = useCallback(() => {
    if (!hourlyProgress) return;
    if (hourlyProgress.dayStatus === 'completed') return;

    timerRef.current.isRunning = true;
    timerRef.current.startTime = Date.now() - timerRef.current.elapsedSeconds * 1000;

    // Start timer interval
    if (timerInterval) {
      clearInterval(timerInterval);
    }

    const interval = setInterval(() => {
      if (timerRef.current.isRunning && timerRef.current.startTime) {
        timerRef.current.elapsedSeconds = Math.floor((Date.now() - timerRef.current.startTime) / 1000);

        setHourlyProgress((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            timer: {
              ...prev.timer,
              isRunning: true,
              elapsedSeconds: timerRef.current.elapsedSeconds,
            },
          };
        });
      }
    }, 1000);

    setTimerInterval(interval);

    setHourlyProgress((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        timer: {
          ...prev.timer,
          isRunning: true,
        },
      };
    });
  }, [hourlyProgress, timerInterval]);

  /**
   * Stop timer dan complete session
   */
  const stopTimer = useCallback(() => {
    if (!hourlyProgress) return;

    pauseTimer();

    // Complete current session
    const currentHour = timerRef.current.currentHour;
    if (currentHour >= 0 && currentHour < hourlyProgress.hours.length) {
      const elapsedMinutes = Math.floor(timerRef.current.elapsedSeconds / 60);
      const completedMinutes = Math.min(elapsedMinutes, hourlyProgress.hours[currentHour].minutesPlanned);

      const updatedHours = [...hourlyProgress.hours];
      updatedHours[currentHour] = {
        ...updatedHours[currentHour],
        status: 'completed' as const,
        minutesStudied: completedMinutes,
        notes: completedMinutes >= updatedHours[currentHour].minutesPlanned
          ? 'Selesai tepat waktu'
          : `Selesai ${completedMinutes}/${updatedHours[currentHour].minutesPlanned} menit`,
      };

      // Update total minutes
      let totalMinutes = 0;
      let breakMinutes = 0;
      updatedHours.forEach((h) => {
        if (h.isBreak) {
          breakMinutes += h.minutesStudied;
        } else {
          totalMinutes += h.minutesStudied;
        }
      });

      const allComplete = updatedHours.every((h) => h.status === 'completed' || h.isBreak);
      const dayStatus = allComplete ? 'completed' : 'in_progress';

      const updatedProgress = {
        ...hourlyProgress,
        hours: updatedHours,
        totalMinutesStudied: totalMinutes,
        totalBreakMinutes: breakMinutes,
        dayStatus: dayStatus as 'not_started' | 'in_progress' | 'completed' | 'reviewing',
        timer: {
          ...hourlyProgress.timer,
          isRunning: false,
          elapsedSeconds: 0,
        },
      };

      setHourlyProgress(updatedProgress);
      onProgressChange?.(updatedProgress);

      // Update main progress
      updateMainSession(
        updatedHours[currentHour].sessionNumber,
        {
          status: 'completed' as const,
          durationMinutes: completedMinutes,
          endTime: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      );

      // Reset timer ref
      timerRef.current = {
        isRunning: false,
        startTime: null,
        elapsedSeconds: 0,
        currentHour: currentHour + 1,
        currentSession: hourlyProgress.hours[currentHour].sessionNumber + 1,
      };
    }
  }, [hourlyProgress, pauseTimer, updateMainSession, onProgressChange]);

  /**
   * Skip session
   */
  const skipSession = useCallback(() => {
    if (!hourlyProgress) return;

    const currentHour = timerRef.current.currentHour;
    if (currentHour >= 0 && currentHour < hourlyProgress.hours.length) {
      const updatedHours = [...hourlyProgress.hours];
      updatedHours[currentHour] = {
        ...updatedHours[currentHour],
        status: 'skipped' as const,
        notes: 'Dilewati',
      };

      const updatedProgress = {
        ...hourlyProgress,
        hours: updatedHours,
        timer: {
          ...hourlyProgress.timer,
          currentHour: currentHour + 1,
        },
      };

      setHourlyProgress(updatedProgress);
      onProgressChange?.(updatedProgress);

      // Update main progress
      updateMainSession(
        updatedHours[currentHour].sessionNumber,
        {
          status: 'skipped' as const,
          updatedAt: new Date().toISOString(),
        }
      );
    }
  }, [hourlyProgress, updateMainSession, onProgressChange]);

  /**
   * Tambah break
   */
  const addBreak = useCallback((minutes: number) => {
    if (!hourlyProgress) return;

    const updatedHours = [...hourlyProgress.hours];
    let breakAdded = false;

    // Cari break yang belum diisi
    for (let i = 0; i < updatedHours.length; i++) {
      if (updatedHours[i].isBreak && updatedHours[i].minutesStudied === 0) {
        updatedHours[i] = {
          ...updatedHours[i],
          minutesStudied: minutes,
          status: 'completed' as const,
          notes: `Break ${minutes} menit`,
        };
        breakAdded = true;
        break;
      }
    }

    if (!breakAdded) {
      // Cari break yang sudah diisi tapi mau ditambah
      for (let i = 0; i < updatedHours.length; i++) {
        if (updatedHours[i].isBreak) {
          updatedHours[i] = {
            ...updatedHours[i],
            minutesStudied: updatedHours[i].minutesStudied + minutes,
            notes: `Break ${updatedHours[i].minutesStudied + minutes} menit`,
          };
          breakAdded = true;
          break;
        }
      }
    }

    if (breakAdded) {
      let breakMinutes = 0;
      updatedHours.forEach((h) => {
        if (h.isBreak) {
          breakMinutes += h.minutesStudied;
        }
      });

      const updatedProgress = {
        ...hourlyProgress,
        hours: updatedHours,
        totalBreakMinutes: breakMinutes,
      };

      setHourlyProgress(updatedProgress);
      onProgressChange?.(updatedProgress);
    }
  }, [hourlyProgress, onProgressChange]);

  /**
   * Get session progress
   */
  const getSessionProgress = useCallback((sessionNumber: number): HourlyProgressData['hours'][0] | null => {
    if (!hourlyProgress) return null;
    return hourlyProgress.hours.find((h) => h.sessionNumber === sessionNumber) || null;
  }, [hourlyProgress]);

  /**
   * Update session progress
   */
  const updateSessionProgress = useCallback((sessionNumber: number, data: Partial<HourlyProgressData['hours'][0]>) => {
    if (!hourlyProgress) return;

    const updatedHours = [...hourlyProgress.hours];
    const index = updatedHours.findIndex((h) => h.sessionNumber === sessionNumber);

    if (index >= 0) {
      updatedHours[index] = { ...updatedHours[index], ...data };

      // Update total minutes
      let totalMinutes = 0;
      let breakMinutes = 0;
      updatedHours.forEach((h) => {
        if (h.isBreak) {
          breakMinutes += h.minutesStudied;
        } else {
          totalMinutes += h.minutesStudied;
        }
      });

      const allComplete = updatedHours.every((h) => h.status === 'completed' || h.isBreak);
      const dayStatus = allComplete ? 'completed' : 'in_progress';

      const updatedProgress = {
        ...hourlyProgress,
        hours: updatedHours,
        totalMinutesStudied: totalMinutes,
        totalBreakMinutes: breakMinutes,
        dayStatus: dayStatus as 'not_started' | 'in_progress' | 'completed' | 'reviewing',
      };

      setHourlyProgress(updatedProgress);
      onProgressChange?.(updatedProgress);
    }
  }, [hourlyProgress, onProgressChange]);

  // Memoized computed values
  const totalStudyMinutes = useMemo(() => {
    return hourlyProgress?.totalMinutesStudied || 0;
  }, [hourlyProgress]);

  const totalBreakMinutes = useMemo(() => {
    return hourlyProgress?.totalBreakMinutes || 0;
  }, [hourlyProgress]);

  const currentSession = useMemo(() => {
    return timerRef.current.currentSession;
  }, []);

  const currentSessionStatus = useMemo(() => {
    if (!hourlyProgress) return 'pending';
    const current = hourlyProgress.hours.find((h) => h.sessionNumber === timerRef.current.currentSession);
    return current?.status || 'pending';
  }, [hourlyProgress]);

  const isTimerRunning = useMemo(() => {
    return timerRef.current.isRunning;
  }, []);

  const elapsedSeconds = useMemo(() => {
    return timerRef.current.elapsedSeconds;
  }, []);

  const dayCompletion = useMemo(() => {
    if (!hourlyProgress) return 0;
    const total = hourlyProgress.hours.filter((h) => !h.isBreak).length;
    const completed = hourlyProgress.hours.filter((h) => !h.isBreak && h.status === 'completed').length;
    return total > 0 ? (completed / total) * 100 : 0;
  }, [hourlyProgress]);

  const completedHours = useMemo(() => {
    if (!hourlyProgress) return 0;
    return hourlyProgress.hours.filter((h) => !h.isBreak && h.status === 'completed').length;
  }, [hourlyProgress]);

  // Load on mount
  useEffect(() => {
    loadHourlyProgress();
  }, [loadHourlyProgress]);

  useEffect(() => {
    setIsLoading(dailyLoading);
    setError(dailyError);
  }, [dailyLoading, dailyError]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [timerInterval]);

  return {
    hourlyProgress,
    isLoading,
    error,

    startTimer,
    pauseTimer,
    resumeTimer,
    stopTimer,
    skipSession,
    addBreak,

    getSessionProgress,
    updateSessionProgress,

    totalStudyMinutes,
    totalBreakMinutes,
    currentSession,
    currentSessionStatus,
    isTimerRunning,
    elapsedSeconds,
    dayProgress,
    completedHours,

    refresh: dailyRefresh,
  };
}

export default useHourlyProgress;
