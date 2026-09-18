import Link from 'next/link';
import { SECCIONES, GRUPOS } from '@/lib/nav';
import { SITIO, AUTOR, EVA, ENLACES } from '@/lib/brand';
import { EvaMark } from '@/components/eva/EvaMark';

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-white/[0.06] bg-[oklch(0.08_0.016_250/0.6)]">
      <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <EvaMark size={28} muted />
              <span className="mono text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
                {SITIO.partes.uno} <span className="text-zinc-600">{SITIO.partes.dos}</span>
              </span>
            </div>
            <p className="mt-3 text-[14px] leading-relaxed text-zinc-500">{SITIO.subtitulo}</p>
            <p className="mt-2 text-[14px] leading-relaxed text-zinc-600">{EVA.limite}</p>
          </div>

          {GRUPOS.map(g => (
            <div key={g}>
              <div className="mono mb-2.5 text-[13px] font-bold uppercase tracking-[0.18em] text-zinc-700">
                {g}
              </div>
              <ul className="space-y-1.5">
                {SECCIONES.filter(s => s.grupo === g).map(s => (
                  <li key={s.href}>
                    <Link
                      href={s.href}
                      className="text-[15px] text-zinc-500 transition-colors hover:text-cyan-400"
                    >
                      {s.label}
                      {s.enConstruccion && (
                        <span className="ml-1.5 text-[13px] text-amber-500/70">· en obra</span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-9 flex flex-col gap-2 border-t border-white/[0.06] pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[14px] text-zinc-600">{AUTOR.credito}</p>
          <a
            href={ENLACES.repositorio}
            target="_blank"
            rel="noopener noreferrer"
            className="mono text-[13px] uppercase tracking-widest text-zinc-600 transition-colors hover:text-cyan-400"
          >
            Código abierto ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
