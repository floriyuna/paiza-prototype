/**
 * ダミーの講座データ。
 * 実際のpaizaラーニングの教材とは連携していません（プロトタイプ用）。
 */
export interface DummyCourse {
  slug: string;
  title: string;
  summary: string;
  level: "入門" | "初級" | "中級";
  minutes: number;
  chapters: string[];
  color: string;
}

export const COURSES: DummyCourse[] = [
  {
    slug: "python-intro",
    title: "Python入門：変数と計算",
    summary: "変数を「箱」のイメージでつかみ、足し算や引き算をプログラムにしてみよう。",
    level: "入門",
    minutes: 45,
    chapters: ["変数ってなに？ 箱のイメージでつかもう", "数字の計算をしてみよう", "print で結果を表示しよう"],
    color: "#00A3DA",
  },
  {
    slug: "python-if",
    title: "Python入門：if文で分岐",
    summary: "条件によって動きを切り替える if / else を、ゲームの例で学びます。",
    level: "初級",
    minutes: 60,
    chapters: ["if文で動きを切り替えよう", "比較演算子を使いこなそう", "elif で3つ以上に分けよう"],
    color: "#FF8800",
  },
  {
    slug: "python-loop",
    title: "Python入門：繰り返し処理",
    summary: "for と range で、同じ処理を何度も自動で繰り返してみよう。",
    level: "初級",
    minutes: 60,
    chapters: ["for文と range を使いこなそう", "合計を求めてみよう", "while文のしくみ"],
    color: "#E05397",
  },
  {
    slug: "web-basics",
    title: "HTML & CSS 入門",
    summary: "Webページの見た目を作る基本を、手を動かしながら学びます。",
    level: "入門",
    minutes: 90,
    chapters: ["HTMLの基本のタグ", "CSSで色をつけよう", "レイアウトに挑戦"],
    color: "#00A3DA",
  },
  {
    slug: "git-basics",
    title: "Git・GitHub はじめの一歩",
    summary: "変更履歴を残すしくみを、図とコマンドで理解しよう。",
    level: "中級",
    minutes: 75,
    chapters: ["コミットってなに？", "ブランチを切ってみよう", "GitHub に push しよう"],
    color: "#777777",
  },
];

export interface DummyPath {
  title: string;
  summary: string;
  courseSlugs: string[];
}

export const LEARNING_PATHS: DummyPath[] = [
  {
    title: "Pythonはじめの一歩パス",
    summary: "変数・if・for の3ステップで、Pythonの基礎をひと通り。",
    courseSlugs: ["python-intro", "python-if", "python-loop"],
  },
  {
    title: "Webページを作ってみようパス",
    summary: "HTML & CSS から、公開までの流れをつかみます。",
    courseSlugs: ["web-basics", "git-basics"],
  },
];

export function getCourse(slug: string): DummyCourse | undefined {
  return COURSES.find((c) => c.slug === slug);
}
