import { type ReactNode } from "react";

export interface SplitProps {
  left: ReactNode;
  right: ReactNode;
  ratio?: string;
  gap?: string;
}

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

export interface GridProps {
  children: ReactNode;
  cols?: number;
  gap?: string;
}

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
