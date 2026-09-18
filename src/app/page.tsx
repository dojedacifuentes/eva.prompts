import Link from 'next/link';
import { ArrowRight, GraduationCap, Zap } from 'lucide-react';
import { SECCIONES } from '@/lib/nav';
import { SITIO } from '@/lib/brand';
import { TIEMPOS, CONCLUSION, PILARES } from '@/content/tesis';
import { EvaAssistant } from '@/components/eva/EvaAssistant';
import { EvaMark } from '@/components/eva/EvaMark';

const acentoTexto = {
  cyan: 'text-cyan-400',
  indigo: 'text-indigo-400',
  purple: 'text-purple-400',
} as const;

const acentoBorde = {
  cyan: 'border-cyan-500/25 hover:border-cyan-500/45',
  indigo: 'border-indigo-500/25 hover:border-indigo-500/45',
  purple: 'border-purple-500/25 hover:border-purple-500/45',
} as const;

export default function InicioPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:py-14">
      {/* ── Portada ────────────────────────────────────────────────────────── */}
      <section className="relative">
        <div className="flex items-center gap-3">
          <EvaMark size={34} />
          <span className="mono text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-500">
            {SITIO.subtitulo}
          </span>
        </div>

        <h1 className="mt-5 text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-6xl">
          {SITIO.partes.uno}{' '}
          <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
            {SITIO.partes.dos}
          </span>
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-zinc-300 sm:text-xl">
          {SITIO.tesis}
        </p>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-500">
          {SITIO.descripcion}
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/prompt-lab"
            className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-cyan-500/45 bg-cyan-500/15 px-5 py-3 text-sm font-semibold text-cyan-100 transition-colors hover:bg-cyan-500/25"
          >
            <Zap className="h-4 w-4 shrink-0" aria-hidden />
            Abrir el Prompt Lab
          </Link>
          <Link
            href="/curso"
            className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-white/[0.14] bg-white/[0.03] px-5 py-3 text-sm font-semibold text-zinc-200 transition-colors hover:border-indigo-500/45 hover:text-indigo-200"
          >
            <GraduationCap className="h-4 w-4 shrink-0" aria-hidden />
            Empezar el curso
          </Link>
        </div>
      </section>

      {/* ── EVA ───────────────────────────────────────────────────────────── */}
      <div className="mt-10">
        <EvaAssistant section="inicio" />
      </div>

      {/* ── El arco: tres tiempos ─────────────────────────────────────────── */}
      <section aria-labelledby="arco" className="mt-16">
        <h2 id="arco" className="sr-only">
          Qué pasó con la ingeniería de prompts
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {TIEMPOS.map((t, i) => (
            <article
              key={t.kicker}
              className="relative rounded-2xl border border-white/[0.08] bg-[oklch(0.10_0.018_250/0.55)] p-5"
            >
              <div className="flex items-baseline gap-2">
                <span className={`mono text-[10px] font-bold uppercase tracking-[0.2em] ${acentoTexto[t.accent]}`}>
                  {t.kicker}
                </span>
                <span aria-hidden className="mono text-[10px] text-zinc-700">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="mt-2 text-xl font-bold leading-tight text-white">{t.titulo}</h3>
              <p className="mt-2.5 text-[13px] leading-relaxed text-zinc-400">{t.cuerpo}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── La conclusión jurídica ────────────────────────────────────────── */}
      <section
        aria-labelledby="conclusion"
        className="mt-6 rounded-2xl border border-cyan-500/20 bg-cyan-500/[0.04] p-6 sm:p-8"
      >
        <h2 id="conclusion" className="text-2xl font-bold leading-tight text-white sm:text-3xl">
          {CONCLUSION.titulo}
        </h2>
        <div className="mt-4 space-y-3">
          {CONCLUSION.cuerpo.map((p, i) => (
            <p key={i} className="max-w-3xl text-sm leading-relaxed text-zinc-300">
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* ── Los tres pilares ──────────────────────────────────────────────── */}
      <section aria-labelledby="pilares" className="mt-16">
        <div className="mono text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">
          Lo que cambia cuando el oficio es jurídico
        </div>
        <h2 id="pilares" className="mt-2 text-2xl font-bold text-white sm:text-3xl">
          Tres exigencias que no se delegan
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {PILARES.map(p => (
            <article key={p.id} className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
              <h3 className={`text-base font-bold ${acentoTexto[p.accent]}`}>{p.titulo}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-zinc-400">{p.cuerpo}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── Mapa del laboratorio ──────────────────────────────────────────── */}
      <section aria-labelledby="secciones" className="mt-16">
        <div className="mono text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">
          Qué hay aquí
        </div>
        <h2 id="secciones" className="mt-2 text-2xl font-bold text-white sm:text-3xl">
          El laboratorio
        </h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {SECCIONES.filter(s => s.href !== '/').map(s => {
            const accent = s.enConstruccion ? 'purple' : s.grupo === 'Laboratorio' ? 'cyan' : 'indigo';
            return (
              <Link
                key={s.href}
                href={s.href}
                className={`group flex items-start gap-3.5 rounded-2xl border bg-white/[0.02] p-5 transition-colors ${acentoBorde[accent]}`}
              >
                <s.icon
                  aria-hidden
                  className={`mt-0.5 h-5 w-5 shrink-0 ${acentoTexto[accent]}`}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-bold text-white">{s.titulo}</h3>
                    {s.enConstruccion && (
                      <span className="mono rounded-full border border-amber-500/25 bg-amber-500/5 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-amber-400">
                        En obra
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-[13px] leading-relaxed text-zinc-500">{s.subtitulo}</p>
                </div>
                <ArrowRight
                  aria-hidden
                  className="mt-0.5 h-4 w-4 shrink-0 text-zinc-700 transition-transform group-hover:translate-x-0.5 group-hover:text-zinc-500"
                />
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
