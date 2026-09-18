'use client';
// ─────────────────────────────────────────────────────────────────────────────
// DESCARGA DEL TRABAJO
//
// El curso no tiene servidor, cuenta ni correo: no hay a quién entregar. Lo que
// hay es un documento que se lleva quien lo escribió, en Markdown legible en
// cualquier editor.
//
// Esa ausencia es deliberada y se dice en voz alta: si el trabajo solo vive en
// este navegador, conviene saberlo antes de limpiar el historial.
// ─────────────────────────────────────────────────────────────────────────────
import { useState } from 'react';
import { FileDown } from 'lucide-react';
import { useCurso } from '@/lib/curso/store';
import {
  buildEntregable, entregableFilename, renderEntregableMarkdown,
} from '@/lib/curso/entregable';
import { Collapsible, Panel, TextField, downloadText } from './ui';
import { ReiniciarCurso } from './ReiniciarCurso';

export function Descarga() {
  const { state, update, progress, hydrated } = useCurso();
  const [descargado, setDescargado] = useState(false);

  const entregable = buildEntregable(state);
  const markdown = renderEntregableMarkdown(entregable);
  const pendientes = Object.values(progress.stages).flatMap(s => s.missing);

  function descargar() {
    downloadText(markdown, entregableFilename(entregable));
    update(d => ({
      ...d,
      submission: { ...d.submission, downloadedAt: new Date().toISOString() },
    }));
    setDescargado(true);
  }

  return (
    <Panel className="border-cyan-500/25 bg-cyan-500/[0.04]">
      <h2 className="text-lg font-bold text-white">Llévate tu trabajo</h2>
      <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">
        Un documento con las dos respuestas, tu prompt, la auditoría y la verificación. Se descarga
        a tu equipo: no se envía a ninguna parte porque no hay ninguna parte a la que enviarlo.
      </p>

      <div className="mt-4 space-y-4">
        <TextField
          label="¿Con qué nombre firmas el documento?"
          hint="Opcional. Se escribe solo dentro del archivo que descargas; no sale de tu navegador."
          value={state.identity.name}
          onChange={v => update(d => ({ ...d, identity: { ...d.identity, name: v } }))}
          placeholder="Tu nombre"
        />

        {hydrated && pendientes.length > 0 && (
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/[0.07] px-3.5 py-2.5">
            <p className="text-xs leading-relaxed text-amber-200/90">
              Puedes descargar igual, pero quedan cosas sin hacer:
            </p>
            <ul className="mt-1.5 space-y-0.5 text-xs leading-relaxed text-amber-200/80">
              {pendientes.map(m => (
                <li key={m}>· {m}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={descargar}
            disabled={!hydrated}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-cyan-500/45 bg-cyan-500/15 px-5 py-3 text-sm font-semibold text-cyan-100 transition-colors hover:bg-cyan-500/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FileDown className="h-4 w-4 shrink-0" aria-hidden />
            Descargar mi documento
          </button>
          {descargado && (
            <span className="text-xs text-emerald-400">Descargado. Guárdalo donde no se pierda.</span>
          )}
        </div>

        <Collapsible summary="Ver antes de descargar">
          <pre className="mono max-h-96 overflow-auto whitespace-pre-wrap break-words text-[12px] leading-relaxed text-zinc-400">
            {markdown}
          </pre>
        </Collapsible>

        <div className="border-t border-white/[0.08] pt-4">
          <ReiniciarCurso onReset={() => setDescargado(false)} />
        </div>
      </div>
    </Panel>
  );
}
