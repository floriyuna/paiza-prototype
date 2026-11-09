"use client";

import Link from "next/link";
import { Play, Sparkles } from "lucide-react";
import { useGuest } from "@/lib/storage";

/** 「さっそく体験する」。アンケート済みのゲストは質問を飛ばして続きへ */
export default function StartButton() {
  const { state, hydrated } = useGuest();
  const returning = hydrated && state.surveyDone;

  return (
    <div className="flex flex-col items-start gap-2">
      <Link
        href={returning ? "/learn" : "/survey"}
        className="group relative inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#FF8800] via-[#ff951e] to-[#ffa133] px-8 py-4 text-xl font-black text-white shadow-xl shadow-orange-500/25 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-orange-500/35 active:scale-95 md:px-10 md:py-4.5 md:text-2xl"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
          <Play className="h-5 w-5 fill-current text-white translate-x-0.5" aria-hidden />
        </span>
        <span>さっそく体験する</span>
        <span className="text-xs font-bold rounded-full bg-black/20 px-2 py-0.5 text-white/90">
          無料
        </span>
      </Link>
      {returning && (
        <Link
          href="/survey"
          className="inline-flex items-center gap-1 text-xs font-bold text-[#00A3DA] hover:underline pl-2"
        >
          <Sparkles className="h-3.5 w-3.5" />
          前回の続きから始まります（難易度を選び直す）
        </Link>
      )}
    </div>
  );
}
