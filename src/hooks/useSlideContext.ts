import { createContext, useContext } from "react";

export interface SlideMetadata {
  title?: string;
  description?: string;
}

export const SlideContext = createContext<SlideMetadata>({});

export function useSlideContext(): SlideMetadata {
  return useContext(SlideContext);
}
