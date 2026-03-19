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

  const commonOptions = {
    duration: 1,
    ease: "power2.out",
    opacity: 1,
  };

  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".genplan-section",
        start: "top 50%",
        toggleActions: "play none none none",
      },
    })
    .fromTo(
      [".genplan-sign-image-block", ".genplan-title-block"],
      { opacity: 0, x: 100 },
      { ...commonOptions, x: 0, stagger: 0.5 },
    );

  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".tab-genplan-cards-sign-block",
        start: "top 90%",
        toggleActions: "play none none none",
      },
    })
    .fromTo(".genplan-tab-card-block", { opacity: 0, x: -100 }, { ...commonOptions, x: 0, stagger: 0.5 })
    .fromTo(
      [".genplan-tab-sign-image-block", ".genplan-tab-title-block"],
      { opacity: 0, x: 100 },
      { ...commonOptions, x: 0, stagger: 0.3 },
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
