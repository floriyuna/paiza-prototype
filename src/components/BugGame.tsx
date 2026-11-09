"use client";

import { useState } from "react";
import { ArrowRight, Bug, Eye, Lightbulb, PartyPopper, Play, RotateCcw } from "lucide-react";
import CodeBlock from "./CodeBlock";
import GameStage from "./GameStage";
import Mascot from "./Mascot";
import type { BugQuestion } from "@/lib/types";

interface Props {
  question: BugQuestion;
  onAttempt: (correct: boolean) => void;
  onFinish: () => void;
}

export default function BugGame({ question: q, onAttempt, onFinish }: Props) {
  const [step, setStep] = useState<"predict" | "fix">(q.predict ? "predict" : "fix");
  const [predictPick, setPredictPick] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [playKey, setPlayKey] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const selected = q.options.find((o) => o.id === selectedId) ?? null;
  const solved = selected?.correct === true;

  // コード表示：選んだ修正を反映する
  const codeLines = q.code.map((line, i) => (i === q.fixIndex && selected ? selected.line : line));
  const tone = selected ? (selected.correct ? "fixed" : "bug") : "bug";

  const predictAnswered = predictPick !== null;
  const predictUnanswered = step === "predict" && !predictAnswered;

  const sim = selected ? selected.sim : q.buggySim;
  const result = selected
    ? { ok: selected.correct, text: selected.message }
    : { ok: false, text: q.buggyMessage };

  const choose = (id: string) => {
    if (solved) return;
    const opt = q.options.find((o) => o.id === id);
    if (!opt) return;
    setSelectedId(id);
    setPlayKey((k) => k + 1);
    onAttempt(opt.correct);
    if (!opt.correct) setWrongCount((n) => n + 1);
  };

  return (
    <article className="space-y-4" aria-labelledby="bug-title">
      <header className="rounded-card border-l-4 border-paiza-pink bg-white p-4 shadow-card">
        <p className="mb-1 flex items-center gap-1.5 text-xs font-black text-paiza-pink">
          <Bug className="h-4 w-4" aria-hidden />
          バグ修正パズル
        </p>
        <h2 id="bug-title" className="text-lg font-black md:text-xl">
          {q.title}
        </h2>
        <p className="mt-1 text-sm text-paiza-sub">{q.story}</p>
      </header>

      <div className="flex items-start gap-3 rounded-card bg-paiza-orange/15 p-3">
        <Mascot mood={solved ? "happy" : "sad"} className="shrink-0" />
        <div>
          <p className="font-black text-paiza-orange-dark">このバグを直して！</p>
          <p className="text-sm">{q.instruction}</p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* 左：ゲーム画面 */}
        <section aria-label="ゲーム画面" className="space-y-2">
          {predictUnanswered ? (
            <div className="flex h-56 flex-col items-center justify-center gap-2 rounded-card border border-dashed border-paiza-line bg-white text-center md:h-64">
              <Mascot />
              <p className="text-sm font-bold">先に結果を予想してみよう</p>
              <p className="px-6 text-xs text-paiza-sub">答えたあとに、ゲームを動かして確かめられるよ。</p>
            </div>
          ) : (
            <GameStage key={`${selectedId ?? "bug"}-${playKey}-${step}`} sim={sim} result={result} />
          )}

          {!predictUnanswered && (
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setPlayKey((k) => k + 1)}
                className="inline-flex items-center gap-1.5 rounded border border-paiza-line bg-white px-3 py-1.5 text-sm font-bold hover:bg-paiza-bg"
              >
                <RotateCcw className="h-4 w-4" aria-hidden />
                もう一度動かす
              </button>
              {selected && !solved && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedId(null);
                    setPlayKey((k) => k + 1);
                  }}
                  className="inline-flex items-center gap-1.5 rounded border border-paiza-line bg-white px-3 py-1.5 text-sm font-bold hover:bg-paiza-bg"
                >
                  <Eye className="h-4 w-4" aria-hidden />
                  もとのバグを見る
                </button>
              )}
            </div>
          )}
        </section>

        {/* 右：コードと操作 */}
        <section aria-label="コードと修正方法" className="space-y-3">
          <CodeBlock lines={codeLines} highlight={q.fixIndex} tone={tone} />

          {step === "predict" && q.predict && (
            <div className="rounded-card border border-paiza-line bg-white p-4 shadow-card">
              <p className="mb-1 text-xs font-black text-paiza-blue">ステップ1：結果を予想しよう</p>
              <p className="mb-3 font-bold">{q.predict.prompt}</p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4" role="group" aria-label="予想の選択肢">
                {q.predict.options.map((o) => {
                  const picked = predictPick === o.id;
                  const isCorrect = o.id === q.predict!.correctId;
                  return (
                    <button
                      key={o.id}
                      type="button"
                      disabled={predictAnswered}
                      onClick={() => setPredictPick(o.id)}
                      aria-pressed={picked}
                      className={`rounded-lg border-2 px-3 py-3 font-mono text-lg font-black transition ${
                        predictAnswered
                          ? isCorrect
                            ? "border-emerald-500 bg-emerald-50"
                            : picked
                              ? "border-red-400 bg-red-50"
                              : "border-paiza-line opacity-50"
                          : "border-paiza-line bg-white hover:border-paiza-blue hover:bg-paiza-blue-soft"
                      }`}
                    >
                      {o.label}
                    </button>
                  );
                })}
              </div>
              {predictAnswered && (
                <div className="anim-banner-in mt-3 space-y-3">
                  <p className="rounded bg-paiza-bg p-3 text-sm leading-relaxed">
                    {predictPick === q.predict.correctId ? q.predict.feedbackCorrect : q.predict.feedbackWrong}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setStep("fix");
                      setPlayKey((k) => k + 1);
                    }}
                    className="inline-flex items-center gap-2 rounded-full bg-paiza-orange px-5 py-2.5 font-black text-paiza-ink hover:bg-paiza-orange-dark"
                  >
                    バグを直しに行く
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </button>
                </div>
              )}
            </div>
          )}

          {step === "fix" && (
            <div className="rounded-card border border-paiza-line bg-white p-4 shadow-card">
              <p className="mb-1 text-xs font-black text-paiza-blue">
                {q.predict ? "ステップ2：" : ""}どう直す？ 選ぶとゲームが動くよ
              </p>
              <ul className="space-y-2" role="group" aria-label="修正方法の選択肢">
                {q.options.map((o) => {
                  const isSel = selectedId === o.id;
                  return (
                    <li key={o.id}>
                      <button
                        type="button"
                        onClick={() => choose(o.id)}
                        disabled={solved && !isSel}
                        aria-pressed={isSel}
                        className={`w-full rounded-lg border-2 px-3 py-3 text-left font-mono text-sm transition ${
                          isSel
                            ? o.correct
                              ? "border-emerald-500 bg-emerald-50"
                              : "border-red-400 bg-red-50"
                            : "border-paiza-line bg-white hover:border-paiza-blue hover:bg-paiza-blue-soft"
                        } disabled:opacity-40`}
                      >
                        <code className="whitespace-pre-wrap break-all">{o.line.trim()}</code>
                      </button>
                    </li>
                  );
                })}
              </ul>

              {!solved && (
                <div className="mt-3">
                  {showHint ? (
                    <p className="anim-banner-in flex gap-2 rounded bg-amber-50 p-3 text-sm">
                      <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" aria-hidden />
                      {q.hint}
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setShowHint(true)}
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-paiza-blue-dark underline-offset-2 hover:underline"
                    >
                      <Lightbulb className="h-4 w-4" aria-hidden />
                      {wrongCount > 0 ? "ヒントを見る" : "困ったらヒント"}
                    </button>
                  )}
                  {wrongCount > 0 && (
                    <p className="mt-2 text-xs text-paiza-sub">何度でもやり直せるよ。ほかの選択肢も試してみよう！</p>
                  )}
                </div>
              )}
            </div>
          )}

          {solved && (
            <div className="anim-banner-in rounded-card border-2 border-emerald-400 bg-emerald-50 p-4 text-center">
              <p className="flex items-center justify-center gap-2 text-lg font-black text-emerald-700">
                <PartyPopper className="h-5 w-5" aria-hidden />
                バグを直せた！
              </p>
              <p className="mt-1 text-sm text-emerald-800">どうしてバグが起きたのか、いっしょに見てみよう。</p>
              <button
                type="button"
                onClick={onFinish}
                className="anim-cta-pulse mt-3 inline-flex items-center gap-2 rounded-full bg-paiza-orange px-6 py-3 font-black text-paiza-ink hover:bg-paiza-orange-dark"
              >
                <Play className="h-4 w-4" aria-hidden />
                なぜ直ったのか見る
              </button>
            </div>
          )}
        </section>
      </div>
    </article>
  );
}
