'use client';
// ─────────────────────────────────────────────────────────────────────────────
// ARMAZÓN DEL CURSO
//
// Todo lo que no sea la tarea desaparece. Queda: dónde estás (cinco etapas), la
// consigna de la etapa y la pregunta guía como referencia discreta.
//
// A diferencia de una clase con horario, aquí no hay cronómetro. El progreso se
// guarda en el navegador y se avanza a ritmo propio.
//
// Móvil primero: el indicador de etapas es una fila desplazable de cinco fichas.
// ─────────────────────────────────────────────────────────────────────────────
import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, Check } from 'lucide-react';
import {
  CURSO_META, GUIDING_QUESTION, STAGES, getStage, nextStage,
  type EtapaCurso, type StageId,
} from '@/content/curso/etapas';
import { useCurso } from '@/lib/curso/store';

// ─── Indicador de etapas ─────────────────────────────────────────────────────

function StageRail({ current }: { current: StageId }) {
  const { progress, hydrated } = useCurso();

  return (
    <nav aria-label="Etapas del curso" className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
      <ol className="flex min-w-max items-center gap-1.5">
        {STAGES.map((s, i) => {
          const status = hydrated ? progress.stages[s.id].status : 'pendiente';
          const active = s.id === current;
          const done = status === 'completada';
          return (
            <li key={s.id} className="flex items-center gap-1.5">
              <Link
                href={s.route}
                aria-current={active ? 'step' : undefined}
                className={`flex min-h-10 items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[15px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 ${
                  active
                    ? 'border-cyan-500/50 bg-cyan-500/[0.12] text-cyan-200'
                    : done
                      ? 'border-emerald-500/30 bg-emerald-500/[0.06] text-emerald-300/90'
                      : 'border-white/[0.10] bg-white/[0.02] text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {done ? (
                  <Check className="h-3 w-3 shrink-0" aria-hidden />
                ) : (
                  <span className="mono text-[13px] font-bold" aria-hidden>{i + 1}</span>
                )}
                {s.label}
                {done && <span className="sr-only"> (completada)</span>}
              </Link>
              {i < STAGES.length - 1 && <span aria-hidden className="text-zinc-700">›</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

// ─── Pregunta guía ───────────────────────────────────────────────────────────
//
// Aparece solo después de contestarla, y no muestra la respuesta: es un
// recordatorio de hacia dónde va el curso, no un resultado.

function GuidingRibbon() {
  const { state, hydrated } = useCurso();
  if (!hydrated || !state.initialQuestion.committed) return null;
  return (
    <p className="mono text-[13px] uppercase tracking-[0.16em] text-zinc-500">
      Pregunta guía · <span className="text-cyan-400/90">{GUIDING_QUESTION}</span>
    </p>
  );
}

// ─── Armazón ─────────────────────────────────────────────────────────────────

export function CursoShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const stage = STAGES.find(s => s.route === pathname);

  if (!stage) {
    return <div className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 lg:py-10">{children}</div>;
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 lg:py-10">
      <header className="mb-6 space-y-4">
        <div className="min-w-0">
          <div className="mono text-[13px] font-bold uppercase tracking-[0.18em] text-cyan-400">
            {CURSO_META.subtitle}
          </div>
          <GuidingRibbon />
        </div>

        <StageRail current={stage.id} />

        <div className="border-t border-white/[0.08] pt-4">
          <h1 className="text-2xl font-bold leading-tight text-white sm:text-3xl">{stage.title}</h1>
          <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{stage.brief}</p>
        </div>
      </header>

      <div className="space-y-6">{children}</div>

      <StageFooter stage={stage} />
    </div>
  );
}

// ─── Avance ──────────────────────────────────────────────────────────────────

function StageFooter({ stage }: { stage: EtapaCurso }) {
  const { progress, hydrated } = useCurso();
  const next = nextStage(stage.id);
  const missing = hydrated ? progress.stages[stage.id].missing : [];

  // En la última etapa no hay adónde ir, pero sí queda por decir qué falta.
  if (!next && missing.length === 0) return null;

  return (
    <div className="mt-10 space-y-3 border-t border-white/[0.08] pt-5">
      {missing.length > 0 && (
        <ul className="space-y-0.5 text-xs text-amber-300/80">
          {missing.map(m => <li key={m}>· {m}</li>)}
        </ul>
      )}
      {next && (
        <Link
          href={next.route}
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-cyan-500/45 bg-cyan-500/15 px-5 py-3 text-sm font-semibold text-cyan-100 transition-colors hover:bg-cyan-500/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 sm:w-auto"
        >
          {getStage(next.id).title}
          <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
        </Link>
      )}
    </div>
  );
}
