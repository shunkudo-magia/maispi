const fs = require('fs');
const path = require('path');
const { Resvg } = require('@resvg/resvg-js');

// 確定デザイン: マーク=三日月+星屑(03) / 文字=Zen Maru Gothic / 色=ブランドローズ
const ROSE = { c1: '#ef9bb8', c2: '#d4567f', accent: '#f6a9c4', solid: '#d4567f' };
const WORD_FONT = 'Zen Maru Gothic';
const WORD_FALLBACK = "'Zen Maru Gothic','Hiragino Maru Gothic ProN',sans-serif";

const FONTDIR = 'node_modules/@expo-google-fonts';
const fontFiles = [
  'zen-maru-gothic/700Bold/ZenMaruGothic_700Bold.ttf',
  'zen-kaku-gothic-new/700Bold/ZenKakuGothicNew_700Bold.ttf',
].map((f) => path.resolve(FONTDIR, f));
const fontOpts = { fontFiles, loadSystemFonts: false, defaultFontFamily: 'Zen Maru Gothic' };

// --- 形状 ---
const crescent = 'M62 16 A34 34 0 1 0 62 84 A50 50 0 0 1 62 16 Z';
function star5(cx, cy, R, ratio = 0.45) {
  let d = '';
  for (let k = 0; k < 10; k++) {
    const a = ((-90 + k * 36) * Math.PI) / 180;
    const rad = k % 2 ? R * ratio : R;
    d += (k ? 'L' : 'M') + (cx + rad * Math.cos(a)).toFixed(2) + ' ' + (cy + rad * Math.sin(a)).toFixed(2) + ' ';
  }
  return d + 'Z';
}
const STAR_BIG = star5(76, 40, 11);
const STAR_SMALL = star5(82, 64, 6);

// マーク本体（三日月色 / 星屑色 を差し替え可能）
function mark(moonFill, starFill) {
  return `<path d="${crescent}" fill="${moonFill}"/><path d="${STAR_BIG}" fill="${starFill}"/><path d="${STAR_SMALL}" fill="${starFill}" opacity="0.9"/><circle cx="68" cy="74" r="2.5" fill="${starFill}" opacity="0.8"/>`;
}

const gradMark = `<linearGradient id="mk" x1="20" y1="14" x2="70" y2="86" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="${ROSE.c1}"/><stop offset="1" stop-color="${ROSE.c2}"/></linearGradient>`;

// ============ SVG 素材 ============
const FILES = {};

FILES['logo-mark.svg'] = `<svg width="200" height="200" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="まいスピ ロゴマーク">
  <defs>${gradMark}</defs>
  ${mark('url(#mk)', ROSE.accent)}
</svg>
`;

FILES['logo-mark-mono.svg'] = `<svg width="200" height="200" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="まいスピ ロゴマーク（単色）">
  <path d="${crescent}" fill="currentColor"/><path d="${STAR_BIG}" fill="currentColor" opacity="0.85"/><path d="${STAR_SMALL}" fill="currentColor" opacity="0.7"/><circle cx="68" cy="74" r="2.5" fill="currentColor" opacity="0.6"/>
</svg>
`;

FILES['logo-horizontal.svg'] = `<svg width="470" height="130" viewBox="0 0 470 130" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="まいスピ">
  <defs>${gradMark}</defs>
  <g transform="translate(15,15)">${mark('url(#mk)', ROSE.accent)}</g>
  <text x="135" y="86" font-family="${WORD_FALLBACK}" font-weight="700" font-size="62" letter-spacing="6" fill="${ROSE.solid}">まいスピ</text>
</svg>
`;

FILES['logo-stacked.svg'] = `<svg width="300" height="290" viewBox="0 0 300 290" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="まいスピ">
  <defs>${gradMark}</defs>
  <g transform="translate(100,20)">${mark('url(#mk)', ROSE.accent)}</g>
  <text x="150" y="250" text-anchor="middle" font-family="${WORD_FALLBACK}" font-weight="700" font-size="60" letter-spacing="6" fill="${ROSE.solid}">まいスピ</text>
</svg>
`;

FILES['app-icon.svg'] = `<svg width="1024" height="1024" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="まいスピ アプリアイコン">
  <defs><linearGradient id="bg" x1="160" y1="120" x2="900" y2="940" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="${ROSE.c1}"/><stop offset="1" stop-color="${ROSE.c2}"/></linearGradient></defs>
  <rect width="1024" height="1024" fill="url(#bg)"/>
  <g transform="translate(212,212) scale(6)">${mark('#ffffff', '#ffe3ee')}</g>
</svg>
`;

FILES['adaptive-icon-foreground.svg'] = `<svg width="1024" height="1024" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="まいスピ アダプティブアイコン前景">
  <defs><linearGradient id="mk" x1="20" y1="14" x2="70" y2="86" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="${ROSE.c1}"/><stop offset="1" stop-color="${ROSE.c2}"/></linearGradient></defs>
  <g transform="translate(287,287) scale(4.5)">${mark('url(#mk)', ROSE.accent)}</g>
</svg>
`;

