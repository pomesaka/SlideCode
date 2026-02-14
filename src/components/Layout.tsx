import { type ReactNode } from "react";

/**
 * @example
 * <Split
 *   left={<><Title>左側</Title><Body>説明文</Body></>}
 *   right={<BarChart data={data} />}
 * />
 */
export interface SplitProps {
  left: ReactNode;
  right: ReactNode;
  /** CSS grid-template-columns 値。@default "1fr 1fr" */
  ratio?: string;
  /** @default "40px" */
  gap?: string;
}

/**
 * 左右2カラムレイアウト。ratio で列幅比率を変更可能。
 * @example
 * <Split
 *   ratio="2fr 1fr"
 *   left={<Body>メインコンテンツ</Body>}
 *   right={<DonutChart data={data} />}
 * />
 */
export function Split({ left, right, ratio = "1fr 1fr", gap = "40px" }: SplitProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: ratio,
        gap,
        width: "100%",
        height: "100%",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", minWidth: 0 }}>
        {left}
      </div>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", minWidth: 0 }}>
        {right}
      </div>
    </div>
  );
}

/**
 * @example
 * <Grid cols={3}>
 *   <StatCard value="100" label="Users" />
 *   <StatCard value="200" label="Orders" />
 *   <StatCard value="300" label="Revenue" />
 * </Grid>
 */
export interface GridProps {
  children: ReactNode;
  /** @default 3 */
  cols?: number;
  /** @default "20px" */
  gap?: string;
}

/**
 * N列グリッドレイアウト。StatCard や チャートの並列表示に最適。
 * @example
 * <Grid cols={2} gap="24px">
 *   <BarChart data={data1} />
 *   <DonutChart data={data2} />
 * </Grid>
 */
export function Grid({ children, cols = 3, gap = "20px" }: GridProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap,
        width: "100%",
      }}
    >
      {children}
    </div>
  );
}
