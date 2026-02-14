import { createContext, useContext } from "react";
import { type SlideTheme, themes } from "../themes";

/**
 * Deck がテーマを配信するための Context。
 * 通常は直接使わず、useTheme() フック経由でアクセスする。
 */
export const ThemeContext = createContext<SlideTheme>(themes.corporate);

/**
 * 現在のテーマ（SlideTheme）を取得する。Deck の theme prop で設定されたテーマが返る。
 * @example
 * function MyComponent() {
 *   const theme = useTheme();
 *   return <div style={{ color: theme.primary }}>{theme.name}</div>;
 * }
 */
export function useTheme(): SlideTheme {
  return useContext(ThemeContext);
}
