# ARCHITECTURE — corp-site-v2

## 全体像

```
┌───────────────────────────────────────────────────────┐
│  src/pages/*.astro  (ルーティング・ファイル = URL)        │
│       │                                                │
│       ▼                                                │
│  src/layouts/BaseLayout.astro                          │
│   ├── <head> Google Fonts + meta + favicon             │
│   ├── <Header />                                       │
│   ├── <slot />  ← ページ固有コンテンツ                    │
│   └── <Footer />                                       │
│       │                                                │
│       ▼                                                │
│  src/styles/global.css                                 │
│   ├── @import "tailwindcss"                            │
│   └── @theme { --color-medicareer-blue: #1E50A2; ... } │
│                                                        │
│  ▲ design_tokens.json から手動同期                       │
│  (~/Desktop/Claude/12_デザイン/01_デザインシステム/)        │
└───────────────────────────────────────────────────────┘
```

## レイヤー責務

| レイヤー | ファイル | 責務 |
|---|---|---|
| Routing | `src/pages/*.astro` | URL定義・ページ固有のコンテンツ |
| Layout | `src/layouts/BaseLayout.astro` | `<html>` `<head>` の共通枠 |
| Component | `src/components/*.astro` | Header / Footer 等の再利用UI |
| Style | `src/styles/global.css` | Tailwind v4 + design tokens |
| Content | `src/content/news/*` | ニュース記事（将来 microCMS） |
| Static | `public/*` | favicon・OGP画像など |

## デザイントークン統合

**SSoT**：`~/Desktop/Claude/12_デザイン/01_デザインシステム/design_tokens.json`

**統合方法**：Tailwind v4 の `@theme` directive で CSS変数として定義し、
ユーティリティクラス（`bg-medicareer-blue` 等）または `var(--color-*)` で参照。

```css
/* src/styles/global.css */
@theme {
  --color-medicareer-blue: #1E50A2;  /* design_tokens.json: color.primary */
  --color-ink-navy: #1A2B47;          /* design_tokens.json: color.on-surface */
  /* ... */
}
```

将来的には build script で `design_tokens.json` から `global.css` を自動生成する想定。
現時点は手動同期。

## ビルド出力

- `output: 'static'` — 静的サイト（SSR なし）
- `build.format: 'directory'` — `/about/` のような末尾スラッシュ URL
- `trailingSlash: 'always'` — 末尾スラッシュを強制（v1 互換）

ビルド成果物は `dist/` に出力。Vercel が `dist/` を読んでデプロイする想定。

## TypeScript

- `astro/tsconfigs/strict` を継承
- `src/env.d.ts` で `.astro/types.d.ts` を参照
- `.astro` ファイル内のスクリプトは TypeScript として型チェックされる

## ニュース記事（将来構想）

```
Phase 1（今）：src/content/news/*.md にローカル管理
Phase 3：microCMS API 経由で動的取得
   - npm install @microcms/sdk
   - getStaticPaths で ISG 生成
   - ビルド時に最新10件取得
```

詳細：`docs/migration/v1-to-v2-plan.md`

## Vercel デプロイ

- Build command: `npm run build`
- Output directory: `dist`
- Node version: 22+（Astro 6 要件）
- 環境変数：現時点なし（将来 microCMS API キー追加）

## 参考：v1 アーキテクチャとの違い

| 項目 | v1 | v2 |
|---|---|---|
| 構造 | 31個の独立した `index.html` | Astro pages + layouts |
| Header/Footer | 31ファイルにコピペ重複 | 1ファイル × 全ページ |
| スタイル | `assets/style.css`（手書きCSS） | Tailwind v4 + `@theme` |
| 型 | なし | TypeScript strict |
| ニュース | 静的HTML | 将来 microCMS |
| デプロイ | Vercel（plain HTML） | Vercel（Astro build） |
