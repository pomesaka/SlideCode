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
    Slide.tsx           # 個別スライド（960x540、SlideContext配信）
    Layout.tsx          # Split（左右2カラム）、Grid（N列グリッド）
    Content.tsx         # Title, Subtitle, Body, Badge, BulletList, Quote, CodeBlock, StatCard
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

### コンテンツコンポーネント

- **Title**: `fontDisplay` フォント、size: sm(18px)/md(26px)/lg(34px)/xl(42px)/xxl(54px)
  - **`children` は省略可能** — 省略時は `SlideContext` から `title` を自動取得して描画。childrenが無くSlideContextにもtitleが無い場合は何も描画しない（`null`）
- **Subtitle**: `textMuted` 色、16px
- **Body**: size: sm(12px)/md(14px)/lg(16px)、lineHeight 1.6
- **Badge**: Pill形状、背景は `color + "18"`（半透明）、11px uppercase
- **BulletList**: `items: string[]`, `icon: string`(デフォルト "→")、accent色アイコン
- **Quote**: 左ボーダー（accent色、3px）、fontDisplay 22px italic
- **CodeBlock**: JetBrains Mono / Fira Code、13px、`lang` prop
- **StatCard**: value(28px/compact時24px), label(12px), change("-"始まりで赤↓、他は緑↑), icon, compact

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

### テンプレートスライド

- **CoverSlide**: primary→secondaryグラデーション、title/subtitle/author/date/tag
- **SectionDivider**: surface背景、number(2桁ゼロ埋め、accent色、56px、opacity 0.5)/title/subtitle
- **ThankYouSlide**: CoverSlideと同じグラデーション、中央揃え
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

## エクスポート一覧

```typescript
// Core
export { Deck, Slide, Split, Grid, SLIDE_W, SLIDE_H }

// Content
export { Title, Subtitle, Body, Badge, BulletList, Quote, CodeBlock, StatCard }

// Charts
export { BarChart, HorizontalBarChart, GroupedBarChart, LineChart, AreaChart,
         DonutChart, ScatterPlot, Sparkline, ProgressRing, ProgressBar }

// Templates
export { CoverSlide, SectionDivider, ThankYouSlide, AgendaSlide, TeamSlide }

// Theme
export { themes, GOOGLE_FONTS_URL, useTheme, ThemeContext, useContainerScale }

// Slide/Deck Context
export { SlideContext, useSlideContext, DeckContext, useAgendaItems }

// Types（すべてのprops型をエクスポート）
export type { SlideTheme, DeckProps, SlideProps, SplitProps, GridProps,
             TitleProps, TitleSize, SubtitleProps, BodyProps, BadgeProps,
             BulletListProps, QuoteProps, CodeBlockProps, StatCardProps,
             ChartDataPoint, LineSeries, ScatterSeries, GroupedBarGroup,
             BarChartProps, HorizontalBarChartProps, GroupedBarChartProps,
             LineChartProps, AreaChartProps, DonutChartProps, ScatterPlotProps,
             SparklineProps, ProgressRingProps, ProgressBarProps,
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
