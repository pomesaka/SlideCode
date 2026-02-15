import { type ReactNode, type CSSProperties } from "react";
import { useTheme } from "../hooks/useTheme";
import { useSlideContext } from "../hooks/useSlideContext";

/* ── Spacer ── */

export type SpacerSize = "xs" | "sm" | "md" | "lg" | "xl";

const spacerSizeMap: Record<SpacerSize, number> = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

/**
 * @example
 * <Spacer size="md" />
 * <Spacer size={20} />
 */
export interface SpacerProps {
  /** プリセットサイズまたはカスタム数値(px) @default "md" */
  size?: SpacerSize | number;
}

/**
 * 要素間のスペーシング。size にプリセット名または数値(px)を指定。
 * @example
 * <Title size="lg">見出し</Title>
 * <Spacer size="md" />
 * <BulletList items={["項目A", "項目B"]} />
 */
export function Spacer({ size = "md" }: SpacerProps) {
  const h = typeof size === "number" ? size : spacerSizeMap[size];
  return <div style={{ height: h, flexShrink: 0 }} />;
}

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
 * <BulletList items={[<>料金: <strong>1,700円</strong></>]} />
 */
export interface BulletListProps {
  /** 文字列またはReactNodeの配列 */
  items: ReactNode[];
  /** @default "→" */
  icon?: string;
}

/**
 * アイコン付き箇条書きリスト。icon はテーマの accent カラーで表示。
 * items には文字列のほか ReactNode も指定可能。
 * @example
 * <BulletList items={["React 18+", "TypeScript", "Vite"]} />
 * <BulletList items={[<>詳細は <LinkTag href="...">公式サイト</LinkTag></>]} />
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
  /** シンタックスハイライトを無効にする @default false */
  plain?: boolean;
}

/* ── Lightweight Syntax Highlighter ── */

interface TokenRule {
  pattern: RegExp;
  type: string;
}

