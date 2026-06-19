const fs = require('fs');
const path = require('path');
const { Resvg } = require('@resvg/resvg-js');

const FD = 'node_modules/@expo-google-fonts';
const fontFiles = [
  'zen-maru-gothic/ZenMaruGothic_700Bold.ttf',
  'zen-maru-gothic/ZenMaruGothic_500Medium.ttf',
  'noto-sans-jp/NotoSansJP_400Regular.ttf',
  'noto-sans-jp/NotoSansJP_500Medium.ttf',
].map((f) => path.resolve(FD, f));
const fontOpts = { fontFiles, loadSystemFonts: false, defaultFontFamily: 'Zen Maru Gothic' };

const ZM = 'Zen Maru Gothic', NOTO = 'Noto Sans JP';
const ROSE = '#da668e', ROSE_L = '#fbe7ef', ROSE_D = '#c14e74', ACCENT = '#f6a9c4';
const BGALT = '#fbf4f7', TEXT = '#2a2230', TSEC = '#6b6479', TMUTE = '#a99fb0', BORDER = '#efe2ea';

const crescent = 'M62 16 A34 34 0 1 0 62 84 A50 50 0 0 1 62 16 Z';
function star5(cx, cy, R, ratio = 0.45) { let d = ''; for (let k = 0; k < 10; k++) { const a = ((-90 + k * 36) * Math.PI) / 180; const r = k % 2 ? R * ratio : R; d += (k ? 'L' : 'M') + (cx + r * Math.cos(a)).toFixed(2) + ' ' + (cy + r * Math.sin(a)).toFixed(2) + ' '; } return d + 'Z'; }
function mark(moon, star) { return `<path d="${crescent}" fill="${moon}"/><path d="${star5(76, 40, 11)}" fill="${star}"/><path d="${star5(82, 64, 6)}" fill="${star}" opacity="0.9"/><circle cx="68" cy="74" r="2.5" fill="${star}" opacity="0.8"/>`; }
const CATS = [
  { label: 'LOVE', bg: '#da668e', light: '#fbe7ef' },
  { label: 'MONEY', bg: '#d4940a', light: '#fef3d0' },
  { label: 'FAMILY', bg: '#4eb89e', light: '#e0f5f0' },
  { label: 'BODY', bg: '#7b68ee', light: '#ede9ff' },
];
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

// アプリ ホーム画面のカラム（角丸なし・上下フル）
function homeColumn(x, y, w, h) {
  const pad = 26;
  const innerW = w - pad * 2;
  let s = `<clipPath id="col"><rect x="${x}" y="${y}" width="${w}" height="${h}"/></clipPath><g clip-path="url(#col)">
    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${BGALT}"/>
    <g transform="translate(${x + pad},${y + 30}) scale(0.42)">${mark('url(#mkg)', ACCENT)}</g>
    <text x="${x + pad + 50}" y="${y + 64}" font-family="${ZM}" font-weight="700" font-size="29" letter-spacing="1" fill="${ROSE}">まいスピ</text>
    <rect x="${x + w - pad - 92}" y="${y + 42}" width="92" height="32" rx="16" fill="${ROSE_L}"/>
    <text x="${x + w - pad - 46}" y="${y + 64}" text-anchor="middle" font-family="${NOTO}" font-size="14" fill="${ROSE_D}">上弦の月</text>

    <rect x="${x + pad}" y="${y + 92}" width="${innerW}" height="172" rx="24" fill="${ROSE}"/>
    <g transform="translate(${x + w - pad - 140},${y + 76}) scale(1.45)" opacity="0.12">${mark('#ffffff', '#ffffff')}</g>
    <text x="${x + pad + 22}" y="${y + 126}" font-family="${ZM}" font-weight="700" font-size="15" letter-spacing="1" fill="rgba(255,255,255,0.9)">今日の運気</text>
    <circle cx="${x + w - pad - 44}" cy="${y + 124}" r="22" fill="rgba(255,255,255,0.22)"/>
    <text x="${x + w - pad - 44}" y="${y + 131}" text-anchor="middle" font-family="${ZM}" font-weight="700" font-size="20" fill="#fff">78</text>
    <text x="${x + pad + 22}" y="${y + 172}" font-family="${ZM}" font-weight="700" font-size="21" fill="#fff">静かに内省する日。</text>
    <text x="${x + pad + 22}" y="${y + 200}" font-family="${ZM}" font-weight="700" font-size="21" fill="#fff">焦りを手放すと道が開ける。</text>
    <text x="${x + pad + 22}" y="${y + 238}" font-family="${NOTO}" font-size="13" fill="rgba(255,255,255,0.8)">月齢 12.3 ・ 気圧 1013 hPa</text>

    <text x="${x + pad}" y="${y + 314}" font-family="${ZM}" font-weight="700" font-size="21" fill="${TEXT}">今月の特集</text>`;
  const gw = (innerW - 16) / 2, gh = 88;
  CATS.forEach((c, i) => {
    const gx = x + pad + (i % 2) * (gw + 16);
    const gy = y + 332 + Math.floor(i / 2) * (gh + 16);
    s += `<rect x="${gx}" y="${gy}" width="${gw}" height="${gh}" rx="18" fill="${c.light}"/>
      <text x="${gx + 18}" y="${gy + 40}" font-family="${ZM}" font-weight="700" font-size="19" fill="${c.bg}">${c.label}</text>
      <text x="${gx + 18}" y="${gy + 64}" font-family="${NOTO}" font-size="13" fill="${TSEC}">4 記事</text>`;
  });
  const py = y + 332 + 2 * (gh + 16) + 6;
  s += `<rect x="${x + pad}" y="${py}" width="${innerW}" height="92" rx="20" fill="#fff" stroke="${BORDER}"/>
    <text x="${x + pad + 20}" y="${py + 32}" font-family="${ZM}" font-weight="700" font-size="16" fill="${TEXT}">診断でより精度が上がります</text>
    <text x="${x + pad + 20}" y="${py + 56}" font-family="${NOTO}" font-size="12" fill="${TSEC}">生年月日を登録するとパーソナライズ</text>
    <text x="${x + pad + 20}" y="${py + 78}" font-family="${ZM}" font-weight="700" font-size="13" fill="${ROSE}">診断を受ける →</text>`;

  const tbH = 84, tbY = y + h - tbH;
  s += `<rect x="${x}" y="${tbY}" width="${w}" height="${tbH}" fill="#fff"/><line x1="${x}" y1="${tbY}" x2="${x + w}" y2="${tbY}" stroke="${BORDER}"/>`;
  const tabs = [['moon', 'ホーム', true], ['spark', '特集', false], ['planet', '診断', false], ['book', 'ログ', false], ['gear', '設定', false]];
  const tw = w / 5;
  tabs.forEach(([ic, label, active], i) => {
    const tcx = x + tw * i + tw / 2;
    const col = active ? ROSE : TMUTE;
    s += `<g transform="translate(${tcx - 12},${tbY + 16})">${icon(ic, col)}</g>
      <text x="${tcx}" y="${tbY + 58}" text-anchor="middle" font-family="${ZM}" font-weight="500" font-size="12" fill="${col}">${label}</text>`;
  });
  s += `</g>`;
  return s;
}

