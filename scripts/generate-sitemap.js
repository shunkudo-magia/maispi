// expo export 後に dist/sitemap.xml を生成する（vercel.json の buildCommand から呼び出し）。
// microCMS の環境変数が無い場合は静的ページのみのサイトマップを書き出す。
const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://my-spi.com';
const OUT_DIR = path.resolve(__dirname, '..', 'dist');
const SERVICE_DOMAIN = process.env.EXPO_PUBLIC_MICROCMS_SERVICE_DOMAIN;
const API_KEY = process.env.EXPO_PUBLIC_MICROCMS_API_KEY;

const STATIC_PATHS = [
  { path: '/', changefreq: 'daily', priority: '1.0' },
  { path: '/features', changefreq: 'daily', priority: '0.8' },
  { path: '/diagnosis', changefreq: 'weekly', priority: '0.7' },
];

async function fetchAll(endpoint) {
  const contents = [];
  const limit = 100;
  let offset = 0;

  for (;;) {
    const url = `https://${SERVICE_DOMAIN}.microcms.io/api/v1/${endpoint}?limit=${limit}&offset=${offset}`;
    const res = await fetch(url, { headers: { 'X-MICROCMS-API-KEY': API_KEY } });
    if (!res.ok) throw new Error(`microCMS ${endpoint} fetch failed: ${res.status}`);
    const data = await res.json();
    contents.push(...data.contents);
    offset += limit;
    if (offset >= data.totalCount) break;
  }

  return contents;
}

function urlEntry({ path: urlPath, lastmod, changefreq, priority }) {
  const lines = [`  <url>`, `    <loc>${SITE_URL}${urlPath}</loc>`];
  if (lastmod) lines.push(`    <lastmod>${lastmod}</lastmod>`);
  if (changefreq) lines.push(`    <changefreq>${changefreq}</changefreq>`);
  if (priority) lines.push(`    <priority>${priority}</priority>`);
  lines.push(`  </url>`);
  return lines.join('\n');
}

async function main() {
  const entries = STATIC_PATHS.map((p) => urlEntry(p));

  if (SERVICE_DOMAIN && API_KEY) {
    try {
      const [features, articles] = await Promise.all([
        fetchAll('features'),
        fetchAll('articles'),
      ]);

      for (const f of features) {
        entries.push(
          urlEntry({ path: `/feature/${f.id}`, lastmod: f.revisedAt ?? f.updatedAt, changefreq: 'weekly', priority: '0.6' })
        );
      }
      for (const a of articles) {
        entries.push(
          urlEntry({ path: `/article/${a.id}`, lastmod: a.revisedAt ?? a.updatedAt, changefreq: 'monthly', priority: '0.6' })
        );
      }
    } catch (err) {
      console.warn('[generate-sitemap] microCMS からの取得に失敗、静的ページのみで出力します:', err.message);
    }
  } else {
    console.warn('[generate-sitemap] microCMS の env が未設定のため、静的ページのみで出力します。');
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</urlset>\n`;

  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(path.join(OUT_DIR, 'sitemap.xml'), xml);
  console.log(`[generate-sitemap] wrote ${entries.length} urls to dist/sitemap.xml`);
}

main().catch((err) => {
  console.error('[generate-sitemap] failed:', err);
  process.exit(1);
});
