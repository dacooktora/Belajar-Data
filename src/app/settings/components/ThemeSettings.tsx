'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils/helpers';

interface ThemeSettingsProps {
  theme: string;
  onThemeChange: (theme: string) => void;
  settings: any;
  onSave: (data: any) => void;
}

export function ThemeSettings({ theme, onThemeChange, settings, onSave }: ThemeSettingsProps) {
  const [selectedTheme, setSelectedTheme] = useState(theme || 'system');

  const themes = [
    {
      id: 'light',
      name: 'Terang',
      icon: '☀️',
      description: 'Mode terang untuk siang hari',
      colors: 'bg-white border-gray-200',
      preview: 'bg-white',
    },
    {
      id: 'dark',
      name: 'Gelap',
      icon: '🌙',
      description: 'Mode gelap untuk malam hari',
      colors: 'bg-gray-900 border-gray-700',
      preview: 'bg-gray-900',
    },
    {
      id: 'system',
      name: 'Sistem',
      icon: '💻',
      description: 'Ikuti pengaturan sistem',
      colors: 'bg-gray-100 border-gray-300',
      preview: 'bg-gradient-to-r from-white to-gray-900',
    },
  ];

  const handleThemeChange = (themeId: string) => {
    setSelectedTheme(themeId);
    onThemeChange(themeId);
    onSave({ theme: themeId });
  };

  return (
    <Card variant="default" padding="lg">
      <div className="space-y-6">
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white">🎨 Tema</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Pilih tema yang nyaman untuk matamu
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {themes.map((t) => {
            const isActive = selectedTheme === t.id;
            return (
              <button
                key={t.id}
                onClick={() => handleThemeChange(t.id)}
                className={cn(
                  'p-4 rounded-xl border-2 transition-all text-left',
                  isActive
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30 shadow-md'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      'w-12 h-12 rounded-lg flex items-center justify-center text-2xl border',
                      t.preview
                    )}
                  >
                    {t.icon}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {t.name}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {t.description}
                    </div>
                  </div>
                </div>
                {isActive && (
                  <div className="mt-2 text-xs text-blue-600 dark:text-blue-400">
                    ✅ Aktif
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
          <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Preview
          </h5>
          <div className="flex gap-4">
            <div className="flex-1 p-3 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="h-4 w-24 bg-blue-500 rounded" />
              <div className="h-3 w-32 bg-gray-300 dark:bg-gray-700 rounded mt-2" />
              <div className="h-3 w-20 bg-gray-300 dark:bg-gray-700 rounded mt-1" />
            </div>
            <div className="flex-1 p-3 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="h-4 w-20 bg-gray-300 dark:bg-gray-700 rounded" />
              <div className="h-3 w-28 bg-gray-300 dark:bg-gray-700 rounded mt-2" />
              <div className="h-3 w-16 bg-gray-300 dark:bg-gray-700 rounded mt-1" />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
