'use client';

import { useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { ProgressData } from '@/lib/types';
import { TOTAL_DAYS, TOTAL_MONTHS } from '@/lib/utils/constants';

interface OverallProgressProps {
  progress: ProgressData | null;
}

export function OverallProgress({ progress }: OverallProgressProps) {
  const stats = useMemo(() => {
    if (!progress) {
      return {
        totalDays: 0,
        completedDays: 0,
        inProgressDays: 0,
        completionPercentage: 0,
        totalHours: 0,
        totalSubtopics: 0,
        completedSubtopics: 0,
        totalQuizzes: 0,
        quizzesTaken: 0,
        quizzesPassed: 0,
        totalPractices: 0,
        practicesCompleted: 0,
        totalAssignments: 0,
        assignmentsSubmitted: 0,
        assignmentsAccepted: 0,
      };
    }

    const dailyEntries = Object.values(progress.daily);
    const totalDays = dailyEntries.length;
    const completedDays = dailyEntries.filter(d => d.status === 'completed').length;
    const inProgressDays = dailyEntries.filter(d => d.status === 'in_progress').length;
    const totalHours = dailyEntries.reduce((sum, d) => sum + d.totalMinutesStudied / 60, 0);
    const totalSubtopics = dailyEntries.reduce((sum, d) => sum + d.subtopics.length, 0);
    const completedSubtopics = dailyEntries.reduce(
      (sum, d) => sum + d.subtopics.filter(s => s.status === 'mastered' || s.status === 'understood').length,
      0
    );
    const totalQuizzes = dailyEntries.filter(d => d.quiz.quizId).length;
    const quizzesTaken = dailyEntries.filter(d => d.quiz.status !== 'not_started').length;
    const quizzesPassed = dailyEntries.filter(d => d.quiz.status === 'passed').length;
    const totalPractices = dailyEntries.reduce((sum, d) => sum + d.practice.length, 0);
    const practicesCompleted = dailyEntries.reduce(
      (sum, d) => sum + d.practice.filter(p => p.status === 'completed').length,
      0
    );
    const assignmentsSubmitted = dailyEntries.filter(d => d.assignment.status !== 'not_started').length;
    const assignmentsAccepted = dailyEntries.filter(d => d.assignment.status === 'accepted').length;

    return {
      totalDays,
      completedDays,
      inProgressDays,
      completionPercentage: totalDays > 0 ? (completedDays / totalDays) * 100 : 0,
      totalHours,
      totalSubtopics,
      completedSubtopics,
      subtopicsPercentage: totalSubtopics > 0 ? (completedSubtopics / totalSubtopics) * 100 : 0,
      totalQuizzes,
      quizzesTaken,
      quizzesPassed,
      quizPassRate: quizzesTaken > 0 ? (quizzesPassed / quizzesTaken) * 100 : 0,
      totalPractices,
      practicesCompleted,
      practicesPercentage: totalPractices > 0 ? (practicesCompleted / totalPractices) * 100 : 0,
      totalAssignments: totalDays,
      assignmentsSubmitted,
      assignmentsPercentage: totalDays > 0 ? (assignmentsSubmitted / totalDays) * 100 : 0,
      assignmentsAccepted,
    };
  }, [progress]);

  const getOverallStatus = () => {
    if (stats.completionPercentage === 100) return { label: '🎉 Lulus!', variant: 'success' as const };
    if (stats.completionPercentage >= 70) return { label: '✅ On Track', variant: 'primary' as const };
    if (stats.completionPercentage >= 40) return { label: '🔄 Sedang Berjalan', variant: 'warning' as const };
    return { label: '⏳ Baru Mulai', variant: 'secondary' as const };
  };

  const status = getOverallStatus();

  const monthProgress = [];
  for (let m = 1; m <= TOTAL_MONTHS; m++) {
    const startDay = (m - 1) * 30 + 1;
    const endDay = m * 30;
    let completed = 0;
    let total = 0;
    for (let d = startDay; d <= endDay; d++) {
      const dayProgress = progress?.daily[d];
      if (dayProgress) {
        total++;
        if (dayProgress.status === 'completed') completed++;
      }
    }
    monthProgress.push({
      month: m,
      completed,
      total: total || 30,
      percentage: (total > 0 ? (completed / total) * 100 : 0),
    });
  }

  return (
    <Card variant="elevated" padding="lg">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">
            🏆 Progress Keseluruhan
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {stats.completedDays} dari {TOTAL_DAYS} hari selesai
          </p>
        </div>
        <Badge variant={status.variant} size="lg">
          {status.label}
        </Badge>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {Math.round(stats.completionPercentage)}%
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Progress</div>
        </div>
        <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {stats.totalHours.toFixed(1)}h
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Total Jam</div>
        </div>
        <div className="p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg text-center">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {stats.completedSubtopics}/{stats.totalSubtopics}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Subtopik</div>
        </div>
        <div className="p-3 bg-orange-50 dark:bg-orange-950/30 rounded-lg text-center">
          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
            {stats.quizzesPassed}/{stats.quizzesTaken}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Quiz</div>
        </div>
      </div>

      <ProgressBar
        value={stats.completionPercentage}
        max={100}
        size="lg"
        color={stats.completionPercentage === 100 ? 'green' : 'blue'}
        showPercentage
        label="Total Progress"
      />

      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
        <div className="p-2 bg-gray-50 dark:bg-gray-900/50 rounded-lg text-center">
          <span className="text-xs text-gray-500 dark:text-gray-400">Hari Berjalan</span>
          <div className="font-semibold text-gray-900 dark:text-white">{stats.inProgressDays}</div>
        </div>
        <div className="p-2 bg-gray-50 dark:bg-gray-900/50 rounded-lg text-center">
          <span className="text-xs text-gray-500 dark:text-gray-400">Tugas Dikirim</span>
          <div className="font-semibold text-gray-900 dark:text-white">
            {Math.round(stats.practicesPercentage || 0)}%
          </div>
        </div>
        <div className="p-2 bg-gray-50 dark:bg-gray-900/50 rounded-lg text-center">
          <span className="text-xs text-gray-500 dark:text-gray-400">Praktik</span>
          <div className="font-semibold text-gray-900 dark:text-white">
            {Math.round(stats.practicesPercentage || 0)}%
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Progress per Bulan</h4>
        <div className="space-y-2">
          {monthProgress.map((m: any) => (
            <div key={m.month} className="flex items-center gap-3">
              <div className="flex-shrink-0 w-16 text-xs text-gray-500 dark:text-gray-400">
                Bulan {m.month}
              </div>
              <div className="flex-1 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                   style={{ width: `${Math.min(m.percentage || 0, 100)}%` }}
                />
              </div>
              <div className="flex-shrink-0 w-12 text-right text-xs font-medium text-gray-700 dark:text-gray-300">
                {Math.round(m.percentage || 0)}%
              </div>
              <div className="flex-shrink-0 w-12 text-right text-xs text-gray-400">
                {m.completed}/{m.total}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
