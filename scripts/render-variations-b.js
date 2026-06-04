const fs = require('fs');
const path = require('path');
const { Resvg } = require('@resvg/resvg-js');

const FONTDIR = 'node_modules/@expo-google-fonts';
const fontFiles = [
  'zen-maru-gothic/700Bold/ZenMaruGothic_700Bold.ttf',
  'zen-maru-gothic/900Black/ZenMaruGothic_900Black.ttf',
  'zen-kaku-gothic-new/700Bold/ZenKakuGothicNew_700Bold.ttf',
  'zen-kaku-gothic-new/900Black/ZenKakuGothicNew_900Black.ttf',
  'm-plus-rounded-1c/700Bold/MPLUSRounded1c_700Bold.ttf',
  'm-plus-rounded-1c/900Black/MPLUSRounded1c_900Black.ttf',
  'klee-one/600SemiBold/KleeOne_600SemiBold.ttf',
  'yuji-syuku/400Regular/YujiSyuku_400Regular.ttf',
  'hachi-maru-pop/400Regular/HachiMaruPop_400Regular.ttf',
  'noto-sans-jp/NotoSansJP_700Bold.ttf',
].map((f) => path.resolve(FONTDIR, f));
const fontOpts = { fontFiles, loadSystemFonts: false, defaultFontFamily: 'Zen Kaku Gothic New' };

// 明朝以外の書体のみ
const F = {
  zenMaru:    { family: 'Zen Maru Gothic',        label: '丸ゴ Zen Maru' },
  zenMaruBlk: { family: 'Zen Maru Gothic Black',  label: '丸ゴ Zen Maru Black' },
  zenKaku:    { family: 'Zen Kaku Gothic New',    label: 'ゴシック Zen Kaku' },
  zenKakuBlk: { family: 'Zen Kaku Gothic New Black', label: 'ゴシック Zen Kaku Black' },
  mplus:      { family: 'Rounded Mplus 1c Bold',  label: '丸ゴ M+ Rounded' },
  mplusBlk:   { family: 'Rounded Mplus 1c Black', label: '丸ゴ M+ Black' },
  klee:       { family: 'Klee One SemiBold',      label: '教科書体 Klee' },
  yuji:       { family: 'Yuji Syuku',             label: '筆書 Yuji Syuku' },
  hachi:      { family: 'Hachi Maru Pop',         label: 'ポップ Hachi Maru' },
  noto:       { family: 'Noto Sans JP',           label: 'ゴシック Noto' },
};

const P = {
  rose:     { c1: '#ef9bb8', c2: '#d4567f', accent: '#f6a9c4', word: '#d4567f', tint: '#fdeef3', name: 'ローズ' },
  lavender: { c1: '#b9a5f5', c2: '#7b68ee', accent: '#c9bdf7', word: '#6a55da', tint: '#efebfd', name: 'ラベンダー' },
  plum:     { c1: '#c77db5', c2: '#8e3d7f', accent: '#e0a9d4', word: '#8e3d7f', tint: '#f6e9f2', name: 'プラム' },
  gold:     { c1: '#f0c45a', c2: '#d4940a', accent: '#f6dd9a', word: '#b87d08', tint: '#fdf4dd', name: 'ゴールド' },
  teal:     { c1: '#7fd4c0', c2: '#4eb89e', accent: '#a9e3d6', word: '#3a9580', tint: '#e6f6f1', name: 'ティール' },
  sunset:   { c1: '#f3a86b', c2: '#e8803d', accent: '#f6c39a', word: '#d06a26', tint: '#fdeee1', name: 'サンセット' },
  coral:    { c1: '#f59b8a', c2: '#e8654d', accent: '#f6b8ad', word: '#d24f37', tint: '#fdece8', name: 'コーラル' },
  navy:     { c1: '#4a4668', c2: '#1a1825', accent: '#9b92a4', word: '#1a1825', tint: '#e8e7ec', name: 'ナイト' },
  sky:      { c1: '#8fb8ec', c2: '#5b8dd9', accent: '#b3cef2', word: '#3f74c4', tint: '#e9f1fb', name: 'スカイ' },
  berry:    { c1: '#d96f9c', c2: '#a83d6b', accent: '#eaa0bf', word: '#a83d6b', tint: '#f9e8f0', name: 'ベリー' },
};

const crescent = 'M62 16 A34 34 0 1 0 62 84 A50 50 0 0 1 62 16 Z';
const spark4 = (cx, cy, r) => { const i = r * 0.34; return `M${cx} ${cy - r} Q${cx + i} ${cy - i} ${cx + r} ${cy} Q${cx + i} ${cy + i} ${cx} ${cy + r} Q${cx - i} ${cy + i} ${cx - r} ${cy} Q${cx - i} ${cy - i} ${cx} ${cy - r} Z`; };
const star5 = (cx, cy, R, ratio = 0.45) => { let d = ''; for (let k = 0; k < 10; k++) { const a = (-90 + k * 36) * Math.PI / 180; const rad = k % 2 ? R * ratio : R; d += (k ? 'L' : 'M') + (cx + rad * Math.cos(a)).toFixed(2) + ' ' + (cy + rad * Math.sin(a)).toFixed(2) + ' '; } return d + 'Z'; };

