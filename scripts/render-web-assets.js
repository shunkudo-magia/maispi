const fs = require('fs');
const path = require('path');
const { Resvg } = require('@resvg/resvg-js');

const FD = 'node_modules/@expo-google-fonts';
const fontFiles = [
  'zen-maru-gothic/ZenMaruGothic_700Bold.ttf',
  'noto-sans-jp/NotoSansJP_500Medium.ttf',
].map((f) => path.resolve(FD, f));
const fontOpts = { fontFiles, loadSystemFonts: false, defaultFontFamily: 'Zen Maru Gothic' };

const ROSE = { c1: '#ef9bb8', c2: '#d4567f', accent: '#f6a9c4' };
const crescent = 'M62 16 A34 34 0 1 0 62 84 A50 50 0 0 1 62 16 Z';
function star5(cx, cy, R, ratio = 0.45) { let d = ''; for (let k = 0; k < 10; k++) { const a = ((-90 + k * 36) * Math.PI) / 180; const r = k % 2 ? R * ratio : R; d += (k ? 'L' : 'M') + (cx + r * Math.cos(a)).toFixed(2) + ' ' + (cy + r * Math.sin(a)).toFixed(2) + ' '; } return d + 'Z'; }
function mark(moon, star) { return `<path d="${crescent}" fill="${moon}"/><path d="${star5(76, 40, 11)}" fill="${star}"/><path d="${star5(82, 64, 6)}" fill="${star}" opacity="0.9"/><circle cx="68" cy="74" r="2.5" fill="${star}" opacity="0.8"/>`; }

function png(svg, w, out) {
  const r = new Resvg(svg, { font: fontOpts, fitTo: { mode: 'width', value: w } });
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, r.render().asPng());
  console.log('wrote', out);
}

// --- OGP 画像 1200x630 ---
const og = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fdeef3"/><stop offset="1" stop-color="#fbe7ef"/></linearGradient>
    <linearGradient id="mk" x1="20" y1="14" x2="70" y2="86" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="${ROSE.c1}"/><stop offset="1" stop-color="${ROSE.c2}"/></linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <!-- 装飾の星屑 -->
  <path d="${star5(1080, 120, 16)}" fill="#f6a9c4" opacity="0.6"/>
  <path d="${star5(140, 520, 13)}" fill="#f6a9c4" opacity="0.5"/>
  <path d="${star5(1040, 520, 9)}" fill="#f6a9c4" opacity="0.5"/>
  <!-- ロゴ -->
  <g transform="translate(420,150) scale(2.0)">${mark('url(#mk)', ROSE.accent)}</g>
  <text x="600" y="430" text-anchor="middle" font-family="Zen Maru Gothic" font-weight="700" font-size="104" letter-spacing="10" fill="#d4567f">まいスピ</text>
  <text x="600" y="510" text-anchor="middle" font-family="Noto Sans JP" font-size="30" letter-spacing="2" fill="#6b6479">毎朝届く、あなただけのパーソナル運気</text>
</svg>`;
png(og, 1200, 'public/og-image.png');

// --- apple-touch-icon 180x180（角丸なしフルブリード）---
const touch = `<svg width="180" height="180" viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="bg" x1="20" y1="14" x2="160" y2="170" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="${ROSE.c1}"/><stop offset="1" stop-color="${ROSE.c2}"/></linearGradient></defs>
  <rect width="180" height="180" fill="url(#bg)"/>
  <g transform="translate(38,38) scale(1.04)">${mark('#ffffff', '#ffe3ee')}</g>
</svg>`;
png(touch, 180, 'public/apple-touch-icon.png');
