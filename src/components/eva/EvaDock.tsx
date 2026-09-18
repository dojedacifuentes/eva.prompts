'use client';
// ─────────────────────────────────────────────────────────────────────────────
// EVA — ASISTENTE FLOTANTE
//
// Vive una sola vez, montada en el layout raíz, y sabe en qué sección está por
// la ruta. No ocupa sitio en la maquetación: es un botón redondo abajo a la
// izquierda que abre un panel por encima del contenido.
//
// Lo que dice sale de `content/eva.ts`, escrito a mano. No hay modelo detrás, y
// el panel lo declara en su propio pie: un asistente que aparenta pensar mientras
// recita es justo el hábito que este laboratorio intenta desmontar.
// ─────────────────────────────────────────────────────────────────────────────
import { useCallback, useEffect, useId, useRef, useState, useSyncExternalStore } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageCircleQuestion, X } from 'lucide-react';
import { EVA } from '@/lib/brand';
import { seccionDe } from '@/lib/nav';
import { getGuion, type EvaPregunta } from '@/content/eva';

// ─── ¿Ya se abrió alguna vez? ────────────────────────────────────────────────
//
// Un store externo mínimo, como el del curso: así la lectura del disco ocurre
// en el primer render de cliente y no en un efecto que dispare otro render.
const CLAVE_VISTA = 'eva.dock.vista';

let vistaCache: boolean | null = null;
const oyentes = new Set<() => void>();

function suscribirVista(fn: () => void): () => void {
  oyentes.add(fn);
  return () => {
    oyentes.delete(fn);
  };
}

function leerVista(): boolean {
  if (vistaCache !== null) return vistaCache;
  try {
    vistaCache = window.localStorage.getItem(CLAVE_VISTA) === '1';
  } catch {
    vistaCache = false; // Almacenamiento bloqueado: se insiste, que es lo inocuo.
  }
  return vistaCache;
}

/** En el servidor no se insiste: el punto aparecería y desaparecería al hidratar. */
function vistaEnServidor(): boolean {
  return true;
}

function marcarVista(): void {
  vistaCache = true;
  try {
    window.localStorage.setItem(CLAVE_VISTA, '1');
  } catch {
    // Sin almacenamiento: el punto reaparecerá en la próxima visita. Da igual.
  }
  for (const fn of oyentes) fn();
}

/** Una pregunta plegable dentro del panel. */
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
        className="group flex w-full items-start gap-2.5 py-3 text-left"
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
            key="respuesta"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="flex gap-2.5 pb-4">
              <span aria-hidden className="w-[18px] shrink-0">
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

