/**
 * 法務ページの掲載内容（プライバシーポリシー / 利用規約 / 特定商取引法に基づく表記 /
 * 運営者情報 / 免責事項）。
 *
 * 確定済みの事業者情報・サービス仕様はここに集約しています。
 * まだ社内確認が取れていない項目（所在地・電話番号・問い合わせメール・代表者氏名など）は
 * すべて `PENDING(...)` でマークしており、画面上に「（確認中：◯◯）」と表示されます。
 * 確定したら `BusinessInfo` の該当値を実値へ置き換えるだけで全ページに反映されます。
 *
 * 残課題の一覧は docs/legal-review-2026-06-11.md を参照（6/11 法務確認用）。
 */

/** 未確定の値であることを画面上に明示するマーカー。確定後は実値へ置き換える。 */
export const PENDING = (label: string) => `（確認中：${label}）`;

/** 確定済み + 確認中の事業者情報。確認中の項目は確定後ここを書き換える。 */
export const BusinessInfo = {
  /** サービス名 */
  serviceName: 'まいすぴ',
  /** 運営会社（確定：請求書・magia.co.jp ドメイン・co.jp.magia.maispi より） */
  company: '株式会社MAGIA',
  /** 運営統括責任者 / 代表者（※総務・法務確認待ち） */
  representative: PENDING('代表者氏名'),
  /** 所在地（※総務・法務確認待ち） */
  address: PENDING('所在地'),
  /** 電話番号（※総務・法務確認待ち） */
  phone: PENDING('電話番号'),
  /** 受付時間（※確認待ち） */
  phoneHours: PENDING('電話受付時間'),
  /** 問い合わせメール（独自ドメイン発行待ち：info@my-spi.com を予定） */
  email: PENDING('問い合わせ用メールアドレス'),
  /** 問い合わせ対応時間 */
  supportHours: '平日 10:00〜18:00（土日祝・年末年始を除く）※確定後に再確認',
  /** サービスサイト（ドメイン取得予定） */
  site: 'my-spi.com（取得手続き中）',
  /** プレミアム月額（確定：設定画面の表記より） */
  premiumPrice: '月額480円（税込）',
} as const;

export type LegalBlock = {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
  /** 定義リスト等のラベル付き行 */
  rows?: { label: string; value: string }[];
};

export type LegalDoc = {
  slug: string;
  /** 設定画面・ヘッダーに出すタイトル */
  title: string;
  /** 最終改定日 */
  updated: string;
  intro?: string;
  blocks: LegalBlock[];
};

const UPDATED = '2026年6月4日';

