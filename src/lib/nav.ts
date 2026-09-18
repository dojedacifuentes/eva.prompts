// ─────────────────────────────────────────────────────────────────────────────
// MAPA DEL SITIO — fuente única.
//
// La barra lateral, la barra superior, la navegación móvil y el pie leen de
// aquí. Añadir una sección es añadir una entrada; no hay que tocar cuatro
// archivos y olvidarse del cuarto.
// ─────────────────────────────────────────────────────────────────────────────
import { BookOpen, GraduationCap, Home, Library, Wrench, Zap, type LucideIcon } from 'lucide-react';

export interface Seccion {
  href: string;
  /** Clave del guion de EVA en `content/eva.ts`. */
  eva: string;
  icon: LucideIcon;
  /** Etiqueta en la barra lateral. */
  label: string;
  /** Etiqueta corta, para la barra inferior en móvil: seis destinos a 390px
   *  dejan 57px por celda y no toda etiqueta cabe a tamaño legible. */
  corta: string;
  /** Título de la barra superior y de la pestaña del navegador. */
  titulo: string;
  /** Subtítulo de la barra superior. */
  subtitulo: string;
  /** Agrupación en la barra lateral. */
  grupo: 'Laboratorio' | 'Aprender' | 'Consulta';
  /** Marca visible: la sección existe pero su contenido aún no. */
  enConstruccion?: boolean;
}

export const SECCIONES: Seccion[] = [
  {
    href: '/',
    eva: 'inicio',
    icon: Home,
    label: 'Inicio',
    corta: 'Inicio',
    titulo: 'EVA LAB',
    subtitulo: 'Laboratorio de prompting jurídico',
    grupo: 'Laboratorio',
  },
  {
    href: '/prompt-lab',
    eva: 'prompt-lab',
    icon: Zap,
    label: 'Prompt Lab',
    corta: 'Lab',
    titulo: 'Prompt Lab',
    subtitulo: 'Constructor de prompts jurídicos · 12 decisiones explícitas',
    grupo: 'Laboratorio',
  },
  {
    href: '/curso',
    eva: 'curso',
    icon: GraduationCap,
    label: 'Construye tu prompt',
    corta: 'Curso',
    titulo: 'Construye tu prompt',
    subtitulo: 'Curso e-learning · Cinco etapas a tu ritmo',
    grupo: 'Aprender',
  },
  {
    href: '/guia',
    eva: 'guia',
    icon: BookOpen,
    label: 'Guía de prompting',
    corta: 'Guía',
    titulo: 'Guía completa de prompting jurídico',
    subtitulo: 'En construcción · El índice está publicado',
    grupo: 'Aprender',
    enConstruccion: true,
  },
  {
    href: '/conceptos',
    eva: 'conceptos',
    icon: Library,
    label: 'Conceptos',
    corta: 'Léxico',
    titulo: 'Conceptos',
    subtitulo: 'Vocabulario de IA aplicada al Derecho · Tarjetas de repaso',
    grupo: 'Consulta',
  },
  {
    href: '/toolkit',
    eva: 'toolkit',
    icon: Wrench,
    label: 'Toolkit',
    corta: 'Toolkit',
    titulo: 'Toolkit',
    subtitulo: 'Qué herramienta para qué encargo · Flujos y protocolos',
    grupo: 'Consulta',
  },
];

export const GRUPOS = ['Laboratorio', 'Aprender', 'Consulta'] as const;

/** Sección que corresponde a una ruta, contando subrutas del curso. */
export function seccionDe(pathname: string): Seccion | undefined {
  return (
    SECCIONES.find(s => s.href === pathname) ??
    SECCIONES.find(s => s.href !== '/' && pathname.startsWith(`${s.href}/`))
  );
}
