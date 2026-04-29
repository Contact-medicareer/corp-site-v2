# v1 → v2 移行計画

> v1: `~/code/contact-corp-site-v1/`（31ページ・素HTML・本番運用中）
> v2: このリポ（Astro 6・段階的構築中）
> 方針：**v1 は無傷で維持**しつつ、v2 を段階的に作り込む

## 現状（2026-04-29）

| 項目 | v1 | v2 |
|---|---|---|
| ページ数 | 31 | 1（仮トップ） |
| ステータス | 本番稼働中 | 構築中 |
| ドメイン | contact.ne.jp 等 | 未割当（preview のみ） |
| 技術 | 素HTML + assets/style.css | Astro 6 + TypeScript + Tailwind v4 |

## v1 のページ一覧（31ページ）

`~/code/contact-corp-site-v1/src/` の構成より：

```
index.html                         トップ
about/                             私たちについて
ai/                                AI活用
business/                          事業
code-of-conduct/                   行動規範
contact/                           お問い合わせ
diversity-equity-inclusion/        DEI
legal/                             法的情報
news/                              ニュース一覧 + 個別記事
privacy-policy/                    プライバシーポリシー
recruit/                           採用
security/                          セキュリティ
terms/                             利用規約
```

※ news/ 配下に複数の個別記事ページが存在するため合計 31ページ。

## Phase 計画

### Phase 1：基盤構築（今・1週間）

**Goal**：Astro リポを起動し、v1 と並行運用できる状態にする。

- [x] Astro 6 + TypeScript strict セットアップ
- [x] Tailwind v4 + `@theme`（design_tokens 統合）
- [x] `BaseLayout` / `Header` / `Footer` の共通化
- [x] 仮トップページ
- [x] GitHub リポ作成・初期 commit
- [ ] Vercel Import（依田）
- [ ] preview ドメインで動作確認

### Phase 2：優先10ページ移植（1ヶ月）

**Goal**：トラフィックの多いページを v2 に移植し、v1 と並行運用。

優先順（仮）：
1. `/` トップ
2. `/about/` 私たちについて
3. `/business/` 事業
4. `/contact/` お問い合わせ
5. `/recruit/` 採用
6. `/news/` ニュース一覧
7. `/ai/` AI活用
8. `/diversity-equity-inclusion/` DEI
9. `/code-of-conduct/` 行動規範
10. `/privacy-policy/` プライバシーポリシー

各ページ移植時のチェックリスト：
- [ ] v1 と同等のコンテンツ
- [ ] meta tags / OGP / 構造化データ
- [ ] レスポンシブ
- [ ] アクセシビリティ（alt属性・heading階層）
- [ ] 内部リンクの整合性

### Phase 3：完全移行 + microCMS（3ヶ月）

**Goal**：v1 を完全に置き換え、ニュース更新を microCMS 化。

- [ ] 残り 21ページ移植
- [ ] microCMS スキーマ設計
- [ ] `getStaticPaths` でニュース動的生成
- [ ] sitemap.xml 自動生成
- [ ] OGP 画像の動的生成（@vercel/og）
- [ ] DNS 切替
- [ ] v1 をアーカイブ

## ページ移植の標準フロー

1. `~/code/contact-corp-site-v1/src/{page}/index.html` を読む
2. 構造を Astro コンポーネントに分解（共通部分は `Header`/`Footer` に集約済み）
3. `corp-site-v2/src/pages/{page}/index.astro` を作成
4. `BaseLayout` + `Header` + `Footer` で囲む
5. デザイントークン（`var(--color-*)`）に置換
6. ビルド → 表示確認 → コミット

## v1 削除タイミング

- Phase 3 完了 + DNS 切替 + 1ヶ月の安定稼働後
- `~/Desktop/Claude/09_アーカイブ/` 相当へリポを退避
- GitHub リポは Public のままアーカイブ（履歴保全）

## リスクと対策

| リスク | 対策 |
|---|---|
| v2 にバグがあって本番切替失敗 | preview ドメインで十分テスト・DNS TTL を短く |
| v1 と v2 で SEO 評価がリセット | URL構造を完全互換（`trailingSlash: 'always'`） |
| ニュース移行が大変 | 既存 HTML を Markdown に一括変換 → microCMS へバルクインポート |
| 技術スタック変更で誰も触れない | CLAUDE.md / README で文脈を残す |
