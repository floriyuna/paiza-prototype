"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CodeBlock from "./CodeBlock";
import type { TraceStep } from "@/lib/types";

/** コードを1ステップずつ実行して、変数の値の変化を見せる */
export default function TraceView({ code, steps }: { code: string[]; steps: TraceStep[] }) {
  const [idx, setIdx] = useState(0);
  const step = steps[idx];
  const prev = idx > 0 ? steps[idx - 1].vars : {};

  return (
    <section aria-label="実行のようす" className="grid gap-4 md:grid-cols-2">
      <CodeBlock lines={code} highlight={step.line} tone="run" />

      <div className="flex flex-col gap-3">
        <div className="rounded-card border border-paiza-line bg-white p-4 shadow-card">
          <p className="mb-2 text-xs font-bold text-paiza-sub">いまの変数の中身</p>
          <ul className="flex flex-wrap gap-3">
            {Object.entries(step.vars).map(([name, value]) => {
              const changed = prev[name] !== value;
              return (
                <li key={name} className="text-center">
                  <span className="mb-1 block font-mono text-xs font-bold text-paiza-sub">{name}</span>
                  <span
                    key={`${idx}-${value}`}
                    className={`flex h-14 min-w-14 items-center justify-center rounded-lg border-2 px-3 font-mono text-xl font-black ${
                      changed ? "anim-value-pop border-paiza-orange bg-amber-50" : "border-paiza-line bg-paiza-bg"
                    }`}
                  >
                    {value}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <p className="rounded-card bg-paiza-blue-soft p-3 text-sm leading-relaxed" aria-live="polite">
          <span className="mr-1 font-bold text-paiza-blue-dark">
            ステップ {idx + 1}/{steps.length}：
          </span>
          {step.note}
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIdx((i) => Math.max(0, i - 1))}
            disabled={idx === 0}
            className="inline-flex items-center gap-1 rounded border border-paiza-line bg-white px-3 py-2 text-sm font-bold hover:bg-paiza-bg disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden />
            前へ
          </button>
          <button
            type="button"
            onClick={() => setIdx((i) => Math.min(steps.length - 1, i + 1))}
            disabled={idx === steps.length - 1}
            className="inline-flex items-center gap-1 rounded bg-paiza-blue px-4 py-2 text-sm font-bold text-white hover:bg-paiza-blue-dark disabled:opacity-40"
          >
            次のステップ
            <ChevronRight className="h-4 w-4" aria-hidden />
          </button>
          <ol className="ml-auto flex gap-1" aria-hidden>
            {steps.map((_, i) => (
              <li key={i} className={`h-2 w-2 rounded-full ${i === idx ? "bg-paiza-blue" : "bg-paiza-line"}`} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
