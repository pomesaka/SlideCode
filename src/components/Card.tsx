import { type ReactNode } from "react";
import { useTheme } from "../hooks/useTheme";

/* ── Card ── */

/**
 * @example
 * <Card icon="🍣" title="ひとし（本店）" description="石垣島No.1居酒屋" />
 * <Card title="カスタム" bg="#FFF3E0">
 *   <Body>自由なコンテンツ</Body>
 * </Card>
 */
export interface CardProps {
  title: string;
  description?: string;
  icon?: string;
  /** 画像URL。上部に表示 */
  image?: string;
  /** カスタム背景色 */
  bg?: string;
  /** children を指定するとフリーフォーム表示 */
  children?: ReactNode;
}

/**
 * 汎用カードコンポーネント。icon + title + description、または children でフリーフォーム。
 * @example
 * <Grid cols={3}>
 *   <Card icon="🚗" title="レンタカー" description="空港で受け取り可能" />
 *   <Card icon="🏖️" title="ビーチ" description="透明度抜群の海" />
 *   <Card icon="🍽️" title="グルメ" description="石垣牛と海鮮" />
 * </Grid>
 */
export function Card({ title, description, icon, image, bg, children }: CardProps) {
  const theme = useTheme();

  return (
    <div
      style={{
        background: bg ?? theme.surface,
        borderRadius: theme.radius,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {image && (
        <img
          src={image}
          alt={title}
          style={{
            width: "100%",
            height: 120,
            objectFit: "cover",
          }}
        />
      )}
      <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 6 }}>
        {icon && <div style={{ fontSize: 28, lineHeight: 1 }}>{icon}</div>}
        <div
          style={{
            fontFamily: theme.fontBody,
            fontSize: 15,
            fontWeight: 600,
            color: theme.text,
          }}
        >
          {title}
        </div>
        {description && (
          <div
            style={{
              fontFamily: theme.fontBody,
              fontSize: 12,
              color: theme.textMuted,
              lineHeight: 1.5,
            }}
          >
            {description}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
