'use client';

import { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { notFound } from 'next/navigation';
import { useProgressContext } from '@/app/providers/ProgressProvider';
import { PROJECTS_DATA } from '@/lib/data/projects';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Tabs } from '@/components/ui/Tabs';
import { Skeleton } from '@/components/ui/Skeleton';
import { Alert } from '@/components/ui/Alert';
import { ProjectDetail } from './components/ProjectDetail';
import { ProjectSubmission } from './components/ProjectSubmission';
import { ProjectFeedback } from './components/ProjectFeedback';
import { getDayId, getCurrentDayId } from '@/lib/utils/helpers';

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = parseInt(params.projectId as string);
  const { progress, updateDayProgress } = useProgressContext();
  const [activeTab, setActiveTab] = useState('detail');
  const [isLoading, setIsLoading] = useState(true);

  const project = PROJECTS_DATA.find(p => p.id === projectId);

  const projectProgress = useMemo(() => {
    if (!progress || !project) return null;
    const dayId = getDayId(project.month, 1, 1);
const dayProgress = progress.daily[dayId];
return (dayProgress as any)?.project || null;
  }, [progress, project]);

  useEffect(() => {
    if (project) {
      setIsLoading(false);
    }
  }, [project]);

  if (isLoading) {
    return <ProjectDetailLoading />;
  }

  if (!project) {
    notFound();
  }

  const status = projectProgress?.status || 'not_started';
  const completion = projectProgress?.completionPercentage || 0;

  const tabs = [
    {
      id: 'detail',
      label: '📋 Detail Project',
      content: (
        <ProjectDetail
          project={project}
          progress={projectProgress}
          onUpdateProgress={(data) => {
            const dayId = getDayId(project.month, 1, 1);
            updateDayProgress(dayId, {
              project: {
                ...projectProgress,
                ...data,
              },
            });
          }}
        />
      ),
    },
    {
      id: 'submission',
      label: '📤 Submit',
      badge: status === 'submitted' ? '📤' : undefined,
      content: (
        <ProjectSubmission
          project={project}
          progress={projectProgress}
          onSubmit={(data) => {
            const dayId = getDayId(project.month, 1, 1);
            updateDayProgress(dayId, {
              project: {
                ...projectProgress,
                ...data,
                status: 'submitted',
                submittedAt: new Date().toISOString(),
              },
            });
          }}
          onSaveDraft={(data) => {
            const dayId = getDayId(project.month, 1, 1);
            updateDayProgress(dayId, {
              project: {
                ...projectProgress,
                ...data,
                status: 'planning',
              },
            });
          }}
        />
      ),
    },
    {
      id: 'feedback',
      label: '💬 Feedback',
      badge: projectProgress?.feedback ? '💬' : undefined,
      content: (
        <ProjectFeedback
          project={project}
          progress={projectProgress}
          onRequestRevision={() => {
            const dayId = getDayId(project.month, 1, 1);
            updateDayProgress(dayId, {
              project: {
                ...projectProgress,
                status: 'revision_needed',
              },
            });
          }}
        />
      ),
    },
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <Link
                href="/projects"
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                ← Kembali ke Projects
              </Link>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                {project.title}
              </h1>
            </div>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Bulan {project.month} • {project.estimatedTime}
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge
                variant={
                  status === 'approved' ? 'success' :
                  status === 'submitted' ? 'primary' :
                  status === 'in_progress' ? 'primary' :
                  status === 'revision_needed' ? 'warning' :
                  status === 'rejected' ? 'danger' :
                  'secondary'
                }
                size="lg"
              >
                {status === 'approved' ? '✅ Disetujui' :
                 status === 'submitted' ? '📤 Dikirim' :
                 status === 'in_progress' ? '🔄 Sedang Dikerjakan' :
                 status === 'planning' ? '📝 Perencanaan' :
                 status === 'revision_needed' ? '🔄 Revisi' :
                 status === 'rejected' ? '❌ Ditolak' :
                 '⏳ Belum Dimulai'}
              </Badge>
              <Badge
                variant={
                  project.difficulty === 'easy' ? 'success' :
                  project.difficulty === 'medium' ? 'warning' :
                  project.difficulty === 'hard' ? 'danger' : 'secondary'
                }
                size="sm"
              >
                {project.difficulty}
              </Badge>
            </div>
          </div>
          <div className="flex-shrink-0 text-right">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {Math.round(completion)}%
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Progress</div>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <ProgressBar
            value={completion}
            max={100}
            size="lg"
            color={completion === 100 ? 'green' : 'blue'}
            showPercentage
            label="Progress Project"
          />
        </div>

        {/* Tabs */}
        <Tabs
          tabs={tabs}
          defaultTab="detail"
          activeTab={activeTab}
          onChange={setActiveTab}
          variant="box"
          size="md"
        />
      </div>
    </div>
  );
}

function ProjectDetailLoading() {
  return (
    <div className="min-h-screen py-8">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
          <div>
            <Skeleton variant="text" width="200px" height="20px" />
            <Skeleton variant="text" width="400px" height="36px" className="mt-1" />
            <Skeleton variant="text" width="200px" height="20px" className="mt-1" />
            <div className="flex gap-2 mt-2">
              <Skeleton variant="rect" width="100px" height="24px" className="rounded-full" />
              <Skeleton variant="rect" width="80px" height="24px" className="rounded-full" />
            </div>
          </div>
          <Skeleton variant="rect" width="100px" height="48px" className="rounded-lg" />
        </div>
        <Skeleton variant="rect" width="100%" height="20px" className="rounded-full mb-6" />
        <Skeleton variant="card" height="400px" className="rounded-xl" />
      </div>
    </div>
  );
}