// ===== デスクトップ ブラウザ枠 =====
const W = 1280, H = 880, chrome = 64;
const colW = 480, colX = (W - colW) / 2, colY = chrome, colH = H - chrome;
const svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="mkg" x1="20" y1="14" x2="70" y2="86" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ef9bb8"/><stop offset="1" stop-color="#d4567f"/></linearGradient></defs>
  <rect width="${W}" height="${H}" fill="#f2eaef"/>
  <!-- ブラウザ クローム -->
  <rect x="0" y="0" width="${W}" height="${chrome}" fill="#ffffff"/>
  <line x1="0" y1="${chrome}" x2="${W}" y2="${chrome}" stroke="#e6dde4"/>
  <circle cx="28" cy="32" r="7" fill="#ff5f57"/><circle cx="52" cy="32" r="7" fill="#febc2e"/><circle cx="76" cy="32" r="7" fill="#28c840"/>
  <rect x="120" y="16" width="${W - 240}" height="32" rx="16" fill="#f3eef1"/>
  <text x="${W / 2}" y="38" text-anchor="middle" font-family="${NOTO}" font-size="15" fill="${TSEC}">🔒  my-spi.com</text>
  <!-- 中央 スマホ幅カラム（影付き） -->
  <rect x="${colX - 1}" y="${colY}" width="${colW + 2}" height="${colH}" fill="#000" opacity="0.06"/>
  ${homeColumn(colX, colY, colW, colH)}
  <text x="40" y="${chrome + 60}" font-family="${ZM}" font-weight="700" font-size="22" fill="${ROSE_D}">my-spi.com</text>
  <text x="40" y="${chrome + 90}" font-family="${NOTO}" font-size="15" fill="${TSEC}">広い画面では</text>
  <text x="40" y="${chrome + 114}" font-family="${NOTO}" font-size="15" fill="${TSEC}">中央のスマホ幅</text>
  <text x="40" y="${chrome + 138}" font-family="${NOTO}" font-size="15" fill="${TSEC}">カラムで表示</text>
</svg>`;

const r = new Resvg(svg, { font: fontOpts, fitTo: { mode: 'width', value: Math.round(W * 1.4) } });
fs.writeFileSync('assets/brand/web-redesign-preview.png', r.render().asPng());
console.log('wrote assets/brand/web-redesign-preview.png', `${W}x${H}`);
