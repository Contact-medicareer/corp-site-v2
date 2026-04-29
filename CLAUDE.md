# corp-site-v2 — CLAUDE.md

> AIエージェント向けの作業文脈。プロジェクト全体ルールは `~/Desktop/Claude/CLAUDE.md` を継承する。
> このファイルは corp-site-v2 固有のルールのみ記述する。

## このリポは何か

株式会社Contact のコーポサイトを **Astro 6 で再構築する v2 リポ**。
既存 v1（`~/code/contact-corp-site-v1/`・31ページ・素HTML・本番運用中）と**並行運用**する。

## v1 の問題と v2 での解決

| 問題（v1） | 解決（v2） |
|---|---|
| Header/Footer を 31ファイルにコピペ重複 | `src/components/Header.astro` `Footer.astro` 1ファイルで全反映 |
| 素HTML・型なし | Astro + TypeScript strict |
| デザイントークンが手書き | `src/styles/global.css` の `@theme` で統合 |

## 技術スタック

- Astro 6（static output / trailingSlash always / format directory）
- TypeScript strict
- Tailwind CSS v4（`@tailwindcss/vite` プラグイン・`@theme` directive）
- 将来：microCMS（ニュース）

## ディレクトリ規約

| パス | 用途 | MUST/任意 |
|---|---|---|
| `src/pages/` | ルーティング。ファイル名 = URL | MUST |
| `src/layouts/BaseLayout.astro` | 全ページ共通 layout | MUST 経由 |
| `src/components/Header.astro` | 共通ヘッダー（変更は1ファイル） | MUST 経由 |
| `src/components/Footer.astro` | 共通フッター（変更は1ファイル） | MUST 経由 |
| `src/styles/global.css` | Tailwind v4 + `@theme`（design tokens） | MUST |
| `src/content/news/` | ニュース記事（将来 microCMS） | 任意 |
| `public/` | 静的ファイル（favicon等） | 任意 |
| `docs/decisions/` | 設計判断記録（ADR） | 任意 |
| `docs/migration/` | v1 → v2 移行計画・履歴 | 任意 |

## 作業前の必読

1. `~/Desktop/Claude/12_デザイン/01_デザインシステム/BRAND.md`（ブランド方針）
2. `~/Desktop/Claude/12_デザイン/01_デザインシステム/DESIGN.md`（デザイン原則）
3. `~/Desktop/Claude/12_デザイン/01_デザインシステム/design_tokens.json`（カラー・スペーシング）
4. このリポの `docs/migration/v1-to-v2-plan.md`

## このリポ固有のルール

### MUST

- ページ追加時は **必ず** `BaseLayout` + `Header` + `Footer` を経由する（直接 `<html>` を書かない）
- 色は `var(--color-*)` で参照する（Tailwind v4 の `@theme` 経由）。ハードコード禁止
- v1 リポ（`~/code/contact-corp-site-v1/`）は触らない（無傷維持）
- Astro 6 の公式パターンに準拠する。独自規約を作らない
- `trailingSlash: 'always'` を維持（v1 と URL 整合性を保つため）
- 新規 .astro ファイルでは TypeScript strict に従う

### NG

- v1 リポへのコミット・編集
- `<html>` `<head>` を `BaseLayout` 以外に書く
- カラーをハードコード（例：`bg-blue-500` の生使用は避け、`bg-[var(--color-medicareer-blue)]`）
- `node_modules/` `dist/` `.astro/` をコミット
- ブランドカラー値の改変（`design_tokens.json` が SSoT）

## ページ追加の標準フロー

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
---

<BaseLayout title="ページタイトル｜株式会社Contact" description="...">
  <Header />
  <main class="min-h-screen">
    <!-- コンテンツ -->
  </main>
  <Footer />
</BaseLayout>
```

## v1 → v2 移行ポリシー

- v1 はリリースまで本番稼働を継続する
- v2 でページが完成しても v1 は触らない
- v2 完全リリース後に v1 を `09_アーカイブ/` 相当へ退避
- 移行優先度は `docs/migration/v1-to-v2-plan.md` を参照

## 関連リポ

- `~/code/contact-corp-site-v1/` — v1 本番（触らない）
- `~/code/medicareer-training-lp/` — Astro 4 参考実装
- `~/code/medicareer-fact-base/` — npm 経由で参照可能なファクト集

## デプロイ

詳細：[DEPLOY_CHECKLIST.md](DEPLOY_CHECKLIST.md)

- Vercel Import（依田作業）
- v1 と異なる preview ドメインで並行稼働
- 本番切替は v2 完成後
