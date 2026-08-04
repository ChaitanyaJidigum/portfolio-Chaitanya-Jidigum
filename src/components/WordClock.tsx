"use client";

import React, { useState, useEffect, useMemo } from "react";

const GRID = [
  ["I", "T", "I", "S", "•", "A", "•", "S", "A", "M", "P", "M"],
  ["A", "C", "Q", "U", "A", "R", "T", "E", "R", "•", "D", "C"],
  ["T", "W", "E", "N", "T", "Y", "•", "F", "I", "V", "E", "X"],
  ["H", "A", "L", "F", "•", "B", "T", "E", "N", "•", "T", "O"],
  ["P", "A", "S", "T", "•", "E", "R", "U", "N", "I", "N", "E"],
  ["O", "N", "E", "S", "I", "X", "•", "T", "H", "R", "E", "E"],
  ["F", "O", "U", "R", "•", "F", "I", "V", "E", "T", "W", "O"],
  ["E", "I", "G", "H", "T", "•", "E", "L", "E", "V", "E", "N"],
  ["S", "E", "V", "E", "N", "•", "T", "W", "E", "L", "V", "E"],
  ["T", "E", "N", "•", "S", "E", "O'", "C", "L", "O", "C", "K"]
];

function getHighlightedCoords(date: Date) {
  const coords = new Set<string>();

  const addWord = (row: number, cols: number[]) => {
    cols.forEach(col => coords.add(`${row}-${col}`));
  };

  const hours24 = date.getHours();
  const minutes = date.getMinutes();

  // 1. IT IS is always highlighted
  addWord(0, [0, 1]); // IT
  addWord(0, [2, 3]); // IS

  // 2. Highlight AM/PM
  if (hours24 < 12) {
    addWord(0, [8, 9]); // AM
  } else {
    addWord(0, [10, 11]); // PM
  }

  // 3. Round to nearest 5 minutes
  let roundedMins = Math.round(minutes / 5) * 5;
  let hours12 = hours24 % 12;
  if (hours12 === 0) hours12 = 12;

  let targetHour = hours12;

  if (roundedMins === 60) {
    roundedMins = 0;
    targetHour = (hours12 % 12) + 1;
  } else if (roundedMins > 30) {
    targetHour = (hours12 % 12) + 1;
  }

  // 4. Highlight minute phrase
  if (roundedMins === 0) {
    addWord(9, [6, 7, 8, 9, 10, 11]); // O'CLOCK
  } else if (roundedMins === 5) {
    addWord(2, [7, 8, 9, 10]); // FIVE
    addWord(4, [0, 1, 2, 3]); // PAST
  } else if (roundedMins === 10) {
    addWord(3, [6, 7, 8]); // TEN
    addWord(4, [0, 1, 2, 3]); // PAST
  } else if (roundedMins === 15) {
    addWord(1, [0]); // A
    addWord(1, [2, 3, 4, 5, 6, 7, 8]); // QUARTER
    addWord(4, [0, 1, 2, 3]); // PAST
  } else if (roundedMins === 20) {
    addWord(2, [0, 1, 2, 3, 4, 5]); // TWENTY
    addWord(4, [0, 1, 2, 3]); // PAST
  } else if (roundedMins === 25) {
    addWord(2, [0, 1, 2, 3, 4, 5]); // TWENTY
    addWord(2, [7, 8, 9, 10]); // FIVE
    addWord(4, [0, 1, 2, 3]); // PAST
  } else if (roundedMins === 30) {
    addWord(3, [0, 1, 2, 3]); // HALF
    addWord(4, [0, 1, 2, 3]); // PAST
  } else if (roundedMins === 35) {
    addWord(2, [0, 1, 2, 3, 4, 5]); // TWENTY
    addWord(2, [7, 8, 9, 10]); // FIVE
    addWord(3, [10, 11]); // TO
  } else if (roundedMins === 40) {
    addWord(2, [0, 1, 2, 3, 4, 5]); // TWENTY
    addWord(3, [10, 11]); // TO
  } else if (roundedMins === 45) {
    addWord(1, [0]); // A
    addWord(1, [2, 3, 4, 5, 6, 7, 8]); // QUARTER
    addWord(3, [10, 11]); // TO
  } else if (roundedMins === 50) {
    addWord(3, [6, 7, 8]); // TEN
    addWord(3, [10, 11]); // TO
  } else if (roundedMins === 55) {
    addWord(2, [7, 8, 9, 10]); // FIVE
    addWord(3, [10, 11]); // TO
  }

  // 5. Highlight hour phrase
  switch (targetHour) {
    case 1:
      addWord(5, [0, 1, 2]); // ONE
      break;
    case 2:
      addWord(6, [9, 10, 11]); // TWO
      break;
    case 3:
      addWord(5, [7, 8, 9, 10, 11]); // THREE
      break;
    case 4:
      addWord(6, [0, 1, 2, 3]); // FOUR
      break;
    case 5:
      addWord(6, [5, 6, 7, 8]); // FIVE
      break;
    case 6:
      addWord(5, [3, 4, 5]); // SIX
      break;
    case 7:
      addWord(8, [0, 1, 2, 3, 4]); // SEVEN
      break;
    case 8:
      addWord(7, [0, 1, 2, 3, 4]); // EIGHT
      break;
    case 9:
      addWord(4, [8, 9, 10, 11]); // NINE
      break;
    case 10:
      addWord(9, [0, 1, 2]); // TEN
      break;
    case 11:
      addWord(7, [6, 7, 8, 9, 10, 11]); // ELEVEN
      break;
    case 12:
      addWord(8, [6, 7, 8, 9, 10, 11]); // TWELVE
      break;
  }

  return coords;
}

