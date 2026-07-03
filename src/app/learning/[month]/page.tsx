'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Tabs } from '@/components/ui/Tabs';
import { DayCard } from '@/components/shared/DayCard';
import { WeekNavigator } from './components/WeekNavigator';
import { MonthHeader } from './components/MonthHeader';
import { MonthProgress } from './components/MonthProgress';
import { ROADMAP_DATA } from '@/lib/data/roadmap';
import { useProgressContext } from '@/app/providers/ProgressProvider';
import { getDayId, getCurrentDayId } from '@/lib/utils/helpers';

interface MonthPageProps {
  params: {
    month: string;
  };
}

export default function MonthPage({ params }: MonthPageProps) {
  const monthNumber = parseInt(params.month);
  const monthData = ROADMAP_DATA[monthNumber - 1];
  const { progress, dailyProgress, updateDayProgress } = useProgressContext();

  const [activeWeek, setActiveWeek] = useState(1);

  if (!monthData) {
    notFound();
  }

  const month = monthNumber;
  const totalDays = monthData.totalDays || 30;

  // Hitung progress bulan
  const monthProgress = useMemo(() => {
    const days = [];
    for (let d = 1; d <= totalDays; d++) {
      const dayId = getDayId(month, Math.ceil(d / 7), d);
      const dayProgress = progress?.daily[dayId];
      days.push({
        day: d,
        dayId,
        status: dayProgress?.status || 'not_started',
        progress: dayProgress?.completionPercentage || 0,
        title: `Hari ${d}`,
      });
    }
    return days;
  }, [month, totalDays, progress]);

  const completedDays = monthProgress.filter(d => d.status === 'completed').length;
  const inProgressDays = monthProgress.filter(d => d.status === 'in_progress').length;
  const completionPercentage = totalDays > 0 ? (completedDays / totalDays) * 100 : 0;

  // Group days by week
  const weeks = [];
  for (let w = 0; w < Math.ceil(totalDays / 7); w++) {
    const start = w * 7;
    const end = Math.min(start + 7, totalDays);
    weeks.push({
      week: w + 1,
      days: monthProgress.slice(start, end),
    });
  }

  const currentWeek = Math.min(activeWeek, weeks.length);
  const currentWeekData = weeks[currentWeek - 1] || weeks[0];

  // Get current day for this month
  const currentDayId = getCurrentDayId();
  const isCurrentMonth = Math.ceil(currentDayId / 30) === month;

  return (
    <div className="min-h-screen py-8">
      <div className="container-custom">
        {/* Header */}
        <MonthHeader
          month={month}
          title={monthData.title}
          subtitle={monthData.subtitle}
          completionPercentage={completionPercentage}
          completedDays={completedDays}
          totalDays={totalDays}
          skills={monthData.skillsToMaster || []}
          tools={monthData.toolsUsed || []}
        />

        {/* Progress Overview */}
        <div className="mt-6 mb-8">
          <MonthProgress
            month={month}
            completionPercentage={completionPercentage}
            completedDays={completedDays}
            totalDays={totalDays}
            inProgressDays={inProgressDays}
          />
        </div>

        {/* Week Navigator */}
        <div className="mb-6">
          <WeekNavigator
            weeks={weeks.map(w => ({
              week: w.week,
              label: `Minggu ${w.week}`,
              isActive: w.week === activeWeek,
              completionPercentage: w.days.filter(d => d.status === 'completed').length / w.days.length * 100,
            }))}
            activeWeek={activeWeek}
            onWeekChange={setActiveWeek}
          />
        </div>

        {/* Days Grid */}
        {currentWeekData && (
          <motion.div
            key={currentWeekData.week}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Minggu {currentWeekData.week}
              </h3>
              <Badge variant="secondary" size="sm">
                {currentWeekData.days.filter(d => d.status === 'completed').length}/{currentWeekData.days.length} selesai
              </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentWeekData.days.map((day) => {
                const isToday = isCurrentMonth && day.day === currentDayId - (month - 1) * 30;
                const prevDay = monthProgress.find(d => d.day === day.day - 1);
const isLocked = day.day > 1 && prevDay?.status !== 'completed';
            
                return (
                  <motion.div
                    key={day.day}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: day.day * 0.02 }}
                  >
                    <Link href={`/daily/${day.dayId}`}>
                      <DayCard
                        day={day.day}
                        month={month}
                        week={currentWeekData.week}
                        title={`Hari ${day.day}`}
                        status={isLocked ? 'locked' : day.status}
                        progress={day.progress}
                        totalSessions={8}
                        completedSessions={Math.round(day.progress / 100 * 8)}
                        totalHours={10}
                        completedHours={Math.round(day.progress / 100 * 10)}
                        topics={monthData.weeks?.[currentWeekData.week - 1]?.topics?.map(t => t.name) || []}
                        className={isToday ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
                      />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Tips Section */}
        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h4 className="font-semibold text-blue-800 dark:text-blue-300">Tips untuk Bulan {month}</h4>
              <p className="text-sm text-blue-600 dark:text-blue-400">
                {monthData.tips?.join(' ') || 'Kerjakan 1 hari setiap hari. Jangan skip latihan!'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