const SHAPES = {
  crescentSpark: (g, a) => `<path d="${crescent}" fill="${g}"/><path d="${spark4(73, 50, 14)}" fill="${a}"/><circle cx="84" cy="30" r="3" fill="${a}"/><circle cx="80" cy="70" r="2" fill="${a}" opacity="0.85"/>`,
  crescent: (g) => `<path d="${crescent}" fill="${g}"/>`,
  crescentStars: (g, a) => `<path d="${crescent}" fill="${g}"/><path d="${star5(76, 40, 11)}" fill="${a}"/><path d="${star5(82, 64, 6)}" fill="${a}" opacity="0.9"/><circle cx="68" cy="74" r="2.5" fill="${a}" opacity="0.8"/>`,
  spark4: (g, a) => `<path d="${spark4(50, 50, 36)}" fill="${g}"/><path d="${spark4(82, 26, 9)}" fill="${a}"/><path d="${spark4(24, 76, 6)}" fill="${a}" opacity="0.9"/>`,
  star5: (g, a) => `<path d="${star5(50, 50, 38)}" fill="${g}"/><path d="${star5(82, 24, 8)}" fill="${a}"/>`,
  moonDot: (g, a) => `<path d="${crescent}" fill="${g}"/><circle cx="74" cy="50" r="11" fill="${a}"/>`,
  sparkTrio: (g, a) => `<path d="${spark4(44, 46, 28)}" fill="${g}"/><path d="${spark4(78, 30, 16)}" fill="${a}"/><path d="${spark4(76, 72, 11)}" fill="${g}" opacity="0.85"/>`,
  gem: (g, a) => `<path d="M40 30 L80 30 L90 48 L60 86 L30 48 Z" fill="${g}"/><path d="M40 30 L60 48 L30 48 Z" fill="${a}" opacity="0.55"/><path d="M80 30 L60 48 L90 48 Z" fill="${a}" opacity="0.35"/>`,
  lotus: (g, a) => `<path d="M60 26 Q74 54 60 84 Q46 54 60 26 Z" fill="${g}"/><path d="M60 84 Q38 64 32 38 Q54 50 60 84 Z" fill="${g}" opacity="0.8"/><path d="M60 84 Q82 64 88 38 Q66 50 60 84 Z" fill="${g}" opacity="0.8"/><circle cx="60" cy="78" r="5" fill="${a}"/>`,
  fullmoonSpark: (g, a) => `<circle cx="52" cy="52" r="32" fill="${g}"/><path d="${spark4(82, 28, 13)}" fill="${a}"/><path d="${spark4(86, 60, 6)}" fill="${a}" opacity="0.9"/>`,
  crescentOutline: (g, a) => `<path d="${crescent}" fill="none" stroke="${g}" stroke-width="6" stroke-linejoin="round"/><path d="${spark4(74, 50, 12)}" fill="${a}"/>`,
  sunMoon: (g, a) => `<path d="${crescent}" fill="${g}"/><g stroke="${a}" stroke-width="4" stroke-linecap="round"><line x1="80" y1="22" x2="86" y2="14"/><line x1="90" y1="40" x2="99" y2="37"/><line x1="88" y1="60" x2="97" y2="64"/></g><circle cx="80" cy="44" r="6" fill="${a}"/>`,
};

// bg: card(白) / pastel(淡色) / fill(ベタ塗り+白抜き) / grad(グラデ+白抜き) / dark(濃紺)
const PATTERNS = [
  { shape: 'crescentSpark',   pal: 'rose',     font: 'zenKaku',    size: 54, bg: 'fill' },
  { shape: 'crescentSpark',   pal: 'lavender', font: 'zenMaru',    size: 54, bg: 'grad' },
  { shape: 'crescent',        pal: 'plum',     font: 'mplus',      size: 54, bg: 'dark' },
  { shape: 'spark4',          pal: 'gold',     font: 'zenKakuBlk', size: 54, bg: 'card' },
  { shape: 'star5',           pal: 'teal',     font: 'klee',       size: 50, bg: 'pastel' },
  { shape: 'moonDot',         pal: 'rose',     font: 'mplusBlk',   size: 52, bg: 'card' },
  { shape: 'crescentStars',   pal: 'berry',    font: 'zenMaru',    size: 54, bg: 'grad' },
  { shape: 'gem',             pal: 'lavender', font: 'zenKaku',    size: 54, bg: 'dark' },
  { shape: 'sparkTrio',       pal: 'sunset',   font: 'zenMaruBlk', size: 52, bg: 'fill' },
  { shape: 'crescentSpark',   pal: 'navy',     font: 'yuji',       size: 50, bg: 'card' },
  { shape: 'lotus',           pal: 'coral',    font: 'mplus',      size: 54, bg: 'pastel' },
  { shape: 'fullmoonSpark',   pal: 'sky',      font: 'noto',       size: 52, bg: 'fill' },
  { shape: 'crescentOutline', pal: 'rose',     font: 'hachi',      size: 44, bg: 'card' },
  { shape: 'crescent',        pal: 'gold',     font: 'zenKaku',    size: 54, bg: 'dark' },
  { shape: 'star5',           pal: 'plum',     font: 'mplusBlk',   size: 52, bg: 'grad' },
  { shape: 'moonDot',         pal: 'teal',     font: 'zenMaru',    size: 52, bg: 'fill' },
  { shape: 'spark4',          pal: 'berry',    font: 'klee',       size: 50, bg: 'pastel' },
  { shape: 'crescentSpark',   pal: 'coral',    font: 'zenKakuBlk', size: 54, bg: 'grad' },
  { shape: 'sunMoon',         pal: 'gold',     font: 'yuji',       size: 50, bg: 'card' },
  { shape: 'crescentStars',   pal: 'lavender', font: 'hachi',      size: 44, bg: 'fill' },
];

