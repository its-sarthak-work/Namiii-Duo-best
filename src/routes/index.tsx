import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, Music, VolumeX } from "lucide-react";
import { useEffect, useState } from "react";
import catSingle from "@/assets/cat-single.png";
import duoCats from "@/assets/duo-cats.png";
import { Burst, FloatingDecor } from "@/components/duo/Decor";
import { Intro } from "@/components/duo/Intro";
import { Scrapbook } from "@/components/duo/Scrapbook";
import { Apology, Beginning, Duo, Finale, Promises } from "@/components/duo/Sections";
import { useMusic } from "@/components/duo/useMusic";
import heroCats from "@/assets/hero-cats.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "My Irreplaceable Duo 🎀 — For My Bestie" },
      { name: "description", content: "A pink little friendship scrapbook for my best friend and favourite gaming duo." },
      { property: "og:title", content: "My Irreplaceable Duo 🎀" },
      { property: "og:description", content: "A pink little friendship scrapbook for my best friend and favourite gaming duo." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAV = [
  ["home", "Home"],
  ["beginning", "Our Beginning"],
  ["apology", "Apology"],
  ["duo", "My Duo"],
  ["memories", "Memories"],
  ["promises", "Promises"],
] as const;

const EGGS = [
  "psst… you're the best duo ever 🐾",
  "fun fact: this cat loves you (as a bestie) 🎀",
  "achievement unlocked: found the secret cat ⭐",
  "okay okay, stop poking me 😹",
];

function Index() {
  const [opened, setOpened] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [egg, setEgg] = useState<string | null>(null);
  const [eggCount, setEggCount] = useState(0);
  const [burst, setBurst] = useState(0);
  const music = useMusic();

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    // Secret: type "duo" anywhere
    let typed = "";
    const onKey = (e: KeyboardEvent) => {
      typed = (typed + e.key.toLowerCase()).slice(-3);
      if (typed === "duo") {
        setBurst(Date.now());
        setEgg("secret code accepted: DUO MODE ACTIVATED 🎮✨");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    if (!egg) return;
    const t = setTimeout(() => setEgg(null), 2800);
    return () => clearTimeout(t);
  }, [egg]);

  const pokeCat = () => {
    setEgg(EGGS[eggCount % EGGS.length] ?? null);
    setEggCount((c) => c + 1);
    if (eggCount % 4 === 3) setBurst(Date.now());
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <AnimatePresence>{!opened && <Intro onOpen={() => setOpened(true)} />}</AnimatePresence>
      <FloatingDecor />
      <Burst trigger={burst} />

      <nav className="fixed inset-x-0 top-3 z-40 mx-auto w-fit max-w-[95vw] overflow-x-auto rounded-full border-2 border-accent bg-card/85 px-2 py-1.5 shadow-cute backdrop-blur">
        <ul className="flex gap-1 whitespace-nowrap">
          {NAV.map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`} className="block rounded-full px-3 py-1.5 font-display text-xs text-primary transition hover:bg-secondary md:text-sm">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <section id="home" className="relative z-10 flex min-h-screen flex-col items-center justify-center bg-hero px-4 pt-20 text-center">
        <div className="absolute inset-0 bg-dots opacity-50" />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={opened ? { opacity: 1, y: 0 } : {}}
          className="relative font-hand text-2xl text-muted-foreground"
        >
          a little pink universe for my bestie ✨
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={opened ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2, type: "spring" }}
          className="title-cute relative mt-2 text-5xl md:text-7xl"
        >
          MY IRREPLACEABLE DUO 🎀
        </motion.h1>
        <motion.img
          src={heroCats}
          alt="Two kawaii cats gaming together"
          width={1024}
          height={1024}
          initial={{ opacity: 0, y: 40 }}
          animate={opened ? { opacity: 1, y: [0, -12, 0] } : {}}
          transition={{ delay: 0.4, y: { duration: 4, repeat: Infinity } }}
          className="relative mt-6 w-full max-w-lg drop-shadow-2xl"
        />
        <a href="#beginning" className="relative mt-4 animate-bounce font-display text-primary">
          scroll down, bestie ↓
        </a>
      </section>

      <Beginning />
      <Apology />
      <Duo />
      <Scrapbook />
      <Promises />
      <Finale
  onSecretClick={() => {
    music.stop();
    window.location.assign("https://princess-namiiii.vercel.app/");
  }}
/>

      <footer className="relative z-10 py-10 text-center font-hand text-xl text-muted-foreground">
        made with way too much pink, for my favourite teammate 🐾
        <p className="mt-1 text-sm">(psst… try poking the cat, or typing “duo”)</p>
      </footer>

      {/* Floating controls */}
      <div className="fixed bottom-4 left-4 z-40 flex items-end gap-2">
        <motion.button
          aria-label="Poke the cat"
          onClick={pokeCat}
          whileHover={{ rotate: -10, scale: 1.1 }}
          whileTap={{ scale: 0.85 }}
          className="w-16 md:w-20"
        >
          <img src={catSingle} alt="" width={816} height={816} />
        </motion.button>
        <AnimatePresence>
          {egg && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="mb-10 max-w-56 rounded-2xl rounded-bl-none border-2 border-primary bg-card px-4 py-2 font-hand text-lg text-foreground shadow-cute"
            >
              {egg}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="fixed bottom-4 right-4 z-40 flex flex-col gap-2">
        <button
          aria-label={music.on ? "Turn music off" : "Turn music on"}
          onClick={music.toggle}
          className="rounded-full bg-candy p-3 text-primary-foreground shadow-cute transition hover:scale-110"
        >
          {music.on ? <Music size={20} /> : <VolumeX size={20} />}
        </button>
        <AnimatePresence>
          {showTop && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              aria-label="Back to top"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="rounded-full border-2 border-primary bg-card p-3 text-primary shadow-cute transition hover:scale-110"
            >
              <ArrowUp size={20} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
