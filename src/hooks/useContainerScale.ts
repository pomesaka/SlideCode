import { useEffect, useState, type RefObject } from "react";

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
