export type Mood = "normal" | "happy" | "sad";

/** オリジナルのキャラクター「コードくん」（CSSだけで描画） */
export default function Mascot({ mood = "normal", className = "" }: { mood?: Mood; className?: string }) {
  return (
    <div
      role="img"
      aria-label={`キャラクター「コードくん」${mood === "happy" ? "（うれしそう）" : mood === "sad" ? "（こまっている）" : ""}`}
      className={`relative h-12 w-12 rounded-[14px] border-2 border-[#0085b3] bg-paiza-blue shadow-md ${className}`}
    >
      {/* アンテナ */}
      <span className="absolute -top-2.5 left-1/2 h-2.5 w-0.5 -translate-x-1/2 bg-[#0085b3]" />
      <span className="absolute -top-4 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-paiza-orange" />
      {/* 目 */}
      <span
        className={`absolute left-2.5 top-3.5 bg-white ${mood === "happy" ? "h-1.5 w-2.5 rounded-t-full" : "h-3 w-2.5 rounded-full"}`}
      />
      <span
        className={`absolute right-2.5 top-3.5 bg-white ${mood === "happy" ? "h-1.5 w-2.5 rounded-t-full" : "h-3 w-2.5 rounded-full"}`}
      />
      {/* 口 */}
      <span
        className={`absolute bottom-2 left-1/2 h-2 w-4 -translate-x-1/2 border-2 border-white ${
          mood === "happy"
            ? "rounded-b-full border-t-0"
            : mood === "sad"
              ? "rounded-t-full border-b-0"
              : "h-0.5 rounded-full border-0 bg-white"
        }`}
      />
    </div>
  );
}
