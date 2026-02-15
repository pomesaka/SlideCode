# プレゼンテーション ベストプラクティスガイド

SlideCode で資料を作成する際に活用できる、プロフェッショナルなプレゼンテーション設計の知見をまとめたガイドです。McKinsey・BCG・Bain などのコンサルティングファーム、Barbara Minto（ピラミッド原則）、Gene Zelazny（データビジュアライゼーション）、Edward Tufte、Nancy Duarte、Garr Reynolds など、著名な専門家の知見に基づいています。

---

## 目次

1. [スライド構成の基本原則](#1-スライド構成の基本原則)
2. [ストーリーテリングとデッキ構成](#2-ストーリーテリングとデッキ構成)
3. [タイポグラフィとテキスト](#3-タイポグラフィとテキスト)
4. [カラー設計](#4-カラー設計)
5. [データビジュアライゼーション](#5-データビジュアライゼーション)
6. [ビジュアルヒエラルキー](#6-ビジュアルヒエラルキー)
7. [コンテンツ密度](#7-コンテンツ密度)
8. [スライドタイプ別ガイド](#8-スライドタイプ別ガイド)
9. [SlideCode コンポーネント対応表](#9-slidecode-コンポーネント対応表)

---

## 1. スライド構成の基本原則

### 1-1. アクションタイトル（1スライド1メッセージ）

コンサルティングファームで最も重視される原則です。各スライドのタイトルは**完全な文**であるべきで、単なるラベルではいけません。

| NG（ラベル） | OK（アクションタイトル） |
|---|---|
| Q4 売上 | Q4 売上は APAC 拡大により前年比 23% 増加 |
| ユーザー数推移 | ユーザー数は 3 か月で 2 倍に急成長 |
| コスト分析 | 原材料費の高騰が利益率を 5pt 押し下げている |

**品質チェック**: デッキ内のすべてのタイトルだけを順番に読んだとき、完結したストーリーになっているか？

```tsx
// SlideCode での実装
// ✅ アクションタイトルを title prop に設定
<Slide title="Q4売上はAPAC拡大により前年比23%増加">
  <Title />           {/* title を自動描画 */}
  <Spacer size="md" />
  <BarChart data={revenueData} />
</Slide>

// ❌ ラベルだけのタイトル
<Slide title="Q4売上">
  <Title />
  ...
</Slide>
```

### 1-2. 水平ロジックと垂直ロジック

- **水平ロジック**: スライドタイトルだけを通しで読むと、一貫したストーリーになる
- **垂直ロジック**: 各スライド内で、タイトルの主張をすべての要素が裏付ける

```tsx
// 垂直ロジックの例: タイトル（主張）→ チャート（根拠）→ 補足テキスト（解説）
<Slide title="国内EC市場は年15%成長を維持している">
  <Title />
  <Spacer size="md" />
  <Split
    left={
      <LineChart
        series={[{ name: "市場規模", data: [12, 14, 16, 18, 21] }]}
        xLabels={["2021", "2022", "2023", "2024", "2025"]}
      />
    }
    right={
      <>
        <StatCard value="21兆円" label="2025年 市場規模" change="+15%" icon="📈" />
        <Spacer size="sm" />
        <Body size="sm">出典: 経済産業省 EC市場調査 2025</Body>
      </>
    }
  />
</Slide>
```

### 1-3. 「So What?」テスト

すべてのスライドに対して「だから何？」と問いかけましょう。答えられないスライドは削除するか、タイトルを書き直してください。60 秒以内にそのスライドの意義を説明できなければ、修正が必要です。

---

## 2. ストーリーテリングとデッキ構成

### 2-1. ピラミッド原則（Barbara Minto）

ビジネスプレゼンでは**結論から述べる**のが鉄則です。

```
        結論（答え）
       /     |     \
    根拠1   根拠2   根拠3
   / | \   / | \   / | \
  データ  データ  データ
```

- **考えるとき**: ボトムアップ（データ → 洞察 → 結論）
- **伝えるとき**: トップダウン（結論 → 根拠 → データ）

### 2-2. SCQA フレームワーク

プレゼンの冒頭を構成する 4 要素:

| 要素 | 内容 | 例 |
|---|---|---|
| **S**ituation（状況） | 共有の前提 | 当社は EC 市場で 3 年連続成長 |
| **C**omplication（問題） | 何が変わった？ | 競合の参入で成長率が鈍化 |
| **Q**uestion（問い） | 自然に生まれる疑問 | どうすれば成長を維持できるか？ |
| **A**nswer（答え） | 提案・結論 | 3つの施策で 20%成長を目指す |

```tsx
// デッキ全体の構成例
<Deck theme="corporate">
  {/* 表紙 */}
  <CoverSlide
    title="EC事業 成長戦略"
    subtitle="競合環境の変化に対応する3つの施策"
    author="事業戦略部"
    date="2026-02-15"
  />

  {/* 目次（自動生成） */}
  <AgendaSlide />

  {/* S: 状況 */}
  <Slide title="当社EC事業は3年連続で二桁成長を達成">
    ...
  </Slide>

  {/* C: 問題 */}
  <Slide title="しかし大手プラットフォーマーの参入で成長率が鈍化">
    ...
  </Slide>

  {/* A: 答え（先に結論を述べる） */}
  <Slide title="3つの差別化施策により来期20%成長を実現する">
    ...
  </Slide>

  {/* 各施策の詳細 */}
  <SectionDivider title="施策1: プレミアム会員制度" number={1} />
  <Slide title="プレミアム会員は客単価が通常会員の2.3倍">
    ...
  </Slide>

  <SectionDivider title="施策2: ライブコマース導入" number={2} />
  <Slide title="ライブコマースはCVRを平均3倍に向上させる">
    ...
  </Slide>

  <SectionDivider title="施策3: 物流網の強化" number={3} />
  <Slide title="配送スピードの改善はNPS15pt向上に直結する">
    ...
  </Slide>

  {/* 締め */}
  <ThankYouSlide
    title="ありがとうございました"
    subtitle="ご質問をお待ちしています"
    contact="strategy@example.com"
  />
</Deck>
```

### 2-3. MECE（ミーシー）

論点は**漏れなくダブりなく**整理しましょう。

- **Mutually Exclusive**（相互排他）: 各項目が重ならない
- **Collectively Exhaustive**（全体網羅）: すべての可能性をカバー

### 2-4. ゴーストデッキ

スライドを作り始める前に、**タイトルだけのゴーストデッキ**を作成しましょう。デザインより先にストーリーの骨格を固めることで、論理的な一貫性が保てます。

```tsx
// まずタイトルだけでストーリーを確認
<Deck theme="corporate">
  <CoverSlide title="Q4 事業報告" />
  <Slide title="Q4は過去最高の売上を記録した" />
  <Slide title="成長の主因はAPAC市場の拡大である" />
  <Slide title="しかし利益率はコスト増により低下した" />
  <Slide title="来期はコスト最適化に注力すべきである" />
  <ThankYouSlide />
</Deck>
// → タイトルの流れを確認してから、中身を作り込む
```

---

## 3. タイポグラフィとテキスト

### 3-1. フォントサイズガイドライン

SlideCode の内部解像度は 960×540px です。以下のガイドラインを参考にしてください。

| 要素 | SlideCode コンポーネント | サイズ | 推奨用途 |
|---|---|---|---|
| メインタイトル | `<Title size="xl">` | 42px | スライドの見出し（標準） |
| 大見出し | `<Title size="xxl">` | 54px | 強調スライド、インパクト重視 |
| 小見出し | `<Title size="md">` | 26px | サブセクション |
| サブタイトル | `<Subtitle>` | 16px | 補足説明 |
| 本文 | `<Body size="lg">` | 16px | メインテキスト |
| 本文（標準） | `<Body>` | 14px | 通常のテキスト |
| 注釈 | `<Body size="sm">` | 12px | 出典、脚注 |
| バッジ | `<Badge>` | 11px | ラベル、タグ |

### 3-2. フォント選択の原則

- フォントは**2種類まで**（ディスプレイ + ボディ）
- SlideCode のテーマは最適なフォントペアを設定済み
- サンセリフ体はスクリーン上で読みやすい（Verdana は Times New Roman より 23% 高速に読める）

| テーマ | Display Font | Body Font | 印象 |
|---|---|---|---|
| `corporate` | DM Serif Display | DM Sans | 信頼感・プロフェッショナル |
| `startup` | Syne | Syne | モダン・エネルギッシュ |
| `minimal` | Playfair Display | Source Sans 3 | 洗練・クリーン |
| `nature` | Fraunces | Outfit | 温かみ・自然 |

### 3-3. テキスト表示のルール

- 本文は**左揃え**（中央揃えは CoverSlide / ThankYouSlide 等に限定）
- 行間は 1.5〜2.0（SlideCode の Body コンポーネントは lineHeight: 1.6 を設定済み）
- 強調は**太字のみ**使用し、斜体・下線・色変更の多用は避ける
- 同じ種類の要素は同じフォントサイズで統一する

---

## 4. カラー設計

### 4-1. 60-30-10 ルール

プレゼンテーションのカラーバランスの基本法則です。

| 比率 | 役割 | SlideCode テーマ値 |
|---|---|---|
| **60%** | ベースカラー（背景・大面積） | `bg` |
| **30%** | メインカラー（テキスト・チャート） | `text`, `primary` |
| **10%** | アクセントカラー（強調・CTA） | `accent` |

```tsx
// SlideCode のテーマは 60-30-10 ルールに準拠して設計されています
// 通常はテーマをそのまま使えば最適なバランスになります

// アクセントカラーの効果的な使い方
<Slide title="重要な指標のみアクセントで強調する">
  <Title />
  <Spacer size="md" />
  <Grid cols={3}>
    {/* 最も重要な指標だけに accent を使う */}
    <StatCard value="$1.2M" label="売上" change="+23%" icon="💰" />
    <StatCard value="3,400" label="ユーザー数" icon="👥" />
    <StatCard value="99.9%" label="稼働率" icon="⚡" />
  </Grid>
</Slide>
```

### 4-2. セマンティックカラー

色は**装飾ではなく意味**を持たせてください。SlideCode のテーマにはセマンティックカラーが組み込まれており、利用者が色を意識せずにベストプラクティスに沿えるようになっています。

| テーマ値 | 意味 | 自動適用されるコンポーネント |
|---|---|---|
| `accent` | 注目・強調 | `Badge`, `Callout(insight)`, `BulletList` icon |
| `positive` | ポジティブ（成長・達成） | `StatCard` change(+), `Callout(positive)`, `WaterfallChart` 正値 |
| `negative` | ネガティブ（減少・問題） | `StatCard` change(-), `Callout(warning)`, `WaterfallChart` 負値 |
| `textMuted` | 補助情報 | `Subtitle`, `Footnote`, チャートラベル |

各テーマは色調に合わせた positive/negative カラーを持っています:

| テーマ | positive | negative |
|---|---|---|
| `corporate` | `#22C55E` | `#EF4444` |
| `startup` | `#4ADE80` | `#FB7185` |
| `minimal` | `#059669` | `#DC2626` |
| `nature` | `#5B8A72` | `#C75050` |

```tsx
// StatCard は change prop の先頭文字でテーマの positive/negative 色を自動適用
<StatCard value="$1.2M" label="売上" change="+23%" />   {/* theme.positive で表示 */}
<StatCard value="$800K" label="コスト" change="-5%" />   {/* theme.negative で表示 */}

// sentiment で色の意味づけを上書き（コスト削減 = ポジティブ、離脱率増加 = ネガティブ）
<StatCard value="$800K" label="コスト" change="-5%" sentiment="positive" />  {/* 緑↓ */}
<StatCard value="12%" label="離脱率" change="+3%" sentiment="negative" />    {/* 赤↑ */}

// Callout も variant でセマンティックカラーを自動適用
<Callout variant="positive" icon="✅">目標達成</Callout>  {/* theme.positive */}
<Callout variant="warning" icon="⚠️">リスク</Callout>     {/* theme.negative */}

// WaterfallChart は正値/負値で自動色分け
<WaterfallChart data={[
  { label: "Q3", value: 1000, isTotal: true },
  { label: "増加", value: 300 },     {/* theme.positive */}
  { label: "減少", value: -200 },    {/* theme.negative */}
  { label: "Q4", value: 0, isTotal: true },
]} />
```

### 4-3. アクセシビリティ

- テキストと背景のコントラスト比は **4.5:1 以上**を確保
- 赤と緑の組み合わせのみに頼らない（色覚多様性への配慮）
- SlideCode のプリセットテーマはコントラスト要件を満たすよう設計されています

---

## 5. データビジュアライゼーション

### 5-1. チャート選択フレームワーク（Gene Zelazny）

**まずメッセージを決め、次に比較タイプを特定し、最後にチャートを選ぶ**。

| 比較タイプ | 伝えたいこと | 推奨チャート | SlideCode コンポーネント |
|---|---|---|---|
| **構成** | 全体に占める割合 | ドーナツ / 円 | `<DonutChart>` |
| **項目比較** | 大きい・小さい | 横棒グラフ | `<HorizontalBarChart>` |
| **時系列** | 変化・推移 | 折れ線 / 縦棒 | `<LineChart>` / `<BarChart>` |
| **相関** | 関連性 | 散布図 | `<ScatterPlot>` |
| **累積推移** | 積み上げの変化 | エリアチャート | `<AreaChart>` |
| **進捗** | 達成度 | プログレス | `<ProgressRing>` / `<ProgressBar>` |
| **インライン傾向** | テキスト中の推移 | スパークライン | `<Sparkline>` |

### 5-2. データインク比の最大化（Edward Tufte）

> **「何よりもまず、データを見せよ」** — Edward Tufte

チャートの中で、データそのものを表現するインクの割合を最大化します。

**削除すべき要素（チャートジャンク）:**
- 3D 効果（長さの知覚を歪める）
- 不要なグリッド線
- 装飾的な背景
- 冗長なデータラベル（軸ラベルと重複するもの）
- グラデーション効果

SlideCode のチャートコンポーネントは、これらの原則に従い**フラットでミニマルなデザイン**で設計されています。

### 5-3. チャート設計の実践ルール

```tsx
// ✅ 良い例: メッセージが明確なチャート
<Slide title="APAC市場が売上成長の主因である">
  <Title />
  <Spacer size="md" />
  <Split
    left={
      <BarChart
        data={[
          { label: "APAC", value: 450, color: "#E8913A" },  // accent色で強調
          { label: "北米", value: 320 },
          { label: "欧州", value: 280 },
          { label: "その他", value: 150 },
        ]}
      />
    }
    right={
      <BulletList items={[
        <>APACは前年比<strong>+45%</strong>と突出した成長</>,
        "中国・インド市場のEC普及が牽引",
        "来期はさらに30%の伸長を見込む",
      ]} />
    }
  />
  <Body size="sm" color="#6B7280">出典: 社内データベース 2025年12月時点</Body>
</Slide>
```

```tsx
// ❌ 悪い例: メッセージ不明、データ過多
<Slide title="売上データ">
  <Title />
  <BarChart data={/* 20項目以上のデータ */} />
</Slide>
```

### 5-4. ドーナツチャートの使い方

- セグメントは**6 個以下**に制限
- 最も重要なセグメントを最初に配置
- 可能であれば棒グラフの使用を検討（より正確に比較できる）

```tsx
// ✅ セグメントを限定し、意味のある分類
<DonutChart
  data={[
    { label: "モバイル", value: 55 },
    { label: "デスクトップ", value: 30 },
    { label: "タブレット", value: 15 },
  ]}
/>

// ❌ セグメントが多すぎる
<DonutChart data={/* 10個以上のセグメント */} />
```

### 5-5. スパークラインの活用

Edward Tufte が提唱した「データ集約的でデザインシンプルな、ワードサイズのグラフィック」。テキストの流れを中断せずにトレンドを示すのに最適です。

```tsx
// テーブル内にスパークラインを埋め込む
<Table
  headers={["指標", "現在値", "推移", "前月比"]}
  rows={[
    ["DAU", "12,400", <Sparkline data={[8, 9, 10, 11, 12, 12.4]} />, "+3.4%"],
    ["CVR", "4.2%", <Sparkline data={[3.8, 3.9, 4.0, 4.1, 4.0, 4.2]} />, "+0.2pt"],
  ]}
/>
```

### 5-6. 出典の明記

すべてのデータには**出典を明記**してください。これはコンサルティングファームでは必須のルールです。

```tsx
<Slide title="国内EC市場は21兆円に到達">
  <Title />
  <Spacer size="md" />
  <LineChart series={marketData} xLabels={years} />
  <Footnote>出典: 経済産業省「電子商取引に関する市場調査」2025年7月</Footnote>
</Slide>
```

`<Footnote>` は `marginTop: "auto"` でスライドの下部に自動配置されるため、チャートの直後に書くだけで適切な位置に表示されます。

---

## 6. ビジュアルヒエラルキー

### 6-1. 3 秒テスト（Nancy Duarte）

スライドは**3 秒以内**にメッセージが伝わるべきです。スライドは「一瞥メディア」であり、じっくり読んでもらうものではありません。

**チェックリスト:**
- タイトル（アクションタイトル）が最も目立つか？
- 最も重要な情報に視線が最初に向かうか？
- 不要な要素を削除しても意味が通じるか？

### 6-2. デザインの 4 原則（Garr Reynolds）

| 原則 | 説明 | SlideCode での実現方法 |
|---|---|---|
| **コントラスト** | 重要な要素を目立たせる | `<Badge>`, アクセントカラー, `<Title size="xxl">` |
| **反復** | 一貫したフォーマット | テーマシステム、同一コンポーネント使用 |
| **整列** | すべての要素に位置の理由がある | `<Grid>`, `<Split>`, Slide の padding |
| **近接** | 関連情報をグループ化 | `<Card>`, `<Spacer>` による視覚的グループ化 |

### 6-3. 余白の活用

> **「余白はスライドの酸素である」** — Nancy Duarte

余白は無駄なスペースではなく、視線を誘導する能動的な要素です。余白を削ってコンテンツを詰め込むスライドは、どちらも伝わりません。

```tsx
// ✅ 適度な余白で読みやすい
<Slide title="来期の3つの注力領域">
  <Title />
  <Spacer size="lg" />
  <Grid cols={3}>
    <Card icon="🚀" title="プロダクト開発" description="新機能の投入ペースを2倍に" />
    <Card icon="🌏" title="海外展開" description="APAC3カ国に進出" />
    <Card icon="🤝" title="パートナーシップ" description="大手3社との連携" />
  </Grid>
</Slide>

// ❌ 詰め込みすぎ
<Slide title="注力領域">
  <Title />
  <BulletList items={/* 10項目以上 */} />
  <Table rows={/* 大量の行 */} />
  <BarChart data={/* チャート */} />
</Slide>
```

### 6-4. 三分割法

スライドを 3×3 のグリッドに分割し、交差点に重要な要素を配置すると、中央配置より動的で魅力的な構図になります。`<Split>` コンポーネントを使うと自然に実現できます。

---

## 7. コンテンツ密度

### 7-1. 3-5 ルール

ピラミッド原則に基づき、1つの主張を支える根拠は **3〜5 個**が最適です。

- 1-2 個: 根拠が薄い
- 3-5 個: 理想的
- 7 個以上: 多すぎて記憶に残らない

これはデッキ全体のセクション数にも、各スライドの箇条書き数にも適用されます。

```tsx
// ✅ 3-5 個の箇条書き
<BulletList items={[
  "売上は前年比23%増の120億円",
  "新規顧客獲得数は目標の115%を達成",
  "顧客満足度NPSは72で業界トップ",
]} />

// ❌ 多すぎる箇条書き
<BulletList items={[
  "項目1", "項目2", "項目3", "項目4",
  "項目5", "項目6", "項目7", "項目8",
]} />
```

### 7-2. 10/20/30 ルール（Guy Kawasaki）

- **10 枚**: 聴衆が吸収できるアイデアの上限
- **20 分**: 集中力が持続する時間
- **30pt**: フォントの最小サイズ（内容を絞り込む強制力）

### 7-3. アペンディクス戦略

メインデッキは**ストーリーに集中**し、詳細データ・補足資料・バックアップ分析はすべてアペンディクスに移動しましょう。アペンディクスはメインデッキの 2-3 倍の量になっても構いません。

```tsx
<Deck theme="corporate">
  {/* メインストーリー: 10-15枚 */}
  <CoverSlide title="Q4 事業報告" />
  <AgendaSlide />
  <Slide title="...">...</Slide>
  {/* ... */}
  <ThankYouSlide />

  {/* アペンディクス: 必要に応じて参照 */}
  <SectionDivider title="Appendix" number={99} />
  <Slide title="詳細データ: 地域別売上内訳">...</Slide>
  <Slide title="詳細データ: 月次推移">...</Slide>
</Deck>
```

---

## 8. スライドタイプ別ガイド

### 8-1. 構造スライド

| スライドタイプ | 目的 | SlideCode コンポーネント |
|---|---|---|
| 表紙 | 第一印象、ブランディング | `<CoverSlide>` |
| エグゼクティブサマリー | 結論を1枚に凝縮 | `<Slide>` + `<BulletList>` |
| 目次 | プレゼンのロードマップ | `<AgendaSlide>` |
| セクション区切り | メジャーセクションの転換 | `<SectionDivider>` |
| 締め | CTA、連絡先 | `<ThankYouSlide>` |

### 8-2. エグゼクティブサマリー

経営層向けプレゼンで最も重要なスライド。**最後に書いて最初に配置**する。

```tsx
<Slide title="3つの施策により来期20%成長を実現する">
  <Title />
  <Spacer size="md" />
  <BulletList
    icon="●"
    items={[
      <>
        <strong>プレミアム会員制度の導入</strong>
        <Body size="sm">客単価2.3倍の会員層を拡大し、ARPU を35%向上させる</Body>
      </>,
      <>
        <strong>ライブコマースの本格展開</strong>
        <Body size="sm">CVR3倍のチャネルを全カテゴリに拡大し、月商を2億円上乗せ</Body>
      </>,
      <>
        <strong>物流網の強化</strong>
        <Body size="sm">翌日配送率を80%に引き上げ、NPS を15pt改善する</Body>
      </>,
    ]}
  />
</Slide>
```

### 8-3. データドリブンスライド

「1つのインサイト + 1つの根拠チャート」の構成が基本です。

```tsx
// パターン: アクションタイトル + チャート + 補足 + 出典
<Slide title="モバイルからの購入が全体の55%を占める">
  <Title />
  <Spacer size="md" />
  <Split
    left={<DonutChart data={deviceData} />}
    right={
      <>
        <BulletList items={[
          "モバイルシェアは前年比+8pt",
          "アプリ経由が全モバイルの70%",
          "デスクトップは年々減少傾向",
        ]} />
        <Spacer size="md" />
        <Callout icon="💡" title="Implication">
          モバイルファーストのUI改善を最優先で進めるべき
        </Callout>
      </>
    }
  />
  <Footnote>出典: Google Analytics 2025年12月</Footnote>
</Slide>
```

### 8-4. KPI ダッシュボードスライド

3-4 個の重要指標を大きく表示します。

```tsx
<Slide title="Q4の主要KPIはすべて目標を上回った">
  <Title />
  <Spacer size="lg" />
  <Grid cols={4}>
    <StatCard value="$12.4M" label="売上" change="+23%" icon="💰" />
    <StatCard value="34,200" label="アクティブユーザー" change="+18%" icon="👥" />
    <StatCard value="4.2%" label="コンバージョン率" change="+0.8pt" icon="🎯" />
    <StatCard value="72" label="NPS" change="+5" icon="⭐" />
  </Grid>
</Slide>
```

### 8-5. 比較スライド

Before/After、競合比較など。`ComparisonSlide` テンプレートを使うと簡潔に記述できる。

```tsx
{/* ComparisonSlide テンプレート（推奨） */}
<ComparisonSlide
  title="新デザインによりCVRが2.1倍に改善した"
  left={{ icon: "📉", title: "Before", items: ["複雑な導線", "CTA不明確", "フォーム離脱率40%"] }}
  right={{ icon: "📈", title: "After", items: ["3ステップで完了", "CTA明確化", "フォーム離脱率15%"] }}
/>

{/* より細かいカスタマイズが必要な場合は Split + Card を直接組み合わせる */}
<Slide title="新デザインによりCVRが2.1倍に改善した">
  <Title />
  <Spacer size="md" />
  <Split
    left={
      <>
        <Badge color="#EF4444">Before</Badge>
        <Spacer size="sm" />
        <StatCard value="1.8%" label="CVR" icon="📉" />
        <Spacer size="sm" />
        <BulletList items={["複雑な導線", "CTA不明確", "フォーム離脱率40%"]} />
      </>
    }
    right={
      <>
        <Badge color="#22C55E">After</Badge>
        <Spacer size="sm" />
        <StatCard value="3.8%" label="CVR" change="+2.0pt" icon="📈" />
        <Spacer size="sm" />
        <BulletList items={["3ステップで完了", "CTA明確化", "フォーム離脱率15%"]} />
      </>
    }
  />
</Slide>
```

### 8-6. ブリッジ（ウォーターフォール）分析スライド

コンサルティングで最も頻出するチャート。初期値から最終値への増減を可視化します。

```tsx
<Slide title="新規顧客とアップセルが売上増を牽引したが解約が課題">
  <Title />
  <Spacer size="md" />
  <WaterfallChart
    data={[
      { label: "Q3売上", value: 1000, isTotal: true },
      { label: "新規顧客", value: 300 },
      { label: "アップセル", value: 150 },
      { label: "解約", value: -200 },
      { label: "値引き", value: -50 },
      { label: "Q4売上", value: 0, isTotal: true },
    ]}
  />
  <Spacer size="md" />
  <Callout variant="warning" icon="⚠️" title="リスク">
    解約率が前期比 +2pt 増加。リテンション施策の強化が急務
  </Callout>
  <Footnote>出典: 社内CRMデータ 2025年12月時点</Footnote>
</Slide>
```

### 8-7. インサイト強調パターン

データから導かれる重要な示唆を `<Callout>` で明示します。

```tsx
<Slide title="顧客LTVはプレミアム会員で3倍高い">
  <Title />
  <Spacer size="md" />
  <Split
    left={
      <HorizontalBarChart data={[
        { label: "プレミアム", value: 36000 },
        { label: "スタンダード", value: 12000 },
        { label: "フリー", value: 3000 },
      ]} />
    }
    right={
      <>
        <StatCard value="3倍" label="プレミアム vs スタンダード LTV差" icon="💎" />
        <Spacer size="md" />
        <Callout icon="💡" title="So What?">
          プレミアムへのアップグレード促進が最もROIの高い施策
        </Callout>
      </>
    }
  />
  <Footnote>出典: 顧客分析レポート 2025年Q4</Footnote>
</Slide>
```

---

## 9. SlideCode コンポーネント対応表

### ベストプラクティスとコンポーネントのマッピング

| ベストプラクティス | 対応するコンポーネント / 機能 |
|---|---|
| アクションタイトル | `<Slide title="...">` + `<Title />` 自動描画 |
| ストーリーの骨格確認 | `<AgendaSlide />` 自動生成 |
| 60-30-10 カラー | テーマシステム（`bg`, `text`, `accent`） |
| フォント一貫性 | テーマの `fontDisplay` + `fontBody` |
| データインク比最大化 | SVG ベースのミニマルチャート |
| 余白の確保 | `<Spacer>`, Slide のデフォルト padding |
| 整列・グリッド | `<Grid>`, `<Split>` |
| コンテンツグループ化 | `<Card>`, セクション内のレイアウト |
| セマンティックカラー | テーマの `positive` / `negative` が全コンポーネントに自動適用 |
| KPI 強調 | `<StatCard>` 増減のテーマカラー自動適用 |
| インライントレンド | `<Sparkline>` テキスト内埋め込み |
| 出典表記 | `<Footnote>` スライド下部に自動配置 |
| キーインサイト強調 | `<Callout>` So What? を明示 |
| セクション内区切り | `<Divider>` 視覚的な分離 |
| セクション遷移 | `<SectionDivider>` 番号付き区切り |
| 増減のブリッジ分析 | `<WaterfallChart>` 売上ブリッジ・差異分析 |
| Before/After 比較 | `<ComparisonSlide>` テンプレート |
| チェックリスト / 進捗 | `<Checklist>`, `<ProgressBar>`, `<ProgressRing>` |

### チャート選択クイックリファレンス

```
「割合を見せたい」     → <DonutChart>
「量を比較したい」     → <BarChart> / <HorizontalBarChart>
「推移を見せたい」     → <LineChart>
「累積推移を見せたい」 → <AreaChart>
「相関を見せたい」     → <ScatterPlot>
「進捗を見せたい」     → <ProgressRing> / <ProgressBar>
「インラインで傾向」   → <Sparkline>
「グループ比較」       → <GroupedBarChart>
「増減のブリッジ」     → <WaterfallChart>
```

---

## 参考文献

- **Barbara Minto** — *The Minto Pyramid Principle*（ピラミッド原則）
- **Gene Zelazny** — *Say It with Charts*（マッキンゼー流チャート活用術）
- **Edward Tufte** — *The Visual Display of Quantitative Information*（定量情報のビジュアル表示）
- **Nancy Duarte** — *Slide:ology*, *Resonate*
- **Garr Reynolds** — *Presentation Zen*（プレゼンテーション Zen）
- **Guy Kawasaki** — *10/20/30 Rule*
- **McKinsey & Company** — 社内プレゼンテーション標準
- **Amazon** — 6ページメモ文化