export default function WordClock() {
  const [time, setTime] = useState<Date | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setMounted(true);
      setTime(new Date());
    }, 0);

    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearTimeout(timerId);
      clearInterval(intervalId);
    };
  }, []);

  const activeCoords = useMemo(() => {
    if (!time) return new Set<string>();
    return getHighlightedCoords(time);
  }, [time]);

  const timezoneName = useMemo(() => {
    if (!mounted) return "";
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch {
      return "Local Timezone";
    }
  }, [mounted]);

  const formattedDigital = useMemo(() => {
    if (!time) return "";
    return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  }, [time]);

  return (
    <div className="flex flex-col items-center gap-3.5 p-4 sm:p-5 rounded-xl border border-border bg-gradient-to-br from-[#2E54FE]/[0.01] to-[#cbd5e1]/[0.01] backdrop-blur-md shadow-lg relative overflow-hidden max-w-[280px] mx-auto w-full select-none">
      {/* Absolute Ambient Background Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#2E54FE]/5 rounded-full filter blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#2E54FE]/3 rounded-full filter blur-2xl pointer-events-none" />

      {/* Title */}
      <div className="flex items-center justify-between w-full border-b border-border pb-2">
        <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#2E54FE]">Time Zone Clock</span>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-[pulse_1.5s_infinite]" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-12 gap-y-1 md:gap-y-1.5 gap-x-1 text-center font-bold tracking-widest text-[11px] sm:text-xs font-mono leading-none">
        {GRID.map((row, rIdx) =>
          row.map((char, cIdx) => {
            const isLit = activeCoords.has(`${rIdx}-${cIdx}`);
            const isDot = char === "•";

            return (
              <div
                key={`${rIdx}-${cIdx}`}
                className={`w-5 h-5 flex items-center justify-center transition-all duration-300 ${
                  isLit
                    ? "text-[#2E54FE] font-black drop-shadow-[0_0_8px_rgba(46,84,254,0.9)] scale-[1.05]"
                    : isDot
                    ? "text-foreground/5 font-light scale-75"
                    : "text-foreground/10 font-normal hover:text-foreground/20"
                }`}
              >
                {char === "O'" ? (
                  <span className="relative">
                    O
                    <span className={`absolute -right-1.5 -top-1.5 text-[9px] font-sans font-normal ${isLit ? "text-[#2E54FE]" : "text-foreground/15"}`}>
                    &apos;
                    </span>
                  </span>
                ) : (
                  char
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Footer Readouts (No top border/dividers for portrait grouping) */}
      <div className="flex flex-col items-center gap-1.5 mt-2.5 w-full text-center">
        <span className="text-[9px] font-mono font-bold text-foreground/45 tracking-widest uppercase truncate max-w-full">
          {timezoneName}
        </span>
        <span className="text-xs font-mono font-bold text-foreground/70 bg-white dark:bg-transparent border border-border px-3 py-1 rounded-md tracking-wider">
          {formattedDigital || "00:00:00"}
        </span>
      </div>
    </div>
  );
}
