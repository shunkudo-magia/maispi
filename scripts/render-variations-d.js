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
const COLORS = {
  black:    { hex: '#1a1825', name: 'ブラック' },
  rose:     { hex: '#d4567f', name: 'ローズ' },
  lavender: { hex: '#6a55da', name: 'ラベンダー' },
  plum:     { hex: '#8e3d7f', name: 'プラム' },
  gold:     { hex: '#b87d08', name: 'ゴールド' },
  teal:     { hex: '#3a9580', name: 'ティール' },
  sunset:   { hex: '#d06a26', name: 'サンセット' },
  coral:    { hex: '#d24f37', name: 'コーラル' },
  navy:     { hex: '#3a3658', name: 'ネイビー' },
  sky:      { hex: '#3f74c4', name: 'スカイ' },
  berry:    { hex: '#a83d6b', name: 'ベリー' },
};

// 背景なし（白地）・ワードマークのみ。書体 × 文字色 × 字間 のみで差別化
const PATTERNS = [
  { font: 'zenKaku',    color: 'black',    size: 70, sp: 4 },
  { font: 'zenKakuBlk', color: 'rose',     size: 70, sp: 4 },
  { font: 'zenMaru',    color: 'black',    size: 70, sp: 4 },
  { font: 'zenMaruBlk', color: 'lavender', size: 68, sp: 4 },
  { font: 'mplus',      color: 'black',    size: 70, sp: 4 },
  { font: 'mplusBlk',   color: 'rose',     size: 68, sp: 4 },
  { font: 'klee',       color: 'black',    size: 60, sp: 6 },
  { font: 'yuji',       color: 'black',    size: 64, sp: 10 },
  { font: 'noto',       color: 'black',    size: 66, sp: 6 },
  { font: 'hachi',      color: 'rose',     size: 56, sp: 6 },
  { font: 'zenKaku',    color: 'plum',     size: 70, sp: 10 },
  { font: 'zenMaruBlk', color: 'gold',     size: 68, sp: 4 },
  { font: 'mplus',      color: 'teal',     size: 70, sp: 4 },
  { font: 'mplusBlk',   color: 'navy',     size: 68, sp: 4 },
  { font: 'klee',       color: 'berry',    size: 60, sp: 6 },
  { font: 'yuji',       color: 'gold',     size: 64, sp: 10 },
  { font: 'noto',       color: 'sky',      size: 66, sp: 6 },
  { font: 'zenMaru',    color: 'coral',    size: 70, sp: 4 },
  { font: 'zenKakuBlk', color: 'black',    size: 66, sp: 16 },
  { font: 'hachi',      color: 'lavender', size: 56, sp: 6 },
];

const cols = 4, rows = 5, cellW = 440, cellH = 200, gapX = 24, gapY = 24, padX = 30, padTop = 120, padBottom = 30;
const boardW = padX * 2 + cols * cellW + (cols - 1) * gapX;
const boardH = padTop + rows * cellH + (rows - 1) * gapY + padBottom;

let cells = '';
PATTERNS.forEach((pat, i) => {
  const font = F[pat.font], col = COLORS[pat.color];
  const c = i % cols, row = Math.floor(i / cols);
  const x = padX + c * (cellW + gapX), y = padTop + row * (cellH + gapY);
  const num = String(i + 1).padStart(2, '0');
  cells += `<g transform="translate(${x},${y})">
    <rect width="${cellW}" height="${cellH}" rx="18" fill="#ffffff" stroke="#e8e0e8"/>
    <text x="${cellW / 2}" y="${cellH / 2 + pat.size * 0.36 - 8}" text-anchor="middle" font-family="${font.family}" font-size="${pat.size}" letter-spacing="${pat.sp}" fill="${col.hex}">まいスピ</text>
    <text x="${cellW / 2}" y="180" text-anchor="middle" font-family="Zen Kaku Gothic New" font-size="14" fill="#9b92a4">${num} · ${font.label} · ${col.name}</text>
  </g>`;
});

const board = `<svg width="${boardW}" height="${boardH}" viewBox="0 0 ${boardW} ${boardH}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${boardW}" height="${boardH}" fill="#fafafa"/>
  <text x="${padX}" y="58" font-family="Zen Kaku Gothic New Black" font-size="38" fill="#da668e">まいスピ ロゴ — 20パターン（背景なし・白地）</text>
  <text x="${padX}" y="90" font-family="Zen Kaku Gothic New" font-size="17" fill="#6b6479">明朝除外／ワードマークのみ・書体×文字色×字間（番号でご指定ください）</text>
  ${cells}
</svg>`;

const r = new Resvg(board, { font: fontOpts, fitTo: { mode: 'width', value: Math.round(boardW * 1.4) } });
fs.writeFileSync('assets/brand/variations-20d-nobg.png', r.render().asPng());
console.log('wrote assets/brand/variations-20d-nobg.png', `${boardW}x${boardH}`);
