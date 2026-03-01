"use client";

import Lenis from "@studio-freight/lenis";
import { useEffect } from "react";

interface LenisWrapperProps {
  children: React.ReactNode;
}

const LenisWrapper: React.FC<LenisWrapperProps> = ({ children }) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2, // Scroll duration
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function
      orientation: "vertical", // Scrolling direction
      gestureOrientation: "vertical", // Touchpad and touch gesture orientation
      wheelMultiplier: 1, // Adjust scroll speed
      touchMultiplier: 2, // Adjust touch scroll speed
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => lenis.destroy(); // Clean up on unmount
  }, []);

  return <div>{children}</div>;
};

export default LenisWrapper;
