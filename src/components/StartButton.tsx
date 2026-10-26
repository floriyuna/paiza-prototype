"use client";

import Link from "next/link";
import { Play } from "lucide-react";
import { useGuest } from "@/lib/storage";

/** 「さっそく体験する」。アンケート済みのゲストは質問を飛ばして続きへ */
export default function StartButton() {
  const { state, hydrated } = useGuest();
  const returning = hydrated && state.surveyDone;

  return (
    <div className="flex flex-col items-start gap-2">
      <Link
        href={returning ? "/learn" : "/survey"}
        className="anim-cta-pulse inline-flex items-center gap-3 rounded-full bg-paiza-orange px-8 py-4 text-xl font-black text-paiza-ink shadow-lg transition hover:-translate-y-0.5 hover:bg-paiza-orange-dark md:px-10 md:py-5 md:text-2xl"
      >
        <Play className="h-6 w-6 fill-current" aria-hidden />
        さっそく体験する
      </Link>
      {returning && (
        <Link href="/survey" className="text-xs font-bold text-paiza-blue-dark underline-offset-2 hover:underline">
          前回の続きから始まります（レベルを選び直す）
        </Link>
      )}
    </div>
  );
}
