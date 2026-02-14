import { useMemo, type ReactNode, type CSSProperties } from "react";
import { useTheme } from "../hooks/useTheme";
import { SlideContext, type SlideMetadata } from "../hooks/useSlideContext";
import { SLIDE_W, SLIDE_H } from "./Deck";

export interface SlideProps {
  children: ReactNode;
  title?: string;
  description?: string;
  bg?: string;
  gradient?: string;
  padding?: string;
  align?: CSSProperties["alignItems"];
  justify?: CSSProperties["justifyContent"];
}

export function Slide({
  children,
  title,
  description,
  bg,
  gradient,
  padding = "48px 64px",
  align = "flex-start",
  justify = "center",
}: SlideProps) {
  const theme = useTheme();
  const metadata = useMemo<SlideMetadata>(
    () => ({ title, description }),
    [title, description],
  );

  return (
    <SlideContext.Provider value={metadata}>
      <div
        style={{
          width: SLIDE_W,
          height: SLIDE_H,
          background: gradient ?? bg ?? theme.bg,
          padding,
          display: "flex",
          flexDirection: "column",
          alignItems: align,
          justifyContent: justify,
          overflow: "hidden",
          boxSizing: "border-box",
          fontFamily: theme.fontBody,
          color: theme.text,
        }}
      >
        {children}
      </div>
    </SlideContext.Provider>
  );
}
