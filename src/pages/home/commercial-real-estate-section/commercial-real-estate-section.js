import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// document.addEventListener('DOMContentLoaded', () => initCommercialAnim())

function initCommercialAnim() {
  const section = document.querySelector(".commercial-section");
  if (!section) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top 70%",
      toggleActions: "play none none reset",
    },
  });

  tl.fromTo(
    [".commercial-left-title", ".commercial-left-texts-block", ".commercial-right-block"],
    {
      opacity: 0,
      y: 80,
    },
    {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power2.out",
      stagger: 0.4,
    },
  ).fromTo(
    ".commercial-sign-image-block, .commercial-man-image-block",
    { opacity: 0, x: 120 },
    { opacity: 1, x: 0, duration: 1, ease: "power2.out", stagger: 0.2 },
    "-=0.5",
  );
}
