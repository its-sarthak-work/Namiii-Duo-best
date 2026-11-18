
import { useEffect, useRef, useState } from "react";

const NOTES = [
  659, 784, 880, 784, 659, 587, 523, 587,
  659, 659, 587, 523, 587, 659, 784, 659,
];

export function useMusic() {
  const [on, setOn] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (!on) return;

    const ctx = ctxRef.current ?? new AudioContext();
    ctxRef.current = ctx;
    void ctx.resume();

    let i = 0;

    const play = () => {
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();

      oscillator.type = "triangle";
      oscillator.frequency.value = NOTES[i % NOTES.length] ?? 659;

      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(
        0.0001,
        ctx.currentTime + 0.5
      );

      oscillator.connect(gain).connect(ctx.destination);
      oscillator.start();
      oscillator.stop(ctx.currentTime + 0.55);

      i++;
    };

    play();
    timer.current = window.setInterval(play, 380);

    return () => {
      if (timer.current !== null) {
        window.clearInterval(timer.current);
        timer.current = null;
      }
    };
  }, [on]);

  const stop = () => {
    if (timer.current !== null) {
      window.clearInterval(timer.current);
      timer.current = null;
    }

    if (ctxRef.current && ctxRef.current.state !== "closed") {
      void ctxRef.current.close();
    }

    ctxRef.current = null;
    setOn(false);
  };

  return {
    on,
    toggle: () => setOn((v) => !v),
    stop,
  };
}
