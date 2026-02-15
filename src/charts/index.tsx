import { useTheme } from "../hooks/useTheme";

/* ── Shared Types ── */

export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface LineSeries {
  name: string;
  data: number[];
  color?: string;
}

export interface ScatterSeries {
  name: string;
  color?: string;
  points: Array<{ x: number; y: number; size?: number }>;
}

export interface GroupedBarGroup {
  label: string;
  values: Array<{ label: string; value: number }>;
}

/* ── BarChart ── */

export interface BarChartProps {
  data: ChartDataPoint[];
  height?: number;
  showValues?: boolean;
}

export function BarChart({ data, height = 180, showValues = true }: BarChartProps) {
  const theme = useTheme();
  const max = Math.max(...data.map((d) => d.value));
  const barW = Math.min(40, (960 - 80) / data.length - 8);
  const chartH = height * 0.85;
  const pad = { top: 10, bottom: 30 };
  const totalW = data.length * (barW + 8);

  return (
    <svg viewBox={`0 0 ${totalW + 20} ${height}`} width="100%" height={height}>
      {data.map((d, i) => {
        const barH = (d.value / max) * chartH;
        const x = 10 + i * (barW + 8);
        const y = pad.top + chartH - barH;
        const color = d.color ?? theme.chartColors[i % theme.chartColors.length];
        return (
          <g key={i}>
            <rect x={x} y={y} width={barW} height={barH} fill={color} rx={3} />
            {showValues && (
              <text
                x={x + barW / 2}
                y={y - 5}
                textAnchor="middle"
                fontSize={9}
                fill={theme.text}
                fontFamily={theme.fontBody}
              >
                {d.value}
              </text>
            )}
            <text
              x={x + barW / 2}
              y={height - 6}
              textAnchor="middle"
              fontSize={9}
              fill={theme.textMuted}
              fontFamily={theme.fontBody}
            >
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ── HorizontalBarChart ── */

export interface HorizontalBarChartProps {
  data: ChartDataPoint[];
}

export function HorizontalBarChart({ data }: HorizontalBarChartProps) {
  const theme = useTheme();
  const max = Math.max(...data.map((d) => d.value));
  const rowH = 28;
  const h = data.length * rowH;
  const labelW = 80;
  const valueW = 40;
  const barArea = 300 - labelW - valueW;

  return (
    <svg viewBox={`0 0 300 ${h}`} width="100%" height={h}>
      {data.map((d, i) => {
        const barW = (d.value / max) * barArea;
        const y = i * rowH;
        const color = d.color ?? theme.chartColors[i % theme.chartColors.length];
        return (
          <g key={i}>
            <text
              x={labelW - 8}
              y={y + rowH / 2 + 4}
              textAnchor="end"
              fontSize={10}
              fill={theme.text}
              fontFamily={theme.fontBody}
            >
              {d.label}
            </text>
            <rect x={labelW} y={y + 4} width={barW} height={rowH - 8} fill={color} rx={3} />
            <text
              x={labelW + barW + 6}
              y={y + rowH / 2 + 4}
              fontSize={10}
              fill={theme.textMuted}
              fontFamily={theme.fontBody}
            >
              {d.value}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ── GroupedBarChart ── */

export interface GroupedBarChartProps {
  groups: GroupedBarGroup[];
  height?: number;
}

export function GroupedBarChart({ groups, height = 180 }: GroupedBarChartProps) {
  const theme = useTheme();
  if (groups.length === 0) return null;

  const allValues = groups.flatMap((g) => g.values.map((v) => v.value));
  const max = Math.max(...allValues);
  const seriesLabels = groups[0].values.map((v) => v.label);
  const n = seriesLabels.length;
  const groupW = 60;
  const barW = Math.min(16, (groupW - 8) / n);
  const pad = { top: 30, bottom: 30 };
  const chartH = height - pad.top - pad.bottom;
  const totalW = groups.length * (groupW + 12) + 20;

  return (
    <svg viewBox={`0 0 ${totalW} ${height}`} width="100%" height={height}>
      {/* Legend */}
      <g transform={`translate(10, 10)`}>
        {seriesLabels.map((label, i) => (
          <g key={i} transform={`translate(${i * 80}, 0)`}>
            <rect width={10} height={10} fill={theme.chartColors[i % theme.chartColors.length]} rx={2} />
            <text x={14} y={9} fontSize={9} fill={theme.textMuted} fontFamily={theme.fontBody}>
              {label}
            </text>
          </g>
        ))}
      </g>
      {/* Bars */}
      {groups.map((group, gi) => {
        const gx = 10 + gi * (groupW + 12);
        return (
          <g key={gi}>
            {group.values.map((v, vi) => {
              const barH = (v.value / max) * chartH;
              const x = gx + vi * (barW + 2);
              const y = pad.top + chartH - barH;
              return (
                <rect
                  key={vi}
                  x={x}
                  y={y}
                  width={barW}
                  height={barH}
                  fill={theme.chartColors[vi % theme.chartColors.length]}
                  rx={2}
                />
              );
            })}
            <text
              x={gx + (n * (barW + 2)) / 2}
              y={height - 8}
              textAnchor="middle"
              fontSize={9}
              fill={theme.textMuted}
              fontFamily={theme.fontBody}
            >
              {group.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ── LineChart ── */

export interface LineChartProps {
  series: LineSeries[];
  width?: number;
  height?: number;
  xLabels?: string[];
}

export function LineChart({ series, width = 400, height = 200, xLabels }: LineChartProps) {
  const theme = useTheme();
  const pad = { top: 20, right: 20, bottom: 30, left: 40 };
  const chartW = width - pad.left - pad.right;
  const chartH = height - pad.top - pad.bottom;

  const allValues = series.flatMap((s) => s.data);
  const minVal = Math.min(...allValues) * 0.9;
  const maxVal = Math.max(...allValues) * 1.1;
  const range = maxVal - minVal || 1;

  const getX = (i: number, len: number) =>
    pad.left + (len > 1 ? (i / (len - 1)) * chartW : chartW / 2);
  const getY = (v: number) => pad.top + chartH - ((v - minVal) / range) * chartH;

  // Grid lines
  const gridLines = Array.from({ length: 5 }, (_, i) => {
    const val = minVal + (range / 4) * i;
    return { y: getY(val), label: Math.round(val).toString() };
  });

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height}>
      {/* Grid */}
      {gridLines.map((g, i) => (
        <g key={i}>
          <line x1={pad.left} y1={g.y} x2={width - pad.right} y2={g.y} stroke={theme.textMuted + "20"} />
          <text x={pad.left - 6} y={g.y + 3} textAnchor="end" fontSize={9} fill={theme.textMuted} fontFamily={theme.fontBody}>
            {g.label}
          </text>
        </g>
      ))}
      {/* X labels */}
      {xLabels?.map((label, i) => (
        <text
          key={i}
          x={getX(i, xLabels.length)}
          y={height - 6}
          textAnchor="middle"
          fontSize={9}
          fill={theme.textMuted}
          fontFamily={theme.fontBody}
        >
          {label}
        </text>
      ))}
      {/* Series */}
      {series.map((s, si) => {
        const color = s.color ?? theme.chartColors[si % theme.chartColors.length];
        const points = s.data.map((v, i) => `${getX(i, s.data.length)},${getY(v)}`);
        const polyline = points.join(" ");
        const areaPath = `M${points[0]} ${points.slice(1).map((p) => `L${p}`).join(" ")} L${getX(s.data.length - 1, s.data.length)},${pad.top + chartH} L${getX(0, s.data.length)},${pad.top + chartH} Z`;
        return (
          <g key={si}>
            <path d={areaPath} fill={color + "10"} />
            <polyline points={polyline} fill="none" stroke={color} strokeWidth={2} />
            {s.data.map((v, i) => (
              <circle key={i} cx={getX(i, s.data.length)} cy={getY(v)} r={3} fill={color} />
            ))}
          </g>
        );
      })}
      {/* Legend */}
      {series.length > 1 && (
        <g transform={`translate(${pad.left}, ${pad.top - 10})`}>
          {series.map((s, i) => (
            <g key={i} transform={`translate(${i * 80}, 0)`}>
              <line x1={0} y1={0} x2={12} y2={0} stroke={s.color ?? theme.chartColors[i % theme.chartColors.length]} strokeWidth={2} />
              <text x={16} y={3} fontSize={9} fill={theme.textMuted} fontFamily={theme.fontBody}>
                {s.name}
              </text>
            </g>
          ))}
        </g>
      )}
    </svg>
  );
}

/* ── AreaChart ── */

export interface AreaChartProps {
  series: LineSeries[];
  width?: number;
  height?: number;
  xLabels?: string[];
}

export function AreaChart({ series, width = 400, height = 200, xLabels }: AreaChartProps) {
  const theme = useTheme();
  const pad = { top: 20, right: 20, bottom: 30, left: 40 };
  const chartW = width - pad.left - pad.right;
  const chartH = height - pad.top - pad.bottom;

  if (series.length === 0) return null;
  const len = series[0].data.length;

  // Build stacked data
  const stacked: number[][] = [];
  for (let si = 0; si < series.length; si++) {
    stacked[si] = [];
    for (let j = 0; j < len; j++) {
      stacked[si][j] = series[si].data[j] + (si > 0 ? stacked[si - 1][j] : 0);
    }
  }

  const maxVal = Math.max(...stacked[stacked.length - 1]) * 1.1;
  const getX = (i: number) => pad.left + (len > 1 ? (i / (len - 1)) * chartW : chartW / 2);
  const getY = (v: number) => pad.top + chartH - (v / maxVal) * chartH;
  const baseline = pad.top + chartH;

  // Grid
  const gridLines = Array.from({ length: 5 }, (_, i) => {
    const val = (maxVal / 4) * i;
    return { y: getY(val), label: Math.round(val).toString() };
  });

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height}>
      {gridLines.map((g, i) => (
        <g key={i}>
          <line x1={pad.left} y1={g.y} x2={width - pad.right} y2={g.y} stroke={theme.textMuted + "20"} />
          <text x={pad.left - 6} y={g.y + 3} textAnchor="end" fontSize={9} fill={theme.textMuted} fontFamily={theme.fontBody}>
            {g.label}
          </text>
        </g>
      ))}
      {xLabels?.map((label, i) => (
        <text key={i} x={getX(i)} y={height - 6} textAnchor="middle" fontSize={9} fill={theme.textMuted} fontFamily={theme.fontBody}>
          {label}
        </text>
      ))}
      {/* Draw areas in reverse order */}
      {[...series].reverse().map((s, ri) => {
        const si = series.length - 1 - ri;
        const color = s.color ?? theme.chartColors[si % theme.chartColors.length];
        const top = Array.from({ length: len }, (_, i) => `${getX(i)},${getY(stacked[si][i])}`);
        const bot = si > 0
          ? Array.from({ length: len }, (_, i) => `${getX(len - 1 - i)},${getY(stacked[si - 1][len - 1 - i])}`)
          : [`${getX(len - 1)},${baseline}`, `${getX(0)},${baseline}`];
        return (
          <polygon key={si} points={[...top, ...bot].join(" ")} fill={color + "55"} />
        );
      })}
      {/* Legend */}
      {series.length > 1 && (
        <g transform={`translate(${pad.left}, ${pad.top - 10})`}>
          {series.map((s, i) => (
            <g key={i} transform={`translate(${i * 80}, 0)`}>
              <rect width={10} height={10} fill={(s.color ?? theme.chartColors[i % theme.chartColors.length]) + "55"} />
              <text x={14} y={9} fontSize={9} fill={theme.textMuted} fontFamily={theme.fontBody}>
                {s.name}
              </text>
            </g>
          ))}
        </g>
      )}
    </svg>
  );
}

/* ── DonutChart ── */

export interface DonutChartProps {
  data: ChartDataPoint[];
  size?: number;
  thickness?: number;
  showLegend?: boolean;
}

export function DonutChart({ data, size = 180, thickness = 28, showLegend = true }: DonutChartProps) {
  const theme = useTheme();
  const total = data.reduce((s, d) => s + d.value, 0);
  const r = (size - thickness) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;
  let accumulated = 0;

  const legendW = showLegend ? 140 : 0;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {data.map((d, i) => {
          const pct = d.value / total;
          const dashArray = `${circumference * pct} ${circumference * (1 - pct)}`;
          const dashOffset = -circumference * accumulated + circumference * 0.25;
          accumulated += pct;
          const color = d.color ?? theme.chartColors[i % theme.chartColors.length];
          return (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={color}
              strokeWidth={thickness}
              strokeDasharray={dashArray}
              strokeDashoffset={dashOffset}
              strokeLinecap="butt"
            />
          );
        })}
        <text
          x={cx}
          y={cy}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={20}
          fontWeight={700}
          fill={theme.text}
          fontFamily={theme.fontDisplay}
        >
          {total}
        </text>
      </svg>
      {showLegend && (
        <div style={{ display: "flex", flexDirection: "column", gap: 6, width: legendW }}>
          {data.map((d, i) => {
            const color = d.color ?? theme.chartColors[i % theme.chartColors.length];
            const pct = ((d.value / total) * 100).toFixed(0);
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, fontFamily: theme.fontBody }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: color, flexShrink: 0 }} />
                <span style={{ color: theme.text }}>{d.label}</span>
                <span style={{ color: theme.textMuted, marginLeft: "auto" }}>{pct}%</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ── ScatterPlot ── */

export interface ScatterPlotProps {
  data: ScatterSeries[];
  width?: number;
  height?: number;
  xLabel?: string;
}

export function ScatterPlot({ data, width = 400, height = 200, xLabel }: ScatterPlotProps) {
  const theme = useTheme();
  const pad = { top: 20, right: 20, bottom: 30, left: 40 };
  const chartW = width - pad.left - pad.right;
  const chartH = height - pad.top - pad.bottom;

  const allX = data.flatMap((s) => s.points.map((p) => p.x));
  const allY = data.flatMap((s) => s.points.map((p) => p.y));
  const minX = Math.min(...allX) * 0.9;
  const maxX = Math.max(...allX) * 1.1;
  const minY = Math.min(...allY) * 0.9;
  const maxY = Math.max(...allY) * 1.1;
  const rangeX = maxX - minX || 1;
  const rangeY = maxY - minY || 1;

  const getX = (v: number) => pad.left + ((v - minX) / rangeX) * chartW;
  const getY = (v: number) => pad.top + chartH - ((v - minY) / rangeY) * chartH;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height}>
      {/* Grid */}
      {Array.from({ length: 5 }, (_, i) => {
        const val = minY + (rangeY / 4) * i;
        const y = getY(val);
        return (
          <g key={`y${i}`}>
            <line x1={pad.left} y1={y} x2={width - pad.right} y2={y} stroke={theme.textMuted + "20"} />
            <text x={pad.left - 6} y={y + 3} textAnchor="end" fontSize={9} fill={theme.textMuted} fontFamily={theme.fontBody}>
              {Math.round(val)}
            </text>
          </g>
        );
      })}
      {Array.from({ length: 5 }, (_, i) => {
        const val = minX + (rangeX / 4) * i;
        const x = getX(val);
        return (
          <g key={`x${i}`}>
            <line x1={x} y1={pad.top} x2={x} y2={pad.top + chartH} stroke={theme.textMuted + "20"} />
            <text x={x} y={height - 8} textAnchor="middle" fontSize={9} fill={theme.textMuted} fontFamily={theme.fontBody}>
              {Math.round(val)}
            </text>
          </g>
        );
      })}
      {xLabel && (
        <text x={width / 2} y={height - 2} textAnchor="middle" fontSize={9} fill={theme.textMuted} fontFamily={theme.fontBody}>
          {xLabel}
        </text>
      )}
      {/* Points */}
      {data.map((s, si) => {
        const color = s.color ?? theme.chartColors[si % theme.chartColors.length];
        return (
          <g key={si}>
            {s.points.map((p, pi) => (
              <circle key={pi} cx={getX(p.x)} cy={getY(p.y)} r={p.size ?? 4} fill={color} opacity={0.7} />
            ))}
          </g>
        );
      })}
      {/* Legend */}
      {data.length > 1 && (
        <g transform={`translate(${pad.left}, ${pad.top - 10})`}>
          {data.map((s, i) => (
            <g key={i} transform={`translate(${i * 80}, 0)`}>
              <circle cx={4} cy={0} r={4} fill={s.color ?? theme.chartColors[i % theme.chartColors.length]} />
              <text x={12} y={3} fontSize={9} fill={theme.textMuted} fontFamily={theme.fontBody}>
                {s.name}
              </text>
            </g>
          ))}
        </g>
      )}
    </svg>
  );
}

/* ── Sparkline ── */

export interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
}

export function Sparkline({ data, width = 120, height = 32, color }: SparklineProps) {
  const theme = useTheme();
  const c = color ?? theme.primary;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((v - min) / range) * (height - 4) - 2;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <polyline points={points} fill="none" stroke={c} strokeWidth={1.5} />
    </svg>
  );
}

/* ── ProgressRing ── */

export interface ProgressRingProps {
  value: number;
  size?: number;
  thickness?: number;
  color?: string;
  label?: string;
}

export function ProgressRing({ value, size = 64, thickness = 5, color, label }: ProgressRingProps) {
  const theme = useTheme();
  const c = color ?? theme.primary;
  const r = (size - thickness) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - value / 100);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={theme.surface} strokeWidth={thickness} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={c}
          strokeWidth={thickness}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        <text
          x={size / 2}
          y={size / 2}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={size * 0.2}
          fontWeight={700}
          fill={theme.text}
          fontFamily={theme.fontBody}
        >
          {value}%
        </text>
      </svg>
      {label && (
        <div style={{ fontSize: 11, color: theme.textMuted, fontFamily: theme.fontBody, textAlign: "center" }}>
          {label}
        </div>
      )}
    </div>
  );
}

/* ── WaterfallChart ── */

/**
 * @example
 * const item: WaterfallItem = { label: "売上増", value: 200 };
 * const total: WaterfallItem = { label: "合計", value: 0, isTotal: true };
 */
export interface WaterfallItem {
  label: string;
  /** 増減値（isTotal 時は無視され自動計算される） */
  value: number;
  color?: string;
  /** true にするとその時点までの累計値を描画する */
  isTotal?: boolean;
}

/**
 * @example
 * <WaterfallChart
 *   data={[
 *     { label: "Q3売上", value: 1000, isTotal: true },
 *     { label: "新規顧客", value: 300 },
 *     { label: "既存拡大", value: 150 },
 *     { label: "解約", value: -200 },
 *     { label: "値引き", value: -50 },
 *     { label: "Q4売上", value: 0, isTotal: true },
 *   ]}
 * />
 */
export interface WaterfallChartProps {
  data: WaterfallItem[];
  height?: number;
  showValues?: boolean;
  /** 正の値の色 @default テーマの chartColors[0] */
  positiveColor?: string;
  /** 負の値の色 @default "#EF4444" */
  negativeColor?: string;
  /** 合計バーの色 @default テーマの primary */
  totalColor?: string;
}

/**
 * ウォーターフォール（ブリッジ）チャート。増減の積み上げを可視化する。
 * コンサルティングで多用される売上ブリッジ、コスト分析、差異分析に最適。
 * @example
 * <WaterfallChart
 *   data={[
 *     { label: "Q3売上", value: 1000, isTotal: true },
 *     { label: "新規", value: 300 },
 *     { label: "拡大", value: 150 },
 *     { label: "解約", value: -200 },
 *     { label: "Q4売上", value: 0, isTotal: true },
 *   ]}
 * />
 */
export function WaterfallChart({
  data,
  height = 200,
  showValues = true,
  positiveColor,
  negativeColor = "#EF4444",
  totalColor,
}: WaterfallChartProps) {
  const theme = useTheme();
  const posColor = positiveColor ?? theme.chartColors[0];
  const totColor = totalColor ?? theme.primary;

  // Calculate running totals
  const bars: Array<{
    label: string;
    start: number;
    end: number;
    value: number;
    isTotal: boolean;
    color: string;
  }> = [];

  let running = 0;
  for (const item of data) {
    if (item.isTotal) {
      // For the first total, use its value as the starting point
      // For subsequent totals, use the running total
      const totalValue = bars.length === 0 ? item.value : running;
      bars.push({
        label: item.label,
        start: 0,
        end: totalValue,
        value: totalValue,
        isTotal: true,
        color: item.color ?? totColor,
      });
      running = totalValue;
    } else {
      const start = running;
      running += item.value;
      bars.push({
        label: item.label,
        start,
        end: running,
        value: item.value,
        isTotal: false,
        color: item.color ?? (item.value >= 0 ? posColor : negativeColor),
      });
    }
  }

  const allValues = bars.flatMap((b) => [b.start, b.end]);
  const minVal = Math.min(0, ...allValues);
  const maxVal = Math.max(...allValues);
  const range = maxVal - minVal || 1;

  const pad = { top: 20, bottom: 30 };
  const chartH = height - pad.top - pad.bottom;
  const barW = Math.min(50, (960 - 80) / data.length - 10);
  const totalW = data.length * (barW + 10) + 20;

  const getY = (v: number) => pad.top + chartH - ((v - minVal) / range) * chartH;

  return (
    <svg viewBox={`0 0 ${totalW} ${height}`} width="100%" height={height}>
      {/* Zero line if needed */}
      {minVal < 0 && (
        <line
          x1={5}
          y1={getY(0)}
          x2={totalW - 5}
          y2={getY(0)}
          stroke={theme.textMuted + "30"}
          strokeDasharray="4 2"
        />
      )}
      {bars.map((bar, i) => {
        const x = 10 + i * (barW + 10);
        const top = getY(Math.max(bar.start, bar.end));
        const bottom = getY(Math.min(bar.start, bar.end));
        const barH = Math.max(bottom - top, 1);

        return (
          <g key={i}>
            {/* Connector line to previous bar */}
            {i > 0 && !bar.isTotal && (
              <line
                x1={x - 10}
                y1={getY(bar.start)}
                x2={x + 2}
                y2={getY(bar.start)}
                stroke={theme.textMuted + "40"}
                strokeWidth={1}
                strokeDasharray="3 2"
              />
            )}
            {/* Bar */}
            <rect x={x} y={top} width={barW} height={barH} fill={bar.color} rx={3} />
            {/* Value label */}
            {showValues && (
              <text
                x={x + barW / 2}
                y={bar.value >= 0 ? top - 5 : bottom + 12}
                textAnchor="middle"
                fontSize={9}
                fill={theme.text}
                fontFamily={theme.fontBody}
                fontWeight={bar.isTotal ? 700 : 400}
              >
                {bar.isTotal ? bar.value : (bar.value >= 0 ? "+" : "") + bar.value}
              </text>
            )}
            {/* X label */}
            <text
              x={x + barW / 2}
              y={height - 6}
              textAnchor="middle"
              fontSize={9}
              fill={theme.textMuted}
              fontFamily={theme.fontBody}
            >
              {bar.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ── ProgressBar ── */

export interface ProgressBarProps {
  value: number;
  label?: string;
  color?: string;
}

export function ProgressBar({ value, label, color }: ProgressBarProps) {
  const theme = useTheme();
  const c = color ?? theme.primary;

  return (
    <div style={{ width: "100%" }}>
      {label && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 4,
            fontSize: 12,
            fontFamily: theme.fontBody,
          }}
        >
          <span style={{ color: theme.text }}>{label}</span>
          <span style={{ color: theme.textMuted }}>{value}%</span>
        </div>
      )}
      <div style={{ width: "100%", height: 6, background: theme.surface, borderRadius: 3, overflow: "hidden" }}>
        <div style={{ width: `${value}%`, height: "100%", background: c, borderRadius: 3 }} />
      </div>
    </div>
  );
}
