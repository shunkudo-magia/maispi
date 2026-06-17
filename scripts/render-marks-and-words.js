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

// 20色（マーク・文字の同じ番号は同じ色 → 自由に組み合わせ可能）
const COLORS = [
  { c1: '#ef9bb8', c2: '#d4567f', accent: '#f6a9c4', solid: '#d4567f', name: 'ローズ' },
  { c1: '#b9a5f5', c2: '#7b68ee', accent: '#c9bdf7', solid: '#6a55da', name: 'ラベンダー' },
  { c1: '#c77db5', c2: '#8e3d7f', accent: '#e0a9d4', solid: '#8e3d7f', name: 'プラム' },
  { c1: '#f0c45a', c2: '#d4940a', accent: '#f6dd9a', solid: '#b87d08', name: 'ゴールド' },
  { c1: '#7fd4c0', c2: '#4eb89e', accent: '#a9e3d6', solid: '#3a9580', name: 'ティール' },
  { c1: '#f3a86b', c2: '#e8803d', accent: '#f6c39a', solid: '#d06a26', name: 'サンセット' },
  { c1: '#f59b8a', c2: '#e8654d', accent: '#f6b8ad', solid: '#d24f37', name: 'コーラル' },
  { c1: '#4a4668', c2: '#1a1825', accent: '#9b92a4', solid: '#1a1825', name: 'ブラック' },
  { c1: '#8fb8ec', c2: '#5b8dd9', accent: '#b3cef2', solid: '#3f74c4', name: 'スカイ' },
  { c1: '#d96f9c', c2: '#a83d6b', accent: '#eaa0bf', solid: '#a83d6b', name: 'ベリー' },
  { c1: '#9adcc7', c2: '#6dc7ad', accent: '#c0ebde', solid: '#479579', name: 'ミント' },
  { c1: '#e6b06a', c2: '#c87b1f', accent: '#f0cea0', solid: '#a0610f', name: 'アンバー' },
  { c1: '#b85a72', c2: '#7a2a3e', accent: '#d088a0', solid: '#7a2a3e', name: 'ワイン' },
  { c1: '#7a6cb8', c2: '#4a3d8a', accent: '#a097d6', solid: '#3a2f6e', name: 'インディゴ' },
  { c1: '#f5b59c', c2: '#f29b7c', accent: '#f9cebd', solid: '#d97349', name: 'ピーチ' },
  { c1: '#bf95bc', c2: '#a979a3', accent: '#d6b6d2', solid: '#8a5d86', name: 'モーブ' },
  { c1: '#6ea986', c2: '#3d6e54', accent: '#9ac4ac', solid: '#2e5740', name: 'フォレスト' },
  { c1: '#d4647a', c2: '#b83a4f', accent: '#e89aab', solid: '#9c2c3f', name: 'チェリー' },
  { c1: '#f2b3c4', c2: '#e890a9', accent: '#f7cfdc', solid: '#c66f8a', name: 'ブロッサム' },
  { c1: '#7a818f', c2: '#4d5468', accent: '#a3aab8', solid: '#3a4054', name: 'スレート' },
];

// ---- マーク形状 20種 ----
const crescent = 'M62 16 A34 34 0 1 0 62 84 A50 50 0 0 1 62 16 Z';
const spark4 = (cx, cy, r) => { const i = r * 0.34; return `M${cx} ${cy - r} Q${cx + i} ${cy - i} ${cx + r} ${cy} Q${cx + i} ${cy + i} ${cx} ${cy + r} Q${cx - i} ${cy + i} ${cx - r} ${cy} Q${cx - i} ${cy - i} ${cx} ${cy - r} Z`; };
const star5 = (cx, cy, R, ratio = 0.45) => { let d = ''; for (let k = 0; k < 10; k++) { const a = (-90 + k * 36) * Math.PI / 180; const rad = k % 2 ? R * ratio : R; d += (k ? 'L' : 'M') + (cx + rad * Math.cos(a)).toFixed(2) + ' ' + (cy + rad * Math.sin(a)).toFixed(2) + ' '; } return d + 'Z'; };
const star6 = (cx, cy, R) => {
  const tri = (rot) => { let d = ''; for (let k = 0; k < 3; k++) { const a = (rot + k * 120) * Math.PI / 180; d += (k ? 'L' : 'M') + (cx + R * Math.cos(a)).toFixed(2) + ' ' + (cy + R * Math.sin(a)).toFixed(2) + ' '; } return d + 'Z '; };
  return tri(-90) + tri(90);
};

