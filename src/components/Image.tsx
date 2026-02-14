import { type CSSProperties } from "react";
import { useTheme } from "../hooks/useTheme";

/* ── Image ── */

/**
 * @example
 * <Image src="/photos/kabira-bay.jpg" alt="川平湾" width={300} height={200} />
 * <Image src="/logo.png" alt="Logo" radius="lg" caption="会社ロゴ" />
 */
export interface ImageProps {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  /** 角丸プリセットまたは CSS 値 */
  radius?: "none" | "sm" | "md" | "lg" | "full" | string;
  /** @default "cover" */
  objectFit?: CSSProperties["objectFit"];
  /** 画像下のキャプション */
  caption?: string;
}

const radiusMap: Record<string, string> = {
  none: "0",
  sm: "4px",
  md: "8px",
  lg: "16px",
  full: "9999px",
};

/**
 * 画像コンポーネント。角丸・キャプション対応。
 * @example
 * <Image
 *   src="/photos/beach.jpg"
 *   alt="ビーチ"
 *   width={300}
 *   height={200}
 *   radius="lg"
 *   caption="ミシュラン三ツ星の絶景"
 * />
 */
export function Image({
  src,
  alt,
  width,
  height,
  radius = "md",
  objectFit = "cover",
  caption,
}: ImageProps) {
  const theme = useTheme();
  const resolvedRadius = radiusMap[radius] ?? radius;

  return (
    <figure style={{ margin: 0, display: "inline-flex", flexDirection: "column" }}>
      <img
        src={src}
        alt={alt}
        style={{
          width,
          height,
          objectFit,
          borderRadius: resolvedRadius,
          display: "block",
        }}
      />
      {caption && (
        <figcaption
          style={{
            marginTop: 6,
            fontSize: 11,
            color: theme.textMuted,
            fontFamily: theme.fontBody,
            lineHeight: 1.4,
          }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
