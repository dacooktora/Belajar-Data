'use client';

import { ReactNode, useState, useEffect } from 'react';
import { ThemeProvider } from 'next-themes';
import { ProgressProvider } from './providers/ProgressProvider';

export function Providers({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <ProgressProvider>
        {children}
      </ProgressProvider>
    </ThemeProvider>
  );
}
