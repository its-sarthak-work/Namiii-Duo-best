import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import catIdle from "@/assets/welcome-cat-idle.png";
import catBlink from "@/assets/welcome-cat-blink.png";
import catHappy from "@/assets/welcome-cat-happy.png";

const FRAMES = { idle: catIdle, blink: catBlink, happy: catHappy };
type Expression = keyof typeof FRAMES;

export function AnimatedCat({ flipped = false, variant = 0 }: { flipped?: boolean; variant?: number }) {
  const reduceMotion = useReducedMotion();
  const [expression, setExpression] = useState<Expression>("idle");

  useEffect(() => {
    if (reduceMotion) {
      setExpression("idle");
      return;
    }
    let cycle = 0;
    const timers = new Set<number>();
    const later = (callback: () => void, delay: number) => {
      const timer = window.setTimeout(() => {
        timers.delete(timer);
        callback();
      }, delay);
      timers.add(timer);
    };
    const play = () => {
      cycle += 1;
      const happy = cycle % 3 === 0;
      setExpression(happy ? "happy" : "blink");
      later(() => setExpression("idle"), happy ? 1100 : 160);
      later(play, 3500 + variant * 900 + Math.random() * 1400);
    };
    later(play, 1800 + variant * 1700);
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [reduceMotion, variant]);

  return (
    <motion.div
      aria-hidden
      data-welcome-cat={variant}
      className={`pointer-events-none absolute -bottom-4 ${flipped ? "-right-6" : "-left-6"} w-32 md:w-48`}
      initial={false}
      animate={reduceMotion ? { y: 0, scale: 1, rotate: 0 } : {
        y: [0, -7, 0],
        scale: [1, 1.018, 1],
        rotate: [0, variant === 0 ? -1.4 : 1.4, 0],
      }}
      transition={{ duration: 4.2 + variant * 0.9, repeat: Infinity, ease: "easeInOut", delay: variant * 1.1 }}
    >
      <div className={`relative aspect-square ${flipped ? "-scale-x-100" : ""}`}>
        {Object.entries(FRAMES).map(([name, src]) => (
          <img
            key={name}
            src={src}
            alt=""
            width={1024}
            height={1024}
            data-cat-frame={name}
            className={`absolute inset-0 block h-full w-full ${expression === name ? "visible" : "invisible"}`}
          />
        ))}
      </div>
    </motion.div>
  );
}