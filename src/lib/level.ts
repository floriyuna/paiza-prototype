import type { Level } from "./types";

export const LEVEL_LABEL: Record<Level, string> = {
  beginner: "初心者",
  intermediate: "中級者",
  advanced: "上級者",
};

export const LEVEL_HINT: Record<Level, string> = {
  beginner: "はじめて・ほとんど初めて",
  intermediate: "if や for が少し分かる",
  advanced: "コードを書いて解決できる",
};

export interface SurveyQuestion {
  id: "q1" | "q2";
  title: string;
  options: { label: string; score: number }[];
}

export const SURVEY: SurveyQuestion[] = [
  {
    id: "q1",
    title: "プログラミングをどのくらい経験したことがありますか？",
    options: [
      { label: "初めて触れる", score: 0 },
      { label: "授業などで少し触れたことがある", score: 1 },
      { label: "簡単なプログラムなら作れる", score: 2 },
      { label: "普段からプログラミングをしている", score: 3 },
    ],
  },
  {
    id: "q2",
    title: "次のうち、最も近いものはどれですか？",
    options: [
      { label: "コードを見ても何が書いてあるか分からない", score: 0 },
      { label: "簡単なコードなら何となく理解できる", score: 1 },
      { label: "条件分岐や繰り返し処理を理解している", score: 2 },
      { label: "自分でコードを書いて問題を解決できる", score: 3 },
    ],
  },
];

/** 2問の合計点（0〜6）から3段階に分類する */
export function judgeLevel(q1Score: number, q2Score: number): Level {
  const total = q1Score + q2Score;
  if (total <= 2) return "beginner";
  if (total <= 4) return "intermediate";
  return "advanced";
}
