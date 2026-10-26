import type { BugQuestion, GameType, Level, Question, QuizQuestion } from "./types";

/**
 * 問題データ。
 * 問題を増やすときは、この配列にオブジェクトを追加するだけでOKです
 * （level と kind でグルーピングされます）。
 */

const bugQuestions: BugQuestion[] = [
  {
    id: "bug-beginner-1",
    kind: "bug",
    level: "beginner",
    title: "ジャンプできないコードくん",
    story: "コードくんがジャンプしようとしているのに、ぜんぜん跳べません…。",
    instruction: "キャラクターがジャンプできない！ 数字を変えて直してみよう！",
    code: [
      "# ジャンプの強さを決める",
      "jump_power = 0",
      "",
      "# ジャンプする！",
      "jump(jump_power)",
    ],
    fixIndex: 1,
    buggySim: { kind: "jump", power: 0 },
    buggyMessage: "ジャンプしようとしても、その場から動けない…",
    hint: "「ジャンプの強さ」がゼロだと、どうなるかな？ プラスの数字を試してみよう。",
    options: [
      {
        id: "a",
        line: "jump_power = 0",
        correct: false,
        sim: { kind: "jump", power: 0 },
        message: "ぜんぜん跳べない…。強さが 0 のままだと、力がゼロだよ。",
      },
      {
        id: "b",
        line: "jump_power = 5",
        correct: true,
        sim: { kind: "jump", power: 5 },
        message: "やった！ 高くジャンプできた！",
      },
      {
        id: "c",
        line: "jump_power = -5",
        correct: false,
        sim: { kind: "jump", power: -5 },
        message: "あれっ、地面にめり込んだ！ マイナスは「逆向き」の力になるよ。",
      },
    ],
    explanation: {
      why: "jump_power は「ジャンプの強さ」を入れておく変数です。中身が 0 だと強さがゼロなので、ジャンプしようとしても体が浮きません。5 のようなプラスの数字を入れると、上向きの力がはたらいて跳べるようになります。",
      resultBefore: "ジャンプの高さ = 0（その場から動かない）",
      resultAfter: "ジャンプの高さ = 5（ぴょんと高く跳べる）",
      knowledge: [
        "変数は「数字や文字を入れておく箱」。名前（jump_power）と中身（0 や 5）でできています。",
        "箱の中身の数字を変えるだけで、プログラムの動きが変わります。",
        "マイナスの数字は「逆向き」を表すことがよくあります。",
      ],
      course: { slug: "python-intro", videoTitle: "変数ってなに？ 箱のイメージでつかもう" },
    },
  },
  {
    id: "bug-intermediate-1",
    kind: "bug",
    level: "intermediate",
    title: "障害物をよけないコードくん",
    story: "走っているコードくんが、前にある障害物にぶつかってしまいます。",
    instruction: "障害物が近づいたらジャンプしたい！ if の条件を直してみよう。",
    code: [
      "# 障害物までの距離が 5, 4, 3, 2, 1 と近づいてくる",
      "for obstacle_distance in [5, 4, 3, 2, 1]:",
      "    if obstacle_distance < 0:",
      "        jump()",
    ],
    fixIndex: 2,
    buggySim: { kind: "run", rule: "never" },
    buggyMessage: "ジャンプせずに、障害物にぶつかった…",
    hint: "距離は 5 → 1 と小さくなるだけ。0 より小さくなることはあるかな？",
    options: [
      {
        id: "a",
        line: "    if obstacle_distance < 0:",
        correct: false,
        sim: { kind: "run", rule: "never" },
        message: "条件が一度も当てはまらず、ジャンプしないままぶつかった！",
      },
      {
        id: "b",
        line: "    if obstacle_distance <= 2:",
        correct: true,
        sim: { kind: "run", rule: "right" },
        message: "ちょうどいいタイミングでジャンプ！ 障害物を飛び越えた！",
      },
      {
        id: "c",
        line: "    if obstacle_distance > 2:",
        correct: false,
        sim: { kind: "run", rule: "early" },
        message: "ジャンプが早すぎて、着地したところでぶつかった！",
      },
    ],
    explanation: {
      why: "距離は 5, 4, 3, 2, 1 と小さくなるだけで、0 より小さくなることはありません。そのため「obstacle_distance < 0」は一度も True にならず、jump() が呼ばれませんでした。「近づいたとき（2 以下）」という条件にすると、ちょうどいいタイミングでジャンプできます。",
      resultBefore: "jump() が 0 回呼ばれる → 障害物にぶつかる",
      resultAfter: "距離が 2 と 1 のときに jump() が呼ばれる → 飛び越える",
      knowledge: [
        "if は「条件が True のときだけ、中の処理を実行する」しくみです。",
        "<（より小さい）、<=（以下）、>（より大きい）などの比較で条件を作ります。",
        "for は、リストの値を順番に取り出しながら同じ処理を繰り返します。",
      ],
      course: { slug: "python-if", videoTitle: "if文で動きを切り替えよう" },
    },
  },
  {
    id: "bug-advanced-1",
    kind: "bug",
    level: "advanced",
    title: "コインが1枚取れない！",
    story: "コインは3枚あるのに、最後の1枚だけ取り残されてしまいます。",
    instruction: "まず、このコードを実行すると score がいくつになるか予想してみよう。そのあとバグを直してね。",
    code: [
      "score = 0",
      "coins = 3",
      "for i in range(coins - 1):",
      "    score = score + 10",
      "print(score)",
    ],
    fixIndex: 2,
    buggySim: { kind: "coins", collected: 2, total: 3, perCoin: 10 },
    buggyMessage: "コインが1枚取り残された！ score は 20 のまま…",
    hint: "range(n) は「n 回」繰り返すよ。コインは何枚あったかな？",
    predict: {
      prompt: "このまま実行すると、最後に表示される score はいくつ？",
      options: [
        { id: "10", label: "10" },
        { id: "20", label: "20" },
        { id: "30", label: "30" },
        { id: "40", label: "40" },
      ],
      correctId: "20",
      feedbackCorrect: "正解！ range(coins - 1) は range(2) なので 2 回だけ繰り返し、10 + 10 = 20 になります。コインは3枚あるのに…？",
      feedbackWrong: "実際は 20 でした。range(coins - 1) は range(2)。2 回しか繰り返さないので 10 + 10 = 20 です。",
    },
    options: [
      {
        id: "a",
        line: "for i in range(coins - 1):",
        correct: false,
        sim: { kind: "coins", collected: 2, total: 3, perCoin: 10 },
        message: "変えていないので、また1枚取り残された！ score は 20 だよ。",
      },
      {
        id: "b",
        line: "for i in range(coins):",
        correct: true,
        sim: { kind: "coins", collected: 3, total: 3, perCoin: 10 },
        message: "3枚ぜんぶ取れた！ score は 30！",
      },
      {
        id: "c",
        line: "for i in range(coins + 1):",
        correct: false,
        sim: { kind: "coins", collected: 4, total: 3, perCoin: 10 },
        message: "ないはずの4枚目まで取ろうとして、score が 40 になっちゃった！",
      },
    ],
    explanation: {
      why: "繰り返しの回数が coins - 1 = 2 回になっていたため、3枚目のコインに手が届きませんでした。コインの枚数ちょうどの回数だけ繰り返したいので、range(coins) が正解です。このような「回数が1つズレる」バグは、プログラミングでとてもよく起こります。",
      resultBefore: "score = 20（コイン2枚ぶん）",
      resultAfter: "score = 30（コイン3枚ぶん）",
      knowledge: [
        "range(n) は 0 から n-1 まで、ちょうど n 回の繰り返しを作ります。",
        "回数が1つズレるバグは「境界の1つズレ（off-by-one）」と呼ばれます。",
        "枚数を変数 coins にしておくと、枚数が変わってもコードを直さずに済みます。",
      ],
      course: { slug: "python-loop", videoTitle: "for文と range を使いこなそう" },
    },
  },
];

