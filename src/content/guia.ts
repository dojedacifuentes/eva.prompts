// ─────────────────────────────────────────────────────────────────────────────
// GUÍA COMPLETA DE PROMPTING JURÍDICO — ÍNDICE
//
// La guía todavía no está escrita. Lo que sí existe es su plan, y publicarlo es
// una promesa verificable: cada capítulo lleva su estado real, y un capítulo
// pasa a `listo` cuando se puede leer, no cuando alguien lo anuncia.
//
// Para publicar un capítulo: escríbelo, cambia su `estado` a 'listo' y añade su
// `href`. Mientras no haya href, la tarjeta no enlaza a ninguna parte.
// ─────────────────────────────────────────────────────────────────────────────

export type EstadoCapitulo = 'listo' | 'borrador' | 'planificado';

export interface Capitulo {
  n: string;
  titulo: string;
  /** Qué resuelve. Una o dos líneas. */
  resumen: string;
  estado: EstadoCapitulo;
  /** Ruta si el capítulo ya se puede leer; ausente mientras no exista. */
  href?: string;
  /** Sección del sitio donde ya hay algo utilizable sobre esto. */
  mientrasTanto?: { label: string; href: string };
}

export const PARTES: { titulo: string; capitulos: Capitulo[] }[] = [
  {
    titulo: 'I · Por qué esto importa',
    capitulos: [
      {
        n: '01',
        titulo: 'El prompt como mandato',
        resumen:
          'La instrucción como acto jurídico: encargo, alcance, límites y quién responde del exceso.',
        estado: 'borrador',
      },
      {
        n: '02',
        titulo: 'Metaprompting: qué se escribe cuando tú no escribes',
        resumen:
          'Qué ocurre entre lo que tecleas y lo que el modelo ejecuta, y por qué esa distancia es el tema.',
        estado: 'planificado',
      },
      {
        n: '03',
        titulo: 'Los tres deberes: verificar, reservar, trazar',
        resumen:
          'Las exigencias del ejercicio profesional trasladadas a una conversación con un modelo.',
        estado: 'planificado',
      },
    ],
  },
  {
    titulo: 'II · La instrucción',
    capitulos: [
      {
        n: '04',
        titulo: 'Los siete componentes del encargo',
        resumen:
          'Contexto, rol, tarea, fuentes, restricciones, formato y control: qué resuelve cada uno y cuándo se puede omitir.',
        estado: 'borrador',
        mientrasTanto: { label: 'Practícalos en el curso', href: '/curso/prompt' },
      },
      {
        n: '05',
        titulo: 'Fuentes: delimitar el corpus admisible',
        resumen:
          'Cómo se le dice a un modelo con qué material puede trabajar y cuál manda sobre cuál.',
        estado: 'planificado',
      },
      {
        n: '06',
        titulo: 'Control: las instrucciones que evitan el desastre',
        resumen:
          'Marcar inferencias, exigir localizadores, declarar la incertidumbre. Las siete que conviene memorizar.',
        estado: 'planificado',
      },
      {
        n: '07',
        titulo: 'Auditar tu propio prompt',
        resumen:
          'Cómo pedirle a un modelo que encuentre lo que dejaste ambiguo, y qué hacer con lo que encuentre.',
        estado: 'planificado',
        mientrasTanto: { label: 'Hazlo en el curso', href: '/curso/auditoria' },
      },
    ],
  },
  {
    titulo: 'III · El resultado',
    capitulos: [
      {
        n: '08',
        titulo: 'Verificación: una afirmación, una fuente',
        resumen:
          'El protocolo mínimo antes de que una cita entre en un escrito. Por qué la fluidez no es evidencia.',
        estado: 'borrador',
        mientrasTanto: { label: 'Practícalo en el curso', href: '/curso/verificacion' },
      },
      {
        n: '09',
        titulo: 'Los errores que no parecen errores',
        resumen:
          'Citas plausibles, localizadores que abren pero no sostienen, conclusiones que no se siguen del fragmento.',
        estado: 'planificado',
      },
      {
        n: '10',
        titulo: 'Trazabilidad: reconstruir tu razonamiento seis meses después',
        resumen: 'Versionar prompts, registrar decisiones, documentar qué se verificó y contra qué.',
        estado: 'planificado',
      },
    ],
  },
  {
    titulo: 'IV · La práctica',
    capitulos: [
      {
        n: '11',
        titulo: 'Confidencialidad y datos del cliente',
        resumen:
          'Qué sale de tu control al pegar, qué anonimizar y cómo leer una política de retención.',
        estado: 'planificado',
        mientrasTanto: { label: 'Checklist en el toolkit', href: '/toolkit' },
      },
      {
        n: '12',
        titulo: 'Flujos: encadenar herramientas sin perder el hilo',
        resumen: 'Buscar, leer, redactar: tres pasos, tres herramientas, y la firma al final.',
        estado: 'planificado',
        mientrasTanto: { label: 'Flujos en el toolkit', href: '/toolkit' },
      },
      {
        n: '13',
        titulo: 'Qué no delegar nunca',
        resumen:
          'El inventario corto de decisiones que siguen siendo del abogado, y por qué esa lista se acorta sola si no la defiendes.',
        estado: 'planificado',
      },
    ],
  },
];

export const ETIQUETAS: Record<EstadoCapitulo, { label: string; clase: string }> = {
  listo: {
    label: 'Publicado',
    clase: 'border-emerald-500/30 bg-emerald-500/[0.08] text-emerald-400',
  },
  borrador: {
    label: 'En borrador',
    clase: 'border-amber-500/30 bg-amber-500/[0.08] text-amber-400',
  },
  planificado: {
    label: 'Planificado',
    clase: 'border-white/[0.12] bg-white/[0.03] text-zinc-500',
  },
};

/** Recuento honesto para la cabecera: cuántos capítulos se pueden leer ya. */
export function recuento() {
  const todos = PARTES.flatMap(p => p.capitulos);
  return {
    total: todos.length,
    listos: todos.filter(c => c.estado === 'listo').length,
    borradores: todos.filter(c => c.estado === 'borrador').length,
  };
}
