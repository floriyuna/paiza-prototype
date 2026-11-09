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
    <div className="min-h-screen bg-[#f5f7fa] text-[#333333] pb-16">
      {/* 1. 本家のパンくずリスト */}
      <div className="border-b border-[#ededed] bg-white py-2 text-xs text-[#6e7687]">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-4">
          <div className="flex items-center gap-1.5">
            <Link href="/" className="hover:text-[#0d6bd3] hover:underline">
              paizaトップ
            </Link>
            <span>&gt;</span>
            <Link href="/" className="hover:text-[#0d6bd3] hover:underline">
              学習トップ
            </Link>
            <span>&gt;</span>
            <span className="font-bold text-[#333333]">体験レッスン</span>
          </div>

          <span className="rounded-[2px] bg-[#f6faff] border border-[#d2e3fc] px-2 py-0.5 text-[10px] font-bold text-[#0d6bd3]">
            登録不要・ゲストモード
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-[1240px] px-4 py-6">
        {/* 2. 操作コントロールバー */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-[4px] bg-white p-3 border border-[#d7e0e2] shadow-xs">
          <LevelSwitcher level={level} onChange={changeLevel} />

          <div role="tablist" aria-label="学習モード切り替え" className="flex items-center gap-1 bg-[#f0f2f5] p-1 rounded-[4px]">
            <button
              type="button"
              role="tab"
              aria-selected={type === "bug"}
              onClick={() => changeType("bug")}
              className={`flex items-center gap-1.5 rounded-[2px] px-3.5 py-1.5 text-xs font-bold transition ${
                type === "bug"
                  ? "bg-white text-[#0d6bd3] shadow-xs font-bold"
                  : "text-[#555555] hover:text-[#333333]"
              }`}
            >
              <Bug className="h-3.5 w-3.5" />
              バグ修正ゲーム
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={type === "quiz"}
              onClick={() => changeType("quiz")}
              className={`flex items-center gap-1.5 rounded-[2px] px-3.5 py-1.5 text-xs font-bold transition ${
                type === "quiz"
                  ? "bg-white text-[#0d6bd3] shadow-xs font-bold"
                  : "text-[#555555] hover:text-[#333333]"
              }`}
            >
              <Brain className="h-3.5 w-3.5" />
              結果予想クイズ
            </button>
          </div>
        </div>

        {/* 3. メインエリア ＋ 右サイドバー */}
        <div className="grid gap-5 lg:grid-cols-12">
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
                    className="inline-flex items-center gap-2 rounded-[4px] bg-[#ff8800] hover:bg-[#e67a00] px-6 py-3 text-sm font-bold text-white shadow-xs transition"
                  >
                    <Sparkles className="h-4 w-4" />
                    クリアの成果を見る
                    <ArrowRight className="h-4 w-4" />
                  </button>
                ) : (
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => goTo(nextQuestion(question, clearedIds))}
                      className="inline-flex items-center gap-1.5 rounded-[4px] bg-[#ff8800] hover:bg-[#e67a00] px-5 py-2.5 text-xs font-bold text-white shadow-xs transition"
                    >
                      <Repeat className="h-3.5 w-3.5" />
                      次の問題へ進む
                    </button>
                    <button
                      type="button"
                      onClick={() => goTo(getQuestion(level, otherType(type)))}
                      className="inline-flex items-center gap-1.5 rounded-[4px] border border-[#0d6bd3] bg-white px-5 py-2.5 text-xs font-bold text-[#0d6bd3] hover:bg-[#f6faff] transition"
                    >
                      <Gamepad2 className="h-3.5 w-3.5" />
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

          {/* 右サイドバー（3/12） */}
          <div className="lg:col-span-3">
            <QuestionList currentId={question.id} clearedIds={clearedIds} onSelect={goTo} />
          </div>
        </div>
      </div>
    </div>
  );
}
