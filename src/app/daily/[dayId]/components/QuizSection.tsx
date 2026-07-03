'use client';

import { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils/helpers';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Radio } from '@/components/ui/Radio';
import { Alert } from '@/components/ui/Alert';
import { Quiz, QuizProgress, QuizQuestion } from '@/lib/types';

interface QuizSectionProps {
  quiz: Quiz | undefined;
  progress: QuizProgress | undefined;
  onUpdate: (quizId: string, data: Partial<QuizProgress>) => void;
  dayId: number;
  onComplete?: () => void;
}

export function QuizSection({
  quiz,
  progress,
  onUpdate,
  dayId,
  onComplete,
}: QuizSectionProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string | string[]>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(quiz?.timeLimit || 30);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const isCompleted = progress?.status === 'passed' || progress?.status === 'failed';
  const isPassed = progress?.status === 'passed';
  const isInProgress = progress?.status === 'in_progress';
  const isNotStarted = progress?.status === 'not_started';

  const totalQuestions = quiz?.questions?.length || 0;
  const currentQuestion = quiz?.questions?.[currentQuestionIndex];

  useEffect(() => {
    if (isInProgress && isTimerActive && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isInProgress, isTimerActive, timeRemaining]);

  const handleStart = () => {
    onUpdate((quiz as any)?.id || '', {
      status: 'in_progress',
      startTime: new Date().toISOString(),
      timeSpentMinutes: 0,
    });
    setIsTimerActive(true);
    setTimeRemaining(quiz?.timeLimit || 30);
  };

  const handleAnswer = (questionId: string, answer: string | string[]) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowHint(false);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowHint(false);
    }
  };

  const handleSubmit = useCallback(() => {
    setIsSubmitting(true);
    setIsTimerActive(false);

    let correct = 0;
    const answeredQuestions = quiz?.questions?.map((q: any) => {
      const userAnswer = selectedAnswers[q.id] || null;
      const isCorrect = userAnswer === q.correctAnswer;
      if (isCorrect) correct++;
      return {
        questionId: q.id,
        questionText: q.question,
        userAnswer,
        correctAnswer: q.correctAnswer,
        isCorrect,
        timeSpentSeconds: Math.floor((quiz?.timeLimit || 30) - timeRemaining),
        wasSkipped: userAnswer === null,
        wasFlagged: false,
        pointsEarned: isCorrect ? q.points || 10 : 0,
        maxPoints: q.points || 10,
      };
    }) || [];

    const score = totalQuestions > 0 ? (correct / totalQuestions) * 100 : 0;
    const isPassed = score >= (quiz?.passingScore || 70);

    onUpdate((quiz as any)?.id || '', {
      status: isPassed ? 'passed' : 'failed',
      score,
      percentageScore: score,
      isPassed,
      correctAnswers: correct,
      wrongAnswers: totalQuestions - correct,
      skippedQuestions: answeredQuestions.filter(a => a.wasSkipped).length,
      answeredQuestions: answeredQuestions as any,
      timeSpentMinutes: Math.floor((quiz?.timeLimit || 30) - timeRemaining),
      submittedAt: new Date().toISOString(),
      attempts: (progress?.attempts || 0) + 1,
    });

    setIsSubmitted(true);
    setShowResults(true);
    setIsSubmitting(false);

    if (isPassed) {
      onComplete?.();
    }
  }, [quiz, selectedAnswers, timeRemaining, progress?.attempts, onUpdate, onComplete]);

  const handleRetry = () => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setIsSubmitted(false);
    setShowResults(false);
    setTimeRemaining(quiz?.timeLimit || 30);
    setIsTimerActive(true);
    setShowHint(false);

    onUpdate((quiz as any)?.id || '', {
      status: 'in_progress',
      startTime: new Date().toISOString(),
      timeSpentMinutes: 0,
      attempts: (progress?.attempts || 0) + 1,
    });
  };

  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        Tidak ada quiz untuk hari ini
      </div>
    );
  }

  if (isCompleted) {
    return (
      <Card variant="default" padding="lg">
        <div className="text-center">
          <div className="text-6xl mb-4">{isPassed ? '🎉' : '😞'}</div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            {isPassed ? 'Quiz Selesai! 🎉' : 'Quiz Belum Lulus 😞'}
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Nilai: {Math.round(progress?.percentageScore || 0)}%
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {progress?.correctAnswers || 0} benar dari {totalQuestions} soal
          </p>
          <div className="mt-4">
            <ProgressBar
              value={progress?.percentageScore || 0}
              max={100}
              size="md"
              color={isPassed ? 'green' : 'red'}
              showPercentage
            />
          </div>
          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            {!isPassed && (progress?.attempts || 0) < (quiz.maxAttempts || 3) && (
              <Button variant="primary" onClick={handleRetry}>
                🔄 Coba Lagi ({progress?.attempts || 0}/{quiz.maxAttempts || 3})
              </Button>
            )}
            <Button variant="outline" onClick={() => setShowResults(!showResults)}>
              {showResults ? 'Sembunyikan' : 'Lihat Hasil'}
            </Button>
          </div>
          {showResults && (
            <div className="mt-4 text-left space-y-3">
              {quiz.questions.map((q: any, idx: number) => {
                const answer = progress?.answers?.find(a => a.questionId === q.id);
                const isCorrect = answer?.isCorrect;
                return (
                  <div
                    key={q.id}
                    className={cn(
                      'p-3 rounded-lg border-2',
                      isCorrect ? 'border-green-200 bg-green-50 dark:bg-green-950/30' : 'border-red-200 bg-red-50 dark:bg-red-950/30'
                    )}
                  >
                    <div className="flex items-start gap-2">
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        {idx + 1}.
                      </span>
                      <div className="flex-1">
                        <p className="text-sm text-gray-800 dark:text-gray-200">{q.question}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Jawaban kamu: {answer?.userAnswer || 'Tidak dijawab'}
                          {isCorrect ? ' ✅' : ' ❌'}
                        </p>
                        <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                          Jawaban benar: {q.correctAnswer}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {q.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </Card>
    );
  }

  if (isNotStarted) {
    return (
      <Card variant="default" padding="lg">
        <div className="text-center py-8">
          <div className="text-6xl mb-4">🧪</div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Quiz: {quiz.title}</h3>
          <p className="text-gray-500 dark:text-gray-400 mt-2">{quiz.description}</p>
          <div className="flex flex-wrap gap-4 justify-center mt-4 text-sm text-gray-500 dark:text-gray-400">
            <span>📝 {totalQuestions} soal</span>
            <span>⏱️ {quiz.timeLimit} menit</span>
            <span>🎯 {quiz.passingScore}% lulus</span>
            <span>🔄 {quiz.maxAttempts} percobaan</span>
          </div>
          <div className="flex flex-wrap gap-2 justify-center mt-4">
            <Badge variant="secondary" size="sm">
              {(quiz as any).difficulty || 'Menengah'}
            </Badge>
            {(quiz as any).topicsTested?.map((topic: any) => (  <Badge key={topic} variant="secondary" size="sm">
                {topic}
              </Badge>
            ))}
          </div>
          <Button variant="primary" size="lg" className="mt-6" onClick={handleStart}>
            🚀 Mulai Quiz
          </Button>
        </div>
      </Card>
    );
  }

  // In Progress
  return (
    <Card variant="default" padding="lg">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Soal {currentQuestionIndex + 1} dari {totalQuestions}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {quiz.title}
          </p>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-gray-700 dark:text-gray-300">
            ⏱️ {timeRemaining}s
          </div>
          <ProgressBar
            value={((quiz?.timeLimit || 30) - timeRemaining) / (quiz?.timeLimit || 30) * 100}
            max={100}
            size="xs"
            color={timeRemaining < 10 ? 'red' : 'blue'}
            showPercentage={false}
            className="w-24"
          />
        </div>
      </div>

      {currentQuestion && (
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
            <div className="flex items-start gap-2">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                {currentQuestionIndex + 1}.
              </span>
              <div className="flex-1">
                <p className="text-gray-800 dark:text-gray-200">{(currentQuestion as any).question}</p>
                <div className="flex gap-2 mt-1">
                  <Badge variant="secondary" size="xs">
                    {(currentQuestion as any).difficulty || 'Menengah'}
                  </Badge>
                  <Badge variant="secondary" size="xs">
                    {(currentQuestion as any).points || 10} poin
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {(currentQuestion as any).type === 'multiple_choice' && (currentQuestion as any).options && (
            <Radio
              options={(currentQuestion as any).options.map((opt: any) => ({
                value: opt,
                label: opt,
              }))}
              value={selectedAnswers[(currentQuestion as any).id] as string || ''}
              onChange={(value) => handleAnswer((currentQuestion as any).id, value)}
              direction="vertical"
              variant="card"
            />
          )}

          {(currentQuestion as any).type === 'true_false' && (
            <Radio
              options={[
                { value: 'True', label: '✅ Benar' },
                { value: 'False', label: '❌ Salah' },
              ]}
              value={selectedAnswers[(currentQuestion as any).id] as string || ''}
              onChange={(value) => handleAnswer((currentQuestion as any).id, value)}
              direction="horizontal"
              variant="button"
            />
          )}

          {(currentQuestion as any).hint && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowHint(!showHint)}
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
              >
                {showHint ? 'Sembunyikan hint' : '💡 Tampilkan hint'}
              </button>
              {showHint && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {(currentQuestion as any).hint}
                </span>
              )}
            </div>
          )}

          <div className="flex items-center justify-between gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrev}
              disabled={currentQuestionIndex === 0}
            >
              ← Sebelumnya
            </Button>
            <div className="flex gap-2">
              {currentQuestionIndex === totalQuestions - 1 ? (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleSubmit}
                  disabled={isSubmitting || Object.keys(selectedAnswers).length < totalQuestions}
                >
                  {isSubmitting ? '⏳ Menyimpan...' : '📤 Kirim Quiz'}
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleNext}
                  disabled={!selectedAnswers[(currentQuestion as any).id]}
                >
                  Selanjutnya →
                </Button>
              )}
            </div>
          </div>

          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>Terjawab: {Object.keys(selectedAnswers).length}/{totalQuestions}</span>
            <span>Percobaan: {progress?.attempts || 0}/{quiz.maxAttempts || 3}</span>
          </div>
        </div>
      )}
    </Card>
  );
}
