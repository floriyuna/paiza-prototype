"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, Brain, Bug, Gamepad2, Repeat, Sparkles } from "lucide-react";
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
    <div className="mx-auto max-w-6xl px-4 py-6">
      {/* 操作バー */}
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <LevelSwitcher level={level} onChange={changeLevel} />

        <div role="tablist" aria-label="あそびかた" className="inline-flex gap-2">
          <TabButton active={type === "bug"} onClick={() => changeType("bug")} icon={<Bug className="h-4 w-4" aria-hidden />}>
            バグ修正ゲーム
          </TabButton>
          <TabButton active={type === "quiz"} onClick={() => changeType("quiz")} icon={<Brain className="h-4 w-4" aria-hidden />}>
            結果予想クイズ
          </TabButton>
        </div>
      </div>

      {hydrated && !state.surveyDone && phase === "play" && (
        <p className="mb-4 flex flex-wrap items-center gap-x-2 rounded-card bg-paiza-blue-soft px-3 py-2 text-sm">
          <Sparkles className="h-4 w-4 text-paiza-blue" aria-hidden />
          まずは「初心者」向けの問題を出しています。
          <Link href="/survey" className="font-bold text-paiza-blue-dark underline">
            2問の質問でレベルを判定する
          </Link>
        </p>
      )}

      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        <div role="tabpanel" aria-label={type === "bug" ? "バグ修正ゲーム" : "結果予想クイズ"} className="min-w-0">
          {phase === "play" &&
            (question.kind === "bug" ? (
              <BugGame key={`${question.id}-${run}`} question={question} onAttempt={handleAttempt} onFinish={finishPlay} />
            ) : (
              <CodeQuiz key={`${question.id}-${run}`} question={question} onAttempt={handleAttempt} onFinish={finishPlay} />
            ))}

          {phase === "explain" && (
            <ExplanationView question={question}>
              {!state.achievementSeen ? (
                <button
                  type="button"
                  onClick={() => setPhase("achievement")}
                  className="anim-cta-pulse inline-flex items-center gap-2 rounded-full bg-paiza-orange px-7 py-3.5 text-lg font-black text-paiza-ink hover:bg-paiza-orange-dark"
                >
                  <Sparkles className="h-5 w-5" aria-hidden />
                  クリアの成果を見る
                  <ArrowRight className="h-5 w-5" aria-hidden />
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => goTo(nextQuestion(question, clearedIds))}
                    className="inline-flex items-center gap-2 rounded-full bg-paiza-orange px-6 py-3 font-black text-paiza-ink hover:bg-paiza-orange-dark"
                  >
                    <Repeat className="h-4 w-4" aria-hidden />
                    もう一問挑戦する
                  </button>
                  <button
                    type="button"
                    onClick={() => goTo(getQuestion(level, otherType(type)))}
                    className="inline-flex items-center gap-2 rounded-full border-2 border-paiza-blue px-6 py-3 font-black text-paiza-blue-dark hover:bg-paiza-blue-soft"
                  >
                    <Gamepad2 className="h-4 w-4" aria-hidden />
                    別のゲームを遊ぶ
                  </button>
                </>
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

        <aside className="space-y-4">
          <QuestionList currentId={question.id} clearedIds={clearedIds} onSelect={goTo} />
          <p className="rounded-card bg-white p-3 text-xs leading-relaxed text-paiza-sub shadow-card">
            クリア状況：<strong className="text-paiza-ink">{clearedIds.length} / {ALL_QUESTIONS.length}</strong>
            <br />
            学習状況はこのブラウザにだけ保存されます（登録は不要です）。
          </p>
        </aside>
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full border-2 px-4 py-2 text-sm font-black transition ${
        active
          ? "border-paiza-blue bg-paiza-blue text-white"
          : "border-paiza-line bg-white text-paiza-ink hover:border-paiza-blue"
      }`}
    >
      {icon}
      {children}
    </button>
  );
}
