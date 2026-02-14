import { useEffect, useState, type RefObject } from "react";

/**
 * コンテナの幅に合わせてスケール値を計算するフック。
 * ResizeObserver でリアクティブに更新される。
 * @example
 * const ref = useRef<HTMLDivElement>(null);
 * const scale = useContainerScale(ref, SLIDE_W);
 * // scale: 0.0 〜 1.0（parentWidth / baseWidth、最大1）
 */
export function useContainerScale(
  ref: RefObject<HTMLElement | null>,
  baseWidth: number,
): number {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const w = el.clientWidth;
      setScale(Math.min(w / baseWidth, 1));
    };

    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref, baseWidth]);

  return scale;
}
