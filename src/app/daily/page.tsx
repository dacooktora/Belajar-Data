'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentDayId } from '@/lib/utils/helpers';

export default function DailyPage() {
  const router = useRouter();
  const dayId = getCurrentDayId();

  useEffect(() => {
    router.replace(`/daily/${dayId}`);
  }, [router, dayId]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
        <p className="text-gray-500 dark:text-gray-400">Loading hari ke-{dayId}...</p>
      </div>
    </div>
  );
}
