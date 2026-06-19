import { ScrollViewStyleReset } from 'expo-router/html';
import { type PropsWithChildren } from 'react';

/**
 * Web（my-spi.com / Expo Web 出力）専用の HTML シェル。
 * - 言語・メタ情報・OGP・テーマカラーを設定
 * - デスクトップでは全幅に伸びず、スマホ幅のセンターカラムで表示
 *   （周囲はブランド背景で埋める）
 */
export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no, viewport-fit=cover"
        />

        <title>まいスピ｜毎朝届くパーソナル運気</title>
        <meta
          name="description"
          content="気圧・月齢・あなたの属性からパーソナルな運気を毎朝お届け。アーキタイプ診断や占いコラムも楽しめるスピリチュアル・ナビ「まいスピ」。"
        />
        <meta name="theme-color" content="#da668e" />

        {/* OGP / Twitter Card */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="まいスピ" />
        <meta property="og:title" content="まいスピ｜毎朝届くパーソナル運気" />
        <meta
          property="og:description"
          content="気圧・月齢・あなたの属性からパーソナルな運気を毎朝お届け。アーキタイプ診断や占いコラムも。"
        />
        <meta property="og:url" content="https://my-spi.com/" />
        <meta property="og:image" content="https://my-spi.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />

        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        <ScrollViewStyleReset />
        <style dangerouslySetInnerHTML={{ __html: webStyles }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

const webStyles = `
:root { color-scheme: light; }
html, body, #root { height: 100%; }
body {
  background-color: #f2eaef;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}
#root {
  background-color: #fbf4f7;
  min-height: 100%;
}
/* デスクトップ等の広い画面ではスマホ幅のセンターカラムに */
@media (min-width: 540px) {
  #root {
    max-width: 480px;
    margin: 0 auto;
    box-shadow: 0 0 60px rgba(193, 78, 116, 0.14);
  }
}
::selection { background-color: #fbe7ef; }
`;
