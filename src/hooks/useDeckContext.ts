import { createContext, useContext } from "react";

/**
 * AgendaSlide の1項目を表す型。Deck が children から自動収集する。
 * @example
 * const item: AgendaItem = { number: 1, title: "売上報告", description: "前年比" };
 */
export interface AgendaItem {
  number: number;
  title: string;
  description?: string;
}

/**
 * Deck が収集した AgendaItem 配列を配信する Context。
 * 通常は直接使わず、useAgendaItems() フック経由でアクセスする。
 */
export const DeckContext = createContext<AgendaItem[]>([]);

/**
 * Deck が children から自動収集した AgendaItem 配列を取得する。
 * AgendaSlide は items prop 省略時にこのフックで自動取得する。
 * @example
 * function CustomAgenda() {
 *   const items = useAgendaItems();
 *   return <ul>{items.map(i => <li key={i.number}>{i.title}</li>)}</ul>;
 * }
 */
export function useAgendaItems(): AgendaItem[] {
  return useContext(DeckContext);
}
