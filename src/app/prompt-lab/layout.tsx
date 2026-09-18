import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Prompt Lab',
  description:
    'Constructor de prompts jurídicos: doce decisiones explícitas que se compilan en un prompt, un system prompt y una representación intermedia versionable.',
};

export default function PromptLabLayout({ children }: { children: React.ReactNode }) {
  return children;
}
