// ─────────────────────────────────────────────────────────────────────────────
// CURSO · BANCO DE PROMPTS DE REFERENCIA
//
// Los textos que el curso entrega para copiar. Se leen como ejemplos, no como
// plantillas a rellenar: cada uno lleva su propósito, cuándo usarlo, su nivel
// de riesgo y —cuando corresponde— la advertencia de por qué no es perfecto.
// ─────────────────────────────────────────────────────────────────────────────

export type RiskLevel = 'bajo' | 'medio' | 'alto';

export interface CanonicalPrompt {
  id: string;
  title: string;
  /** Texto de referencia. Se copia sin modificar. */
  text: string;
  purpose: string;
  whenToUse: string;
  risk: RiskLevel | 'medio-alto';
  /** Iteración recomendada cuando el riesgo sube. */
  iteration?: string;
  /** Advertencia que acompaña al prompt: por qué no es perfecto. */
  warning?: string;
}

export const PROMPT_DIAGNOSTICO: CanonicalPrompt = {
  id: 'diagnostico',
  title: 'Prompt mínimo de diagnóstico',
  text: 'Analiza esta sentencia.',
  purpose:
    'Hacer visible cuántas decisiones se delegan silenciosamente en una instrucción que parece razonable.',
  whenToUse: 'Como punto de partida de un diagnóstico, nunca como encargo real.',
  risk: 'alto',
};

export const PROMPT_REFERENCIA: CanonicalPrompt = {
  id: 'referencia',
  title: 'Prompt de referencia',
  text: `Estoy preparando una ficha de estudio para estudiantes de tercer año de Derecho a partir de la sentencia que adjunto. Analiza exclusivamente ese documento.

Identifica: (1) hechos jurídicamente relevantes; (2) cuestión jurídica controvertida; (3) normas que el tribunal aplica o menciona; (4) principales argumentos de las partes; (5) razonamiento del tribunal; y (6) decisión.

No incorpores jurisprudencia, doctrina ni hechos externos al documento. Distingue expresamente entre información textual de la sentencia e inferencias propias. Si un elemento no consta, escribe "No consta en la fuente". Para cada afirmación jurídica relevante, indica el considerando, página o localizador disponible.

Presenta el resultado primero en una tabla y luego en una síntesis de máximo 150 palabras.`,
  purpose:
    'Mostrar seis de los siete componentes trabajando juntos y demostrar, por ausencia del rol, que la estructura es una lista de preguntas y no un formulario.',
  whenToUse: 'Análisis de un documento propio que se va a citar o estudiar.',
  risk: 'medio',
  iteration:
    'Para riesgo alto, añadir: «Antes de responder, indica qué información te falta para ejecutar esta tarea correctamente.»',
  warning:
    'No es un «prompt perfecto». No tiene Rol, y es deliberado: los otros seis componentes trabajan juntos y el resultado no sufre por la ausencia del séptimo.',
};

export const METAPROMPT_AUDITORIA: CanonicalPrompt = {
  id: 'metaprompt-auditoria',
  title: 'Metaprompt de auditoría',
  text: `No ejecutes todavía la tarea. Actúa como auditor de instrucciones.

Evalúa mi prompt mediante estos siete componentes: Contexto, Rol, Tarea, Fuentes, Restricciones, Formato y Control.

Indica: (a) cuáles son pertinentes para esta tarea concreta; (b) cuáles ya están suficientemente definidos; (c) cuáles presentan ambigüedad o están ausentes de forma crítica.

No agregues requisitos que no mejoren el resultado de esta tarea en particular.

Formula como máximo tres preguntas aclaratorias, y solo aquellas cuya respuesta cambiaría efectivamente el resultado.

Después propón una versión mejorada que conserve mi objetivo original, y explica en cinco viñetas qué cambiaste y por qué.`,
  purpose:
    'Convertir la revisión de instrucciones en una fase explícita y repetible, sin delegar la definición del objetivo.',
  whenToUse:
    'Después de haber escrito el prompt propio, antes de ejecutar una tarea compleja o repetida.',
  risk: 'medio-alto',
  iteration:
    'Añadir: «Si consideras que mi prompt ya es suficiente para esta tarea, dilo y no propongas cambios.»',
  warning:
    'Las dos líneas que hacen la diferencia son la que prohíbe agregar requisitos innecesarios y la que limita a tres las preguntas aclaratorias. Sin ellas, el sistema devuelve un prompt inflado.',
};

