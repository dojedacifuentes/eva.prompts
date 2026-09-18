import type { Metadata } from 'next';
import { CursoProviders } from '@/components/curso/CursoProviders';
import { CURSO_META } from '@/content/curso/etapas';

export const metadata: Metadata = {
  title: CURSO_META.title,
  description:
    'Curso e-learning en cinco etapas: construye un prompt jurídico, hazlo auditar, ejecútalo, comprueba una afirmación contra su fuente y llévate tu trabajo. A tu ritmo, sin cuenta y sin enviar nada a ninguna parte.',
};

export default function CursoLayout({ children }: { children: React.ReactNode }) {
  return <CursoProviders>{children}</CursoProviders>;
}
