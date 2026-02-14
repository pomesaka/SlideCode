import { type ReactNode } from "react";
import { useTheme } from "../hooks/useTheme";

/* ── Checklist ── */

/**
 * @example
 * <Checklist items={["パスポート", "水着", "日焼け止め"]} />
 * <Checklist title="👕 衣類" items={["半袖＋薄手の服", "水着"]} checked={[true, false]} />
 */
export interface ChecklistProps {
  /** チェック項目 */
  items: ReactNode[];
  /** セクション見出し */
  title?: ReactNode;
  /** チェック済み状態の配列 */
  checked?: boolean[];
}

/**
 * チェックリストコンポーネント。チェックボックスUIで項目を表示。
 * @example
 * <Checklist
 *   title="👕 衣類"
 *   items={[
 *     "半袖＋薄手の服",
 *     "水着（プール用）",
 *     "サンダル＋歩きやすい靴",
 *   ]}
 *   checked={[true, true, false]}
 * />
 */
export function Checklist({ items, title, checked }: ChecklistProps) {
  const theme = useTheme();

  return (
    <div>
      {title && (
        <div
          style={{
            fontFamily: theme.fontBody,
            fontSize: 14,
            fontWeight: 600,
            color: theme.text,
            marginBottom: 8,
          }}
        >
          {title}
        </div>
      )}
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {items.map((item, i) => {
          const isChecked = checked?.[i] ?? false;
          return (
            <li
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 13,
                lineHeight: 1.5,
                fontFamily: theme.fontBody,
                color: isChecked ? theme.textMuted : theme.text,
                marginBottom: 4,
                textDecoration: isChecked ? "line-through" : "none",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 16,
                  height: 16,
                  borderRadius: 3,
                  border: isChecked
                    ? `2px solid ${theme.accent}`
                    : `2px solid ${theme.textMuted}50`,
                  background: isChecked ? theme.accent : "transparent",
                  flexShrink: 0,
                  fontSize: 10,
                  color: theme.textOnPrimary,
                  fontWeight: 700,
                }}
              >
                {isChecked ? "✓" : ""}
              </span>
              <span>{item}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
