'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { Alert } from '@/components/ui/Alert';

interface ProfileSettingsProps {
  settings: any;
  onSave: (data: any) => void;
  saveStatus: 'idle' | 'saving' | 'saved' | 'error';
}

export function ProfileSettings({ settings, onSave, saveStatus }: ProfileSettingsProps) {
  const [name, setName] = useState(settings?.name || '');
  const [email, setEmail] = useState(settings?.email || '');
  const [bio, setBio] = useState(settings?.bio || '');
  const [avatar, setAvatar] = useState(settings?.avatar || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      email,
      bio,
      avatar,
    });
  };

  return (
    <Card variant="default" padding="lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center gap-6">
          <div className="flex-shrink-0">
            <Avatar
              src={avatar || undefined}
              name={name || 'User'}
              size="xl"
              variant="circle"
            />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 dark:text-white">Foto Profil</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Upload foto profil atau gunakan avatar default
            </p>
            <div className="flex gap-2 mt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const url = prompt('Masukkan URL foto profil:');
                  if (url) setAvatar(url);
                }}
              >
                📤 Upload
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setAvatar('')}
              >
                ↩️ Reset
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nama Lengkap
            </label>
            <Input
              placeholder="Nama lengkap"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <Input
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Bio
          </label>
          <Input
            placeholder="Ceritakan tentang dirimu..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>

        {saveStatus === 'error' && (
          <Alert variant="error">
            Gagal menyimpan profil. Coba lagi.
          </Alert>
        )}

        <div className="flex gap-3">
          <Button
            type="submit"
            variant="primary"
            disabled={saveStatus === 'saving'}
          >
            {saveStatus === 'saving' ? '⏳ Menyimpan...' : '💾 Simpan Profil'}
          </Button>
        </div>
      </form>
    </Card>
  );
}
