'use client';
import { EVA } from '@/lib/brand';

/**
 * IDENTIFICADOR VISUAL DE EVA — TRATAMIENTO PROVISIONAL Y REEMPLAZABLE.
 *
 * No existe en el repositorio una referencia visual oficial de EVA, así que se
 * dibuja un monograma geométrico: un rombo de líneas con las letras EVA y un
 * punto que respira. Deliberadamente NO es un rostro, ni una figura humana, ni
 * una fotografía de persona.
 *
 * PARA REEMPLAZARLO: deja el archivo oficial en `public/` y apunta a él desde
 * `EVA.assetSrc` en `lib/brand.ts`. Este componente lo usará sin más cambios.
 */
export function EvaMark({
  size = 32,
  className = '',
  /** Atenúa el trazo: para marcas de fondo o cabeceras discretas. */
  muted = false,
}: {
  size?: number;
  className?: string;
  muted?: boolean;
}) {
  if (EVA.assetSrc) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={EVA.assetSrc}
        alt=""
        aria-hidden="true"
        width={size}
        height={size}
        className={className}
        style={{ display: 'block' }}
      />
    );
  }

  const gid = `eva-mark-${muted ? 'm' : 'n'}`;
  const op = muted ? 0.45 : 1;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      className={className}
      aria-hidden="true"
      focusable="false"
      style={{ display: 'block' }}
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.71 0.17 200)" />
          <stop offset="100%" stopColor="oklch(0.55 0.22 264)" />
        </linearGradient>
      </defs>
      {/* Rombo exterior */}
      <path
        d="M24 3 L45 24 L24 45 L3 24 Z"
        fill="none"
        stroke={`url(#${gid})`}
        strokeWidth="1.5"
        opacity={0.85 * op}
      />
      {/* Rombo interior: profundidad de terminal */}
      <path
        d="M24 11 L37 24 L24 37 L11 24 Z"
        fill="none"
        stroke="oklch(0.71 0.17 200)"
        strokeWidth="0.75"
        opacity={0.35 * op}
      />
      <text
        x="24"
        y="28"
        textAnchor="middle"
        fontFamily="var(--font-jetbrains-mono), ui-monospace, monospace"
        fontSize="10.5"
        letterSpacing="0.8"
        fill="oklch(0.71 0.17 200)"
        opacity={op}
      >
        EVA
      </text>
    </svg>
  );
}

/**
 * Retrato de EVA a mayor tamaño, para cabeceras de sección. Mismo monograma con
 * un halo y un anillo lento: presencia sin rostro.
 */
export function EvaAvatar({ size = 44, className = '' }: { size?: number; className?: string }) {
  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center rounded-xl border border-cyan-500/25 bg-cyan-500/[0.06] ${className}`}
      style={{ width: size, height: size }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-xl"
        style={{ boxShadow: '0 0 18px oklch(0.71 0.17 200 / 0.14) inset' }}
      />
      <EvaMark size={Math.round(size * 0.66)} />
    </span>
  );
}
