"use client";

import { LEVEL_HINT, LEVEL_LABEL } from "@/lib/level";
import { LEVEL_ORDER } from "@/lib/questions";
import type { Level } from "@/lib/types";

export default function LevelSwitcher({ level, onChange }: { level: Level; onChange: (l: Level) => void }) {
  return (
    <fieldset className="min-w-0">
      <legend className="mb-1 text-xs font-bold text-paiza-sub">
        あなたのレベル（あとから自由に変えられます）
      </legend>
      <div className="inline-flex overflow-hidden rounded-full border border-paiza-line bg-white" role="radiogroup">
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
              className={`px-4 py-2 text-sm font-bold transition ${
                active ? "bg-paiza-blue text-white" : "text-paiza-ink hover:bg-paiza-blue-soft"
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
