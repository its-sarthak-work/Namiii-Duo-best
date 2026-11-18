
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Gamepad2, Heart, Sparkles, Star, Users, Zap } from "lucide-react";
import duoCats from "@/assets/duo-cats.png";
import catSingle from "@/assets/cat-single.png";
import catsCelebrate from "@/assets/cats-celebrate.png";
import { Burst, Reveal, SectionTitle } from "./Decor";
import duoSectionCats from "@/assets/duo-section.png";
import beginningCats from "@/assets/beginning-cats.png";
import finaleCats from "@/assets/finale-cats.png";

const timeline = [
  { t: "Random Teammates", e: "🎲" },
  { t: "Gaming Buddies", e: "🎮" },
  { t: "Daily Chaos", e: "💥" },
  { t: "Best Friends", e: "🎀" },
  { t: "Irreplaceable Duo", e: "👑" },
];

function AnimatedFriendshipTimeline() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(timelineRef, {
    once: true,
    amount: 0.4,
  });

  const [activeLevel, setActiveLevel] = useState(-1);
  const [finished, setFinished] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!isInView || !started) return;

    const timers = timeline.map((_, i) =>
      window.setTimeout(() => setActiveLevel(i), 700 + i * 1400)
    );

    const finishTimer = window.setTimeout(
      () => setFinished(true),
      7200
    );

    return () => {
      timers.forEach(window.clearTimeout);
      window.clearTimeout(finishTimer);
    };
  }, [isInView, started]);

  const rocketPath =
    "M 100 40 C 160 0, 240 0, 300 40 C 360 80, 440 80, 500 40 C 560 0, 640 0, 700 40 C 760 80, 840 80, 900 40";

  return (
    <div ref={timelineRef} className="mx-auto mt-16 max-w-5xl">
      <div className="relative">
        {/* Curved pink rocket trail */}
        <svg
          viewBox="0 0 1000 110"
          preserveAspectRatio="none"
          className="absolute left-0 top-0 z-0 hidden h-28 w-full overflow-visible md:block"
        >
          <defs>
            <filter id="pinkGlow">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background path */}
          <path
            d={rocketPath}
            fill="none"
            stroke="#ffc0d9"
            strokeWidth="5"
            strokeLinecap="round"
            opacity="0.45"
          />

          {/* Animated glowing trail */}
          {isInView && started && (
            <motion.path
              d={rocketPath}
              fill="none"
              stroke="#ff69a6"
              strokeWidth="5"
              strokeLinecap="round"
              filter="url(#pinkGlow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 7, ease: "linear" }}
            />
          )}

          {/* Sparkles following the rocket */}
          {isInView &&
            started &&
            ["✨", "⭐", "💖", "✦"].map((symbol, i) => (
              <text
                key={i}
                fontSize="23"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {symbol}
                <animateMotion
                  dur="7s"
                  begin={`${i * 0.22}s`}
                  fill="freeze"
                  path={rocketPath}
                />
              </text>
            ))}

          {/* Rocket following the exact curved path */}
          {isInView && started && (
            <g>
              <text
                fontSize="34"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                🚀
                <animateMotion
                  dur="7s"
                  fill="freeze"
                  path={rocketPath}
                />
              </text>
            </g>
          )}
        </svg>

        {/* Friendship milestones */}
        <div className="relative z-10 grid grid-cols-5 gap-6">
          {timeline.map((s, i) => (
            <div
              key={s.t}
              onClick={() => {
                if (i === 0 && !started) {
                  setStarted(true);
                }
              }}
              role={i === 0 ? "button" : undefined}
              tabIndex={i === 0 && !started ? 0 : undefined}
              onKeyDown={(e) => {
                if (
                  i === 0 &&
                  !started &&
                  (e.key === "Enter" || e.key === " ")
                ) {
                  e.preventDefault();
                  setStarted(true);
                }
              }}
              className={`flex flex-col items-center text-center ${
                i === 0 && !started ? "cursor-pointer" : ""
              }`}
            >
              <motion.div
                animate={
                  activeLevel >= i
                    ? {
                        scale: [1, 1.18, 1],
                        boxShadow: [
                          "0 0 0px #ff80b5",
                          "0 0 30px #ff80b5",
                          "0 0 12px #ff80b5",
                        ],
                      }
                    : { scale: 1 }
                }
                transition={{ duration: 0.7 }}
                className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-card bg-candy text-3xl shadow-cute"
              >
                {s.e}
              </motion.div>

              <span className="mt-2 font-display text-xs text-muted-foreground">
                LEVEL {i + 1}
              </span>

              <motion.span
                animate={
                  activeLevel >= i
                    ? {
                        color: "#ec4899",
                        scale: activeLevel === i ? 1.12 : 1,
                      }
                    : { scale: 1 }
                }
                className="font-display font-semibold text-primary"
              >
                {s.t}
              </motion.span>
            </div>
          ))}
        </div>

        {/* Final confetti explosion */}
        {finished && (
          <div className="pointer-events-none absolute right-0 top-0 z-30 hidden md:block">
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.span
                key={i}
                initial={{
                  x: 0,
                  y: 40,
                  opacity: 1,
                  scale: 0.5,
                  rotate: 0,
                }}
                animate={{
                  x:
                    Math.cos((i / 30) * Math.PI * 2) *
                    (65 + (i % 4) * 15),
                  y:
                    40 +
                    Math.sin((i / 30) * Math.PI * 2) *
                      (65 + (i % 4) * 15),
                  opacity: 0,
                  scale: [0.5, 1.4, 0.2],
                  rotate: 360,
                }}
                transition={{
                  duration: 1.8 + (i % 3) * 0.3,
                  ease: "easeOut",
                }}
                className="absolute text-xl"
                style={{
                  color: "#ff69a6",
                  left: "0px",
                  top: "0px",
                }}
              >
                {["🎀", "💖", "✨", "🎉", "⭐", "🌸"][i % 6]}
              </motion.span>
            ))}
          </div>
        )}
      </div>

      {/* Final celebration message */}
      {finished && (
        <motion.div
          initial={{ opacity: 0, y: 15, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="mt-8 text-center font-display text-xl font-bold text-primary"
        >
          🎉 LEVEL 5 UNLOCKED: IRREPLACEABLE DUO! 🎀
        </motion.div>
      )}
    </div>
  );
}

