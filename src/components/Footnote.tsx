import { type ReactNode } from "react";
import { useTheme } from "../hooks/useTheme";

/* ── Footnote ── */

/**
 * @example
 * <Footnote>出典: 経済産業省「EC市場調査」2025年7月</Footnote>
 * <Footnote>注: 数値は四捨五入のため合計が100%にならない場合があります</Footnote>
 */
export interface FootnoteProps {
  children: ReactNode;
}

/**
 * スライド下部の出典・注釈コンポーネント。
 * データの信頼性を担保するため、すべてのデータスライドに出典を明記することが推奨される。
 * スライド下部に自動配置（`marginTop: "auto"`）される。
 * @example
 * <Slide title="国内EC市場は21兆円規模に成長">
 *   <Title />
 *   <Spacer size="md" />
 *   <LineChart series={marketData} />
 *   <Footnote>出典: 経済産業省「電子商取引に関する市場調査」2025年7月</Footnote>
 * </Slide>
 */
export function Footnote({ children }: FootnoteProps) {
  const theme = useTheme();

  return (
    <div
      style={{
        marginTop: "auto",
        paddingTop: 8,
        fontSize: 10,
        lineHeight: 1.4,
        color: theme.textMuted,
        fontFamily: theme.fontBody,
      }}
    >
      {children}
    </div>
  );
}
