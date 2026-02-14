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
  children?: ReactNode;
  size?: TitleSize;
  color?: string;
}

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

export interface SubtitleProps {
  children: ReactNode;
  color?: string;
}

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

export interface BodyProps {
  children: ReactNode;
  size?: BodySize;
  color?: string;
}

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

export interface BadgeProps {
  children: ReactNode;
  color?: string;
}

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

export interface BulletListProps {
  items: string[];
  icon?: string;
}

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

export interface QuoteProps {
  children: ReactNode;
  author?: string;
}

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

export interface CodeBlockProps {
  children: string;
  lang?: string;
}

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

export interface StatCardProps {
  value: string;
  label: string;
  change?: string;
  icon?: string;
  compact?: boolean;
}

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