export function Beginning() {
  return (
    <section id="beginning" className="relative z-10 px-4 py-24">
      <SectionTitle>WHO KNEW A GAME COULD GIVE ME A BESTIE?</SectionTitle>
      <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2">
        <Reveal className="relative -rotate-1 rounded-3xl border-4 border-dashed border-accent bg-card p-6 font-hand text-xl leading-relaxed text-foreground shadow-cute md:text-2xl">
          <span className="absolute -top-5 left-6 text-4xl">📌</span>
          <p>We started as two random people playing a game.</p>
          <p className="mt-3">
            Just another teammate, another match, another ordinary gaming session.
          </p>
          <p className="mt-3">
            But somehow, between all those games, random conversations, stupid jokes, wins, losses , wiffs and chaotic moments...
          </p>
          <p className="mt-3 font-bold text-primary">
            You became most important person...My Bestfriend.
          </p>
          <p className="mt-3">
            Who would've thought that a random gaming connection would turn into such a special friendship?
          </p>
          <p className="mt-3">
            And now, gaming without you feels like just timepass..no fun...but with you the games are always so fun and chaeotic i always forget about time and we end up staying awake whole night..xD. You have become the irreplaceable part of my life.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <motion.img
            src={beginningCats}
            alt="Two cute cats in gaming headsets at a pink setup"
            width={1024}
            height={1024}
            loading="lazy"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="mx-auto w-full max-w-md drop-shadow-xl"
          />
        </Reveal>
      </div>

      <AnimatedFriendshipTimeline />
    </section>
  );
}

