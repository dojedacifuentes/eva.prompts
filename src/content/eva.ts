// ─────────────────────────────────────────────────────────────────────────────
// LA VOZ DE EVA
//
// Todo lo que EVA dice en el sitio está escrito aquí, a mano, de antemano. No
// hay llamadas a modelos, ni claves, ni backend, ni costo por uso: EVA es una
// guía editorial, no un chatbot. Esa restricción es deliberada y se declara en
// la interfaz (`EVA.limite` en `lib/brand.ts`).
//
// Registro: irónico, intelectual, explicativo. EVA explica el mecanismo y —con
// más interés— sus límites. Nunca promete resultados profesionales ni sustituye
// el criterio del abogado; cuando algo depende de verificación humana, lo dice.
// ─────────────────────────────────────────────────────────────────────────────

export interface EvaPregunta {
  /** La pregunta, tal como la formularía alguien con prisa. */
  q: string;
  /** La respuesta. Párrafos separados por línea en blanco. */
  a: string;
}

export interface EvaGuion {
  /** Clave de sección. Coincide con la ruta. */
  id: string;
  /** Una línea: qué es esta sección. Se muestra junto al monograma. */
  intro: string;
  /** Segunda línea, opcional: el matiz que la primera se calló. */
  matiz?: string;
  preguntas: EvaPregunta[];
}

