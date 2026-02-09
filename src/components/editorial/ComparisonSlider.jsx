"use client";

import { useRef, useState, useEffect } from "react";
import styles from "./EditorialPairs.module.css";

export default function ComparisonSlider({ left, right, alt = "comparison" }) {
  const containerRef = useRef(null);
  const draggingRef = useRef(false);
  const [pos, setPos] = useState(50);

  useEffect(() => {
    function onMove(e) {
      if (!draggingRef.current) return;
      updatePos(e);
    }
    function onUp() {
      draggingRef.current = false;
    }
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
    };
  }, []);

  function getClientX(e) {
    if (e.touches && e.touches[0]) return e.touches[0].clientX;
    return e.clientX;
  }

  function updatePos(e) {
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = getClientX(e);
    let pct = ((clientX - rect.left) / rect.width) * 100;
    if (pct < 0) pct = 0;
    if (pct > 100) pct = 100;
    setPos(pct);
  }

  function onDown(e) {
    e.preventDefault();
    draggingRef.current = true;
    updatePos(e);
  }

  return (
    <div
      className={styles.comparison}
      ref={containerRef}
      onMouseDown={onDown}
      onTouchStart={onDown}
      role="slider"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pos)}
    >
      <img src={left} alt={`${alt} left`} className={styles.baseImg} />

      <div className={styles.reveal} style={{ width: `${pos}%` }}>
        <img src={right} alt={`${alt} right`} className={styles.revealImg} />
      </div>

      <div className={styles.divider} style={{ left: `${pos}%` }}>
        <div className={styles.handle} onMouseDown={(e) => e.stopPropagation()}>
          <span className={styles.arrow} aria-hidden>
            ‹
          </span>
          <span className={styles.arrow} aria-hidden>
            ›
          </span>
        </div>
      </div>
    </div>
  );
}
