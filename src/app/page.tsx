import Link from "next/link";
import {
  BookOpen,
  ChevronRight,
  Code2,
  Compass,
  Gamepad2,
  Layers,
  Sparkles,
  Play,
  Terminal,
  Trophy,
  ArrowRight,
  Clock,
  CheckCircle2,
} from "lucide-react";
import CourseCard from "@/components/CourseCard";
import StartButton from "@/components/StartButton";
import { COURSES, LEARNING_PATHS } from "@/lib/courses";

/** 本家paizaラーニングから取得した公式学習パスデータ */
const OFFICIAL_LEARNING_PATHS = [
  {
    id: 11,
    title: "Webサイトを作りたい レベル1",
    level: "Lv.1",
    levelColor: "#5468DF",
    steps: 14,
    hours: 2,
    desc: "HTML/CSSの基礎からWebページ制作の第一歩を学びます",
  },
  {
    id: 10,
    title: "Webサイトを作りたい レベル2",
    level: "Lv.2",
    levelColor: "#5468DF",
    steps: 19,
    hours: 4,
    desc: "レスポンシブデザインやJavaScriptによる動きを実装します",
  },
  {
    id: 12,
    title: "Pythonでアプリ・ゲームを作りたい",
    level: "Lv.1",
    levelColor: "#00A3DA",
    steps: 16,
    hours: 3,
    desc: "文法の基礎からミニゲーム・自動化スクリプトを作成します",
  },
  {
    id: 13,
    title: "Cランク・Bランクを取りたい",
    level: "Lv.2",
    levelColor: "#FF8800",
    steps: 22,
    hours: 5,
    desc: "スキルチェックで就職・転職に直結するランク獲得を目指します",
  },
];

