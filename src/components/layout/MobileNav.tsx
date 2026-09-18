'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { SECCIONES } from '@/lib/nav';

export function MobileNav() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Navegación principal"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/[0.08] bg-[oklch(0.08_0.016_250/0.95)] backdrop-blur-xl lg:hidden"
    >
      <div className="flex items-center">
        {SECCIONES.map(({ href, icon: Icon, corta }) => {
          const active = href === '/' ? pathname === '/' : pathname.startsWith(href);
          return (
            <Link key={href} href={href} className="min-w-0 flex-1">
              <motion.div
                className={`flex flex-col items-center gap-1 px-1 py-2.5 ${
                  active ? 'text-cyan-400' : 'text-zinc-500'
                }`}
                whileTap={{ scale: 0.9 }}
              >
                <span className="relative">
                  {active && (
                    <motion.span
                      className="absolute inset-0 -m-1 rounded-md bg-cyan-500/15"
                      layoutId="mobile-nav-bg"
                    />
                  )}
                  <Icon aria-hidden className="relative z-10 h-5 w-5" />
                </span>
                <span className="w-full truncate text-center text-[9px] font-medium leading-none">
                  {corta}
                </span>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
