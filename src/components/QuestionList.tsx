"use client";

import { Bug, Brain, CircleCheck } from "lucide-react";
import { LEVEL_LABEL } from "@/lib/level";
import { QUESTION_SEQUENCE } from "@/lib/questions";
import type { Question } from "@/lib/types";

interface Props {
  currentId: string;
  clearedIds: string[];
  onSelect: (q: Question) => void;
}

/** 「ほかの問題」一覧。ゲーム・クイズ・レベルを自由に選べる */
export default function QuestionList({ currentId, clearedIds, onSelect }: Props) {
  return (
    <nav aria-label="問題一覧" className="rounded-card bg-white p-4 shadow-card">
      <h2 className="mb-1 text-sm font-black">問題いちらん</h2>
      <p className="mb-3 text-xs text-paiza-sub">好きな問題を、好きな順番で遊べます。</p>
      <ul className="space-y-1.5">
        {QUESTION_SEQUENCE.map((q) => {
          const cleared = clearedIds.includes(q.id);
          const current = q.id === currentId;
          return (
            <li key={q.id}>
              <button
                type="button"
                onClick={() => onSelect(q)}
                aria-current={current ? "true" : undefined}
                className={`flex w-full items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm transition ${
                  current ? "border-paiza-blue bg-paiza-blue-soft" : "border-paiza-line hover:bg-paiza-bg"
                }`}
              >
                {q.kind === "bug" ? (
                  <Bug className="h-4 w-4 shrink-0 text-paiza-pink" aria-hidden />
                ) : (
                  <Brain className="h-4 w-4 shrink-0 text-paiza-blue" aria-hidden />
                )}
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-bold">{q.title}</span>
                  <span className="text-[11px] text-paiza-sub">
                    {LEVEL_LABEL[q.level]}・{q.kind === "bug" ? "バグ修正" : "結果予想"}
                  </span>
                </span>
                {cleared && <CircleCheck className="h-4 w-4 shrink-0 text-paiza-ok" aria-label="クリア済み" />}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
