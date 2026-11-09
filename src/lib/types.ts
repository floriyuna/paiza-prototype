export type Level = "beginner" | "intermediate" | "advanced";
export type GameType = "bug" | "quiz";

/** ゲーム画面で再生するシミュレーションの種類とパラメータ */
export type Sim =
  | { kind: "jump"; power: number }
  | { kind: "run"; rule: "never" | "right" | "early" }
  | { kind: "coins"; collected: number; total: number; perCoin: number };

/** 関連講座（プロトタイプではダミー） */
export interface CourseRef {
  slug: string;
  videoTitle: string;
}

export interface Explanation {
  why: string;
  knowledge: string[];
  course: CourseRef;
}

/** 予測ステップ（上級者向け：修正前に実行結果を当てる） */
export interface PredictStep {
  prompt: string;
  options: { id: string; label: string }[];
  correctId: string;
  feedbackCorrect: string;
  feedbackWrong: string;
}

export interface BugOption {
  id: string;
  /** 修正対象の行に差し込むコード */
  line: string;
  correct: boolean;
  /** この選択肢を選んだときのゲーム内の動き */
  sim: Sim;
  /** 動作後に表示するメッセージ */
  message: string;
}

export interface BugQuestion {
  id: string;
  kind: "bug";
  level: Level;
  title: string;
  story: string;
  instruction: string;
  /** コード全体（1要素＝1行） */
  code: string[];
  /** code の中で修正対象になる行のインデックス */
  fixIndex: number;
  buggySim: Sim;
  buggyMessage: string;
  hint: string;
  predict?: PredictStep;
  options: BugOption[];
  explanation: Explanation & {
    resultBefore: string;
    resultAfter: string;
  };
}

export interface TraceStep {
  /** 実行中の行（0始まり） */
  line: number;
  vars: Record<string, string>;
  note: string;
}

export interface QuizQuestion {
  id: string;
  kind: "quiz";
  level: Level;
  title: string;
  prompt: string;
  code: string[];
  options: { id: string; label: string }[];
  correctId: string;
  /** 実際の実行結果 */
  output: string;
  trace: TraceStep[];
  explanation: Explanation;
}

export type Question = BugQuestion | QuizQuestion;
