# Changelog

このファイルは **API の追加・変更・削除** を中心に記録する。
AI がコード生成時に「どのバージョンでどの API が使えるか」を判断できるよう設計されている。

フォーマット: [Keep a Changelog](https://keepachangelog.com/) + API diff セクション

---

## [Unreleased]

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
