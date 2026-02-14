# SlideCode — AI Agent Skills Guide

このドキュメントは、AIエージェントがSlideCodeを使ってプレゼンテーションを作成し、GitHub Pagesにデプロイするための包括的ガイドです。

---

## ワークフロー概要

```
1. 情報収集（マークダウン等） → 2. プレゼン構成設計 → 3. App.tsx生成 → 4. GitHubにpush → 5. GitHub Pagesで公開
```

---

## セットアップ手順

### 新しいプレゼンテーション用リポジトリを作成する

SlideCodeリポジトリの `template/` ディレクトリの内容をコピーして使用する。

```
my-presentation/
├── package.json            # slidecodeを依存関係に含む
├── tsconfig.json
├── vite.config.ts          # base: "./" でGitHub Pages対応済み
├── index.html              # Google Fonts読み込み済み
├── .gitignore
├── src/
│   ├── main.tsx            # エントリポイント（変更不要）
│   └── App.tsx             # ← ここにプレゼン内容を書く
└── .github/
    └── workflows/
        └── deploy.yml      # mainにpushすると自動デプロイ
```

### 手順

```bash
# 1. リポジトリ作成・テンプレートコピー
mkdir my-presentation && cd my-presentation
# template/ の内容を全てコピー

# 2. 依存関係インストール
npm install

# 3. src/App.tsx を編集（プレゼン内容を書く）

# 4. GitHubにpush
git init && git add -A && git commit -m "Create presentation"
gh repo create my-presentation --public --push --source .

# 5. GitHub Pagesを有効化
# Settings > Pages > Source: GitHub Actions
# mainにpushすると自動デプロイされる
```

---

## App.tsx の書き方

### 基本構造

```tsx
import {
  Deck, Slide, Title, Subtitle, Body, Badge,
  BulletList, Quote, CodeBlock, StatCard,
  Split, Grid,
  BarChart, LineChart, DonutChart, ProgressBar, ProgressRing,
  CoverSlide, SectionDivider, ThankYouSlide, AgendaSlide, TeamSlide,
} from "slidecode";

export function App() {
  return (
    <div style={{ padding: "24px 16px", maxWidth: 1000, margin: "0 auto" }}>
      <Deck theme="corporate">
        {/* スライドをここに並べる */}
      </Deck>
    </div>
  );
}
```

### テーマ選択

| テーマ名 | 用途 | 見た目 |
|----------|------|--------|
| `corporate` | ビジネス・正式な場 | 紺+オレンジ、セリフ体見出し |
| `startup` | テック・モダン | ダーク背景、ネオンカラー |
| `minimal` | シンプル・学術 | 白背景、セリフ体、赤アクセント |
| `nature` | 環境・カジュアル | アースカラー、丸い角 |

---

## コンポーネントリファレンス

### テンプレートスライド（そのまま1枚のスライドになる）

#### CoverSlide — 表紙

```tsx
<CoverSlide
  title="プレゼンタイトル"
  subtitle="サブタイトル"
  author="発表者名"
  date="2026-01-01"
  tag="カテゴリ"
/>
```

#### SectionDivider — セクション区切り

```tsx
<SectionDivider
  number={1}
  title="セクション名"
  subtitle="セクションの説明"
/>
```

#### AgendaSlide — 目次

```tsx
<AgendaSlide
  title="Agenda"
  items={[
    { number: 1, title: "項目1", description: "説明" },
    { number: 2, title: "項目2", description: "説明" },
    { number: 3, title: "項目3" },
  ]}
/>
```

#### TeamSlide — チーム紹介

```tsx
<TeamSlide
  title="Our Team"
  members={[
    { name: "Alice", role: "CEO" },
    { name: "Bob", role: "CTO" },
  ]}
/>
```

#### ThankYouSlide — 締め

```tsx
<ThankYouSlide
  title="Thank You"
  subtitle="ご清聴ありがとうございました"
  contact="email@example.com"
/>
```

### コンテンツスライド（Slideの中に配置）

```tsx
<Slide>
  {/* この中にコンポーネントを配置 */}
</Slide>
```

