import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  initGenplanAnim();
});

function initGenplanAnim() {
  const section = document.querySelector(".genplan-section");
  const infoCard = document.querySelector(".genplan-card-block ");
  if (!section) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top 50%",
      toggleActions: "play none none none",
    },
  });

  const commonOptions = {
    duration: 1,
    ease: "power2.out",
    opacity: 1,
  };

  tl.fromTo(".genplan-sign-image-block", { opacity: 0, x: 100 }, { ...commonOptions, x: 0 }).fromTo(
    ".genplan-title-block ",
    { opacity: 0, x: 50 },
    { ...commonOptions, x: 0 },
    "-=0.1",
  );

  if (infoCard) {
    gsap.to(infoCard, {
      y: -150,
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
