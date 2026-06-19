const fs = require('fs');
const path = require('path');
const { Resvg } = require('@resvg/resvg-js');

const FD = 'node_modules/@expo-google-fonts';
const fontFiles = ['zen-maru-gothic/ZenMaruGothic_700Bold.ttf'].map((f) => path.resolve(FD, f));
const fontOpts = { fontFiles, loadSystemFonts: false, defaultFontFamily: 'Zen Maru Gothic' };

const ROSE = { c1: '#ef9bb8', c2: '#d4567f', accent: '#f6a9c4', solid: '#d4567f' };
const WORD_FALLBACK = "'Zen Maru Gothic','Hiragino Maru Gothic ProN',sans-serif";

const crescent = 'M62 16 A34 34 0 1 0 62 84 A50 50 0 0 1 62 16 Z';
function star5(cx, cy, R, ratio = 0.45) { let d = ''; for (let k = 0; k < 10; k++) { const a = ((-90 + k * 36) * Math.PI) / 180; const r = k % 2 ? R * ratio : R; d += (k ? 'L' : 'M') + (cx + r * Math.cos(a)).toFixed(2) + ' ' + (cy + r * Math.sin(a)).toFixed(2) + ' '; } return d + 'Z'; }
function mark(moon, star) { return `<path d="${crescent}" fill="${moon}"/><path d="${star5(76, 40, 11)}" fill="${star}"/><path d="${star5(82, 64, 6)}" fill="${star}" opacity="0.9"/><circle cx="68" cy="74" r="2.5" fill="${star}" opacity="0.8"/>`; }
const gradMark = `<linearGradient id="mk" x1="20" y1="14" x2="70" y2="86" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="${ROSE.c1}"/><stop offset="1" stop-color="${ROSE.c2}"/></linearGradient>`;

function writeSvg(name, svg) { fs.writeFileSync(path.join('assets/brand', name), svg); console.log('svg ', name); }
function png(svg, w, out) { const r = new Resvg(svg, { font: fontOpts, fitTo: { mode: 'width', value: w } }); fs.writeFileSync(out, r.render().asPng()); console.log('png ', out); }

// ============ (1) マーク（透過・ヘッダ/フッタ用） ============
// グラデ版（既存 logo-mark.svg と同一）＋ 白版（濃色背景用）
writeSvg('logo-mark-white.svg', `<svg width="200" height="200" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="まいスピ ロゴマーク（白）">
  ${mark('#ffffff', '#ffffff')}
</svg>
`);
// 透過PNG（512）も用意
png(`<svg width="512" height="512" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><defs>${gradMark}</defs>${mark('url(#mk)', ROSE.accent)}</svg>`, 512, 'assets/brand/logo-mark-512.png');

// ============ (2) 正方形ロゴ（favicon / apple-touch / PWA 用） ============
// フルブリード版（PWA/Androidマスク対応・OSが角丸処理）
const squareFull = `<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="bg" x1="40" y1="30" x2="470" y2="490" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="${ROSE.c1}"/><stop offset="1" stop-color="${ROSE.c2}"/></linearGradient></defs>
  <rect width="512" height="512" fill="url(#bg)"/>
  <g transform="translate(70,86) scale(3.6)">${mark('#ffffff', '#ffe3ee')}</g>
</svg>
`;
writeSvg('icon-square.svg', squareFull);
png(squareFull, 512, 'assets/brand/icon-square-512.png');

// 角丸版（iOS/Web favicon でそのまま使える rx 付き）
const squareRound = `<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="bg" x1="40" y1="30" x2="470" y2="490" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="${ROSE.c1}"/><stop offset="1" stop-color="${ROSE.c2}"/></linearGradient></defs>
  <rect width="512" height="512" rx="112" fill="url(#bg)"/>
  <g transform="translate(70,86) scale(3.6)">${mark('#ffffff', '#ffe3ee')}</g>
</svg>
`;
writeSvg('icon-square-rounded.svg', squareRound);
png(squareRound, 512, 'assets/brand/icon-square-rounded-512.png');

// ============ (3) OG画像用ロゴ（透過PNG・1200x630に乗せる用） ============
// 縦組みロゴ（マーク＋ワードマーク）を透過で。色付き版と白版。
function ogLogo(moon, star, wordColor) {
  return `<svg width="760" height="420" viewBox="0 0 760 420" xmlns="http://www.w3.org/2000/svg">
    <defs>${gradMark}</defs>
    <g transform="translate(330,10) scale(1.0)">${mark(moon, star)}</g>
    <text x="380" y="300" text-anchor="middle" font-family="${WORD_FALLBACK}" font-weight="700" font-size="120" letter-spacing="10" fill="${wordColor}">まいスピ</text>
    <text x="380" y="362" text-anchor="middle" font-family="${WORD_FALLBACK}" font-weight="700" font-size="30" letter-spacing="6" fill="${wordColor}" opacity="0.85">毎朝届くパーソナル運気</text>
  </svg>`;
}
// 色付き（明るい背景に乗せる用）
png(ogLogo('url(#mk)', ROSE.accent, ROSE.solid), 1140, 'assets/brand/og-logo.png');
// 白（濃色・ローズ背景に乗せる用）
png(ogLogo('#ffffff', '#ffffff', '#ffffff'), 1140, 'assets/brand/og-logo-white.png');
