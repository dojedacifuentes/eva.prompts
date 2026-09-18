'use client';
// ─────────────────────────────────────────────────────────────────────────────
// CURSO · STORE
//
// Local-first: nada sale nunca del navegador. No hay «enviar».
//
// El estado vive en un store externo mínimo al que React se suscribe con
// `useSyncExternalStore`. Esto resuelve tres cosas de golpe:
//
//   · la hidratación no necesita un efecto que haga setState y provoque un
//     render en cascada al entrar en cada etapa;
//   · el trabajo sobrevive a que el proveedor se vuelva a montar al navegar
//     entre etapas, porque el estado no cuelga de un componente;
//   · la escritura en localStorage ocurre en la propia acción de quien hace el
//     curso, que es cuando realmente hay algo que guardar.
// ─────────────────────────────────────────────────────────────────────────────
import { createContext, useCallback, useContext, useMemo, useSyncExternalStore, type ReactNode } from 'react';
import {
  createInitialState, loadState, saveState, clearState, type CursoState,
} from './estado';
import { computeProgress, type CursoProgress } from './progreso';

type Updater = (draft: CursoState) => CursoState;

// ─── Store externo ───────────────────────────────────────────────────────────

/** Instantánea del servidor: estable entre renders, como exige React. */
const SERVER_SNAPSHOT: CursoState = createInitialState();

let snapshot: CursoState | null = null;
const listeners = new Set<() => void>();

function getSnapshot(): CursoState {
  // La lectura del disco ocurre una sola vez, en el primer render de cliente.
  if (!snapshot) snapshot = loadState();
  return snapshot;
}

function getServerSnapshot(): CursoState {
  return SERVER_SNAPSHOT;
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function emit() {
  for (const listener of listeners) listener();
}

function apply(fn: Updater): void {
  const now = new Date().toISOString();
  const next = fn(getSnapshot());
  snapshot = { ...next, startedAt: next.startedAt ?? now, updatedAt: now };
  saveState(snapshot);
  emit();
}

// El indicador de hidratación no necesita estado: es `false` en el servidor y
// `true` en cuanto React toma el control en el cliente.
const NOOP_UNSUBSCRIBE = () => {};
function subscribeNever(): () => void {
  return NOOP_UNSUBSCRIBE;
}

// ─── Contexto ────────────────────────────────────────────────────────────────

interface CursoContext {
  state: CursoState;
  progress: CursoProgress;
  hydrated: boolean;
  update: (fn: Updater) => void;
  reset: () => void;
}

const Ctx = createContext<CursoContext | null>(null);

export function CursoProvider({ children }: { children: ReactNode }) {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const hydrated = useSyncExternalStore(subscribeNever, () => true, () => false);

  const update = useCallback((fn: Updater) => apply(fn), []);

  const reset = useCallback(() => {
    clearState();
    snapshot = createInitialState();
    emit();
  }, []);

  const progress = useMemo(() => computeProgress(state), [state]);

  const value = useMemo(
    () => ({ state, progress, hydrated, update, reset }),
    [state, progress, hydrated, update, reset],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCurso(): CursoContext {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useCurso debe usarse dentro de <CursoProvider>.');
  return ctx;
}
