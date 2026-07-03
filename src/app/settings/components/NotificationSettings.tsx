'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Switch } from '@/components/ui/Switch';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';

interface NotificationSettingsProps {
  settings: any;
  onSave: (data: any) => void;
  saveStatus: 'idle' | 'saving' | 'saved' | 'error';
}

export function NotificationSettings({ settings, onSave, saveStatus }: NotificationSettingsProps) {
  const [enabled, setEnabled] = useState(settings?.notificationsEnabled ?? true);
  const [reminderTime, setReminderTime] = useState(settings?.reminderTime || '07:00');
  const [dailyReminder, setDailyReminder] = useState(settings?.dailyReminder ?? true);
  const [streakReminder, setStreakReminder] = useState(settings?.streakReminder ?? true);
  const [quizReminder, setQuizReminder] = useState(settings?.quizReminder ?? true);
  const [projectReminder, setProjectReminder] = useState(settings?.projectReminder ?? true);
  const [emailNotifications, setEmailNotifications] = useState(settings?.emailNotifications ?? false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      notificationsEnabled: enabled,
      reminderTime,
      dailyReminder,
      streakReminder,
      quizReminder,
      projectReminder,
      emailNotifications,
    });
  };

  return (
    <Card variant="default" padding="lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white">🔔 Notifikasi</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Aktifkan atau nonaktifkan semua notifikasi
            </p>
          </div>
          <Switch
            checked={enabled}
            onCheckedChange={setEnabled}
            size="lg"
          />
        </div>

        {enabled && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Waktu Pengingat Harian
              </label>
              <Input
                type="time"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
                className="max-w-[200px]"
              />
              <p className="text-xs text-gray-400 mt-1">
                Notifikasi akan dikirim setiap hari pada jam ini
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                <div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    📅 Pengingat Belajar Harian
                  </span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Ingatkan untuk belajar setiap hari
                  </p>
                </div>
                <Switch
                  checked={dailyReminder}
                  onCheckedChange={setDailyReminder}
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                <div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    🔥 Streak Reminder
                  </span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Ingatkan untuk menjaga streak
                  </p>
                </div>
                <Switch
                  checked={streakReminder}
                  onCheckedChange={setStreakReminder}
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                <div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    🧪 Quiz Reminder
                  </span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Ingatkan untuk mengerjakan quiz
                  </p>
                </div>
                <Switch
                  checked={quizReminder}
                  onCheckedChange={setQuizReminder}
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                <div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    📊 Project Reminder
                  </span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Ingatkan tentang deadline project
                  </p>
                </div>
                <Switch
                  checked={projectReminder}
                  onCheckedChange={setProjectReminder}
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                <div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    📧 Email Notifications
                  </span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Kirim notifikasi ke email
                  </p>
                </div>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
            </div>
          </>
        )}

        {saveStatus === 'error' && (
          <Alert variant="error">
            Gagal menyimpan notifikasi. Coba lagi.
          </Alert>
        )}

        <div className="flex gap-3">
          <Button
            type="submit"
            variant="primary"
            disabled={saveStatus === 'saving'}
          >
            {saveStatus === 'saving' ? '⏳ Menyimpan...' : '💾 Simpan Notifikasi'}
          </Button>
        </div>
      </form>
    </Card>
  );
}