Slide props:
- `bg`: 背景色 (例: `"#f0f0f0"`)
- `gradient`: グラデーション (例: `"linear-gradient(135deg, #1a1a2e, #16213e)"`)
- `padding`: パディング (デフォルト `"48px 64px"`)
- `align`: 水平配置 (デフォルト `"flex-start"`, 中央揃えは `"center"`)
- `justify`: 垂直配置 (デフォルト `"center"`)

### テキストコンポーネント

```tsx
{/* 見出し: size = "sm"(18px) | "md"(26px) | "lg"(34px) | "xl"(42px) | "xxl"(54px) */}
<Title size="lg">見出しテキスト</Title>

{/* サブ見出し（薄い色） */}
<Subtitle>補足テキスト</Subtitle>

{/* 本文: size = "sm"(12px) | "md"(14px) | "lg"(16px) */}
<Body size="md">本文テキスト</Body>

{/* バッジ（ピル型ラベル） */}
<Badge>NEW</Badge>
<Badge color="#22C55E">成功</Badge>
```

### リスト・引用・コード

```tsx
{/* アイコン付きリスト */}
<BulletList
  items={["項目1", "項目2", "項目3"]}
  icon="→"
/>

{/* 引用ブロック */}
<Quote author="発言者">引用テキスト</Quote>

{/* コードブロック */}
<CodeBlock lang="python">{`def hello():
    print("Hello, World!")`}</CodeBlock>
```

### StatCard（KPIカード）

```tsx
<StatCard
  value="$4.2M"
  label="売上"
  change="+34%"    {/* "-"始まりで赤↓、それ以外は緑↑ */}
  icon="💰"
  compact={false}  {/* trueでコンパクト表示 */}
/>
```

### レイアウト

```tsx
{/* 2カラム */}
<Split
  left={<>左側のコンテンツ</>}
  right={<>右側のコンテンツ</>}
  ratio="1fr 1fr"   {/* 比率変更可: "2fr 1fr", "1fr 2fr" */}
  gap="40px"
/>

{/* グリッド */}
<Grid cols={3} gap="20px">
  <StatCard value="100" label="A" />
  <StatCard value="200" label="B" />
  <StatCard value="300" label="C" />
</Grid>
```

### チャート

すべてSVGベース。テーマカラーが自動適用される。

```tsx
{/* 縦棒グラフ */}
<BarChart
  data={[
    { label: "A", value: 120 },
    { label: "B", value: 200 },
    { label: "C", value: 150 },
  ]}
  height={180}
  showValues={true}
/>

{/* 横棒グラフ */}
<HorizontalBarChart
  data={[
    { label: "Product A", value: 340 },
    { label: "Product B", value: 280 },
  ]}
/>

{/* グループ棒グラフ */}
<GroupedBarChart
  height={160}
  groups={[
    { label: "Q1", values: [{ label: "2024", value: 80 }, { label: "2025", value: 120 }] },
    { label: "Q2", values: [{ label: "2024", value: 95 }, { label: "2025", value: 145 }] },
  ]}
/>

{/* 折れ線グラフ */}
<LineChart
  width={830}
  height={240}
  xLabels={["Jan", "Feb", "Mar", "Apr"]}
  series={[
    { name: "売上", data: [120, 145, 162, 195] },
    { name: "利益", data: [40, 55, 62, 78] },
  ]}
/>

{/* 積み上げエリアチャート */}
<AreaChart
  width={400}
  height={200}
  xLabels={["Q1", "Q2", "Q3", "Q4"]}
  series={[
    { name: "A", data: [120, 145, 168, 195] },
    { name: "B", data: [80, 95, 110, 130] },
  ]}
/>

{/* ドーナツチャート */}
<DonutChart
  data={[
    { label: "SaaS", value: 420 },
    { label: "Enterprise", value: 280 },
    { label: "Other", value: 150 },
  ]}
  size={180}
  thickness={28}
  showLegend={true}
/>

{/* 散布図 */}
<ScatterPlot
  width={400}
  height={200}
  xLabel="X軸ラベル"
  data={[
    { name: "Group A", points: [{ x: 10, y: 20 }, { x: 15, y: 35 }] },
    { name: "Group B", points: [{ x: 25, y: 15 }, { x: 30, y: 40 }] },
  ]}
/>

{/* スパークライン（インライン小グラフ） */}
<Sparkline data={[12, 18, 15, 22, 28, 25, 32]} width={120} height={32} />

{/* 円形プログレス */}
<ProgressRing value={85} size={64} thickness={5} label="達成率" />

{/* プログレスバー */}
<ProgressBar value={75} label="進捗" />
```

