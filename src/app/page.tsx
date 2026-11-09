import Link from "next/link";
import {
  Brain,
  Bug,
  Clock,
  Gift,
  ListChecks,
  MonitorPlay,
  Terminal,
  Sparkles,
  ChevronRight,
  Flame,
  CheckCircle2,
  Code2,
} from "lucide-react";
import CourseCard from "@/components/CourseCard";
import Mascot from "@/components/Mascot";
import StartButton from "@/components/StartButton";
import { COURSES, LEARNING_PATHS, getCourse } from "@/lib/courses";

const LANGUAGES = [
  { name: "Python", color: "bg-blue-600", tag: "大人気", desc: "AI・データ分析" },
  { name: "Java", color: "bg-amber-600", tag: "定番", desc: "Web・業務開発" },
  { name: "JavaScript", color: "bg-yellow-500", tag: "必須", desc: "フロントエンド" },
  { name: "C#", color: "bg-purple-600", tag: "ゲーム開発", desc: "Unity・アプリ" },
  { name: "Ruby", color: "bg-rose-600", tag: "Web入門", desc: "Ruby on Rails" },
  { name: "PHP", color: "bg-indigo-600", tag: "Web開発", desc: "WordPress" },
  { name: "SQL", color: "bg-teal-600", tag: "データベース", desc: "データ抽出" },
  { name: "HTML/CSS", color: "bg-orange-600", tag: "入門おすすめ", desc: "Web制作" },
];

const FEATURES = [
  {
    icon: Clock,
    title: "1本3分の動画レッスン",
    desc: "スキマ時間でもサクサク進められる！要点をギュッと凝縮した3分動画で無理なく学べます。",
    badge: "タイパ抜群",
  },
  {
    icon: Terminal,
    title: "環境構築不要・ブラウザ完結",
    desc: "面倒なインストールは一切なし。画面内のオンラインエディタでコードを書いてすぐ動かせます。",
    badge: "即スタート",
  },
  {
    icon: Sparkles,
    title: "登録なしでまず体験！",
    desc: "アカウントを作る前に、ミニゲームやクイズでコードの面白さを体験。納得してから続けられます。",
    badge: "新UX提案",
  },
];

