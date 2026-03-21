import Swiper from "swiper";
import { Navigation, Parallax } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  initDiagonalSwiper();
  initDiagonalAnim();
});

function initDiagonalSwiper() {
  const swiper = new Swiper(".w-diagonal-swiper", {
    modules: [Navigation, Parallax],
    speed: 1200,
    slidesPerView: 1,
    loop: false,
    parallax: true,
    navigation: {
      prevEl: ".w-diagonal-button-prev",
      nextEl: ".w-diagonal-button-next",
    },
  });
}

function initDiagonalAnim() {
  const section = document.querySelector(".w-diagonal-section");
  if (!section) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top 60%",
      toggleActions: "play none none none",
    },
  });

  tl.fromTo(
    [".w-diagonal-left-block, .w-diagonal-right-block"],
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
  );
}
