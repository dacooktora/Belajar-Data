'use client';

import { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useDailyProgress } from '@/lib/hooks/useDailyProgress';
import { useHourlyProgress } from '@/lib/hooks/useHourlyProgress';
import { useProgressContext } from '@/app/providers/ProgressProvider';
import { DAY_1 } from '@/lib/data/days';
import { ROADMAP_DATA } from '@/lib/data/roadmap';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Tabs } from '@/components/ui/Tabs';
import { Skeleton } from '@/components/ui/Skeleton';
import { Alert } from '@/components/ui/Alert';
import { DayHeader } from './components/DayHeader';
import { DailySchedule } from './components/DailySchedule';
import { HourlyProgress } from './components/HourlyProgress';
import { TopicDetail } from './components/TopicDetail';
import { PracticeSection } from './components/PracticeSection';
import { QuizSection } from './components/QuizSection';
import { NotesSection } from './components/NotesSection';
import { DailySummary } from './components/DailySummary';
import { SessionCard } from './components/SessionCard';
import { Timer } from './components/Timer';
import { ReflectionForm } from './components/ReflectionForm';
import { DayNavigator } from './components/DayNavigator';
import { getDayId, getMonthFromDayId, getWeekFromDayId, formatDayLabel } from '@/lib/utils/helpers';

interface DailyPageProps {
  params: {
    dayId: string;
  };
}

