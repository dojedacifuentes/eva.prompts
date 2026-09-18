'use client';
/**
 * LOGOTIPO DEL LABORATORIO: un rombo de líneas con las letras EVA.
 *
 * Es una marca, no un retrato. La cara de EVA —su retrato fotográfico— vive
 * únicamente en el asistente flotante (`EvaDock`), que la lee de `EVA.retrato`
 * en `lib/brand.ts`. Aquí, deliberadamente, no hay rostro ni figura humana:
 * una cabecera se firma con un logotipo, no con una foto de carnet.
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