---

## マークダウンからスライドへの変換ガイド

### 変換ルール

| マークダウン要素 | SlideCode変換先 |
|----------------|---------------|
| `# タイトル` | `<CoverSlide title="タイトル" />` または `<Title size="xl">` |
| `## セクション` | `<SectionDivider title="セクション" />` |
| `### 小見出し` | `<Title size="md">` |
| 箇条書き `- item` | `<BulletList items={[...]} />` |
| `> 引用` | `<Quote>` |
| コードブロック | `<CodeBlock lang="...">` |
| 表（数値データ） | `<BarChart>` や `<LineChart>` に変換 |
| 表（テキストデータ） | `<Grid>` + `<StatCard>` に変換 |
| パーセント値 | `<ProgressBar>` や `<ProgressRing>` に変換 |
| 画像の代わり | チャートやStatCardで表現 |

### 推奨スライド構成

```
1. CoverSlide          — タイトル
2. AgendaSlide         — 目次（3〜5項目）
3. SectionDivider      — セクション1
4-6. コンテンツスライド — 本文（1セクション2〜3枚）
7. SectionDivider      — セクション2
8-10. コンテンツスライド
...
N-1. TeamSlide (任意)
N.   ThankYouSlide     — 締め
```

### コンテンツスライドのパターン

**パターン1: タイトル + 箇条書き**
```tsx
<Slide>
  <Badge>カテゴリ</Badge>
  <Title size="lg">見出し</Title>
  <div style={{ height: 12 }} />
  <BulletList items={["ポイント1", "ポイント2", "ポイント3"]} />
</Slide>
```

**パターン2: KPIダッシュボード**
```tsx
<Slide>
  <Title size="lg">主要指標</Title>
  <div style={{ height: 16 }} />
  <Grid cols={4} gap="16px">
    <StatCard value="$4.2M" label="売上" change="+34%" icon="💰" />
    <StatCard value="12,400" label="ユーザー" change="+89%" icon="👥" />
    <StatCard value="94%" label="継続率" change="+6%" icon="📈" />
    <StatCard value="2.4s" label="応答時間" change="-18%" icon="⚡" />
  </Grid>
</Slide>
```

**パターン3: 2カラム（テキスト + チャート）**
```tsx
<Slide>
  <Split
    left={
      <>
        <Title size="md">分析結果</Title>
        <div style={{ height: 12 }} />
        <BulletList items={["要点1", "要点2", "要点3"]} />
      </>
    }
    right={
      <BarChart data={[...]} height={200} />
    }
  />
</Slide>
```

**パターン4: 引用 + 解説**
```tsx
<Slide>
  <Quote author="発言者">重要な引用テキスト</Quote>
  <div style={{ height: 16 }} />
  <Body>引用の背景や解説テキスト</Body>
</Slide>
```

**パターン5: コード紹介**
```tsx
<Slide>
  <Split
    left={
      <>
        <Title size="md">実装例</Title>
        <BulletList items={["特徴1", "特徴2"]} />
      </>
    }
    right={
      <CodeBlock lang="typescript">{`const x = 1;`}</CodeBlock>
    }
  />
</Slide>
```

---

## スライド枚数の目安

| プレゼン時間 | 推奨枚数 |
|------------|---------|
| 5分 LT | 8〜12枚 |
| 15分 | 15〜20枚 |
| 30分 | 25〜35枚 |
| 60分 | 40〜60枚 |

---

## スペーシングのコツ

要素間にスペースを入れるには `<div style={{ height: N }} />` を使う:

```tsx
<Badge>ラベル</Badge>
<Title size="lg">見出し</Title>        {/* Badgeの直後、隙間なし */}
<div style={{ height: 12 }} />          {/* 12pxスペース */}
<Body>本文</Body>
<div style={{ height: 16 }} />          {/* 16pxスペース */}
<BulletList items={[...]} />
```

