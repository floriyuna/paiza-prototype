import React from "react";

interface Props {
  lines: string[];
  /** 強調する行（0始まり） */
  highlight?: number;
  /** highlight の行の見た目 */
  tone?: "bug" | "fixed" | "run";
  fileName?: string;
  language?: string;
}

const TONE_CLASSES: Record<NonNullable<Props["tone"]>, string> = {
  bug: "bg-rose-500/20 border-l-4 border-rose-500 text-rose-100",
  fixed: "bg-emerald-500/20 border-l-4 border-emerald-400 text-emerald-100",
  run: "bg-amber-500/20 border-l-4 border-amber-400 text-amber-100",
};

/** Pythonコードの簡易シンタックスハイライト */
function highlightPython(line: string) {
  if (line.trim().startsWith("#")) {
    return <span className="text-slate-500 italic">{line}</span>;
  }

  // トークン分割（演算子、キーワード、数値、文字列）
  const tokens = line.split(/(\b(?:def|if|else|elif|for|in|while|return|print|range|import|from|True|False)\b|\b\d+\b|"[^"]*"|'[^']*'|==|!=|<=|>=|\+|-|\*|\/|=)/g);

  return tokens.map((token, idx) => {
    if (/^(def|if|else|elif|for|in|while|return|import|from)$/.test(token)) {
      return (
        <span key={idx} className="text-purple-400 font-bold">
          {token}
        </span>
      );
    }
    if (/^(print|range)$/.test(token)) {
      return (
        <span key={idx} className="text-sky-300">
          {token}
        </span>
      );
    }
    if (/^(True|False)$/.test(token)) {
      return (
        <span key={idx} className="text-amber-400 font-bold">
          {token}
        </span>
      );
    }
    if (/^\d+$/.test(token)) {
      return (
        <span key={idx} className="text-emerald-400">
          {token}
        </span>
      );
    }
    if (/^["'].*["']$/.test(token)) {
      return (
        <span key={idx} className="text-amber-300">
          {token}
        </span>
      );
    }
    if (/^(==|!=|<=|>=|\+|-|\*|\/|=)$/.test(token)) {
      return (
        <span key={idx} className="text-pink-400">
          {token}
        </span>
      );
    }
    return <span key={idx}>{token}</span>;
  });
}

export default function CodeBlock({
  lines,
  highlight,
  tone = "bug",
  fileName = "Main.py",
  language = "Python3",
}: Props) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-700 bg-[#1a222d] shadow-lg">
      {/* paizaエディタ風 タブヘッダー */}
      <div className="flex items-center justify-between border-b border-slate-700/80 bg-[#121922] px-3 py-1.5 text-xs text-slate-400 select-none">
        <div className="flex items-center space-x-2">
          {/* アクティブファイルタブ */}
          <div className="flex items-center gap-1.5 rounded-t-md bg-[#1a222d] border-t-2 border-[#00A3DA] px-3 py-1 text-slate-200 font-mono text-xs font-bold">
            <span className="h-2 w-2 rounded-full bg-blue-400" />
            <span>{fileName}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
            {language}
          </span>
          <span className="hidden sm:inline text-[10px] text-slate-500">UTF-8</span>
        </div>
      </div>

      {/* エディタコードエリア */}
      <pre className="overflow-x-auto py-2.5 font-mono text-xs sm:text-sm leading-6 sm:leading-7 text-slate-100 bg-[#1a222d]" tabIndex={0}>
        <code>
          {lines.map((line, i) => {
            const isTarget = i === highlight;
            return (
              <span
                key={i}
                className={`flex border-l-4 border-transparent px-3 transition-colors ${
                  isTarget ? TONE_CLASSES[tone] : ""
                }`}
              >
                <span className="mr-4 w-6 shrink-0 select-none text-right font-mono text-xs text-slate-500">
                  {i + 1}
                </span>
                <span className="whitespace-pre flex-1 text-slate-100">
                  {line === "" ? " " : highlightPython(line)}
                </span>
                {isTarget && (
                  <span className="ml-2 text-[10px] uppercase tracking-wider font-bold shrink-0 opacity-80 self-center">
                    {tone === "bug" && "⚠️ バグ"}
                    {tone === "fixed" && "✓ 修正済み"}
                    {tone === "run" && "▶ 実行行"}
                  </span>
                )}
              </span>
            );
          })}
        </code>
      </pre>
    </div>
  );
}
