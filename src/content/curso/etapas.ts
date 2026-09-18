// ─────────────────────────────────────────────────────────────────────────────
// CURSO · CONSTRUYE TU PROMPT
//
// El curso no es un manual: es una superficie de ejecución. Cinco etapas, una
// acción por etapa. Quien lo hace decide, construye, copia, ejecuta fuera,
// audita, comprueba y se lleva su trabajo.
//
// Este archivo es la única fuente de la secuencia visible.
// ─────────────────────────────────────────────────────────────────────────────

export type StageId = 'pregunta' | 'prompt' | 'auditoria' | 'verificacion' | 'cierre';

export interface EtapaCurso {
  id: StageId;
  /** Etiqueta del indicador de progreso. Una palabra. */
  label: string;
  /** Ruta pública. */
  route: string;
  /** Título de la pantalla. */
  title: string;
  /** Consigna breve: qué hay que hacer aquí. Una línea. */
  brief: string;
}

export const STAGES: readonly EtapaCurso[] = [
  {
    id: 'pregunta',
    label: 'Pregunta',
    route: '/curso',
    title: '¿Quién falló?',
    brief: 'Lee el caso, responde y continúa. No hay respuesta correcta todavía.',
  },
  {
    id: 'prompt',
    label: 'Prompt',
    route: '/curso/prompt',
    title: 'Construye tu prompt',
    brief: 'Toma decisiones con botones. El prompt se escribe solo, más abajo.',
  },
  {
    id: 'auditoria',
    label: 'Auditoría',
    route: '/curso/auditoria',
    title: 'Haz que la IA audite tu prompt',
    brief: 'Copia el paquete, pégalo en tu IA y vuelve con dos decisiones.',
  },
  {
    id: 'verificacion',
    label: 'Verificación',
    route: '/curso/verificacion',
    title: 'Prueba y verifica',
    brief: 'Ejecuta tu prompt, elige una afirmación y compruébala contra una fuente.',
  },
  {
    id: 'cierre',
    label: 'Cierre',
    route: '/curso/cierre',
    title: 'Volvamos al principio',
    brief: 'Responde otra vez, compara y llévate tu trabajo.',
  },
] as const;

export const STAGE_IDS: readonly StageId[] = STAGES.map(s => s.id);

export function getStage(id: StageId): EtapaCurso {
  const stage = STAGES.find(s => s.id === id);
  if (!stage) throw new Error(`Etapa desconocida: ${id}`);
  return stage;
}

export function stageIndex(id: StageId): number {
  return STAGES.findIndex(s => s.id === id);
}

export function nextStage(id: StageId): EtapaCurso | undefined {
  return STAGES[stageIndex(id) + 1];
}

export function prevStage(id: StageId): EtapaCurso | undefined {
  const i = stageIndex(id);
  return i > 0 ? STAGES[i - 1] : undefined;
}

/** Pregunta guía que atraviesa todo el curso. */
export const GUIDING_QUESTION = '¿Quién falló?';

/** Metadatos del curso. Sin fecha ni código: se hace cuando se quiera. */
export const CURSO_META = {
  title: 'Construye tu prompt',
  subtitle: 'Curso e-learning · cinco etapas a tu ritmo',
  /** Estimación honesta, no una promesa. */
  duracion: '45–90 min',
} as const;
