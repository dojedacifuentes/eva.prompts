import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Conceptos',
  description:
    'Vocabulario mínimo de IA aplicada al Derecho: alucinación, ventana de contexto, temperatura y el resto de términos que conviene manejar antes de negociar con quien te vende la herramienta.',
};

export default function ConceptosLayout({ children }: { children: React.ReactNode }) {
  return children;
}