const privacy: LegalDoc = {
  slug: 'privacy',
  title: 'プライバシーポリシー',
  updated: UPDATED,
  intro:
    `${BusinessInfo.company}（以下「当社」）は、当社が提供するアプリおよびWebサービス「${BusinessInfo.serviceName}」（以下「本サービス」）における利用者の個人情報の取扱いについて、以下のとおりプライバシーポリシー（以下「本ポリシー」）を定めます。`,
  blocks: [
    {
      heading: '1. 取得する情報',
      paragraphs: ['当社は、本サービスの提供にあたり、次の情報を取得することがあります。'],
      bullets: [
        '利用者が入力する情報：生年月日、ニックネーム、診断の回答内容、運気ログのメモ等',
        '外部アカウント連携情報：LINE等と連携した場合の識別子・表示名等（連携時のみ）',
        '利用状況に関する情報：閲覧した記事・診断の利用履歴、アプリの操作ログ',
        '端末・通信に関する情報：端末の種類・OS・言語設定、プッシュ通知用トークン、IPアドレス、Cookie等の識別子',
      ],
    },
    {
      heading: '2. 情報の保存場所',
      paragraphs: [
        '生年月日・ニックネーム・運気ログ等の利用者入力情報は、原則として利用者の端末内に保存されます。本サービスは現時点でこれらを当社サーバーのデータベースに保存しません（今後、会員機能等の提供にあたり保存方法を変更する場合は、本ポリシーを改定のうえお知らせします）。',
      ],
    },
    {
      heading: '3. 利用目的',
      bullets: [
        '本サービス（運気・診断・記事・運気ログ等）の提供・維持・改善のため',
        'パーソナライズされた診断結果・運気情報を表示するため',
        'プッシュ通知（朝の運気通知、満月・新月リマインド、新着記事の案内等）を配信するため',
        '本サービスの利用状況の分析、品質向上および新機能の検討のため',
        'お問い合わせへの対応のため',
        '利用規約に違反する行為への対応、その他本サービスの安全な運営のため',
      ],
    },
    {
      heading: '4. 第三者提供',
      paragraphs: [
        '当社は、次の場合を除き、あらかじめ利用者の同意を得ずに個人情報を第三者に提供しません。',
      ],
      bullets: [
        '法令に基づく場合',
        '人の生命・身体・財産の保護のために必要で、本人の同意を得ることが困難な場合',
        '国の機関等への協力が必要で、本人の同意により事務遂行に支障を及ぼすおそれがある場合',
      ],
    },
    {
      heading: '5. 外部サービスの利用',
      paragraphs: ['本サービスは、提供にあたり次の外部サービスを利用しています。'],
      rows: [
        { label: 'microCMS', value: '記事・特集コンテンツの配信（読み取り専用）' },
        { label: 'Apple App Store / Google Play', value: 'アプリの配信および有料プランの決済処理' },
        { label: 'プッシュ通知基盤（Expo等）', value: '通知配信のための端末トークンの送受信' },
      ],
    },
    {
      heading: '6. Cookie・アクセス解析',
      paragraphs: [
        'Web版および今後の機能において、利用状況の把握・改善のためにCookie等および Google アナリティクス（GA4）等のアクセス解析ツールを利用する場合があります。これらは個人を特定しない形で統計的に利用されます。ブラウザの設定によりCookieを無効化できますが、その場合一部機能が利用できないことがあります。',
        '※GA4等の計測導入状況は確定後に本項目を更新します。',
      ],
    },
    {
      heading: '7. 開示・訂正・削除等の請求',
      paragraphs: [
        '利用者は、当社の保有する自己の個人情報について、開示・訂正・利用停止・削除等を請求できます。ご請求は本ポリシー末尾の問い合わせ先までご連絡ください。本人確認のうえ、法令に従い対応します。',
      ],
    },
    {
      heading: '8. 本ポリシーの変更',
      paragraphs: [
        '当社は、必要に応じて本ポリシーを変更することがあります。重要な変更を行う場合は、本サービス上での掲示等により周知します。',
      ],
    },
    {
      heading: '9. お問い合わせ窓口',
      rows: [
        { label: '運営会社', value: BusinessInfo.company },
        { label: 'メール', value: BusinessInfo.email },
        { label: '受付時間', value: BusinessInfo.supportHours },
      ],
    },
  ],
};

