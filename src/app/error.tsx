'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-900 dark:to-gray-950">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="text-6xl mt-4">😱</div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mt-4">
          Terjadi Kesalahan
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Maaf, terjadi kesalahan saat memuat halaman. Silakan coba lagi.
        </p>
        {error.digest && (
          <p className="text-xs text-gray-400 mt-2">
            Error ID: {error.digest}
          </p>
        )}
        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          <Button variant="primary" onClick={reset}>
            🔄 Coba Lagi
          </Button>
          <Button variant="outline" onClick={() => window.location.href = '/'}>
            🏠 Kembali ke Beranda
          </Button>
        </div>
      </div>
    </div>
  );
}
