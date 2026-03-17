import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  initDeveloperAnim();
});

function initDeveloperAnim() {
  const section = document.querySelector(".developer-section");
  const card = document.querySelector(".developer-card-block");
  if (!section) return;

  if (card) {
    gsap.to(card, {
      y: -250,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });
  }
}
