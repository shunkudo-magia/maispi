const fs = require('fs');
const path = require('path');
const { Resvg } = require('@resvg/resvg-js');

const FONT = path.resolve('node_modules/@expo-google-fonts/shippori-mincho/ShipporiMincho_700Bold.ttf');
const fontOpts = { fontFiles: [FONT], loadSystemFonts: false, defaultFontFamily: 'Shippori Mincho' };

function renderToPng(svg, widthPx) {
  const r = new Resvg(svg, { font: fontOpts, fitTo: { mode: 'width', value: widthPx } });
  return r.render().asPng();
}
function write(out, svgPath, widthPx) {
  const svg = fs.readFileSync(svgPath, 'utf8');
  fs.writeFileSync(out, renderToPng(svg, widthPx));
  console.log('wrote', out);
}

// --- マーク/きらめきの共有パス ---
const crescent = 'M62 16 A34 34 0 1 0 62 84 A50 50 0 0 1 62 16 Z';
const spark = 'M73 31 Q75.3 47.7 88 50 Q75.3 52.3 73 69 Q70.7 52.3 58 50 Q70.7 47.7 73 31 Z';
function mark(fillC, fillS, fillA) {
  return `
    <path d="${crescent}" fill="${fillC}"/>
    <path d="${spark}" fill="${fillS}"/>
    <circle cx="84" cy="30" r="3" fill="${fillA}"/>
    <circle cx="80" cy="70" r="2" fill="${fillA}" opacity="0.85"/>`;
}

// --- 一覧ボード SVG（自己完結） ---
const board = `<svg width="900" height="620" viewBox="0 0 900 620" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="cg" x1="20" y1="14" x2="70" y2="86" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#ef9bb8"/><stop offset="1" stop-color="#d4567f"/>
    </linearGradient>
    <linearGradient id="sg" x1="60" y1="32" x2="86" y2="58" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#ffd9e6"/><stop offset="1" stop-color="#f6a9c4"/>
    </linearGradient>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ef9bb8"/><stop offset="1" stop-color="#d4567f"/>
    </linearGradient>
    <clipPath id="round"><rect x="25" y="15" width="200" height="200" rx="44"/></clipPath>
  </defs>

  <rect width="900" height="620" fill="#fafafa"/>
  <text x="50" y="60" font-family="Shippori Mincho" font-weight="700" font-size="34" fill="#da668e">まいすぴ ロゴ</text>
  <text x="50" y="92" font-family="Shippori Mincho" font-weight="700" font-size="15" fill="#9b92a4">コンセプト「三日月とひらめきの光」</text>

  <!-- 横組ロゴ -->
  <g transform="translate(50,130)">
    <rect x="-10" y="-10" width="500" height="130" rx="16" fill="#ffffff" stroke="#e8e0e8"/>
    <g transform="translate(0,5) scale(1.0)">${mark('url(#cg)','url(#sg)','#f6a9c4')}</g>
    <text x="120" y="80" font-family="Shippori Mincho" font-weight="700" font-size="62" letter-spacing="2" fill="#da668e">まいすぴ</text>
    <text x="120" y="108" font-family="Shippori Mincho" font-weight="700" font-size="13" fill="#9b92a4">logo-horizontal</text>
  </g>

  <!-- マーク単体 -->
  <g transform="translate(580,130)">
    <rect x="-10" y="-10" width="270" height="130" rx="16" fill="#ffffff" stroke="#e8e0e8"/>
    <g transform="translate(5,5)">${mark('url(#cg)','url(#sg)','#f6a9c4')}</g>
    <text x="130" y="60" font-family="Shippori Mincho" font-weight="700" font-size="13" fill="#9b92a4">logo-mark</text>
  </g>

  <!-- 縦組ロゴ -->
  <g transform="translate(50,300)">
    <rect x="-10" y="-10" width="270" height="270" rx="16" fill="#ffffff" stroke="#e8e0e8"/>
    <g transform="translate(75,10)">${mark('url(#cg)','url(#sg)','#f6a9c4')}</g>
    <text x="125" y="200" text-anchor="middle" font-family="Shippori Mincho" font-weight="700" font-size="50" letter-spacing="3" fill="#da668e">まいすぴ</text>
    <text x="125" y="235" text-anchor="middle" font-family="Shippori Mincho" font-weight="700" font-size="13" fill="#9b92a4">logo-stacked</text>
  </g>

  <!-- アプリアイコン -->
  <g transform="translate(350,300)">
    <rect x="-10" y="-10" width="270" height="270" rx="16" fill="#ffffff" stroke="#e8e0e8"/>
    <g clip-path="url(#round)"><rect x="25" y="15" width="200" height="200" fill="url(#bg)"/></g>
    <g transform="translate(55.4,55) scale(1.2)">${mark('#ffffff','#ffe3ee','#ffe3ee')}</g>
    <text x="125" y="245" text-anchor="middle" font-family="Shippori Mincho" font-weight="700" font-size="13" fill="#9b92a4">app-icon</text>
  </g>

  <!-- 色違い適用例（ライトピンク地 / ダーク地） -->
  <g transform="translate(630,300)">
    <rect x="0" y="0" width="125" height="125" rx="16" fill="#fbe7ef"/>
    <g transform="translate(12,12) scale(1.0)">${mark('url(#cg)','url(#sg)','#f6a9c4')}</g>
    <rect x="145" y="0" width="125" height="125" rx="16" fill="#1a1825"/>
    <g transform="translate(157,12) scale(1.0)">${mark('#ffffff','#ffffff','#ffffff')}</g>
    <text x="135" y="160" text-anchor="middle" font-family="Shippori Mincho" font-weight="700" font-size="13" fill="#9b92a4">背景適用例</text>
  </g>
</svg>`;

fs.writeFileSync('/tmp/logo-board.png', renderToPng(board, 1800));
console.log('wrote /tmp/logo-board.png');

// --- app.json 用の実アイコン書き出し ---
const A = 'assets';
write(path.join(A, 'icon.png'), 'assets/brand/app-icon.svg', 1024);
write(path.join(A, 'adaptive-icon.png'), 'assets/brand/adaptive-icon-foreground.svg', 1024);
write(path.join(A, 'notification-icon.png'), 'assets/brand/notification-icon.svg', 96);
write(path.join(A, 'favicon.png'), 'assets/brand/logo-mark.svg', 48);
write(path.join(A, 'splash.png'), 'assets/brand/logo-stacked.svg', 520);
