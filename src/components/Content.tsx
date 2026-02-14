import { type ReactNode } from "react";
import { useTheme } from "../hooks/useTheme";
import { useSlideContext } from "../hooks/useSlideContext";

/* ── Title ── */

export type TitleSize = "sm" | "md" | "lg" | "xl" | "xxl";

const titleSizeMap: Record<TitleSize, number> = {
  sm: 18,
  md: 26,
  lg: 34,
  xl: 42,
  xxl: 54,
};

export interface TitleProps {
  /**
   * 表示するテキスト。省略すると SlideContext の title を自動取得する。
   * @example
   * // 自動取得: Slide の title prop から描画
   * <Slide title="概要"><Title /></Slide>
   *
   * // 明示指定: children をそのまま描画
   * <Slide><Title>概要</Title></Slide>
   */
  children?: ReactNode;
  size?: TitleSize;
  color?: string;
}

/**
 * スライドの見出しを描画する。
 * children を省略すると、親の `<Slide title="...">` から自動取得する。
 */
export function Title({ children, size = "lg", color }: TitleProps) {
  const theme = useTheme();
  const slide = useSlideContext();
  const content = children ?? slide.title;

  if (!content) return null;

  return (
    <div
      style={{
        fontFamily: theme.fontDisplay,
        fontSize: titleSizeMap[size],
        fontWeight: 700,
        letterSpacing: "-0.02em",
        lineHeight: 1.15,
        color: color ?? theme.text,
      }}
    >
      {content}
    </div>
  );
}

/* ── Subtitle ── */

/**
 * @example
 * <Subtitle>プロジェクトの概要と目的</Subtitle>
 */
export interface SubtitleProps {
  children: ReactNode;
  color?: string;
}

/**
 * スライドのサブ見出し。textMuted カラーで 16px 描画。
 * @example
 * <Slide title="概要">
 *   <Title />
 *   <Subtitle>背景と目的</Subtitle>
 * </Slide>
 */
export function Subtitle({ children, color }: SubtitleProps) {
  const theme = useTheme();
  return (
    <div
      style={{
        fontSize: 16,
        fontWeight: 400,
        color: color ?? theme.textMuted,
        fontFamily: theme.fontBody,
        marginTop: 8,
      }}
    >
      {children}
    </div>
  );
}

/* ── Body ── */

export type BodySize = "sm" | "md" | "lg";

const bodySizeMap: Record<BodySize, number> = {
  sm: 12,
  md: 14,
  lg: 16,
};

/**
 * @example
 * <Body size="lg">本文テキストをここに記述します。</Body>
 */
export interface BodyProps {
  children: ReactNode;
  /** @default "md" */
  size?: BodySize;
  color?: string;
}

/**
 * 本文テキスト。size で sm(12px) / md(14px) / lg(16px) を切り替え。
 * @example
 * <Body>前年比120%の成長を達成しました。</Body>
 * <Body size="sm">注釈テキスト</Body>
 */
export function Body({ children, size = "md", color }: BodyProps) {
  const theme = useTheme();
  return (
    <div
      style={{
        fontSize: bodySizeMap[size],
        lineHeight: 1.6,
        color: color ?? theme.text,
        fontFamily: theme.fontBody,
      }}
    >
      {children}
    </div>
  );
}

/* ── Badge ── */

/**
 * @example
 * <Badge>NEW</Badge>
 * <Badge color="#22C55E">LIVE</Badge>
 */
export interface BadgeProps {
  children: ReactNode;
  color?: string;
}

/**
 * Pill 形状のラベル。背景は color + "18"（半透明）、11px uppercase。
 * @example
 * <Badge>NEW FEATURE</Badge>
 */
export function Badge({ children, color }: BadgeProps) {
  const theme = useTheme();
  const c = color ?? theme.accent;
  return (
    <span
      style={{
        display: "inline-block",
        padding: "4px 12px",
        borderRadius: "999px",
        background: c + "18",
        color: c,
        fontSize: 11,
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.03em",
        fontFamily: theme.fontBody,
      }}
    >
      {children}
    </span>
  );
}

/* ── BulletList ── */

/**
 * @example
 * <BulletList items={["項目A", "項目B", "項目C"]} />
 * <BulletList items={["Done", "In Progress"]} icon="✓" />
 */
export interface BulletListProps {
  items: string[];
  /** @default "→" */
  icon?: string;
}

/**
 * アイコン付き箇条書きリスト。icon はテーマの accent カラーで表示。
 * @example
 * <BulletList items={["React 18+", "TypeScript", "Vite"]} />
 */
