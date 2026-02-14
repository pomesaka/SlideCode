import { type ReactNode } from "react";
import { useTheme } from "../hooks/useTheme";

/* ── Table ── */

/**
 * @example
 * <Table
 *   headers={["便名", "出発", "到着"]}
 *   rows={[["ANA 091", "羽田 11:40", "石垣 15:05"]]}
 * />
 */
export interface TableProps {
  /** テーブルヘッダー */
  headers?: ReactNode[];
  /** 行データ */
  rows: ReactNode[][];
  /** 偶数行にサーフェス色の背景 @default false */
  striped?: boolean;
  /** コンパクト表示 @default false */
  compact?: boolean;
}

/**
 * テーブルコンポーネント。ヘッダー + 行データを表形式で表示。
 * @example
 * <Table
 *   headers={["便名", "出発", "到着", "料金"]}
 *   rows={[
 *     ["ANA 091", "羽田 11:40", "石垣 15:05", "16,950円"],
 *     ["ANA 092", "石垣 16:00", "羽田 18:35", "11,450円"],
 *   ]}
 *   striped
 * />
 */
export function Table({ headers, rows, striped, compact }: TableProps) {
  const theme = useTheme();
  const py = compact ? 6 : 10;
  const px = compact ? 10 : 16;
  const fontSize = compact ? 12 : 13;

  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        fontFamily: theme.fontBody,
        fontSize,
        color: theme.text,
      }}
    >
      {headers && (
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th
                key={i}
                style={{
                  padding: `${py}px ${px}px`,
                  textAlign: "left",
                  fontWeight: 600,
                  fontSize: compact ? 11 : 12,
                  color: theme.textMuted,
                  borderBottom: `2px solid ${theme.primary}20`,
                  whiteSpace: "nowrap",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {rows.map((row, ri) => (
          <tr
            key={ri}
            style={{
              background: striped && ri % 2 === 1 ? theme.surface : "transparent",
            }}
          >
            {row.map((cell, ci) => (
              <td
                key={ci}
                style={{
                  padding: `${py}px ${px}px`,
                  borderBottom: `1px solid ${theme.primary}10`,
                }}
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