const MARK_SHAPES = [
  // 01: 三日月+きらめき
  (g, a) => `<path d="${crescent}" fill="${g}"/><path d="${spark4(73, 50, 14)}" fill="${a}"/><circle cx="84" cy="30" r="3" fill="${a}"/><circle cx="80" cy="70" r="2" fill="${a}" opacity="0.85"/>`,
  // 02: 三日月のみ
  (g) => `<path d="${crescent}" fill="${g}"/>`,
  // 03: 三日月+星屑
  (g, a) => `<path d="${crescent}" fill="${g}"/><path d="${star5(76, 40, 11)}" fill="${a}"/><path d="${star5(82, 64, 6)}" fill="${a}" opacity="0.9"/><circle cx="68" cy="74" r="2.5" fill="${a}" opacity="0.8"/>`,
  // 04: 四芒星（きらめき大）
  (g, a) => `<path d="${spark4(50, 50, 36)}" fill="${g}"/><path d="${spark4(82, 26, 9)}" fill="${a}"/><path d="${spark4(24, 76, 6)}" fill="${a}" opacity="0.9"/>`,
  // 05: 五芒星
  (g, a) => `<path d="${star5(50, 50, 38)}" fill="${g}"/><path d="${star5(82, 24, 8)}" fill="${a}"/>`,
  // 06: 三日月＋満ちる円
  (g, a) => `<path d="${crescent}" fill="${g}"/><circle cx="74" cy="50" r="11" fill="${a}"/>`,
  // 07: きらめき三連
  (g, a) => `<path d="${spark4(44, 46, 28)}" fill="${g}"/><path d="${spark4(78, 30, 16)}" fill="${a}"/><path d="${spark4(76, 72, 11)}" fill="${g}" opacity="0.85"/>`,
  // 08: 宝石
  (g, a) => `<path d="M40 30 L80 30 L90 48 L60 86 L30 48 Z" fill="${g}"/><path d="M40 30 L60 48 L30 48 Z" fill="${a}" opacity="0.55"/><path d="M80 30 L60 48 L90 48 Z" fill="${a}" opacity="0.35"/>`,
  // 09: 蓮（花）
  (g, a) => `<path d="M60 26 Q74 54 60 84 Q46 54 60 26 Z" fill="${g}"/><path d="M60 84 Q38 64 32 38 Q54 50 60 84 Z" fill="${g}" opacity="0.8"/><path d="M60 84 Q82 64 88 38 Q66 50 60 84 Z" fill="${g}" opacity="0.8"/><circle cx="60" cy="78" r="5" fill="${a}"/>`,
  // 10: 満月+きらめき
  (g, a) => `<circle cx="52" cy="52" r="32" fill="${g}"/><path d="${spark4(82, 28, 13)}" fill="${a}"/><path d="${spark4(86, 60, 6)}" fill="${a}" opacity="0.9"/>`,
  // 11: 三日月アウトライン+きらめき
  (g, a) => `<path d="${crescent}" fill="none" stroke="${g}" stroke-width="6" stroke-linejoin="round"/><path d="${spark4(74, 50, 12)}" fill="${a}"/>`,
  // 12: 太陽（月＋光線）
  (g, a) => `<circle cx="50" cy="50" r="22" fill="${g}"/><g stroke="${g}" stroke-width="5" stroke-linecap="round"><line x1="50" y1="14" x2="50" y2="24"/><line x1="50" y1="76" x2="50" y2="86"/><line x1="14" y1="50" x2="24" y2="50"/><line x1="76" y1="50" x2="86" y2="50"/><line x1="24" y1="24" x2="31" y2="31"/><line x1="69" y1="69" x2="76" y2="76"/><line x1="24" y1="76" x2="31" y2="69"/><line x1="69" y1="31" x2="76" y2="24"/></g>`,
  // 13: リング（円輪）+ドット
  (g, a) => `<circle cx="50" cy="50" r="32" fill="none" stroke="${g}" stroke-width="7"/><circle cx="82" cy="22" r="6" fill="${a}"/>`,
  // 14: 三日月＋スパーク多
  (g, a) => `<path d="${crescent}" fill="${g}"/><path d="${spark4(78, 32, 8)}" fill="${a}"/><path d="${spark4(82, 56, 7)}" fill="${a}"/><path d="${spark4(70, 76, 5)}" fill="${a}" opacity="0.85"/>`,
  // 15: ダビデの星（六芒星）
  (g, a) => `<path d="${star6(50, 50, 36)}" fill="${g}"/><path d="${spark4(82, 76, 6)}" fill="${a}"/>`,
  // 16: 月相（三日月→半月→満月）
  (g) => `<path d="M28 30 A20 20 0 1 0 28 70 A30 30 0 0 1 28 30 Z" fill="${g}"/><path d="M50 30 A20 20 0 1 0 50 70 Z" fill="${g}"/><circle cx="78" cy="50" r="13" fill="${g}"/>`,
  // 17: コンパス（方位）
  (g, a) => `<circle cx="50" cy="50" r="34" fill="none" stroke="${g}" stroke-width="4"/><path d="M50 16 L58 50 L50 84 L42 50 Z" fill="${g}"/><circle cx="50" cy="50" r="5" fill="${a}"/>`,
  // 18: 渦巻き（スパイラル）
  (g, a) => `<path d="M50 50 m-30 0 a30 30 0 1 1 0 1 a25 25 0 1 0 0 -1 a20 20 0 1 1 0 1 a15 15 0 1 0 0 -1" fill="none" stroke="${g}" stroke-width="5" stroke-linecap="round"/><circle cx="50" cy="50" r="4" fill="${a}"/>`,
  // 19: 花（4枚花弁）
  (g, a) => `<g><ellipse cx="50" cy="26" rx="12" ry="20" fill="${g}"/><ellipse cx="50" cy="74" rx="12" ry="20" fill="${g}"/><ellipse cx="26" cy="50" rx="20" ry="12" fill="${g}" opacity="0.9"/><ellipse cx="74" cy="50" rx="20" ry="12" fill="${g}" opacity="0.9"/><circle cx="50" cy="50" r="7" fill="${a}"/></g>`,
  // 20: 三角（山）+月
  (g, a) => `<path d="M20 80 L50 32 L80 80 Z" fill="${g}"/><circle cx="62" cy="34" r="9" fill="${a}"/>`,
];

