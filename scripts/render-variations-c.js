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

const F = {
  zenMaru:    { family: 'Zen Maru Gothic',           label: '丸ゴ Zen Maru' },
  zenMaruBlk: { family: 'Zen Maru Gothic Black',     label: '丸ゴ Zen Maru Black' },
  zenKaku:    { family: 'Zen Kaku Gothic New',       label: 'ゴシック Zen Kaku' },
  zenKakuBlk: { family: 'Zen Kaku Gothic New Black', label: 'ゴシック Zen Kaku Black' },
  mplus:      { family: 'Rounded Mplus 1c Bold',     label: '丸ゴ M+ Rounded' },
  mplusBlk:   { family: 'Rounded Mplus 1c Black',    label: '丸ゴ M+ Black' },
  klee:       { family: 'Klee One SemiBold',         label: '教科書体 Klee' },
  yuji:       { family: 'Yuji Syuku',                label: '筆書 Yuji Syuku' },
  hachi:      { family: 'Hachi Maru Pop',            label: 'ポップ Hachi Maru' },
  noto:       { family: 'Noto Sans JP',              label: 'ゴシック Noto' },
};
const P = {
  rose:     { c1: '#ef9bb8', c2: '#d4567f', word: '#d4567f', tint: '#fdeef3', name: 'ローズ' },
  lavender: { c1: '#b9a5f5', c2: '#7b68ee', word: '#6a55da', tint: '#efebfd', name: 'ラベンダー' },
  plum:     { c1: '#c77db5', c2: '#8e3d7f', word: '#8e3d7f', tint: '#f6e9f2', name: 'プラム' },
  gold:     { c1: '#f0c45a', c2: '#d4940a', word: '#b87d08', tint: '#fdf4dd', name: 'ゴールド' },
  teal:     { c1: '#7fd4c0', c2: '#4eb89e', word: '#3a9580', tint: '#e6f6f1', name: 'ティール' },
  sunset:   { c1: '#f3a86b', c2: '#e8803d', word: '#d06a26', tint: '#fdeee1', name: 'サンセット' },
  coral:    { c1: '#f59b8a', c2: '#e8654d', word: '#d24f37', tint: '#fdece8', name: 'コーラル' },
  navy:     { c1: '#4a4668', c2: '#1a1825', word: '#1a1825', tint: '#e8e7ec', name: 'ナイト' },
  sky:      { c1: '#8fb8ec', c2: '#5b8dd9', word: '#3f74c4', tint: '#e9f1fb', name: 'スカイ' },
  berry:    { c1: '#d96f9c', c2: '#a83d6b', word: '#a83d6b', tint: '#f9e8f0', name: 'ベリー' },
};

// ワードマークのみ（アイコンなし）。bg: card/pastel/fill/grad/dark
const PATTERNS = [
  { font: 'zenKaku',    pal: 'rose',     size: 70, bg: 'fill',   sp: 4 },
  { font: 'zenMaru',    pal: 'lavender', size: 70, bg: 'grad',   sp: 4 },
  { font: 'mplus',      pal: 'plum',     size: 70, bg: 'dark',   sp: 4 },
  { font: 'zenKakuBlk', pal: 'gold',     size: 70, bg: 'card',   sp: 4 },
  { font: 'klee',       pal: 'teal',     size: 60, bg: 'pastel', sp: 6 },
  { font: 'mplusBlk',   pal: 'rose',     size: 68, bg: 'card',   sp: 4 },
  { font: 'zenMaru',    pal: 'berry',    size: 70, bg: 'grad',   sp: 8 },
  { font: 'zenKaku',    pal: 'lavender', size: 70, bg: 'dark',   sp: 4 },
  { font: 'zenMaruBlk', pal: 'sunset',   size: 68, bg: 'fill',   sp: 4 },
  { font: 'yuji',       pal: 'navy',     size: 64, bg: 'card',   sp: 10 },
  { font: 'mplus',      pal: 'coral',    size: 70, bg: 'pastel', sp: 4 },
  { font: 'noto',       pal: 'sky',      size: 66, bg: 'fill',   sp: 6 },
  { font: 'hachi',      pal: 'rose',     size: 56, bg: 'card',   sp: 6 },
  { font: 'zenKaku',    pal: 'gold',     size: 70, bg: 'dark',   sp: 4 },
  { font: 'mplusBlk',   pal: 'plum',     size: 68, bg: 'grad',   sp: 4 },
  { font: 'zenMaru',    pal: 'teal',     size: 70, bg: 'fill',   sp: 4 },
  { font: 'klee',       pal: 'berry',    size: 60, bg: 'pastel', sp: 6 },
  { font: 'zenKakuBlk', pal: 'coral',    size: 70, bg: 'grad',   sp: 4 },
  { font: 'yuji',       pal: 'gold',     size: 64, bg: 'card',   sp: 10 },
  { font: 'hachi',      pal: 'lavender', size: 56, bg: 'fill',   sp: 6 },
];

