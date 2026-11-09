import { useCallback, useMemo, useSyncExternalStore } from "react";
import type { Level } from "./types";

/**
 * ゲストの学習状況を localStorage に保存する。
 * アカウント機能はプロトタイプのため実装していません。
 */

const KEY = "paiza-proto-guest-v1";
const EVENT = "paiza-proto-guest-change";

export interface AnswerLog {
  questionId: string;
  correct: boolean;
  at: string;
}

export interface GuestState {
  level: Level | null;
  surveyDone: boolean;
  /** クリア済みの問題 */
  cleared: Record<string, { at: string; attempts: number }>;
  /** 回答履歴（最新100件） */
  log: AnswerLog[];
  /** 初回の達成画面を見たか */
  achievementSeen: boolean;
  /** 達成画面での選択 */
  choice: "guest" | "signup" | null;
}

export const DEFAULT_STATE: GuestState = {
  level: null,
  surveyDone: false,
  cleared: {},
  log: [],
  achievementSeen: false,
  choice: null,
};

function parse(raw: string | null): GuestState {
  if (!raw) return DEFAULT_STATE;
  try {
    const data = JSON.parse(raw) as Partial<GuestState>;
    return { ...DEFAULT_STATE, ...data };
  } catch {
    return DEFAULT_STATE;
  }
}

function readRaw(): string {
  try {
    return window.localStorage.getItem(KEY) ?? "";
  } catch {
    return "";
  }
}

function subscribe(callback: () => void): () => void {
  window.addEventListener("storage", callback);
  window.addEventListener(EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(EVENT, callback);
  };
}

export function updateGuest(updater: (prev: GuestState) => GuestState): void {
  const next = updater(parse(readRaw()));
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // localStorage が使えない環境では保存せずに続行する
  }
  window.dispatchEvent(new Event(EVENT));
}

export function resetGuest(): void {
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    // noop
  }
  window.dispatchEvent(new Event(EVENT));
}

/** ゲスト状態を読むフック。hydrated が false の間はサーバー描画と同じ初期値 */
export function useGuest() {
  const raw = useSyncExternalStore(subscribe, readRaw, () => null);
  const hydrated = raw !== null;
  const state = useMemo(() => parse(raw), [raw]);

  const update = useCallback((updater: (prev: GuestState) => GuestState) => {
    updateGuest(updater);
  }, []);

  return { state, hydrated, update };
}

export function recordAnswer(prev: GuestState, questionId: string, correct: boolean, attempts: number): GuestState {
  const at = new Date().toISOString();
  const log = [...prev.log, { questionId, correct, at }].slice(-100);
  const cleared =
    correct && !prev.cleared[questionId]
      ? { ...prev.cleared, [questionId]: { at, attempts } }
      : prev.cleared;
  return { ...prev, log, cleared };
}
