import React from 'react';
import Head from 'expo-router/head';

export const SITE_URL = 'https://my-spi.com';
export const SITE_NAME = 'まいスピ';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

type SeoHeadProps = {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  noindex?: boolean;
  jsonLd?: Record<string, unknown>;
};

/**
 * ページ毎の <title>/meta description/OGP を差し込む。
 * expo-router の静的書き出し(output: static)はマウント時点のツリーをそのまま HTML 化するため、
 * このコンポーネントは同期的に値が確定しているページ（タブ画面など）でのみ
 * クローラー/SNS向けの静的メタとして機能する。
 * CMS 取得後に値が確定する記事・特集ページでは、初期値としてサイト共通メタを描画し、
 * データ到着後に client 側で書き換える（ブラウザのタブ/シェア動作の改善が目的で、
 * OGP の事前レンダリングは別途 SSR 対応が必要）。
 */
export function SeoHead({ title, description, path, ogImage, noindex, jsonLd }: SeoHeadProps) {
  const url = `${SITE_URL}${path}`;
  const image = ogImage ?? DEFAULT_OG_IMAGE;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <link rel="canonical" href={url} />
      )}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      {jsonLd ? (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      ) : null}
    </Head>
  );
}

export function stripHtml(html: string, maxLength = 120): string {
  const text = html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  return text.length > maxLength ? `${text.slice(0, maxLength)}…` : text;
}
