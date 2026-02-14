export interface SlideTheme {
  name: string;
  bg: string;
  surface: string;
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  textMuted: string;
  textOnPrimary: string;
  fontDisplay: string;
  fontBody: string;
  radius: string;
  chartColors: string[];
}

const corporate: SlideTheme = {
  name: "corporate",
  bg: "#FFFFFF",
  surface: "#F4F5F7",
  primary: "#1B2A4A",
  secondary: "#3D6098",
  accent: "#E8913A",
  text: "#1B2A4A",
  textMuted: "#6B7280",
  textOnPrimary: "#FFFFFF",
  fontDisplay: "'DM Serif Display', serif",
  fontBody: "'DM Sans', sans-serif",
  radius: "8px",
  chartColors: ["#1B2A4A", "#3D6098", "#E8913A", "#22C55E", "#8B5CF6", "#EC4899"],
};

const startup: SlideTheme = {
  name: "startup",
  bg: "#0A0A0A",
  surface: "#161618",
  primary: "#C8FF00",
  secondary: "#8B5CF6",
  accent: "#FF6B6B",
  text: "#F0F0F0",
  textMuted: "#888888",
  textOnPrimary: "#0A0A0A",
  fontDisplay: "'Syne', sans-serif",
  fontBody: "'Syne', sans-serif",
  radius: "12px",
  chartColors: ["#C8FF00", "#8B5CF6", "#FF6B6B", "#06B6D4", "#F59E0B", "#EC4899"],
};

const minimal: SlideTheme = {
  name: "minimal",
  bg: "#FAF9F7",
  surface: "#EFEDEA",
  primary: "#1A1A1A",
  secondary: "#6B6B6B",
  accent: "#D4432F",
  text: "#1A1A1A",
  textMuted: "#999999",
  textOnPrimary: "#FAF9F7",
  fontDisplay: "'Playfair Display', serif",
  fontBody: "'Source Sans 3', sans-serif",
  radius: "2px",
  chartColors: ["#1A1A1A", "#6B6B6B", "#D4432F", "#2563EB", "#059669", "#D97706"],
};

const nature: SlideTheme = {
  name: "nature",
  bg: "#F0EBE3",
  surface: "#E6DFD3",
  primary: "#2D4A3E",
  secondary: "#5B8A72",
  accent: "#C77B4A",
  text: "#2D4A3E",
  textMuted: "#7A8B7E",
  textOnPrimary: "#F0EBE3",
  fontDisplay: "'Fraunces', serif",
  fontBody: "'Outfit', sans-serif",
  radius: "16px",
  chartColors: ["#2D4A3E", "#5B8A72", "#C77B4A", "#8B6F4E", "#7C9885", "#B8956A"],
};

export const themes: Record<string, SlideTheme> = {
  corporate,
  startup,
  minimal,
  nature,
};

export const GOOGLE_FONTS_URL =
  "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&family=Syne:wght@400;500;600;700;800&family=Playfair+Display:wght@400;600;700&family=Source+Sans+3:wght@400;500;600&family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Outfit:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap";
