import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => initCommercialAnim());

function initCommercialAnim() {
  const section = document.querySelector(".commercial-section");
  if (!section) return;

  gsap.set(".commercial-man-image-block", { opacity: 0, x: 120 });

  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".commercial-left-block",
        start: "top 70%",
        toggleActions: "play none none none",
      },
    })
    .fromTo(
      [".commercial-left-title", ".commercial-left-texts-block"],
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
        stagger: 0.4,
      },
    );

  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".commercial-right-block",
        start: "top 70%",
        toggleActions: "play none none none",
      },
    })
    .fromTo(
      ".commercial-right-block",
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
      },
    )
    .fromTo(
      ".commercial-man-image-block",
      { opacity: 0, x: 120 },
      { opacity: 1, x: 0, duration: 1, ease: "power2.out" },
      "-=0.5",
    );
}
