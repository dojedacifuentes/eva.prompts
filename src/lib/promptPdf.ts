// ─────────────────────────────────────────────────────────────────────────────
// Exportación del prompt a PDF — jsPDF, descarga directa.
//
// Extraído del generador original como módulo independiente: solo contiene lo
// que el Prompt Lab necesita. Se invoca desde un componente cliente al hacer
// clic, por eso el módulo no lleva 'use client'.
//
// jsPDF se importa de forma perezosa: la librería pesa y la mayoría de las
// visitas nunca exporta nada.
// ─────────────────────────────────────────────────────────────────────────────
import type { jsPDF as JsPDFClass } from 'jspdf';
import { SITIO } from '@/lib/brand';

export interface PromptConfig {
  objetivo: string;
  area: string;
  profundidad: string;
  modelo: string;
  promptText: string;
  modelTip?: string;
}
// ─── Paleta ───────────────────────────────────────────────────────────────────
export const C = {
  bg:      [7,  11,  18]  as [number,number,number],
  bgCard:  [12, 18,  30]  as [number,number,number],
  bgLight: [18, 26,  46]  as [number,number,number],
  white:   [248,250, 252] as [number,number,number],
  cyan:    [6,  182, 212] as [number,number,number],
  cyanL:   [34, 211, 238] as [number,number,number],
  indigo:  [129,140, 248] as [number,number,number],
  purple:  [168,85,  247] as [number,number,number],
  emerald: [52, 211, 153] as [number,number,number],
  gray:    [100,116, 139] as [number,number,number],
  grayL:   [148,163, 184] as [number,number,number],
  grayD:   [51, 65,  85]  as [number,number,number],
  muted:   [30, 41,  59]  as [number,number,number],
};

// ─── Medidas A4 vertical (mm) ────────────────────────────────────────────────
export const PW = 210;
export const PH = 297;
export const ML = 20;
export const MR = 190;
export const CW = MR - ML; // ancho de columna útil
// ─── Import perezoso de jsPDF, cacheado ──────────────────────────────────────
let _jsPDFCache: typeof JsPDFClass | null = null;
export async function getJsPDF(): Promise<typeof JsPDFClass> {
  if (!_jsPDFCache) {
    _jsPDFCache = (await import('jspdf')).jsPDF;
  }
  return _jsPDFCache;
}

export type JsPDFDoc = InstanceType<typeof JsPDFClass>;
// ─── Helpers de dibujo ────────────────────────────────────────────────────────
export function fillPage(doc: JsPDFDoc, color = C.bg) {
  doc.setFillColor(...color);
  doc.rect(0, 0, PW, PH, 'F');
}

export function accentBar(doc: JsPDFDoc, y = 0, h = 1.5) {
  doc.setFillColor(...C.cyan);
  doc.rect(0, y, PW / 2, h, 'F');
  doc.setFillColor(...C.indigo);
  doc.rect(PW / 2, y, PW / 2, h, 'F');
}

export function hLine(doc: JsPDFDoc, x1: number, x2: number, y: number, color = C.muted, width = 0.2) {
  doc.setDrawColor(...color);
  doc.setLineWidth(width);
  doc.line(x1, y, x2, y);
}

