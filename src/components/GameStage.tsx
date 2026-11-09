"use client";

import { useCallback, useEffect, useState } from "react";
import { CircleAlert, CircleCheck } from "lucide-react";
import Mascot from "./Mascot";
import type { Sim } from "@/lib/types";

/**
 * ゲームのステージ。選んだコード（Sim）に応じて動きが変わる。
 * 親側で key を変えるとアニメーションが最初から再生される。
 */

interface Props {
  sim: Sim;
  /** 動作後に表示する結果。ok が true なら成功表示 */
  result?: { ok: boolean; text: string };
  compact?: boolean;
}

export default function GameStage({ sim, result, compact = false }: Props) {
  const [done, setDone] = useState(false);
  const finish = useCallback(() => setDone(true), []);

  return (
    <div
      className={`relative overflow-hidden rounded-card border border-paiza-line bg-gradient-to-b from-sky-200 via-sky-100 to-white ${
        compact ? "h-44" : "h-56 md:h-64"
      }`}
    >
      {/* 雲 */}
      <span className="absolute left-[12%] top-4 h-4 w-14 rounded-full bg-white/80" aria-hidden />
      <span className="absolute right-[18%] top-8 h-3 w-10 rounded-full bg-white/80" aria-hidden />

      {sim.kind === "jump" && <JumpScene power={sim.power} onDone={finish} />}
      {sim.kind === "run" && <RunScene rule={sim.rule} onDone={finish} />}
      {sim.kind === "coins" && (
        <CoinScene collected={sim.collected} total={sim.total} perCoin={sim.perCoin} onDone={finish} />
      )}

      {result && done && (
        <p
          role="status"
          className={`anim-banner-in absolute inset-x-3 top-3 z-10 flex items-start gap-2 rounded-lg px-3 py-2 text-sm font-bold shadow-md ${
            result.ok ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-700"
          }`}
        >
          {result.ok ? (
            <CircleCheck className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          ) : (
            <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          )}
          {result.text}
        </p>
      )}
    </div>
  );
}

/* ---------- ジャンプ ---------- */

function JumpScene({ power, onDone }: { power: number; onDone: () => void }) {
  const anim = power > 0 ? "anim-jump" : power < 0 ? "anim-sink" : "anim-wobble";
  const mood = power > 0 ? "happy" : "sad";
  const jumpY = `${-Math.min(power, 7) * 18}px`;

  return (
    <>
      <div className="absolute inset-x-0 bottom-0 h-10 bg-emerald-300" aria-hidden />
      <div className="absolute inset-x-0 bottom-10 h-1 bg-emerald-500/60" aria-hidden />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        {/* アニメーションを付けた要素自身で終了を検知する（子の animationend は拾わない） */}
        <div
          className={anim}
          style={{ ["--jump-y" as string]: jumpY }}
          onAnimationEnd={(e) => {
            if (e.target === e.currentTarget) onDone();
          }}
        >
          <Mascot mood={mood} />
        </div>
      </div>
      {/* 地面に沈む表現のため、前面に地面の一部を重ねる */}
      {power < 0 && <div className="absolute inset-x-0 bottom-0 h-[34px] bg-emerald-300" aria-hidden />}
      <p className="absolute bottom-1 left-3 text-[11px] font-bold text-emerald-900/70" aria-hidden>
        jump_power = {power}
      </p>
    </>
  );
}

/* ---------- 走って障害物をよける ---------- */

function RunScene({ rule, onDone }: { rule: "never" | "right" | "early"; onDone: () => void }) {
  const crash = rule !== "right";
  const runClass = crash ? "anim-run-crash" : "anim-run-full";
  const hopClass = rule === "right" ? "anim-hop-right" : rule === "early" ? "anim-hop-early" : "";
  const [crashed, setCrashed] = useState(false);

  return (
    <>
      <div className="absolute inset-x-0 bottom-0 h-10 bg-emerald-300" aria-hidden />
      <div className="absolute inset-x-0 bottom-10 h-1 bg-emerald-500/60" aria-hidden />
      {/* 障害物 */}
      <div
        className={`absolute bottom-10 left-1/2 h-10 w-9 rounded-t-md border-2 border-orange-800 bg-orange-500 ${crashed ? "anim-crash" : ""}`}
        aria-label="障害物"
        role="img"
      >
        <span className="absolute inset-x-1 top-2 h-1 rounded bg-orange-200/80" aria-hidden />
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
          <Mascot mood={crashed ? "sad" : "normal"} className={crashed ? "anim-crash" : ""} />
        </div>
      </div>
      <p className="absolute bottom-1 left-3 text-[11px] font-bold text-emerald-900/70" aria-hidden>
        ← 走る
      </p>
    </>
  );
}

/* ---------- コインを集める ---------- */

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
    const t = window.setTimeout(() => setStep((s) => s + 1), 650);
    return () => window.clearTimeout(t);
  }, [step, collected, onDone]);

  const score = step * perCoin;
  const charLeft = 6 + (step / Math.max(slots, 1)) * 76;

  return (
    <>
      <div className="absolute inset-x-0 bottom-0 h-10 bg-emerald-300" aria-hidden />
      <div className="absolute inset-x-0 bottom-10 h-1 bg-emerald-500/60" aria-hidden />

      <p className="absolute right-3 top-3 z-0 rounded bg-white/90 px-2 py-1 font-mono text-sm font-bold" aria-live="polite">
        score: <span key={score} className="anim-value-pop inline-block">{score}</span>
      </p>

      {/* コイン */}
      <ul className="absolute bottom-24 left-[16%] right-[8%] flex justify-between" aria-label={`コイン ${total}枚`}>
        {Array.from({ length: slots }).map((_, i) => {
          const real = i < total;
          const taken = i < step;
          return (
            <li key={i} aria-hidden>
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-black ${
                  real
                    ? "border-amber-600 bg-paiza-gold text-amber-900"
                    : "border-dashed border-red-400 bg-white/70 text-red-500"
                } ${taken ? "anim-coin-pop" : ""}`}
              >
                {real ? "¢" : "？"}
              </span>
            </li>
          );
        })}
      </ul>

      <div
        className="absolute bottom-10 transition-[left] duration-500 ease-out"
        style={{ left: `${charLeft}%` }}
      >
        <Mascot mood={step > 0 ? "happy" : "normal"} />
      </div>
      <p className="absolute bottom-1 left-3 text-[11px] font-bold text-emerald-900/70" aria-hidden>
        コイン {total} 枚
      </p>
    </>
  );
}