export function BulletList({ items, icon = "→" }: BulletListProps) {
  const theme = useTheme();
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {items.map((item, i) => (
        <li
          key={i}
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 10,
            fontSize: 14,
            lineHeight: 1.6,
            fontFamily: theme.fontBody,
            color: theme.text,
            marginBottom: 6,
          }}
        >
          <span style={{ color: theme.accent, flexShrink: 0 }}>{icon}</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/* ── Quote ── */

/**
 * @example
 * <Quote author="Steve Jobs">Stay hungry, stay foolish.</Quote>
 */
export interface QuoteProps {
  children: ReactNode;
  author?: string;
}

/**
 * 引用ブロック。左に accent カラーのボーダー、fontDisplay 22px italic。
 * @example
 * <Quote author="Albert Einstein">
 *   Imagination is more important than knowledge.
 * </Quote>
 */
export function Quote({ children, author }: QuoteProps) {
  const theme = useTheme();
  return (
    <blockquote
      style={{
        borderLeft: `3px solid ${theme.accent}`,
        paddingLeft: 20,
        margin: 0,
      }}
    >
      <div
        style={{
          fontFamily: theme.fontDisplay,
          fontSize: 22,
          fontStyle: "italic",
          lineHeight: 1.4,
          color: theme.text,
        }}
      >
        {children}
      </div>
      {author && (
        <div
          style={{
            marginTop: 10,
            fontSize: 13,
            color: theme.textMuted,
            fontFamily: theme.fontBody,
          }}
        >
          — {author}
        </div>
      )}
    </blockquote>
  );
}

/* ── CodeBlock ── */

/**
 * @example
 * <CodeBlock lang="ts">const x: number = 42;</CodeBlock>
 */
export interface CodeBlockProps {
  children: string;
  lang?: string;
}

/**
 * コードブロック。JetBrains Mono / Fira Code、13px、右上に言語ラベル表示。
 * @example
 * <CodeBlock lang="tsx">
 * {`function Hello() {
 *   return <div>Hello</div>;
 * }`}
 * </CodeBlock>
 */
export function CodeBlock({ children, lang }: CodeBlockProps) {
  const theme = useTheme();
  return (
    <div
      style={{
        position: "relative",
        background: theme.primary + "0C",
        border: `1px solid ${theme.primary}15`,
        borderRadius: theme.radius,
        padding: "16px 20px",
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        fontSize: 13,
        lineHeight: 1.5,
        color: theme.text,
        overflowX: "auto",
        whiteSpace: "pre",
      }}
    >
      {lang && (
        <span
          style={{
            position: "absolute",
            top: 8,
            right: 12,
            fontSize: 10,
            color: theme.textMuted,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          {lang}
        </span>
      )}
      {children}
    </div>
  );
}

/* ── StatCard ── */

/**
 * @example
 * <StatCard value="$1.2M" label="Revenue" change="+12%" icon="💰" />
 * <StatCard value="99.9%" label="Uptime" compact />
 */
export interface StatCardProps {
  value: string;
  label: string;
  /** "-" で始まると赤↓、それ以外は緑↑ で表示 */
  change?: string;
  icon?: string;
  compact?: boolean;
}

/**
 * KPI カード。value(28px) + label(12px) + change(増減表示)。
 * @example
 * <Grid cols={3}>
 *   <StatCard value="$1.2M" label="Revenue" change="+12%" icon="💰" />
 *   <StatCard value="3,400" label="Users" change="+8%" icon="👥" />
 *   <StatCard value="99.9%" label="Uptime" icon="⚡" />
 * </Grid>
 */
export function StatCard({ value, label, change, icon, compact }: StatCardProps) {
  const theme = useTheme();
  const isNegative = change?.startsWith("-");
  const changeColor = isNegative ? "#EF4444" : "#22C55E";
  const changeArrow = isNegative ? "↓" : "↑";

  return (
    <div
      style={{
        background: theme.surface,
        borderRadius: theme.radius,
        padding: compact ? 16 : 24,
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      {icon && <div style={{ fontSize: compact ? 20 : 24, marginBottom: 4 }}>{icon}</div>}
      <div
        style={{
          fontFamily: theme.fontDisplay,
          fontSize: compact ? 24 : 28,
          fontWeight: 700,
          color: theme.text,
          lineHeight: 1.2,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: 12,
          color: theme.textMuted,
          fontFamily: theme.fontBody,
        }}
      >
        {label}
      </div>
      {change && (
        <div
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: changeColor,
            fontFamily: theme.fontBody,
            marginTop: 2,
          }}
        >
          {changeArrow} {change}
        </div>
      )}
    </div>
  );
}
