import { type ReactNode } from "react";
import { useTheme } from "../hooks/useTheme";
import { SLIDE_W, SLIDE_H } from "../components/Deck";

/* ── CoverSlide ── */

export interface CoverSlideProps {
  title: string;
  subtitle?: string;
  author?: string;
  date?: string;
  tag?: string;
}

export function CoverSlide({ title, subtitle, author, date, tag }: CoverSlideProps) {
  const theme = useTheme();

  return (
    <div
      style={{
        width: SLIDE_W,
        height: SLIDE_H,
        background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
        padding: "48px 64px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        boxSizing: "border-box",
        color: theme.textOnPrimary,
      }}
    >
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
            alignSelf: "flex-start",
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
    </div>
  );
}

/* ── SectionDivider ── */

export interface SectionDividerProps {
  title: string;
  subtitle?: string;
  number?: number;
}

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

export interface ThankYouSlideProps {
  title?: string;
  subtitle?: string;
  contact?: string;
}

export function ThankYouSlide({ title = "Thank You", subtitle, contact }: ThankYouSlideProps) {
  const theme = useTheme();

  return (
    <div
      style={{
        width: SLIDE_W,
        height: SLIDE_H,
        background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
        color: theme.textOnPrimary,
        textAlign: "center",
      }}
    >
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
    </div>
  );
}

/* ── AgendaSlide ── */

export interface AgendaSlideProps {
  title?: string;
  items: Array<{ number: number; title: string; description?: string }>;
}

export function AgendaSlide({ title = "Agenda", items }: AgendaSlideProps) {
  const theme = useTheme();

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
      }}
    >
      <div
        style={{
          fontFamily: theme.fontDisplay,
          fontSize: 34,
          fontWeight: 700,
          color: theme.text,
          marginBottom: 28,
          letterSpacing: "-0.02em",
        }}
      >
        {title}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {items.map((item, i) => (
          <div
            key={i}
            style={{
              background: theme.surface,
              borderRadius: theme.radius,
              padding: "14px 20px",
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div
              style={{
                fontFamily: theme.fontDisplay,
                fontSize: 20,
                fontWeight: 700,
                color: theme.accent,
                minWidth: 32,
              }}
            >
              {String(item.number).padStart(2, "0")}
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 600, color: theme.text, fontFamily: theme.fontBody }}>
                {item.title}
              </div>
              {item.description && (
                <div style={{ fontSize: 12, color: theme.textMuted, marginTop: 2, fontFamily: theme.fontBody }}>
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

export interface TeamMember {
  name: string;
  role: string;
  avatar?: string;
}

export interface TeamSlideProps {
  title?: string;
  members: TeamMember[];
}

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
