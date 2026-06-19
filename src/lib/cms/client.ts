import { createClient } from 'microcms-js-sdk';

const serviceDomain = process.env.EXPO_PUBLIC_MICROCMS_SERVICE_DOMAIN;
const apiKey = process.env.EXPO_PUBLIC_MICROCMS_API_KEY;

export const isCmsConfigured = Boolean(serviceDomain) && Boolean(apiKey);

let client: ReturnType<typeof createClient> | null = null;

/**
 * microCMS クライアントを遅延生成する。
 * env 未設定時はそもそも呼ばれない（api 側でモックにフォールバック）。
 * トップレベルで createClient を呼ぶと未設定時に例外で落ち、
 * Web の静的レンダリング(SSG)がビルドできなくなるため遅延化している。
 */
export function getCms() {
  if (!client) {
    client = createClient({ serviceDomain: serviceDomain ?? '', apiKey: apiKey ?? '' });
  }
  return client;
}
