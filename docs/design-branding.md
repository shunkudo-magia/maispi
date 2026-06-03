# デザイン・ブランド（草案）

> メディア名・ロゴ・デザイン方針をまとめた **草案** です。確定事項とTODOを区別します。
> 最終更新: 2026-06-03

## 1. メディア名（確定）

- **まいスピ**（正式表記）
- 英字/ドメイン: **my-spi.com**（取得予定 → [インフラ洗い出し](./infra-launch-checklist.md)）
- ※ コード/リポジトリ上は `maispi` / `maisupi` 表記が残存（旧称）。表記ゆれの統一は別途。

## 2. ロゴ（未確定・デザイン必要）

- 現状 **ロゴは未確定**。社内でデザイン案の提案が必要。
- 進行: ロゴ **7パターン比較表**は作成済み。
- TODO:
  - [ ] **ロゴ表記決定**（石黒・安藤と合意）〆6/9
  - [ ] **ロゴ確定後 SVGベクター化** 〆6/9

## 3. デザイン方針

- 現行デザインは **`d-lips-style`** をベースに議論中。
  - 参照: `https://myspi.vercel.app/proposals/maisupi-d-lips-style.html`
- 媒体トーン: スピリチュアル系Webメディア（editorial / dreamy / 上質）。
- ポータル改訂は `portal-revision-plan` の採用方針で進行。
- 画像素材は **fal.ai** 採用カットに差し替え（随時）。

## 4. カテゴリ別カラー / ビジュアルトーン

記事企画（`maisupi-article-plan-30-v3`）の画像プロンプトから、カテゴリごとのビジュアル方針が定義されています。

| カテゴリ | カラーパレット | 写真スタイル |
|----------|----------------|--------------|
| 恋愛（LOVE） | 淡いピンク / ラベンダー / ベビーブルー / ペールゴールド | soft pastel editorial, dreamy, low contrast |
| 人間関係・家族 | ベージュ / ウォルナット / テラコッタ / オフホワイト | warm editorial lifestyle, calm, grounded |
| 金運 | 深緑 / 墨 / 金箔 / 生成り | modern Japanese minimalist, refined |

- 共通指定: `no text` / `no human faces` / `soft focus background` / 雑誌表紙クオリティ。
- アイキャッチ 16:9、本文挿絵 4:3。

> 注: 上記カラーはWebメディア記事ビジュアルの方針。RN/Expoアプリ側のデザイントークン（`src/constants/colors.ts` の `primary=#da668e` 等）とは別系統。**ブランドカラーの統一**は要検討事項。

## 5. MTGで決めること
- [ ] ロゴ表記の最終決定（石黒・安藤）
- [ ] ブランドカラー（Web/アプリの統一 or 使い分け）
- [ ] 表記ゆれ（まいスピ / maispi / maisupi）の統一ルール
