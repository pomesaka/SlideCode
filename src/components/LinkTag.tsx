import { type ReactNode } from "react";
import { useTheme } from "../hooks/useTheme";

/* ── LinkTag ── */

/**
 * @example
 * <LinkTag href="https://example.com">公式サイト</LinkTag>
 */
export interface LinkTagProps {
  href: string;
  children: ReactNode;
  /** @default "_blank" */
  target?: string;
  /** カスタムカラー（省略時はテーマの primary） */
  color?: string;
}

/**
 * 外部リンク用ピル型タグ。target="_blank" + rel="noopener noreferrer" をデフォルト付与。
 * @example
 * <LinkTag href="https://example.com">公式サイト</LinkTag>
 * <LinkTag href="https://docs.example.com" color="#22C55E">ドキュメント</LinkTag>
 */
export function LinkTag({ href, children, target = "_blank", color }: LinkTagProps) {
  const theme = useTheme();
  const c = color ?? theme.primary;

  return (
    <a
      href={href}
      target={target}
      rel="noopener noreferrer"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: "3px 10px",
        borderRadius: "999px",
        background: c + "15",
        color: c,
        fontSize: 12,
        fontWeight: 500,
        fontFamily: theme.fontBody,
        textDecoration: "none",
        lineHeight: 1.4,
      }}
    >
      {children}
      <span style={{ fontSize: 10, opacity: 0.7 }}>↗</span>
    </a>
  );
}