function resolve(pat, i) {
  const pal = P[pat.pal];
  switch (pat.bg) {
    case 'card':   return { bg: '#ffffff',  stroke: '#e8e0e8', mark: `url(#m${i})`, grad: true, accent: pal.accent, text: '#1a1825', cap: '#9b92a4', capOp: 1, tag: '白地・黒文字' };
    case 'pastel': return { bg: pal.tint,   stroke: 'none',    mark: `url(#m${i})`, grad: true, accent: pal.accent, text: pal.word,  cap: pal.word,  capOp: 0.6, tag: '淡色地' };
    case 'fill':   return { bg: pal.c2,     stroke: 'none',    mark: '#ffffff',     grad: false, accent: '#ffffff', text: '#ffffff', cap: '#ffffff', capOp: 0.8, tag: 'ベタ塗り・白抜き' };
    case 'grad':   return { bg: `url(#b${i})`, stroke: 'none', mark: '#ffffff',     grad: false, accent: '#ffffff', text: '#ffffff', cap: '#ffffff', capOp: 0.85, tag: 'グラデ・白抜き', bgGrad: true };
    case 'dark':   return { bg: '#1a1825',  stroke: 'none',    mark: `url(#m${i})`, grad: true, accent: pal.accent, text: '#ffffff', cap: '#ffffff', capOp: 0.6, tag: '濃紺地' };
  }
}

const cols = 4, rows = 5, cellW = 440, cellH = 200, gapX = 24, gapY = 24, padX = 30, padTop = 120, padBottom = 30;
const boardW = padX * 2 + cols * cellW + (cols - 1) * gapX;
const boardH = padTop + rows * cellH + (rows - 1) * gapY + padBottom;

let defs = '', cells = '';
PATTERNS.forEach((pat, i) => {
  const pal = P[pat.pal], font = F[pat.font], c = resolve(pat, i);
  if (c.grad) defs += `<linearGradient id="m${i}" x1="20" y1="14" x2="78" y2="86" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="${pal.c1}"/><stop offset="1" stop-color="${pal.c2}"/></linearGradient>`;
  if (c.bgGrad) defs += `<linearGradient id="b${i}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${pal.c1}"/><stop offset="1" stop-color="${pal.c2}"/></linearGradient>`;

  const col = i % cols, row = Math.floor(i / cols);
  const x = padX + col * (cellW + gapX), y = padTop + row * (cellH + gapY);
  const num = String(i + 1).padStart(2, '0');
  cells += `<g transform="translate(${x},${y})">
    <rect width="${cellW}" height="${cellH}" rx="18" fill="${c.bg}" stroke="${c.stroke}"/>
    <g transform="translate(18,34) scale(1.18)">${SHAPES[pat.shape](c.mark, c.accent)}</g>
    <text x="158" y="118" font-family="${font.family}" font-size="${pat.size}" letter-spacing="2" fill="${c.text}">まいスピ</text>
    <text x="22" y="180" font-family="Zen Kaku Gothic New" font-size="14" fill="${c.cap}" opacity="${c.capOp}">${num} · ${font.label} · ${pal.name} · ${c.tag}</text>
  </g>`;
});

const board = `<svg width="${boardW}" height="${boardH}" viewBox="0 0 ${boardW} ${boardH}" xmlns="http://www.w3.org/2000/svg">
  <defs>${defs}</defs>
  <rect width="${boardW}" height="${boardH}" fill="#fafafa"/>
  <text x="${padX}" y="58" font-family="Zen Kaku Gothic New Black" font-size="38" fill="#da668e">まいスピ ロゴ — 20パターン（ゴシック系・背景/白抜き）</text>
  <text x="${padX}" y="90" font-family="Zen Kaku Gothic New" font-size="17" fill="#6b6479">明朝を除外／黒文字・背景色・白抜きを採用（番号でご指定ください）</text>
  ${cells}
</svg>`;

const r = new Resvg(board, { font: fontOpts, fitTo: { mode: 'width', value: Math.round(boardW * 1.4) } });
fs.writeFileSync('assets/brand/variations-20b.png', r.render().asPng());
console.log('wrote assets/brand/variations-20b.png', `${boardW}x${boardH}`);
