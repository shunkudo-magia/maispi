const fs = require('fs');
const path = require('path');
const { Resvg } = require('@resvg/resvg-js');

const FD = 'node_modules/@expo-google-fonts';
const fontFiles = [
  'zen-maru-gothic/ZenMaruGothic_700Bold.ttf',
  'zen-maru-gothic/ZenMaruGothic_500Medium.ttf',
  'zen-maru-gothic/ZenMaruGothic_400Regular.ttf',
  'noto-sans-jp/NotoSansJP_400Regular.ttf',
  'noto-sans-jp/NotoSansJP_500Medium.ttf',
  'zen-kaku-gothic-new/700Bold/ZenKakuGothicNew_700Bold.ttf',
].map((f) => path.resolve(FD, f));
const fontOpts = { fontFiles, loadSystemFonts: false, defaultFontFamily: 'Zen Maru Gothic' };

const ZM = 'Zen Maru Gothic'; // bold/medium/regular は weight 指定
const NOTO = 'Noto Sans JP';
const ROSE = '#da668e', ROSE_D = '#c14e74', ROSE_L = '#fbe7ef', ACCENT = '#f6a9c4';
const BGALT = '#fbf4f7', SURFACE = '#fdf7fa', TEXT = '#2a2230', TSEC = '#6b6479', TMUTE = '#a99fb0', BORDER = '#efe2ea';

// --- マーク（三日月+星屑）---
const crescent = 'M62 16 A34 34 0 1 0 62 84 A50 50 0 0 1 62 16 Z';
function star5(cx, cy, R, ratio = 0.45) { let d = ''; for (let k = 0; k < 10; k++) { const a = ((-90 + k * 36) * Math.PI) / 180; const r = k % 2 ? R * ratio : R; d += (k ? 'L' : 'M') + (cx + r * Math.cos(a)).toFixed(2) + ' ' + (cy + r * Math.sin(a)).toFixed(2) + ' '; } return d + 'Z'; }
function mark(moon, star) { return `<path d="${crescent}" fill="${moon}"/><path d="${star5(76, 40, 11)}" fill="${star}"/><path d="${star5(82, 64, 6)}" fill="${star}" opacity="0.9"/><circle cx="68" cy="74" r="2.5" fill="${star}" opacity="0.8"/>`; }

const CATS = [
  { label: 'LOVE', bg: '#da668e', light: '#fbe7ef' },
  { label: 'MONEY', bg: '#d4940a', light: '#fef3d0' },
  { label: 'FAMILY', bg: '#4eb89e', light: '#e0f5f0' },
  { label: 'BODY', bg: '#7b68ee', light: '#ede9ff' },
];

// 簡易タブアイコン（24x24 基準, stroke）
function icon(name, color) {
  const s = `stroke="${color}" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"`;
  switch (name) {
    case 'moon': return `<path d="M20 15 A8 8 0 1 1 11 4 A6.2 6.2 0 1 0 20 15 Z" fill="${color}" stroke="none"/>`;
    case 'spark': return `<path d="M12 3 L13.6 10.4 L21 12 L13.6 13.6 L12 21 L10.4 13.6 L3 12 L10.4 10.4 Z" fill="${color}" stroke="none"/>`;
    case 'planet': return `<circle cx="12" cy="12" r="6" fill="${color}" stroke="none"/><ellipse cx="12" cy="12" rx="11" ry="4.4" ${s} transform="rotate(-25 12 12)"/>`;
    case 'book': return `<path d="M5 4 H16 A3 3 0 0 1 19 7 V20 H8 A3 3 0 0 1 5 17 Z" ${s}/><path d="M8 4 V17" ${s}/>`;
    case 'gear': return `<circle cx="12" cy="12" r="3.4" ${s}/><circle cx="12" cy="12" r="8" ${s} stroke-dasharray="2.2 3.1"/>`;
  }
}

