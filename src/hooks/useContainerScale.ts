import { useEffect, useState, type RefObject } from "react";

export function useContainerScale(
  ref: RefObject<HTMLElement | null>,
  baseWidth: number,
): number {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const parent = el.parentElement;
    if (!parent) return;

    const update = () => {
      const w = parent.clientWidth;
      setScale(Math.min(w / baseWidth, 1));
    };

    update();

    const ro = new ResizeObserver(update);
    ro.observe(parent);
    return () => ro.disconnect();
  }, [ref, baseWidth]);

  return scale;
}