// ---- 文字スタイル 20種（書体×字間） ----
const F = {
  zenKaku:    'Zen Kaku Gothic New',
  zenKakuBlk: 'Zen Kaku Gothic New Black',
  zenMaru:    'Zen Maru Gothic',
  zenMaruBlk: 'Zen Maru Gothic Black',
  mplus:      'Rounded Mplus 1c Bold',
  mplusBlk:   'Rounded Mplus 1c Black',
  klee:       'Klee One SemiBold',
  yuji:       'Yuji Syuku',
  hachi:      'Hachi Maru Pop',
  noto:       'Noto Sans JP',
};
const WORD_STYLES = [
  { font: F.zenKaku,    label: 'Zen Kaku',         size: 70, sp: 4 },
  { font: F.zenKakuBlk, label: 'Zen Kaku Black',   size: 70, sp: 4 },
  { font: F.zenMaru,    label: 'Zen Maru',         size: 70, sp: 4 },
  { font: F.zenMaruBlk, label: 'Zen Maru Black',   size: 68, sp: 4 },
  { font: F.mplus,      label: 'M+ Rounded',       size: 70, sp: 4 },
  { font: F.mplusBlk,   label: 'M+ Black',         size: 68, sp: 4 },
  { font: F.klee,       label: 'Klee 教科書',      size: 60, sp: 6 },
  { font: F.yuji,       label: 'Yuji 筆書',        size: 64, sp: 10 },
  { font: F.hachi,      label: 'Hachi Maru Pop',   size: 56, sp: 6 },
  { font: F.noto,       label: 'Noto Sans JP',     size: 66, sp: 6 },
  { font: F.zenKaku,    label: 'Zen Kaku 字間広',  size: 64, sp: 16 },
  { font: F.zenMaru,    label: 'Zen Maru 字間広',  size: 64, sp: 14 },
  { font: F.mplusBlk,   label: 'M+ Black 字間広',  size: 64, sp: 12 },
  { font: F.zenKakuBlk, label: 'Zen Kaku Black 詰', size: 72, sp: 0 },
  { font: F.zenMaruBlk, label: 'Zen Maru Black 詰', size: 72, sp: 0 },
  { font: F.klee,       label: 'Klee 字間広',      size: 56, sp: 14 },
  { font: F.yuji,       label: 'Yuji 字間広',      size: 60, sp: 18 },
  { font: F.hachi,      label: 'Hachi 字間広',     size: 52, sp: 14 },
  { font: F.noto,       label: 'Noto 字間広',      size: 60, sp: 14 },
  { font: F.mplus,      label: 'M+ Rounded 字間広', size: 64, sp: 14 },
];

