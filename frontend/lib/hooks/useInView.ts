import { useEffect, useState } from "react";

export function useInView<T extends HTMLElement>(
  ref: React.RefObject<T>,
  options: IntersectionObserverInit = { threshold: 0.1 },
  enabled: boolean = true
) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, options);

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [ref, enabled, options.root, options.rootMargin, options.threshold]);

  return inView;
}