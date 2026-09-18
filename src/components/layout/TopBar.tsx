'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { seccionDe } from '@/lib/nav';
import { SITIO } from '@/lib/brand';
import { EvaMark } from '@/components/eva/EvaMark';

export function TopBar() {
  const pathname = usePathname();
  const sec = seccionDe(pathname);
  const titulo = sec?.titulo ?? SITIO.nombre;
  const subtitulo = sec?.subtitulo ?? SITIO.subtitulo;

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[oklch(0.07_0.015_250/0.8)] backdrop-blur-xl">
      <div className="flex h-14 items-center justify-between gap-3 px-4 lg:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <Link href="/" className="lg:hidden" aria-label={`${SITIO.nombre}: inicio`}>
            <EvaMark size={28} />
          </Link>
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold leading-tight text-white">{titulo}</div>
            <div className="hidden truncate text-[14px] leading-tight text-zinc-500 sm:block">
              {subtitulo}
            </div>
          </div>
        </div>

        {sec?.enConstruccion ? (
          <span className="mono shrink-0 rounded-full border border-amber-500/25 bg-amber-500/5 px-3 py-1.5 text-[13px] font-bold uppercase tracking-widest text-amber-400">
            En construcción
          </span>
        ) : (
          <span className="mono hidden shrink-0 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-3 py-1.5 text-[13px] font-bold uppercase tracking-widest text-cyan-400 sm:block">
            {SITIO.partes.uno} {SITIO.partes.dos}
          </span>
        )}
      </div>
    </header>
  );
}
