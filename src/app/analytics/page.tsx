'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useAnalytics } from '@/lib/hooks/useAnalytics';
import { useProgressContext } from '@/app/providers/ProgressProvider';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Tabs } from '@/components/ui/Tabs';
import { Select } from '@/components/ui/Select';
import { Skeleton } from '@/components/ui/Skeleton';
import { Alert } from '@/components/ui/Alert';
import { StudyTimeChart } from './components/StudyTimeChart';
import { TopicMastery } from './components/TopicMastery';
import { ProductivityHeatmap } from './components/ProductivityHeatmap';
import { WeaknessAnalysis } from './components/WeaknessAnalysis';
import { QuizPerformance } from './components/QuizPerformance';
import { InsightList } from './components/InsightList';
import { RecommendationList } from './components/RecommendationList';
import { AnalyticsFilter } from './components/AnalyticsFilter';
import { StatsCard } from '@/components/shared/StatsCard';
import { AnalyticsTimeframe } from '@/lib/types/analytics.types';
import { cn } from '@/lib/utils/helpers';

export default function AnalyticsPage() {
  const { analytics, isLoading, error, recalculate, refresh } = useAnalytics({ autoRecalculate: true });
  const { progress } = useProgressContext();
  const [timeframe, setTimeframe] = useState<AnalyticsTimeframe>('monthly');
  const [activeTab, setActiveTab] = useState('overview');

  const summaryStats = useMemo(() => {
    if (!analytics) return null;

    const study = analytics.studyTime;
    const completion = analytics.completion;
    const quiz = analytics.quiz;

    return {
      totalHours: study.totalHours,
      averageDailyHours: study.averageDailyHours,
      completionRate: completion.overallCompletionPercentage,
      quizPassRate: quiz.passRate,
      averageQuizScore: quiz.averageScore,
      consistencyScore: study.consistencyScore,
      productivityScore: analytics.productivity.overallProductivityScore,
      focusScore: analytics.productivity.focusScore,
    };
  }, [analytics]);

  const tabs = [
    {
      id: 'overview',
      label: '📊 Overview',
      content: (
        <div className="space-y-6">
          {summaryStats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatsCard
                label="Total Jam Belajar"
                value={summaryStats.totalHours.toFixed(1)}
                icon={<span className="text-2xl">⏰</span>}
                color="blue"
              />
              <StatsCard
                label="Rata-rata Harian"
                value={summaryStats.averageDailyHours.toFixed(1) + 'h'}
                icon={<span className="text-2xl">📅</span>}
                color="green"
              />
              <StatsCard
                label="Completion Rate"
                value={summaryStats.completionRate.toFixed(1) + '%'}
                icon={<span className="text-2xl">✅</span>}
                color="purple"
              />
              <StatsCard
                label="Quiz Pass Rate"
                value={summaryStats.quizPassRate.toFixed(1) + '%'}
                icon={<span className="text-2xl">🧪</span>}
                color="yellow"
              />
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <StatsCard
              label="Konsistensi"
              value={summaryStats?.consistencyScore.toFixed(1) + '%' || '0%'}
              icon={<span className="text-2xl">🔥</span>}
              color="red"
            />
            <StatsCard
              label="Produktivitas"
              value={summaryStats?.productivityScore.toFixed(1) + '%' || '0%'}
              icon={<span className="text-2xl">⚡</span>}
              color="pink"
            />
            <StatsCard
              label="Fokus"
              value={summaryStats?.focusScore.toFixed(1) + '%' || '0%'}
              icon={<span className="text-2xl">🧠</span>}
              color="yellow"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <StudyTimeChart
              data={analytics?.studyTime as any}
              timeframe={timeframe}
            />
            <TopicMastery
              data={analytics?.skills ?? {}}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ProductivityHeatmap
              data={analytics?.productivity as any}
              timeframe={timeframe}
            />
            <QuizPerformance
              data={analytics?.quiz as any}
            />
          </div>

          <WeaknessAnalysis
            data={analytics?.skills as any}
            recommendations={analytics?.recommendations}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            insights={analytics?.insights as any || []}
            recommendations={analytics?.recommendations as any || []}
          </div>
        </div>
      ),
    },
    {
      id: 'study_time',
      label: '⏰ Waktu Belajar',
      content: (
        <div className="space-y-6">
          <StudyTimeChart
            data={analytics?.studyTime as any}
            timeframe={timeframe}
            detailed
          />
          {analytics?.studyTime && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-xl">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Total Waktu</h4>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {analytics.studyTime.totalHours.toFixed(1)} jam
                </p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-xl">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Rata-rata Harian</h4>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {analytics.studyTime.averageDailyHours.toFixed(1)} jam
                </p>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-xl">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Konsistensi</h4>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {analytics.studyTime.consistencyScore.toFixed(1)}%
                </p>
              </div>
            </div>
          )}
          {analytics?.studyTime?.hourlyDistribution && (
            <Card variant="default" padding="lg">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                Distribusi Waktu per Jam
              </h4>
              <div className="space-y-2">
                {analytics.studyTime.hourlyDistribution.map((item) => (
                  <div key={item.hour} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-16 text-sm text-gray-500 dark:text-gray-400">
                      {String(item.hour).padStart(2, '0')}:00
                    </div>
                    <div className="flex-1 h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(item.percentage, 100)}%` }}
                      />
                    </div>
                    <div className="flex-shrink-0 w-20 text-right text-sm text-gray-600 dark:text-gray-400">
                      {item.minutes}m
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      ),
    },
    {
      id: 'completion',
      label: '✅ Completion',
      content: (
        <div className="space-y-6">
          {analytics?.completion && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-xl">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Overall Completion</h4>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {analytics.completion.overallCompletionPercentage.toFixed(1)}%
                </p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-xl">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Pace Status</h4>
                <Badge
                  variant={
                    analytics.completion.paceStatus === 'ahead' ? 'success' :
                    analytics.completion.paceStatus === 'on_track' ? 'primary' :
                    analytics.completion.paceStatus === 'behind' ? 'warning' : 'danger'
                  }
                  size="lg"
                >
                  {analytics.completion.paceStatus.toUpperCase()}
                </Badge>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-xl">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Proyeksi Selesai</h4>
                <p className="text-lg font-bold text-purple-600 dark:text-purple-400">
                  {new Date(analytics.completion.projectedCompletionDate).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>
          )}
          {analytics?.completion?.dailyCompletionRate && (
            <Card variant="default" padding="lg">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                Daily Completion Rate
              </h4>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {analytics.completion.dailyCompletionRate.slice(-30).map((item) => (
                  <div key={item.date} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-28 text-xs text-gray-500 dark:text-gray-400">
                      {new Date(item.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                    </div>
                    <div className="flex-1 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={cn(
                          'h-full rounded-full transition-all duration-500',
                          item.completionPercentage >= 80 ? 'bg-green-500' :
                          item.completionPercentage >= 50 ? 'bg-yellow-500' :
                          'bg-red-500'
                        )}
                        style={{ width: `${item.completionPercentage}%` }}
                      />
                    </div>
                    <div className="flex-shrink-0 w-12 text-right text-xs font-medium text-gray-600 dark:text-gray-400">
                      {Math.round(item.completionPercentage)}%
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      ),
    },
    {
      id: 'quiz',
      label: '🧪 Quiz',
      content: (
        <div className="space-y-6">
          {analytics?.quiz && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-xl">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Total Quiz</h4>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {analytics.quiz.totalQuizzes}
                </p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-xl">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Pass Rate</h4>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {analytics.quiz.passRate.toFixed(1)}%
                </p>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-xl">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Rata-rata Nilai</h4>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {analytics.quiz.averageScore.toFixed(1)}%
                </p>
              </div>
              <div className="p-4 bg-orange-50 dark:bg-orange-950/30 rounded-xl">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Nilai Tertinggi</h4>
                <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  {analytics.quiz.highestScore.toFixed(1)}%
                </p>
              </div>
            </div>
          )}
          <QuizPerformance
            data={analytics?.quiz as any}
            detailed
          />
          {analytics?.quiz?.weakTopics && analytics.quiz.weakTopics.length > 0 && (
            <Card variant="default" padding="lg">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                📌 Topik yang Perlu Ditingkatkan
              </h4>
              <div className="space-y-3">
                {analytics.quiz.weakTopics.map((topic) => (
                  <div key={topic.topic} className="p-3 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-800">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900 dark:text-white">{topic.topic}</span>
                      <Badge
                        variant={
                          topic.urgency === 'critical' ? 'danger' :
                          topic.urgency === 'high' ? 'warning' :
                          topic.urgency === 'medium' ? 'primary' : 'secondary'
                        }
                        size="sm"
                      >
                        {topic.urgency.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Nilai: {topic.averageScore.toFixed(1)}%
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {topic.questionCount} soal
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      ),
    },
    {
      id: 'insights',
      label: '💡 Insights',
      content: (
        <div className="space-y-6">
          <InsightList insights={analytics?.insights as any || []} detailed />
          <RecommendationList recommendations={analytics?.recommendations as any || []} detailed />
          {analytics?.predictions && (
            <Card variant="elevated" padding="lg">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                📈 Prediksi & Proyeksi
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-xl">
                  <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300">Estimasi Selesai</h5>
                  <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    {new Date(analytics.predictions.estimatedCompletionDate).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Confidence: {analytics.predictions.confidenceLevel.toFixed(1)}%
                  </p>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-xl">
                  <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300">Jam yang Dibutuhkan</h5>
                  <p className="text-lg font-bold text-green-600 dark:text-green-400">
                    {analytics.predictions.remainingHours.toFixed(1)} jam
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {analytics.predictions.dailyAverageNeeded.toFixed(1)} jam/hari
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Skenario</h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {analytics.predictions.scenarios.map((scenario) => (
                    <div
                      key={scenario.scenario}
                      className={cn(
                        'p-3 rounded-lg border-2',
                        scenario.scenario === 'optimistic' ? 'border-green-200 bg-green-50 dark:bg-green-950/30' :
                        scenario.scenario === 'realistic' ? 'border-blue-200 bg-blue-50 dark:bg-blue-950/30' :
                        'border-red-200 bg-red-50 dark:bg-red-950/30'
                      )}
                    >
                      <div className="font-medium text-sm capitalize">{scenario.scenario}</div>
                      <div className="text-sm">
                        {new Date(scenario.completionDate).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </div>
                      <div className="text-xs text-gray-500">
                        {scenario.dailyHoursNeeded.toFixed(1)} jam/hari
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}
        </div>
      ),
    },
  ];

  if (isLoading) {
    return <AnalyticsLoading />;
  }

  if (error) {
    return (
      <div className="min-h-screen py-8">
        <div className="container-custom">
          <Alert variant="error" title="Gagal Memuat Analytics">
            {error.message || 'Terjadi kesalahan saat memuat data analytics'}
            <Button variant="primary" size="sm" onClick={refresh} className="mt-2">
              🔄 Coba Lagi
            </Button>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              📊 Analytics & Insights
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Analisis mendalam tentang performa belajar dan rekomendasi
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Select
              options={[
                { value: 'daily', label: 'Harian' },
                { value: 'weekly', label: 'Mingguan' },
                { value: 'monthly', label: 'Bulanan' },
                { value: 'quarterly', label: 'Kuartalan' },
                { value: 'yearly', label: 'Tahunan' },
              ]}
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value as AnalyticsTimeframe)}
              className="w-36"
            />
            <Button variant="outline" size="sm" onClick={recalculate}>
              🔄 Refresh
            </Button>
          </div>
        </div>

        <Tabs
          tabs={tabs}
          defaultTab="overview"
          activeTab={activeTab}
          onChange={setActiveTab}
          variant="box"
          size="md"
        />
      </div>
    </div>
  );
}

function AnalyticsLoading() {
  return (
    <div className="min-h-screen py-8">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <Skeleton variant="text" width="300px" height="32px" />
            <Skeleton variant="text" width="200px" height="20px" className="mt-1" />
          </div>
          <div className="flex gap-3">
            <Skeleton variant="rect" width="140px" height="40px" className="rounded-lg" />
            <Skeleton variant="rect" width="80px" height="40px" className="rounded-lg" />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} variant="card" height="100px" className="rounded-xl" />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton variant="card" height="300px" className="rounded-xl" />
          <Skeleton variant="card" height="300px" className="rounded-xl" />
        </div>
      </div>
    </div>
  );
}
