"use client";

import { useCallback, useEffect, useState } from "react";
import { CircleAlert, CircleCheck, Gamepad2, Play, Sparkles } from "lucide-react";
import type { Sim } from "@/lib/types";

/**
 * paizaゲーム開発レッスン風のゲーム実行プレビュー画面
 */

interface Props {
  sim: Sim;
  result?: { ok: boolean; text: string };
  compact?: boolean;
}

/** かわいいドット絵風のpaizaゲームキャラクター */
function PixelHero({ mood = "normal", className = "" }: { mood?: "normal" | "happy" | "sad"; className?: string }) {
  return (
    <div className={`relative inline-block select-none ${className}`}>
      {/* 24x24のピクセル調スライムキャラクター */}
      <div
        className={`w-11 h-11 rounded-2xl flex flex-col items-center justify-center shadow-md border-2 ${
          mood === "sad"
            ? "bg-rose-400 border-rose-600"
            : mood === "happy"
              ? "bg-[#00A3DA] border-[#0085B3]"
              : "bg-[#00A3DA] border-[#0085B3]"
        }`}
      >
        {/* 目 */}
        <div className="flex gap-2 mb-1">
          {mood === "happy" ? (
            <>
              <span className="w-2 h-1 bg-white rounded-t-full" />
              <span className="w-2 h-1 bg-white rounded-t-full" />
            </>
          ) : mood === "sad" ? (
            <>
              <span className="w-2 h-2.5 bg-white rounded-full relative">
                <span className="absolute bottom-0 right-0 w-1 h-1 bg-slate-900 rounded-full" />
              </span>
              <span className="w-2 h-2.5 bg-white rounded-full relative">
                <span className="absolute bottom-0 left-0 w-1 h-1 bg-slate-900 rounded-full" />
              </span>
            </>
          ) : (
            <>
              <span className="w-2 h-2.5 bg-white rounded-full relative">
                <span className="absolute top-0.5 right-0.5 w-1 h-1 bg-slate-900 rounded-full" />
              </span>
              <span className="w-2 h-2.5 bg-white rounded-full relative">
                <span className="absolute top-0.5 right-0.5 w-1 h-1 bg-slate-900 rounded-full" />
              </span>
            </>
          )}
        </div>
        {/* 口 */}
        {mood === "happy" ? (
          <span className="w-2.5 h-1.5 bg-white rounded-b-full" />
        ) : mood === "sad" ? (
          <span className="w-2.5 h-1 bg-white/80 rounded-t-full" />
        ) : (
          <span className="w-2 h-0.5 bg-white/80 rounded-full" />
        )}
      </div>
      {/* 影 */}
      <div className="w-8 h-2 bg-black/15 rounded-full mx-auto -mt-1 blur-[1px]" />
    </div>
  );
}

