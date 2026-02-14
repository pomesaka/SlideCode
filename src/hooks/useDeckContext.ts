import { createContext, useContext } from "react";

export interface AgendaItem {
  number: number;
  title: string;
  description?: string;
}

export const DeckContext = createContext<AgendaItem[]>([]);

export function useAgendaItems(): AgendaItem[] {
  return useContext(DeckContext);
}
