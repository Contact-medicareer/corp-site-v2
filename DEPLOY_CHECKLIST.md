# DEPLOY CHECKLIST — corp-site-v2

## 初回デプロイ（依田作業）

### 1. Vercel Import

- [ ] Vercel ダッシュボード → New Project
- [ ] GitHub 連携 → `Contact-medicareer/corp-site-v2` を選択
- [ ] Framework Preset: **Astro**（自動検出される）
- [ ] Build Command: `npm run build`（デフォルト）
- [ ] Output Directory: `dist`（デフォルト）
- [ ] Node.js Version: **22.x**（Astro 6 要件）

### 2. ドメイン設定

- [ ] 一時的に `corp-site-v2-{hash}.vercel.app` で公開
- [ ] v1 のドメイン（contact.ne.jp 等）には**まだ繋がない**
- [ ] preview 環境として依田・越山が確認

### 3. 動作確認

- [ ] トップページ（`/`）が表示される
- [ ] favicon が表示される
- [ ] フォントが Zen Kaku Gothic New / Inter で読み込まれている
- [ ] ヘッダー/フッターが正しく表示される
- [ ] レスポンシブ（PC・スマホ）

## v2 → 本番切替（v2 完成後・将来）

### Phase 3 完了後のチェック

- [ ] v1 の 31ページすべてが v2 に移植済み
- [ ] 全ページが v1 と同等以上の品質
- [ ] ニュースが microCMS で運用可能
- [ ] SEO（meta tags / OGP / sitemap）が v1 と同等

### 切替作業

- [ ] DNS 変更（v1 → v2 の Vercel プロジェクトへ）
- [ ] 旧 v1 リポを `09_アーカイブ/` 相当へ移動
- [ ] v1 Vercel プロジェクトを Pause

## 環境変数（将来）

| 変数 | 用途 | 設定タイミング |
|---|---|---|
| `MICROCMS_API_KEY` | ニュース取得 | Phase 3 |
| `MICROCMS_SERVICE_DOMAIN` | サービス識別 | Phase 3 |

## ロールバック

- v1 が稼働している間は、v2 をいつでも止められる
- v2 への DNS 切替後にトラブル → DNS を v1 に戻す（TTL 注意）
