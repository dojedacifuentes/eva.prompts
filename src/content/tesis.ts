// ─────────────────────────────────────────────────────────────────────────────
// LA TESIS DEL SITIO
//
// El argumento que justifica que este laboratorio exista, en tres tiempos y con
// una conclusión. Vive aquí, y no dentro del componente, para que se pueda
// discutir y reescribir sin tocar una línea de maquetación.
//
// Nota editorial: el arco «palabra del año» describe el clima cultural de
// aquellos meses, no un premio concreto de un diccionario concreto. Si se
// quiere citar una fuente, hay que nombrarla aquí y enlazarla.
// ─────────────────────────────────────────────────────────────────────────────

export interface Tiempo {
  /** Etiqueta breve del momento. */
  kicker: string;
  titulo: string;
  cuerpo: string;
  /** Acento visual. */
  accent: 'cyan' | 'indigo' | 'purple';
}

export const TIEMPOS: Tiempo[] = [
  {
    kicker: 'Primero',
    titulo: 'La palabra del año',
    accent: 'cyan',
    cuerpo:
      'Hubo un año en que «prompt» estuvo en todas partes. Entró en el vocabulario corriente sin pedir permiso, se llenaron los cursos de fin de semana y aparecieron ofertas de trabajo para un oficio que nadie había ejercido nunca. Se llamó ingeniería de prompts, y por un momento pareció una profesión.',
  },
  {
    kicker: 'Después',
    titulo: 'El silencio',
    accent: 'indigo',
    cuerpo:
      'Y de pronto dejamos de hablar de ello. No porque el asunto se resolviera mal, sino porque se resolvió: los modelos aprendieron a hacer en silencio lo que aquellos cursos enseñaban en voz alta. Los trucos dejaron de hacer falta. El oficio se volvió invisible, que no es lo mismo que innecesario.',
  },
  {
    kicker: 'Hoy',
    titulo: 'Metaprompting',
    accent: 'purple',
    cuerpo:
      'Escribes tres palabras y el sistema reescribe tu instrucción antes de responderla: la expande, le añade el contexto que no diste, decide qué era relevante y ejecuta esa versión. Un modelo escribiendo el prompt de otro modelo. Cómodo, casi siempre mejor que lo que habrías escrito tú, y completamente fuera de tu vista.',
  },
];

/** La conclusión jurídica: por qué esto le importa a quien firma escritos. */
export const CONCLUSION = {
  titulo: 'Un prompt es un mandato',
  cuerpo: [
    'Cuando un sistema reescribe tu instrucción está decidiendo qué quisiste decir. Eso tiene un nombre viejo y conocido en Derecho: interpretación. Y delegar la interpretación de la propia instrucción, sin verla y sin poder reconstruirla, es exactamente lo que ningún abogado hace con un mandato.',
    'No se trata de volver a los trucos. Se trata de conservar tres cosas que en otros oficios son molestias y en el nuestro son responsabilidad: poder verificar lo que se afirma, saber qué información entregaste y a quién, y poder explicar de dónde salió cada línea. «Me lo dijo el modelo» no es una fuente.',
  ],
};

/** Las tres exigencias del trabajo jurídico que estructuran todo el sitio. */
export interface Pilar {
  id: string;
  titulo: string;
  cuerpo: string;
  accent: 'cyan' | 'indigo' | 'purple';
}

export const PILARES: Pilar[] = [
  {
    id: 'verificacion',
    titulo: 'Verificación',
    accent: 'cyan',
    cuerpo:
      'En otros oficios una cita inventada es un error. En un escrito es una afirmación falsa ante un tribunal. La fluidez de una respuesta no dice nada sobre su verdad: el modelo escribe con la misma seguridad el artículo que existe y el que no.',
  },
  {
    id: 'confidencialidad',
    titulo: 'Confidencialidad',
    accent: 'indigo',
    cuerpo:
      'Lo que pegas en una ventana de chat sale de tu control y entra en la de otro, con sus términos de uso y su política de retención. El deber de reserva no se suspende porque la interfaz sea cómoda.',
  },
  {
    id: 'trazabilidad',
    titulo: 'Trazabilidad',
    accent: 'purple',
    cuerpo:
      'Tienes que poder explicar de dónde salió cada afirmación, y poder hacerlo meses después. Un prompt que no se guardó, no se versionó y no se puede reconstruir es un razonamiento que no puedes defender.',
  },
];