// ====== オンボーディング画面 ======
function onboarding(x, y, w, h) {
  const cx = x + w / 2;
  return `
  <g>
    <clipPath id="obclip"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="40"/></clipPath>
    <g clip-path="url(#obclip)">
      <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${ROSE_L}"/>
      <!-- 白ディスク + ロゴ -->
      <circle cx="${cx}" cy="${y + 250}" r="120" fill="rgba(255,255,255,0.75)"/>
      <g transform="translate(${cx - 47},${y + 178}) scale(0.94)">${mark('url(#mkg)', ACCENT)}</g>
      <text x="${cx}" y="${y + 320}" text-anchor="middle" font-family="${ZM}" font-weight="700" font-size="40" letter-spacing="2" fill="${ROSE}">まいスピ</text>
      <!-- タイトル/本文 -->
      <text x="${cx}" y="${y + 430}" text-anchor="middle" font-family="${ZM}" font-weight="700" font-size="34" fill="${TEXT}">今日の運気を</text>
      <text x="${cx}" y="${y + 474}" text-anchor="middle" font-family="${ZM}" font-weight="700" font-size="34" fill="${TEXT}">毎朝チェック</text>
      <text x="${cx}" y="${y + 524}" text-anchor="middle" font-family="${NOTO}" font-size="19" fill="${TSEC}">気圧・月齢・あなたの属性から</text>
      <text x="${cx}" y="${y + 554}" text-anchor="middle" font-family="${NOTO}" font-size="19" fill="${TSEC}">パーソナルな運気を算出します</text>
      <!-- dots -->
      <rect x="${cx - 28}" y="${y + h - 200}" width="26" height="8" rx="4" fill="${ROSE}"/>
      <circle cx="${cx + 10}" cy="${y + h - 196}" r="4" fill="${BORDER}"/>
      <circle cx="${cx + 26}" cy="${y + h - 196}" r="4" fill="${BORDER}"/>
      <!-- pill button -->
      <rect x="${x + 40}" y="${y + h - 160}" width="${w - 80}" height="64" rx="32" fill="${ROSE}"/>
      <text x="${cx}" y="${y + h - 118}" text-anchor="middle" font-family="${ZM}" font-weight="700" font-size="22" fill="#fff" letter-spacing="1">次へ</text>
      <text x="${cx}" y="${y + h - 60}" text-anchor="middle" font-family="${NOTO}" font-size="17" fill="${TMUTE}">スキップ</text>
    </g>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="40" fill="none" stroke="#00000010"/>
  </g>`;
}

