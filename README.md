# SlideCraft

AIが生成しやすいプレゼンテーション用Reactコンポーネントライブラリ。

PowerPointの代わりに、React/JSXでスライドを記述し、ブラウザ上でプレゼンテーションを表示する。

## 背景と目的

- 生成AIはPowerPoint生成が苦手だが、WebUIの生成は得意
- HTMLベースのスライドを生成させることで、AIによる高品質なプレゼン作成を実現する
- Reactエコシステム（TypeScript, Tailwind, Shadcn等）を活用可能

## 技術スタック

| 項目 | 選定 |
|------|------|
| 言語 | TypeScript (strict mode) |
| フレームワーク | React 18+ |
| ビルド | Vite 5 |
| 型生成 | vite-plugin-dts |
| チャート | SVG（自前実装、外部ライブラリ不要） |
| フォント | Google Fonts |
| ライセンス | MIT |

## インストール

```bash
npm install slidecraft
```

## クイックスタート

```tsx
import { Deck, Slide, Title, Body, CoverSlide } from "slidecraft";
import { GOOGLE_FONTS_URL } from "slidecraft";

// index.html の <head> に Google Fonts リンクを追加
// <link rel="stylesheet" href={GOOGLE_FONTS_URL} />

function App() {
  return (
    <Deck theme="corporate">
      <CoverSlide
        title="My Presentation"
        subtitle="Built with SlideCraft"
        author="Your Name"
        date="2026-01-01"
      />
      <Slide>
        <Title size="xl">Hello, SlideCraft!</Title>
        <Body>React/JSXでスライドを記述できます。</Body>
      </Slide>
    </Deck>
  );
}
```

## コンポーネント一覧

### コア

| コンポーネント | 説明 |
|---------------|------|
| `Deck` | スライド全体のコンテナ。ナビゲーション・テーマ管理 |
| `Slide` | 個別スライド。固定内部解像度 960x540px（16:9） |

### レイアウト

| コンポーネント | 説明 |
|---------------|------|
| `Split` | 左右2カラムレイアウト |
| `Grid` | N列グリッドレイアウト |

### コンテンツ

| コンポーネント | 説明 |
|---------------|------|
| `Title` | 見出しテキスト（sm/md/lg/xl/xxl） |
| `Subtitle` | サブ見出し |
| `Body` | 本文テキスト（sm/md/lg） |
| `Badge` | Pill形状のラベル |
| `BulletList` | アイコン付きリスト |
| `Quote` | 引用ブロック |
| `CodeBlock` | コードブロック |
| `StatCard` | KPIカード |

### チャート（すべてSVGベース）

| コンポーネント | 説明 |
|---------------|------|
| `BarChart` | 縦棒グラフ |
| `HorizontalBarChart` | 横棒グラフ |
| `GroupedBarChart` | グループ棒グラフ |
| `LineChart` | 折れ線グラフ |
| `AreaChart` | 積み上げエリアチャート |
| `DonutChart` | ドーナツチャート |
| `ScatterPlot` | 散布図 |
| `Sparkline` | スパークライン |
| `ProgressRing` | 円形プログレス |
| `ProgressBar` | プログレスバー |

### テンプレートスライド

| コンポーネント | 説明 |
|---------------|------|
| `CoverSlide` | 表紙 |
| `SectionDivider` | セクション区切り |
| `ThankYouSlide` | 締めスライド |
| `AgendaSlide` | 目次 |
| `TeamSlide` | チーム紹介 |

## テーマ

4つのプリセットテーマを提供:

| テーマ名 | スタイル | Display Font | Body Font |
|----------|----------|-------------|-----------|
| `corporate` | 紺 + オレンジ、プロフェッショナル | DM Serif Display | DM Sans |
| `startup` | ダークモード、ネオングリーン + 紫 | Syne | Syne |
| `minimal` | クリーン、セリフ + 赤アクセント | Playfair Display | Source Sans 3 |
| `nature` | アースカラー、緑 + 茶 | Fraunces | Outfit |

```tsx
// プリセットテーマ名で指定
<Deck theme="startup">

// カスタムテーマオブジェクトで指定
<Deck theme={{
  name: "custom",
  bg: "#ffffff",
  surface: "#f5f5f5",
  primary: "#1a1a2e",
  secondary: "#16213e",
  accent: "#e94560",
  text: "#1a1a2e",
  textMuted: "#6b7280",
  textOnPrimary: "#ffffff",
  fontDisplay: "Georgia, serif",
  fontBody: "system-ui, sans-serif",
  radius: "12px",
  chartColors: ["#e94560", "#0f3460", "#533483", "#16213e", "#e94560", "#0f3460"],
}}>
```

## Deck の機能

- **キーボードナビゲーション**: ← → スペースキー
- **タッチ/スワイプナビゲーション**: 50px以上のスワイプで発火
- **ドットインジケーター**: 20枚以下はドット、超える場合は「n / total」テキスト表示
- **Prev / Next ボタン**: 端で disabled
- **`onSlideChange(index)`**: スライド変更時のコールバック

## Slide のスケールトゥフィット方式

各スライドは固定解像度 960x540px で描画し、`ResizeObserver` で親要素に合わせて自動縮小する。

```
scale = Math.min(parentWidth / 960, 1)
```

これによりスマホでもレイアウトが崩れない。

## 出力形式

- ES Module (`dist/index.js`)
- CommonJS (`dist/index.cjs`)
- 型定義 (`dist/index.d.ts`)

## ライセンス

MIT
