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

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hasExecuted, setHasExecuted] = useState(false);
  const [executing, setExecuting] = useState(false);

  const [playKey, setPlayKey] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    "# paiza Learning Python 3.10 Runtime ready.",
    "# 修正案を選択し、「コードを実行」を押してください。",
  ]);

  const selected = q.options.find((o) => o.id === selectedId) ?? null;
  const solved = hasExecuted && selected?.correct === true;

  const codeLines = q.code.map((line, i) => (i === q.fixIndex && selected ? selected.line : line));
  const tone = hasExecuted ? (selected?.correct ? "fixed" : "bug") : "run";

  const predictAnswered = predictPick !== null;

  const sim = hasExecuted ? (selected ? selected.sim : q.buggySim) : q.buggySim;
  const result = hasExecuted
    ? selected
      ? { ok: selected.correct, text: selected.message }
      : { ok: false, text: q.buggyMessage }
    : undefined;

  const handleSelectOption = (id: string) => {
    if (solved) return;
    setSelectedId(id);
    setHasExecuted(false);
    const opt = q.options.find((o) => o.id === id);
    if (opt) {
      setConsoleLogs([
        `# コードを書き換えました: ${opt.line}`,
        "# 「▶ コードを実行」を押して動作を確認してください。",
      ]);
    }
  };

  const handleRunCode = () => {
    if (!selectedId) {
      setExecuting(true);
      setTimeout(() => {
        setExecuting(false);
        setHasExecuted(true);
        setPlayKey((k) => k + 1);
        setConsoleLogs([
          `$ python3 Main.py`,
          `[FAIL] ${q.buggyMessage}`,
          `# 修正するコードを選択してください。`,
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
          `[SUCCESS] ${opt.message}`,
          `★ テストクリア！ゲームが正常に動作しました。`,
        ]);
      } else {
        setWrongCount((n) => n + 1);
        setConsoleLogs([
          `$ python3 Main.py`,
          `[FAIL] ${opt.message}`,
          `# 別のコードを試してみましょう。`,
        ]);
      }
    }, 300);
  };

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
      {/* 1. レッスンタイトルバー（本家学習画面風） */}
      <div className="rounded-[4px] border border-[#d7e0e2] bg-white p-3.5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="rounded-[2px] bg-[#0d6bd3] px-2 py-0.5 text-[10px] font-bold text-white">
              Python3 演習問題
            </span>
            <span className="text-[11px] font-bold text-[#6e7687]">
              バグ修正パズル
            </span>
          </div>
          <h1 id="bug-title" className="text-base font-bold text-[#333333]">
            {q.title}
          </h1>
        </div>

        {solved && (
          <button
            type="button"
            onClick={onFinish}
            className="inline-flex items-center gap-1.5 rounded-[4px] bg-[#ff8800] hover:bg-[#e67a00] px-4 py-2 text-xs font-bold text-white shadow-xs transition"
          >
            <span>解説へ進む</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* 2. 2ペイン構造（左：仕様・選択肢 / 右：エディタ・プレビュー） */}
      <div className="grid gap-4 lg:grid-cols-12">
        {/* 左カラム (5/12)：問題仕様 ＆ ナビゲーター ＆ 選択肢 */}
        <section aria-label="問題仕様と修正選択肢" className="space-y-3 lg:col-span-5">
          {/* ナビゲーター吹き出し */}
          <div className="flex items-start gap-3 rounded-[4px] border border-[#d2e3fc] bg-[#f6faff] p-3 text-xs">
            <Mascot mood={solved ? "happy" : wrongCount > 0 ? "sad" : "normal"} size="sm" />
            <div className="flex-1">
              <p className="font-bold text-[#0d6bd3] text-[11px] mb-0.5">ナビゲーター</p>
              <p className="text-[#333333] leading-relaxed">
                {solved
                  ? "「クリアおめでとうございます！バグが修正され、キャラクターが正しく動きました！」"
                  : wrongCount > 0
                    ? "「おしい！別の選択肢も試してみよう。何度でもコードを書き換えてテストできます。」"
                    : `「${q.instruction}」`}
              </p>
            </div>
          </div>

          {/* 問題文 */}
          <div className="rounded-[4px] border border-[#d7e0e2] bg-white p-3.5 text-xs text-[#333333] leading-relaxed shadow-xs">
            <h2 className="text-[11px] font-bold text-[#6e7687] uppercase tracking-wider mb-1 flex items-center gap-1">
              <HelpCircle className="h-3 w-3 text-[#0d6bd3]" />
              課題内容
            </h2>
            <p className="font-medium text-[#333333] mb-2">{q.story}</p>

            <div className="rounded-[2px] bg-[#fff8e6] p-2 border border-[#ffe082] text-[#8c6b00] text-[11px]">
              <span className="font-bold">発生しているバグ: </span>
              <span>{q.buggyMessage}</span>
            </div>
          </div>

          {/* 修正コードの選択肢 */}
          <div className="rounded-[4px] border border-[#d7e0e2] bg-white p-3.5 shadow-xs">
            <h2 className="text-xs font-bold text-[#333333] mb-2 flex items-center justify-between">
              <span>修正するコードを選択</span>
              <span className="text-[10px] text-[#6e7687] font-normal">タップして反映</span>
            </h2>

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
                    className={`w-full rounded-[4px] border p-2.5 text-left transition ${
                      isSelected
                        ? isCorrect
                          ? "border-[#1fa463] bg-[#edf8f2]"
                          : isWrong
                            ? "border-[#e5484d] bg-[#fdf2f2]"
                            : "border-[#0d6bd3] bg-[#f6faff]"
                        : "border-[#d7e0e2] bg-white hover:border-[#0d6bd3] hover:bg-[#fafbfc]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold text-[#6e7687]">
                        選択肢 {String.fromCharCode(65 + idx)}
                      </span>
                      {isSelected && !hasExecuted && (
                        <span className="rounded-[2px] bg-[#0d6bd3] px-1.5 py-0.2 text-[9px] font-bold text-white">
                          エディタ反映中
                        </span>
                      )}
                      {isCorrect && (
                        <span className="text-[10px] font-bold text-[#1fa463]">✓ 正解</span>
                      )}
                      {isWrong && (
                        <span className="text-[10px] font-bold text-[#e5484d]">✕ 不正解</span>
                      )}
                    </div>

                    <div className="font-mono text-xs font-bold text-slate-900 bg-slate-900 text-emerald-400 px-2.5 py-1.5 rounded-[2px]">
                      {opt.line}
                    </div>

                    {hasExecuted && isSelected && (
                      <p className="mt-1 text-[10px] text-[#555]">{opt.message}</p>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* 右カラム (7/12)：プレビュー ＆ エディタ ＆ 実行コンソール */}
        <section aria-label="ゲーム実行とエディタ" className="space-y-3 lg:col-span-7">
          {/* ゲームプレビュー */}
          <GameStage key={`stage-${playKey}-${selectedId ?? "bug"}`} sim={sim} result={result} />

          {/* オンラインエディタ */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-[#6e7687] px-0.5">
              <span className="font-bold text-[#333333] flex items-center gap-1 text-[11px]">
                <Terminal className="h-3 w-3 text-[#0d6bd3]" />
                ブラウザ実行環境 (Web IDE)
              </span>
              <span className="text-[10px]">修正行: {q.fixIndex + 1}行目</span>
            </div>

            <CodeBlock lines={codeLines} highlight={q.fixIndex} tone={tone} fileName="Main.py" />
          </div>

          {/* 本家の「コードを実行」操作バー */}
          <div className="flex flex-wrap items-center justify-between gap-2 bg-white p-3 rounded-[4px] border border-[#d7e0e2] shadow-xs">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleRunCode}
                disabled={executing || solved}
                className={`inline-flex items-center gap-1.5 rounded-[4px] px-5 py-2.5 text-xs font-bold text-white shadow-xs transition active:scale-98 ${
                  solved
                    ? "bg-[#1fa463] cursor-default"
                    : "bg-[#1fa463] hover:bg-[#188c53]"
                }`}
              >
                <Play className="h-3.5 w-3.5 fill-current" />
                {executing ? "実行中..." : solved ? "✓ 実行成功！" : "コードを実行"}
              </button>

              <button
                type="button"
                onClick={() => setPlayKey((k) => k + 1)}
                className="inline-flex items-center gap-1 rounded-[4px] border border-[#d7e0e2] bg-white px-2.5 py-2 text-[11px] font-bold text-[#555] hover:bg-slate-50 transition"
              >
                <RotateCcw className="h-3 w-3" />
                再再生
              </button>

              {selectedId && !solved && (
                <button
                  type="button"
                  onClick={handleResetToBug}
                  className="inline-flex items-center gap-1 rounded-[4px] border border-[#d7e0e2] bg-white px-2.5 py-2 text-[11px] font-bold text-[#555] hover:bg-slate-50 transition"
                >
                  <Eye className="h-3 w-3" />
                  元のバグ
                </button>
              )}
            </div>

            {solved && (
              <button
                type="button"
                onClick={onFinish}
                className="inline-flex items-center gap-1 rounded-[4px] bg-[#ff8800] hover:bg-[#e67a00] px-4 py-2 text-xs font-bold text-white shadow-xs transition"
              >
                <span>解説へ進む</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            )}
          </div>

          {/* 実行結果（標準出力） */}
          <div className="overflow-hidden rounded-[4px] border border-slate-700 bg-[#0f172a] font-mono text-xs shadow-inner">
            <div className="bg-[#1e293b] px-3 py-1 flex items-center justify-between text-slate-400 text-[10px] border-b border-slate-700">
              <span className="font-bold text-slate-300">標準出力 (Output)</span>
              <span>Python 3.10</span>
            </div>
            <div className="p-2.5 text-slate-300 space-y-0.5 leading-relaxed text-[11px] max-h-28 overflow-y-auto">
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
                            : "text-slate-200"
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
