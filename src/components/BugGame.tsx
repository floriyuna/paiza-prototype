"use client";

import { useState } from "react";
import {
  ArrowRight,
  Bug,
  CheckCircle2,
  CircleAlert,
  CircleCheck,
  Eye,
  HelpCircle,
  Lightbulb,
  Play,
  RotateCcw,
  Sparkles,
  Terminal,
} from "lucide-react";
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

  // 選択中の修正案ID
  const [selectedId, setSelectedId] = useState<string | null>(null);
  // コードを実行したかどうか（paiza特有の「実行して確認」フロー）
  const [hasExecuted, setHasExecuted] = useState(false);
  const [executing, setExecuting] = useState(false);

  const [playKey, setPlayKey] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    "# paiza Learning Python 3.10 Runtime ready.",
    "# バグ原因を特定し、コードを修正して「コードを実行」してください。",
  ]);

  const selected = q.options.find((o) => o.id === selectedId) ?? null;
  const solved = hasExecuted && selected?.correct === true;

  // エディタに表示するコード：選んだ修正案を反映
  const codeLines = q.code.map((line, i) => (i === q.fixIndex && selected ? selected.line : line));
  const tone = hasExecuted ? (selected?.correct ? "fixed" : "bug") : "run";

  const predictAnswered = predictPick !== null;
  const predictUnanswered = step === "predict" && !predictAnswered;

  // シミュレーションと結果
  const sim = hasExecuted ? (selected ? selected.sim : q.buggySim) : q.buggySim;
  const result = hasExecuted
    ? selected
      ? { ok: selected.correct, text: selected.message }
      : { ok: false, text: q.buggyMessage }
    : undefined;

  // 選択肢を選んだとき
  const handleSelectOption = (id: string) => {
    if (solved) return;
    setSelectedId(id);
    setHasExecuted(false); // 選択後は「コードを実行」を押すまで未実行状態
    const opt = q.options.find((o) => o.id === id);
    if (opt) {
      setConsoleLogs([
        `# コードが更新されました: ${opt.line}`,
        "# 「▶ コードを実行して確認」を押して動作をテストしてください。",
      ]);
    }
  };

  // paizaの象徴：「コードを実行して確認」ボタンを押したとき
  const handleRunCode = () => {
    if (!selectedId) {
      // 選択肢を選ばずに実行した場合は初期バグ状態を実行
      setExecuting(true);
      setTimeout(() => {
        setExecuting(false);
        setHasExecuted(true);
        setPlayKey((k) => k + 1);
        setConsoleLogs([
          `$ python3 Main.py`,
          `[FAIL] ${q.buggyMessage}`,
          `# バグが残っています。選択肢から修正するコードを選んでください。`,
        ]);
      }, 300);
      return;
    }

    const opt = q.options.find((o) => o.id === selectedId);
    if (!opt) return;

    setExecuting(true);
    setTimeout(() => {
      setExecuting(false);
      setHasExecuted(true);
      setPlayKey((k) => k + 1);
      onAttempt(opt.correct);

      if (opt.correct) {
        setConsoleLogs([
          `$ python3 Main.py`,
          `Output: OK`,
          `[SUCCESS] ${opt.message}`,
          `★ 正解です！ゲームが正常に動作しました。`,
        ]);
      } else {
        setWrongCount((n) => n + 1);
        setConsoleLogs([
          `$ python3 Main.py`,
          `Output: Warning`,
          `[FAIL] ${opt.message}`,
          `# 期待された動作と異なります。別のコードを試してみましょう。`,
        ]);
      }
    }, 350);
  };

  // リセット
  const handleResetToBug = () => {
    setSelectedId(null);
    setHasExecuted(true);
    setPlayKey((k) => k + 1);
    setConsoleLogs([
      `# 初期状態（バグありコード）に戻しました。`,
      `$ python3 Main.py`,
      `[FAIL] ${q.buggyMessage}`,
    ]);
  };

  return (
    <article className="space-y-4" aria-labelledby="bug-title">
      {/* 1. レッスンヘッダー（paizaラーニング学習画面風） */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1 rounded bg-[#E05397] px-2 py-0.5 text-[11px] font-black text-white">
              <Bug className="h-3 w-3" />
              バグ修正パズル
            </span>
            <span className="rounded bg-[#E6F6FC] px-2 py-0.5 text-[11px] font-bold text-[#00A3DA]">
              Python3 実践編
            </span>
          </div>
          <h1 id="bug-title" className="text-base sm:text-lg font-black text-slate-900">
            {q.title}
          </h1>
        </div>

        {solved && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onFinish}
              className="anim-cta-pulse inline-flex items-center gap-2 rounded-full bg-[#FF8800] hover:bg-[#e67a00] px-5 py-2.5 text-sm font-black text-white shadow-md shadow-orange-500/20 transition"
            >
              <span>解説・変数の動きを見る</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {/* 2. paizaラーニング 2ペイン構造（左：問題仕様・選択肢 / 右：プレビュー・IDE） */}
      <div className="grid gap-5 lg:grid-cols-12">
        {/* 左カラム (5/12)：問題仕様 ＆ ナビゲーター ＆ 選択肢 */}
        <section aria-label="問題仕様と修正選択肢" className="space-y-4 lg:col-span-5">
          {/* ナビゲーター霧島京子のセリフカード */}
          <div className="flex items-start gap-3 rounded-xl border border-sky-200 bg-gradient-to-br from-[#E6F6FC] to-white p-4 shadow-sm">
            <Mascot mood={solved ? "happy" : wrongCount > 0 ? "sad" : "normal"} size="md" />
            <div className="flex-1 text-xs md:text-sm">
              <p className="font-bold text-[#00A3DA] mb-0.5">paizaラーニング ナビゲーター</p>
              <p className="text-slate-700 leading-relaxed font-medium">
                {solved
                  ? "「すごい！バグをきれいに修正できましたね！ゲームが正しく動きました！」"
                  : wrongCount > 0
                    ? "「おしい！別の選択肢も試してみよう。何度でもコードを書き換えてテストできるよ！」"
                    : `「${q.instruction}」`}
              </p>
            </div>
          </div>

          {/* 問題文 & ストーリー */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm text-xs leading-relaxed">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <HelpCircle className="h-3.5 w-3.5 text-[#00A3DA]" />
              問題の状況
            </h2>
            <p className="text-slate-700 font-medium mb-3">{q.story}</p>

            <div className="rounded-lg bg-amber-50 p-2.5 border border-amber-200 text-amber-900 text-xs">
              <p className="font-bold flex items-center gap-1 text-amber-800">
                <Lightbulb className="h-3.5 w-3.5" />
                現在のバグ
              </p>
              <p className="mt-0.5">{q.buggyMessage}</p>
            </div>
          </div>

          {/* 予測ステップ（中級者・上級者） */}
          {step === "predict" && q.predict && (
            <div className="rounded-xl border-2 border-[#00A3DA] bg-white p-4 shadow-sm">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#00A3DA] mb-1">
                <Sparkles className="h-3.5 w-3.5" />
                ステップ1：実行結果を予測しよう
              </div>
              <p className="text-xs font-bold text-slate-800 mb-3">{q.predict.prompt}</p>

              <div className="grid grid-cols-2 gap-2" role="group" aria-label="予想の選択肢">
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
                      className={`rounded-lg border-2 p-2.5 text-xs font-mono font-bold transition ${
                        predictAnswered
                          ? isCorrect
                            ? "border-emerald-500 bg-emerald-50 text-emerald-800"
                            : picked
                              ? "border-rose-400 bg-rose-50 text-rose-800"
                              : "border-slate-200 opacity-50"
                          : "border-slate-200 bg-white hover:border-[#00A3DA] hover:bg-sky-50 text-slate-700"
                      }`}
                    >
                      {o.label}
                    </button>
                  );
                })}
              </div>

              {predictAnswered && (
                <div className="mt-3 space-y-2 anim-banner-in">
                  <p className="rounded bg-slate-100 p-2 text-xs text-slate-700 leading-relaxed">
                    {predictPick === q.predict.correctId
                      ? q.predict.feedbackCorrect
                      : q.predict.feedbackWrong}
                  </p>
                  <button
                    type="button"
                    onClick={() => setStep("fix")}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#00A3DA] px-4 py-2 text-xs font-bold text-white hover:bg-[#0085B3] transition"
                  >
                    <span>ステップ2：コード修正へ進む</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* 修正コードの選択肢（ステップ2） */}
          {(!q.predict || step === "fix") && (
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Bug className="h-3.5 w-3.5 text-[#FF8800]" />
                  修正するコードを選択
                </span>
                <span className="text-[10px] text-slate-400">タップしてエディタに反映</span>
              </div>

              <div className="space-y-2">
                {q.options.map((opt, idx) => {
                  const isSelected = selectedId === opt.id;
                  const isCorrect = hasExecuted && isSelected && opt.correct;
                  const isWrong = hasExecuted && isSelected && !opt.correct;

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleSelectOption(opt.id)}
                      disabled={solved}
                      aria-pressed={isSelected}
                      className={`w-full rounded-xl border-2 p-3 text-left transition-all ${
                        isSelected
                          ? isCorrect
                            ? "border-emerald-500 bg-emerald-50/80 shadow-sm"
                            : isWrong
                              ? "border-rose-400 bg-rose-50/80 shadow-sm"
                              : "border-[#00A3DA] bg-sky-50/80 shadow-sm"
                          : "border-slate-200 bg-white hover:border-[#00A3DA]/60 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] font-bold text-slate-500">
                          選択肢 {String.fromCharCode(65 + idx)}
                        </span>
                        {isSelected && !hasExecuted && (
                          <span className="rounded bg-[#00A3DA] px-2 py-0.5 text-[10px] font-bold text-white">
                            エディタに反映中
                          </span>
                        )}
                        {isCorrect && (
                          <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                            <CircleCheck className="h-3.5 w-3.5" /> 正解！
                          </span>
                        )}
                        {isWrong && (
                          <span className="flex items-center gap-1 text-[11px] font-bold text-rose-600">
                            <CircleAlert className="h-3.5 w-3.5" /> 不正解
                          </span>
                        )}
                      </div>

                      <div className="font-mono text-xs sm:text-sm font-bold text-slate-900 bg-slate-900 text-emerald-400 px-3 py-2 rounded-lg">
                        {opt.line}
                      </div>

                      {hasExecuted && isSelected && (
                        <p className="mt-1 text-[11px] font-medium text-slate-600">{opt.message}</p>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </section>

        {/* 右カラム (7/12)：ゲームプレビュー ＆ paizaオンラインエディタ ＆ 実行コンソール */}
        <section aria-label="ゲーム実行とエディタ" className="space-y-4 lg:col-span-7">
          {/* 1. ゲーム画面プレビュー */}
          <GameStage key={`stage-${playKey}-${selectedId ?? "bug"}`} sim={sim} result={result} />

          {/* 2. paiza オンラインコードエディタ */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500 px-1">
              <span className="font-bold flex items-center gap-1 text-slate-700">
                <Terminal className="h-3.5 w-3.5 text-[#00A3DA]" />
                オンラインコードエディタ
              </span>
              <span className="text-[11px]">修正対象: {q.fixIndex + 1}行目</span>
            </div>

            <CodeBlock lines={codeLines} highlight={q.fixIndex} tone={tone} fileName="Main.py" />
          </div>

          {/* 3. paiza定番の「コードを実行して確認」ボタンバー */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleRunCode}
                disabled={executing || solved}
                className={`inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-black text-white shadow-md transition-all active:scale-95 ${
                  solved
                    ? "bg-emerald-600 cursor-default"
                    : selectedId && !hasExecuted
                      ? "bg-gradient-to-r from-emerald-500 to-teal-600 hover:brightness-105 anim-cta-pulse ring-2 ring-emerald-400 ring-offset-2"
                      : "bg-emerald-600 hover:bg-emerald-700"
                }`}
              >
                <Play className="h-4 w-4 fill-current" />
                {executing ? "実行中..." : solved ? "✓ 実行成功！クリア" : "▶ コードを実行して確認"}
              </button>

              <button
                type="button"
                onClick={() => setPlayKey((k) => k + 1)}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 transition"
                title="ゲームアニメーションをもう一度再生"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                再再生
              </button>

              {selectedId && !solved && (
                <button
                  type="button"
                  onClick={handleResetToBug}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 transition"
                >
                  <Eye className="h-3.5 w-3.5" />
                  元のバグ
                </button>
              )}
            </div>

            {solved && (
              <button
                type="button"
                onClick={onFinish}
                className="anim-cta-pulse inline-flex items-center gap-1.5 rounded-full bg-[#FF8800] hover:bg-[#e67a00] px-5 py-2.5 text-xs font-black text-white shadow-md shadow-orange-500/20 transition"
              >
                <span>解説へ進む</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* 4. 実行結果（標準出力）コンソール */}
          <div className="overflow-hidden rounded-xl border border-slate-800 bg-[#0f172a] shadow-inner font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 bg-[#1e293b]/60 px-3 py-1.5 text-slate-400">
              <span className="flex items-center gap-1.5 text-[11px] font-bold text-slate-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                実行結果（標準出力 / Standard Output）
              </span>
              <span className="text-[10px] text-slate-500">Exit code: {solved ? 0 : hasExecuted ? 1 : 0}</span>
            </div>
            <div className="p-3 text-slate-300 space-y-1 max-h-32 overflow-y-auto leading-relaxed select-text">
              {consoleLogs.map((log, i) => (
                <div
                  key={i}
                  className={`${
                    log.startsWith("[SUCCESS]")
                      ? "text-emerald-400 font-bold"
                      : log.startsWith("[FAIL]")
                        ? "text-rose-400 font-bold"
                        : log.startsWith("$")
                          ? "text-[#00A3DA] font-bold"
                          : log.startsWith("#")
                            ? "text-slate-500 italic"
                            : "text-slate-300"
                  }`}
                >
                  {log}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}
