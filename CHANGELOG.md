# Changelog

All notable changes to this project will be documented in this file.

## [0.1.0] - 2026-04-29

### Added — 初期構築

- Astro 6.1.10 + TypeScript strict + Tailwind v4 のベースセットアップ
- `astro.config.mjs`：static output / trailingSlash always / Tailwind v4 vite plugin
- `src/styles/global.css`：Tailwind v4 `@theme` directive で `design_tokens.json` を統合
  - メディキャリブランドカラー（primary / blue-deep / coral / ink-navy 等）
  - フォント（Zen Kaku Gothic New + Inter）
- `src/layouts/BaseLayout.astro`：全ページ共通レイアウト（Google Fonts preconnect 含む）
- `src/components/Header.astro`：共通ヘッダー（v1 の31ファイル重複問題を解決）
- `src/components/Footer.astro`：共通フッター（同上）
- `src/pages/index.astro`：仮トップページ（Phase ロードマップ表示）
- `public/favicon.svg`：仮ファビコン（Contact "C" マーク）
- ドキュメント：README / CLAUDE.md / ARCHITECTURE.md / DEPLOY_CHECKLIST.md
- `docs/decisions/0001-astro-stack-decision.md`：Astro 採用判断
- `docs/migration/v1-to-v2-plan.md`：v1 → v2 移行計画

### Notes

- v1（`~/code/contact-corp-site-v1/`・31ページ・本番運用中）は無傷で維持
- v2 完成までは v1 と並行運用
