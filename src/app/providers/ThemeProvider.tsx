// src/app/providers/ThemeProvider.tsx
'use client';

import { ReactNode, useEffect, useState } from 'react';
import { ThemeProvider as NextThemeProvider } from 'next-themes';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      storageKey="da-theme"
    >
      {children}
    </NextThemeProvider>
  );
}