const quizQuestions: QuizQuestion[] = [
  {
    id: "quiz-beginner-1",
    kind: "quiz",
    level: "beginner",
    title: "変数の中身はどうなる？",
    prompt: "このコードを実行すると、画面には何が表示される？",
    code: ["x = 5", "x = x + 3", "print(x)"],
    options: [
      { id: "3", label: "3" },
      { id: "5", label: "5" },
      { id: "8", label: "8" },
      { id: "15", label: "15" },
    ],
    correctId: "8",
    output: "8",
    trace: [
      { line: 0, vars: { x: "5" }, note: "x という箱に 5 を入れます。" },
      { line: 1, vars: { x: "8" }, note: "「今の x（5）＋ 3」を計算して、結果の 8 を x に入れ直します。" },
      { line: 2, vars: { x: "8" }, note: "x の中身 8 を画面に表示します。" },
    ],
    explanation: {
      why: "2行目の「=」は「等しい」ではなく、「右側の計算結果を左側の箱に入れる」という命令です。x の中身 5 に 3 を足した 8 が x に入り直すので、表示されるのは 8 です。",
      knowledge: [
        "「=」は「右の計算結果を左の変数に入れる」命令（代入）です。",
        "変数の中身は、あとから何度でも入れ替えられます。",
        "print() は、値を画面に表示する命令です。",
      ],
      course: { slug: "python-intro", videoTitle: "変数ってなに？ 箱のイメージでつかもう" },
    },
  },
  {
    id: "quiz-intermediate-1",
    kind: "quiz",
    level: "intermediate",
    title: "繰り返しで合計を求める",
    prompt: "このコードを実行すると、画面には何が表示される？",
    code: ["total = 0", "for i in range(1, 4):", "    total = total + i", "print(total)"],
    options: [
      { id: "3", label: "3" },
      { id: "4", label: "4" },
      { id: "6", label: "6" },
      { id: "10", label: "10" },
    ],
    correctId: "6",
    output: "6",
    trace: [
      { line: 0, vars: { total: "0" }, note: "total を 0 にしておきます。" },
      { line: 2, vars: { i: "1", total: "1" }, note: "i が 1 のとき：total = 0 + 1 = 1" },
      { line: 2, vars: { i: "2", total: "3" }, note: "i が 2 のとき：total = 1 + 2 = 3" },
      { line: 2, vars: { i: "3", total: "6" }, note: "i が 3 のとき：total = 3 + 3 = 6" },
      { line: 3, vars: { total: "6" }, note: "繰り返しが終わったので、total の 6 を表示します。" },
    ],
    explanation: {
      why: "range(1, 4) は 1, 2, 3 の3つの数を作ります（最後の 4 は含みません）。i が 1, 2, 3 と変わるたびに total へ足していくので、0 + 1 + 2 + 3 = 6 になります。",
      knowledge: [
        "range(a, b) は a 以上 b「未満」の数を順に作ります。",
        "for の中では、i の値が1回ごとに変わっていきます。",
        "total のように値を足し込んでいく変数は「合計の入れ物」として定番です。",
      ],
      course: { slug: "python-loop", videoTitle: "for文と range を使いこなそう" },
    },
  },
  {
    id: "quiz-advanced-1",
    kind: "quiz",
    level: "advanced",
    title: "ループの中で条件が切り替わる",
    prompt: "このコードを実行すると、画面には何が表示される？ 紙に表を書くつもりで追ってみよう。",
    code: [
      "x = 10",
      "for i in range(3):",
      "    if i % 2 == 0:",
      "        x = x - i",
      "    else:",
      "        x = x + i",
      "print(x)",
    ],
    options: [
      { id: "9", label: "9" },
      { id: "10", label: "10" },
      { id: "11", label: "11" },
      { id: "13", label: "13" },
    ],
    correctId: "9",
    output: "9",
    trace: [
      { line: 0, vars: { x: "10" }, note: "x を 10 にしておきます。" },
      { line: 3, vars: { i: "0", x: "10" }, note: "i = 0 は偶数（0 % 2 == 0）なので、x = 10 - 0 = 10" },
      { line: 5, vars: { i: "1", x: "11" }, note: "i = 1 は奇数なので else 側。x = 10 + 1 = 11" },
      { line: 3, vars: { i: "2", x: "9" }, note: "i = 2 は偶数なので、x = 11 - 2 = 9" },
      { line: 6, vars: { x: "9" }, note: "繰り返しが終わったので、x の 9 を表示します。" },
    ],
    explanation: {
      why: "i は 0, 1, 2 と変わります。偶数のときは x から i を引き、奇数のときは x に i を足します。10 → 10（i=0）→ 11（i=1）→ 9（i=2）と変化して、最後は 9 になります。「全部足す」と考えると 13 になってしまうので注意しましょう。",
      knowledge: [
        "% は割り算の「余り」。i % 2 == 0 は「i は偶数」という意味です。",
        "if / else で、条件によって別の処理に分けられます。",
        "ループの中では変数が少しずつ変わります。1回ごとの値を表にして追うと間違えにくくなります。",
      ],
      course: { slug: "python-if", videoTitle: "if文で動きを切り替えよう" },
    },
  },
];