export function EvaDock() {
  const pathname = usePathname();
  const seccion = seccionDe(pathname);
  const guion = getGuion(seccion?.eva ?? '');

  // El panel guarda PARA QUÉ RUTA se abrió, no un simple booleano: al navegar,
  // `abierto` pasa a false solo, sin un efecto que lo cierre a posteriori. Así
  // nunca se ve el panel de una página con el contenido de otra.
  const [abiertoEn, setAbiertoEn] = useState<string | null>(null);
  const abierto = abiertoEn === pathname;

  const vista = useSyncExternalStore(suscribirVista, leerVista, vistaEnServidor);
  const lanzadorRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  const cerrar = useCallback((devolverFoco = true) => {
    setAbiertoEn(null);
    if (devolverFoco) lanzadorRef.current?.focus();
  }, []);

  // Escape cierra. Clic fuera también: es un panel, no un diálogo modal, y no
  // debe secuestrar la página.
  useEffect(() => {
    if (!abierto) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') cerrar();
    }
    function onClick(e: MouseEvent) {
      const t = e.target as Node;
      if (panelRef.current?.contains(t) || lanzadorRef.current?.contains(t)) return;
      cerrar(false);
    }
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [abierto, cerrar]);

  useEffect(() => {
    if (abierto) panelRef.current?.focus();
  }, [abierto]);

  // Sin guion escrito, EVA calla: mejor ausente que improvisando.
  if (!guion) return null;

  function alternar() {
    if (abierto) {
      setAbiertoEn(null);
      return;
    }
    if (!vista) marcarVista();
    setAbiertoEn(pathname);
  }

  return (
    // `bottom-24` en móvil deja libre la barra de navegación inferior.
    <div className="pointer-events-none fixed bottom-24 left-4 z-50 flex flex-col items-start gap-3 lg:bottom-6 lg:left-6">
      <AnimatePresence>
        {abierto && (
          <motion.div
            ref={panelRef}
            key="panel"
            tabIndex={-1}
            role="dialog"
            aria-label={`${EVA.nombre}, ${EVA.rol}`}
            id={panelId}
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="pointer-events-auto flex max-h-[min(70vh,34rem)] w-[calc(100vw-2rem)] max-w-[24rem] origin-bottom-left flex-col overflow-hidden rounded-2xl border border-white/[0.12] bg-[oklch(0.10_0.018_250/0.97)] shadow-[0_20px_60px_oklch(0_0_0/0.6)] backdrop-blur-xl focus:outline-none"
          >
            <header className="flex items-start gap-3 border-b border-white/[0.08] p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={EVA.retratoSonrisa}
                alt=""
                aria-hidden="true"
                width={44}
                height={44}
                className="h-11 w-11 shrink-0 rounded-full object-cover ring-1 ring-cyan-400/35"
              />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <span className="mono text-[13px] font-bold uppercase tracking-[0.2em] text-cyan-400">
                    {EVA.nombre}
                  </span>
                  <span className="mono text-[13px] uppercase tracking-widest text-zinc-600">
                    {EVA.rol}
                  </span>
                </div>
                <p className="mt-0.5 truncate text-[13px] text-zinc-500">{seccion?.titulo}</p>
              </div>
              <button
                type="button"
                onClick={() => cerrar()}
                aria-label="Cerrar"
                className="-m-1.5 shrink-0 rounded-lg p-1.5 text-zinc-500 transition-colors hover:bg-white/[0.06] hover:text-zinc-200"
              >
                <X aria-hidden className="h-4 w-4" />
              </button>
            </header>

            <div className="min-h-0 flex-1 overflow-y-auto px-4">
              <div className="py-3.5">
                <p className="text-[15px] leading-relaxed text-zinc-300">{guion.intro}</p>
                {guion.matiz && (
                  <p className="mt-1.5 text-[13px] leading-relaxed text-zinc-500">{guion.matiz}</p>
                )}
              </div>

              <ul className="border-t border-white/[0.06]">
                {guion.preguntas.map((item, i) => (
                  <Pregunta key={item.q} item={item} index={i} />
                ))}
              </ul>
            </div>

            <p className="border-t border-white/[0.08] px-4 py-3 text-[13px] leading-relaxed text-zinc-600">
              {EVA.limite}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        ref={lanzadorRef}
        type="button"
        onClick={alternar}
        aria-expanded={abierto}
        aria-controls={abierto ? panelId : undefined}
        aria-label={`${EVA.nombre}: ${EVA.invitacion}`}
        className="pointer-events-auto group relative flex h-14 w-14 items-center justify-center rounded-full border border-cyan-400/30 bg-[oklch(0.10_0.018_250)] shadow-[0_8px_30px_oklch(0_0_0/0.5)] transition-all hover:border-cyan-400/60 hover:shadow-[0_8px_34px_oklch(0.71_0.17_200/0.25)]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={abierto ? EVA.retratoSonrisa : EVA.retrato}
          alt=""
          aria-hidden="true"
          width={56}
          height={56}
          className="h-full w-full rounded-full object-cover"
        />

        {/* Al abrirse, el retrato cede sitio a un aspa legible. */}
        <span
          aria-hidden
          className={`absolute inset-0 flex items-center justify-center rounded-full bg-[oklch(0.10_0.018_250/0.82)] transition-opacity duration-200 ${
            abierto ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <X className="h-5 w-5 text-cyan-300" />
        </span>

        {/* Punto de aviso: solo hasta la primera vez que se abre. */}
        {!vista && !abierto && (
          <span
            aria-hidden
            className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-cyan-400 ring-2 ring-[oklch(0.07_0.015_250)]"
          >
            <MessageCircleQuestion className="h-2.5 w-2.5 text-[oklch(0.07_0.015_250)]" />
          </span>
        )}
      </button>
    </div>
  );
}
