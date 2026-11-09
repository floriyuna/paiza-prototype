"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowRight,
  Brain,
  Bug,
  ChevronLeft,
  ChevronRight,
  Gamepad2,
  Repeat,
  Sparkles,
} from "lucide-react";
import Achievement from "./Achievement";
import BugGame from "./BugGame";
import CodeQuiz from "./CodeQuiz";
import ExplanationView from "./ExplanationView";
import LevelSwitcher from "./LevelSwitcher";
import QuestionList from "./QuestionList";
import { ALL_QUESTIONS, getQuestion, nextQuestion, otherType } from "@/lib/questions";
import { recordAnswer, useGuest } from "@/lib/storage";
import type { GameType, Level, Question } from "@/lib/types";

type Phase = "play" | "explain" | "achievement";

export default function LearnClient() {
  const router = useRouter();
  const params = useSearchParams();
  const { state, hydrated, update } = useGuest();

  const level: Level = state.level ?? "beginner";
  const type: GameType = params.get("type") === "quiz" ? "quiz" : "bug";
  const question = getQuestion(level, type);
  const clearedIds = Object.keys(state.cleared);

  // 画面の進行状態（問題ごとに「あそぶ→解説→達成」）
  const [ps, setPs] = useState<{ qid: string; phase: Phase; run: number }>({ qid: "", phase: "play", run: 0 });
  const phase: Phase = ps.qid === question.id ? ps.phase : "play";
  const run = ps.qid === question.id ? ps.run : 0;
  const attempts = useRef<Record<string, number>>({});

  const setPhase = (p: Phase) => setPs({ qid: question.id, phase: p, run });

  const goTo = (q: Question) => {
    attempts.current[q.id] = 0;
    update((prev) => ({ ...prev, level: q.level, surveyDone: prev.surveyDone }));
    if (q.id === question.id) {
      setPs({ qid: q.id, phase: "play", run: run + 1 });
    } else {
      setPs({ qid: q.id, phase: "play", run: 0 });
    }
    router.replace(`/learn?type=${q.kind}`, { scroll: false });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const changeLevel = (l: Level) => {
    update((prev) => ({ ...prev, level: l }));
    setPs({ qid: "", phase: "play", run: 0 });
  };

  const changeType = (t: GameType) => {
    if (t === type) return;
    setPs({ qid: "", phase: "play", run: 0 });
    router.replace(`/learn?type=${t}`, { scroll: false });
  };

  const handleAttempt = (correct: boolean) => {
    attempts.current[question.id] = (attempts.current[question.id] ?? 0) + 1;
    const n = attempts.current[question.id];
    update((prev) => recordAnswer(prev, question.id, correct, n));
  };

  const finishPlay = () => {
    setPs({ qid: question.id, phase: "explain", run });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const leaveAchievement = (choice: "guest" | "signup") => {
    update((prev) => ({ ...prev, achievementSeen: true, choice }));
    if (choice === "signup") {
      router.push("/signup");
    } else {
      goTo(nextQuestion(question, clearedIds));
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7F9] pb-16">
      {/* 1. レッスン上部パンくず / ナビゲーションバー */}
      <div className="border-b border-slate-200 bg-white py-3">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-[#00A3DA] transition flex items-center gap-1 font-bold">
              <ChevronLeft className="h-4 w-4" />
              ラーニングトップ
            </Link>
            <span>/</span>
            <span className="text-slate-800 font-bold">体験レッスン</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 text-xs font-bold text-emerald-700">
              登録不要・ゲストモード
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* 2. 操作コントロールバー（難易度 & ゲーム/クイズ切り替え） */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white p-4 border border-slate-200 shadow-sm">
          <LevelSwitcher level={level} onChange={changeLevel} />

          <div role="tablist" aria-label="学習モード切り替え" className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
            <button
              type="button"
              role="tab"
              aria-selected={type === "bug"}
              onClick={() => changeType("bug")}
              className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-bold transition-all ${
                type === "bug"
                  ? "bg-white text-[#E05397] shadow-sm font-black"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Bug className="h-4 w-4" />
              バグ修正ゲーム
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={type === "quiz"}
              onClick={() => changeType("quiz")}
              className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-bold transition-all ${
                type === "quiz"
                  ? "bg-white text-[#00A3DA] shadow-sm font-black"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Brain className="h-4 w-4" />
              結果予想クイズ
            </button>
          </div>
        </div>

        {/* 初回訪問時のヒント */}
        {hydrated && !state.surveyDone && phase === "play" && (
          <div className="mb-6 flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-[#E6F6FC] border border-sky-200 px-4 py-3 text-xs md:text-sm text-slate-700">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#00A3DA] shrink-0" />
              <span>まずは「初心者」向けの問題を表示しています。</span>
            </div>
            <Link
              href="/survey"
              className="inline-flex items-center gap-1 font-bold text-[#00A3DA] hover:underline"
            >
              2問の簡単な質問でレベルを診断する
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        )}

        {/* 3. メインエリア ＋ 右サイドバー */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* メインステージ（9/12） */}
          <div className="min-w-0 lg:col-span-9">
            {phase === "play" &&
              (question.kind === "bug" ? (
                <BugGame
                  key={`${question.id}-${run}`}
                  question={question}
                  onAttempt={handleAttempt}
                  onFinish={finishPlay}
                />
              ) : (
                <CodeQuiz
                  key={`${question.id}-${run}`}
                  question={question}
                  onAttempt={handleAttempt}
                  onFinish={finishPlay}
                />
              ))}

            {phase === "explain" && (
              <ExplanationView question={question}>
                {!state.achievementSeen ? (
                  <button
                    type="button"
                    onClick={() => setPhase("achievement")}
                    className="anim-cta-pulse inline-flex items-center gap-2 rounded-full bg-[#FF8800] hover:bg-[#e67a00] px-7 py-3.5 text-base font-black text-white shadow-lg shadow-orange-500/25 transition active:scale-95"
                  >
                    <Sparkles className="h-5 w-5" />
                    クリアの成果・バッジを見る
                    <ArrowRight className="h-5 w-5" />
                  </button>
                ) : (
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => goTo(nextQuestion(question, clearedIds))}
                      className="inline-flex items-center gap-2 rounded-full bg-[#FF8800] hover:bg-[#e67a00] px-6 py-3 text-sm font-black text-white shadow-md transition"
                    >
                      <Repeat className="h-4 w-4" />
                      次の問題に挑戦する
                    </button>
                    <button
                      type="button"
                      onClick={() => goTo(getQuestion(level, otherType(type)))}
                      className="inline-flex items-center gap-2 rounded-full border-2 border-[#00A3DA] bg-white px-6 py-3 text-sm font-black text-[#00A3DA] hover:bg-sky-50 transition"
                    >
                      <Gamepad2 className="h-4 w-4" />
                      別のゲームを遊ぶ
                    </button>
                  </div>
                )}
              </ExplanationView>
            )}

            {phase === "achievement" && (
              <Achievement
                question={question}
                onContinueAsGuest={() => leaveAchievement("guest")}
                onSignup={() => leaveAchievement("signup")}
              />
            )}
          </div>

          {/* 右サイドバー（3/12）：問題一覧 & レッスンナビゲーション */}
          <div className="lg:col-span-3 space-y-4">
            <QuestionList currentId={question.id} clearedIds={clearedIds} onSelect={goTo} />
          </div>
        </div>
      </div>
    </div>
  );
}
