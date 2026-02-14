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
- **型生成**: vite-plugin-dts
- **チャート**: SVG自前実装（外部ライブラリ不要）
- **フォント**: Google Fonts
- **ライセンス**: MIT

## ディレクトリ構成（予定）

```
src/
  index.ts              # エントリポイント（全エクスポート）
  types.ts              # 共有型定義
  theme/
    themes.ts           # プリセットテーマ定義（corporate, startup, minimal, nature）
    ThemeContext.tsx     # React Context + useTheme フック
    fonts.ts            # GOOGLE_FONTS_URL 定数
  core/
    Deck.tsx            # スライドコンテナ（ナビゲーション、テーマ配信）
    Slide.tsx           # 個別スライド（960x540 スケールトゥフィット）
  layout/
    Split.tsx           # 左右2カラム
    Grid.tsx            # N列グリッド
  content/
    Title.tsx           # 見出し（sm/md/lg/xl/xxl）
    Subtitle.tsx        # サブ見出し
    Body.tsx            # 本文
    Badge.tsx           # Pill形状ラベル
    BulletList.tsx      # アイコン付きリスト
    Quote.tsx           # 引用ブロック
    CodeBlock.tsx       # コードブロック
    StatCard.tsx        # KPIカード
  charts/
    BarChart.tsx        # 縦棒グラフ
    HorizontalBarChart.tsx  # 横棒グラフ
    GroupedBarChart.tsx # グループ棒グラフ
    LineChart.tsx       # 折れ線グラフ
    AreaChart.tsx       # 積み上げエリアチャート
    DonutChart.tsx      # ドーナツチャート
    ScatterPlot.tsx     # 散布図
    Sparkline.tsx       # スパークライン
    ProgressRing.tsx    # 円形プログレス
    ProgressBar.tsx     # プログレスバー
  templates/
    CoverSlide.tsx      # 表紙
    SectionDivider.tsx  # セクション区切り
    ThankYouSlide.tsx   # 締めスライド
    AgendaSlide.tsx     # 目次
    TeamSlide.tsx       # チーム紹介
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

### Slide

- 背景: `bg`, `gradient` props
- パディング: デフォルト `"48px 64px"`
- Flex配置: `align`(デフォルト `"flex-start"`), `justify`(デフォルト `"center"`)

### コンテンツコンポーネント

- **Title**: `fontDisplay` フォント、size: sm(18px)/md(26px)/lg(34px)/xl(42px)/xxl(54px)
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
- **AgendaSlide**: items: Array<{number, title, description?}>、surfaceカード表示
- **TeamSlide**: members: Array<{name, role, avatar?}>、イニシャルアバター(chartColors使用)

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

// Types（すべてのprops型をエクスポート）
export type { SlideTheme, DeckProps, SlideProps, SplitProps, GridProps,
             TitleProps, TitleSize, SubtitleProps, BodyProps, BadgeProps,
             BulletListProps, QuoteProps, CodeBlockProps, StatCardProps,
             ChartDataPoint, LineSeries, ScatterSeries, GroupedBarGroup,
             BarChartProps, HorizontalBarChartProps, GroupedBarChartProps,
             LineChartProps, AreaChartProps, DonutChartProps, ScatterPlotProps,
             SparklineProps, ProgressRingProps, ProgressBarProps,
             CoverSlideProps, SectionDividerProps, ThankYouSlideProps,
             AgendaSlideProps, TeamSlideProps, TeamMember }
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
