"use client";

import { ReactNode, useEffect } from "react";

interface IntersectionAnimationWrapperProps {
  children: ReactNode;
}

export default function IntersectionAnimationWrapper({
  children,
}: IntersectionAnimationWrapperProps) {
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.4,
    };

    // IMAGE ANIMATION
    const revealCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const container = entry.target as HTMLElement;

        if (entry.isIntersecting) {
          container.classList.add("animating");
        } else if (entry.boundingClientRect.top > 0) {
          container.classList.remove("animating");
        }
      });
    };

    const revealObserver = new IntersectionObserver(revealCallback, options);

    document.querySelectorAll<HTMLElement>(".reveal").forEach((reveal) => {
      revealObserver.observe(reveal);
    });

    // TEXT ANIMATION
    // const fadeupCallback = (entries: IntersectionObserverEntry[]) => {
    //   entries.forEach((entry) => {
    //     const container = entry.target as HTMLElement;
    //     container.classList.add("not-fading-up");

    //     if (entry.isIntersecting) {
    //       container.classList.add("fading-up");
    //     } else if (entry.boundingClientRect.top > 0) {
    //       container.classList.remove("fading-up");
    //     }
    //   });
    // };

    // const fadeupObserver = new IntersectionObserver(fadeupCallback, options);

    // document.querySelectorAll<HTMLElement>(".fadeup").forEach((fadeup) => {
    //   fadeupObserver.observe(fadeup);
    // });

    return () => {
      revealObserver.disconnect();
      // fadeupObserver.disconnect();
    };
  }, []);

  return <>{children}</>;
}
