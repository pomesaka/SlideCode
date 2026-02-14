import { useMemo, type ReactNode, type CSSProperties } from "react";
import { useTheme } from "../hooks/useTheme";
import { SlideContext, type SlideMetadata } from "../hooks/useSlideContext";
import { SLIDE_W, SLIDE_H } from "./Deck";

/**
 * 背景デコレーション要素。絵文字や記号を散りばめるために使用。
 * @example
 * { emoji: "🏝️", top: 30, right: 50, size: 80, opacity: 0.3 }
 */
export interface SlideDecoration {
  emoji: string;
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
  size?: number;
  opacity?: number;
  /** 回転角度 (deg) */
  rotate?: number;
}

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
  /**
   * 背景デコレーション要素の配列。position: absolute で配置される。
   * @example
   * <Slide decorations={[
   *   { emoji: "🏝️", top: 30, right: 50, size: 80, opacity: 0.3 },
   *   { emoji: "🌺", top: 80, right: 140, size: 50, opacity: 0.2 },
   * ]}>
   *   <Title>タイトル</Title>
   * </Slide>
   */
  decorations?: SlideDecoration[];
}

/** デコレーション要素を描画するヘルパー */
function renderDecorations(decorations: SlideDecoration[]) {
  return decorations.map((d, i) => (
    <span
      key={i}
      style={{
        position: "absolute",
        top: d.top,
        right: d.right,
        bottom: d.bottom,
        left: d.left,
        fontSize: d.size ?? 40,
        opacity: d.opacity ?? 0.3,
        lineHeight: 1,
        pointerEvents: "none",
        userSelect: "none",
        transform: d.rotate ? `rotate(${d.rotate}deg)` : undefined,
      }}
    >
      {d.emoji}
    </span>
  ));
}

/**
 * 個別スライド。960x540 固定解像度、Deck 内でスケーリング表示。
 * title を指定すると SlideContext で子に配信され、AgendaSlide の自動生成対象になる。
 * decorations で背景に絵文字などを散りばめられる。
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
  decorations,
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
          position: "relative",
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
        {decorations && renderDecorations(decorations)}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: align === "flex-start" ? "flex-start" : align === "flex-end" ? "flex-end" : align === "center" ? "center" : "stretch",
            width: "100%",
            flex: 1,
            justifyContent: justify,
            minHeight: 0,
          }}
        >
          {children}
        </div>
      </div>
    </SlideContext.Provider>
  );
}
