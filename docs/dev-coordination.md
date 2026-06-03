# 開発との確認事項と必要アクション（草案）

> 本書はコード（`src/lib/cms/*` / `ArticleBody.tsx` / `.env.example`）を根拠にした **草案** です。各項目を定例MTGで開発と確認します。

## 1. microCMS スキーマの確認

アプリ側のコードは以下の型・APIを前提にしています（`src/lib/cms/types.ts` / `src/lib/cms/api.ts`）。**CMS側の実スキーマが一致しているか要確認。**

### `features`（特集）API

| アプリ側フィールド | 型 | CMS側確認事項 |
|--------------------|----|----|
| `id` | string | コンテンツID |
| `title` | string | テキストフィールドで存在するか |
| `category` | `love/money/family/body/work/spirit` | **セレクト等で値が一致しているか** |
| `subtitle` | string | `YYYY年M月号` 形式の運用で合意できるか |
| `coverImage` | image（任意） | フィールド名・画像であるか |

### `articles`（記事）API

| アプリ側フィールド | 型 | CMS側確認事項 |
|--------------------|----|----|
| `id` | string | コンテンツID |
| `title` | string | — |
| `body` | richtext(HTML) | リッチエディタで `p/h2/h3/a/strong` を出力できるか |
| `category` | カテゴリ6種 | features と同じ選択肢か |
| `featureId` | string | **特集への参照フィールド名が `feature` か要確認** |
| `thumbnail` | image（任意） | — |

> アプリは記事を `filters: feature[equals]{featureId}` で取得しています（`api.ts:23`）。**CMSの参照フィールドの API 名が `feature` であることが前提。** ここがずれると記事が取得できません。

## 2. richtext の許可タグ設定

- アプリでスタイル定義があるのは `p / h2 / h3 / a / strong` のみ（[執筆ルール](./writing-guidelines.md)）。
- **microCMS のリッチテキスト「ツールバー設定」で、上記以外のタグ（リスト・引用・画像・テーブル等）を編集者が使えないよう制限できるか** を開発・CMS管理者に確認。
- 画像の本文埋め込み（`<img>`）対応が必要なら、`ArticleBody.tsx` の `tagsStyles` / `renderers` 追加が必要。

## 3. 環境変数・本番APIキー

`.env.example` 準拠で本番値の受け渡しを確認:

```
EXPO_PUBLIC_MICROCMS_SERVICE_DOMAIN=（本番サービスドメイン）
EXPO_PUBLIC_MICROCMS_API_KEY=（本番APIキー）
```

- [ ] 本番 microCMS のサービスドメイン / APIキーの発行・共有方法
- [ ] APIキーの権限（GET のみで足りるか）
- [ ] 未設定時はモックにフォールバックする挙動（`isCmsConfigured`）を本番ビルドでどう扱うか

## 4. 未実装機能の優先度すり合わせ

[ローンチロードマップ](./launch-roadmap.md)の開発タスクについて、ローンチ必須かどうかを確認:

- [ ] オンボーディング完了フラグ保存（`app/onboarding.tsx:49`）
- [ ] 初回起動判定（`app/index.tsx`）
- [ ] 診断フル版の質問セット（`app/diagnosis/flow.tsx:26`）
- [ ] 特集カバー画像表示（`app/(tabs)/features.tsx:51`）
- [ ] ログ画面 / 設定画面（`app/(tabs)/log.tsx` / `settings.tsx`）

## 5. 編集 ⇄ 開発 やり取りリスト

### 編集 → 開発（依頼）

- microCMS 本番環境の準備とAPIキー共有
- richtext ツールバーのタグ制限設定
- 特集カバー画像・記事サムネイルの表示対応可否と推奨画像サイズ
- 入稿内容のプレビュー手段（実機 or プレビューURL）の提供

### 開発 → 編集（確認）

- カテゴリ選択肢の値（小文字キー）の最終確定
- `subtitle` = 号表記フォーマットの合意
- 特集参照フィールド名（`feature`）の確定
- ローンチ必須機能の優先度合意
