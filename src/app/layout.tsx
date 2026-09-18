import type { Metadata } from 'next';
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Sidebar } from '@/components/layout/Sidebar';
import { MobileNav } from '@/components/layout/MobileNav';
import { TopBar } from '@/components/layout/TopBar';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { GridBackground } from '@/components/common/GridBackground';
import { EvaDock } from '@/components/eva/EvaDock';
import { SITIO, AUTOR } from '@/lib/brand';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: `${SITIO.nombre} · ${SITIO.subtitulo}`,
    template: `%s — ${SITIO.nombre}`,
  },
  description: SITIO.descripcion,
  applicationName: SITIO.nombre,
  keywords: [
    'prompting jurídico',
    'ingeniería de prompts',
    'metaprompting',
    'inteligencia artificial y Derecho',
    'verificación de fuentes',
    'abogados e IA',
  ],
  authors: [{ name: AUTOR.nombre }],
  creator: AUTOR.nombre,
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    siteName: SITIO.nombre,
    title: `${SITIO.nombre} · ${SITIO.subtitulo}`,
    description: SITIO.descripcion,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITIO.nombre} · ${SITIO.subtitulo}`,
    description: SITIO.descripcion,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[oklch(0.07_0.015_250)] text-zinc-200">
        <a href="#contenido" className="skip-link">
          Saltar al contenido
        </a>
        <GridBackground />
        <div className="relative flex min-h-screen">
          <Sidebar />
          <div className="flex min-w-0 flex-1 flex-col">
            <TopBar />
            <main id="contenido" tabIndex={-1} className="flex-1 pb-20 lg:pb-0">
              {children}
            </main>
            <SiteFooter />
          </div>
        </div>
        <MobileNav />
        <EvaDock />
      </body>
    </html>
  );
}
