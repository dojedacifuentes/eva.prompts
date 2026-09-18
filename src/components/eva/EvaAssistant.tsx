'use client';
import { useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { EVA } from '@/lib/brand';
import { getGuion, type EvaPregunta } from '@/content/eva';
import { EvaAvatar } from './EvaMark';

/** Una pregunta plegable. El cuerpo respeta los saltos de párrafo del guion. */
function Pregunta({ item, index }: { item: EvaPregunta; index: number }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <li className="border-t border-white/[0.06] first:border-t-0">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="group flex w-full items-start gap-3 px-1 py-3 text-left transition-colors"
      >
        <span
          aria-hidden
          className="mono mt-[3px] shrink-0 text-[13px] font-bold tabular-nums text-cyan-400/45"
        >
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="min-w-0 flex-1 text-[15px] font-medium leading-snug text-zinc-300 transition-colors group-hover:text-zinc-100">
          {item.q}
        </span>
        <ChevronDown
          aria-hidden
          className={`mt-0.5 h-4 w-4 shrink-0 text-zinc-600 transition-transform duration-200 group-hover:text-cyan-400/70 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="flex gap-3 pb-4 pl-1 pr-1">
              <span aria-hidden className="mt-1 w-[18px] shrink-0">
                <span className="block h-full w-px bg-gradient-to-b from-cyan-500/40 to-transparent" />
              </span>
              <div className="min-w-0 space-y-2.5">
                {item.a.split('\n\n').map((p, i) => (
                  <p key={i} className="text-[15px] leading-relaxed text-zinc-400">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

/**
 * Panel de EVA: presenta la sección y abre las preguntas que suelen seguir.
 *
 * Es el mismo componente en todas las rutas; lo único que cambia es el guion,
 * que vive en `content/eva.ts`. Si una sección no tiene guion escrito, el panel
 * no se dibuja: EVA calla antes que improvisar.
 */
export function EvaAssistant({
  section,
  className = '',
  /** Abre la primera pregunta al cargar. Útil en páginas cortas. */
  defaultOpenFirst = false,
}: {
  section: string;
  className?: string;
  defaultOpenFirst?: boolean;
}) {
  const guion = getGuion(section);
  const [abierto, setAbierto] = useState(defaultOpenFirst);
  if (!guion) return null;

  return (
    <section
      aria-label={`${EVA.nombre}: guía de esta sección`}
      className={`rounded-2xl border border-white/[0.08] bg-[oklch(0.10_0.018_250/0.55)] backdrop-blur-sm ${className}`}
    >
      <div className="flex items-start gap-3.5 p-4 sm:p-5">
        <EvaAvatar size={44} />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <span className="mono text-[13px] font-bold uppercase tracking-[0.2em] text-cyan-400">
              {EVA.nombre}
            </span>
            <span className="mono text-[13px] uppercase tracking-widest text-zinc-600">
              {EVA.rol}
            </span>
          </div>

          <p className="mt-1.5 text-[15px] leading-relaxed text-zinc-300">{guion.intro}</p>
          {guion.matiz && (
            <p className="mt-1 text-[15px] leading-relaxed text-zinc-500">{guion.matiz}</p>
          )}

          <button
            type="button"
            onClick={() => setAbierto(v => !v)}
            aria-expanded={abierto}
            className="mono mt-3 inline-flex items-center gap-1.5 rounded-lg border border-cyan-500/25 bg-cyan-500/[0.06] px-2.5 py-1.5 text-[13px] font-bold uppercase tracking-widest text-cyan-400 transition-colors hover:border-cyan-500/45 hover:bg-cyan-500/[0.12]"
          >
            {abierto ? 'Cerrar' : `${guion.preguntas.length} preguntas`}
            <ChevronDown
              aria-hidden
              className={`h-3 w-3 transition-transform duration-200 ${abierto ? 'rotate-180' : ''}`}
            />
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {abierto && (
          <motion.div
            key="preguntas"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/[0.06] px-4 sm:px-5">
              <ul className="py-1">
                {guion.preguntas.map((item, i) => (
                  <Pregunta key={item.q} item={item} index={i} />
                ))}
              </ul>
              <p className="border-t border-white/[0.06] py-3 text-[13px] leading-relaxed text-zinc-600">
                {EVA.limite}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
