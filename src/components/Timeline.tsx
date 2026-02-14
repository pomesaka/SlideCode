import { useTheme } from "../hooks/useTheme";

/* ── Timeline ── */

/**
 * @example
 * const item: TimelineItemData = { time: "11:40", title: "羽田空港を出発", icon: "✈️" };
 */
export interface TimelineItemData {
  time: string;
  title: string;
  icon?: string;
  description?: string;
}

/**
 * @example
 * <Timeline items={[
 *   { time: "11:40", title: "出発", icon: "✈️" },
 *   { time: "15:05", title: "到着", icon: "🌴" },
 * ]} />
 */
export interface TimelineProps {
  items: TimelineItemData[];
  /** コンパクト表示 @default false */
  compact?: boolean;
}

/**
 * タイムラインコンポーネント。時系列のイベントを縦に表示する。
 * @example
 * <Timeline
 *   items={[
 *     { time: "11:40", title: "羽田空港を出発", icon: "✈️", description: "ANA 091" },
 *     { time: "15:05", title: "石垣空港に到着！", icon: "🌴", description: "約3時間25分" },
 *     { time: "16:00", title: "ホテルへ", icon: "🏨" },
 *   ]}
 * />
 */
export function Timeline({ items, compact }: TimelineProps) {
  const theme = useTheme();
  const dotSize = compact ? 10 : 12;
  const lineLeft = 40 + dotSize / 2;

  return (
    <div style={{ position: "relative", paddingLeft: 40 + dotSize + 16 }}>
      {/* Vertical line */}
      {items.length > 1 && (
        <div
          style={{
            position: "absolute",
            left: lineLeft,
            top: dotSize / 2,
            bottom: dotSize / 2,
            width: 2,
            background: theme.primary + "30",
            transform: "translateX(-1px)",
          }}
        />
      )}

      {items.map((item, i) => (
        <div
          key={i}
          style={{
            position: "relative",
            paddingBottom: i < items.length - 1 ? (compact ? 12 : 20) : 0,
            display: "flex",
            alignItems: "flex-start",
            gap: 0,
          }}
        >
          {/* Time label */}
          <div
            style={{
              position: "absolute",
              left: -(40 + dotSize + 16),
              width: 40,
              textAlign: "right",
              fontSize: compact ? 11 : 12,
              fontWeight: 600,
              color: theme.primary,
              fontFamily: theme.fontBody,
              lineHeight: `${dotSize + 4}px`,
            }}
          >
            {item.time}
          </div>

          {/* Dot */}
          <div
            style={{
              position: "absolute",
              left: -(dotSize + 16),
              width: dotSize,
              height: dotSize,
              borderRadius: "50%",
              background: item.icon ? "transparent" : theme.accent,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: compact ? 12 : 14,
              lineHeight: 1,
              top: 1,
            }}
          >
            {item.icon ?? null}
          </div>

          {/* Content */}
          <div>
            <div
              style={{
                fontSize: compact ? 13 : 14,
                fontWeight: 600,
                color: theme.text,
                fontFamily: theme.fontBody,
                lineHeight: `${dotSize + 4}px`,
              }}
            >
              {item.title}
            </div>
            {item.description && (
              <div
                style={{
                  fontSize: compact ? 11 : 12,
                  color: theme.textMuted,
                  fontFamily: theme.fontBody,
                  marginTop: 2,
                  lineHeight: 1.4,
                }}
              >
                {item.description}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
