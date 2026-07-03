'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-950">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="text-9xl font-bold text-gray-200 dark:text-gray-700">404</div>
        <div className="text-6xl mt-4">🔍</div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mt-4">
          Halaman Tidak Ditemukan
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Maaf, halaman yang kamu cari tidak ada atau sudah dipindahkan.
        </p>
        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          <Link href="/">
            <Button variant="primary">
              🏠 Kembali ke Beranda
            </Button>
          </Link>
          <Link href="/learning">
            <Button variant="outline">
              📚 Ke Learning
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
