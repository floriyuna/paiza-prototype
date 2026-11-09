"use client";

import { ArrowRight, Award, Bug, CheckCircle2, ChevronRight, Sparkles, Trophy, UserPlus } from "lucide-react";
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
    <section aria-labelledby="clear-title" className="space-y-8">
      {/* 1. 達成演出カード（paizaスキルチェック合格演出風） */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-lg md:p-12">
        {/* 紙吹雪アニメーション */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          {CONFETTI.map((c, i) => (
            <span
              key={i}
              className="anim-confetti absolute top-0 h-3.5 w-2 rounded-sm"
              style={{ left: c.left, animationDelay: c.delay, backgroundColor: c.color }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-xl mx-auto">
          {/* paizaゴールド達成バッジ */}
          <div className="anim-badge-in mx-auto mb-5 flex h-28 w-28 items-center justify-center rounded-full border-4 border-amber-400 bg-gradient-to-br from-amber-300 via-[#FFB700] to-amber-500 shadow-xl shadow-amber-500/30">
            {isBug ? (
              <Bug className="h-14 w-14 text-white drop-shadow-sm" aria-hidden />
            ) : (
              <Trophy className="h-14 w-14 text-white drop-shadow-sm" aria-hidden />
            )}
          </div>

          <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-300 px-3.5 py-1 text-xs font-black text-amber-700 mb-2">
            <Award className="h-4 w-4 text-amber-600" />
            <span>バッジ獲得：はじめてのコード修正クリア！</span>
          </div>

          <h2 id="clear-title" className="text-2xl font-black text-slate-900 md:text-3xl tracking-tight">
            プログラミング体験クリア！
          </h2>

          <p className="mt-3 text-sm md:text-base text-slate-600 leading-relaxed font-medium">
            {isBug
              ? "おめでとうございます！プログラムのバグを自分の力で見つけて、正常に修正できました！"
              : "おめでとうございます！コードの処理と変数の動きを、自分の力で正確に予測できました！"}
          </p>

          <div className="mt-6 flex items-center justify-center gap-3">
            <Mascot mood="happy" size="lg" />
            <div className="text-left text-xs text-slate-600 bg-sky-50 border border-sky-200 p-3 rounded-2xl">
              <p className="font-bold text-[#00A3DA]">きょうこちゃん</p>
              <p className="mt-0.5">「素晴らしいです！プログラミングの基礎的な思考力がしっかり身についていますよ！」</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. このあとの選択肢（ゲスト継続 vs アカウント作成） */}
      <div>
        <div className="text-center mb-6">
          <span className="text-xs font-bold text-[#00A3DA] bg-[#E6F6FC] px-3 py-1 rounded-full">
            NEXT STEP
          </span>
          <h3 className="text-xl font-black text-slate-900 mt-2">
            このあとの学習方法を選んでください
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            無理な登録は不要です。あなたのペースで自由に学習を続けられます。
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* ① ゲストとして学習を続ける（推奨） */}
          <button
            type="button"
            onClick={onContinueAsGuest}
            className="group relative flex flex-col rounded-2xl border-2 border-[#FF8800] bg-white p-6 text-left shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/10"
          >
            <div className="absolute top-4 right-4 rounded-full bg-orange-100 px-3 py-0.5 text-xs font-black text-[#FF8800]">
              おすすめ・登録不要
            </div>

            <div className="flex items-center gap-2 mb-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FF8800] text-xs font-black text-white">
                1
              </span>
              <span className="text-lg font-black text-slate-900">ゲストとして学習を続ける</span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-6 flex-1">
              基本の問題や他のゲーム・クイズを、登録なしでそのまま何度でも遊べます。
              レベルの変更もいつでも可能です。
            </p>

            <span className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF8800] hover:bg-[#e67a00] px-5 py-3.5 text-sm font-black text-white shadow-md shadow-orange-500/20 group-hover:brightness-105 transition">
              <span>次の問題・ゲームを遊ぶ</span>
              <ArrowRight className="h-4 w-4" />
            </span>
          </button>

          {/* ② アカウントを作成して本格的に学ぶ */}
          <button
            type="button"
            onClick={onSignup}
            className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-[#00A3DA] hover:shadow-lg"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#00A3DA] text-xs font-black text-white">
                2
              </span>
              <span className="text-lg font-black text-slate-900">アカウントを作って本格的に学ぶ</span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-6 flex-1">
              学習履歴の保存や、Python・Javaなどの全120講座・演習問題をすべて利用したい方向けです。
              あとからいつでも登録できます。
            </p>

            <span className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#00A3DA] bg-white px-5 py-3 text-sm font-black text-[#00A3DA] group-hover:bg-[#E6F6FC] transition">
              <UserPlus className="h-4 w-4" />
              <span>無料会員登録へ進む（デモ）</span>
            </span>
          </button>
        </div>

        <p className="mt-4 text-center text-xs text-slate-400">
          ※ 登録しなくても、ゲストとしてすべての体験問題をプレイできます。
        </p>
      </div>
    </section>
  );
}
