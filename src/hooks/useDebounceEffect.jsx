import { useEffect, useRef } from "react";

export default function useDebounceEffect(effect, delay, deps) {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) {
      const handler = setTimeout(() => effect(), delay);
      return () => clearTimeout(handler);
    }
    didMount.current = true;
    return undefined;
  }, [...(deps || []), delay]);
}
