"use client";

import { useState } from "react";
import { ArrowRight, Brain, CircleCheck, CircleX } from "lucide-react";
import CodeBlock from "./CodeBlock";
import type { QuizQuestion } from "@/lib/types";

interface Props {
  question: QuizQuestion;
  onAttempt: (correct: boolean) => void;
  onFinish: () => void;
}

export default function CodeQuiz({ question: q, onAttempt, onFinish }: Props) {
  const [wrongIds, setWrongIds] = useState<string[]>([]);
  const [solved, setSolved] = useState(false);
  const [pickedId, setPickedId] = useState<string | null>(null);

  const choose = (id: string) => {
    if (solved || wrongIds.includes(id)) return;
    const ok = id === q.correctId;
    setPickedId(id);
    onAttempt(ok);
    if (ok) setSolved(true);
    else setWrongIds((w) => [...w, id]);
  };

  return (
    <article className="space-y-4" aria-labelledby="quiz-title">
      <header className="rounded-card border-l-4 border-paiza-blue bg-white p-4 shadow-card">
        <p className="mb-1 flex items-center gap-1.5 text-xs font-black text-paiza-blue">
          <Brain className="h-4 w-4" aria-hidden />
          結果予想クイズ
        </p>
        <h2 id="quiz-title" className="text-lg font-black md:text-xl">
          {q.title}
        </h2>
        <p className="mt-1 text-sm text-paiza-sub">{q.prompt}</p>
      </header>

      <div className="grid gap-4 lg:grid-cols-2">
        <CodeBlock lines={q.code} tone="run" />

        <section aria-label="答えの選択肢" className="rounded-card border border-paiza-line bg-white p-4 shadow-card">
          <p className="mb-3 text-xs font-black text-paiza-blue">画面に表示されるのはどれ？ タップして答えよう</p>
          <ul className="grid grid-cols-2 gap-2">
            {q.options.map((o) => {
              const wrong = wrongIds.includes(o.id);
              const right = solved && o.id === q.correctId;
              return (
                <li key={o.id}>
                  <button
                    type="button"
                    onClick={() => choose(o.id)}
                    disabled={wrong || solved}
                    aria-pressed={pickedId === o.id}
                    className={`flex w-full items-center justify-center gap-2 rounded-lg border-2 px-3 py-4 font-mono text-xl font-black transition ${
                      right
                        ? "border-emerald-500 bg-emerald-50"
                        : wrong
                          ? "border-red-300 bg-red-50 text-red-400 line-through"
                          : "border-paiza-line bg-white hover:border-paiza-blue hover:bg-paiza-blue-soft"
                    } ${solved && !right ? "opacity-40" : ""}`}
                  >
                    {right && <CircleCheck className="h-5 w-5 text-emerald-600" aria-hidden />}
                    {wrong && <CircleX className="h-5 w-5" aria-hidden />}
                    {o.label}
                  </button>
                </li>
              );
            })}
          </ul>

          {!solved && wrongIds.length > 0 && (
            <p role="status" className="anim-banner-in mt-3 rounded bg-red-50 p-3 text-sm font-bold text-red-700">
              おしい！ もう一度考えてみよう。何度でも挑戦できるよ。
            </p>
          )}

          {solved && (
            <div role="status" className="anim-banner-in mt-3 space-y-3">
              <p className="flex items-center gap-2 rounded bg-emerald-50 p-3 font-black text-emerald-700">
                <CircleCheck className="h-5 w-5" aria-hidden />
                正解！
              </p>
              <div className="rounded bg-[#1e2a33] p-3 font-mono text-sm text-slate-100">
                <span className="text-slate-400">実際の実行結果 ▶ </span>
                <span className="font-black text-emerald-300">{q.output}</span>
              </div>
              <button
                type="button"
                onClick={onFinish}
                className="anim-cta-pulse inline-flex w-full items-center justify-center gap-2 rounded-full bg-paiza-orange px-6 py-3 font-black text-paiza-ink hover:bg-paiza-orange-dark"
              >
                変数の動きを見る
                <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
            </div>
          )}
        </section>
      </div>
    </article>
  );
}
