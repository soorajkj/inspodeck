"use client";

import { useEffect, useRef } from "react";
import { type LenisProps, type LenisRef, ReactLenis } from "lenis/react";
import { cancelFrame, frame } from "motion";

export default function LenisProvider({ children, ...props }: LenisProps) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    const update = (data: { timestamp: number }) => {
      const time = data.timestamp;
      lenisRef.current?.lenis?.raf(time);
    };

    frame.update(update, true);

    return () => cancelFrame(update);
  }, []);

  return (
    <ReactLenis root={true} {...props}>
      {children}
    </ReactLenis>
  );
}