export const ALL_QUESTIONS: Question[] = [...bugQuestions, ...quizQuestions];

export const LEVEL_ORDER: Level[] = ["beginner", "intermediate", "advanced"];
export const GAME_TYPES: GameType[] = ["bug", "quiz"];

export function getQuestion(level: Level, type: GameType): Question {
  const found = ALL_QUESTIONS.find((q) => q.level === level && q.kind === type);
  // 型・レベルの組み合わせは必ず1問以上ある想定。念のため先頭にフォールバック
  return found ?? ALL_QUESTIONS[0];
}

/** 学習順（レベル順 → バグ修正 → クイズ） */
export const QUESTION_SEQUENCE: Question[] = LEVEL_ORDER.flatMap((level) =>
  GAME_TYPES.map((type) => getQuestion(level, type)),
);

/**
 * 「もう一問挑戦する」で出す問題。
 * 現在の次から順に見て、未クリアの問題を優先する。全部クリア済みなら単に次の問題。
 */
export function nextQuestion(current: Question, clearedIds: string[]): Question {
  const idx = QUESTION_SEQUENCE.findIndex((q) => q.id === current.id);
  const n = QUESTION_SEQUENCE.length;
  for (let step = 1; step < n; step++) {
    const candidate = QUESTION_SEQUENCE[(idx + step) % n];
    if (!clearedIds.includes(candidate.id)) return candidate;
  }
  return QUESTION_SEQUENCE[(idx + 1) % n];
}

export function otherType(type: GameType): GameType {
  return type === "bug" ? "quiz" : "bug";
}
