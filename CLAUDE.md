# CLAUDE.md — SlideCode 開発ガイド

## プロジェクト概要

SlideCodeは、AIが生成しやすいプレゼンテーション用Reactコンポーネントライブラリ。
React/JSXでスライドを記述し、ブラウザ上でプレゼンテーションを表示する。
npmパッケージとして配布する。

## ビルド・開発コマンド

```bash
bun install          # 依存関係のインストール
bun run build        # ライブラリのビルド（dist/ に出力）
bun run typecheck    # TypeScriptの型チェック
```

## 技術スタック

- **言語**: TypeScript (strict mode)
- **フレームワーク**: React 18+
- **ビルド**: Vite 5 (ライブラリモード)
- **パッケージマネージャ**: Bun
- **型生成**: vite-plugin-dts
- **チャート**: SVG自前実装（外部ライブラリ不要）
- **フォント**: Google Fonts
- **ライセンス**: MIT

## ディレクトリ構成

```
src/
  index.ts              # エントリポイント（全エクスポート）
  hooks/
    useTheme.ts         # ThemeContext + useTheme フック
    useContainerScale.ts # スケーリング用フック
    useSlideContext.ts   # SlideContext（Slideのtitle/descriptionを子に配信）
    useDeckContext.ts    # DeckContext（Deckが収集したAgendaItemsを配信）
  themes/
    index.ts            # プリセットテーマ定義（corporate, startup, minimal, nature）
  components/
    Deck.tsx            # スライドコンテナ（ナビゲーション、テーマ配信、AgendaItem収集）
    Slide.tsx           # 個別スライド（960x540、SlideContext配信、decorations対応）
    Layout.tsx          # Split（左右2カラム）、Grid（N列グリッド）
    Content.tsx         # Spacer, Title, Subtitle, Body, Badge, BulletList, Quote, CodeBlock, StatCard
    Card.tsx            # 汎用カード（icon/title/description/image/children）
    Image.tsx           # 画像コンポーネント（角丸・キャプション対応）
    Timeline.tsx        # タイムライン（時系列イベント表示）
    Table.tsx           # テーブル（ヘッダー・striped・compact対応）
    LinkTag.tsx         # 外部リンク用ピル型タグ
    Checklist.tsx       # チェックリスト（チェック済み表示対応）
    Footnote.tsx        # 出典・注釈（スライド下部に自動配置）
    Callout.tsx         # キーインサイト強調ボックス（So What? の明示）
    Divider.tsx         # スライド内の視覚的区切り線
  charts/
    index.tsx           # 全チャートコンポーネント
  templates/
    index.tsx           # CoverSlide, SectionDivider, ThankYouSlide, AgendaSlide, TeamSlide
```

## アーキテクチャ

### スライド描画方式

- 各スライドは固定内部解像度 **960 x 540px**（16:9）で描画
- `ResizeObserver` で親要素の幅を測定し、`scale = Math.min(parentWidth / 960, 1)` で縮小
- `transformOrigin: "top left"` + `transform: scale(${scale})` でスケーリング
- コンテナの高さを `540 * scale` に自動調整

### テーマシステム

- React Context (`ThemeContext`) でテーマを配信
- `useTheme()` フックでコンポーネントからアクセス
- `Deck` がテーマ名（string）またはカスタム `SlideTheme` オブジェクトを受け取りProviderで配信

### SlideContext（スライドメタデータ配信）

- `Slide` コンポーネントが `title` / `description` props を `SlideContext` で子コンポーネントに配信
- `Title` コンポーネントは `children` が省略された場合、`SlideContext` から `title` を自動取得して描画
- `useSlideContext()` フックでアクセス可能

### DeckContext（AgendaSlide自動生成）

- `Deck` がレンダリング時に children をスキャンし、`title` propを持つスライドから `AgendaItem[]` を自動収集
- `AgendaSlide` は `items` propが省略された場合、`DeckContext` から自動取得して描画
- 収集対象: `Slide`（`title` propあり）、`SectionDivider`（`title`/`subtitle` propあり）
- 自動除外: `CoverSlide`, `ThankYouSlide`, `AgendaSlide`（目次に含めない）
- `description` は `subtitle` → `description` propの順にフォールバック
- `useAgendaItems()` フックでアクセス可能

