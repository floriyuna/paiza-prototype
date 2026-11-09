"use client";

import { Bug, Brain, CheckCircle2, ChevronRight, ListOrdered } from "lucide-react";
import { LEVEL_LABEL } from "@/lib/level";
import { QUESTION_SEQUENCE } from "@/lib/questions";
import type { Question } from "@/lib/types";

interface Props {
  currentId: string;
  clearedIds: string[];
  onSelect: (q: Question) => void;
}

/** paizaラーニングのサイドバー「演習課題・レッスン一覧」 */
export default function QuestionList({ currentId, clearedIds, onSelect }: Props) {
  const clearedCount = clearedIds.length;
  const totalCount = QUESTION_SEQUENCE.length;

  return (
    <nav aria-label="問題一覧" className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
          <ListOrdered className="h-4 w-4 text-[#00A3DA]" />
          体験レッスン一覧
        </h2>
        <span className="text-[11px] font-bold text-slate-500">
          進捗: {clearedCount}/{totalCount}
        </span>
      </div>
      <p className="mb-3 text-[11px] text-slate-500 leading-relaxed">
        好きな問題をタップして切り替えられます。
      </p>

      {/* 進捗プログレスバー */}
      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden mb-3">
        <div
          className="h-full bg-emerald-500 rounded-full transition-all duration-300"
          style={{ width: `${(clearedCount / totalCount) * 100}%` }}
        />
      </div>

      <ul className="space-y-1.5">
        {QUESTION_SEQUENCE.map((q, idx) => {
          const cleared = clearedIds.includes(q.id);
          const current = q.id === currentId;
          const isBug = q.kind === "bug";

          return (
            <li key={q.id}>
              <button
                type="button"
                onClick={() => onSelect(q)}
                aria-current={current ? "true" : undefined}
                className={`flex w-full items-center gap-2 rounded-xl border p-2.5 text-left text-xs transition-all ${current
                    ? "border-[#00A3DA] bg-[#E6F6FC] shadow-xs"
                    : "border-slate-200 bg-white hover:border-[#00A3DA]/50 hover:bg-slate-50"
                  }`}
              >
                <div
                  className={`h-7 w-7 rounded-lg flex items-center justify-center shrink-0 ${isBug
                      ? "bg-rose-50 text-rose-500 border border-rose-200"
                      : "bg-sky-50 text-[#00A3DA] border border-sky-200"
                    }`}
                >
                  {isBug ? <Bug className="h-3.5 w-3.5" /> : <Brain className="h-3.5 w-3.5" />}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono text-slate-400">#{idx + 1}</span>
                    <span className="truncate font-bold text-slate-800">{q.title}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-0.5">
                    <span className="font-medium text-[#00A3DA]">{LEVEL_LABEL[q.level]}</span>
                    <span>・</span>
                    <span>{isBug ? "バグ修正" : "結果予想"}</span>
                  </div>
                </div>

                {cleared ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" aria-label="クリア済み" />
                ) : (
                  <ChevronRight className="h-3.5 w-3.5 shrink-0 text-slate-300" />
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
