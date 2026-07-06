'use client';

import { useMemo, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { Input } from '@/components/ui/Input';
import { ProgressData } from '@/lib/types';
import { cn } from '@/lib/utils/helpers'; // ← TAMBAHKAN

interface WeeklyGoalsProps {
  week: number;
  progress: ProgressData | null;
}

export function WeeklyGoals({ week, progress }: WeeklyGoalsProps) {
  const [goals, setGoals] = useState<string[]>(['Selesaikan semua materi minggu ini', 'Kerjakan quiz dengan nilai > 70%', 'Buat catatan untuk setiap hari']);
  const [newGoal, setNewGoal] = useState('');
  const [completedGoals, setCompletedGoals] = useState<Set<number>>(new Set());

  const weekData = useMemo(() => {
    const month = Math.ceil(week / 4);
    const weekInMonth = ((week - 1) % 4) + 1;
    const startDay = (weekInMonth - 1) * 7 + 1 + (month - 1) * 30;
    const endDay = Math.min(startDay + 6, month * 30);

    let completedDays = 0;
    let totalMinutes = 0;
    let totalSubtopics = 0;
    let completedSubtopics = 0;

    for (let d = startDay; d <= endDay; d++) {
      const dayProgress = progress?.daily[d];
      if (dayProgress?.status === 'completed') completedDays++;
      totalMinutes += dayProgress?.totalMinutesStudied || 0;
      totalSubtopics += dayProgress?.subtopics?.length || 0;
       completedSubtopics += dayProgress?.subtopics?.filter((s: any) => s.status === 'mastered' || s.status === 'understood').length || 0;
    }

    return {
      completedDays,
      totalDays: 7,
      totalHours: totalMinutes / 60,
      subtopicsCompletion: totalSubtopics > 0 ? (completedSubtopics / totalSubtopics) * 100 : 0,
    };
  }, [week, progress]);

  const handleAddGoal = () => {
    if (newGoal.trim()) {
      setGoals([...goals, newGoal.trim()]);
      setNewGoal('');
    }
  };

  const handleToggleGoal = (index: number) => {
    const newCompleted = new Set(completedGoals);
    if (newCompleted.has(index)) {
      newCompleted.delete(index);
    } else {
      newCompleted.add(index);
    }
    setCompletedGoals(newCompleted);
  };

  const handleDeleteGoal = (index: number) => {
    setGoals(goals.filter((_: string, i: number) => i !== index));
    const newCompleted = new Set(completedGoals);
    newCompleted.delete(index);
    setCompletedGoals(newCompleted);
  };

  const completionRate = goals.length > 0 ? (completedGoals.size / goals.length) * 100 : 0;

  return (
    <Card variant="default" padding="lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900 dark:text-white">
          🎯 Goals Mingguan
        </h3>
        <Badge variant={completionRate === 100 ? 'success' : 'primary'} size="sm">
          {Math.round(completionRate)}% selesai
        </Badge>
      </div>

      <div className="space-y-3">
        {goals.map((goal: string, index: number) => (
        <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
            <Checkbox
              checked={completedGoals.has(index)}
              onChange={() => handleToggleGoal(index)}
              className="flex-shrink-0"
            />
            <span className={cn(
              'flex-1 text-sm text-gray-700 dark:text-gray-300',
              completedGoals.has(index) && 'line-through text-gray-400'
            )}>
              {goal}
            </span>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => handleDeleteGoal(index)}
              className="text-gray-400 hover:text-red-500"
            >
              ✕
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <Input
          placeholder="Tambah goal baru..."
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddGoal()}
          className="flex-1"
        />
        <Button variant="primary" size="sm" onClick={handleAddGoal}>
          Tambah
        </Button>
      </div>

      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Progress minggu ini:</span>
          <span className="font-medium text-gray-900 dark:text-white">
            {weekData.completedDays}/{weekData.totalDays} hari • {weekData.totalHours.toFixed(1)} jam
          </span>
        </div>
        <div className="flex justify-between text-sm mt-1">
          <span className="text-gray-600 dark:text-gray-400">Subtopik:</span>
          <span className="font-medium text-gray-900 dark:text-white">
            {Math.round(weekData.subtopicsCompletion)}% selesai
          </span>
        </div>
      </div>
    </Card>
  );
}
