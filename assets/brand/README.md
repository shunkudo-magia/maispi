# まいスピ ブランドロゴ

月齢占い・スピリチュアル系アプリ「まいスピ」のロゴ素材一式です。

## コンセプト（確定デザイン）

> **「六芒星とひらめきの光」**

- **六芒星（ヘキサグラム）** … 天と地の調和・スピリチュアルなシンボル
- **きらめき（四芒星）** … 気づき・内なる光
- ワードマークは丸ゴシックをゆったりした字間で、やわらかく親しみやすい印象に

> 採用デザイン: マーク=六芒星＋きらめき／文字=M+ Rounded（字間広）／色=ローズ

## カラー

| 用途 | カラー | HEX |
| --- | --- | --- |
| プライマリ（ローズ） | ● | `#da668e` |
| グラデーション明 | ● | `#ef9bb8` |
| グラデーション暗 | ● | `#d4567f` |
| ライトピンク（背景） | ● | `#fbe7ef` |
| きらめき明 | ● | `#ffd9e6` |
| きらめき／アクセント | ● | `#f6a9c4` |

## 書体（ワードマーク）

- **M+ Rounded 1c Bold**（丸ゴシック）／字間広め（letter-spacing 約 0.14em）
- フォールバック: Hiragino Maru Gothic ProN / sans-serif
- アプリ内では `FontFamily.roundedBold`（`MPLUSRounded1c_700Bold`）を使用

## ファイル一覧

| ファイル | 用途 |
| --- | --- |
| `logo-mark.svg` | シンボルマーク単体（グラデーション） |
| `logo-mark-mono.svg` | シンボルマーク単体（単色 `currentColor`） |
| `logo-horizontal.svg` | 横組みロゴ（マーク＋ワードマーク） |
| `logo-stacked.svg` | 縦組みロゴ（マーク＋ワードマーク） |
| `app-icon.svg` | アプリアイコン（1024×1024、ローズ地に白マーク） |
| `adaptive-icon-foreground.svg` | Android アダプティブアイコン前景 |
| `notification-icon.svg` | Android 通知アイコン（白シルエット） |

## アプリ内での利用

React Native では SVG を直接描く `<Logo>` コンポーネントを用意済みです（フォント・色は自動でブランド設定に追従）。

```tsx
import { Logo, LogoMark } from '@/components/ui/Logo';

<Logo variant="horizontal" size={32} />   // ヘッダー用
<Logo variant="stacked" size={64} />       // スプラッシュ/起動画面用
<LogoMark size={24} />                      // マークのみ
<Logo variant="mark" size={24} color="#fff" /> // 単色（白）
```

## PNG 書き出し（app.json 用アイコン）

`app.json` は以下の PNG を参照します。SVG から書き出してください。

| 出力先 | 元 SVG | サイズ |
| --- | --- | --- |
| `assets/icon.png` | `app-icon.svg` | 1024×1024 |
| `assets/adaptive-icon.png` | `adaptive-icon-foreground.svg` | 1024×1024 |
| `assets/notification-icon.png` | `notification-icon.svg` | 96×96 |
| `assets/splash.png` | `logo-stacked.svg` | 任意（contain 表示） |
| `assets/favicon.png` | `logo-mark.svg` | 48×48 |

### 書き出しコマンド例

```bash
# rsvg-convert を使う場合
rsvg-convert -w 1024 -h 1024 assets/brand/app-icon.svg -o assets/icon.png

# ImageMagick を使う場合
magick -background none -density 384 assets/brand/app-icon.svg -resize 1024x1024 assets/icon.png

# npm の sharp-cli を使う場合
npx sharp-cli -i assets/brand/app-icon.svg -o assets/icon.png resize 1024 1024
```

> ⚠️ ワードマークを含む SVG（`logo-horizontal` / `logo-stacked`）を PNG 書き出しする際は、
> 書き出し環境に **Shippori Mincho** が無いとフォールバック書体になります。
> 正式書き出し時は Illustrator 等で**テキストをアウトライン化**してから出力してください。
