// Core
export { Deck, SLIDE_W, SLIDE_H } from "./components/Deck";
export { Slide } from "./components/Slide";
export { Split, Grid } from "./components/Layout";

// Content
export {
  Title,
  Subtitle,
  Body,
  Badge,
  BulletList,
  Quote,
  CodeBlock,
  StatCard,
} from "./components/Content";

// Charts
export {
  BarChart,
  HorizontalBarChart,
  GroupedBarChart,
  LineChart,
  AreaChart,
  DonutChart,
  ScatterPlot,
  Sparkline,
  ProgressRing,
  ProgressBar,
} from "./charts";

// Templates
export {
  CoverSlide,
  SectionDivider,
  ThankYouSlide,
  AgendaSlide,
  TeamSlide,
} from "./templates";

// Theme
export { themes, GOOGLE_FONTS_URL } from "./themes";
export type { SlideTheme } from "./themes";
export { ThemeContext, useTheme } from "./hooks/useTheme";
export { useContainerScale } from "./hooks/useContainerScale";
export { SlideContext, useSlideContext } from "./hooks/useSlideContext";
export { DeckContext, useAgendaItems } from "./hooks/useDeckContext";

// Types — Components
export type { DeckProps } from "./components/Deck";
export type { SlideProps } from "./components/Slide";
export type { SplitProps, GridProps } from "./components/Layout";
export type {
  TitleProps,
  TitleSize,
  SubtitleProps,
  BodyProps,
  BadgeProps,
  BulletListProps,
  QuoteProps,
  CodeBlockProps,
  StatCardProps,
} from "./components/Content";

// Types — Charts
export type {
  ChartDataPoint,
  LineSeries,
  ScatterSeries,
  GroupedBarGroup,
  BarChartProps,
  HorizontalBarChartProps,
  GroupedBarChartProps,
  LineChartProps,
  AreaChartProps,
  DonutChartProps,
  ScatterPlotProps,
  SparklineProps,
  ProgressRingProps,
  ProgressBarProps,
} from "./charts";

// Types — Templates
export type {
  CoverSlideProps,
  SectionDividerProps,
  ThankYouSlideProps,
  AgendaSlideProps,
  TeamSlideProps,
  TeamMember,
} from "./templates";

// Types — Hooks
export type { SlideMetadata } from "./hooks/useSlideContext";
export type { AgendaItem } from "./hooks/useDeckContext";
