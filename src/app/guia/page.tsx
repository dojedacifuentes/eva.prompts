import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import { PARTES, ETIQUETAS, recuento } from '@/content/guia';
import { EvaAssistant } from '@/components/eva/EvaAssistant';

export const metadata: Metadata = {
  title: 'Guía completa de prompting jurídico',
  description:
    'El índice completo de la guía, con el estado real de cada capítulo. Un capítulo pasa a publicado cuando se puede leer, no cuando se anuncia.',
};

export default function GuiaPage() {
  const { total, listos, borradores } = recuento();

  return (
    <div className="mx-auto w-full max-w-3xl space-y-8 px-4 py-8 sm:px-6">
      <header>
        <h1 className="flex items-center gap-3 text-3xl font-black text-white">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-amber-500/40 bg-amber-500/20">
            <BookOpen className="h-5 w-5 text-amber-400" aria-hidden />
          </span>
          Guía completa
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">
          Prompting jurídico, de la instrucción al escrito firmado. Todavía no está escrita: lo que
          hay publicado es el plan, y cada capítulo lleva su estado real.
        </p>

        <div className="mono mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[14px] uppercase tracking-widest text-zinc-600">
          <span>
            <span className="text-emerald-400">{listos}</span> publicados
          </span>
          <span>
            <span className="text-amber-400">{borradores}</span> en borrador
          </span>
          <span>
            <span className="text-zinc-400">{total}</span> capítulos previstos
          </span>
        </div>
      </header>

      <EvaAssistant section="guia" />

      <div className="space-y-8">
        {PARTES.map(parte => (
          <section key={parte.titulo} aria-labelledby={parte.titulo}>
            <h2
              id={parte.titulo}
              className="mono mb-3 text-[13px] font-bold uppercase tracking-[0.2em] text-cyan-400"
            >
              {parte.titulo}
            </h2>

            <ul className="space-y-2">
              {parte.capitulos.map(c => {
                const etiqueta = ETIQUETAS[c.estado];
                const cuerpo = (
                  <>
                    <div className="flex items-start gap-3">
                      <span
                        aria-hidden
                        className="mono mt-0.5 shrink-0 text-[14px] font-bold tabular-nums text-zinc-700"
                      >
                        {c.n}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-[17px] font-bold leading-tight text-zinc-200">
                            {c.titulo}
                          </h3>
                          <span
                            className={`mono shrink-0 rounded-full border px-2 py-0.5 text-[13px] font-bold uppercase tracking-widest ${etiqueta.clase}`}
                          >
                            {etiqueta.label}
                          </span>
                        </div>
                        <p className="mt-1 text-[15px] leading-relaxed text-zinc-500">{c.resumen}</p>
                        {c.mientrasTanto && !c.href && (
                          <Link
                            href={c.mientrasTanto.href}
                            className="mt-2 inline-flex items-center gap-1.5 text-[15px] font-medium text-cyan-400 transition-colors hover:text-cyan-300"
                          >
                            {c.mientrasTanto.label}
                            <ArrowRight className="h-3 w-3 shrink-0" aria-hidden />
                          </Link>
                        )}
                      </div>
                    </div>
                  </>
                );

                return (
                  <li
                    key={c.n}
                    className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4"
                  >
                    {c.href ? (
                      <Link href={c.href} className="block transition-opacity hover:opacity-90">
                        {cuerpo}
                      </Link>
                    ) : (
                      cuerpo
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>

      <footer className="rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3.5">
        <p className="text-xs leading-relaxed text-zinc-500">
          Mientras la guía se escribe, el{' '}
          <Link href="/curso" className="text-cyan-400 underline underline-offset-2">
            curso
          </Link>{' '}
          cubre el hábito completo en una sesión y el{' '}
          <Link href="/prompt-lab" className="text-cyan-400 underline underline-offset-2">
            Prompt Lab
          </Link>{' '}
          construye el encargo paso a paso.
        </p>
      </footer>
    </div>
  );
}
