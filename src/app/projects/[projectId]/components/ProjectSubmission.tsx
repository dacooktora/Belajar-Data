'use client';

import { useState, useRef } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Alert } from '@/components/ui/Alert';
import { FinalProject } from '@/lib/types/roadmap.types';
import { ProjectProgress } from '@/lib/types/progress.types';

interface ProjectSubmissionProps {
  project: FinalProject;
  progress: ProjectProgress | null;
  onSubmit: (data: Partial<ProjectProgress>) => void;
  onSaveDraft: (data: Partial<ProjectProgress>) => void;
}

export function ProjectSubmission({
  project,
  progress,
  onSubmit,
  onSaveDraft,
}: ProjectSubmissionProps) {
  const [githubUrl, setGithubUrl] = useState(progress?.repositoryUrl || '');
  const [demoUrl, setDemoUrl] = useState(progress?.demoUrl || '');
  const [presentationUrl, setPresentationUrl] = useState(progress?.presentationUrl || '');
  const [notes, setNotes] = useState(progress?.notes || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [files, setFiles] = useState<{ name: string; url: string; size: number }[]>(
    progress?.deliverables?.map(d => ({
      name: d.name,
      url: d.fileUrl || '',
      size: d.fileSize || 0,
    })) || []
  );
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isSubmitted = progress?.status === 'submitted' || progress?.status === 'approved';
  const isDraft = progress?.status === 'planning' || progress?.status === 'draft';
  const canSubmit = !isSubmitted && (isDraft || !progress);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadStatus('uploading');
      // Simulasi upload
      setTimeout(() => {
        setFiles(prev => [...prev, {
          name: file.name,
          url: URL.createObjectURL(file),
          size: file.size,
        }]);
        setUploadStatus('success');
        setTimeout(() => setUploadStatus('idle'), 2000);
      }, 1000);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    onSubmit({
      repositoryUrl: githubUrl,
      demoUrl,
      presentationUrl,
      notes,
      deliverables: files.map(f => ({
        name: f.name,
        fileUrl: f.url,
        fileSize: f.size,
      })),
      submittedAt: new Date().toISOString(),
    });
    setTimeout(() => setIsSubmitting(false), 500);
  };

  const handleSaveDraft = () => {
    onSaveDraft({
      repositoryUrl: githubUrl,
      demoUrl,
      presentationUrl,
      notes,
      deliverables: files.map(f => ({
        name: f.name,
        fileUrl: f.url,
        fileSize: f.size,
      })),
    });
  };

  return (
    <div className="space-y-6">
      {isSubmitted ? (
        <Alert variant="success">
          ✅ Project sudah disubmit! Tunggu feedback dari reviewer.
        </Alert>
      ) : canSubmit ? (
        <>
          <Card variant="default" padding="lg">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
              📤 Submit Project
            </h4>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  🔗 Link GitHub Repository
                </label>
                <Input
                  placeholder="https://github.com/username/project"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  🔗 Link Demo (opsional)
                </label>
                <Input
                  placeholder="https://project-demo.vercel.app"
                  value={demoUrl}
                  onChange={(e) => setDemoUrl(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  🔗 Link Presentasi (opsional)
                </label>
                <Input
                  placeholder="https://docs.google.com/presentation/..."
                  value={presentationUrl}
                  onChange={(e) => setPresentationUrl(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  📁 Upload File
                </label>
                <div className="flex items-center gap-3">
                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileUpload}
                    className="hidden"
                    multiple
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadStatus === 'uploading'}
                  >
                    {uploadStatus === 'uploading' ? '⏳ Uploading...' : '📤 Pilih File'}
                  </Button>
                  {uploadStatus === 'success' && (
                    <span className="text-sm text-green-600">✅ Berhasil upload</span>
                  )}
                  {uploadStatus === 'error' && (
                    <span className="text-sm text-red-600">❌ Gagal upload</span>
                  )}
                </div>
                {files.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-700 dark:text-gray-300">{file.name}</span>
                          <span className="text-xs text-gray-400">
                            ({(file.size / 1024).toFixed(1)} KB)
                          </span>
                        </div>
                        <button
                          onClick={() => handleRemoveFile(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  📝 Catatan
                </label>
                <Textarea
                  placeholder="Tulis catatan tambahan untuk reviewer..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                />
              </div>

              <div className="flex gap-3">
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleSubmit}
                  disabled={isSubmitting || files.length === 0}
                >
                  {isSubmitting ? '⏳ Menyimpan...' : '📤 Submit Project'}
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  onClick={handleSaveDraft}
                >
                  💾 Simpan Draft
                </Button>
              </div>
            </div>
          </Card>

          <Card variant="default" padding="lg">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              📋 Checklist Submission
            </h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-center gap-2">
                {files.length > 0 ? '✅' : '⬜'} File deliverables ({files.length}/{project.deliverables.length})
              </li>
              <li className="flex items-center gap-2">
                {githubUrl ? '✅' : '⬜'} Link GitHub Repository
              </li>
              <li className="flex items-center gap-2">
                {demoUrl ? '✅' : '⬜'} Link Demo (opsional)
              </li>
              <li className="flex items-center gap-2">
                {notes ? '✅' : '⬜'} Catatan untuk reviewer
              </li>
            </ul>
          </Card>
        </>
      ) : (
        <Alert variant="info">
          Project sudah disubmit. Tunggu feedback atau lakukan revisi jika diperlukan.
        </Alert>
      )}
    </div>
  );
}