const terms: LegalDoc = {
  slug: 'terms',
  title: '利用規約',
  updated: UPDATED,
  intro:
    `本利用規約（以下「本規約」）は、${BusinessInfo.company}（以下「当社」）が提供するアプリおよびWebサービス「${BusinessInfo.serviceName}」（以下「本サービス」）の利用条件を定めるものです。利用者は、本規約に同意のうえ本サービスを利用するものとします。`,
  blocks: [
    {
      heading: '第1条（適用）',
      paragraphs: [
        '本規約は、本サービスの利用に関する当社と利用者との間の一切の関係に適用されます。',
      ],
    },
    {
      heading: '第2条（本サービスの内容）',
      paragraphs: [
        '本サービスは、占い・診断・運勢等に関する情報、記事・特集コンテンツ、運気ログ等の機能を提供します。これらは娯楽・情報提供を目的とするものであり、結果の的中・有用性を保証するものではありません。',
      ],
    },
    {
      heading: '第3条（有料プラン）',
      bullets: [
        `本サービスには、有料プラン「プレミアム」（${BusinessInfo.premiumPrice}）があります。プレミアムでは広告の除去および全次元診断等の機能が利用できます。`,
        '料金・決済・解約等の詳細は「特定商取引法に基づく表記」に従います。',
        'プレミアムは、申込みに用いたストア（Apple App Store / Google Play）の仕組みにより、解約しない限り所定の期間ごとに自動更新されます。',
      ],
    },
    {
      heading: '第4条（禁止事項）',
      paragraphs: ['利用者は、本サービスの利用にあたり次の行為をしてはなりません。'],
      bullets: [
        '法令または公序良俗に違反する行為',
        '当社または第三者の知的財産権・プライバシー・名誉その他の権利・利益を侵害する行為',
        '本サービスの運営を妨害する行為、不正アクセス、過度な負荷をかける行為',
        '本サービスのコンテンツを権利者の許諾なく複製・転載・販売する行為',
        'その他、当社が不適切と判断する行為',
      ],
    },
    {
      heading: '第5条（知的財産権）',
      paragraphs: [
        '本サービスおよびコンテンツ（文章・画像・デザイン・ロゴ等）に関する知的財産権は、当社または正当な権利者に帰属します。',
      ],
    },
    {
      heading: '第6条（免責事項）',
      bullets: [
        '本サービスで提供する占い・診断・運勢等の情報は娯楽を目的とするものであり、医療・健康・投資・法律等の専門的判断に代わるものではありません。利用者ご自身の判断と責任においてご利用ください。',
        '当社は、本サービスの内容の正確性・完全性・有用性、および利用により得られる結果について保証しません。',
        '当社は、本サービスの利用または利用不能により利用者に生じた損害について、当社の故意または重過失による場合を除き、責任を負いません。',
      ],
    },
    {
      heading: '第7条（サービスの変更・中断・終了）',
      paragraphs: [
        '当社は、利用者への事前の通知なく、本サービスの内容を変更し、または提供を中断・終了することがあります。これにより利用者に生じた損害について、当社は責任を負いません。',
      ],
    },
    {
      heading: '第8条（規約の変更）',
      paragraphs: [
        '当社は、必要と判断した場合、本規約を変更することがあります。変更後の本規約は、本サービス上に表示した時点から効力を生じます。',
      ],
    },
    {
      heading: '第9条（準拠法・管轄）',
      paragraphs: [
        '本規約は日本法を準拠法とします。本サービスに関して紛争が生じた場合、当社の所在地を管轄する裁判所を第一審の専属的合意管轄裁判所とします。',
      ],
    },
  ],
};

const tokushoho: LegalDoc = {
  slug: 'tokushoho',
  title: '特定商取引法に基づく表記',
  updated: UPDATED,
  intro: '「特定商取引に関する法律」第11条に基づき、以下のとおり表示します。',
  blocks: [
    {
      rows: [
        { label: '販売事業者', value: BusinessInfo.company },
        { label: '運営統括責任者', value: BusinessInfo.representative },
        { label: '所在地', value: BusinessInfo.address },
        { label: '電話番号', value: BusinessInfo.phone },
        { label: '電話受付時間', value: BusinessInfo.phoneHours },
        { label: 'メールアドレス', value: BusinessInfo.email },
        { label: '販売URL', value: BusinessInfo.site },
      ],
    },
    {
      heading: '販売価格',
      bullets: [
        `プレミアムプラン：${BusinessInfo.premiumPrice}`,
        '価格は各アプリストアの表示価格に準じます。',
      ],
    },
    {
      heading: '商品代金以外の必要料金',
      bullets: ['本サービスの利用に必要な通信料はお客様のご負担となります。'],
    },
    {
      heading: '支払方法',
      bullets: [
        'Apple App Store または Google Play ストアを通じた決済（アプリ内課金）',
      ],
    },
    {
      heading: '支払時期',
      bullets: [
        '購入手続き完了時にお支払いが確定します。',
        'プレミアム（サブスクリプション）は、解約しない限り各期間の更新時に自動的に課金されます。',
      ],
    },
    {
      heading: '役務の提供時期',
      bullets: ['決済完了後、ただちに当該機能をご利用いただけます。'],
    },
    {
      heading: '返品・キャンセル・解約',
      bullets: [
        'デジタルコンテンツ・役務の性質上、購入手続き完了後の返金・キャンセルは原則としてお受けできません。',
        'プレミアム（サブスクリプション）の解約は、ご利用のストア（Apple App Store / Google Play）の購読管理画面からお手続きください。解約後も、既に課金された期間の終了時までは引き続きご利用いただけます。',
        '法令に基づく返金等が必要な場合は、各ストアの定めおよび法令に従います。',
      ],
    },
  ],
};

