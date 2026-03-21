import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", initFormAnim);

function initFormAnim() {
  const sections = document.querySelectorAll(".form-section");
  if (!sections.length) return;

  sections.forEach((section) => {
    const image = section.querySelector(".form-image");
    if (!image) return;

    gsap.to(image, {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });
  });
}
