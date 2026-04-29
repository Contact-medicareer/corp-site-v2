# ADR 0001: Astro 6 + TypeScript + Tailwind v4 採用

- ステータス：承認（2026-04-29）
- 決定者：依田龍之介
- 関連：`~/code/contact-corp-site-v1/`（v1 リポ・素HTML・31ページ）

## 背景

v1（contact-corp-site-v1）は素HTML 31ページで構成されており、以下の課題を抱えている：

1. **Header / Footer の重複コピペ**：1箇所変更で 31ファイルに反映が必要
2. **コンポーネント化されていない**：再利用ができず保守コスト高
3. **デザイントークン未統合**：色・スペーシングがファイルごとに手書き
4. **型安全性ゼロ**：誤記・リンク切れの検知不能
5. **ニュース更新が手動 HTML 編集**：ノンエンジニアには負荷高

## 検討した選択肢

| 選択肢 | Pros | Cons |
|---|---|---|
| **Astro 6** | 静的サイトに最適・Markdown/コンテンツ機能・学習コスト低・既存 medicareer-training-lp の知見流用可 | 比較的新しい |
| Next.js 15 | エコシステム豊富 | コーポサイトには過剰・SSR不要 |
| 純粋な静的サイトジェネレータ（11ty 等） | 軽量 | TypeScript / コンポーネント体験が劣る |
| 素HTMLの継続 | 学習コストゼロ | v1 と同じ問題が再発 |

## 決定

**Astro 6 + TypeScript strict + Tailwind v4** を採用する。

### 理由

1. **静的コーポサイトに最適**：SSG ファースト・最小JSで高速
2. **コンポーネント化**：Header / Footer を 1ファイル化し v1 の問題を解決
3. **既存知見の流用**：`~/code/medicareer-training-lp/` で Astro 運用実績あり
4. **TypeScript strict**：型安全性とエディタ補完
5. **Tailwind v4 の `@theme` directive**：`design_tokens.json` を CSS 変数に統合可能
6. **将来の拡張性**：microCMS 連携（content collections）・OGP 動的生成等が容易

## トレードオフ

- **Node.js 22+ が必須**（Vercel 側で対応済み）
- **ビルドが必要**：CDN にアップロードする前にビルドステップが入る（CI で自動化）
- **学習コスト**：素HTMLよりは高いが、`.astro` の構文は HTML に近く軽い

## 今後の判断ポイント

- ニュース記事数が増えたら microCMS への移行を本格化（Phase 3）
- 多言語化が必要になったら i18n integration を検討
- アクセス解析・A/Bテストが必要になったら Vercel Analytics または GA4 イベント設計

## 参考

- Astro 公式: https://astro.build/
- Tailwind v4 `@theme`: https://tailwindcss.com/docs/v4-beta
- 既存実装: `~/code/medicareer-training-lp/astro.config.mjs`
