"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles, HelpCircle } from "lucide-react";
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
    window.setTimeout(() => {
      const next = [...scores.slice(0, step), score];
      if (step + 1 < SURVEY.length) {
        setScores(next);
        setStep(step + 1);
        setPicked(null);
      } else {
        start(judgeLevel(next[0], next[1]));
      }
    }, 240);
  };

  return (
    <div className="min-h-screen bg-[#F4F7F9] py-8 md:py-14">
      <div className="mx-auto max-w-2xl px-4">
        {/* ナビゲーターメッセージ */}
        <div className="mb-6 flex items-start gap-4 rounded-2xl bg-white p-4 border border-slate-200/90 shadow-sm">
          <Mascot mood="happy" size="md" />
          <div className="flex-1 text-xs md:text-sm">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-bold text-[#00A3DA]">paizaラーニング ナビゲーター</span>
              <span className="rounded-full bg-[#E6F6FC] px-2 py-0.5 text-[10px] font-bold text-[#00A3DA]">
                質問 {step + 1} / {SURVEY.length}
              </span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              「あなたにぴったりのレベルから体験をスタートできるよう、簡単な2つの質問をさせてくださいね！」
            </p>
          </div>
        </div>

        {/* プログレスバー */}
        <div className="mb-8">
          <div className="flex justify-between text-xs font-bold text-slate-500 mb-1.5">
            <span>経験アンケート</span>
            <span>STEP {step + 1} / {SURVEY.length}</span>
          </div>
          <div
            className="h-2 overflow-hidden rounded-full bg-slate-200"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={SURVEY.length}
            aria-valuenow={step + 1}
            aria-label="質問の進捗"
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#00A3DA] to-[#FF8800] transition-all duration-300"
              style={{ width: `${((step + 1) / SURVEY.length) * 100}%` }}
            />
          </div>
        </div>

        {/* 質問カード */}
        <section
          key={q.id}
          aria-labelledby="survey-q"
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
        >
          <div className="mb-2 flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#00A3DA] text-xs font-black text-white">
              Q{step + 1}
            </span>
            <span className="text-xs font-bold text-[#00A3DA] uppercase tracking-wider">
              Question {step + 1}
            </span>
          </div>

          <h1 id="survey-q" className="mb-6 text-lg font-black text-slate-900 md:text-xl">
            {q.title}
          </h1>

          <ul className="space-y-3">
            {q.options.map((o, i) => {
              const isSelected = picked === i;
              return (
                <li key={o.label}>
                  <button
                    type="button"
                    onClick={() => answer(i, o.score)}
                    disabled={picked !== null}
                    aria-pressed={isSelected}
                    className={`group flex w-full items-center justify-between rounded-xl border-2 p-4 text-left font-bold transition-all ${
                      isSelected
                        ? "border-[#00A3DA] bg-[#E6F6FC] text-[#00A3DA] shadow-sm"
                        : "border-slate-200 bg-white text-slate-800 hover:border-[#00A3DA]/60 hover:bg-slate-50"
                    }`}
                  >
                    <span className="text-sm md:text-base leading-relaxed pr-3">{o.label}</span>
                    <div
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition ${
                        isSelected
                          ? "border-[#00A3DA] bg-[#00A3DA] text-white"
                          : "border-slate-300 group-hover:border-[#00A3DA]"
                      }`}
                    >
                      {isSelected && <CheckCircle2 className="h-4 w-4" />}
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        {/* 戻る・スキップ導線 */}
        <div className="mt-6 flex items-center justify-between text-xs">
          {step > 0 ? (
            <button
              type="button"
              onClick={() => {
                setStep(step - 1);
                setPicked(null);
              }}
              className="inline-flex items-center gap-1 font-bold text-slate-500 hover:text-slate-800 transition"
            >
              <ArrowLeft className="h-4 w-4" />
              前の質問に戻る
            </button>
          ) : (
            <span />
          )}

          <button
            type="button"
            onClick={() => start("beginner")}
            className="inline-flex items-center gap-1 text-slate-400 hover:text-[#00A3DA] transition underline"
          >
            スキップして初心者向けから始める
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
