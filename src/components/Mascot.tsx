"use client";

export type Mood = "normal" | "happy" | "sad" | "cheer";

interface MascotProps {
  mood?: Mood;
  className?: string;
  size?: "sm" | "md" | "lg";
}

/**
 * paizaラーニング公式ナビゲーター「霧島京子」風の案内キャラクター
 * 表情やインカムマイク、paizaカラーのリボンを備えた高品質SVG
 */
export default function Mascot({ mood = "normal", className = "", size = "md" }: MascotProps) {
  const sizeMap = {
    sm: "w-9 h-9",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  const dim = sizeMap[size] || "w-12 h-12";

  return (
    <div
      role="img"
      aria-label={`paizaラーニング案内キャラクター「きょうこ」${
        mood === "happy" ? "（笑顔）" : mood === "sad" ? "（困り顔）" : mood === "cheer" ? "（応援）" : ""
      }`}
      className={`relative inline-flex items-center justify-center shrink-0 ${dim} ${className}`}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm select-none" fill="none">
        {/* 背景円（paizaターコイズブルーのアクセントリング） */}
        <circle cx="50" cy="50" r="48" fill="#E6F6FC" stroke="#00A3DA" strokeWidth="3" />

        {/* 後ろ髪（栗色・ショートボブ） */}
        <path
          d="M24 50 C22 28, 78 28, 76 50 C76 72, 70 78, 64 80 C60 70, 56 68, 50 68 C44 68, 40 70, 36 80 C30 78, 24 72, 24 50 Z"
          fill="#5C3826"
        />

        {/* 服（白いシャツ + paizaブルージャケット） */}
        <path d="M30 88 C32 78, 68 78, 70 88 L74 98 L26 98 Z" fill="#00A3DA" />
        <path d="M42 80 L50 92 L58 80 Z" fill="#FFFFFF" />
        {/* ネクタイ / リボン（オレンジ） */}
        <path d="M47 84 L53 84 L51 91 L49 91 Z" fill="#FF8800" />

        {/* 首 */}
        <rect x="44" y="70" width="12" height="12" rx="4" fill="#FFE2D1" />

        {/* 顔 */}
        <ellipse cx="50" cy="52" rx="23" ry="22" fill="#FFF0E5" />

        {/* 前髪 */}
        <path
          d="M27 45 C30 35, 45 32, 52 35 C58 32, 70 35, 73 46 C68 40, 58 40, 54 44 C50 39, 38 39, 32 46 C30 46, 28 45, 27 45 Z"
          fill="#6B412B"
        />
        {/* 横髪 */}
        <path d="M25 46 C25 60, 28 66, 31 68 C30 60, 29 52, 30 46 Z" fill="#5C3826" />
        <path d="M75 46 C75 60, 72 66, 69 68 C70 60, 71 52, 70 46 Z" fill="#5C3826" />

        {/* チーク（ほっぺの赤み） */}
        <ellipse cx="34" cy="58" rx="4" ry="2" fill="#FFAAA6" opacity="0.6" />
        <ellipse cx="66" cy="58" rx="4" ry="2" fill="#FFAAA6" opacity="0.6" />

        {/* 目 */}
        {mood === "happy" || mood === "cheer" ? (
          // にっこり目
          <>
            <path
              d="M33 53 Q38 47 43 53"
              stroke="#2E1C14"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M57 53 Q62 47 67 53"
              stroke="#2E1C14"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
          </>
        ) : mood === "sad" ? (
          // 困り眉 + うるうる目
          <>
            <path d="M33 46 Q38 49 43 47" stroke="#6B412B" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M57 47 Q62 49 67 46" stroke="#6B412B" strokeWidth="2" strokeLinecap="round" fill="none" />
            <ellipse cx="38" cy="53" rx="4.5" ry="5.5" fill="#2E1C14" />
            <ellipse cx="62" cy="53" rx="4.5" ry="5.5" fill="#2E1C14" />
            {/* ハイライト */}
            <circle cx="36.5" cy="51" r="1.8" fill="#FFFFFF" />
            <circle cx="60.5" cy="51" r="1.8" fill="#FFFFFF" />
            <circle cx="39.5" cy="55.5" r="1" fill="#FFFFFF" />
            <circle cx="63.5" cy="55.5" r="1" fill="#FFFFFF" />
          </>
        ) : (
          // 通常のぱっちり目
          <>
            {/* 眉 */}
            <path d="M33 46 Q38 44 43 46" stroke="#6B412B" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            <path d="M57 46 Q62 44 67 46" stroke="#6B412B" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            {/* 瞳（paizaターコイズグラデ風） */}
            <ellipse cx="38" cy="53" rx="4.5" ry="5.5" fill="#1A3344" />
            <ellipse cx="62" cy="53" rx="4.5" ry="5.5" fill="#1A3344" />
            <circle cx="38" cy="55" r="2.8" fill="#00A3DA" />
            <circle cx="62" cy="55" r="2.8" fill="#00A3DA" />
            {/* ハイライト */}
            <circle cx="36.5" cy="50.5" r="1.8" fill="#FFFFFF" />
            <circle cx="60.5" cy="50.5" r="1.8" fill="#FFFFFF" />
            <circle cx="40" cy="55" r="0.9" fill="#FFFFFF" />
            <circle cx="64" cy="55" r="0.9" fill="#FFFFFF" />
          </>
        )}

        {/* 口 */}
        {mood === "happy" || mood === "cheer" ? (
          <path d="M46 61 Q50 67 54 61 Z" fill="#E65353" />
        ) : mood === "sad" ? (
          <path d="M47 64 Q50 61 53 64" stroke="#8A4A4A" strokeWidth="2" strokeLinecap="round" fill="none" />
        ) : (
          <path d="M47 62 Q50 65 53 62" stroke="#B85C5C" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        )}

        {/* ヘッドセット（インカムマイク：paizaラーニング講師のトレードマーク） */}
        <path
          d="M24 45 C23 30, 77 30, 76 45"
          stroke="#475569"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* イヤーパッド */}
        <rect x="21" y="44" width="5" height="10" rx="2" fill="#FF8800" />
        <rect x="74" y="44" width="5" height="10" rx="2" fill="#FF8800" />
        {/* マイクアーム */}
        <path d="M24 52 Q26 65 40 65" stroke="#475569" strokeWidth="2" strokeLinecap="round" fill="none" />
        <circle cx="41" cy="65" r="2.2" fill="#00A3DA" />

        {/* キラキラ演出（happy時） */}
        {mood === "happy" && (
          <g fill="#FFB700">
            <path d="M78 28 L80 23 L85 25 L81 29 L83 34 L78 31 L74 34 L76 29 L72 25 L77 23 Z" />
          </g>
        )}
      </svg>
    </div>
  );
}
