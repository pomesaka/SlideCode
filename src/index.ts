// Core
export { Deck, SLIDE_W, SLIDE_H } from "./components/Deck";
export { Slide } from "./components/Slide";
export { Split, Grid } from "./components/Layout";

// Content
export {
  Spacer,
  Title,
  Subtitle,
  Body,
  Badge,
  BulletList,
  Quote,
  CodeBlock,
  StatCard,
} from "./components/Content";

// New Components
export { Card } from "./components/Card";
export { Image } from "./components/Image";
export { Timeline } from "./components/Timeline";
export { Table } from "./components/Table";
export { LinkTag } from "./components/LinkTag";
export { Checklist } from "./components/Checklist";

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
export type { SlideProps, SlideDecoration } from "./components/Slide";
export type { SplitProps, GridProps } from "./components/Layout";
export type {
  SpacerProps,
  SpacerSize,
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
export type { CardProps } from "./components/Card";
export type { ImageProps } from "./components/Image";
export type { TimelineProps, TimelineItemData } from "./components/Timeline";
export type { TableProps } from "./components/Table";
export type { LinkTagProps } from "./components/LinkTag";
export type { ChecklistProps } from "./components/Checklist";

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
