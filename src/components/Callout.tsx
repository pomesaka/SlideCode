import { type ReactNode } from "react";
import { useTheme } from "../hooks/useTheme";

/* ── Callout ── */

/**
 * @example
 * <Callout icon="💡" title="Key Takeaway">
 *   APAC市場が売上成長の主因であり、来期も30%の伸長が見込まれる
 * </Callout>
 * <Callout variant="warning" icon="⚠️">コスト増に対する対策が急務</Callout>
 */
export interface CalloutProps {
  children: ReactNode;
  /** アイコン（絵文字など） */
  icon?: string;
  /** 見出し */
  title?: string;
  /**
   * スタイルバリアント
   * - "insight": テーマの accent 色（デフォルト、重要な洞察）
   * - "positive": 緑（ポジティブな結果・成果）
   * - "warning": 赤（警告・リスク）
   * - "neutral": テーマの primary 色（一般的な補足）
   * @default "insight"
   */
  variant?: "insight" | "positive" | "warning" | "neutral";
}

const variantColors: Record<string, string> = {
  positive: "#22C55E",
  warning: "#EF4444",
};

/**
 * キーインサイト・テイクアウェイの強調ボックス。
 * スライドの「So What?（だから何？）」を明示するために使用する。
 * @example
 * <Slide title="APAC市場が売上成長の主因である">
 *   <Title />
 *   <Spacer size="md" />
 *   <BarChart data={revenueData} />
 *   <Spacer size="md" />
 *   <Callout icon="💡" title="Implication">
 *     APAC への投資を倍増すべきである
 *   </Callout>
 * </Slide>
 */
export function Callout({ children, icon, title, variant = "insight" }: CalloutProps) {
  const theme = useTheme();

  const borderColor =
    variant === "neutral"
      ? theme.primary
      : variantColors[variant] ?? theme.accent;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        padding: "12px 16px",
        borderLeft: `3px solid ${borderColor}`,
        background: borderColor + "08",
        borderRadius: `0 ${theme.radius} ${theme.radius} 0`,
      }}
    >
      {icon && (
        <span style={{ fontSize: 18, lineHeight: 1, flexShrink: 0, marginTop: 1 }}>
          {icon}
        </span>
      )}
      <div style={{ minWidth: 0 }}>
        {title && (
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: borderColor,
              fontFamily: theme.fontBody,
              textTransform: "uppercase",
              letterSpacing: "0.03em",
              marginBottom: 4,
            }}
          >
            {title}
          </div>
        )}
        <div
          style={{
            fontSize: 13,
            lineHeight: 1.5,
            color: theme.text,
            fontFamily: theme.fontBody,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