const operator: LegalDoc = {
  slug: 'operator',
  title: '運営者情報',
  updated: UPDATED,
  blocks: [
    {
      rows: [
        { label: 'サービス名', value: BusinessInfo.serviceName },
        { label: '運営会社', value: BusinessInfo.company },
        { label: '代表者', value: BusinessInfo.representative },
        { label: '所在地', value: BusinessInfo.address },
        { label: 'お問い合わせ', value: BusinessInfo.email },
        { label: '受付時間', value: BusinessInfo.supportHours },
      ],
    },
    {
      heading: 'サービス概要',
      paragraphs: [
        '「まいすぴ」は、占い・診断・運勢を毎日たのしむ、女性向けのスマートフォン／Webメディアです。気圧・月齢・利用者の属性などからパーソナルな運気を算出し、アーキタイプ診断や恋愛・お金・家族・からだ・仕事・スピリットの6カテゴリの記事・特集をお届けします。',
      ],
    },
  ],
};

const disclaimer: LegalDoc = {
  slug: 'disclaimer',
  title: '免責事項',
  updated: UPDATED,
  blocks: [
    {
      heading: '娯楽目的の情報提供について',
      paragraphs: [
        '本サービスが提供する占い・診断・運勢・タロット等の情報は、娯楽および自己理解の参考を目的とした情報提供です。結果の的中や有用性を保証するものではありません。',
      ],
    },
    {
      heading: '専門的判断の代替ではありません',
      paragraphs: [
        '本サービスの情報は、医療・健康・心理・投資・法律・その他専門的な助言や診断に代わるものではありません。健康・金銭・契約等に関わる重要な判断については、必ず医師・専門家等の有資格者にご相談ください。',
      ],
    },
    {
      heading: '自己責任での利用',
      paragraphs: [
        '本サービスの利用および本サービスで得た情報に基づく行動は、利用者ご自身の判断と責任において行ってください。当社は、これにより生じたいかなる損害についても、当社の故意または重過失による場合を除き、責任を負いません。',
      ],
    },
    {
      heading: '外部リンク・外部コンテンツ',
      paragraphs: [
        '本サービスから外部サイトへのリンクを掲載する場合がありますが、当社はリンク先の内容について責任を負いません。',
      ],
    },
  ],
};

/** 設定画面の並び順に対応した法務ドキュメント一覧 */
export const LegalDocs: Record<string, LegalDoc> = {
  privacy,
  terms,
  tokushoho,
  operator,
  disclaimer,
};

/** 設定画面の「アプリについて」に並べるリンク（slug, ラベル） */
export const LegalLinks: { slug: string; label: string }[] = [
  { slug: 'privacy', label: 'プライバシーポリシー' },
  { slug: 'terms', label: '利用規約' },
  { slug: 'tokushoho', label: '特定商取引法に基づく表記' },
  { slug: 'operator', label: '運営者情報' },
  { slug: 'disclaimer', label: '免責事項' },
];
