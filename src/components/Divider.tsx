import { useTheme } from "../hooks/useTheme";

/* ── Divider ── */

/**
 * @example
 * <Divider />
 * <Divider spacing="lg" />
 */
export interface DividerProps {
  /**
   * 上下のスペーシング
   * @default "md"
   */
  spacing?: "sm" | "md" | "lg";
  /** カスタムカラー（省略時はテーマの primary + 透過） */
  color?: string;
}

const spacingMap = { sm: 8, md: 16, lg: 24 };

/**
 * スライド内の視覚的な区切り線。セクション間の分離に使用する。
 * @example
 * <Title>概要</Title>
 * <Body>上のセクション</Body>
 * <Divider />
 * <Body>下のセクション</Body>
 */
export function Divider({ spacing = "md", color }: DividerProps) {
  const theme = useTheme();
  const s = spacingMap[spacing];

  return (
    <div
      style={{
        width: "100%",
        height: 1,
        background: color ?? theme.primary + "15",
        marginTop: s,
        marginBottom: s,
        flexShrink: 0,
      }}
    />
  );
}
