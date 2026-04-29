# corp-site-v2

> 株式会社Contact コーポレートサイト v2（Astro Edition）
> v1（31ページ・素HTML）と並行運用・段階的移行

## 技術スタック

- **Astro 6** — static site generator
- **TypeScript** — strict mode
- **Tailwind CSS v4** — `@theme` directive で design_tokens 統合
- **将来**：microCMS（ニュース管理）

## セットアップ

```bash
git clone https://github.com/Contact-medicareer/corp-site-v2.git
cd corp-site-v2
npm install
```

## 開発

```bash
npm run dev      # http://localhost:4321
npm run build    # dist/
npm run preview  # ビルド結果のプレビュー
```

## ディレクトリ構造

```
corp-site-v2/
├── astro.config.mjs        Astro設定（Tailwind v4 vite plugin）
├── tsconfig.json           TypeScript strict
├── src/
│   ├── pages/              ルーティング（ファイル = URL）
│   ├── layouts/            BaseLayout.astro
│   ├── components/         Header.astro / Footer.astro（共通）
│   ├── styles/             global.css（Tailwind v4 + @theme）
│   └── content/news/       ニュース記事（将来 microCMS 連携）
├── public/                 静的ファイル（favicon等）
└── docs/
    ├── decisions/          設計判断の記録（ADR）
    └── migration/          v1 → v2 移行計画
```

## v1 → v2 移行計画

詳細：[docs/migration/v1-to-v2-plan.md](docs/migration/v1-to-v2-plan.md)

| Phase | 内容 | 期間目安 |
|---|---|---|
| Phase 1（今） | 基盤構築・3ページ稼働 | 1週間 |
| Phase 2 | 10ページ移植 | 1ヶ月 |
| Phase 3 | 31ページ完全移行 + ニュース microCMS 化 | 3ヶ月 |

## 既存 v1

- リポ：`~/code/contact-corp-site-v1/`
- 31ページ・本番運用中
- v2 完成まで継続稼働
- v2 リリース後にアーカイブ

## v1 の課題と v2 での解決

| 課題（v1） | 解決（v2） |
|---|---|
| ヘッダー/フッターを31ファイルに重複コピー | `Header.astro` / `Footer.astro` 1ファイルで全ページ反映 |
| 素HTML・コンポーネント化なし | Astro コンポーネント・Layout で再利用 |
| デザイントークンが手書き | `@theme` で `design_tokens.json` を統合 |
| 型安全性ゼロ | TypeScript strict |
| ニュース更新が手動HTML編集 | `src/content/news/` → 将来 microCMS |

## 設計判断

- [0001-astro-stack-decision.md](docs/decisions/0001-astro-stack-decision.md) Astro 採用理由

## ライセンス

UNLICENSED（株式会社Contact 内部利用）