const apology = [
  "I know I messed up, and I genuinely want to apologise.",
  "When I sent you that reel about dying, I was going through a really difficult time mentally. I wasn't doing okay, and eventually I deactivated my Instagram which i never do and even without telling you.",
  "And then I disappeared for like hours and hours.",
  "For more than 12 hours, you had no idea what was happening.",
  "You even tried contacting my friends, but I wasn't responding to them either because I was asleep due to stress.",
  "I understand why you got angry. I understand why you were worried and confused. and i even made u cried which is the worst thing i can ever do to you. mb gng",
  "You didn't deserve to be left wondering what happened to me and getting worried and not able to focus on anything.",
  "I wasn't intentionally ignoring you and i never can, if i see ya message i will instantly reply it whenever i be free or i will make free time just to reply ya. I should have told you that I needed some time instead of disappearing without an explanation.",
  "I know being depressed doesn't make it okay to leave someone worrying like that.",
  "I'm genuinely sorry for putting you through all that and i promise on everything wont let it happen again.",
  "And I want you to know that your friendship matters to me the most. I never wanted you to feel like you weren't important to me.",
  "You really are the best people gaming brought into my life and i never wanna lose ya.",
  "I don't expect you to forget what happened. I just wanted to make sure you know that I recognise my mistake and want to do better.so please forgive me....and if u forgive me say it once so that i be relieaved else i be worried inside that u still havent forgiven me :<",
];

export function Apology() {
  return (
    <section id="apology" className="relative z-10 px-4 py-24">
      <SectionTitle>OKAY, LET'S TALK ABOUT MY STUPID MISTAKE...</SectionTitle>
      <Reveal className="relative mx-auto max-w-2xl">
        <span className="absolute -left-4 -top-6 z-10 rotate-[-20deg] text-5xl">
          🎀
        </span>
        <span className="absolute -bottom-6 -right-4 z-10 text-4xl">
          🐾
        </span>
        <div className="rounded-3xl border-4 border-accent bg-card p-2 shadow-cute">
          <div className="relative rounded-2xl bg-lined px-6 py-8 pl-12 md:px-12 md:pl-16">
            <div className="absolute bottom-0 left-8 top-0 w-0.5 bg-primary/40 md:left-10" />
            <p className="mb-4 font-display text-lg text-primary">
              Dear Bestie,
            </p>
            {apology.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`mb-4 font-hand text-xl leading-8 text-foreground md:text-2xl ${
                  i === 9 ? "font-bold text-primary" : ""
                }`}
              >
                {p}
              </motion.p>
            ))}
            <p className="mt-6 text-right font-hand text-2xl text-primary">
              — your idiotic duo 🐱
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Users;
  label: string;
  value: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      initial={{ scale: 0.6, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", bounce: 0.5 }}
      className="flex items-center gap-3 rounded-2xl border-2 border-primary bg-card px-5 py-3 shadow-sticker"
    >
      <Icon className="text-primary" />
      <span className="font-display text-foreground">
        {label}: <b className="text-primary">{value}</b>
      </span>
    </motion.div>
  );
}

