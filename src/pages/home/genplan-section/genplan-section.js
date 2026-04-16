import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  initGenplanAnim();
  initGenplanMobileCard();
});

function initGenplanMobileCard() {
  const isMobile = () => window.innerWidth < 1024;

  const path = document.querySelector(".genplan-image-path");
  const infoCard = document.querySelector(".genplan-info-card");
  if (!path || !infoCard) return;

  const svgLink = path.closest("a");
  const originalHref = svgLink?.getAttribute("href");

  let isOpen = false;

  const updateLinkBehavior = () => {
    if (isMobile()) {
      svgLink?.setAttribute("href", "javascript:void(0)");
    } else {
      svgLink?.setAttribute("href", originalHref);
      isOpen = false;
      infoCard.classList.remove("is-visible");
    }
  };

  updateLinkBehavior();
  window.addEventListener("resize", updateLinkBehavior);

  path.addEventListener("click", (e) => {
    if (!isMobile()) return;
    e.preventDefault();
    isOpen = !isOpen;
    infoCard.classList.toggle("is-visible", isOpen);
  });

  document.addEventListener("click", (e) => {
    if (!isMobile() || !isOpen) return;
    if (!infoCard.contains(e.target) && !path.contains(e.target)) {
      isOpen = false;
      infoCard.classList.remove("is-visible");
    }
  });
}

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
        start: "top 95%",
        toggleActions: "play none none none",
        markers: false,
      },
    })
    .fromTo(".genplan-tab-card-block", { opacity: 0, x: -100 }, { ...commonOptions, x: 0, stagger: 0.5 })
    .fromTo(
      [".genplan-tab-sign-image-block", ".genplan-tab-title-block"],
      { opacity: 0, x: 100 },
      { ...commonOptions, x: 0, stagger: 0.3 },
      "<",
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
