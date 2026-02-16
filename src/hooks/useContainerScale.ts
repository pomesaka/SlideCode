import { useEffect, useState, type RefObject } from "react";

/**
 * コンテナの幅に合わせてスケール値を計算するフック。
 * ResizeObserver でリアクティブに更新される。
 * コンテナが baseWidth より大きい場合は 1 以上にスケールアップする。
 * @example
 * const ref = useRef<HTMLDivElement>(null);
 * const scale = useContainerScale(ref, SLIDE_W);
 * // scale: parentWidth / baseWidth（制限なし）
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
      setScale(w / baseWidth);
    };

    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref, baseWidth]);

  return scale;
}
