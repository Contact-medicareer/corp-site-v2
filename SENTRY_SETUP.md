# Sentry 設定手順（依田作業）

本サイト（corp-site-v2）に Sentry エラー追跡を統合済み。
DSN なしでもビルド成功する設計のため、Sentry アカウント作成 + Vercel 環境変数設定で稼働開始する。

## 設定手順

1. https://sentry.io/ で無料アカウント作成
2. Project 作成
   - プロジェクト名: `medicareer-corp-v2`
   - プラットフォーム: `Astro`
3. DSN を取得（Project Settings > Client Keys (DSN)）
4. Auth Token を取得（User Settings > Auth Tokens > Create New Token）
   - 必要スコープ: `project:releases`, `project:read`, `org:read`
5. Vercel ダッシュボードで環境変数設定（Settings > Environment Variables）:
   - `SENTRY_DSN` = 取得した DSN
   - `SENTRY_AUTH_TOKEN` = 取得した Auth Token
6. 次回デプロイから自動有効化

## ローカル動作確認

```bash
cp .env.example .env
# .env を編集して DSN / Auth Token を設定
npm run build
```

## 想定効果

- 本番サイトでJSエラー発生時にSentry経由で自動通知
- ソースマップ自動アップロードでスタックトレースが原コードで読める
- DSN 未設定時はビルドに影響しない（環境変数フォールバック）
