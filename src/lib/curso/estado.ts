// ─────────────────────────────────────────────────────────────────────────────
// CURSO · MODELO DE ESTADO
//
// Todo el trabajo vive en un único objeto serializable, persistido en
// localStorage bajo una clave versionada. Sin backend, sin cuenta, sin envíos:
// solo lo que la propia persona escribe, en su propio navegador.
//
// El estado está centralizado a propósito: la vista final y la descarga se
// construyen ambas desde aquí con una sola función (`buildEntregable`), de modo
// que ninguna pueda mostrar una versión distinta del mismo trabajo.
// ─────────────────────────────────────────────────────────────────────────────
import type { BlameOption, ConfidenceLevel, ClaimAction } from '@/content/curso/actividades';
import { emptyDraft, type PromptDraft } from '@/content/curso/lab';

export const STORAGE_KEY = 'eva.curso.construye-tu-prompt';
export const SCHEMA_VERSION = 1;

// ─── Sub-estados ─────────────────────────────────────────────────────────────

export interface StudentIdentity {
  /** Nombre con el que firmar el documento descargado. Nunca sale del equipo. */
  name: string;
}

/** Respuesta comprometida: no se puede editar una vez confirmada. */
export interface QuestionAnswer {
  blame: BlameOption | null;
  confidence: ConfidenceLevel | null;
  committed: boolean;
  at: string | null;
}

export function emptyAnswer(): QuestionAnswer {
  return { blame: null, confidence: null, committed: false, at: null };
}

export interface PromptV1State {
  draft: PromptDraft;
  /**
   * Edición manual del estudiante sobre el prompt compilado. Cuando tiene
   * contenido, manda sobre el compilador: el botón «Editar» del laboratorio
   * escribe aquí y el compilador deja de pisar el texto.
   */
  manual: string;
  /** Texto vigente del Prompt V1: la edición manual si la hay, el compilado si no. */
  text: string;
  at: string | null;
}

export interface AuditState {
  /** Herramienta externa utilizada (id de AI_TOOLS). */
  tool: string | null;
  accepted: string;
  rejected: string;
  why: string;
}

export interface PromptV2State {
  text: string;
  at: string | null;
  /** El editor se sembró con el Prompt V1: no volver a pisarlo. */
  seeded: boolean;
}

export interface VerifiedClaim {
  id: string;
  claim: string;
  source: string;
  locator: string;
  action: ClaimAction | null;
}

export function emptyClaim(id: string): VerifiedClaim {
  return { id, claim: '', source: '', locator: '', action: null };
}

export interface VerificationState {
  claims: VerifiedClaim[];
}

export interface ReflectionState {
  before: string;
  after: string;
}

export interface SubmissionState {
  /** Última vez que se descargó el documento del curso. */
  downloadedAt: string | null;
}

// ─── Estado raíz ─────────────────────────────────────────────────────────────

export interface CursoState {
  schemaVersion: number;
  startedAt: string | null;
  updatedAt: string | null;
  identity: StudentIdentity;
  initialQuestion: QuestionAnswer;
  promptV1: PromptV1State;
  audit: AuditState;
  promptV2: PromptV2State;
  verification: VerificationState;
  finalQuestion: QuestionAnswer;
  reflection: ReflectionState;
  submission: SubmissionState;
}

export function createInitialState(): CursoState {
  return {
    schemaVersion: SCHEMA_VERSION,
    startedAt: null,
    updatedAt: null,
    identity: { name: '' },
    initialQuestion: emptyAnswer(),
    promptV1: { draft: emptyDraft(), manual: '', text: '', at: null },
    audit: { tool: null, accepted: '', rejected: '', why: '' },
    promptV2: { text: '', at: null, seeded: false },
    verification: { claims: [emptyClaim('c1')] },
    finalQuestion: emptyAnswer(),
    reflection: { before: '', after: '' },
    submission: { downloadedAt: null },
  };
}

// ─── Persistencia ────────────────────────────────────────────────────────────

/**
 * Rellena huecos de un estado leído del disco contra la forma actual. Un schema
 * antiguo nunca rompe la aplicación: los campos nuevos aparecen vacíos en lugar
 * de `undefined`.
 */
export function migrate(raw: unknown): CursoState {
  const base = createInitialState();
  if (!raw || typeof raw !== 'object') return base;

  const parsed = raw as Partial<CursoState>;
  const merged: CursoState = {
    ...base,
    ...parsed,
    schemaVersion: SCHEMA_VERSION,
    identity: { ...base.identity, ...(parsed.identity ?? {}) },
    initialQuestion: { ...base.initialQuestion, ...(parsed.initialQuestion ?? {}) },
    promptV1: {
      ...base.promptV1,
      ...(parsed.promptV1 ?? {}),
      draft: { ...emptyDraft(), ...(parsed.promptV1?.draft ?? {}) },
    },
    audit: { ...base.audit, ...(parsed.audit ?? {}) },
    promptV2: { ...base.promptV2, ...(parsed.promptV2 ?? {}) },
    verification: { ...base.verification, ...(parsed.verification ?? {}) },
    finalQuestion: { ...base.finalQuestion, ...(parsed.finalQuestion ?? {}) },
    reflection: { ...base.reflection, ...(parsed.reflection ?? {}) },
    submission: { ...base.submission, ...(parsed.submission ?? {}) },
  };

  // Invariantes de forma que el resto del código da por supuestos.
  const draft = merged.promptV1.draft;
  if (!Array.isArray(draft.constraints)) draft.constraints = [];
  if (!Array.isArray(draft.controls)) draft.controls = [];
  if (!draft.extras || typeof draft.extras !== 'object') draft.extras = emptyDraft().extras;
  if (!Array.isArray(merged.verification.claims) || merged.verification.claims.length === 0) {
    merged.verification.claims = [emptyClaim('c1')];
  }
  return merged;
}

export function loadState(): CursoState {
  if (typeof window === 'undefined') return createInitialState();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return createInitialState();
    return migrate(JSON.parse(raw));
  } catch {
    return createInitialState();
  }
}

export function saveState(state: CursoState): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Cuota agotada o almacenamiento bloqueado: la sesión sigue en memoria.
  }
}

export function clearState(): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // sin almacenamiento
  }
}

/** El prompt que el estudiante lleva a la IA: V2 si existe, V1 si no. */
export function currentPrompt(state: CursoState): string {
  return state.promptV2.text.trim() || state.promptV1.text.trim();
}

export function displayName(identity: StudentIdentity): string {
  return identity.name.trim();
}
