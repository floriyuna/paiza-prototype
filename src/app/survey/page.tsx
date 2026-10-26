"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Mascot from "@/components/Mascot";
import { judgeLevel, SURVEY } from "@/lib/level";
import { updateGuest } from "@/lib/storage";

export default function SurveyPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [picked, setPicked] = useState<number | null>(null);

  const q = SURVEY[step];

  const start = (level: "beginner" | "intermediate" | "advanced") => {
    updateGuest((prev) => ({ ...prev, level, surveyDone: true }));
    router.push("/learn?type=bug");
  };

  const answer = (index: number, score: number) => {
    setPicked(index);
    // 選択したことが見えるよう、少しだけ待ってから次へ進む
    window.setTimeout(() => {
      const next = [...scores.slice(0, step), score];
      if (step + 1 < SURVEY.length) {
        setScores(next);
        setStep(step + 1);
        setPicked(null);
      } else {
        start(judgeLevel(next[0], next[1]));
      }
    }, 220);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 md:py-12">
      <div className="mb-6 flex items-center gap-3">
        <Mascot mood="happy" />
        <div>
          <p className="text-sm font-black text-paiza-blue">かんたんな質問（{step + 1} / {SURVEY.length}）</p>
          <p className="text-xs text-paiza-sub">あなたに合った問題を選ぶための質問です。正解はありません。</p>
        </div>
      </div>

      <div
        className="mb-6 h-2 overflow-hidden rounded-full bg-paiza-line"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={SURVEY.length}
        aria-valuenow={step}
        aria-label="質問の進み具合"
      >
        <div
          className="h-full rounded-full bg-paiza-blue transition-all duration-300"
          style={{ width: `${(step / SURVEY.length) * 100 + 8}%` }}
        />
      </div>

      <section key={q.id} aria-labelledby="survey-q" className="anim-banner-in">
        <h1 id="survey-q" className="mb-5 text-xl font-black md:text-2xl">
          Q{step + 1}. {q.title}
        </h1>
        <ul className="grid gap-3 sm:grid-cols-2">
          {q.options.map((o, i) => (
            <li key={o.label}>
              <button
                type="button"
                onClick={() => answer(i, o.score)}
                disabled={picked !== null}
                aria-pressed={picked === i}
                className={`flex h-full min-h-[84px] w-full items-center rounded-card border-2 bg-white p-4 text-left font-bold shadow-card transition hover:-translate-y-0.5 hover:border-paiza-blue hover:shadow-pop ${
                  picked === i ? "border-paiza-blue bg-paiza-blue-soft" : "border-paiza-line"
                }`}
              >
                {o.label}
              </button>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-8 flex items-center justify-between text-sm">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => {
              setStep(step - 1);
              setPicked(null);
            }}
            className="inline-flex items-center gap-1 font-bold text-paiza-sub hover:text-paiza-ink"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            前の質問にもどる
          </button>
        ) : (
          <span />
        )}
        <button
          type="button"
          onClick={() => start("beginner")}
          className="inline-flex items-center gap-1 font-bold text-paiza-blue-dark underline-offset-2 hover:underline"
        >
          質問をとばして初心者からはじめる
          <ArrowRight className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </div>
  );
}
