'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Alert } from '@/components/ui/Alert';
import { FinalProject } from '@/lib/types/roadmap.types';
import { ProjectProgress } from '@/lib/types/progress.types';

interface ProjectFeedbackProps {
  project: FinalProject;
  progress: ProjectProgress | null;
  onRequestRevision: () => void;
}

export function ProjectFeedback({
  project,
  progress,
  onRequestRevision,
}: ProjectFeedbackProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!progress || progress.status === 'not_started' || progress.status === 'planning') {
    return (
      <Card variant="default" padding="lg">
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          Belum ada feedback untuk project ini
        </div>
      </Card>
    );
  }

  const isApproved = progress.status === 'approved';
  const isRejected = progress.status === 'rejected';
  const isRevisionNeeded = progress.status === 'revision_needed';
  const isSubmitted = progress.status === 'submitted';

  return (
    <div className="space-y-6">
      {isSubmitted && (
        <Alert variant="info">
          ⏳ Project sedang dalam proses review. Tunggu feedback dari reviewer.
        </Alert>
      )}

      {isApproved && (
        <Alert variant="success">
          🎉 Project disetujui! Selamat! Kamu berhasil menyelesaikan project ini.
        </Alert>
      )}

      {isRejected && (
        <Alert variant="error">
          ❌ Project ditolak. Perhatikan feedback dan lakukan revisi.
        </Alert>
      )}

      {isRevisionNeeded && (
        <Alert variant="warning">
          🔄 Revisi diperlukan. Baca feedback dengan teliti dan perbaiki projectmu.
        </Alert>
      )}

      {progress.score !== undefined && (
        <Card variant="default" padding="lg">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">📊 Nilai Project</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {progress.score}/{progress.maxScore || 100}
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {Math.round(progress.percentageScore || 0)}%
              </div>
              <Badge
                variant={
                  (progress.percentageScore || 0) >= 80 ? 'success' :
                  (progress.percentageScore || 0) >= 60 ? 'warning' : 'danger'
                }
                size="sm"
              >
                {(progress.percentageScore || 0) >= 80 ? 'Lulus' :
                 (progress.percentageScore || 0) >= 60 ? 'Cukup' : 'Perlu Revisi'}
              </Badge>
            </div>
          </div>
          <ProgressBar
            value={progress.percentageScore || 0}
            max={100}
            size="md"
            color={(progress.percentageScore || 0) >= 80 ? 'green' : (progress.percentageScore || 0) >= 60 ? 'yellow' : 'red'}
            showPercentage
            className="mt-3"
          />
        </Card>
      )}

        {(progress as any).rubricScores && (progress as any).rubricScores.length > 0 && (
        <Card variant="default" padding="lg">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
            📋 Rubrik Penilaian
          </h4>
          <div className="space-y-3">
                {(progress as any).rubricScores.map((item: any) => (
              <div key={item.criterion} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {item.criterion}
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {item.score}/{item.maxScore}
                  </span>
                  <Badge
                    variant={
                      (item.score / item.maxScore) >= 0.8 ? 'success' :
                      (item.score / item.maxScore) >= 0.6 ? 'warning' : 'danger'
                    }
                    size="xs"
                  >
                    {Math.round((item.score / item.maxScore) * 100)}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {progress.feedback && (
        <Card variant="default" padding="lg">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
            💬 Feedback
          </h4>
          <p className="text-gray-600 dark:text-gray-400">{progress.feedback}</p>
        </Card>
      )}

      {progress.reviewerNotes && (
        <Card variant="default" padding="lg">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
            📝 Catatan Reviewer
          </h4>
          <p className="text-gray-600 dark:text-gray-400">{progress.reviewerNotes}</p>
        </Card>
      )}

      {(isRejected || isRevisionNeeded) && (
        <Card variant="default" padding="lg">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
            🔄 Revisi
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {progress.revisionNotes || 'Perbaiki project sesuai feedback dan submit ulang.'}
          </p>
          <div className="mt-3">
            <Button variant="primary" size="sm" onClick={onRequestRevision}>
              🔄 Ajukan Revisi
            </Button>
          </div>
        </Card>
      )}

      {isApproved && (
        <Card variant="default" padding="lg">
          <div className="text-center py-4">
            <div className="text-4xl mb-2">🏆</div>
            <h4 className="font-semibold text-gray-900 dark:text-white">Project Selesai!</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Kamu berhasil menyelesaikan project ini. Lanjutkan ke project berikutnya!
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}