export default function GameStage({ sim, result, compact = false }: Props) {
  const [done, setDone] = useState(false);
  const finish = useCallback(() => setDone(true), []);

  return (
    <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-lg">
      {/* プレビューヘッダー（paizaゲーム実行ウィンドウ風） */}
      <div className="flex items-center justify-between border-b border-slate-800 bg-[#151c24] px-3 py-1.5 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Gamepad2 className="h-4 w-4 text-[#00A3DA]" />
          <span className="font-mono text-xs text-slate-300 font-bold">GAME PREVIEW</span>
          <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-400">
            60 FPS
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px]">
          <span className="flex items-center gap-1 text-emerald-400 font-mono">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            CANVAS
          </span>
        </div>
      </div>

      {/* ステージ画面 */}
      <div
        className={`relative overflow-hidden bg-gradient-to-b from-sky-300 via-sky-100 to-white ${
          compact ? "h-40" : "h-52 md:h-60"
        }`}
      >
        {/* 背景雲 */}
        <span className="absolute left-[10%] top-4 h-4 w-16 rounded-full bg-white/70" aria-hidden />
        <span className="absolute right-[15%] top-7 h-3 w-12 rounded-full bg-white/70" aria-hidden />

        {/* シーン別描画 */}
        {sim.kind === "jump" && <JumpScene power={sim.power} onDone={finish} />}
        {sim.kind === "run" && <RunScene rule={sim.rule} onDone={finish} />}
        {sim.kind === "coins" && (
          <CoinScene collected={sim.collected} total={sim.total} perCoin={sim.perCoin} onDone={finish} />
        )}

        {/* 結果バナー */}
        {result && done && (
          <div
            role="status"
            className={`anim-banner-in absolute inset-x-3 top-3 z-10 flex items-center justify-between rounded-lg px-3.5 py-2 text-xs md:text-sm font-bold shadow-md backdrop-blur-xs ${
              result.ok
                ? "bg-emerald-500/90 text-white border border-emerald-400"
                : "bg-rose-600/90 text-white border border-rose-500"
            }`}
          >
            <div className="flex items-center gap-2">
              {result.ok ? (
                <CircleCheck className="h-4 w-4 shrink-0" aria-hidden />
              ) : (
                <CircleAlert className="h-4 w-4 shrink-0" aria-hidden />
              )}
              <span>{result.text}</span>
            </div>
            {result.ok && (
              <span className="rounded bg-white/20 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider">
                SUCCESS
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- 1. ジャンプ ---------- */
function JumpScene({ power, onDone }: { power: number; onDone: () => void }) {
  const anim = power > 0 ? "anim-jump" : power < 0 ? "anim-sink" : "anim-wobble";
  const mood = power > 0 ? "happy" : "sad";
  const jumpY = `${-Math.min(power, 7) * 20}px`;

  return (
    <>
      <div className="absolute inset-x-0 bottom-0 h-10 bg-emerald-500 border-t-2 border-emerald-600" />
      <div className="absolute inset-x-0 bottom-10 h-1 bg-emerald-400/80" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div
          className={anim}
          style={{ ["--jump-y" as string]: jumpY }}
          onAnimationEnd={(e) => {
            if (e.target === e.currentTarget) onDone();
          }}
        >
          <PixelHero mood={mood} />
        </div>
      </div>
      {power < 0 && <div className="absolute inset-x-0 bottom-0 h-[34px] bg-emerald-500 z-10" />}
      <p className="absolute bottom-1 left-3 font-mono text-[10px] font-bold text-white z-20">
        jump_power: {power}
      </p>
    </>
  );
}

/* ---------- 2. 走って障害物をよける ---------- */
function RunScene({ rule, onDone }: { rule: "never" | "right" | "early"; onDone: () => void }) {
  const crash = rule !== "right";
  const runClass = crash ? "anim-run-crash" : "anim-run-full";
  const hopClass = rule === "right" ? "anim-hop-right" : rule === "early" ? "anim-hop-early" : "";
  const [crashed, setCrashed] = useState(false);

  return (
    <>
      <div className="absolute inset-x-0 bottom-0 h-10 bg-emerald-500 border-t-2 border-emerald-600" />
      <div className="absolute inset-x-0 bottom-10 h-1 bg-emerald-400/80" />
      {/* 障害物（岩 / ハードル） */}
      <div
        className={`absolute bottom-10 left-1/2 -translate-x-1/2 h-9 w-8 rounded-t-lg border-2 border-amber-900 bg-amber-600 shadow-sm ${
          crashed ? "anim-crash" : ""
        }`}
      >
        <span className="absolute inset-x-1 top-1.5 h-1 rounded bg-amber-200/60" />
      </div>

      {/* 走るキャラクター */}
      <div
        className={`absolute bottom-10 ${runClass}`}
        style={{ left: "4%" }}
        onAnimationEnd={(e) => {
          if (e.target !== e.currentTarget) return;
          if (crash) setCrashed(true);
          onDone();
        }}
      >
        <div className={hopClass}>
          <PixelHero mood={crashed ? "sad" : "normal"} className={crashed ? "anim-crash" : ""} />
        </div>
      </div>
      <p className="absolute bottom-1 left-3 font-mono text-[10px] font-bold text-white">
        action: run_obstacle_course()
      </p>
    </>
  );
}

/* ---------- 3. コインを集める ---------- */
function CoinScene({
  collected,
  total,
  perCoin,
  onDone,
}: {
  collected: number;
  total: number;
  perCoin: number;
  onDone: () => void;
}) {
  const slots = Math.max(collected, total);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step >= collected) {
      const t = window.setTimeout(onDone, 500);
      return () => window.clearTimeout(t);
    }
    const t = window.setTimeout(() => setStep((s) => s + 1), 600);
    return () => window.clearTimeout(t);
  }, [step, collected, onDone]);

  const score = step * perCoin;
  const charLeft = 6 + (step / Math.max(slots, 1)) * 74;

  return (
    <>
      <div className="absolute inset-x-0 bottom-0 h-10 bg-emerald-500 border-t-2 border-emerald-600" />
      {/* スコアHUD */}
      <div className="absolute right-3 top-3 z-10 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 font-mono text-xs font-bold text-amber-300 border border-amber-400/40">
        <Sparkles className="h-3.5 w-3.5 text-amber-300" />
        <span>SCORE: {score}</span>
      </div>

      {/* コイン列 */}
      <div className="absolute inset-x-4 bottom-12 flex justify-around">
        {Array.from({ length: slots }).map((_, i) => {
          const taken = i < step;
          return (
            <div
              key={i}
              className={`flex h-7 w-7 items-center justify-center rounded-full border-2 border-amber-500 font-mono text-xs font-black transition-all ${
                taken
                  ? "scale-0 opacity-0"
                  : "bg-amber-400 text-amber-900 shadow-md animate-bounce"
              }`}
            >
              $
            </div>
          );
        })}
      </div>

      {/* 歩くキャラクター */}
      <div
        className="absolute bottom-10 transition-all duration-500 ease-out"
        style={{ left: `${charLeft}%` }}
      >
        <PixelHero mood="happy" />
      </div>
      <p className="absolute bottom-1 left-3 font-mono text-[10px] font-bold text-white">
        for coin in coins: score += {perCoin}
      </p>
    </>
  );
}
