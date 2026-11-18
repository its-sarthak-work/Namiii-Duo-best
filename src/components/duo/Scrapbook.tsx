
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import {
  categories,
  memories,
  type Memory,
  type MemoryCategory,
} from "@/data/memories";
import { SectionTitle } from "./Decor";

function MemoryMedia({
  memory,
  big = false,
}: {
  memory: Memory;
  big?: boolean;
}) {
  const mediaClass =
    "aspect-square w-full rounded-md object-cover";

  if (memory.type === "video") {
    return (
      <video
        src={memory.src}
        aria-label={memory.caption}
        className={mediaClass}
        controls={big}
        autoPlay={!big}
        muted={!big}
        loop={!big}
        playsInline
        preload="metadata"
      />
    );
  }

  return (
    <img
      src={memory.src}
      alt={memory.caption}
      loading="lazy"
      className={mediaClass}
    />
  );
}

export function Scrapbook() {
  const [filter, setFilter] = useState<
    MemoryCategory | "All"
  >("All");

  const [open, setOpen] = useState<Memory | null>(null);

  const list =
    filter === "All"
      ? memories
      : memories.filter((m) => m.category === filter);

  return (
    <section
      id="memories"
      className="relative z-10 px-4 py-24"
    >
      <SectionTitle sub="(click a polaroid to zoom in!)">
        OUR CHAOTIC LITTLE MEMORIES 📸
      </SectionTitle>

      <div className="mx-auto mb-10 flex max-w-4xl flex-wrap justify-center gap-2">
        {(["All", ...categories] as const).map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`rounded-full border-2 border-primary px-4 py-1.5 font-display text-sm transition ${
              filter === c
                ? "bg-primary text-primary-foreground"
                : "bg-card text-primary hover:bg-secondary"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <motion.div
        layout
        className="mx-auto grid max-w-5xl grid-cols-2 gap-6 md:grid-cols-3"
      >
        <AnimatePresence>
          {list.map((m, i) => (
            <motion.button
              layout
              key={m.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: i % 2 ? 3 : -3,
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{
                rotate: 0,
                scale: 1.05,
                y: -6,
              }}
              onClick={() => setOpen(m)}
              className="relative rounded-lg border-4 border-accent bg-card p-3 pb-4 text-left shadow-cute"
            >
              <span className="absolute -top-4 left-1/2 h-6 w-16 -translate-x-1/2 -rotate-3 rounded-sm bg-secondary/80" />

              <span className="absolute -right-3 -top-3 text-2xl">
                {m.sticker}
              </span>

              <MemoryMedia memory={m} />

              <p className="mt-3 text-center font-hand text-lg text-foreground md:text-xl">
                {m.caption}
              </p>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-foreground/50 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.5, rotate: 10 }}
              transition={{
                type: "spring",
                bounce: 0.4,
              }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md rounded-xl border-4 border-accent bg-card p-4 shadow-cute"
            >
              <button
                aria-label="Close"
                onClick={() => setOpen(null)}
                className="absolute -right-3 -top-3 z-10 rounded-full bg-primary p-2 text-primary-foreground"
              >
                <X size={18} />
              </button>

              <MemoryMedia memory={open} big />

              <p className="mt-4 text-center font-hand text-2xl text-foreground">
                {open.caption}
              </p>

              <p className="text-center font-display text-sm text-muted-foreground">
                {open.category}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
