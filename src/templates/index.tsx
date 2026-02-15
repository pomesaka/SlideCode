import { type ReactNode } from "react";
import { useTheme } from "../hooks/useTheme";
import { useAgendaItems } from "../hooks/useDeckContext";
import { SLIDE_W, SLIDE_H } from "../components/Deck";
import type { SlideDecoration } from "../components/Slide";

/** テンプレート共通: デコレーション描画ヘルパー */
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

/* ── CoverSlide ── */

/**
 * @example
 * <CoverSlide
 *   title="Q4 Business Report"
 *   subtitle="2025年度第4四半期"
 *   author="田中太郎"
 *   date="2025-12-01"
 *   tag="Confidential"
 * />
 * <CoverSlide
 *   title={<>最高な沖縄<br /><span style={{ color: "#FFB703" }}>in 2026</span></>}
 *   gradient="linear-gradient(135deg, #0077B6, #90E0EF)"
 *   decorations={[{ emoji: "🏝️", top: 30, right: 50, size: 80, opacity: 0.3 }]}
 * />
 */
export interface CoverSlideProps {
  /** タイトル。ReactNode を渡せるため、複数色や改行も可能 */
  title: ReactNode;
  subtitle?: ReactNode;
  author?: string;
  date?: string;
  tag?: ReactNode;
  /** カスタムグラデーション（テーマデフォルトを上書き） */
  gradient?: string;
  /** 背景デコレーション */
  decorations?: SlideDecoration[];
  /** フッター領域のカスタムコンテンツ */
  footer?: ReactNode;
}

/**
 * 表紙スライド。primary→secondary のグラデーション背景。
 * title に ReactNode を渡すことで2色分けや改行も可能。
 * gradient / decorations / footer で柔軟にカスタマイズできる。
 * AgendaSlide の自動収集対象外。
 * @example
 * <CoverSlide title="My Presentation" subtitle="概要" author="Author" />
 */
