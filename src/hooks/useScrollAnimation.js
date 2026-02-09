import { useInView } from "framer-motion";
import { useRef } from "react";

export default function useScrollAnimation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return {
    ref,
    animate: isInView
      ? { opacity: 1, y: 0 }
      : { opacity: 0, y: 30 },
  };
}