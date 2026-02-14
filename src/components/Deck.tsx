import {
  useState,
  useEffect,
  useRef,
  Children,
  type ReactNode,
  type CSSProperties,
} from "react";
import { type SlideTheme, themes } from "../themes";
import { ThemeContext } from "../hooks/useTheme";
import { useContainerScale } from "../hooks/useContainerScale";

export const SLIDE_W = 960;
export const SLIDE_H = 540;

export interface DeckProps {
  children: ReactNode;
  theme?: string | SlideTheme;
  onSlideChange?: (index: number) => void;
}

export function Deck({ children, theme = "corporate", onSlideChange }: DeckProps) {
  const slides = Children.toArray(children);
  const total = slides.length;
  const [current, setCurrent] = useState(0);
  const touchStart = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scale = useContainerScale(containerRef, SLIDE_W);

  const resolvedTheme: SlideTheme =
    typeof theme === "string" ? themes[theme] ?? themes.corporate : theme;

  const go = (index: number) => {
    const next = Math.max(0, Math.min(total - 1, index));
    if (next !== current) {
      setCurrent(next);
      onSlideChange?.(next);
    }
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        go(current + 1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(current - 1);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      go(current + (diff > 0 ? 1 : -1));
    }
    touchStart.current = null;
  };

  const btnStyle = (disabled: boolean): CSSProperties => ({
    padding: "6px 16px",
    border: "none",
    borderRadius: resolvedTheme.radius,
    background: disabled ? resolvedTheme.surface : resolvedTheme.primary,
    color: disabled ? resolvedTheme.textMuted : resolvedTheme.textOnPrimary,
    cursor: disabled ? "default" : "pointer",
    fontFamily: resolvedTheme.fontBody,
    fontSize: "13px",
    fontWeight: 500,
    opacity: disabled ? 0.5 : 1,
  });

  return (
    <ThemeContext.Provider value={resolvedTheme}>
      <div
        ref={containerRef}
        style={{ maxWidth: SLIDE_W, margin: "0 auto", fontFamily: resolvedTheme.fontBody, overflow: "hidden" }}
      >
        <div
          style={{
            position: "relative",
            width: SLIDE_W * scale,
            height: SLIDE_H * scale,
            overflow: "hidden",
            borderRadius: resolvedTheme.radius,
            boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
          }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: SLIDE_W,
                height: SLIDE_H,
                transformOrigin: "top left",
                transform: `scale(${scale})`,
                opacity: i === current ? 1 : 0,
                pointerEvents: i === current ? "auto" : "none",
                transition: "opacity 0.3s ease",
              }}
            >
              {slide}
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 0",
          }}
        >
          <button
            style={btnStyle(current === 0)}
            disabled={current === 0}
            onClick={() => go(current - 1)}
          >
            Prev
          </button>

          {total <= 20 ? (
            <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
              {slides.map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: i === current ? 10 : 6,
                    height: i === current ? 10 : 6,
                    borderRadius: "50%",
                    background:
                      i === current ? resolvedTheme.primary : resolvedTheme.textMuted + "40",
                    transition: "all 0.2s ease",
                    cursor: "pointer",
                  }}
                  onClick={() => go(i)}
                />
              ))}
            </div>
          ) : (
            <span
              style={{
                fontSize: 13,
                color: resolvedTheme.textMuted,
                fontFamily: resolvedTheme.fontBody,
              }}
            >
              {current + 1} / {total}
            </span>
          )}

          <button
            style={btnStyle(current === total - 1)}
            disabled={current === total - 1}
            onClick={() => go(current + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}