export function CoverSlide({ title, subtitle, author, date, tag, gradient, decorations, footer }: CoverSlideProps) {
  const theme = useTheme();
  const bg = gradient ?? `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`;

  return (
    <div
      style={{
        position: "relative",
        width: SLIDE_W,
        height: SLIDE_H,
        background: bg,
        padding: "48px 64px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        boxSizing: "border-box",
        color: theme.textOnPrimary,
        overflow: "hidden",
      }}
    >
      {decorations && renderDecorations(decorations)}
      <div style={{ position: "relative" }}>
        {tag && (
          <span
            style={{
              display: "inline-block",
              padding: "4px 12px",
              borderRadius: "999px",
              background: theme.textOnPrimary + "20",
              color: theme.textOnPrimary,
              fontSize: 11,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.03em",
              fontFamily: theme.fontBody,
              marginBottom: 16,
            }}
          >
            {tag}
          </span>
        )}
        <div
          style={{
            fontFamily: theme.fontDisplay,
            fontSize: 48,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
        >
          {title}
        </div>
        {subtitle && (
          <div
            style={{
              fontSize: 18,
              marginTop: 12,
              opacity: 0.85,
              fontFamily: theme.fontBody,
            }}
          >
            {subtitle}
          </div>
        )}
        {(author || date) && (
          <div
            style={{
              display: "flex",
              gap: 16,
              marginTop: 24,
              fontSize: 13,
              opacity: 0.7,
              fontFamily: theme.fontBody,
            }}
          >
            {author && <span>{author}</span>}
            {date && <span>{date}</span>}
          </div>
        )}
        {footer && (
          <div style={{ marginTop: 16 }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── SectionDivider ── */

/**
 * @example
 * <SectionDivider title="Data Visualization" subtitle="10 chart types" number={2} />
 */
export interface SectionDividerProps {
  /** AgendaSlide の自動生成対象になる */
  title: string;
  /** AgendaSlide の description として自動収集される */
  subtitle?: string;
  /** 2桁ゼロ埋めで表示（例: 1 → "01"） */
  number?: number;
}

/**
 * セクション区切りスライド。surface 背景、大きなセクション番号 + タイトル。
 * title / subtitle は AgendaSlide の自動生成対象。
 * @example
 * <SectionDivider title="今後の計画" subtitle="来期の戦略" number={2} />
 */
export function SectionDivider({ title, subtitle, number }: SectionDividerProps) {
  const theme = useTheme();

  return (
    <div
      style={{
        width: SLIDE_W,
        height: SLIDE_H,
        background: theme.surface,
        padding: "48px 64px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        boxSizing: "border-box",
      }}
    >
      {number !== undefined && (
        <div
          style={{
            fontFamily: theme.fontDisplay,
            fontSize: 56,
            fontWeight: 700,
            color: theme.accent,
            opacity: 0.5,
            lineHeight: 1,
            marginBottom: 12,
          }}
        >
          {String(number).padStart(2, "0")}
        </div>
      )}
      <div
        style={{
          fontFamily: theme.fontDisplay,
          fontSize: 38,
          fontWeight: 700,
          color: theme.text,
          lineHeight: 1.15,
          letterSpacing: "-0.02em",
        }}
      >
        {title}
      </div>
      {subtitle && (
        <div
          style={{
            fontSize: 16,
            color: theme.textMuted,
            marginTop: 12,
            fontFamily: theme.fontBody,
          }}
        >
          {subtitle}
        </div>
      )}
    </div>
  );
}

/* ── ThankYouSlide ── */

/**
 * @example
 * <ThankYouSlide subtitle="ご清聴ありがとうございました" contact="tanaka@example.com" />
 * <ThankYouSlide
 *   title={<>Thanks! <span style={{ opacity: 0.7 }}>🎉</span></>}
 *   gradient="linear-gradient(135deg, #0077B6, #90E0EF)"
 *   decorations={[{ emoji: "🌺", top: 40, left: 60, size: 60, opacity: 0.2 }]}
 * />
 */
export interface ThankYouSlideProps {
  /** @default "Thank You" */
  title?: ReactNode;
  subtitle?: ReactNode;
  contact?: string;
  /** カスタムグラデーション（テーマデフォルトを上書き） */
  gradient?: string;
  /** 背景デコレーション */
  decorations?: SlideDecoration[];
  /** フッター領域のカスタムコンテンツ */
  footer?: ReactNode;
}

/**
 * 締めスライド。CoverSlide と同じグラデーション背景、中央揃え。
 * title に ReactNode を渡すことで絵文字やカスタムスタイルも可能。
 * AgendaSlide の自動収集対象外。
 * @example
 * <ThankYouSlide
 *   title="ありがとうございました"
 *   subtitle="質問はお気軽にどうぞ"
 *   contact="hello@example.com"
 * />
 */
export function ThankYouSlide({ title = "Thank You", subtitle, contact, gradient, decorations, footer }: ThankYouSlideProps) {
  const theme = useTheme();
  const bg = gradient ?? `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`;

  return (
    <div
      style={{
        position: "relative",
        width: SLIDE_W,
        height: SLIDE_H,
        background: bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
        color: theme.textOnPrimary,
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      {decorations && renderDecorations(decorations)}
      <div style={{ position: "relative" }}>
        <div
          style={{
            fontFamily: theme.fontDisplay,
            fontSize: 48,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
        >
          {title}
        </div>
        {subtitle && (
          <div
            style={{
              fontSize: 18,
              marginTop: 12,
              opacity: 0.85,
              fontFamily: theme.fontBody,
            }}
          >
            {subtitle}
          </div>
        )}
        {contact && (
          <div
            style={{
              fontSize: 14,
              marginTop: 24,
              opacity: 0.7,
              fontFamily: theme.fontBody,
            }}
          >
            {contact}
          </div>
        )}
        {footer && (
          <div style={{ marginTop: 16 }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── AgendaSlide ── */

export interface AgendaSlideProps {
  title?: string;
  /**
   * 目次の項目リスト。省略すると Deck 内の `title` propを持つ
   * Slide / SectionDivider から自動生成される。
   * CoverSlide, ThankYouSlide, AgendaSlide 自身は自動収集の対象外。
   * @example
   * // 自動生成（推奨）: Deck 内のスライドから収集
   * <Deck>
   *   <AgendaSlide />
   *   <Slide title="Section 1" description="概要">...</Slide>
   *   <SectionDivider title="Section 2" subtitle="詳細" />
   * </Deck>
   *
   * // 手動指定:
   * <AgendaSlide items={[
   *   { number: 1, title: "Section 1", description: "概要" },
   * ]} />
   */
  items?: Array<{ number: number; title: string; description?: string }>;
}

/**
 * 目次スライド。items を省略すると Deck 内のスライドから自動生成する。
 * 項目が6つ以上の場合は2カラム grid レイアウトに自動切り替えし、
 * スライド内に収まるようコンパクト表示になる。
 */
export function AgendaSlide({ title = "Agenda", items }: AgendaSlideProps) {
  const theme = useTheme();
  const autoItems = useAgendaItems();
  const resolvedItems = items ?? autoItems;

  const count = resolvedItems.length;
  const useGrid = count > 5;
  const compact = count > 10;

  const rows = useGrid ? Math.ceil(count / 2) : count;
  const gap = compact ? 6 : useGrid ? 8 : 12;
  const itemPadding = compact ? "8px 14px" : useGrid ? "10px 16px" : "14px 20px";
  const numberSize = compact ? 16 : useGrid ? 18 : 20;
  const titleSize = compact ? 13 : useGrid ? 14 : 15;
  const descSize = compact ? 11 : 12;
  const headingSize = useGrid ? 28 : 34;
  const headingMargin = compact ? 16 : useGrid ? 20 : 28;

  return (
    <div
      style={{
        width: SLIDE_W,
        height: SLIDE_H,
        background: theme.bg,
        padding: "48px 64px",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          fontFamily: theme.fontDisplay,
          fontSize: headingSize,
          fontWeight: 700,
          color: theme.text,
          marginBottom: headingMargin,
          letterSpacing: "-0.02em",
          flexShrink: 0,
        }}
      >
        {title}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: useGrid ? "1fr 1fr" : "1fr",
          gridTemplateRows: useGrid ? `repeat(${rows}, auto)` : undefined,
          gridAutoFlow: useGrid ? "column" : undefined,
          gap,
          flex: 1,
          minHeight: 0,
        }}
      >
        {resolvedItems.map((item, i) => (
          <div
            key={i}
            style={{
              background: theme.surface,
              borderRadius: theme.radius,
              padding: itemPadding,
              display: "flex",
              alignItems: "center",
              gap: compact ? 10 : useGrid ? 12 : 16,
            }}
          >
            <div
              style={{
                fontFamily: theme.fontDisplay,
                fontSize: numberSize,
                fontWeight: 700,
                color: theme.accent,
                minWidth: compact ? 24 : 32,
                flexShrink: 0,
              }}
            >
              {String(item.number).padStart(2, "0")}
            </div>
            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  fontSize: titleSize,
                  fontWeight: 600,
                  color: theme.text,
                  fontFamily: theme.fontBody,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {item.title}
              </div>
              {item.description && (
                <div
                  style={{
                    fontSize: descSize,
                    color: theme.textMuted,
                    marginTop: 2,
                    fontFamily: theme.fontBody,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.description}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── TeamSlide ── */

/**
 * @example
 * const member: TeamMember = { name: "田中太郎", role: "CEO" };
 */
export interface TeamMember {
  name: string;
  role: string;
  /** URL を指定するとアバター画像を表示。省略時はイニシャルアイコン */
  avatar?: string;
}

/**
 * @example
 * <TeamSlide members={[
 *   { name: "田中太郎", role: "CEO" },
 *   { name: "鈴木花子", role: "CTO" },
 * ]} />
 */
export interface TeamSlideProps {
  /** @default "Our Team" */
  title?: string;
  members: TeamMember[];
}

/**
 * チーム紹介スライド。avatar 省略時はイニシャルアイコン（chartColors 使用）。
 * @example
 * <TeamSlide
 *   title="開発チーム"
 *   members={[
 *     { name: "田中太郎", role: "Frontend" },
 *     { name: "鈴木花子", role: "Backend" },
 *   ]}
 * />
 */
export function TeamSlide({ title = "Our Team", members }: TeamSlideProps) {
  const theme = useTheme();

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  return (
    <div
      style={{
        width: SLIDE_W,
        height: SLIDE_H,
        background: theme.bg,
        padding: "48px 64px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          fontFamily: theme.fontDisplay,
          fontSize: 34,
          fontWeight: 700,
          color: theme.text,
          marginBottom: 32,
          letterSpacing: "-0.02em",
        }}
      >
        {title}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 32,
          flexWrap: "wrap",
        }}
      >
        {members.map((m, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              width: 110,
            }}
          >
            {m.avatar ? (
              <img
                src={m.avatar}
                alt={m.name}
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  background: theme.chartColors[i % theme.chartColors.length],
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: theme.textOnPrimary,
                  fontFamily: theme.fontDisplay,
                  fontSize: 20,
                  fontWeight: 700,
                }}
              >
                {getInitials(m.name)}
              </div>
            )}
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: theme.text, fontFamily: theme.fontBody }}>
                {m.name}
              </div>
              <div style={{ fontSize: 11, color: theme.textMuted, fontFamily: theme.fontBody }}>
                {m.role}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