### SlideTheme 型

```typescript
interface SlideTheme {
  name: string;
  bg: string;
  surface: string;
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  textMuted: string;
  textOnPrimary: string;
  fontDisplay: string;
  fontBody: string;
  radius: string;
  chartColors: string[];  // 6色
}
```

### プリセットテーマ

| テーマ名 | スタイル | Display Font | Body Font |
|----------|----------|-------------|-----------|
| `corporate` | 紺 + オレンジ、プロフェッショナル | DM Serif Display | DM Sans |
| `startup` | ダークモード、ネオングリーン + 紫 | Syne | Syne |
| `minimal` | クリーン、セリフ + 赤アクセント | Playfair Display | Source Sans 3 |
| `nature` | アースカラー、緑 + 茶 | Fraunces | Outfit |

## コンポーネント仕様の要点

### Deck

- キーボードナビゲーション（← → スペースキー）
- タッチ/スワイプナビゲーション（50px以上のスワイプで発火）
- ドットインジケーター（20枚以下はドット、超える場合は「n / total」テキスト）
- Prev / Next ボタン（端で disabled）
- `onSlideChange(index: number)` コールバック
- **children内の `title` propを持つスライドを自動スキャンし、`DeckContext` で `AgendaItem[]` を配信**

### Slide

- **`title?: string`** — スライドのタイトルメタデータ。SlideContextで子に配信され、AgendaSlide自動生成の対象になる
- **`description?: string`** — スライドの説明メタデータ。SlideContextで子に配信される
- 背景: `bg`, `gradient` props
- パディング: デフォルト `"48px 64px"`
- Flex配置: `align`(デフォルト `"flex-start"`), `justify`(デフォルト `"center"`)
- **`decorations?: SlideDecoration[]`** — 背景に絵文字などを散りばめる。`{ emoji, top?, right?, bottom?, left?, size?, opacity?, rotate? }`

### コンテンツコンポーネント

- **Spacer**: 要素間スペーシング。`size`: xs(4px)/sm(8px)/md(16px)/lg(24px)/xl(32px) またはカスタム数値
- **Title**: `fontDisplay` フォント、size: sm(18px)/md(26px)/lg(34px)/xl(42px)/xxl(54px)
  - **`children` は省略可能** — 省略時は `SlideContext` から `title` を自動取得して描画。childrenが無くSlideContextにもtitleが無い場合は何も描画しない（`null`）
- **Subtitle**: `textMuted` 色、16px
- **Body**: size: sm(12px)/md(14px)/lg(16px)、lineHeight 1.6
- **Badge**: Pill形状、背景は `color + "18"`（半透明）、11px uppercase
- **BulletList**: `items: ReactNode[]`, `icon: string`(デフォルト "→")、accent色アイコン。**items にリンクや太字を含む ReactNode も指定可能**
- **Quote**: 左ボーダー（accent色、3px）、fontDisplay 22px italic
- **CodeBlock**: JetBrains Mono / Fira Code、13px、`lang` prop。**`lang` 指定時にシンタックスハイライト対応（JS/TS, Python, JSON, HTML, CSS）**。`plain` propでハイライト無効化可能
- **StatCard**: value(28px/compact時24px), label(12px), change("-"始まりで赤↓、他は緑↑), icon, compact

### 新規コンポーネント

- **Card**: 汎用カード。`icon`, `title`(必須), `description`, `image`, `bg`, `children`。テーマのsurface/radius使用
- **Image**: 画像コンポーネント。`src`, `alt`(必須), `width`, `height`, `radius`(none/sm/md/lg/full), `objectFit`, `caption`
- **Timeline**: タイムライン表示。`items: { time, title, icon?, description? }[]`, `compact`。accent/primaryカラーでライン描画
- **Table**: テーブル表示。`headers?: ReactNode[]`, `rows: ReactNode[][]`(必須), `striped`, `compact`。テーマのfontBody/surface/text使用
- **LinkTag**: 外部リンク用ピル型タグ。`href`, `children`(必須), `target`(デフォルト `"_blank"`), `color`。`rel="noopener noreferrer"` 自動付与
- **Checklist**: チェックリスト。`items: ReactNode[]`(必須), `title?`, `checked?: boolean[]`。accent色チェックマーク
- **Footnote**: 出典・注釈コンポーネント。`children: ReactNode`。`marginTop: "auto"` でスライド下部に自動配置。10px、textMuted色。データの信頼性担保のため全データスライドでの使用を推奨
- **Callout**: キーインサイト強調ボックス。`children`(必須), `icon?`, `title?`, `variant`: "insight"(デフォルト/accent色)/"positive"(緑)/"warning"(赤)/"neutral"(primary色)。左ボーダー + 薄い背景色。スライドの「So What?」を明示するために使用
- **Divider**: スライド内の視覚的区切り線。`spacing`: sm(8px)/md(16px)/lg(24px)、`color?`。primary + 透過の 1px ライン

