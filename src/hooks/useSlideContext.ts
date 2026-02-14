import { createContext, useContext } from "react";

/**
 * Slide が SlideContext で配信するメタデータ。
 * @example
 * const meta: SlideMetadata = { title: "概要", description: "プロジェクトの背景" };
 */
export interface SlideMetadata {
  title?: string;
  description?: string;
}

/**
 * Slide コンポーネントがメタデータを子に配信するための Context。
 * 通常は直接使わず、useSlideContext() フック経由でアクセスする。
 */
export const SlideContext = createContext<SlideMetadata>({});

/**
 * 親の Slide が配信する title / description メタデータを取得する。
 * Title コンポーネントは children 省略時にこのフックで title を自動取得する。
 * @example
 * function MyComponent() {
 *   const { title, description } = useSlideContext();
 *   return <div>{title}</div>;
 * }
 */
export function useSlideContext(): SlideMetadata {
  return useContext(SlideContext);
}
