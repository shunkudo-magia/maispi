# 開発との確認事項と必要アクション（草案）

> 開発・インフラ面で **確定/調整が必要な事項** をまとめた **草案** です。サーバ・CMSは**未確定**で、決定すべきことが多い状態です。
> 関連: [インフラ洗い出し](./infra-launch-checklist.md) / [機能仕様](./feature-spec.md)。最終更新: 2026-06-03。

## 1. プラットフォーム前提（要整理）

- **直近ローンチ = Webメディア（Vercel）**。`d-lips-style`ベースの静的サイト。
- **将来 = RN/Expoアプリ**。microCMS連携を実装済み（下記4）。
- ⚠️ Webとアプリで **コンテンツ管理・ブランドカラー・カテゴリ体系** が分かれている。共通化するかを決める。

## 2. サーバー / バックエンド（未確定）

| 確認事項 | 状態 |
|----------|------|
| 本番ホスティングをVercelで確定するか | 未確定 |
| 動的機能（コメント/いいね/会員）のバックエンド・API | 未確定 |
| DB（保存先・選定） | 未確定 |
| 契約名義・費用負担部署 | 未確定（[インフラ洗い出し](./infra-launch-checklist.md)） |

> 匿名コメント・いいね・会員登録は **バックエンド/DBが前提**。技術選定（BaaS: Firebase/Supabase等 or 自前）をMTGで決める。

## 3. CMS（未確定）

- 現状は使わない想定だが **未確定**。記事更新の運用ルール・体制も未策定。
- 候補: microCMS（アプリ側に連携実装あり）/ 他ヘッドレスCMS / 静的HTML直編集。
- Webとアプリで共通CMSにするかも論点。

## 4. RN/Expoアプリの microCMS 連携（実装済み・将来トラック）

アプリは以下を前提に実装済み（`src/lib/cms/types.ts` / `api.ts`）。CMS採用時に確認:

- エンドポイント: `features` / `articles`。記事は `feature[equals]{featureId}` でフィルタ取得。
- **特集への参照フィールドのAPI名が `feature` であること**が前提（ずれると記事取得不可）。
- カテゴリ値: `love/money/family/body/work/spirit`（小文字キー）。
- richtext許可タグ: `p/h2/h3/a/strong` のみアプリ側でスタイル定義（[執筆ルール](./writing-guidelines.md)）。
- 環境変数: `EXPO_PUBLIC_MICROCMS_SERVICE_DOMAIN` / `EXPO_PUBLIC_MICROCMS_API_KEY`（`.env.example`）。未設定時はモックにフォールバック。

### アプリ側 未実装TODO（将来）
- オンボーディング完了フラグ保存（`app/onboarding.tsx:49`）/ 初回起動判定（`app/index.tsx`）
- 診断フル版の質問セット（`app/diagnosis/flow.tsx:26`）
- 特集カバー画像表示（`app/(tabs)/features.tsx:51`）
- ログ画面 / 設定画面（`app/(tabs)/log.tsx` / `settings.tsx`）

## 5. 計測・SEO（Web）
- GA4 / GSC / sitemap.xml / robots.txt（[インフラ洗い出し](./infra-launch-checklist.md) 4）。実装担当・期限を確定。

## 6. 開発 ⇄ 関係者 やり取りリスト

### 依頼（開発外への依頼）
- ドメイン my-spi.com 取得 → **大河内さん**
- 問い合わせメール発行 → 情シス
- 法務ページ記載情報・表現確認 → 法務/総務
- サーバ/DB/外部サービス契約 → 経理/契約担当

### 開発で決めること
- サーバ/バックエンド/DBの技術選定
- CMS採用可否と運用設計
- 追加機能（コメント/いいね）の実装方式とモデレーション
- 会員登録の認証方式・セキュリティ・データ設計（[機能仕様](./feature-spec.md)）

## 7. MTGで決めること
- [ ] β公開(6/10)で動的機能を出すか（静的のみで先行公開か）
- [ ] サーバ・DB・CMSの方針
- [ ] Web/アプリの共通化範囲（コンテンツ・カラー・カテゴリ）