// ---- レイアウト ----
const cols = 4, rows = 5, cellW = 440, cellH = 200, gapX = 24, gapY = 24, padX = 30, padTop = 120, padBottom = 30;
const boardW = padX * 2 + cols * cellW + (cols - 1) * gapX;
const boardH = padTop + rows * cellH + (rows - 1) * gapY + padBottom;

function buildBoard(title, subtitle, builder) {
  let defs = '', cells = '';
  COLORS.forEach((col, i) => {
    defs += `<linearGradient id="g${i}" x1="20" y1="14" x2="78" y2="86" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="${col.c1}"/><stop offset="1" stop-color="${col.c2}"/></linearGradient>`;
    const c = i % cols, row = Math.floor(i / cols);
    const x = padX + c * (cellW + gapX), y = padTop + row * (cellH + gapY);
    const num = String(i + 1).padStart(2, '0');
    cells += `<g transform="translate(${x},${y})">
      <rect width="${cellW}" height="${cellH}" rx="18" fill="#ffffff" stroke="#e8e0e8"/>
      ${builder(i, col)}
      <text x="${cellW / 2}" y="180" text-anchor="middle" font-family="Zen Kaku Gothic New" font-size="14" fill="#9b92a4">${num} · ${col.name}</text>
    </g>`;
  });
  return `<svg width="${boardW}" height="${boardH}" viewBox="0 0 ${boardW} ${boardH}" xmlns="http://www.w3.org/2000/svg">
    <defs>${defs}</defs>
    <rect width="${boardW}" height="${boardH}" fill="#fafafa"/>
    <text x="${padX}" y="58" font-family="Zen Kaku Gothic New Black" font-size="38" fill="#da668e">${title}</text>
    <text x="${padX}" y="90" font-family="Zen Kaku Gothic New" font-size="17" fill="#6b6479">${subtitle}</text>
    ${cells}
  </svg>`;
}

