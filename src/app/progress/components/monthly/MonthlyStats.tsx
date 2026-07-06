'use client';

import { useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressData } from '@/lib/types';

interface MonthlyStatsProps {
  month: number;
  progress: ProgressData | null;
}

export function MonthlyStats({ month, progress }: MonthlyStatsProps) {
  const stats = useMemo(() => {
    const startDay = (month - 1) * 30 + 1;
    const endDay = month * 30;

    let totalMinutes = 0;
    let completedDays = 0;
    let totalSubtopics = 0;
    let completedSubtopics = 0;
    let totalQuizzes = 0;
    let quizzesTaken = 0;
    let quizzesPassed = 0;
    let quizScores: number[] = [];
    let totalPractices = 0;
    let practicesCompleted = 0;
    let totalAssignments = 0;
    let assignmentsSubmitted = 0;

    for (let d = startDay; d <= endDay; d++) {
      const dayProgress = progress?.daily[d];
      if (dayProgress) {
        if (dayProgress.status === 'completed') completedDays++;
        totalMinutes += dayProgress.totalMinutesStudied || 0;

        totalSubtopics += dayProgress.subtopics?.length || 0;
        completedSubtopics += dayProgress.subtopics?.filter((s: any) => s.status === 'mastered' || s.status === 'understood').length || 0;
        
        if (dayProgress.quiz?.quizId) {
          totalQuizzes++;
          if (dayProgress.quiz.status !== 'not_started') {
            quizzesTaken++;
            if (dayProgress.quiz.status === 'passed') quizzesPassed++;
            if (dayProgress.quiz.score) quizScores.push(dayProgress.quiz.score);
          }
        }

        totalPractices += dayProgress.practice?.length || 0;
        practicesCompleted += dayProgress.practice?.filter((p: any) => p.status === 'completed').length || 0;
        

        if (dayProgress.assignment?.assignmentId) {
          totalAssignments++;
          if (dayProgress.assignment.status !== 'not_started') assignmentsSubmitted++;
        }
      }
    }

    const totalHours = totalMinutes / 60;
    const avgScore = quizScores.length > 0 ? quizScores.reduce((a, b) => a + b, 0) / quizScores.length : 0;

    return {
      completedDays,
      totalDays: 30,
      completionPercentage: (completedDays / 30) * 100,
      totalHours,
      totalSubtopics,
      completedSubtopics,
      subtopicsPercentage: totalSubtopics > 0 ? (completedSubtopics / totalSubtopics) * 100 : 0,
      totalQuizzes,
      quizzesTaken,
      quizzesPassed,
      avgQuizScore: avgScore,
      totalPractices,
      practicesCompleted,
      practicesPercentage: totalPractices > 0 ? (practicesCompleted / totalPractices) * 100 : 0,
      totalAssignments,
      assignmentsSubmitted,
      assignmentsPercentage: totalAssignments > 0 ? (assignmentsSubmitted / totalAssignments) * 100 : 0,
    };
  }, [month, progress]);

  return (
    <Card variant="default" padding="lg">
      <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
        📊 Statistik Bulan {month}
      </h3>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
            <div className="text-sm text-gray-500 dark:text-gray-400">Hari Selesai</div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {stats.completedDays}/{stats.totalDays}
            </div>
            <div className="text-xs text-gray-400">{Math.round(stats.completionPercentage)}%</div>
          </div>
          <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg">
            <div className="text-sm text-gray-500 dark:text-gray-400">Total Jam</div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {stats.totalHours.toFixed(1)}h
            </div>
            <div className="text-xs text-gray-400">Rata-rata {(stats.totalHours / stats.totalDays).toFixed(1)}h/hari</div>
          </div>
          <div className="p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
            <div className="text-sm text-gray-500 dark:text-gray-400">Subtopik</div>
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {stats.completedSubtopics}/{stats.totalSubtopics}
            </div>
            <div className="text-xs text-gray-400">{Math.round(stats.subtopicsPercentage)}% selesai</div>
          </div>
          <div className="p-3 bg-orange-50 dark:bg-orange-950/30 rounded-lg">
            <div className="text-sm text-gray-500 dark:text-gray-400">Quiz</div>
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {stats.quizzesPassed}/{stats.quizzesTaken}
            </div>
            <div className="text-xs text-gray-400">Nilai rata-rata {Math.round(stats.avgQuizScore)}%</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-indigo-50 dark:bg-indigo-950/30 rounded-lg">
            <div className="text-sm text-gray-500 dark:text-gray-400">Praktik</div>
            <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              {stats.practicesCompleted}/{stats.totalPractices}
            </div>
            <div className="text-xs text-gray-400">{Math.round(stats.practicesPercentage)}% selesai</div>
          </div>
          <div className="p-3 bg-pink-50 dark:bg-pink-950/30 rounded-lg">
            <div className="text-sm text-gray-500 dark:text-gray-400">Tugas</div>
            <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">
              {stats.assignmentsSubmitted}/{stats.totalAssignments}
            </div>
            <div className="text-xs text-gray-400">{Math.round(stats.assignmentsPercentage)}% dikirim</div>
          </div>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
          <h4 className="font-medium text-gray-700 dark:text-gray-300 text-sm mb-2">📌 Ringkasan</h4>
          <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
            <li>• {stats.completedDays} dari {stats.totalDays} hari selesai</li>
            <li>• Total belajar {stats.totalHours.toFixed(1)} jam</li>
            <li>• {stats.completedSubtopics} subtopik dikuasai</li>
            <li>• {stats.quizzesPassed} quiz berhasil dilewati</li>
            {stats.completionPercentage >= 80 && (
              <li className="text-green-600">✅ Bulan ini berjalan dengan baik!</li>
            )}
            {stats.completionPercentage < 50 && stats.completedDays > 0 && (
              <li className="text-yellow-600">⚠️ Perlu meningkatkan konsistensi belajar</li>
            )}
            {stats.completedDays === 0 && (
              <li className="text-gray-400">⏳ Belum ada aktivitas di bulan ini</li>
            )}
          </ul>
        </div>
      </div>
    </Card>
  );
}
