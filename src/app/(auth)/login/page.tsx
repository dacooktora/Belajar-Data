// src/app/(auth)/login/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Alert } from '@/components/ui/Alert';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [, setSession] = useLocalStorage('session', null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Simulasi login (karena single user, bisa bypass)
      if (email && password) {
        setSession({
          user: {
            name: 'User',
            email: email,
          },
          token: 'demo-token',
        });
        router.push('/dashboard');
      } else {
        setError('Email dan password harus diisi');
      }
    } catch (err) {
      setError('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-950 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card variant="elevated" padding="xl" className="border-2 border-blue-100 dark:border-blue-900/30">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                DA
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Selamat Datang Kembali
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Masuk untuk melanjutkan belajar
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <Input
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>

            {error && (
              <Alert variant="error">
                {error}
              </Alert>
            )}

            <Button
              type="submit"
              variant="gradient"
              fullWidth
              size="lg"
              disabled={isLoading}
              className="text-white"
            >
              {isLoading ? '⏳ Memproses...' : '🚀 Masuk'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            Belum punya akun?{' '}
            <Link href="/register" className="text-blue-600 hover:text-blue-700 font-medium">
              Daftar Sekarang
            </Link>
          </div>

          <div className="mt-4 text-center text-xs text-gray-400">
            🔒 Login ini hanya simulasi. Karena aplikasi single-user, kamu bisa login dengan email dan password apapun.
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