FILES['notification-icon.svg'] = `<svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="まいスピ 通知アイコン">
  <g transform="translate(8,8) scale(0.8)">${mark('#ffffff', '#ffffff')}</g>
</svg>
`;

const OUT = 'assets/brand';
for (const [name, svg] of Object.entries(FILES)) {
  fs.writeFileSync(path.join(OUT, name), svg);
  console.log('wrote', path.join(OUT, name));
}

// ============ PNG 書き出し ============
function png(svg, w, out) {
  const r = new Resvg(svg, { font: fontOpts, fitTo: { mode: 'width', value: w } });
  fs.writeFileSync(out, r.render().asPng());
  console.log('wrote', out);
}
png(FILES['app-icon.svg'], 1024, 'assets/icon.png');
png(FILES['adaptive-icon-foreground.svg'], 1024, 'assets/adaptive-icon.png');
png(FILES['notification-icon.svg'], 96, 'assets/notification-icon.png');
png(FILES['logo-mark.svg'], 48, 'assets/favicon.png');
png(FILES['logo-stacked.svg'], 520, 'assets/splash.png');

// ============ 確認用プレビュー ============
const preview = `<svg width="900" height="520" viewBox="0 0 900 520" xmlns="http://www.w3.org/2000/svg">
  <defs>${gradMark}<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${ROSE.c1}"/><stop offset="1" stop-color="${ROSE.c2}"/></linearGradient><clipPath id="round"><rect x="25" y="15" width="190" height="190" rx="42"/></clipPath></defs>
  <rect width="900" height="520" fill="#fbf4f7"/>
  <text x="40" y="56" font-family="Zen Maru Gothic" font-weight="700" font-size="32" fill="#d4567f">まいスピ ロゴ（確定）</text>
  <text x="40" y="86" font-family="Zen Kaku Gothic New" font-size="15" fill="#9b92a4">マーク03 三日月＋星屑 ／ 文字03 Zen Maru Gothic ／ ローズ</text>

  <g transform="translate(40,120)">
    <rect x="-10" y="-10" width="500" height="150" rx="20" fill="#fff" stroke="#efe2ea"/>
    <g transform="translate(10,15)">${mark('url(#mk)', ROSE.accent)}</g>
    <text x="140" y="100" font-family="${WORD_FONT}" font-weight="700" font-size="58" letter-spacing="6" fill="${ROSE.solid}">まいスピ</text>
    <text x="140" y="128" font-family="Zen Kaku Gothic New" font-size="13" fill="#9b92a4">横組み</text>
  </g>

  <g transform="translate(580,120)">
    <rect x="-10" y="-10" width="280" height="150" rx="20" fill="#fff" stroke="#efe2ea"/>
    <g transform="translate(15,15)">${mark('url(#mk)', ROSE.accent)}</g>
    <text x="135" y="75" font-family="Zen Kaku Gothic New" font-size="13" fill="#9b92a4">マーク単体</text>
  </g>

  <g transform="translate(40,300)">
    <rect x="-10" y="-10" width="280" height="190" rx="20" fill="#fff" stroke="#efe2ea"/>
    <g transform="translate(80,5) scale(0.95)">${mark('url(#mk)', ROSE.accent)}</g>
    <text x="135" y="150" text-anchor="middle" font-family="${WORD_FONT}" font-weight="700" font-size="42" letter-spacing="5" fill="${ROSE.solid}">まいスピ</text>
  </g>

  <g transform="translate(350,300)">
    <rect x="-10" y="-10" width="280" height="190" rx="20" fill="#fff" stroke="#efe2ea"/>
    <g clip-path="url(#round)"><rect x="25" y="15" width="190" height="190" fill="url(#bg)"/></g>
    <g transform="translate(40,30) scale(1.6)">${mark('#ffffff', '#ffe3ee')}</g>
    <text x="135" y="160" text-anchor="middle" font-family="Zen Kaku Gothic New" font-size="13" fill="#9b92a4">アプリアイコン</text>
  </g>

  <g transform="translate(660,300)">
    <rect x="0" y="0" width="120" height="120" rx="20" fill="#2a2230"/>
    <g transform="translate(10,10)">${mark('#ffffff', '#ffffff')}</g>
    <rect x="130" y="0" width="120" height="120" rx="20" fill="#fdeef3"/>
    <g transform="translate(140,10)">${mark('url(#mk)', ROSE.accent)}</g>
    <text x="125" y="150" text-anchor="middle" font-family="Zen Kaku Gothic New" font-size="13" fill="#9b92a4">背景適用例</text>
  </g>
</svg>`;
png(preview, 1700, 'assets/brand/final-logo-preview.png');