推奨スペーシング:
- Badge → Title: 0px（密着）
- Title → Subtitle: 0px（Subtitleに marginTop: 8 内蔵）
- Title/Subtitle → コンテンツ: 12〜16px
- コンテンツ間: 12〜20px

---

## デプロイ（GitHub Pages）

### 前提条件

1. GitHubリポジトリが存在すること
2. リポジトリの Settings > Pages > Source が **GitHub Actions** に設定されていること

### 自動デプロイ

`template/.github/workflows/deploy.yml` がテンプレートに含まれている。
`main` ブランチにpushすると自動的にビルド→デプロイされる。

公開URL: `https://<username>.github.io/<repo-name>/`

### 手動デプロイ

```bash
npm run build
# dist/ の中身をGitHub Pagesにアップロード
```

---

## 完全な例: マークダウンからプレゼン生成

### 入力（マークダウン）

```markdown
# Q4 2025 業績レポート

## 業績サマリー
- 売上: $4.2M（前年比+34%）
- ユーザー数: 12,400人（+89%）
- 継続率: 94%（+6pt）

## プロダクト別売上
- SaaS: $2.1M
- Enterprise: $1.4M
- Consulting: $0.7M

## 来期の目標
- 売上目標: $6M
- 新規ユーザー: 20,000人
- NPS: 70以上
```

### 出力（App.tsx）

```tsx
import {
  Deck, Slide, Title, Subtitle, Body, Badge,
  BulletList, StatCard, Grid, Split,
  BarChart, DonutChart, ProgressRing,
  CoverSlide, SectionDivider, ThankYouSlide,
} from "slidecode";

export function App() {
  return (
    <div style={{ padding: "24px 16px", maxWidth: 1000, margin: "0 auto" }}>
      <Deck theme="corporate">
        <CoverSlide
          title="Q4 2025 業績レポート"
          subtitle="年次業績サマリーと来期目標"
          date="December 2025"
        />

        <SectionDivider number={1} title="業績サマリー" />

        <Slide>
          <Badge>Key Metrics</Badge>
          <Title size="lg">Q4 主要指標</Title>
          <div style={{ height: 16 }} />
          <Grid cols={3} gap="20px">
            <StatCard value="$4.2M" label="売上" change="+34%" icon="💰" />
            <StatCard value="12,400" label="ユーザー数" change="+89%" icon="👥" />
            <StatCard value="94%" label="継続率" change="+6%" icon="📈" />
          </Grid>
        </Slide>

        <SectionDivider number={2} title="プロダクト別売上" />

        <Slide>
          <Split
            left={
              <>
                <Title size="md">売上内訳</Title>
                <div style={{ height: 12 }} />
                <BulletList items={[
                  "SaaS: $2.1M（主力プロダクト）",
                  "Enterprise: $1.4M（大口契約）",
                  "Consulting: $0.7M（付帯サービス）",
                ]} />
              </>
            }
            right={
              <DonutChart
                data={[
                  { label: "SaaS", value: 210 },
                  { label: "Enterprise", value: 140 },
                  { label: "Consulting", value: 70 },
                ]}
              />
            }
          />
        </Slide>

        <SectionDivider number={3} title="来期の目標" />

        <Slide>
          <Title size="lg">FY2026 目標</Title>
          <div style={{ height: 24 }} />
          <div style={{ display: "flex", gap: 40, justifyContent: "center" }}>
            <ProgressRing value={70} size={80} thickness={6} label="売上 $6M" />
            <ProgressRing value={62} size={80} thickness={6} label="新規 20K" />
            <ProgressRing value={0} size={80} thickness={6} label="NPS 70+" />
          </div>
        </Slide>

        <ThankYouSlide subtitle="ご清聴ありがとうございました" />
      </Deck>
    </div>
  );
}
```

---

## 注意事項

- スライドの内部解像度は固定 960x540px。レスポンシブ対応は自動
- チャートのデータは具体的な数値で渡す。chartColorsはテーマから自動適用
- 1スライドに詰め込みすぎない。余白を大切に
- `<div style={{ height: N }} />` でスペーシングを調整
- テンプレートスライド（CoverSlide等）は `<Slide>` で囲まない。そのまま `<Deck>` の直下に置く
- コンテンツスライドは必ず `<Slide>` で囲む
