import { useMemo, type ReactNode, type CSSProperties } from "react";
import { useTheme } from "../hooks/useTheme";
import { SlideContext, type SlideMetadata } from "../hooks/useSlideContext";
import { SLIDE_W, SLIDE_H } from "./Deck";

export interface SlideProps {
  children: ReactNode;
  /**
   * スライドのタイトルメタデータ。
   * - SlideContext 経由で子コンポーネントに配信される（`<Title />` が自動取得）
   * - Deck が AgendaSlide 用の目次項目として自動収集する
   * @example
   * <Slide title="売上報告">
   *   <Title />  {/* "売上報告" を自動描画 *\/}
   * </Slide>
   */
  title?: string;
  /**
   * スライドの説明メタデータ。SlideContext 経由で子に配信される。
   * AgendaSlide の自動生成時に description として表示される。
   */
  description?: string;
  bg?: string;
  gradient?: string;
  padding?: string;
  align?: CSSProperties["alignItems"];
  justify?: CSSProperties["justifyContent"];
}

/**
 * 個別スライド。960x540 固定解像度、Deck 内でスケーリング表示。
 * title を指定すると SlideContext で子に配信され、AgendaSlide の自動生成対象になる。
 * @example
 * <Slide title="売上報告" description="前年比と推移">
 *   <Title />
 *   <Body>前年比120%の成長を達成しました。</Body>
 * </Slide>
 */
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
