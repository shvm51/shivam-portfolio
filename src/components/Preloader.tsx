import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { profile } from "../data/portfolio";
import { EASE } from "./ui";

/**
 * Minimal preloader: counter 0→100 + name mask. Max ~1.2s, click to skip.
 */
export function Preloader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(true);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) {
      setVisible(false);
      onDone();
      return;
    }
    const start = performance.now();
    const duration = 1100;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setCount(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        setTimeout(() => {
          setVisible(false);
          onDone();
        }, 150);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

  const skip = () => {
    setVisible(false);
    onDone();
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex cursor-pointer flex-col justify-between bg-ink p-8 text-paper"
          onClick={skip}
          role="button"
          aria-label="Skip intro"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && skip()}
          exit={{ y: "-100%", transition: { duration: 0.7, ease: EASE } }}
        >
          <div className="overflow-hidden">
            <motion.p
              className="font-display text-2xl uppercase tracking-tight"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              {profile.name}
            </motion.p>
          </div>
          <div className="flex items-end justify-between">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-paper/50">
              Portfolio — loading
            </p>
            <p className="font-display text-7xl tabular-nums" aria-live="polite">
              {count}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
