# paizaラーニング UX改善プロトタイプ

「アカウントを作る前に、まずプログラミングの楽しさを体験する」学習導線の提案プロトタイプです。
paizaラーニングの公式サイトではなく、実際の教材・アカウントとは連携していません。

```
トップ → かんたんな質問(2問) → 難易度判定 → バグ修正ゲーム / 結果予想クイズ
      → 解説 → 達成画面 → ゲストで続ける or アカウント登録（デモ）
```

## いちばん簡単な遊び方（Windows / Mac 共通・インストール不要）

**`index.html` をダブルクリックするだけ**で、ブラウザ（Chrome / Edge 推奨）で動きます。
Node.js もインターネット接続も不要です。学習状況はそのブラウザの localStorage に保存されます。

`index.html` は、下記の Next.js ソース（`src/`）と同じコードを1ファイルにまとめた配布用ビルドです
（画面遷移は `#/learn` のようなURLのハッシュで行うため、ファイルを直接開いても動きます）。
生成に使ったスクリプトは `standalone/` にあります（esbuild と Tailwind を使用。参考用）。

## Next.js として起動する場合

Node.js 18.18 以上が必要です。

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # 本番ビルド
```

> `next/font/google` で Noto Sans JP を読み込むため、ビルド時にインターネット接続が必要です。

## 画面と URL

| URL | 内容 |
|---|---|
| `/` | トップ（「さっそく体験する」が主役） |
| `/survey` | 質問2問（カードをタップするだけ。「とばして初心者から」も可） |
| `/learn?type=bug` / `?type=quiz` | バグ修正ゲーム / 結果予想クイズ・解説・達成画面 |
| `/signup` | 登録画面のデモ（入力は送信・保存されません） |
| `/courses`, `/courses/[slug]` | ダミーの講座一覧・詳細（未連携と明記） |

## 難易度判定

Q1・Q2 の選択肢に 0〜3 点を付け、合計で判定します（`src/lib/level.ts`）。

| 合計 | レベル |
|---|---|
| 0〜2 | 初心者 |
| 3〜4 | 中級者 |
| 5〜6 | 上級者 |

回答後も、学習画面上部のスイッチでいつでもレベルを変更できます。

## 問題の追加方法

`src/lib/questions.ts` の `bugQuestions` / `quizQuestions` にオブジェクトを追加します。
型は `src/lib/types.ts` にあります。

- バグ修正：`code`（1要素＝1行）、`fixIndex`（直す行）、`options`（各選択肢の `sim` でゲームの動きが決まる）
- クイズ：`code`、`options`、`correctId`、`trace`（変数の変化を1ステップずつ）
- `sim` の種類（`jump` / `run` / `coins`）は `src/components/GameStage.tsx` で描画。新しい種類を足す場合は `Sim` 型とステージを追加します。

現在は難易度×種類ごとに1問ずつ（計6問）。同じ難易度・種類に複数問を入れる場合は、`getQuestion` と `QUESTION_SEQUENCE`（`questions.ts`）の選び方を拡張してください。

## ゲストの学習状況

`localStorage`（キー `paiza-proto-guest-v1`）に、レベル・クリア済み問題・回答履歴・達成画面の確認状況を保存します。
フッターの「デモ用：学習状況をリセット」で初期化できます（発表のたびにリセットすると便利です）。

## 実装していないこと（プロトタイプの範囲外）

- 実際の認証・アカウント作成（登録画面は見た目と遷移のみ）
- paizaラーニングの実際の講座・動画との連携（ダミー講座のみ。画面上にも明記）
- ヘッダーのサービス切り替え（他サービスへの遷移は未実装）

## 技術スタック

Next.js (App Router) / React / TypeScript / Tailwind CSS / lucide-react
