# Changelog

このファイルは **API の追加・変更・削除** を中心に記録する。
AI がコード生成時に「どのバージョンでどの API が使えるか」を判断できるよう設計されている。

フォーマット: [Keep a Changelog](https://keepachangelog.com/) + API diff セクション

---

## [Unreleased]

### Added — 新規 API

#### Templates
- **`ComparisonSlide`** — Before/After 比較テンプレートスライド (`ComparisonSlideProps`, `ComparisonSide`)
  ```tsx
  <ComparisonSlide
    title="開発者の役割が根本から変わる"
    left={{ icon: "📝", title: "従来（〜2025）", items: ["自分でコードを書く", "手動テスト"] }}
    right={{ icon: "🚀", title: "これから（2026〜）", items: ["AI 出力のレビュー", "設計に集中"] }}
  />
  ```

#### Deck enhancements
- **`Deck`**: `maxWidth` prop 追加 — 外枠の最大幅（px）を指定。ラッパー div が不要になる
- **`Deck`**: `padding` prop 追加 — 外枠のパディングを指定。ラッパー div が不要になる
  ```tsx
  <Deck theme="corporate" maxWidth={1000} padding="24px 16px">
  ```

### Changed — 破壊的変更

- **`CardProps.description`**: `string` → `ReactNode` — LinkTag や太字を含む ReactNode を直接渡せるようになった（既存の string は引き続き動作）
  ```tsx
  <Card icon="🔄" title="タイトル"
    description={<><LinkTag href="...">リンク</LinkTag>。説明文。</>}
  />
  ```
- **`Deck`**: デフォルトの最大幅制限（960px）を撤廃。親要素の幅に合わせてスケールアップするようになった。従来の固定幅が必要な場合は `maxWidth={960}` を指定
- **`useContainerScale`**: scale の上限（最大1.0）を撤廃。コンテナが 960px より広い場合は 1 以上にスケールアップする

---

## [0.4.0] — 2026-02-15

### Added — 新規 API

#### Components
- **`Footnote`** — スライド下部の出典・注釈 (`FootnoteProps`)
  ```tsx
  <Footnote>出典: 経済産業省「EC市場調査」2025年7月</Footnote>
  ```
- **`Callout`** — キーインサイト強調ボックス (`CalloutProps`)
  ```tsx
  <Callout icon="💡" title="Key Takeaway" variant="positive">
    APAC市場が売上成長の主因である
  </Callout>
  ```
- **`Divider`** — スライド内の視覚的区切り線 (`DividerProps`)
  ```tsx
  <Divider spacing="lg" />
  ```

#### Charts
- **`WaterfallChart`** — ウォーターフォール（ブリッジ）チャート (`WaterfallChartProps`, `WaterfallItem`)
  ```tsx
  <WaterfallChart data={[
    { label: "Q3売上", value: 1000, isTotal: true },
    { label: "新規", value: 300 },
    { label: "解約", value: -200 },
    { label: "Q4売上", value: 0, isTotal: true },
  ]} />
  ```

#### Theme
- **`SlideTheme.positive`** — ポジティブ値（成長・達成）を示すセマンティックカラー
- **`SlideTheme.negative`** — ネガティブ値（減少・問題）を示すセマンティックカラー

#### Content enhancements
- **`StatCard`**: `sentiment` prop 追加 — change の色の意味づけを明示的に上書き可能
  ```tsx
  <StatCard value="$800K" label="コスト" change="-5%" sentiment="positive" />
  ```

### Changed — 破壊的変更

- **`SlideTheme`**: `positive: string` と `negative: string` が必須プロパティとして追加。カスタムテーマを定義している場合は追加が必要
- **`StatCard`**: change の色が `#22C55E` / `#EF4444` ハードコードから `theme.positive` / `theme.negative` に変更。プリセットテーマ使用時は見た目の変化なし
- **`Callout`**: variant の色がテーマのセマンティックカラーを参照するよう変更
- **`WaterfallChart`**: 正値/負値の色が `theme.positive` / `theme.negative` を使用（`positiveColor` / `negativeColor` prop で上書き可能）

---

## [0.3.0] — 2026-02-15

### Fixed — バグ修正

- **`AgendaSlide`** — 項目が6つ以上のときスライドからはみ出す問題を修正。項目数に応じて2カラム grid レイアウトに自動切り替え、11個以上ではさらにコンパクト表示になる
  ```tsx
  {/* 項目が多くても自動的に2カラムで収まる */}
  <AgendaSlide items={Array.from({ length: 12 }, (_, i) => ({
    number: i + 1, title: `セクション ${i + 1}`
  }))} />
  ```

---

## [0.2.0] — 2026-02-14

### Added — 新規 API

#### Components
- **`Spacer`** — 要素間スペーシング (`SpacerProps`, `SpacerSize`)
  ```tsx
  <Spacer size="md" />
  <Spacer size={20} />
  ```
- **`Card`** — 汎用カード (`CardProps`)
  ```tsx
  <Card icon="🍣" title="タイトル" description="説明" />
  ```
- **`Image`** — 画像コンポーネント (`ImageProps`)
  ```tsx
  <Image src="/photo.jpg" alt="写真" radius="lg" caption="キャプション" />
  ```
- **`Timeline`** — タイムライン表示 (`TimelineProps`, `TimelineItemData`)
  ```tsx
  <Timeline items={[{ time: "10:00", title: "出発", icon: "✈️" }]} />
  ```
- **`Table`** — テーブル表示 (`TableProps`)
  ```tsx
  <Table headers={["名前", "値"]} rows={[["A", "1"]]} striped />
  ```
- **`LinkTag`** — 外部リンク用ピル型タグ (`LinkTagProps`)
  ```tsx
  <LinkTag href="https://example.com">公式サイト</LinkTag>
  ```
- **`Checklist`** — チェックリスト (`ChecklistProps`)
  ```tsx
  <Checklist items={["項目A", "項目B"]} checked={[true, false]} />
  ```

#### Slide enhancements
- **`SlideDecoration`** 型を追加・エクスポート
- **`Slide`** に `decorations?: SlideDecoration[]` prop を追加 — 背景に絵文字を散りばめ可能
  ```tsx
  <Slide decorations={[{ emoji: "🏝️", top: 30, right: 50, size: 80, opacity: 0.3 }]}>
  ```

#### Template enhancements
- **`CoverSlide`**: `title`/`subtitle`/`tag` が `ReactNode` に拡張。`gradient`, `decorations`, `footer` prop 追加
- **`ThankYouSlide`**: `title`/`subtitle` が `ReactNode` に拡張。`gradient`, `decorations`, `footer` prop 追加

#### Content enhancements
- **`BulletList`**: `items` が `string[]` → `ReactNode[]` に拡張（リンクや太字を含む要素を指定可能）
- **`CodeBlock`**: `plain` prop 追加、`lang` 指定時にシンタックスハイライト対応（JS/TS, Python, JSON, HTML, CSS）

### Changed — 破壊的変更

- `CoverSlideProps.title`: `string` → `ReactNode` （既存の string は引き続き動作）
- `CoverSlideProps.subtitle`: `string` → `ReactNode`
- `CoverSlideProps.tag`: `string` → `ReactNode`
- `ThankYouSlideProps.title`: `string` → `ReactNode`
- `ThankYouSlideProps.subtitle`: `string` → `ReactNode`
- `BulletListProps.items`: `string[]` → `ReactNode[]`

> **注**: いずれも string を渡す既存コードはそのまま動作するため、実質的には非破壊的。

---

## [0.1.0] — 2025-01-01

### Added — 初期リリース

#### Core
- `Deck` — スライドコンテナ（キーボード/タッチナビゲーション）
- `Slide` — 個別スライド（960x540 固定解像度）
- `Split`, `Grid` — レイアウトコンポーネント
- `SLIDE_W`, `SLIDE_H` — 定数

#### Content
- `Title`, `Subtitle`, `Body`, `Badge`, `BulletList`, `Quote`, `CodeBlock`, `StatCard`

#### Charts (SVG)
- `BarChart`, `HorizontalBarChart`, `GroupedBarChart`
- `LineChart`, `AreaChart`, `DonutChart`
- `ScatterPlot`, `Sparkline`, `ProgressRing`, `ProgressBar`

#### Templates
- `CoverSlide`, `SectionDivider`, `ThankYouSlide`, `AgendaSlide`, `TeamSlide`

#### Theme
- 4 プリセットテーマ: `corporate`, `startup`, `minimal`, `nature`
- `useTheme`, `ThemeContext`, `useContainerScale`

#### Context
- `SlideContext` / `useSlideContext` — Slide の title/description を子に配信
- `DeckContext` / `useAgendaItems` — AgendaSlide 自動生成
