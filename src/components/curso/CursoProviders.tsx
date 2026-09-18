'use client';
import type { ReactNode } from 'react';
import { CursoProvider } from '@/lib/curso/store';
import { CursoShell } from './CursoShell';

export function CursoProviders({ children }: { children: ReactNode }) {
  return (
    <CursoProvider>
      <CursoShell>{children}</CursoShell>
    </CursoProvider>
  );
}
