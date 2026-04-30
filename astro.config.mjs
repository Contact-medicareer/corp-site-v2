// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sentry from '@sentry/astro';

// Sentry: SENTRY_DSN が設定されているときのみ有効化（環境変数未設定時はビルド成功）
const sentryIntegration = process.env.SENTRY_DSN
  ? [
      sentry({
        dsn: process.env.SENTRY_DSN,
        sourceMapsUploadOptions: {
          project: 'medicareer-corp-v2',
          authToken: process.env.SENTRY_AUTH_TOKEN,
        },
      }),
    ]
  : [];

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  output: 'static',
  build: {
    format: 'directory',
  },
  trailingSlash: 'always',
  integrations: [...sentryIntegration],
});