### チャートコンポーネント

すべてSVGベース、テーマの `chartColors` を使用:

- **BarChart**: `data: Array<{label, value, color?}>`, height(180), showValues(true)
- **HorizontalBarChart**: 左にラベル(80px)、右に値(40px)
- **GroupedBarChart**: `groups: Array<{label, values: Array<{label, value}>}>`, 凡例自動表示
- **LineChart**: `series: Array<{name, data: number[], color?}>`, xLabels, グリッド線5本, エリアフィル
- **AreaChart**: LineChartと同型、累積スタック表示、color + "55" フィル
- **DonutChart**: strokeDasharray/strokeDashoffsetでセグメント、中央に合計値、右に凡例
- **ScatterPlot**: `data: Array<{name, color?, points: Array<{x, y, size?}>}>`, 複数シリーズ対応
- **Sparkline**: `data: number[]`, width(120), height(32), インライン用
- **ProgressRing**: value(0-100), SVG circle、中央に%値
- **ProgressBar**: value(0-100), 6px高さバー
- **WaterfallChart**: ウォーターフォール（ブリッジ）チャート。`data: Array<{label, value, color?, isTotal?}>`。コンサル必須のブリッジチャート。売上ブリッジ、コスト分析、差異分析に最適。`isTotal: true` で累計バーを描画。正値は chartColors[0]、負値は赤、合計は primary 色

### テンプレートスライド

- **CoverSlide**: primary→secondaryグラデーション、title(`ReactNode`)/subtitle(`ReactNode`)/author/date/tag(`ReactNode`)/gradient/decorations/footer
  - `title` に ReactNode を渡せるため、2色分けや改行も可能
  - `gradient` でカスタムグラデーションを指定可能
  - `decorations` で背景に絵文字を散りばめられる
  - `footer` でフッター領域にカスタムコンテンツを配置可能
- **SectionDivider**: surface背景、number(2桁ゼロ埋め、accent色、56px、opacity 0.5)/title/subtitle
- **ThankYouSlide**: CoverSlideと同じグラデーション、中央揃え。title(`ReactNode`)/subtitle(`ReactNode`)/contact/gradient/decorations/footer
  - CoverSlide と同様に `gradient`, `decorations`, `footer` でカスタマイズ可能
- **AgendaSlide**: surfaceカード表示
  - **`items` は省略可能** — 省略時は `DeckContext` から自動生成（Deck内の `title` を持つSlide/SectionDividerから収集）
  - 手動指定: `items: Array<{number, title, description?}>`
- **TeamSlide**: members: Array<{name, role, avatar?}>、イニシャルアバター(chartColors使用)

## 使用例

### 基本（AgendaSlide自動生成 + Title自動取得）

```tsx
import { Deck, Slide, Title, Body, AgendaSlide, CoverSlide,
         SectionDivider, ThankYouSlide } from "slidecode";

function MyPresentation() {
  return (
    <Deck theme="corporate">
      {/* CoverSlide → agenda対象外 */}
      <CoverSlide title="Q4 Report" subtitle="2025年度" author="田中太郎" />

      {/* AgendaSlide: items省略 → Deck内のSlide/SectionDividerから自動生成 */}
      <AgendaSlide />

      {/* Slide: title propあり → agendaに "01 売上報告" として収集される */}
      <Slide title="売上報告" description="前年比と推移">
        <Title />          {/* children省略 → "売上報告" を自動描画 */}
        <Body>前年比120%の成長を達成しました。</Body>
      </Slide>

      {/* SectionDivider: title propあり → agendaに "02 今後の計画" として収集される */}
      <SectionDivider title="今後の計画" subtitle="来期の戦略" number={2} />

      {/* Slide: title propなし → agenda対象外 */}
      <Slide>
        <Title>詳細データ</Title>  {/* children明示 → そのまま描画 */}
        <Body>補足スライドです。</Body>
      </Slide>

      {/* ThankYouSlide → agenda対象外 */}
      <ThankYouSlide />
    </Deck>
  );
}
```

