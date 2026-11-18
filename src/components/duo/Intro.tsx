import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

// Keep the audio element outside the Intro component so music continues
// after the intro screen unmounts.
let backgroundMusic: HTMLAudioElement | null = null;
import { AnimatedCat } from "./AnimatedCat";
import { Burst } from "./Decor";

export function Intro({ onOpen }: { onOpen: () => void }) {
  const [opening, setOpening] = useState(false);
  const [burst, setBurst] = useState(0);

  const open = () => {
    if (opening) return;
    setOpening(true);
    setBurst(Date.now());

    // Start music directly from the user's click to satisfy browser autoplay rules.
    if (!backgroundMusic) {
      backgroundMusic = new Audio("/music/heat-waves.mp3");
      backgroundMusic.loop = true;
      backgroundMusic.volume = 0.35;
    }

    if (backgroundMusic.paused) {
      void backgroundMusic.play().catch((error) => {
        console.error("Background music could not start:", error);
      });
    }

    setTimeout(onOpen, 1500);
  };

  return (
    <motion.section
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.7 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-hero px-6 text-center"
    >
      <Burst trigger={burst} amount={50} />
      <AnimatedCat variant={0} />
      <AnimatedCat flipped variant={1} />
      {["top-10 left-8", "top-24 right-12", "bottom-1/3 left-6", "top-1/3 right-1/4"].map((p, i) => (
        <motion.span
          key={p}
          className={`absolute ${p} text-3xl text-primary`}
          animate={{ y: [0, -14, 0], rotate: [0, 15, 0] }}
          transition={{ duration: 3 + i, repeat: Infinity }}
        >
          {i % 2 ? "⭐" : "🎀"}
        </motion.span>
      ))}

      <motion.h1
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.5 }}
        className="title-cute text-4xl md:text-6xl"
      >
        HEY, NAMIIIIII! 🎀
      </motion.h1>
      <p className="mt-4 font-hand text-2xl text-foreground md:text-3xl">
        Your favourite chaotic duo has something to show you.
      </p>

      {/* Envelope */}
      <div className="relative my-10 h-40 w-60 md:h-48 md:w-72">
        <div className="absolute inset-0 rounded-2xl bg-accent shadow-cute" />
        <motion.div
          className="absolute inset-x-6 bottom-4 top-6 flex items-center justify-center rounded-xl bg-card font-hand text-xl text-primary"
          animate={opening ? { y: -90 } : { y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          for my duo ♡
        </motion.div>
        <div
          className="absolute inset-x-0 bottom-0 h-full rounded-2xl bg-secondary"
          style={{ clipPath: "polygon(0 35%, 50% 75%, 100% 35%, 100% 100%, 0 100%)" }}
        />
        <motion.div
          className="absolute inset-x-0 top-0 h-1/2 origin-top rounded-t-2xl bg-primary"
          style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
          animate={opening ? { rotateX: 180 } : { rotateX: 0 }}
          transition={{ duration: 0.5 }}
        />
        <AnimatePresence>
          {!opening && (
            <motion.span exit={{ scale: 0 }} className="absolute left-1/2 top-[38%] -translate-x-1/2 text-4xl">
              🎀
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <p className="mb-6 font-hand text-xl text-muted-foreground md:text-2xl">
        I made a little corner of the internet just for you!
      </p>
      <motion.button
        onClick={open}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        animate={{ y: [0, -4, 0] }}
        transition={{ y: { duration: 1.6, repeat: Infinity } }}
        className="rounded-full bg-candy px-8 py-4 font-display text-lg font-bold text-primary-foreground shadow-cute"
      >
        OPEN YOUR SURPRISE ♡
      </motion.button>
    </motion.section>
  );
}
