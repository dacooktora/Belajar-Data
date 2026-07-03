'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { useProgressContext } from '@/app/providers/ProgressProvider';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Switch } from '@/components/ui/Switch';
import { Tabs } from '@/components/ui/Tabs';
import { Skeleton } from '@/components/ui/Skeleton';
import { Alert } from '@/components/ui/Alert';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import { DEFAULT_SETTINGS, LOCAL_STORAGE_KEYS } from '@/lib/utils/constants';
import { ProfileSettings } from './components/ProfileSettings';
import { DailyTarget } from './components/DailyTarget';
import { NotificationSettings } from './components/NotificationSettings';
import { ThemeSettings } from './components/ThemeSettings';
import { DataSettings } from './components/DataSettings';

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { progress, refresh, resetProgress, exportProgress, importProgress } = useProgressContext();
  const [settings, setSettings] = useLocalStorage(
    LOCAL_STORAGE_KEYS.SETTINGS,
    DEFAULT_SETTINGS
  );
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  const handleSaveSettings = async (newSettings: any) => {
    setIsLoading(true);
    setSaveStatus('saving');
    try {
      setSettings({
        ...settings,
        ...newSettings,
        updatedAt: new Date().toISOString(),
      });
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const tabs = [
    {
      id: 'profile',
      label: '👤 Profil',
      content: (
        <ProfileSettings
          settings={settings}
          onSave={handleSaveSettings}
          saveStatus={saveStatus}
        />
      ),
    },
    {
      id: 'daily_target',
      label: '🎯 Target Harian',
      content: (
        <DailyTarget
          settings={settings}
          onSave={handleSaveSettings}
          saveStatus={saveStatus}
        />
      ),
    },
    {
      id: 'notifications',
      label: '🔔 Notifikasi',
      content: (
        <NotificationSettings
          settings={settings}
          onSave={handleSaveSettings}
          saveStatus={saveStatus}
        />
      ),
    },
    {
      id: 'theme',
      label: '🎨 Tema',
      content: (
        <ThemeSettings
          theme={theme || 'system'}
          onThemeChange={setTheme}
          settings={settings}
          onSave={handleSaveSettings}
        />
      ),
    },
    {
      id: 'data',
      label: '📊 Data',
      content: (
        <DataSettings
          progress={progress}
          onExport={exportProgress}
          onImport={importProgress}
          onReset={resetProgress}
          onRefresh={refresh}
        />
      ),
    },
  ];

  if (isLoading) {
    return <SettingsLoading />;
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              ⚙️ Settings
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Atur preferensi dan pengaturan aplikasi
            </p>
          </div>
          {saveStatus === 'saved' && (
            <Badge variant="success" size="lg">✅ Tersimpan</Badge>
          )}
          {saveStatus === 'error' && (
            <Badge variant="danger" size="lg">❌ Gagal menyimpan</Badge>
          )}
          {saveStatus === 'saving' && (
            <Badge variant="primary" size="lg">⏳ Menyimpan...</Badge>
          )}
        </div>

        <Tabs
          tabs={tabs}
          defaultTab="profile"
          activeTab={activeTab}
          onChange={setActiveTab}
          variant="box"
          size="md"
        />
      </div>
    </div>
  );
}

function SettingsLoading() {
  return (
    <div className="min-h-screen py-8">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <Skeleton variant="text" width="300px" height="32px" />
            <Skeleton variant="text" width="200px" height="20px" className="mt-1" />
          </div>
          <Skeleton variant="rect" width="120px" height="36px" className="rounded-full" />
        </div>

        <div className="flex gap-2 mb-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} variant="rect" width="120px" height="40px" className="rounded-lg" />
          ))}
        </div>

        <Skeleton variant="card" height="400px" className="rounded-xl" />
      </div>
    </div>
  );
}