function resolve(pat, i) {
  const pal = P[pat.pal];
  switch (pat.bg) {
    case 'card':   return { bg: '#ffffff',     stroke: '#e8e0e8', text: '#1a1825', cap: '#9b92a4', capOp: 1,    tag: '白地・黒文字' };
    case 'pastel': return { bg: pal.tint,      stroke: 'none',    text: pal.word,  cap: pal.word,  capOp: 0.6,  tag: '淡色地' };
    case 'fill':   return { bg: pal.c2,        stroke: 'none',    text: '#ffffff', cap: '#ffffff', capOp: 0.8,  tag: 'ベタ塗り・白抜き' };
    case 'grad':   return { bg: `url(#b${i})`, stroke: 'none',    text: '#ffffff', cap: '#ffffff', capOp: 0.85, tag: 'グラデ・白抜き', bgGrad: true };
    case 'dark':   return { bg: '#1a1825',     stroke: 'none',    text: '#ffffff', cap: '#ffffff', capOp: 0.6,  tag: '濃紺地' };
  }
}

const cols = 4, rows = 5, cellW = 440, cellH = 200, gapX = 24, gapY = 24, padX = 30, padTop = 120, padBottom = 30;
const boardW = padX * 2 + cols * cellW + (cols - 1) * gapX;
const boardH = padTop + rows * cellH + (rows - 1) * gapY + padBottom;

let defs = '', cells = '';
PATTERNS.forEach((pat, i) => {
  const pal = P[pat.pal], font = F[pat.font], c = resolve(pat, i);
  if (c.bgGrad) defs += `<linearGradient id="b${i}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${pal.c1}"/><stop offset="1" stop-color="${pal.c2}"/></linearGradient>`;
  const col = i % cols, row = Math.floor(i / cols);
  const x = padX + col * (cellW + gapX), y = padTop + row * (cellH + gapY);
  const num = String(i + 1).padStart(2, '0');
  cells += `<g transform="translate(${x},${y})">
    <rect width="${cellW}" height="${cellH}" rx="18" fill="${c.bg}" stroke="${c.stroke}"/>
    <text x="${cellW / 2}" y="${cellH / 2 + pat.size * 0.36 - 8}" text-anchor="middle" font-family="${font.family}" font-size="${pat.size}" letter-spacing="${pat.sp}" fill="${c.text}">まいスピ</text>
    <text x="${cellW / 2}" y="180" text-anchor="middle" font-family="Zen Kaku Gothic New" font-size="14" fill="${c.cap}" opacity="${c.capOp}">${num} · ${font.label} · ${pal.name} · ${c.tag}</text>
  </g>`;
});

const board = `<svg width="${boardW}" height="${boardH}" viewBox="0 0 ${boardW} ${boardH}" xmlns="http://www.w3.org/2000/svg">
  <defs>${defs}</defs>
  <rect width="${boardW}" height="${boardH}" fill="#fafafa"/>
  <text x="${padX}" y="58" font-family="Zen Kaku Gothic New Black" font-size="38" fill="#da668e">まいスピ ロゴ — 20パターン（アイコンなし・ワードマークのみ）</text>
  <text x="${padX}" y="90" font-family="Zen Kaku Gothic New" font-size="17" fill="#6b6479">明朝を除外／黒文字・背景色・白抜きを採用（番号でご指定ください）</text>
  ${cells}
</svg>`;

const r = new Resvg(board, { font: fontOpts, fitTo: { mode: 'width', value: Math.round(boardW * 1.4) } });
fs.writeFileSync('assets/brand/variations-20c-wordmark.png', r.render().asPng());
console.log('wrote assets/brand/variations-20c-wordmark.png', `${boardW}x${boardH}`);