export const GUIONES: Record<string, EvaGuion> = {
  // ───────────────────────────────────────────────────────────────────────────
  inicio: {
    id: 'inicio',
    intro: 'Esto es un laboratorio de instrucciones, no un curso de inteligencia artificial.',
    matiz: 'La diferencia importa más de lo que parece, y es la razón de que exista esta página.',
    preguntas: [
      {
        q: '¿Por qué ya nadie habla de «ingeniería de prompts»?',
        a: `Porque funcionó. Ese es el desenlace incómodo.

Durante un par de años la instrucción fue el tema: cursos de fin de semana, listas de trucos, ofertas de trabajo con títulos que ya no existen. Después los modelos aprendieron a hacer en silencio lo que esos cursos enseñaban en voz alta. Hoy, cuando escribes tres palabras mal puestas, el sistema reescribe tu instrucción antes de responderla, la expande, le añade el contexto que no diste y ejecuta esa versión mejorada.

La disciplina no murió. Se mudó de domicilio. Ahora vive dentro del modelo, donde no la ves y no la firmas.`,
      },
      {
        q: 'Entonces, ¿qué es el metaprompting?',
        a: `Un modelo escribiendo el prompt de otro modelo —o de sí mismo— antes de contestarte.

Tú escribes «redacta una demanda por incumplimiento». Lo que efectivamente se ejecuta es un texto mucho más largo que tú no escribiste: alguien decidió por ti qué era relevante, qué tono correspondía, qué omitir y qué dar por supuesto.

Es cómodo. Es, en el noventa por ciento de los casos, mejor que lo que habrías escrito tú. Y es exactamente el punto donde un abogado debería levantar una ceja.`,
      },
      {
        q: 'Si el modelo mejora mi prompt solo, ¿para qué aprender esto?',
        a: `Porque cuando un sistema reescribe tu instrucción, está decidiendo qué quisiste decir. Eso tiene un nombre viejo y conocido en tu oficio: interpretación.

Tú no redactas una cláusula de arbitraje y después dejas que la contraparte decida qué significaba. No entregas un mandato sin definir el encargo y sus límites. El prompt es un mandato: define un encargo, fija su alcance y reparte quién responde por el exceso.

Aprender esto no es aprender trucos. Es negarse a firmar un documento que escribió otro.`,
      },
      {
        q: '¿Qué tiene esto de específicamente jurídico?',
        a: `Tres cosas que en otros oficios son molestias y en el tuyo son responsabilidad.

La primera es la verificación: en marketing, una cita inventada es un error; en un escrito, es una afirmación falsa ante un tribunal. La segunda es la confidencialidad: lo que pegas en una ventana de chat sale de tu control y entra en la de otro. La tercera es la trazabilidad: tienes que poder explicar de dónde salió cada afirmación, y «me lo dijo el modelo» no es una fuente.

Todo el laboratorio está construido alrededor de esas tres.`,
      },
      {
        q: '¿EVA es una inteligencia artificial?',
        a: `Aquí no. Todo lo que digo en este sitio está escrito de antemano por un humano y guardado en un archivo de texto que puedes leer en el repositorio.

Lo aclaro porque el gesto contrario —un asistente que aparenta pensar mientras recita— es precisamente el hábito que este laboratorio intenta desmontar. Sería de mal gusto empezar cometiéndolo.`,
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  'prompt-lab': {
    id: 'prompt-lab',
    intro: 'Doce decisiones. Tú las tomas; el prompt se escribe solo debajo.',
    matiz: 'El objetivo no es que salga un buen texto, sino que sepas por qué salió ese y no otro.',
    preguntas: [
      {
        q: '¿Qué hace exactamente esta herramienta?',
        a: `Convierte decisiones en texto ejecutable.

Cada paso te pregunta algo que de todos modos tendrías que decidir —finalidad, área, audiencia, profundidad, tolerancia al riesgo, etapa procesal— y te obliga a decidirlo de forma explícita. Al final compila esas decisiones en un prompt, en un system prompt y en una representación intermedia legible.

El valor no está en el texto que sale. Está en que ninguna de esas doce decisiones se tomó a tus espaldas.`,
      },
      {
        q: '¿Por qué doce pasos y no una caja de texto?',
        a: `Porque la caja de texto es justamente donde ocurre el problema.

Frente a un campo vacío escribes lo que recuerdas; frente a una pregunta escribes lo que corresponde. Las doce preguntas son un inventario de todo lo que un modelo va a suponer si tú no lo dices. Puedes ignorarlas —el formulario te deja avanzar— pero entonces las supone él.

Es la diferencia entre un contrato de adhesión y uno negociado. Ambos son contratos.`,
      },
      {
        q: '¿Puedo pegar datos de un caso real aquí?',
        a: `Puedes, porque nada de lo que escribes sale de tu navegador: esta herramienta no tiene servidor ni envía nada a ninguna parte.

El problema aparece un paso después, cuando copies el prompt y lo pegues en un modelo comercial. Ahí sí sale, ahí sí queda, y ahí sí aplica el deber de reserva. Anonimiza antes de pegar: nombres, RUT, número de causa, cualquier cosa que identifique a tu cliente.

Dicho de otro modo: el laboratorio es privado; la calle de afuera no.`,
      },
      {
        q: '¿Qué es la «representación intermedia» y por qué debería importarme?',
        a: `Es tu prompt escrito como estructura de datos en lugar de como prosa: campos, valores, restricciones.

Sirve para dos cosas. Para versionar —puedes guardarla, compararla con la del mes pasado y saber qué cambiaste— y para compilar el mismo encargo hacia modelos distintos sin volver a escribirlo.

Si alguna vez te preguntas por qué un prompt que funcionaba dejó de funcionar, esta es la pestaña que responde.`,
      },
      {
        q: 'El prompt que genera es larguísimo. ¿No es contraproducente?',
        a: `Es largo porque es explícito, y es explícito porque la alternativa es que el modelo rellene los huecos con estadística.

Dicho esto: la longitud no es una virtud. Si tu encargo es simple, usa el modo compacto y borra todo lo que no gobierne una decisión. Un prompt bien escrito se parece a una cláusula bien redactada —dice lo necesario y calla lo demás—, no a un contrato de treinta páginas que nadie leyó.`,
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  curso: {
    id: 'curso',
    intro: 'Cinco etapas. Al final tienes un prompt propio, auditado y verificado.',
    matiz: 'No hay vídeos. Se aprende construyendo, que es más lento y funciona mejor.',
    preguntas: [
      {
        q: '¿Qué voy a hacer, exactamente?',
        a: `Vas a responder una pregunta jurídica antes de tener ayuda, construir un prompt para resolverla, hacer que un modelo audite ese prompt, ejecutarlo, comprobar una de sus afirmaciones contra una fuente real, y volver a responder la pregunta del principio.

La última etapa existe por una razón: es donde compruebas si cambiaste de opinión y por qué. Esa comparación es el curso entero; lo demás es andamiaje.`,
      },
      {
        q: '¿Necesito una cuenta de pago en algún modelo?',
        a: `No. El curso funciona con cualquier modelo conversacional de los gratuitos: tú copias, pegas fuera, y vuelves con el resultado.

Es deliberado. El laboratorio no te conecta a ningún proveedor ni te pide una clave: el paso de salir, pegar y volver te recuerda que estás usando un sistema ajeno, con sus términos y su retención de datos. La fricción es pedagógica.`,
      },
      {
        q: '¿Por qué hay una etapa dedicada a auditar mi propio prompt?',
        a: `Porque leer tu prompt es como releer tu propio escrito a las tres de la mañana: lo entiendes perfectamente, y ese es el problema.

En esa etapa le pides a un modelo que encuentre los supuestos que dejaste implícitos y las instrucciones que admiten dos lecturas. Después decides tú cuáles corriges. El modelo detecta ambigüedad; no decide qué querías decir.`,
      },
      {
        q: '¿Y si la IA me da una respuesta que suena impecable?',
        a: `Entonces estás en la etapa cuatro, que existe precisamente para eso.

La fluidez no es un indicador de verdad; es un indicador de entrenamiento. Un modelo produce prosa igual de segura cuando cita un artículo que existe y cuando cita uno que no. Por eso el ejercicio no te pide evaluar la respuesta completa: te pide elegir una sola afirmación verificable y comprobarla contra la fuente.

Una. Es más incómodo de lo que suena, y es el hábito entero.`,
      },
      {
        q: '¿Cuánto tarda?',
        a: `Entre cuarenta y cinco y noventa minutos si lo haces en serio, con el modelo abierto en otra pestaña.

Tu progreso se guarda en este navegador. Puedes cerrar y volver: nada se envía a ningún servidor, y nadie lleva registro de cómo te fue.`,
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  guia: {
    id: 'guia',
    intro: 'Todavía no existe. Prefiero decírtelo aquí que hacértelo descubrir tres clics más abajo.',
    matiz: 'Lo que sí existe está en el índice: es el plan, no el texto.',
    preguntas: [
      {
        q: '¿Por qué publicar una guía que no está escrita?',
        a: `Porque un índice publicado es una promesa verificable y una carpeta privada no lo es.

Abajo está la estructura completa con el estado real de cada capítulo. Cuando un capítulo pase de «en construcción» a texto, lo sabrás porque podrás leerlo, no porque alguien lo anuncie.`,
      },
      {
        q: 'Mientras tanto, ¿por dónde empiezo?',
        a: `Por el curso, si quieres el hábito completo en una sesión. Por el Prompt Lab, si ya sabes lo que necesitas y solo quieres construirlo bien.

Conceptos y Toolkit funcionan como material de consulta: no hace falta leerlos en orden ni enteros.`,
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  conceptos: {
    id: 'conceptos',
    intro: 'El vocabulario mínimo para discutir de esto sin asentir por cortesía.',
    matiz: 'Tarjetas. Voltéalas, márcalas, olvídalas y vuelve.',
    preguntas: [
      {
        q: '¿Hace falta saber el vocabulario técnico para usar bien un modelo?',
        a: `Para usarlo, no. Para negociar con quien te lo vende, sí.

Hay una asimetría concreta: la persona que te ofrece una herramienta jurídica con IA maneja estos términos y tú, si no los manejas, aceptas su definición del problema junto con su solución. Saber qué es una ventana de contexto es lo que te permite preguntar por qué su producto trunca tu expediente.`,
      },
      {
        q: '¿Cuáles son los tres que de verdad importan?',
        a: `Alucinación, ventana de contexto y temperatura.

El primero explica por qué debes verificar siempre. El segundo, por qué el modelo «olvidó» la página 40 de tu expediente. El tercero, por qué la misma pregunta te dio dos respuestas distintas y ninguna de las dos era un error del sistema.

El resto es útil; estos tres son la diferencia entre usar la herramienta y ser usado por ella.`,
      },
      {
        q: 'Algunas definiciones parecen simplificadas.',
        a: `Lo están, y es una decisión, no un descuido.

Son definiciones operativas: lo que necesitas para tomar una decisión profesional correcta, no lo que necesitarías para implementar el sistema. Cuando una simplificación podría llevarte a una decisión equivocada, la tarjeta lo advierte en el reverso.`,
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  toolkit: {
    id: 'toolkit',
    intro: 'Qué herramienta para qué encargo, y los dos protocolos que no deberías saltarte.',
    matiz: 'Ninguna recomendación aquí está pagada, y ninguna es permanente: esto envejece rápido.',
    preguntas: [
      {
        q: '¿Cuál es la mejor herramienta?',
        a: `La pregunta está mal planteada, y lo digo con afecto.

No hay una mejor: hay una adecuada para cada tipo de encargo. Un modelo de contexto largo para leer un expediente completo; un buscador con fuentes para saber qué está vigente hoy; un sistema que consulte tus propios documentos cuando lo que importa es lo que dice tu archivo y no lo que el modelo recuerda.

Usar una sola para todo es el error más común, y es caro en tiempo antes de serlo en dinero.`,
      },
      {
        q: '¿Por qué insistes tanto con los flujos de varias herramientas?',
        a: `Porque cada modelo tiene una debilidad conocida y la de uno suele ser la fortaleza de otro.

Buscar con fuentes, después leer tus documentos, después redactar: tres pasos, tres herramientas, cada una haciendo aquello en lo que es buena. Encadenarlas no es sofisticación; es no pedirle a un martillo que corte.

Y el último paso del flujo siempre eres tú. Eso no es una fórmula de cortesía: es dónde está la firma.`,
      },
      {
        q: '¿Qué es lo mínimo que no puedo saltarme?',
        a: `Dos listas de esta sección: la de confidencialidad y la de verificación.

La primera se resume en una línea: anonimiza antes de pegar. La segunda, en otra: ninguna cita entra en un escrito sin que tú la hayas visto en su fuente. Ninguna. Ni siquiera esa que se ve perfectamente plausible.

Todo lo demás en este sitio es mejorable. Estas dos son el piso.`,
      },
      {
        q: 'Esto quedará obsoleto en seis meses.',
        a: `En menos, probablemente. Los nombres y las capacidades cambiarán, y algunas de estas herramientas no existirán.

Lo que no caduca es el criterio de elección: contexto largo para documentos extensos, fuentes verificables para datos vigentes, tus propios archivos para lo que solo está en tus archivos. Aprende el criterio y el catálogo se actualiza solo.`,
      },
    ],
  },
};

/** Devuelve el guion de una sección, o `undefined` si no hay ninguno escrito. */
export function getGuion(id: string): EvaGuion | undefined {
  return GUIONES[id];
}
