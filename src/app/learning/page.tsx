'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MonthCard } from '@/components/shared/MonthCard';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { useProgressContext } from '@/app/providers/ProgressProvider';
import { ROADMAP_DATA } from '@/lib/data/roadmap';
import { MONTH_NAMES, MONTH_SUBTITLES, MONTH_COLORS } from '@/lib/utils/constants';

const statusOptions = [
  { value: 'all', label: 'Semua Status' },
  { value: 'completed', label: '✅ Selesai' },
  { value: 'in_progress', label: '🔄 Sedang Berjalan' },
  { value: 'not_started', label: '⏳ Belum Dimulai' },
  { value: 'locked', label: '🔒 Terkunci' },
];

const sortOptions = [
  { value: 'month', label: 'Urutkan Bulan' },
  { value: 'progress', label: 'Progress Tertinggi' },
  { value: 'title', label: 'Judul A-Z' },
];

export default function LearningPage() {
  const { progress } = useProgressContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('month');

  const months = useMemo(() => {
    let filtered = ROADMAP_DATA.map((month, index) => {
      const monthNumber = index + 1;
      const monthProgress = progress?.daily ? Object.values(progress.daily).filter((d: any) => d.month === monthNumber) : [];
      const completedDays = monthProgress.filter((d: any) => d.status === 'completed').length;
      const totalDays = 30;
      const progressPercentage = totalDays > 0 ? (completedDays / totalDays) * 100 : 0;

      let status: 'completed' | 'in_progress' | 'not_started' | 'locked' = 'not_started';
      if (progressPercentage === 100) status = 'completed';
      else if (progressPercentage > 0) status = 'in_progress';
      else if (monthNumber === 1) status = 'not_started';
      else {
        const prevMonth = ROADMAP_DATA[monthNumber - 2];
        if (prevMonth) {
          const prevProgress = progress?.daily ? Object.values(progress.daily).filter(d => d.month === monthNumber - 1) : [];
          const prevCompleted = prevProgress.filter(d => d.status === 'completed').length;
          if (prevCompleted >= 30) status = 'not_started';
          else status = 'locked';
        } else {
          status = 'not_started';
        }
      }

      return {
        month: monthNumber,
        title: month.title || MONTH_NAMES[monthNumber - 1] || `Bulan ${monthNumber}`,
        subtitle: month.subtitle || MONTH_SUBTITLES[monthNumber - 1] || '',
        status,
        progress: progressPercentage,
        totalDays,
        completedDays,
        skills: month.skillsToMaster || [],
        tools: month.toolsUsed || [],
        icon: ['📗', '📘', '📙', '📕', '📚', '🎯'][monthNumber - 1] || '📖',
        color: MONTH_COLORS[monthNumber - 1] || '#3B82F6',
      };
    });

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(month =>
        month.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        month.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        month.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
        month.tools.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(month => month.status === statusFilter);
    }

    // Sort
    switch (sortBy) {
      case 'progress':
        filtered.sort((a, b) => b.progress - a.progress);
        break;
      case 'title':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        filtered.sort((a, b) => a.month - b.month);
        break;
    }

    return filtered;
  }, [progress, searchQuery, statusFilter, sortBy]);

  const totalMonths = ROADMAP_DATA.length;
  const completedMonths = months.filter(m => m.status === 'completed').length;
  const inProgressMonths = months.filter(m => m.status === 'in_progress').length;
  const averageProgress = months.length > 0 ? months.reduce((sum, m) => sum + m.progress, 0) / months.length : 0;

  return (
    <div className="min-h-screen py-8">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              📚 Roadmap Pembelajaran
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              {totalMonths} Bulan • {completedMonths} Selesai • {inProgressMonths} Sedang Berjalan
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="primary" size="lg">
              🎯 {Math.round(averageProgress)}% Progress
            </Badge>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <Input
              placeholder="🔍 Cari bulan, skill, atau tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              variant="default"
              size="md"
            />
          </div>
          <div className="flex gap-4">
            <Select
              options={statusOptions}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              placeholder="Status"
              size="md"
              className="w-40"
            />
            <Select
              options={sortOptions}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              placeholder="Sortir"
              size="md"
              className="w-40"
            />
          </div>
        </div>

        {/* Month Grid */}
        {months.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Tidak ada bulan yang ditemukan
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Coba ubah filter atau kata kunci pencarian
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {months.map((month, index) => (
              <motion.div
                key={month.month}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link href={`/learning/${month.month}`}>
                  <MonthCard
                    month={month.month}
                    title={month.title}
                    subtitle={month.subtitle}
                    status={month.status}
                    progress={month.progress}
                    totalDays={month.totalDays}
                    completedDays={month.completedDays}
                    skills={month.skills}
                    tools={month.tools}
                    icon={month.icon}
                    color={month.color}
                    compact={false}
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-blue-800 dark:text-blue-300">
                💡 Tips Belajar
              </h3>
              <p className="text-sm text-blue-600 dark:text-blue-400">
                Kerjakan 1 hari setiap hari. Konsistensi adalah kunci sukses!
              </p>
            </div>
            <Link href="/daily">
              <Button variant="primary">
                🚀 Mulai Belajar Hari Ini
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
