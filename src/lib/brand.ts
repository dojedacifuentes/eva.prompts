// ─────────────────────────────────────────────────────────────────────────────
// MARCA — punto único de verdad.
//
// Nombre del sitio, créditos, rutas de assets y datos de EVA viven aquí. Ningún
// componente referencia archivos de marca por su cuenta.
//
// Reglas de contenido que este archivo respeta a propósito (no las relajes sin
// material verificable):
//  - No se afirma qué significa la sigla EVA.
//  - EVA no tiene biografía ni credenciales: tiene una función y un retrato.
//  - No se declaran avales universitarios, credenciales profesionales,
//    relaciones institucionales, cifras de usuarios ni promesas de resultado.
// ─────────────────────────────────────────────────────────────────────────────

/** Identidad del sitio. */
export const SITIO = {
  nombre: 'EVA LAB',
  partes: { uno: 'EVA', dos: 'LAB' },
  subtitulo: 'Laboratorio de prompting jurídico',
  descripcion:
    'Construye, audita y verifica prompts jurídicos. Una herramienta, un curso y un vocabulario para abogados que prefieren entender la instrucción antes de delegarla.',
  /** Frase de cabecera. Es la tesis del sitio, en una línea. */
  tesis: 'Dejamos de hablar de prompts justo cuando empezaron a decidir por nosotros.',
} as const;

/** Crédito de autoría. */
export const AUTOR = {
  nombre: 'Diego Ojeda',
  credito: 'Creado por Diego Ojeda',
} as const;

/**
 * EVA — guía de aprendizaje dentro del laboratorio.
 *
 * Dos imágenes distintas, que conviene no confundir:
 *  · El LOGOTIPO del sitio es el monograma en rombo de `components/eva/EvaMark.tsx`.
 *    Identifica al laboratorio y vive en la cabecera, la barra lateral y el pie.
 *  · El RETRATO de aquí abajo es la cara del asistente flotante, y solo aparece
 *    ahí. Son dos cosas: una marca y una interlocutora.
 *
 * Las dos expresiones vienen del mismo encuadre para que el retrato no salte al
 * abrir el panel: serena cuando está cerrada, sonriente cuando la abres.
 *
 * PARA SUSTITUIRLAS: reemplaza los archivos de `public/eva/` conservando el
 * recorte cuadrado, o cambia estas rutas. No hay que tocar ningún componente.
 */
export const EVA = {
  nombre: 'EVA',
  /** Función, no personalidad. */
  rol: 'Guía del laboratorio',
  retrato: '/eva/eva.webp',
  retratoSonrisa: '/eva/eva-sonrisa.webp',
  /** Cómo se presenta cuando alguien la abre por primera vez. */
  presentacion:
    'Acompaño cada sección. Explico lo que hace y, sobre todo, lo que no hace.',
  /** Texto del botón flotante para lectores de pantalla. */
  invitacion: 'Preguntas sobre esta sección',
  /** Límite declarado, visible en la interfaz. */
  limite:
    'Respuestas escritas de antemano, no generadas. EVA no consulta ningún modelo ni envía lo que escribes a ninguna parte.',
  color: 'var(--color-cyan)',
} as const;

/** Enlaces del pie. */
export const ENLACES = {
  repositorio: 'https://github.com/dojedacifuentes/eva.prompts',
} as const;