const HIGHLIGHT_RULES: Record<string, TokenRule[]> = (() => {
  const jsComments: TokenRule[] = [
    { pattern: /\/\/[^\n]*/, type: "comment" },
    { pattern: /\/\*[\s\S]*?\*\//, type: "comment" },
  ];
  const strings: TokenRule[] = [
    { pattern: /`(?:[^`\\]|\\.)*`/, type: "string" },
    { pattern: /"(?:[^"\\]|\\.)*"/, type: "string" },
    { pattern: /'(?:[^'\\]|\\.)*'/, type: "string" },
  ];
  const numbers: TokenRule[] = [
    { pattern: /\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/, type: "number" },
  ];

  const jsKeywords = /\b(?:const|let|var|function|return|if|else|for|while|class|import|export|from|default|new|this|typeof|async|await|try|catch|throw|switch|case|break|continue|of|in|yield)\b/;
  const tsKeywords = /\b(?:const|let|var|function|return|if|else|for|while|class|import|export|from|default|new|this|typeof|async|await|try|catch|throw|switch|case|break|continue|of|in|yield|type|interface|enum|namespace|declare|as|is|keyof|readonly|implements|extends|abstract|private|protected|public|static|override)\b/;
  const pyKeywords = /\b(?:def|class|return|if|elif|else|for|while|import|from|as|with|try|except|raise|finally|pass|break|continue|yield|lambda|in|not|and|or|is|True|False|None|self|async|await|nonlocal|global)\b/;
  const jsBuiltins = /\b(?:console|Array|Object|String|Number|Boolean|Promise|Map|Set|null|undefined|true|false|NaN|Infinity)\b/;
  const tsBuiltins = /\b(?:console|Array|Object|String|Number|Boolean|Promise|Map|Set|null|undefined|true|false|NaN|Infinity|void|never|any|unknown|string|number|boolean|bigint|symbol|object|Record|Partial|Required|Omit|Pick|Exclude|Extract|ReturnType|Parameters)\b/;
  const pyBuiltins = /\b(?:print|len|range|list|dict|set|tuple|int|float|str|bool|type|isinstance|hasattr|getattr|setattr|super|property|staticmethod|classmethod|enumerate|zip|map|filter|sorted|reversed|any|all|min|max|sum|abs|round|open|input)\b/;

  const jsRules: TokenRule[] = [
    ...jsComments, ...strings, ...numbers,
    { pattern: jsKeywords, type: "keyword" },
    { pattern: jsBuiltins, type: "builtin" },
    { pattern: /(?:=>)/, type: "keyword" },
  ];

  const tsRules: TokenRule[] = [
    ...jsComments, ...strings, ...numbers,
    { pattern: tsKeywords, type: "keyword" },
    { pattern: tsBuiltins, type: "builtin" },
    { pattern: /(?:=>)/, type: "keyword" },
    { pattern: /<[A-Z]\w*>/, type: "builtin" },
  ];

  const pyRules: TokenRule[] = [
    { pattern: /#[^\n]*/, type: "comment" },
    ...strings, ...numbers,
    { pattern: pyKeywords, type: "keyword" },
    { pattern: pyBuiltins, type: "builtin" },
    { pattern: /@\w+/, type: "keyword" },
  ];

  const jsonRules: TokenRule[] = [
    ...strings, ...numbers,
    { pattern: /\b(?:true|false|null)\b/, type: "keyword" },
  ];

  const htmlRules: TokenRule[] = [
    { pattern: /<!--[\s\S]*?-->/, type: "comment" },
    ...strings,
    { pattern: /<\/?[a-zA-Z][\w-]*/, type: "keyword" },
    { pattern: /\b[a-zA-Z-]+(?==)/, type: "builtin" },
  ];

  const cssRules: TokenRule[] = [
    { pattern: /\/\*[\s\S]*?\*\//, type: "comment" },
    ...strings, ...numbers,
    { pattern: /[.#][\w-]+/, type: "keyword" },
    { pattern: /\b[\w-]+(?=\s*:)/, type: "builtin" },
    { pattern: /:\s*[\w-]+/, type: "string" },
  ];

  return {
    js: jsRules, javascript: jsRules, jsx: jsRules,
    ts: tsRules, typescript: tsRules, tsx: tsRules,
    py: pyRules, python: pyRules,
    json: jsonRules,
    html: htmlRules, xml: htmlRules, svg: htmlRules,
    css: cssRules, scss: cssRules,
  };
})();

function tokenize(code: string, lang: string): Array<{ text: string; type: string }> {
  const rules = HIGHLIGHT_RULES[lang.toLowerCase()];
  if (!rules) return [{ text: code, type: "plain" }];

  const tokens: Array<{ text: string; type: string }> = [];
  let remaining = code;

  while (remaining.length > 0) {
    let earliest = { index: remaining.length, length: 0, type: "plain" };
    for (const rule of rules) {
      const m = remaining.match(rule.pattern);
      if (m && m.index !== undefined && m.index < earliest.index) {
        earliest = { index: m.index, length: m[0].length, type: rule.type };
      }
    }
    if (earliest.index > 0) {
      tokens.push({ text: remaining.slice(0, earliest.index), type: "plain" });
    }
    if (earliest.length > 0) {
      tokens.push({ text: remaining.slice(earliest.index, earliest.index + earliest.length), type: earliest.type });
      remaining = remaining.slice(earliest.index + earliest.length);
    } else {
      break;
    }
  }
  return tokens;
}

function getTokenColor(type: string, theme: { primary: string; accent: string; textMuted: string; text: string }): string {
  switch (type) {
    case "keyword": return theme.accent;
    case "string": return theme.primary;
    case "comment": return theme.textMuted;
    case "number": return theme.accent;
    case "builtin": return theme.primary;
    default: return theme.text;
  }
}

/**
 * コードブロック。JetBrains Mono / Fira Code、13px、右上に言語ラベル表示。
 * lang を指定するとシンタックスハイライト（JS/TS, Python, JSON, HTML, CSS対応）。
 * @example
 * <CodeBlock lang="tsx">
 * {`function Hello() {
 *   return <div>Hello</div>;
 * }`}
 * </CodeBlock>
 */
export function CodeBlock({ children, lang, plain }: CodeBlockProps) {
  const theme = useTheme();
  const shouldHighlight = !plain && lang && HIGHLIGHT_RULES[lang.toLowerCase()];

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
      {shouldHighlight
        ? tokenize(children, lang).map((tok, i) => (
            <span key={i} style={{ color: getTokenColor(tok.type, theme) }}>
              {tok.text}
            </span>
          ))
        : children}
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
  const changeColor = isNegative ? theme.negative : theme.positive;
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