// ====== ホーム画面 ======
function home(x, y, w, h) {
  const pad = 28;
  const innerW = w - pad * 2;
  let s = `
  <clipPath id="hmclip"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="40"/></clipPath>
  <g clip-path="url(#hmclip)">
    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${BGALT}"/>
    <!-- header: logo + moon badge -->
    <g transform="translate(${x + pad},${y + 36}) scale(0.42)">${mark('url(#mkg)', ACCENT)}</g>
    <text x="${x + pad + 52}" y="${y + 72}" font-family="${ZM}" font-weight="700" font-size="30" letter-spacing="1" fill="${ROSE}">まいスピ</text>
    <rect x="${x + w - pad - 96}" y="${y + 48}" width="96" height="34" rx="17" fill="${ROSE_L}"/>
    <text x="${x + w - pad - 48}" y="${y + 71}" text-anchor="middle" font-family="${NOTO}" font-size="15" fill="${ROSE_D}">上弦の月</text>

    <!-- hero fortune card (rose) -->
    <rect x="${x + pad}" y="${y + 104}" width="${innerW}" height="180" rx="24" fill="${ROSE}"/>
    <g transform="translate(${x + w - pad - 150},${y + 86}) scale(1.5)" opacity="0.12">${mark('#ffffff', '#ffffff')}</g>
    <text x="${x + pad + 24}" y="${y + 140}" font-family="${ZM}" font-weight="700" font-size="16" letter-spacing="1" fill="rgba(255,255,255,0.9)">今日の運気</text>
    <circle cx="${x + w - pad - 46}" cy="${y + 138}" r="24" fill="rgba(255,255,255,0.22)"/>
    <text x="${x + w - pad - 46}" y="${y + 146}" text-anchor="middle" font-family="${ZM}" font-weight="700" font-size="22" fill="#fff">78</text>
    <text x="${x + pad + 24}" y="${y + 188}" font-family="${ZM}" font-weight="700" font-size="22" fill="#fff">静かに内省する日。</text>
    <text x="${x + pad + 24}" y="${y + 218}" font-family="${ZM}" font-weight="700" font-size="22" fill="#fff">焦りを手放すと道が開ける。</text>
    <text x="${x + pad + 24}" y="${y + 258}" font-family="${NOTO}" font-size="14" fill="rgba(255,255,255,0.8)">月齢</text>
    <text x="${x + pad + 24}" y="${y + 278}" font-family="${ZM}" font-weight="700" font-size="16" fill="#fff">12.3</text>
    <text x="${x + pad + 110}" y="${y + 258}" font-family="${NOTO}" font-size="14" fill="rgba(255,255,255,0.8)">気圧</text>
    <text x="${x + pad + 110}" y="${y + 278}" font-family="${ZM}" font-weight="700" font-size="16" fill="#fff">1013 hPa</text>

    <!-- section title -->
    <text x="${x + pad}" y="${y + 336}" font-family="${ZM}" font-weight="700" font-size="22" fill="${TEXT}">今月の特集</text>
  `;
  // feature grid 2x2
  const gw = (innerW - 16) / 2, gh = 92;
  CATS.forEach((c, i) => {
    const gx = x + pad + (i % 2) * (gw + 16);
    const gy = y + 356 + Math.floor(i / 2) * (gh + 16);
    s += `<rect x="${gx}" y="${gy}" width="${gw}" height="${gh}" rx="18" fill="${c.light}"/>
      <text x="${gx + 20}" y="${gy + 42}" font-family="${ZM}" font-weight="700" font-size="20" fill="${c.bg}">${c.label}</text>
      <text x="${gx + 20}" y="${gy + 68}" font-family="${NOTO}" font-size="14" fill="${TSEC}">4 記事</text>`;
  });
  // profile card
  const py = y + 356 + 2 * (gh + 16) + 8;
  s += `<rect x="${x + pad}" y="${py}" width="${innerW}" height="96" rx="20" fill="#fff" stroke="${BORDER}"/>
    <text x="${x + pad + 22}" y="${py + 34}" font-family="${ZM}" font-weight="700" font-size="17" fill="${TEXT}">診断でより精度が上がります</text>
    <text x="${x + pad + 22}" y="${py + 60}" font-family="${NOTO}" font-size="13" fill="${TSEC}">生年月日を登録するとパーソナライズ</text>
    <text x="${x + pad + 22}" y="${py + 82}" font-family="${ZM}" font-weight="700" font-size="14" fill="${ROSE}">診断を受ける →</text>`;

  // tab bar
  const tbH = 92, tbY = y + h - tbH;
  s += `<rect x="${x}" y="${tbY}" width="${w}" height="${tbH}" fill="#fff"/><line x1="${x}" y1="${tbY}" x2="${x + w}" y2="${tbY}" stroke="${BORDER}"/>`;
  const tabs = [['moon', 'ホーム', true], ['spark', '特集', false], ['planet', '診断', false], ['book', 'ログ', false], ['gear', '設定', false]];
  const tw = w / 5;
  tabs.forEach(([ic, label, active], i) => {
    const tcx = x + tw * i + tw / 2;
    const col = active ? ROSE : TMUTE;
    s += `<g transform="translate(${tcx - 12},${tbY + 18})">${icon(ic, col)}</g>
      <text x="${tcx}" y="${tbY + 62}" text-anchor="middle" font-family="${ZM}" font-weight="500" font-size="13" fill="${col}">${label}</text>`;
  });
  s += `</g><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="40" fill="none" stroke="#00000010"/>`;
  return s;
}

const PW = 430, PH = 880, gap = 60, pad = 50;
const W = pad * 2 + PW * 2 + gap, H = pad + 90 + PH + pad;
const svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="mkg" x1="20" y1="14" x2="70" y2="86" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ef9bb8"/><stop offset="1" stop-color="#d4567f"/></linearGradient></defs>
  <rect width="${W}" height="${H}" fill="#f2eaef"/>
  <text x="${pad}" y="60" font-family="${ZM}" font-weight="700" font-size="34" fill="${ROSE}">まいスピ — 新ロゴに合わせた画面デザイン</text>
  ${onboarding(pad, 100, PW, PH)}
  ${home(pad + PW + gap, 100, PW, PH)}
  <text x="${pad + PW / 2}" y="${100 + PH + 34}" text-anchor="middle" font-family="${ZM}" font-weight="500" font-size="20" fill="${TSEC}">オンボーディング</text>
  <text x="${pad + PW + gap + PW / 2}" y="${100 + PH + 34}" text-anchor="middle" font-family="${ZM}" font-weight="500" font-size="20" fill="${TSEC}">ホーム</text>
</svg>`;

const r = new Resvg(svg, { font: fontOpts, fitTo: { mode: 'width', value: Math.round(W * 1.5) } });
fs.writeFileSync('assets/brand/app-redesign-mockup.png', r.render().asPng());
console.log('wrote assets/brand/app-redesign-mockup.png', `${W}x${H}`);