export function badge(doc: JsPDFDoc, text: string, x: number, y: number, borderColor = C.cyan, textColor = C.cyanL) {
  const w = text.length * 1.7 + 8;
  doc.setFillColor(...C.bgCard);
  doc.roundedRect(x, y - 4, w, 6, 1.5, 1.5, 'F');
  doc.setDrawColor(...borderColor);
  doc.setLineWidth(0.15);
  doc.roundedRect(x, y - 4, w, 6, 1.5, 1.5, 'S');
  doc.setFont('courier', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(...textColor);
  doc.text(text, x + w / 2, y - 0.3, { align: 'center' });
  return w;
}

export function sectionLabel(doc: JsPDFDoc, label: string, x: number, y: number, color = C.cyan) {
  doc.setFont('courier', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(...color);
  doc.text(label.toUpperCase(), x, y);
  hLine(doc, x, MR, y + 1.5, color, 0.15);
}

/** Párrafo con salto automático. Devuelve la Y final. */
export function paragraph(
  doc: JsPDFDoc,
  text: string, x: number, y: number,
  maxWidth = CW, lineHeight = 5.2,
  size = 9, color: [number,number,number] = C.grayL,
  style = 'normal',
): number {
  doc.setFont('helvetica', style);
  doc.setFontSize(size);
  doc.setTextColor(...color);
  const lines = doc.splitTextToSize(text, maxWidth) as string[];
  lines.forEach(line => { doc.text(line, x, y); y += lineHeight; });
  return y;
}

/** Documento completo: portada de configuración, prompt y controles de uso. */
export async function generatePromptPDF(cfg: PromptConfig): Promise<void> {
  const JsPDF = await getJsPDF();
  const doc = new JsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  fillPage(doc);
  accentBar(doc, 0, 2);

  let bx = ML;
  ['PROMPT LAB', SITIO.nombre, 'PROMPTING JURÍDICO'].forEach(b => {
    bx += badge(doc, b, bx, 18) + 4;
  });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(30);
  doc.setTextColor(...C.white);
  doc.text('PROMPT JURÍDICO', ML, 40);
  doc.setFontSize(12);
  doc.setTextColor(...C.cyanL);
  doc.text(`${SITIO.nombre} · ${SITIO.subtitulo}`, ML, 50);

  hLine(doc, ML, MR, 56, C.cyan, 0.4);

  sectionLabel(doc, 'CONFIGURACIÓN DEL PROMPT', ML, 66);

  const dnaRows = [
    { label: 'OBJETIVO', value: cfg.objetivo },
    { label: 'ÁREA JURÍDICA', value: cfg.area },
    { label: 'PROFUNDIDAD', value: cfg.profundidad },
    { label: 'IA OBJETIVO', value: cfg.modelo },
    { label: 'PROTECCIONES', value: 'Verificación de fuentes · Control de alucinaciones' },
  ];

  let dy = 74;
  dnaRows.forEach((row, ri) => {
    doc.setFillColor(...(ri % 2 === 0 ? C.bgCard : C.bgLight));
    doc.rect(ML, dy, CW, 10, 'F');
    doc.setFont('courier', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(...C.cyan);
    doc.text(row.label, ML + 4, dy + 6.5);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(...C.white);
    doc.text(row.value, ML + 60, dy + 6.5);
    dy += 11;
  });

  dy += 6;
  doc.setFont('courier', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...C.gray);
  doc.text(
    `Generado: ${new Date().toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric' })}`,
    ML, dy,
  );
  doc.text(
    'Construido con decisiones explícitas. Verificar todo resultado antes de usarlo.',
    ML, dy + 5,
  );

  // ── Prompt completo ────────────────────────────────────────────────────────
  doc.addPage();
  fillPage(doc);
  accentBar(doc);

  sectionLabel(doc, 'PROMPT JURÍDICO COMPLETO', ML, 18);

  doc.setFillColor(...C.bgCard);
  doc.roundedRect(16, 22, 178, 248, 3, 3, 'F');
  doc.setDrawColor(...C.cyan);
  doc.setLineWidth(0.2);
  doc.roundedRect(16, 22, 178, 248, 3, 3, 'S');

  let py = 32;
  cfg.promptText.split('\n').forEach(line => {
    if (py > 264) { doc.addPage(); fillPage(doc); accentBar(doc); py = 20; }
    const isHeader = line.startsWith('═') || line.startsWith('─');
    const isSectionTitle = /^[A-Z] ▸/.test(line) || /^[A-Z] ·/.test(line);
    const isConfig = line.startsWith(' ');

    if (isHeader) {
      doc.setFont('courier', 'normal');
      doc.setFontSize(5.5);
      doc.setTextColor(...C.muted);
      doc.text(line.substring(0, 72), 22, py);
      py += 3.5;
    } else if (isSectionTitle) {
      doc.setFont('courier', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(...C.cyanL);
      doc.text(line, 22, py);
      py += 5.5;
    } else if (isConfig) {
      doc.setFont('courier', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(...C.gray);
      (doc.splitTextToSize(line, 162) as string[]).forEach(tline => {
        if (py > 264) { doc.addPage(); fillPage(doc); accentBar(doc); py = 20; }
        doc.text(tline, 22, py);
        py += 4.5;
      });
    } else if (line.trim() === '') {
      py += 2.5;
    } else {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(...C.grayL);
      (doc.splitTextToSize(line, 162) as string[]).forEach(tline => {
        if (py > 264) { doc.addPage(); fillPage(doc); accentBar(doc); py = 20; }
        doc.text(tline, 22, py);
        py += 4.8;
      });
    }
  });

  // ── Recomendaciones de uso ─────────────────────────────────────────────────
  doc.addPage();
  fillPage(doc);
  accentBar(doc);
  badge(doc, 'USO RESPONSABLE', ML, 18);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(...C.white);
  doc.text('Recomendaciones de uso', ML, 32);
  hLine(doc, ML, MR, 36, C.purple, 0.3);

  if (cfg.modelTip) {
    sectionLabel(doc, `OPTIMIZACIÓN PARA ${cfg.modelo.toUpperCase()}`, ML, 44);
    paragraph(doc, cfg.modelTip, ML, 52, CW, 5.5, 9);
  }

  let sp = cfg.modelTip ? 80 : 44;
  sectionLabel(doc, 'CONTROLES ANTES DE USAR EL RESULTADO', ML, sp);
  sp += 8;

  const controls = [
    { title: 'Verificación de fuentes', desc: 'Contrastar toda norma, sentencia o cita contra la fuente primaria antes de usarla. Marcar como pendiente cualquier dato no confirmado.' },
    { title: 'Trazabilidad', desc: 'Registrar fuentes, errores, decisiones y correcciones. El resultado debe poder reconstruirse paso a paso.' },
    { title: 'Supervisión humana', desc: 'La responsabilidad final del contenido jurídico recae siempre en la persona que lo firma, no en la herramienta.' },
  ];
  controls.forEach(ct => {
    doc.setFillColor(...C.bgCard);
    doc.roundedRect(ML, sp, CW, 20, 2, 2, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...C.cyanL);
    doc.text(ct.title, ML + 6, sp + 7);
    const dl = doc.splitTextToSize(ct.desc, CW - 12) as string[];
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(...C.gray);
    dl.slice(0, 2).forEach((d, di) => doc.text(d, ML + 6, sp + 12 + di * 4.5));
    sp += 24;
  });

  hLine(doc, ML, MR, 260, C.muted);
  doc.setFont('courier', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(...C.grayD);
  doc.text(`Prompt Lab · ${SITIO.nombre}`, ML, 268);
  doc.text('Herramienta pedagógica — verificar todo resultado con fuentes primarias', ML, 274);

  doc.save('prompt-juridico.pdf');
}
