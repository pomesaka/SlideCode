import { useState } from "react";
import {
  Deck,
  Slide,
  Split,
  Grid,
  Title,
  Subtitle,
  Body,
  Badge,
  BulletList,
  Quote,
  CodeBlock,
  StatCard,
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
  CoverSlide,
  SectionDivider,
  ThankYouSlide,
  AgendaSlide,
  TeamSlide,
  themes,
} from "slidecode";

const themeNames = Object.keys(themes);

export function App() {
  const [theme, setTheme] = useState("corporate");
  const currentTheme = themes[theme];

  return (
    <div style={{ padding: "24px 16px", maxWidth: 1000, margin: "0 auto" }}>
      {/* Theme Switcher */}
      <div
        style={{
          display: "flex",
          gap: 8,
          justifyContent: "center",
          marginBottom: 24,
        }}
      >
        {themeNames.map((name) => (
          <button
            key={name}
            onClick={() => setTheme(name)}
            style={{
              padding: "6px 16px",
              border: "none",
              borderRadius: "999px",
              background: name === theme ? currentTheme.primary : "#e5e5e5",
              color: name === theme ? currentTheme.textOnPrimary : "#555",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              textTransform: "capitalize",
            }}
          >
            {name}
          </button>
        ))}
      </div>

      <Deck theme={theme}>
        {/* 1. Cover */}
        <CoverSlide
          title="SlideCode"
          subtitle="AI-friendly presentation components for React"
          author="SlideCode Team"
          date="2026"
          tag="Open Source"
        />

        {/* 2. Agenda */}
        <AgendaSlide
          items={[
            { number: 1, title: "Core Components", description: "Layout, typography, and content blocks" },
            { number: 2, title: "Data Visualization", description: "10 chart types, all SVG-based" },
            { number: 3, title: "Templates", description: "Pre-built slide layouts" },
            { number: 4, title: "Theme System", description: "4 built-in themes + custom support" },
          ]}
        />

        {/* 3. Section: Core */}
        <SectionDivider number={1} title="Core Components" subtitle="Building blocks for your slides" />

        {/* 4. StatCards */}
        <Slide>
          <Badge>Key Metrics</Badge>
          <Title size="lg" >Q4 Performance</Title>
          <div style={{ height: 16 }} />
          <Grid cols={4} gap="16px">
            <StatCard value="$4.2M" label="Revenue" change="+34%" icon="💰" />
            <StatCard value="12,400" label="Active Users" change="+89%" icon="👥" />
            <StatCard value="94%" label="Retention" change="+6%" icon="📈" />
            <StatCard value="2.4s" label="Avg Load Time" change="-18%" icon="⚡" />
          </Grid>
        </Slide>

        {/* 5. Split + BulletList + Quote + CodeBlock */}
        <Slide>
          <Split
            left={
              <>
                <Title size="md">Why SlideCode?</Title>
                <div style={{ height: 12 }} />
                <BulletList
                  items={[
                    "AI-native: designed for LLM generation",
                    "Type-safe: full TypeScript support",
                    "Themeable: 4 built-in themes",
                    "Zero deps: SVG charts, no D3 needed",
                    "Responsive: scale-to-fit rendering",
                  ]}
                />
              </>
            }
            right={
              <>
                <Quote author="Design Philosophy">
                  PowerPoint is dead. Long live React slides.
                </Quote>
                <div style={{ height: 16 }} />
                <CodeBlock lang="tsx">{`<Deck theme="startup">
  <CoverSlide
    title="My Talk"
    subtitle="Built with SlideCode"
  />
  <Slide>
    <Title>Hello!</Title>
  </Slide>
</Deck>`}</CodeBlock>
              </>
            }
          />
        </Slide>

        {/* 6. Section: Charts */}
        <SectionDivider number={2} title="Data Visualization" subtitle="10 chart types, all pure SVG" />

        {/* 7. BarChart */}
        <Slide>
          <Title size="md">Monthly Revenue</Title>
          <Subtitle>FY2025 — All amounts in $K</Subtitle>
          <div style={{ height: 16 }} />
          <BarChart
            height={200}
            data={[
              { label: "Jan", value: 120 },
              { label: "Feb", value: 145 },
              { label: "Mar", value: 162 },
              { label: "Apr", value: 138 },
              { label: "May", value: 195 },
              { label: "Jun", value: 210 },
              { label: "Jul", value: 228 },
              { label: "Aug", value: 215 },
              { label: "Sep", value: 245 },
              { label: "Oct", value: 268 },
              { label: "Nov", value: 290 },
              { label: "Dec", value: 312 },
            ]}
          />
        </Slide>

        {/* 8. HorizontalBar + GroupedBar */}
        <Slide>
          <Split
            left={
              <>
                <Title size="sm">Market Share</Title>
                <div style={{ height: 12 }} />
                <HorizontalBarChart
                  data={[
                    { label: "Product A", value: 340 },
                    { label: "Product B", value: 280 },
                    { label: "Product C", value: 195 },
                    { label: "Product D", value: 150 },
                    { label: "Product E", value: 90 },
                  ]}
                />
              </>
            }
            right={
              <>
                <Title size="sm">Quarterly Comparison</Title>
                <div style={{ height: 12 }} />
                <GroupedBarChart
                  height={160}
                  groups={[
                    { label: "Q1", values: [{ label: "2024", value: 80 }, { label: "2025", value: 120 }] },
                    { label: "Q2", values: [{ label: "2024", value: 95 }, { label: "2025", value: 145 }] },
                    { label: "Q3", values: [{ label: "2024", value: 110 }, { label: "2025", value: 168 }] },
                    { label: "Q4", values: [{ label: "2024", value: 125 }, { label: "2025", value: 195 }] },
                  ]}
                />
              </>
            }
          />
        </Slide>

        {/* 9. LineChart */}
        <Slide>
          <Title size="md">Growth Trends</Title>
          <Subtitle>3 key metrics over 12 months</Subtitle>
          <div style={{ height: 12 }} />
          <LineChart
            width={830}
            height={240}
            xLabels={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]}
            series={[
              { name: "Revenue", data: [120, 145, 162, 138, 195, 210, 228, 215, 245, 268, 290, 312] },
              { name: "Users", data: [80, 95, 105, 110, 130, 148, 160, 175, 192, 210, 230, 255] },
              { name: "Retention", data: [88, 87, 89, 90, 91, 90, 92, 93, 92, 94, 94, 95] },
            ]}
          />
        </Slide>

        {/* 10. AreaChart + ProgressBars */}
        <Slide>
          <Split
            left={
              <>
                <Title size="sm">Stacked Revenue</Title>
                <div style={{ height: 8 }} />
                <AreaChart
                  width={380}
                  height={200}
                  xLabels={["Q1", "Q2", "Q3", "Q4"]}
                  series={[
                    { name: "Product A", data: [120, 145, 168, 195] },
                    { name: "Product B", data: [80, 95, 110, 130] },
                    { name: "Product C", data: [40, 55, 62, 78] },
                  ]}
                />
              </>
            }
            right={
              <>
                <Title size="sm">Department Goals</Title>
                <div style={{ height: 16 }} />
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <ProgressBar value={92} label="Engineering" />
                  <ProgressBar value={78} label="Marketing" />
                  <ProgressBar value={85} label="Sales" />
                  <ProgressBar value={65} label="Support" />
                  <ProgressBar value={95} label="Design" />
                </div>
              </>
            }
          />
        </Slide>

        {/* 11. DonutChart + Sparklines */}
        <Slide>
          <Split
            left={
              <>
                <Title size="sm">Revenue Breakdown</Title>
                <div style={{ height: 16 }} />
                <DonutChart
                  data={[
                    { label: "SaaS", value: 420 },
                    { label: "Enterprise", value: 280 },
                    { label: "Consulting", value: 150 },
                    { label: "Training", value: 90 },
                  ]}
                />
              </>
            }
            right={
              <>
                <Title size="sm">Weekly Trends</Title>
                <div style={{ height: 16 }} />
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {[
                    { label: "Signups", data: [12, 18, 15, 22, 28, 25, 32], value: "32" },
                    { label: "Conversions", data: [5, 8, 6, 9, 12, 10, 14], value: "14" },
                    { label: "Revenue ($K)", data: [45, 52, 48, 58, 65, 62, 72], value: "72" },
                  ].map((item) => (
                    <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 90, fontSize: 12, color: "#888" }}>{item.label}</div>
                      <Sparkline data={item.data} />
                      <div style={{ fontSize: 14, fontWeight: 600 }}>{item.value}</div>
                    </div>
                  ))}
                </div>
              </>
            }
          />
        </Slide>

        {/* 12. ProgressRings */}
        <Slide justify="center" align="center">
          <Title size="md">OKR Progress by Department</Title>
          <div style={{ height: 28 }} />
          <div style={{ display: "flex", gap: 40, justifyContent: "center" }}>
            <ProgressRing value={92} size={80} thickness={6} label="Engineering" />
            <ProgressRing value={78} size={80} thickness={6} label="Marketing" />
            <ProgressRing value={85} size={80} thickness={6} label="Sales" />
            <ProgressRing value={65} size={80} thickness={6} label="Support" />
            <ProgressRing value={95} size={80} thickness={6} label="Design" />
          </div>
        </Slide>

        {/* 13. ScatterPlot */}
        <Slide>
          <Title size="md">Customer Segments</Title>
          <Subtitle>Engagement vs. Revenue per user</Subtitle>
          <div style={{ height: 12 }} />
          <ScatterPlot
            width={830}
            height={240}
            xLabel="Monthly Active Sessions"
            data={[
              {
                name: "Enterprise",
                points: [
                  { x: 45, y: 320 }, { x: 52, y: 380 }, { x: 38, y: 290 },
                  { x: 60, y: 420 }, { x: 55, y: 350 }, { x: 48, y: 310 },
                ],
              },
              {
                name: "SMB",
                points: [
                  { x: 22, y: 85 }, { x: 28, y: 110 }, { x: 18, y: 65 },
                  { x: 35, y: 140 }, { x: 30, y: 120 }, { x: 25, y: 95 },
                ],
              },
              {
                name: "Startup",
                points: [
                  { x: 65, y: 45 }, { x: 72, y: 55 }, { x: 58, y: 35 },
                  { x: 80, y: 68 }, { x: 75, y: 50 }, { x: 68, y: 42 },
                ],
              },
            ]}
          />
        </Slide>

        {/* 14. Section: Templates */}
        <SectionDivider number={3} title="Templates" subtitle="Pre-built slide layouts" />

        {/* 15. Team */}
        <TeamSlide
          members={[
            { name: "Alice Chen", role: "CEO" },
            { name: "Bob Smith", role: "CTO" },
            { name: "Carol Lee", role: "Design Lead" },
            { name: "David Park", role: "Engineering" },
            { name: "Eva Brown", role: "Marketing" },
          ]}
        />

        {/* 16. Thank You */}
        <ThankYouSlide
          subtitle="Try SlideCode for your next presentation"
          contact="github.com/slidecode"
        />
      </Deck>
    </div>
  );
}
