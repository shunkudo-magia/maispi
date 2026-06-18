const fs = require('fs');
const path = require('path');
const { Resvg } = require('@resvg/resvg-js');

const FONTDIR = 'node_modules/@expo-google-fonts';
const fontFiles = [
  'zen-maru-gothic/700Bold/ZenMaruGothic_700Bold.ttf',
  'klee-one/600SemiBold/KleeOne_600SemiBold.ttf',
  'zen-kaku-gothic-new/700Bold/ZenKakuGothicNew_700Bold.ttf',
].map((f) => path.resolve(FONTDIR, f));
const fontOpts = { fontFiles, loadSystemFonts: false, defaultFontFamily: 'Zen Kaku Gothic New' };

const ROSE = { c1: '#ef9bb8', c2: '#d4567f', accent: '#f6a9c4', solid: '#d4567f' };

// --- 形状ヘルパ ---
const crescent = 'M62 16 A34 34 0 1 0 62 84 A50 50 0 0 1 62 16 Z';
const spark4 = (cx, cy, r) => { const i = r * 0.34; return `M${cx} ${cy - r} Q${cx + i} ${cy - i} ${cx + r} ${cy} Q${cx + i} ${cy + i} ${cx} ${cy + r} Q${cx - i} ${cy + i} ${cx - r} ${cy} Q${cx - i} ${cy - i} ${cx} ${cy - r} Z`; };
const star5 = (cx, cy, R, ratio = 0.45) => { let d = ''; for (let k = 0; k < 10; k++) { const a = (-90 + k * 36) * Math.PI / 180; const rad = k % 2 ? R * ratio : R; d += (k ? 'L' : 'M') + (cx + rad * Math.cos(a)).toFixed(2) + ' ' + (cy + rad * Math.sin(a)).toFixed(2) + ' '; } return d + 'Z'; };

// 選択された3マーク（番号→形状）
const MARKS = {
  '03': (g, a) => `<path d="${crescent}" fill="${g}"/><path d="${star5(76, 40, 11)}" fill="${a}"/><path d="${star5(82, 64, 6)}" fill="${a}" opacity="0.9"/><circle cx="68" cy="74" r="2.5" fill="${a}" opacity="0.8"/>`,
  '10': (g, a) => `<circle cx="52" cy="52" r="32" fill="${g}"/><path d="${spark4(82, 28, 13)}" fill="${a}"/><path d="${spark4(86, 60, 6)}" fill="${a}" opacity="0.9"/>`,
  '16': (g) => `<path d="M28 30 A20 20 0 1 0 28 70 A30 30 0 0 1 28 30 Z" fill="${g}"/><path d="M50 30 A20 20 0 1 0 50 70 Z" fill="${g}"/><circle cx="78" cy="50" r="13" fill="${g}"/>`,
};
const MARK_NAMES = { '03': '三日月＋星屑', '10': '満月＋きらめき', '16': '月相3つ' };

// 選択された3文字（番号→書体スタイル）
const WORDS = {
  '03': { font: 'Zen Maru Gothic',   size: 60, sp: 4,  label: 'Zen Maru' },
  '12': { font: 'Zen Maru Gothic',   size: 56, sp: 12, label: 'Zen Maru 字間広' },
  '16': { font: 'Klee One SemiBold', size: 52, sp: 12, label: 'Klee 字間広' },
};

const MARK_KEYS = ['03', '10', '16'];
const WORD_KEYS = ['03', '12', '16'];

// レイアウト: 3列(文字) × 3行(マーク)
const cols = 3, rows = 3, cellW = 540, cellH = 210, gapX = 24, gapY = 24, padX = 30, padTop = 130, padBottom = 30;
const boardW = padX * 2 + cols * cellW + (cols - 1) * gapX;
const boardH = padTop + rows * cellH + (rows - 1) * gapY + padBottom;

const gradMark = `<linearGradient id="mk" x1="20" y1="14" x2="80" y2="86" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="${ROSE.c1}"/><stop offset="1" stop-color="${ROSE.c2}"/></linearGradient>`;

let cells = '';
MARK_KEYS.forEach((mk, r) => {
  WORD_KEYS.forEach((wk, c) => {
    const x = padX + c * (cellW + gapX), y = padTop + r * (cellH + gapY);
    const w = WORDS[wk];
    cells += `<g transform="translate(${x},${y})">
      <rect width="${cellW}" height="${cellH}" rx="18" fill="#ffffff" stroke="#e8e0e8"/>
      <g transform="translate(24,42) scale(1.25)">${MARKS[mk]('url(#mk)', ROSE.accent)}</g>
      <text x="172" y="${cellH / 2 + w.size * 0.36 + 4}" font-family="${w.font}" font-size="${w.size}" letter-spacing="${w.sp}" fill="${ROSE.solid}">まいスピ</text>
      <text x="172" y="${cellH - 26}" font-family="Zen Kaku Gothic New" font-size="14" fill="#9b92a4">マーク${mk}（${MARK_NAMES[mk]}） × 文字${wk}（${w.label}）</text>
    </g>`;
  });
});

const board = `<svg width="${boardW}" height="${boardH}" viewBox="0 0 ${boardW} ${boardH}" xmlns="http://www.w3.org/2000/svg">
  <defs>${gradMark}</defs>
  <rect width="${boardW}" height="${boardH}" fill="#fafafa"/>
  <text x="${padX}" y="58" font-family="Zen Kaku Gothic New" font-weight="700" font-size="36" fill="#d4567f">まいスピ ロゴ 組み合わせ — 全9通り</text>
  <text x="${padX}" y="92" font-family="Zen Kaku Gothic New" font-size="17" fill="#6b6479">マーク {03 / 10 / 16} × 文字 {03 / 12 / 16}（すべてローズ・横組み）</text>
  ${cells}
</svg>`;

const out = 'assets/brand/combos-3x3-rose.png';
const rsvg = new Resvg(board, { font: fontOpts, fitTo: { mode: 'width', value: Math.round(boardW * 1.4) } });
fs.writeFileSync(out, rsvg.render().asPng());
console.log('wrote', out, `${boardW}x${boardH}`);