上記の例では `<AgendaSlide />` に以下が自動生成されます:
- 01 売上報告 / 前年比と推移
- 02 今後の計画 / 来期の戦略

### 手動指定（従来の方法、引き続き動作）

```tsx
<AgendaSlide
  items={[
    { number: 1, title: "売上報告", description: "前年比と推移" },
    { number: 2, title: "今後の計画", description: "来期の戦略" },
  ]}
/>
```

### 新コンポーネント使用例

```tsx
import { Deck, Slide, Title, Body, Spacer, Card, Image, Timeline,
         Table, LinkTag, Checklist, BulletList, Grid,
         CoverSlide, ThankYouSlide, CodeBlock } from "slidecode";

function TravelPresentation() {
  return (
    <Deck theme="corporate">
      {/* CoverSlide: ReactNode title + カスタムグラデーション + デコレーション */}
      <CoverSlide
        title={<>最高な沖縄<br /><span style={{ color: "#FFB703" }}>in 2026</span></>}
        subtitle="石垣島 3泊4日 旅のしおり"
        tag="Travel Booklet 2026"
        gradient="linear-gradient(135deg, #0077B6, #90E0EF)"
        decorations={[
          { emoji: "🏝️", top: 30, right: 50, size: 80, opacity: 0.3 },
          { emoji: "🌺", top: 80, right: 140, size: 50, opacity: 0.2 },
        ]}
      />

      {/* Spacer で要素間スペーシング */}
      <Slide title="スケジュール">
        <Title />
        <Spacer size="md" />
        <Timeline
          items={[
            { time: "11:40", title: "羽田空港を出発", icon: "✈️", description: "ANA 091" },
            { time: "15:05", title: "石垣空港に到着！", icon: "🌴" },
            { time: "16:00", title: "ホテルへ", icon: "🏨" },
          ]}
        />
      </Slide>

      {/* Table でフライト情報 */}
      <Slide title="フライト情報">
        <Title />
        <Spacer size="md" />
        <Table
          headers={["便名", "出発", "到着", "料金"]}
          rows={[
            ["ANA 091", "羽田 11:40", "石垣 15:05", "16,950円"],
            ["ANA 092", "石垣 16:00", "羽田 18:35", "11,450円"],
          ]}
          striped
        />
      </Slide>

      {/* Card でスポット紹介 */}
      <Slide title="おすすめスポット">
        <Title />
        <Spacer size="md" />
        <Grid cols={3}>
          <Card icon="🍣" title="ひとし（本店）" description="石垣島No.1居酒屋。石垣牛の握りが絶品。" />
          <Card icon="🏖️" title="川平湾" description="ミシュラン三ツ星の絶景ビーチ。" />
          <Card icon="🛶" title="青の洞窟" description="シュノーケリングツアーで探検。" />
        </Grid>
      </Slide>

      {/* BulletList に ReactNode + LinkTag */}
      <Slide title="参考リンク">
        <Title />
        <Spacer size="sm" />
        <BulletList
          items={[
            <>石垣島の天気: <LinkTag href="https://example.com">気象庁</LinkTag></>,
            <>料金: <strong>1,700円</strong> → 事前予約で <strong>950円</strong>！</>,
          ]}
          icon="🌺"
        />
      </Slide>

      {/* Checklist で持ち物リスト */}
      <Slide title="持ち物チェックリスト">
        <Title />
        <Spacer size="md" />
        <Grid cols={2}>
          <Checklist title="👕 衣類" items={["半袖＋薄手の服", "水着", "サンダル"]} checked={[true, true, false]} />
          <Checklist title="🧴 日用品" items={["日焼け止め", "虫よけスプレー"]} />
        </Grid>
      </Slide>

      {/* Image コンポーネント */}
      <Slide title="川平湾の絶景">
        <Title />
        <Spacer size="md" />
        <Image src="/photos/kabira-bay.jpg" alt="川平湾" width={400} height={250} radius="lg" caption="ミシュラン三ツ星の絶景" />
      </Slide>

      {/* CodeBlock シンタックスハイライト */}
      <Slide title="予約スクリプト">
        <Title />
        <Spacer size="sm" />
        <CodeBlock lang="ts">{`const booking = await fetch("/api/reserve", {
  method: "POST",
  body: JSON.stringify({ date: "2026-07-01" }),
});`}</CodeBlock>
      </Slide>

      {/* Slide decorations で背景デコレーション */}
      <Slide
        gradient="linear-gradient(135deg, #0077B6, #48CAE4)"
        decorations={[
          { emoji: "🐠", top: 40, right: 60, size: 60, opacity: 0.2 },
          { emoji: "🐚", bottom: 50, left: 80, size: 40, opacity: 0.15 },
        ]}
      >
        <Title size="xxl" color="#fff">海の世界へ</Title>
      </Slide>

      {/* ThankYouSlide: カスタムグラデーション + デコレーション */}
      <ThankYouSlide
        title={<>ありがとう！ 🌴</>}
        subtitle="素敵な旅になりますように"
        gradient="linear-gradient(135deg, #0077B6, #90E0EF)"
        decorations={[{ emoji: "🌺", top: 40, left: 60, size: 60, opacity: 0.2 }]}
      />
    </Deck>
  );
}
```

