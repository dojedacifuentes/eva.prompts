'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { SECCIONES, GRUPOS, type Seccion } from '@/lib/nav';
import { SITIO, AUTOR } from '@/lib/brand';
import { EvaMark } from '@/components/eva/EvaMark';

function Grupo({ title, items, pathname }: { title: string; items: Seccion[]; pathname: string }) {
  if (items.length === 0) return null;
  return (
    <>
      <div className="mono px-3 pt-5 pb-1.5 text-[13px] font-bold uppercase tracking-[0.18em] text-zinc-700 first:pt-0">
        {title}
      </div>
      {items.map(({ href, icon: Icon, label, enConstruccion }) => {
        const active = href === '/' ? pathname === '/' : pathname.startsWith(href);
        return (
          <Link key={href} href={href} aria-current={active ? 'page' : undefined}>
            <motion.div
              className={`relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? 'bg-cyan-500/10 text-cyan-300'
                  : 'text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-200'
              }`}
              whileHover={{ x: 2 }}
              transition={{ duration: 0.15 }}
            >
              {active && (
                <motion.div
                  className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-cyan-400"
                  layoutId="sidebar-indicator"
                />
              )}
              <Icon aria-hidden className={`h-4 w-4 shrink-0 ${active ? 'text-cyan-400' : ''}`} />
              <span className="min-w-0 flex-1 truncate">{label}</span>
              {enConstruccion && (
                <span
                  aria-hidden
                  title="En construcción"
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400/70"
                />
              )}
            </motion.div>
          </Link>
        );
      })}
    </>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside
      className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-white/[0.06] bg-[oklch(0.08_0.016_250)] lg:flex"
      aria-label="Navegación principal"
    >
      <Link
        href="/"
        className="flex items-center gap-3 border-b border-white/[0.06] px-5 py-5 transition-colors hover:bg-white/[0.02]"
      >
        <EvaMark size={32} />
        <div className="min-w-0">
          <div className="mono text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">
            {SITIO.partes.uno} <span className="text-zinc-500">{SITIO.partes.dos}</span>
          </div>
          <div className="truncate text-[13px] leading-tight text-zinc-500">
            Prompting jurídico
          </div>
        </div>
      </Link>

      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
        {GRUPOS.map(g => (
          <Grupo
            key={g}
            title={g}
            items={SECCIONES.filter(s => s.grupo === g)}
            pathname={pathname}
          />
        ))}
      </nav>

      {/* `pb-28` reserva el hueco del botón flotante de EVA, que se apoya en
          esta esquina: sin él, el crédito quedaría debajo del retrato. */}
      <div className="space-y-1.5 border-t border-white/[0.06] px-4 pb-28 pt-4">
        <p className="text-[13px] leading-snug text-zinc-600">{SITIO.tesis}</p>
        <div className="mono text-[13px] uppercase tracking-widest text-zinc-700">
          {AUTOR.credito}
        </div>
      </div>
    </aside>
  );
}