export default function DailyPage({ params }: DailyPageProps) {
  const dayId = parseInt(params.dayId);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('schedule');
  const [isReflectionOpen, setIsReflectionOpen] = useState(false);
  const [showCompletionCelebration, setShowCompletionCelebration] = useState(false);

  const month = getMonthFromDayId(dayId);
  const week = getWeekFromDayId(dayId);
  const dayInMonth = dayId - (month - 1) * 30;

  const monthData = ROADMAP_DATA[month - 1];
  const dayData = monthData?.weeks?.[week - 1]?.days?.[dayInMonth - 1] || DAY_1;

  const {
    dayProgress,
    isLoading,
    error,
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
    refresh,
  } = useDailyProgress({ dayId, autoSave: true });

  const {
    hourlyProgress,
    startTimer,
    pauseTimer,
    resumeTimer,
    stopTimer,
    skipSession,
    addBreak,
    isTimerRunning,
    elapsedSeconds,
    dayProgress: hourlyDayProgress,
  } = useHourlyProgress({ dayId, totalHours: 10, autoSave: true });

  const { checkAndUpdateStreak } = useProgressContext();

  const totalSessions = dayData?.schedule?.sessions?.length || 8;
  const totalSubtopics = dayData?.schedule?.sessions?.reduce((acc, s) => acc + s.subtopics.length, 0) || 0;

  useEffect(() => {
    if (isDayComplete && !showCompletionCelebration) {
      setShowCompletionCelebration(true);
      checkAndUpdateStreak();
    }
  }, [isDayComplete, showCompletionCelebration, checkAndUpdateStreak]);

  const tabs = [
    {
      id: 'schedule',
      label: '📋 Jadwal',
      content: (
        <DailySchedule
          sessions={dayData?.schedule?.sessions || []}
          dayProgress={dayProgress}
          onUpdateSession={updateSession}
          onStartTimer={startTimer}
          onPauseTimer={pauseTimer}
          onResumeTimer={resumeTimer}
          onStopTimer={stopTimer}
          onSkipSession={skipSession}
          isTimerRunning={isTimerRunning}
          elapsedSeconds={elapsedSeconds}
        />
      ),
    },
    {
      id: 'hourly',
      label: '⏰ Progress Jam',
      content: (
        <HourlyProgress
          hourlyProgress={hourlyProgress}
          dayProgress={dayProgress}
          onStartTimer={startTimer}
          onPauseTimer={pauseTimer}
          onResumeTimer={resumeTimer}
          onStopTimer={stopTimer}
          onSkipSession={skipSession}
          onAddBreak={addBreak}
          isTimerRunning={isTimerRunning}
          elapsedSeconds={elapsedSeconds}
        />
      ),
    },
    {
      id: 'topics',
      label: '📚 Materi',
      badge: dayProgress?.subtopics?.filter(s => s.status === 'mastered' || s.status === 'understood').length || 0,
      content: (
        <div className="space-y-4">
          {dayData?.schedule?.sessions?.map((session) => (
            <div key={session.session} className="space-y-2">
              <h4 className="font-semibold text-gray-900 dark:text-white">
                Sesi {session.session}: {session.topic}
              </h4>
              {session.subtopics.map((subtopic) => {
                const progress = dayProgress?.subtopics?.find(s => s.subtopicId === subtopic.name);
                return (
                  <TopicDetail
                    key={subtopic.name}
                    subtopic={subtopic}
                    progress={progress}
                    onToggleComplete={toggleSubtopic}
                    onUpdateProgress={updateSubtopic}
                    dayId={dayId}
                  />
                );
              })}
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'practice',
      label: '💻 Praktik',
      badge: dayProgress?.practice?.filter(p => p.status === 'completed').length || 0,
      content: (
        <div className="space-y-4">
          {dayData?.schedule?.sessions?.map((session) => (
            session.practice && (
              <PracticeSection
                key={session.session}
                practice={session.practice}
                progress={dayProgress?.practice?.find(p => p.practiceId === session.practice?.id)}
                onUpdate={updatePractice}
                dayId={dayId}
                sessionNumber={session.session}
              />
            )
          ))}
          {!dayData?.schedule?.sessions?.some(s => s.practice) && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              Belum ada latihan praktik untuk hari ini
            </div>
          )}
        </div>
      ),
    },
    {
      id: 'quiz',
      label: '🧪 Quiz',
      badge: dayProgress?.quiz?.status !== 'not_started' ? dayProgress?.quiz?.percentageScore || 0 : undefined,
      content: (
        <QuizSection
          quiz={dayData?.quiz}
          progress={dayProgress?.quiz}
          onUpdate={updateQuiz}
          dayId={dayId}
          onComplete={() => {
            checkAndUpdateStreak();
          }}
        />
      ),
    },
    {
      id: 'notes',
      label: '📝 Catatan',
      content: (
        <NotesSection
          notes={dayProgress?.personalNotes || ''}
          onUpdate={(notes) => updateEvaluation({ notes })}
          dayId={dayId}
        />
      ),
    },
    {
      id: 'summary',
      label: '📊 Ringkasan',
      content: (
        <DailySummary
          dayId={dayId}
          dayProgress={dayProgress}
          dayData={dayData}
          completionPercentage={completionPercentage}
          totalHoursStudied={totalHoursStudied}
          sessionsCompleted={sessionsCompleted}
          totalSessions={totalSessions}
          subtopicsCompleted={subtopicsCompleted}
          totalSubtopics={totalSubtopics}
          onOpenReflection={() => setIsReflectionOpen(true)}
          onUpdateEvaluation={updateEvaluation}
          onRefresh={refresh}
        />
      ),
    },
  ];

  if (isLoading) {
    return <DailyLoading />;
  }

  if (error) {
    return (
      <div className="min-h-screen py-8">
        <div className="container-custom">
          <Alert variant="error" title="Gagal Memuat Hari">
            {error.message || 'Terjadi kesalahan saat memuat data hari ini'}
            <Button variant="primary" size="sm" onClick={refresh} className="mt-2">
              🔄 Coba Lagi
            </Button>
          </Alert>
        </div>
      </div>
    );
  }

  const isPrevDisabled = dayId <= 1;
  const isNextDisabled = dayId >= 180;

  return (
    <div className="min-h-screen py-4">
      <div className="container-custom">
        {/* Day Header */}
        <DayHeader
          dayId={dayId}
          month={month}
          week={week}
          dayInMonth={dayInMonth}
          title={dayData?.title || `Hari ${dayId}`}
          subtitle={dayData?.subtitle || ''}
          completionPercentage={completionPercentage}
          isComplete={isDayComplete}
          onPrev={() => !isPrevDisabled && router.push(`/daily/${dayId - 1}`)}
          onNext={() => !isNextDisabled && router.push(`/daily/${dayId + 1}`)}
          isPrevDisabled={isPrevDisabled}
          isNextDisabled={isNextDisabled}
        />

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {Math.round(completionPercentage)}%
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Progress</div>
          </div>
          <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {totalHoursStudied.toFixed(1)}h
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Jam Belajar</div>
          </div>
          <div className="p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg text-center">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {sessionsCompleted}/{totalSessions}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Sesi</div>
          </div>
          <div className="p-3 bg-orange-50 dark:bg-orange-950/30 rounded-lg text-center">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {subtopicsCompleted}/{totalSubtopics}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Subtopik</div>
          </div>
        </div>

        {/* Completion Celebration */}
        <AnimatePresence>
          {showCompletionCelebration && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              className="mt-4 p-6 bg-green-50 dark:bg-green-950/30 border-2 border-green-500 rounded-xl text-center"
            >
              <div className="text-6xl mb-3">🎉</div>
              <h3 className="text-xl font-bold text-green-700 dark:text-green-300">
                Hari {dayId} Selesai!
              </h3>
              <p className="text-green-600 dark:text-green-400">
                Kamu berhasil menyelesaikan hari ini. Tetap semangat!
              </p>
              <Button
                variant="success"
                size="sm"
                className="mt-3"
                onClick={() => setShowCompletionCelebration(false)}
              >
                ✅ Lanjutkan
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Timer */}
        <div className="mt-4">
          <Timer
            dayId={dayId}
            isRunning={isTimerRunning}
            elapsedSeconds={elapsedSeconds}
            onStart={startTimer}
            onPause={pauseTimer}
            onResume={resumeTimer}
            onStop={stopTimer}
            onSkip={skipSession}
            isComplete={isDayComplete}
          />
        </div>

        {/* Main Tabs */}
        <div className="mt-4">
          <Tabs
            tabs={tabs}
            defaultTab="schedule"
            activeTab={activeTab}
            onChange={setActiveTab}
            variant="box"
            size="md"
          />
        </div>

        {/* Reflection Button */}
        {!isDayComplete && completionPercentage > 0 && (
          <div className="mt-4 text-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsReflectionOpen(true)}
            >
              📝 Buat Refleksi Harian
            </Button>
          </div>
        )}

        {/* Day Navigator */}
        <div className="mt-6">
          <DayNavigator
            currentDay={dayId}
            totalDays={180}
            onPrev={() => !isPrevDisabled && router.push(`/daily/${dayId - 1}`)}
            onNext={() => !isNextDisabled && router.push(`/daily/${dayId + 1}`)}
            isPrevDisabled={isPrevDisabled}
            isNextDisabled={isNextDisabled}
          />
        </div>

        {/* Reflection Modal */}
        <ReflectionForm
          isOpen={isReflectionOpen}
          onClose={() => setIsReflectionOpen(false)}
          dayId={dayId}
          dayData={dayData}
          onSave={(reflection) => {
            updateEvaluation({
              understandingLevel: reflection.understanding,
              focusLevel: reflection.focus,
              energyLevel: reflection.energy,
              topicsNeedsReview: reflection.needsReview,
              notes: reflection.personalNotes,
            });
            setIsReflectionOpen(false);
          }}
        />
      </div>
    </div>
  );
}

function DailyLoading() {
  return (
    <div className="min-h-screen py-4">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <Skeleton variant="text" width="300px" height="32px" />
            <Skeleton variant="text" width="200px" height="20px" className="mt-1" />
          </div>
          <div className="flex gap-2">
            <Skeleton variant="rect" width="80px" height="36px" className="rounded-lg" />
            <Skeleton variant="rect" width="80px" height="36px" className="rounded-lg" />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} variant="rect" height="72px" className="rounded-lg" />
          ))}
        </div>

        <Skeleton variant="rect" height="60px" className="rounded-xl mt-4" />

        <div className="mt-4">
          <div className="flex gap-2 mb-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} variant="rect" width="120px" height="40px" className="rounded-lg" />
            ))}
          </div>
          <Skeleton variant="card" height="400px" className="rounded-xl" />
        </div>
      </div>
    </div>
  );
}