## エクスポート一覧

```typescript
// Core
export { Deck, Slide, Split, Grid, SLIDE_W, SLIDE_H }

// Content
export { Spacer, Title, Subtitle, Body, Badge, BulletList, Quote, CodeBlock, StatCard }

// New Components
export { Card, Image, Timeline, Table, LinkTag, Checklist,
         Footnote, Callout, Divider }

// Charts
export { BarChart, HorizontalBarChart, GroupedBarChart, LineChart, AreaChart,
         DonutChart, ScatterPlot, Sparkline, ProgressRing, ProgressBar,
         WaterfallChart }

// Templates
export { CoverSlide, SectionDivider, ThankYouSlide, AgendaSlide, TeamSlide }

// Theme
export { themes, GOOGLE_FONTS_URL, useTheme, ThemeContext, useContainerScale }

// Slide/Deck Context
export { SlideContext, useSlideContext, DeckContext, useAgendaItems }

// Types（すべてのprops型をエクスポート）
export type { SlideTheme, DeckProps, SlideProps, SlideDecoration, SplitProps, GridProps,
             SpacerProps, SpacerSize,
             TitleProps, TitleSize, SubtitleProps, BodyProps, BadgeProps,
             BulletListProps, QuoteProps, CodeBlockProps, StatCardProps,
             CardProps, ImageProps, TimelineProps, TimelineItemData,
             TableProps, LinkTagProps, ChecklistProps,
             FootnoteProps, CalloutProps, DividerProps,
             ChartDataPoint, LineSeries, ScatterSeries, GroupedBarGroup, WaterfallItem,
             BarChartProps, HorizontalBarChartProps, GroupedBarChartProps,
             LineChartProps, AreaChartProps, DonutChartProps, ScatterPlotProps,
             SparklineProps, ProgressRingProps, ProgressBarProps, WaterfallChartProps,
             CoverSlideProps, SectionDividerProps, ThankYouSlideProps,
             AgendaSlideProps, TeamSlideProps, TeamMember,
             SlideMetadata, AgendaItem }
```

## 出力形式

- ES Module: `dist/index.js`
- CommonJS: `dist/index.cjs`
- 型定義: `dist/index.d.ts`

## コーディング規約

- TypeScript strict mode を使用
- すべてのコンポーネントにprops型を定義しエクスポートする
- インラインスタイルを使用（CSS-in-JSやCSSファイルは使わない）
- チャートはすべてSVGで自前実装し、外部チャートライブラリに依存しない
- React.FC は使わず、関数宣言でコンポーネントを定義する
- 定数 `SLIDE_W = 960`, `SLIDE_H = 540` を使用する
- **export するすべてのコンポーネント・関数・型には `@example` を含む JSDoc を必ず記述する**（IDE補完やAIによるコード生成時の発見性を高めるため）
