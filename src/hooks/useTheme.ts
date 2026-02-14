import { createContext, useContext } from "react";
import { type SlideTheme, themes } from "../themes";

export const ThemeContext = createContext<SlideTheme>(themes.corporate);

export function useTheme(): SlideTheme {
  return useContext(ThemeContext);
}