export function Duo() {
  const [players, setPlayers] = useState(0);

  return (
    <section id="duo" className="relative z-10 overflow-hidden bg-hero px-4 py-28">
      <div className="absolute inset-0 bg-dots opacity-60" />
      <div className="relative">
        <SectionTitle sub="You're MY duo for lifetime now. And that spot isn't something I can replace.">
          ONE DUO. ZERO REPLACEMENTS.
        </SectionTitle>

        <div className="mx-auto flex max-w-4xl flex-col items-center">
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="rounded-full bg-candy px-8 py-3 font-display text-xl font-bold tracking-widest text-primary-foreground shadow-cute"
          >
            🎀 FRIENDSHIP SQUAD: GOATED DUO 🎀
          </motion.div>

          <div className="relative mt-6">
            {[
              "-left-10 top-10",
              "-right-10 top-24",
              "left-4 bottom-0",
            ].map((p, i) => (
              <motion.div
                key={p}
                className={`absolute ${p} z-10 rounded-2xl bg-card p-3 text-primary shadow-cute`}
                animate={{ y: [0, -14, 0], rotate: [-10, 10, -10] }}
                transition={{ duration: 3 + i, repeat: Infinity }}
              >
                <Gamepad2 size={28} />
              </motion.div>
            ))}

            <motion.img
              src={duoSectionCats}
              alt="Pink cat and white cat duo gaming together"
              width={1024}
              height={1024}
              loading="lazy"
              whileHover={{ scale: 1.03 }}
              onViewportEnter={() => setPlayers(2)}
              className="w-full max-w-xl drop-shadow-2xl"
            />

            <motion.div
              initial={{ scale: 0, rotate: -30 }}
              whileInView={{ scale: 1, rotate: 12 }}
              viewport={{ once: true }}
              transition={{ type: "spring", delay: 0.3 }}
              className="absolute -right-2 top-0 flex h-24 w-24 flex-col items-center justify-center rounded-full border-4 border-card bg-primary text-center font-display text-xs font-bold text-primary-foreground shadow-cute md:h-28 md:w-28"
            >
              <Star className="mb-1" size={20} fill="currentColor" />
              DUO
              <br />
              BADGE
            </motion.div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {["BEST FRIENDS ♡", "DUO  🎮", "NO REPLACEMENTS 🎀"].map((t, i) => (
              <motion.span
                key={t}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ scale: 1.1, rotate: i % 2 ? 3 : -3 }}
                className="rounded-full border-4 border-card bg-primary px-5 py-2 font-display text-lg font-bold text-primary-foreground shadow-cute"
              >
                {t}
              </motion.span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Stat icon={Users} label="Players" value={String(players)} />
            <Stat icon={Heart} label="Friendship" value="Unmatched" />
            <Stat icon={Zap} label="Chaos" value="Unlimited" />
          </div>

          <Reveal className="mt-12 max-w-2xl space-y-4 rounded-3xl bg-card/90 p-8 text-center font-hand text-xl leading-relaxed text-foreground shadow-cute md:text-2xl">
            <p>
              Out of all the people I've played with, somehow you became my most favourite teammate.
            </p>
            <p>
              It's never really been about winning every match or having the perfect games.
            </p>
            <p className="font-bold text-primary">
              It's about you and the fun we have together.
            </p>
            <p>
              The random conversations, the laughter, the chaos, the stupid mistakes, the victories and those matches where everything goes wrong.
            </p>
            <p>
              Our friendship isn't replaceable just because there are other people to play with, i can leave any party or anyone just to play with ya, because you da best gng.
            </p>
            <p>
              Nobody else can recreate our memories, our inside jokes or the bond we've built.
            </p>
            <p className="font-bold text-primary">
              You're my best friend and my favourite gaming duo.
            </p>
            <p>
              And I hope you never have to question how much I appreciate having you around, becuase i might not show it much but am too jelous when u online and playing with someone else...like wdym u playing with friend your duo is solo here waiting for ya :3, just try to come to play with me a little more bcs i miss you a lot....likeeeeeeee a loooooooottttttt.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const promises = [
  "I'll text and explain when I'm not doing okay instead of disappearing without telling you.",
  "I'll never ever make you cry again, am sorryyy.",
  "I won't leave you worrying about whether I'm okay.",
  "I'll appreciate our friendship and never gonna take it for granted.",
  "I'll try to be a better friend, even when life gets difficult.",
];

export function Promises() {
  return (
    <section id="promises" className="relative z-10 px-4 py-24">
      <SectionTitle>A FEW THINGS FROM YOUR CHAOTIC DUO</SectionTitle>
      <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {promises.map((p, i) => (
          <Reveal key={p} delay={i * 0.1}>
            <motion.div
              whileHover={{ y: -8, rotate: i % 2 ? 2 : -2 }}
              className="relative h-full rounded-3xl border-4 border-accent bg-card p-6 pt-10 shadow-cute"
            >
              <img
                src={catSingle}
                alt=""
                width={816}
                height={816}
                loading="lazy"
                className="absolute -top-8 right-4 w-16"
              />
              <span className="font-display text-4xl font-bold text-accent">
                0{i + 1}
              </span>
              <p className="mt-2 font-hand text-xl leading-snug text-foreground">
                {p}
              </p>
            </motion.div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mx-auto mt-12 max-w-2xl rounded-full bg-candy px-8 py-5 text-center font-display text-lg text-primary-foreground shadow-cute">
        I'm not promising to be a perfect friend. I'm promising to put in the effort to be a better one.
      </Reveal>
    </section>
  );
}

export function Finale({
  onSecretClick,
}: {
  onSecretClick: () => void;
}) {
  const [burst, setBurst] = useState(0);
  const [legend, setLegend] = useState(false);

  return (
    <section id="finale" className="relative z-10 bg-hero px-4 py-28">
      <Burst trigger={burst} amount={70} />
      <SectionTitle>THANK YOU FOR BEING MY DUO!</SectionTitle>

      <Reveal className="mx-auto max-w-2xl space-y-4 text-center font-hand text-xl leading-relaxed text-foreground md:text-2xl">
        <p>Honestly, I'm really glad that a random game brought us together.</p>
        <p>Out of all the random people we could've met, somehow we ended up becoming best friends.</p>
        <p>Thank you for all the games, random conversations, stupid jokes, unforgettable moments and everything in between.</p>
        <p>I'm sorry for worrying you.</p>
        <p>And please remember that you're not just another person on my friends list.</p>
        <p className="font-bold text-primary">You're my bestie, my favourite teammate and my irreplaceable duo.</p>
        <p>Here's to many more games, more chaos and more memories together.</p>
        <p className="text-3xl">Now stop being mad at your favourite idiot. :P</p>
      </Reveal>

      <div className="mt-12 flex flex-col items-center">
        <AnimatePresence mode="wait">
          <motion.img
            key={legend ? "c" : "d"}
            src={legend ? catsCelebrate : finaleCats}
            alt="The duo cats"
            width={1024}
            height={1024}
            loading="lazy"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={
              legend
                ? { scale: 1, opacity: 1, y: [0, -20, 0] }
                : { scale: 1, opacity: 1 }
            }
            exit={{ scale: 0.7, opacity: 0 }}
            transition={
              legend ? { y: { duration: 0.6, repeat: Infinity } } : {}
            }
            className="w-72 drop-shadow-xl md:w-96"
          />
        </AnimatePresence>

        <p className="mt-4 font-display text-2xl font-bold text-primary">
          YOUR FAVOURITE CHAOTIC DUO ♡
        </p>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => {
            setBurst(Date.now());
            setLegend(true);
          }}
          className="mt-6 rounded-full bg-candy px-10 py-4 font-display text-xl font-bold text-primary-foreground shadow-cute"
        >
          DUO FOREVER? 🎮
        </motion.button>

        <AnimatePresence>
          {legend && (
            <>
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", bounce: 0.6 }}
                className="mt-8 flex items-center gap-2 rounded-2xl border-4 border-primary bg-card px-6 py-4 font-display text-2xl font-bold text-primary shadow-sticker md:text-3xl"
              >
                <Sparkles /> BESTIE STATUS: LEGENDARY <Sparkles />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-12 flex flex-col items-center gap-4 text-center"
              >
                <p className="font-display text-2xl font-bold text-primary md:text-3xl">
                  YOU THINK IT'S THE END? 👀
                </p>

                <p className="font-hand text-xl text-foreground md:text-2xl">
                  There's one more secret waiting for you...
                </p>

                <motion.button
                  whileHover={{
                    scale: 1.07,
                    boxShadow: "0 0 35px rgba(163, 230, 53, 0.7)",
                  }}
                  whileTap={{ scale: 0.94 }}
                  onClick={onSecretClick}
                  className="mt-3 rounded-full border-2 border-lime-300 bg-lime-400 px-8 py-4 font-display text-lg font-bold text-black shadow-[0_0_20px_rgba(163,230,53,0.45)] transition-colors hover:bg-lime-300 md:text-xl"
                >
                  CLICK HERE TO REVEAL THE SECRET ✨
                </motion.button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
  