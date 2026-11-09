"use client";

import { ArrowRight, Award, Bug, Trophy, UserPlus } from "lucide-react";
import Mascot from "./Mascot";
import type { Question } from "@/lib/types";

const CONFETTI = [
  { left: "6%", delay: "0s", color: "#FFB700" },
  { left: "14%", delay: "0.3s", color: "#E05397" },
  { left: "22%", delay: "0.1s", color: "#00A3DA" },
  { left: "31%", delay: "0.5s", color: "#FF8800" },
  { left: "40%", delay: "0.2s", color: "#FFB700" },
  { left: "49%", delay: "0.6s", color: "#E05397" },
  { left: "58%", delay: "0.15s", color: "#00A3DA" },
  { left: "66%", delay: "0.45s", color: "#FF8800" },
  { left: "75%", delay: "0.05s", color: "#FFB700" },
  { left: "83%", delay: "0.35s", color: "#E05397" },
  { left: "92%", delay: "0.25s", color: "#00A3DA" },
];

interface Props {
  question: Question;
  onContinueAsGuest: () => void;
  onSignup: () => void;
}

/** 初回クリア時の達成画面と、「ゲストで続ける／登録する」の選択 */
export default function Achievement({ question, onContinueAsGuest, onSignup }: Props) {
  const isBug = question.kind === "bug";

  return (
    <section aria-labelledby="clear-title" className="space-y-6">
      <div className="relative overflow-hidden rounded-card bg-white p-6 text-center shadow-card md:p-10">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          {CONFETTI.map((c, i) => (
            <span
              key={i}
              className="anim-confetti absolute top-0 h-3 w-2 rounded-sm"
              style={{ left: c.left, animationDelay: c.delay, backgroundColor: c.color }}
            />
          ))}
        </div>

        <div className="relative">
          <div className="anim-badge-in mx-auto mb-4 flex h-28 w-28 items-center justify-center rounded-full border-4 border-amber-500 bg-paiza-gold shadow-lg">
            {isBug ? <Bug className="h-14 w-14 text-white" aria-hidden /> : <Trophy className="h-14 w-14 text-white" aria-hidden />}
          </div>
          <p className="mb-1 flex items-center justify-center gap-1.5 text-sm font-black text-amber-600">
            <Award className="h-4 w-4" aria-hidden />
            バッジ獲得：はじめの一歩
          </p>
          <h2 id="clear-title" className="text-2xl font-black md:text-3xl">
            初めてのプログラミング体験クリア！
          </h2>
          <p className="mt-2 text-paiza-sub">
            {isBug ? "あなたはプログラムのバグを1つ修正できました！" : "あなたはコードの実行結果を、自分の力で予想できました！"}
          </p>
          <div className="mt-4 flex justify-center">
            <Mascot mood="happy" />
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-center text-lg font-black">このあと、どうする？</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <button
            type="button"
            onClick={onContinueAsGuest}
            className="group flex flex-col rounded-card border-2 border-paiza-orange bg-white p-5 text-left shadow-card transition hover:-translate-y-0.5 hover:shadow-pop"
          >
            <span className="mb-1 text-xs font-black text-paiza-orange-dark">① おすすめ・登録なし</span>
            <span className="text-lg font-black">ゲストとして学習を続ける</span>
            <span className="mt-1 flex-1 text-sm text-paiza-sub">
              基本の問題やミニゲームを、これまでどおり何度でも遊べます。レベルの変更も自由です。
            </span>
            <span className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-paiza-orange px-5 py-3 font-black text-paiza-ink group-hover:bg-paiza-orange-dark">
              つづきを遊ぶ
              <ArrowRight className="h-4 w-4" aria-hidden />
            </span>
          </button>

          <button
            type="button"
            onClick={onSignup}
            className="group flex flex-col rounded-card border border-paiza-line bg-white p-5 text-left shadow-card transition hover:-translate-y-0.5 hover:border-paiza-blue"
          >
            <span className="mb-1 text-xs font-black text-paiza-blue">② 学習記録を残したい人向け</span>
            <span className="text-lg font-black">アカウントを作成して本格的に学ぶ</span>
            <span className="mt-1 flex-1 text-sm text-paiza-sub">
              学習履歴の保存や、発展的な講座を使いたいときに。あとからいつでも登録できます。
            </span>
            <span className="mt-4 inline-flex items-center justify-center gap-2 rounded-full border-2 border-paiza-blue px-5 py-3 font-black text-paiza-blue-dark group-hover:bg-paiza-blue-soft">
              <UserPlus className="h-4 w-4" aria-hidden />
              登録画面へ（デモ）
            </span>
          </button>
        </div>
        <p className="mt-3 text-center text-xs text-paiza-sub">登録しなくても、ゲストとして学習を続けられます。</p>
      </div>
    </section>
  );
}
