'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils/helpers';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { AnalyticsData } from '@/lib/types/analytics.types';

interface WeaknessAnalysisProps {
  data: AnalyticsData['skills'] | undefined;
  recommendations: AnalyticsData['recommendations'] | undefined;
}

export function WeaknessAnalysis({ data, recommendations }: WeaknessAnalysisProps) {
  const [expandedWeakness, setExpandedWeakness] = useState<string | null>(null);

  const weaknessData = data?.weakestSkills || [];
  const skillGaps = data?.skillGaps || [];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'border-red-500 bg-red-50 dark:bg-red-950/30';
      case 'high': return 'border-orange-500 bg-orange-50 dark:bg-orange-950/30';
      case 'medium': return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950/30';
      default: return 'border-blue-500 bg-blue-50 dark:bg-blue-950/30';
    }
  };

  const getSeverityLabel = (severity: string) => {
    switch (severity) {
      case 'critical': return 'Kritis';
      case 'high': return 'Tinggi';
      case 'medium': return 'Sedang';
      default: return 'Rendah';
    }
  };

  if (weaknessData.length === 0 && skillGaps.length === 0) {
    return (
      <Card variant="default" padding="lg">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🎯</span>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white">Analisis Kelemahan</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Belum ada data kelemahan yang terdeteksi
            </p>
          </div>
        </div>
        <div className="text-center py-6 text-gray-500 dark:text-gray-400">
          🎉 Terus pertahankan performa belajarmu!
        </div>
      </Card>
    );
  }

  return (
    <Card variant="default" padding="lg">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">🎯</span>
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white">Analisis Kelemahan</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {weaknessData.length} area perlu ditingkatkan • {skillGaps.length} gap skill
          </p>
        </div>
      </div>

      {/* Weakest Skills */}
      {weaknessData.length > 0 && (
        <div className="space-y-3 mb-4">
          <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            📌 Skill Terlemah
          </h5>
          {weaknessData.map((skill) => (
            <div
              key={skill.skill}
              className={cn(
                'p-3 rounded-lg border-2 transition-all cursor-pointer',
                getSeverityColor(
                  skillGaps.find((g) => g.gap.includes(skill.skill))?.severity || 'medium'
                )
              )}
              onClick={() => setExpandedWeakness(expandedWeakness === skill.skill ? null : skill.skill)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium text-gray-900 dark:text-white">{skill.skill}</span>
                  <Badge variant="secondary" size="xs" className="ml-2">
                    {skill.category}
                  </Badge>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                    {Math.round(skill.level)}%
                  </span>
                  <Badge
                    variant={
                      skill.level < 30 ? 'danger' :
                      skill.level < 50 ? 'warning' : 'primary'
                    }
                    size="sm"
                  >
                    {skill.level < 30 ? 'Kritis' : skill.level < 50 ? 'Perlu Ditingkatkan' : 'Menengah'}
                  </Badge>
                </div>
              </div>

              <ProgressBar
                value={skill.level}
                max={100}
                size="sm"
                color={skill.level < 30 ? 'red' : skill.level < 50 ? 'yellow' : 'blue'}
                showPercentage={false}
                className="mt-2"
              />

              {expandedWeakness === skill.skill && (
                <div className="mt-3 space-y-2">
                  {skill.recommendedActions && skill.recommendedActions.length > 0 && (
                    <div className="p-2 bg-white dark:bg-gray-800 rounded-lg">
                      <h6 className="text-xs font-medium text-gray-600 dark:text-gray-400">💡 Rekomendasi:</h6>
                      <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300">
                        {skill.recommendedActions.map((action, idx) => (
                          <li key={idx}>{action}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {recommendations && (
                    <div className="p-2 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                      <h6 className="text-xs font-medium text-blue-600 dark:text-blue-400">📚 Rekomendasi Belajar:</h6>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {recommendations
                          .filter((r) => r.tags?.some((t) => t.toLowerCase().includes(skill.skill.toLowerCase())))
                          .slice(0, 3)
                          .map((rec, idx) => (
                            <Badge key={idx} variant="secondary" size="xs">
                              {rec.title}
                            </Badge>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skill Gaps */}
      {skillGaps.length > 0 && (
        <div className="space-y-3">
          <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            🚧 Skill Gap
          </h5>
          {skillGaps.map((gap) => (
            <div
              key={gap.gap}
              className={cn(
                'p-3 rounded-lg border-2',
                getSeverityColor(gap.severity)
              )}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900 dark:text-white">{gap.gap}</span>
                <Badge
                  variant={
                    gap.severity === 'critical' ? 'danger' :
                    gap.severity === 'high' ? 'warning' :
                    gap.severity === 'medium' ? 'primary' : 'secondary'
                  }
                  size="sm"
                >
                  {getSeverityLabel(gap.severity)}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{gap.impact}</p>
              {gap.recommendedResources && gap.recommendedResources.length > 0 && (
                <div className="mt-2">
                  <h6 className="text-xs font-medium text-gray-500 dark:text-gray-400">Sumber Daya:</h6>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {gap.recommendedResources.map((resource, idx) => (
                      <Badge key={idx} variant="secondary" size="xs">
                        {resource}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
