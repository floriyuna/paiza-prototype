"use client";

import { useState } from "react";
import {
  ArrowRight,
  Brain,
  CheckCircle2,
  CircleAlert,
  CircleCheck,
  CircleX,
  HelpCircle,
  Play,
  RotateCcw,
  Sparkles,
  Terminal,
} from "lucide-react";
import CodeBlock from "./CodeBlock";
import Mascot from "./Mascot";
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
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    "# paiza Learning 4択課題演習",
    "# コードを読み、実行したときに出力される値を予想して選択してください。",
  ]);

  const choose = (id: string) => {
    if (solved || wrongIds.includes(id)) return;
    const ok = id === q.correctId;
    setPickedId(id);
    onAttempt(ok);

    if (ok) {
      setSolved(true);
      setConsoleLogs([
        `$ python3 Main.py`,
        q.output,
        `[SUCCESS] 正解です！ 変数の変化を正しく予測できました。`,
      ]);
    } else {
      setWrongIds((w) => [...w, id]);
      setConsoleLogs([
        `$ python3 Main.py`,
        `[TRY AGAIN] 選択された予想は異なりました。もう一度コードを追ってみましょう。`,
      ]);
    }
  };

  return (
    <article className="space-y-4" aria-labelledby="quiz-title">
      {/* 1. レッスンヘッダー */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1 rounded bg-[#00A3DA] px-2 py-0.5 text-[11px] font-black text-white">
              <Brain className="h-3 w-3" />
              4択結果予想クイズ
            </span>
            <span className="rounded bg-sky-50 px-2 py-0.5 text-[11px] font-bold text-[#00A3DA]">
              Python3 基礎演習
            </span>
          </div>
          <h1 id="quiz-title" className="text-base sm:text-lg font-black text-slate-900">
            {q.title}
          </h1>
        </div>

        {solved && (
          <button
            type="button"
            onClick={onFinish}
            className="anim-cta-pulse inline-flex items-center gap-2 rounded-full bg-[#FF8800] hover:bg-[#e67a00] px-5 py-2.5 text-sm font-black text-white shadow-md shadow-orange-500/20 transition self-start sm:self-auto"
          >
            <span>変数のトレース・解説を見る</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* 2. ナビゲーターメッセージ */}
      <div className="flex items-start gap-3 rounded-xl border border-sky-200 bg-gradient-to-br from-[#E6F6FC] to-white p-4 shadow-sm">
        <Mascot mood={solved ? "happy" : wrongIds.length > 0 ? "sad" : "normal"} size="md" />
        <div className="flex-1 text-xs md:text-sm">
          <p className="font-bold text-[#00A3DA] mb-0.5">paizaラーニング ナビゲーター</p>
          <p className="text-slate-700 leading-relaxed font-medium">
            {solved
              ? "「大正解！変数の計算の流れがバッチリ掴めていますね！解説で詳細を確認しましょう！」"
              : wrongIds.length > 0
                ? "「おしい！コードを1行ずつ上から順に追ってみよう。何度でも選び直せるよ！」"
                : "「コードを読んで、print関数で何が出力されるか予想してみよう！直感でも大丈夫だよ！」"}
          </p>
        </div>
      </div>

      {/* 3. paiza 2ペイン構造（左：コードエディタ / 右：4択選択肢 & コンソール） */}
      <div className="grid gap-5 lg:grid-cols-12">
        {/* 左カラム (7/12)：問題コード */}
        <section aria-label="問題コード" className="space-y-3 lg:col-span-7">
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span className="font-bold flex items-center gap-1 text-slate-700">
              <Terminal className="h-3.5 w-3.5 text-[#00A3DA]" />
              出題コード
            </span>
            <span className="text-[11px] text-slate-400">1行ずつ読んでみよう</span>
          </div>

          <CodeBlock lines={q.code} tone="run" fileName="Quiz.py" />

          {/* 実行結果コンソール */}
          <div className="overflow-hidden rounded-xl border border-slate-800 bg-[#0f172a] shadow-inner font-mono text-xs mt-3">
            <div className="flex items-center justify-between border-b border-slate-800 bg-[#1e293b]/60 px-3 py-1.5 text-slate-400">
              <span className="flex items-center gap-1.5 text-[11px] font-bold text-slate-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                実行結果コンソール
              </span>
              <span className="text-[10px] text-slate-500">{solved ? "STATUS: OK" : "WAITING ANSWER"}</span>
            </div>
            <div className="p-3 text-slate-300 space-y-1 min-h-[72px] leading-relaxed">
              {consoleLogs.map((log, i) => (
                <div
                  key={i}
                  className={`${
                    log.startsWith("[SUCCESS]")
                      ? "text-emerald-400 font-bold"
                      : log.startsWith("[TRY AGAIN]")
                        ? "text-rose-400 font-bold"
                        : log.startsWith("$")
                          ? "text-[#00A3DA] font-bold"
                          : log.startsWith("#")
                            ? "text-slate-500 italic"
                            : "text-emerald-300 font-bold text-sm"
                  }`}
                >
                  {log}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 右カラム (5/12)：4択の選択肢 */}
        <section aria-label="答えの選択肢" className="space-y-4 lg:col-span-5">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <HelpCircle className="h-3.5 w-3.5 text-[#00A3DA]" />
                画面に出力される値はどれ？
              </h2>
              <span className="text-[10px] text-slate-400">タップして回答</span>
            </div>

            <p className="text-xs text-slate-600 mb-4">{q.prompt}</p>

            <ul className="grid grid-cols-2 gap-2.5">
              {q.options.map((o, idx) => {
                const wrong = wrongIds.includes(o.id);
                const right = solved && o.id === q.correctId;
                const isPicked = pickedId === o.id;

                return (
                  <li key={o.id}>
                    <button
                      type="button"
                      onClick={() => choose(o.id)}
                      disabled={wrong || solved}
                      aria-pressed={isPicked}
                      className={`flex w-full flex-col items-center justify-center rounded-xl border-2 p-3.5 font-mono text-lg font-black transition-all ${
                        right
                          ? "border-emerald-500 bg-emerald-50 text-emerald-800 shadow-sm"
                          : wrong
                            ? "border-rose-200 bg-rose-50 text-rose-300 line-through opacity-60"
                            : "border-slate-200 bg-white text-slate-800 hover:border-[#00A3DA] hover:bg-sky-50 active:scale-95"
                      } ${solved && !right ? "opacity-30" : ""}`}
                    >
                      <span className="text-[10px] font-sans font-bold text-slate-400 mb-1">
                        選択肢 {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        {right && <CircleCheck className="h-4 w-4 text-emerald-600" />}
                        {wrong && <CircleX className="h-4 w-4 text-rose-400" />}
                        {o.label}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* 結果メッセージ */}
            {!solved && wrongIds.length > 0 && (
              <div
                role="status"
                className="mt-4 rounded-lg bg-rose-50 p-3 text-xs font-bold text-rose-700 border border-rose-200 anim-banner-in flex items-start gap-2"
              >
                <CircleAlert className="h-4 w-4 shrink-0 mt-0.5" />
                <span>おしい！もう一度コードの流れを考えてみよう。何度でも挑戦できるよ。</span>
              </div>
            )}

            {solved && (
              <div role="status" className="mt-4 space-y-3 anim-banner-in">
                <div className="rounded-lg bg-emerald-50 p-3 text-xs font-bold text-emerald-800 border border-emerald-200 flex items-center gap-2">
                  <CircleCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>正解です！正しくコードが動作しました！</span>
                </div>

                <button
                  type="button"
                  onClick={onFinish}
                  className="anim-cta-pulse w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF8800] hover:bg-[#e67a00] px-6 py-3 font-black text-white shadow-md shadow-orange-500/20 transition"
                >
                  <span>変数の動き・解説を見る</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </article>
  );
}
