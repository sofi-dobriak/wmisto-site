import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  addClickToLocationIframe();
  initLocationAnim();
});

function addClickToLocationIframe() {
  const iframe = document.querySelector(".location-map-block");
  if (!iframe) return;

  iframe.addEventListener("click", () => {
    iframe.classList.add("is-active");
  });

  document.addEventListener("scroll", () => {
    iframe.classList.remove("is-active");
  });
}

function initLocationAnim() {
  const section = document.querySelector(".location-section");
  if (!section) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".location-title-block",
      start: "top 50%",
      toggleActions: "play none none none",
    },
  });

  tl.fromTo(
    ".location-build-block",
    {
      opacity: 0,
      y: 250,
    },
    {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: "power2.out",
    },
  );
}
