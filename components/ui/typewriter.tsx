"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

const TYPE_BASE = 62;
const TYPE_JITTER = 64;
const HOLD = 1800;
const SELECTED_FOR = 620;
const SWAP_EVERY = 2800;

const CSS = `
@keyframes typewriter-caret {
  0%, 45% { opacity: 1; }
  55%, 95% { opacity: 0; }
  100% { opacity: 1; }
}
.typewriter-caret { animation: typewriter-caret 1.06s linear infinite; }
[data-typing="true"] .typewriter-caret { animation: none; }
[data-selecting="true"] .typewriter-caret { visibility: hidden; }
.typewriter-selection {
  scale: 0 1;
  transform-origin: right;
  transition: scale 220ms cubic-bezier(0.23, 1, 0.32, 1);
}
[data-selecting="false"] .typewriter-selection { transition: none; }
[data-selecting="true"] .typewriter-selection { scale: 1 1; }
@keyframes typewriter-ink {
  from { opacity: 0; filter: blur(2px); }
}
.typewriter-letter { animation: typewriter-ink 140ms cubic-bezier(0.23, 1, 0.32, 1); }
@media (prefers-reduced-motion: reduce) {
  .typewriter-selection { transition: none; }
  .typewriter-letter { animation: none; }
}
`;

function jitter(word: number, char: number) {
  const wave = Math.sin(char * 1.9 + word * 2.7) * 0.5 + 0.5;
  const n = Math.sin(char * 12.9898 + word * 78.233) * 43758.5453;
  return wave * 0.7 + (n - Math.floor(n)) * 0.3;
}

export function Typewriter({
  prefix,
  words,
  className,
}: {
  prefix: string;
  words: string[];
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [swapIndex, setSwapIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const root = rootRef.current;
    const text = textRef.current;
    if (!root || !text || words.length === 0) return;

    let word = 0;
    let length = words[0].length;
    let timer: ReturnType<typeof setTimeout>;

    const strike = (char: string) => {
      const letter = document.createElement("span");
      letter.className = "typewriter-letter";
      letter.textContent = char;
      text.append(letter);
    };

    const type = () => {
      const target = words[word];
      if (length < target.length) {
        strike(target[length]);
        length++;
      }
      const finished = length === target.length;
      root.dataset.typing = String(!finished);
      timer = finished
        ? setTimeout(select, HOLD)
        : setTimeout(type, TYPE_BASE + jitter(word, length) * TYPE_JITTER);
    };

    const select = () => {
      if (words.length < 2) return;
      root.dataset.selecting = "true";
      timer = setTimeout(() => {
        word = (word + 1) % words.length;
        length = 0;
        text.textContent = "";
        root.dataset.selecting = "false";
        type();
      }, SELECTED_FOR);
    };

    root.dataset.typing = "false";
    timer = setTimeout(select, HOLD);
    return () => {
      clearTimeout(timer);
      text.textContent = words[0] ?? "";
      root.dataset.selecting = "false";
    };
  }, [reduceMotion, words]);

  useEffect(() => {
    if (!reduceMotion || words.length < 2) return;
    const id = setInterval(
      () => setSwapIndex((i) => (i + 1) % words.length),
      SWAP_EVERY,
    );
    return () => clearInterval(id);
  }, [reduceMotion, words.length]);

  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), "");
  const sentence = `${prefix} ${new Intl.ListFormat("es", {
    type: "disjunction",
  }).format(words)}.`;

  return (
    <span className={cn("inline-grid whitespace-pre", className)}>
      <style href="typewriter" precedence="default">
        {CSS}
      </style>
      <span className="sr-only">{sentence}</span>
      <span aria-hidden className="invisible col-start-1 row-start-1">
        {prefix} {longest}
        <Caret />
      </span>
      <span
        ref={rootRef}
        aria-hidden
        data-typing="false"
        data-selecting="false"
        className="col-start-1 row-start-1 text-center"
      >
        {prefix}{" "}
        {reduceMotion ? (
          <span className="inline-grid">
            {words.map((w, i) => (
              <span
                key={w}
                className={cn(
                  "col-start-1 row-start-1 transition-[opacity] duration-500 ease-in-out",
                  i !== swapIndex && "opacity-0",
                )}
              >
                {w}
              </span>
            ))}
          </span>
        ) : (
          <>
            <span className="relative inline-block">
              <span className="typewriter-selection absolute -inset-x-px -inset-y-[0.06em] rounded-[3px] bg-primary/20" />
              <span ref={textRef} className="relative text-primary">
                {words[0]}
              </span>
            </span>
            <Caret />
          </>
        )}
      </span>
    </span>
  );
}

function Caret() {
  return (
    <span className="typewriter-caret ml-0.5 inline-block h-[1.1em] w-[2px] rounded-full bg-primary align-[-0.18em]" />
  );
}
