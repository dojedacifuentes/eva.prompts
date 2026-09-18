import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Toolkit',
  description:
    'Qué herramienta para qué encargo, flujos de trabajo encadenados y los dos protocolos que no deberían saltarse: confidencialidad y verificación.',
};

export default function ToolkitLayout({ children }: { children: React.ReactNode }) {
  return children;
}