// マークシート: 中央に大きめのマーク
const markBoard = buildBoard(
  'まいスピ ロゴマーク — 20パターン',
  'マーク単体（色は文字シートと同一インデックス・自由に組み合わせ可）',
  (i, col) => {
    const cx = cellW / 2 - 60;
    return `<g transform="translate(${cx},32) scale(1.32)">${MARK_SHAPES[i](`url(#g${i})`, col.accent)}</g>`;
  }
);

// 文字シート: 中央に大きく「まいスピ」
const wordBoard = buildBoard(
  'まいスピ ワードマーク — 20パターン',
  '文字のみ（色はマークシートと同一インデックス・自由に組み合わせ可）',
  (i, col) => {
    const style = WORD_STYLES[i];
    return `<text x="${cellW / 2}" y="${cellH / 2 + style.size * 0.36 - 8}" text-anchor="middle" font-family="${style.font}" font-size="${style.size}" letter-spacing="${style.sp}" fill="${col.solid}">まいスピ</text>
            <text x="${cellW / 2}" y="36" text-anchor="middle" font-family="Zen Kaku Gothic New" font-size="13" fill="#c8c0d0">${style.label}</text>`;
  }
);

function write(svg, out) {
  const r = new Resvg(svg, { font: fontOpts, fitTo: { mode: 'width', value: Math.round(boardW * 1.4) } });
  fs.writeFileSync(out, r.render().asPng());
  console.log('wrote', out);
}
write(markBoard, 'assets/brand/marks-20.png');
write(wordBoard, 'assets/brand/wordmarks-20.png');

// ===== 全マークをローズで統一した一覧 =====
const ROSE = { c1: '#ef9bb8', c2: '#d4567f', accent: '#f6a9c4' };
let roseDefs = `<linearGradient id="rose" x1="20" y1="14" x2="80" y2="86" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="${ROSE.c1}"/><stop offset="1" stop-color="${ROSE.c2}"/></linearGradient>`;
let roseCells = '';
const MARK_NAMES = ['三日月＋きらめき', '三日月のみ', '三日月＋星屑', '四芒星', '五芒星', '三日月＋満ちる円', 'きらめき三連', '宝石', '蓮', '満月＋きらめき', '三日月アウトライン', '太陽', 'リング', '三日月＋多きらめき', '六芒星', '月相3つ', 'コンパス', '渦巻き', '花4弁', '山＋月'];
MARK_SHAPES.forEach((shape, i) => {
  const c = i % cols, row = Math.floor(i / cols);
  const x = padX + c * (cellW + gapX), y = padTop + row * (cellH + gapY);
  const num = String(i + 1).padStart(2, '0');
  const cx = cellW / 2 - 60;
  roseCells += `<g transform="translate(${x},${y})">
    <rect width="${cellW}" height="${cellH}" rx="18" fill="#ffffff" stroke="#e8e0e8"/>
    <g transform="translate(${cx},32) scale(1.32)">${shape('url(#rose)', ROSE.accent)}</g>
    <text x="${cellW / 2}" y="180" text-anchor="middle" font-family="Zen Kaku Gothic New" font-size="14" fill="#9b92a4">${num} · ${MARK_NAMES[i]}</text>
  </g>`;
});
const roseBoard = `<svg width="${boardW}" height="${boardH}" viewBox="0 0 ${boardW} ${boardH}" xmlns="http://www.w3.org/2000/svg">
  <defs>${roseDefs}</defs>
  <rect width="${boardW}" height="${boardH}" fill="#fafafa"/>
  <text x="${padX}" y="58" font-family="Zen Kaku Gothic New Black" font-size="38" fill="#d4567f">まいスピ ロゴマーク — 20種（ローズ統一）</text>
  <text x="${padX}" y="90" font-family="Zen Kaku Gothic New" font-size="17" fill="#6b6479">色をローズに統一して形だけで比較（番号でご指定ください）</text>
  ${roseCells}
</svg>`;
write(roseBoard, 'assets/brand/marks-20-rose.png');
