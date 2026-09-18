// ─────────────────────────────────────────────────────────────────────────────
// MARCA — punto único de verdad.
//
// Nombre del sitio, créditos, rutas de assets y datos de EVA viven aquí. Ningún
// componente referencia archivos de marca por su cuenta.
//
// Reglas de contenido que este archivo respeta a propósito (no las relajes sin
// material verificable):
//  - No se afirma qué significa la sigla EVA.
//  - EVA no tiene biografía, rostro ni apariencia humana declarada.
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
 * `assetSrc: null` significa que se usa el TRATAMIENTO VISUAL PROVISIONAL: el
 * monograma geométrico de `components/eva/EvaMark.tsx`. Deliberadamente no es
 * un rostro ni una figura humana.
 *
 * PARA REEMPLAZARLO: deja el archivo oficial en `public/` y pon aquí su ruta,
 * por ejemplo `assetSrc: '/eva.svg'`. `EvaMark` lo detecta y deja de dibujar el
 * monograma. No hay que tocar ningún otro archivo.
 */
export const EVA = {
  nombre: 'EVA',
  /** Función, no personalidad. */
  rol: 'Guía del laboratorio',
  assetSrc: null as string | null,
  /** Cómo se presenta cuando alguien la abre por primera vez. */
  presentacion:
    'Acompaño cada sección. Explico lo que hace y, sobre todo, lo que no hace.',
  /** Límite declarado, visible en la interfaz. */
  limite:
    'Respuestas escritas de antemano, no generadas. EVA no consulta ningún modelo ni envía lo que escribes a ninguna parte.',
  color: 'var(--color-cyan)',
} as const;

/** Enlaces del pie. */
export const ENLACES = {
  repositorio: 'https://github.com/dojedacifuentes/eva.prompts',
} as const;