export const PROMPT_EVIDENCIA_INFERENCIA: CanonicalPrompt = {
  id: 'evidencia-inferencia',
  title: 'Separación evidencia / inferencia',
  text: `Trabaja solo con las fuentes seleccionadas.

Para cada conclusión, entrega tres campos:
  - "Evidencia textual" (cita literal + localizador)
  - "Inferencia" (qué agregas tú y sobre qué base)
  - "Nivel de confianza" (alto / medio / bajo, y por qué)

Si no existe evidencia textual suficiente, escribe "No respaldado por las fuentes seleccionadas". No completes información faltante con conocimiento externo.`,
  purpose:
    'El componente Control en su forma más pura: hace visible la frontera entre documento y análisis antes de verificar nada.',
  whenToUse: 'Cuando la salida va a alimentar una matriz ICJR o un escrito.',
  risk: 'medio-alto',
  iteration:
    'Añadir: «Enumera al final las tres afirmaciones que un revisor debería comprobar primero.»',
};

export const PROMPT_AFIRMACIONES_VERIFICABLES: CanonicalPrompt = {
  id: 'afirmaciones-verificables',
  title: 'Detección de afirmaciones verificables',
  text: `Revisa el texto siguiente sin decidir todavía si es correcto.

Extrae únicamente las afirmaciones que requieren verificación externa antes de ser usadas en un escrito jurídico.

Clasifícalas como: norma · jurisprudencia · doctrina · hecho · cifra o fecha · cita textual.

Para cada una, indica en una frase qué fuente sería adecuada para verificarla y qué localizador debería buscarse.`,
  purpose:
    'Ejecutar el paso I del protocolo ICJR con apoyo de la propia herramienta, sin delegar el paso C.',
  whenToUse: 'Sobre un borrador propio o generado, antes de abrir la matriz.',
  risk: 'medio',
  iteration: 'Añadir: «Ordénalas por el daño que causaría que fueran falsas.»',
  warning: 'Que la IA identifique qué verificar no significa que haya verificado.',
};

export const PROMPT_CORPUS_CERRADO: CanonicalPrompt = {
  id: 'corpus-cerrado',
  title: 'Trabajo sobre corpus cerrado',
  text: `Usando únicamente las fuentes seleccionadas de este cuaderno, identifica los tres criterios jurídicos principales relacionados con [tema].

Para cada criterio entrega:
  (a) una síntesis de una frase;
  (b) la cita o localizador exacto en la fuente;
  (c) una limitación o excepción que también aparezca en el material.

Si las fuentes no permiten responder alguna parte, indícalo expresamente y no lo completes.`,
  purpose:
    'Trabajar en un entorno fundamentado en fuentes y observar, en el mismo movimiento, sus límites.',
  whenToUse: 'Sobre un corpus cerrado y estable.',
  risk: 'medio',
  iteration:
    'Añadir: «¿Alguna de tus tres respuestas se apoya en una interpretación tuya más que en el texto? Indícalo.»',
};

export const PROMPT_RIESGO_BAJO: CanonicalPrompt = {
  id: 'riesgo-bajo',
  title: 'Prompt de riesgo bajo',
  text: 'Corrige la puntuación y la concordancia de este párrafo. No cambies el contenido ni el registro. Devuélvelo en un solo bloque.',
  purpose:
    'Demostrar que un buen prompt puede tener dos componentes. Es el antídoto contra el hábito del megaprompt.',
  whenToUse: 'Tareas de corrección o formato sobre texto propio.',
  risk: 'bajo',
  warning: 'Añadir componentes aquí empeoraría el prompt.',
};

export const CANONICAL_PROMPTS: readonly CanonicalPrompt[] = [
  PROMPT_DIAGNOSTICO,
  PROMPT_REFERENCIA,
  METAPROMPT_AUDITORIA,
  PROMPT_EVIDENCIA_INFERENCIA,
  PROMPT_AFIRMACIONES_VERIFICABLES,
  PROMPT_CORPUS_CERRADO,
  PROMPT_RIESGO_BAJO,
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// AI BRIDGE — herramientas externas del estudiante.
//
// La plataforma NO integra APIs. Solo abre la herramienta del estudiante en una
// pestaña nueva. La separación instrucción → modelo → salida → verificación es
// deliberadamente visible.
// ─────────────────────────────────────────────────────────────────────────────

export interface AiTool {
  id: string;
  label: string;
  url: string;
  note: string;
}

export const AI_TOOLS: readonly AiTool[] = [
  { id: 'chatgpt', label: 'ChatGPT', url: 'https://chatgpt.com/', note: 'OpenAI' },
  { id: 'claude', label: 'Claude', url: 'https://claude.ai/new', note: 'Anthropic' },
  { id: 'gemini', label: 'Gemini', url: 'https://gemini.google.com/app', note: 'Google' },
] as const;

export const AI_TOOL_NOTEBOOK: AiTool = {
  id: 'gemini-notebook',
  label: 'Gemini Notebook',
  url: 'https://notebooklm.google.com/',
  note: 'ex NotebookLM · entorno fundamentado en fuentes',
};

export const ALL_AI_TOOLS: readonly AiTool[] = [...AI_TOOLS, AI_TOOL_NOTEBOOK];