/** 本家paizaラーニングのLevelUp問題集カテゴリ */
const MONDAI_CATEGORIES = [
  { title: "最初の一歩", desc: "標準入力や四則演算の超基本", count: 12 },
  { title: "基礎文法", desc: "条件分岐 (if) とループ (for/while)", count: 24 },
  { title: "Dランク獲得", desc: "スキルチェックDランク相当の問題集", count: 35 },
  { title: "Cランク獲得", desc: "実用的な配列操作と文字列処理", count: 48 },
  { title: "Bランク獲得", desc: "2次元配列やシミュレーション問題", count: 40 },
  { title: "定番アルゴリズム", desc: "ソート・探索・累積和など", count: 30 },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f5f7fa] text-[#333333]">
      {/* 1. パンくずリスト（本家の s-breadcrumb 準拠） */}
      <div className="border-b border-[#ededed] bg-white py-2 text-xs text-[#6e7687]">
        <div className="mx-auto flex max-w-[1240px] items-center gap-1.5 px-4">
          <Link href="/" className="hover:text-[#0d6bd3] hover:underline">
            paizaトップ
          </Link>
          <span>&gt;</span>
          <span className="font-bold text-[#333333]">学習トップ</span>
        </div>
      </div>

      <div className="mx-auto max-w-[1240px] px-4 py-8">
        {/* 2. メインビジュアル / UX提案ヒーロー */}
        <section
          aria-labelledby="hero-title"
          className="mb-10 overflow-hidden rounded-[4px] border border-[#d7e0e2] bg-white shadow-[0_1px_4px_rgba(0,0,0,0.15)]"
        >
          <div className="grid lg:grid-cols-12 items-center">
            {/* 左側：メッセージとCTA */}
            <div className="p-6 md:p-10 lg:col-span-7">
              <div className="mb-3 inline-flex items-center gap-1.5 rounded-[2px] bg-[#f6faff] border border-[#d2e3fc] px-2.5 py-1 text-xs font-bold text-[#0d6bd3]">
                <Sparkles className="h-3.5 w-3.5" />
                登録なし・5秒で開始できる新学習体験
              </div>

              <h1
                id="hero-title"
                className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-[#333333]"
              >
                まずは遊んでみよう。
                <br />
                <span className="text-[#0d6bd3]">登録なし</span>でプログラミング体験！
              </h1>

              <p className="mt-3 text-xs sm:text-sm text-[#555555] leading-relaxed max-w-xl">
                面倒な環境構築は不要、Webブラウザがあれば今すぐ学習が開始できます。
                ゲームやクイズを通して、まずはプログラミングの面白さを体験してみよう。
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href="/survey"
                  className="inline-flex items-center justify-center gap-2 rounded-[4px] bg-[#ff8800] hover:bg-[#e67a00] text-white px-7 py-3.5 font-bold text-base shadow-[0_1px_4px_rgba(0,0,0,0.25)] transition"
                >
                  <Gamepad2 className="h-5 w-5" />
                  さっそく体験する（無料）
                </Link>

                <Link
                  href="/courses"
                  className="inline-flex items-center justify-center gap-1.5 rounded-[4px] border border-[#0d6bd3] bg-white hover:bg-[#f6faff] text-[#0d6bd3] px-5 py-3.5 font-bold text-sm transition"
                >
                  <BookOpen className="h-4 w-4" />
                  講座一覧を見る
                </Link>
              </div>

              <div className="mt-6 flex items-center gap-4 text-[11px] text-[#6e7687] pt-4 border-t border-[#ededed]">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#1fa463]" /> 1本3分の動画
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#1fa463]" /> ブラウザ完結エディタ
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#1fa463]" /> 初心者〜中級者対応
                </span>
              </div>
            </div>

            {/* 右側：paiza学習画面のリアルなモックアッププレビュー */}
            <div className="bg-[#1e293b] p-6 lg:col-span-5 h-full flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-[#d7e0e2]">
              <div className="rounded-[4px] overflow-hidden border border-slate-700 bg-slate-900 shadow-lg text-xs font-mono">
                {/* エディタヘッダー */}
                <div className="bg-[#121922] px-3 py-1.5 flex items-center justify-between text-slate-400 border-b border-slate-700">
                  <span className="text-slate-200 font-bold">Main.py (Python3)</span>
                  <span className="text-[10px] text-emerald-400">● 実行可能</span>
                </div>

                {/* コード表示 */}
                <div className="p-3 text-slate-300 leading-6 text-[11px]">
                  <div className="text-slate-500"># バグを修正してゲームを動かそう</div>
                  <div><span className="text-purple-400">def</span> <span className="text-blue-400">jump</span>(power):</div>
                  <div className="bg-rose-500/20 text-rose-300 px-1 rounded">
                    &nbsp;&nbsp;jump_power = 0  <span className="text-rose-400 text-[10px]"># ←ここを直す！</span>
                  </div>
                  <div>&nbsp;&nbsp;player.move_y(jump_power)</div>
                </div>

                {/* 実行ボタンモック */}
                <div className="bg-[#1a2332] p-2.5 flex items-center justify-between border-t border-slate-700">
                  <span className="text-[10px] text-slate-400">選択肢をタップして即修正</span>
                  <div className="bg-[#1fa463] text-white px-3 py-1 rounded-[2px] font-bold text-[11px] flex items-center gap-1">
                    <Play className="h-3 w-3 fill-current" /> コードを実行
                  </div>
                </div>
              </div>

              <div className="mt-3 text-center">
                <span className="text-[11px] text-slate-400">
                  アカウント登録なしですぐにこのエディタで体験できます
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. 本家 paiza 学習パス一覧（LearningPathOverviewCard） */}
        <section aria-labelledby="learning-paths-title" className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 id="learning-paths-title" className="text-lg font-bold text-[#333333] flex items-center gap-2">
                <Compass className="h-5 w-5 text-[#0d6bd3]" />
                学習パス一覧
              </h2>
              <p className="text-xs text-[#6e7687] mt-0.5">
                目的や作りたいものに合わせて、最適なレッスン順で学習を進められます
              </p>
            </div>
            <Link href="/courses#paths" className="text-xs font-bold text-[#0d6bd3] hover:underline flex items-center gap-0.5">
              すべて見る
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {OFFICIAL_LEARNING_PATHS.map((path) => (
              <div
                key={path.id}
                className="group flex flex-col justify-between rounded-[4px] bg-white p-4 shadow-[0_0_4px_rgba(0,0,0,0.18)] hover:shadow-[0_2px_8px_rgba(0,0,0,0.22)] transition"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold shadow-xs"
                      style={{ backgroundColor: "#F6FAFF", color: path.levelColor }}
                    >
                      {path.level}
                    </span>
                    <span className="text-[11px] text-[#6e7687]">
                      {path.steps}ステップ・約{path.hours}時間
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-[#333333] group-hover:text-[#0d6bd3] transition line-clamp-1">
                    {path.title}
                  </h3>

                  <p className="mt-1.5 text-xs text-[#6e7687] leading-relaxed line-clamp-2">
                    {path.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#ededed] flex items-center justify-between text-xs font-bold text-[#0d6bd3]">
                  <span>学習を始める</span>
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. 本家 人気の講座（PopularWorkGroups） */}
        <section aria-labelledby="popular-courses-title" className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 id="popular-courses-title" className="text-lg font-bold text-[#333333] flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-[#0d6bd3]" />
                人気の講座一覧
              </h2>
              <p className="text-xs text-[#6e7687] mt-0.5">
                まずはここから！受講者数が多く初心者におすすめの講座です
              </p>
            </div>
            <Link href="/courses" className="text-xs font-bold text-[#0d6bd3] hover:underline flex items-center gap-0.5">
              講座一覧へ
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {COURSES.slice(0, 3).map((c) => (
              <CourseCard key={c.slug} course={c} />
            ))}
          </ul>
        </section>

        {/* 5. 本家 レベルアップ問題集カテゴリ一覧（mondai カテゴリ） */}
        <section aria-labelledby="mondai-title" className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 id="mondai-title" className="text-lg font-bold text-[#333333] flex items-center gap-2">
                <Terminal className="h-5 w-5 text-[#0d6bd3]" />
                レベルアップ問題集
              </h2>
              <p className="text-xs text-[#6e7687] mt-0.5">
                基礎文法の定着からスキルチェック対策まで、豊富な練習問題を用意しています
              </p>
            </div>
            <Link href="/learn" className="text-xs font-bold text-[#0d6bd3] hover:underline flex items-center gap-0.5">
              問題集トップへ
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {MONDAI_CATEGORIES.map((cat) => (
              <Link
                key={cat.title}
                href="/learn"
                className="group flex flex-col justify-between rounded-[4px] bg-white p-3.5 border border-[#ededed] shadow-xs hover:border-[#0d6bd3] hover:shadow-xs transition"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-[#333333] group-hover:text-[#0d6bd3] transition">
                    {cat.title}
                  </span>
                  <span className="text-[10px] text-[#6e7687] bg-slate-100 px-1.5 py-0.5 rounded">
                    全{cat.count}問
                  </span>
                </div>
                <p className="text-[11px] text-[#6e7687]">{cat.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* 6. 本家スタイルのCTAバナー */}
        <div className="rounded-[4px] border border-[#d2e3fc] bg-[#f6faff] p-8 text-center shadow-xs">
          <h2 className="text-xl font-bold text-[#333333] mb-2">
            まずは登録なしでプログラミングの楽しさを体験してみよう
          </h2>
          <p className="text-xs text-[#555555] max-w-lg mx-auto mb-6 leading-relaxed">
            ゲームのバグを修正したり、コードの実行結果を予想したり。
            初心者でも直感的にプログラミングの思考が学べます。
          </p>
          <Link
            href="/survey"
            className="inline-flex items-center justify-center gap-2 rounded-[4px] bg-[#ff8800] hover:bg-[#e67a00] text-white px-8 py-3.5 font-bold text-base shadow-[0_1px_4px_rgba(0,0,0,0.25)] transition"
          >
            <Gamepad2 className="h-5 w-5" />
            さっそく体験する（無料・約3分）
          </Link>
        </div>
      </div>
    </div>
  );
}
