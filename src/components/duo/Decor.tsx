import { motion } from "framer-motion";
import { useMemo } from "react";

const ITEMS = ["🎀", "⭐", "✨", "🐾", "🌸", "♡", "🎮"];

export function FloatingDecor({ count = 18 }: { count?: number }) {
  const bits = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        char: ITEMS[i % ITEMS.length],
        left: (i * 37) % 100,
        size: 14 + ((i * 7) % 18),
        duration: 10 + ((i * 3) % 10),
        delay: (i * 1.3) % 8,
      })),
    [count],
  );
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {bits.map((b) => (
        <motion.span
          key={b.id}
          className="absolute select-none text-primary/60"
          style={{ left: `${b.left}%`, fontSize: b.size, bottom: -40 }}
          animate={{ y: [0, -1200], rotate: [0, 180], opacity: [0, 1, 1, 0] }}
          transition={{ duration: b.duration, delay: b.delay, repeat: Infinity, ease: "linear" }}
        >
          {b.char}
        </motion.span>
      ))}
    </div>
  );
}

export function Burst({ trigger, amount = 40 }: { trigger: number; amount?: number }) {
  const bits = useMemo(
    () =>
      Array.from({ length: amount }, (_, i) => ({
        id: `${trigger}-${i}`,
        char: ITEMS[i % ITEMS.length],
        x: Math.cos((i / amount) * Math.PI * 2) * (150 + Math.random() * 250),
        y: Math.sin((i / amount) * Math.PI * 2) * (150 + Math.random() * 250),
      })),
    [trigger, amount],
  );
  if (!trigger) return null;
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[60] flex items-center justify-center">
      {bits.map((b) => (
        <motion.span
          key={b.id}
          className="absolute text-2xl text-primary"
          initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
          animate={{ x: b.x, y: b.y, scale: 1.4, opacity: 0, rotate: 360 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
        >
          {b.char}
        </motion.span>
      ))}
    </div>
  );
}

export function SectionTitle({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="mb-10 text-center"
    >
      <h2 className="title-cute text-3xl md:text-5xl">{children}</h2>
      {sub && <p className="mt-3 font-hand text-2xl text-muted-foreground">{sub}</p>}
    </motion.div>
  );
}

export function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}