const STEPS = [
  {
    step: "01",
    icon: ListChecks,
    title: "2問のかんたんアンケート",
    text: "タップするだけ！あなたの経験に合わせて「初心者・中級者・上級者」を自動で判定します。",
  },
  {
    step: "02",
    icon: Bug,
    title: "バグ修正ゲームで体験",
    text: "動かないゲームのコードを1行直して正常に！直感的な選択肢で試行錯誤できます。",
  },
  {
    step: "03",
    icon: Brain,
    title: "「なぜ？」が分かる解説",
    text: "コードの実行結果と変数の変化を図解。「動いた理由」までしっかり理解できます。",
  },
  {
    step: "04",
    icon: Gift,
    title: "達成バッジ＆選べる学習",
    text: "クリア後はゲストのまま他の問題を解くのも、アカウントを作って本格的に学ぶのも自由！",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F4F7F9]">
      {/* 1. ヒーローセクション（paizaラーニング公式風ビジュアル） */}
      <section
        aria-labelledby="hero-title"
        className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-[#E6F6FC] via-[#F4F7F9] to-white pb-12 pt-8 md:pb-16 md:pt-12"
      >
        <div className="mx-auto max-w-7xl px-4">
          {/* 上部バッジ */}
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#00A3DA] px-3 py-1 text-xs font-bold text-white shadow-sm">
              <Sparkles className="h-3.5 w-3.5" />
              新しい学習体験UX
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-700 border border-slate-200 shadow-sm">
              <Clock className="h-3.5 w-3.5 text-[#00A3DA]" />
              登録不要・約3分で体験可能
            </span>
          </div>

          <div className="grid items-center gap-8 lg:grid-cols-12">
            {/* 左側：メインメッセージ & CTA */}
            <div className="lg:col-span-7">
              <h1
                id="hero-title"
                className="text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl sm:leading-tight lg:text-5xl lg:leading-[1.18]"
              >
                まずは遊んでみよう。
                <br />
                <span className="text-[#00A3DA]">登録なし</span>で
                <span className="relative inline-block ml-1">
                  プログラミング体験！
                  <span className="absolute -bottom-1 left-0 right-0 h-2 bg-[#FF8800]/20 -z-10 rounded-sm" />
                </span>
              </h1>

              <p className="mt-4 max-w-2xl text-base text-slate-600 leading-relaxed md:text-lg">
                ゲームやクイズを通して、プログラミングの楽しさを体験してみよう。
                面倒なアカウント登録や環境構築は不要。初心者でも大丈夫！
              </p>

              {/* メインボタンエリア */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <StartButton />
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-[#00A3DA] bg-white px-6 py-3.5 text-base font-bold text-[#00A3DA] hover:bg-[#E6F6FC] transition shadow-sm"
                >
                  <MonitorPlay className="h-5 w-5" />
                  講座一覧を見る
                </Link>
              </div>

              {/* 案内役キャラクターの吹き出し */}
              <div className="mt-8 flex items-center gap-3 rounded-2xl bg-white p-3.5 border border-slate-200/80 shadow-sm max-w-lg">
                <Mascot mood="happy" size="md" />
                <div className="text-xs md:text-sm text-slate-700">
                  <p className="font-bold text-[#00A3DA]">paizaラーニング ナビゲーター</p>
                  <p className="text-slate-600 mt-0.5">
                    「まずは2問の質問に答えるだけ！あなたにぴったりのレベルから遊んでみてくださいね！」
                  </p>
                </div>
              </div>
            </div>

            {/* 右側：paizaラーニング学習画面のリアルなモックアッププレビュー */}
            <div className="lg:col-span-5" aria-hidden="true">
              <div className="relative mx-auto max-w-md rounded-2xl border border-slate-300/80 bg-slate-900 p-2 shadow-2xl">
                {/* エディタウィンドウのヘッダーバー */}
                <div className="flex items-center justify-between border-b border-slate-800 px-3 py-1.5 text-xs text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    <span className="ml-2 font-mono text-[11px] text-slate-300">game_main.py (Python3)</span>
                  </div>
                  <span className="rounded bg-[#00A3DA] px-2 py-0.5 text-[10px] font-bold text-white">
                    体験レッスン
                  </span>
                </div>

                {/* ゲームプレビュー画面 */}
                <div className="relative h-40 overflow-hidden rounded-lg bg-gradient-to-b from-sky-200 via-sky-100 to-emerald-200 border border-slate-700 mt-1">
                  <div className="absolute top-2 left-2 rounded bg-black/60 px-2 py-0.5 text-[10px] font-mono text-emerald-300">
                    STAGE 1: JUMP PUZZLE
                  </div>
                  {/* ステージ内のキャラクター */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
                    <div className="rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold text-rose-600 shadow-sm mb-1 animate-bounce">
                      ジャンプできない！
                    </div>
                    <div className="h-10 w-10 rounded-xl bg-[#00A3DA] border-2 border-white shadow-md flex items-center justify-center text-white font-black text-sm">
                      PZ
                    </div>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 h-6 bg-emerald-500 border-t-2 border-emerald-600" />
                </div>

                {/* コード表示エリア */}
                <div className="mt-2 rounded-lg bg-slate-950 p-3 font-mono text-xs leading-relaxed text-slate-300 border border-slate-800">
                  <div className="text-slate-500 text-[10px] mb-1"># バグのあるコードを修正しよう</div>
                  <div className="flex items-center">
                    <span className="w-5 text-slate-600 select-none text-right mr-3">1</span>
                    <span className="text-purple-400">def</span> <span className="text-blue-400">jump</span>(power):
                  </div>
                  <div className="flex items-center bg-rose-500/20 text-rose-200 border-l-2 border-rose-500 -mx-3 px-3 py-0.5">
                    <span className="w-5 text-rose-400 select-none text-right mr-3">2</span>
                    <span className="text-rose-300 font-bold">jump_power = 0</span>
                    <span className="ml-auto text-[10px] text-rose-400">← バグ原因！</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-5 text-slate-600 select-none text-right mr-3">3</span>
                    <span className="text-slate-400 pl-4">character.move_y(jump_power)</span>
                  </div>
                </div>

                {/* 実行ボタンモック */}
                <div className="mt-2 flex items-center justify-between pt-1 px-1">
                  <span className="text-[11px] text-slate-400">選択肢をタップして即修正！</span>
                  <div className="rounded bg-[#FF8800] px-3 py-1 text-xs font-bold text-white shadow-sm">
                    ▶ コードを実行して確認
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 言語セレクター（paizaラーニングの象徴的な一覧バー） */}
      <section aria-label="対応プログラミング言語" className="border-b border-slate-200 bg-white py-6">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
              <Code2 className="h-4 w-4 text-[#00A3DA]" />
              学べるプログラミング言語・技術
            </h2>
            <Link href="/courses" className="text-xs font-bold text-[#00A3DA] hover:underline flex items-center gap-0.5">
              すべての言語を見る
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
            {LANGUAGES.map((lang) => (
              <Link
                key={lang.name}
                href="/courses"
                className="group flex flex-col items-center justify-center p-3 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-[#E6F6FC] hover:border-[#00A3DA] transition-all text-center"
              >
                <div
                  className={`w-9 h-9 rounded-lg ${lang.color} text-white flex items-center justify-center font-black text-xs shadow-sm mb-1.5 group-hover:scale-105 transition`}
                >
                  {lang.name.slice(0, 3)}
                </div>
                <span className="text-xs font-bold text-slate-800">{lang.name}</span>
                <span className="text-[10px] text-slate-400 mt-0.5">{lang.desc}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. paizaラーニングの3大特徴 */}
      <section aria-labelledby="features-title" className="mx-auto max-w-7xl px-4 py-14">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-[#00A3DA] bg-[#E6F6FC] px-3 py-1 rounded-full">
            PAIZA LEARNING STYLE
          </span>
          <h2 id="features-title" className="text-2xl font-black text-slate-900 mt-2 sm:text-3xl">
            動画 × 実践で身につく学習スタイル
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            挫折しやすいプログラミング学習を、続けやすくする工夫がいっぱい
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="relative rounded-2xl bg-white p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition"
              >
                <span className="absolute top-5 right-5 rounded-full bg-[#E6F6FC] text-[#00A3DA] text-[11px] font-black px-2.5 py-0.5">
                  {f.badge}
                </span>
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#00A3DA] to-[#0085B3] flex items-center justify-center text-white mb-4 shadow-md shadow-sky-500/20">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-black text-slate-800 mb-2">{f.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. 今回の新しい学習体験の流れ（STEP 1〜4） */}
      <section aria-labelledby="flow-title" className="border-y border-slate-200 bg-white py-14">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-10">
            <span className="text-xs font-bold text-[#FF8800] bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
              NEW ONBOARDING
            </span>
            <h2 id="flow-title" className="text-2xl font-black text-slate-900 mt-2 sm:text-3xl">
              登録不要！3分でできる学習体験の流れ
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              「登録してから学ぶ」のではなく、「遊んでみて楽しかったら登録する」新しい体験です
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.step}
                  className="relative rounded-2xl border border-slate-200 bg-[#F4F7F9] p-5 hover:bg-white hover:border-[#00A3DA] hover:shadow-md transition group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-2xl font-black text-[#00A3DA] group-hover:scale-105 transition">
                      STEP {s.step}
                    </span>
                    <div className="h-9 w-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[#00A3DA] shadow-sm">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="font-black text-slate-900 mb-1.5 text-base">{s.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{s.text}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/survey"
              className="inline-flex items-center gap-2 rounded-full bg-[#FF8800] hover:bg-[#e67a00] px-8 py-3.5 text-base font-black text-white shadow-lg shadow-orange-500/25 active:scale-95 transition"
            >
              <Bug className="h-5 w-5" />
              今すぐ登録なしで体験を始める
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. 体験のあとに学べる人気講座（paiza講座カード一覧） */}
      <section aria-labelledby="courses-title" className="mx-auto max-w-7xl px-4 py-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Flame className="h-4 w-4 text-[#FF8800]" />
              <span className="text-xs font-bold text-[#FF8800]">POPULAR COURSES</span>
            </div>
            <h2 id="courses-title" className="text-2xl font-black text-slate-900">
              体験のあとに学べる paizaラーニング講座
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              プログラミング言語の基本からWebサービス開発まで、1動画3分でステップアップ
            </p>
          </div>
          <Link
            href="/courses"
            className="inline-flex items-center gap-1 text-sm font-bold text-[#00A3DA] hover:underline shrink-0"
          >
            講座をすべて見る（全120講座）
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {COURSES.slice(0, 3).map((c) => (
            <CourseCard key={c.slug} course={c} />
          ))}
        </ul>
      </section>

      {/* 6. 学習パス（paizaラーニング定番） */}
      <section aria-labelledby="paths-title" className="border-t border-slate-200 bg-white py-14">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-8">
            <span className="text-xs font-bold text-[#00A3DA] bg-[#E6F6FC] px-3 py-1 rounded-full">
              LEARNING ROADMAP
            </span>
            <h2 id="paths-title" className="text-2xl font-black text-slate-900 mt-2">
              目的に合わせて学べる学習パス
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              どの講座から受講すればいいか迷ったときは、ロードマップ順に進めるのがおすすめです
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {LEARNING_PATHS.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-slate-200 bg-[#F4F7F9] p-6 hover:border-[#00A3DA] hover:bg-white transition shadow-sm"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="rounded bg-[#E05397] px-2 py-0.5 text-[11px] font-black text-white">
                    学習パス
                  </span>
                  <span className="text-xs font-bold text-slate-500">
                    全{p.courseSlugs.length}講座
                  </span>
                </div>
                <h3 className="text-lg font-black text-slate-900 mb-2">{p.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">{p.summary}</p>
                <div className="flex items-center flex-wrap gap-1.5 text-[11px] font-bold text-slate-600 bg-white p-3 rounded-xl border border-slate-200">
                  <span className="text-slate-400">受講順：</span>
                  {p.courseSlugs.map((slug, idx) => (
                    <span key={slug} className="flex items-center gap-1">
                      {idx > 0 && <span className="text-slate-300">→</span>}
                      <span className="text-[#00A3DA]">{getCourse(slug)?.title ?? slug}</span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
