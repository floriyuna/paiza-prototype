"use client";

import { LEVEL_HINT, LEVEL_LABEL } from "@/lib/level";
import { LEVEL_ORDER } from "@/lib/questions";
import type { Level } from "@/lib/types";

export default function LevelSwitcher({ level, onChange }: { level: Level; onChange: (l: Level) => void }) {
  return (
    <fieldset className="min-w-0">
      <legend className="mb-1 text-xs font-bold text-slate-500">
        難易度レベル切り替え
      </legend>
      <div
        className="inline-flex rounded-xl border border-slate-300 bg-slate-100 p-1 shadow-xs"
        role="radiogroup"
      >
        {LEVEL_ORDER.map((l) => {
          const active = l === level;
          return (
            <button
              key={l}
              type="button"
              role="radio"
              aria-checked={active}
              title={LEVEL_HINT[l]}
              onClick={() => onChange(l)}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all ${
                active
                  ? "bg-[#00A3DA] text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
              }`}
            >
              {LEVEL_LABEL[l]}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
