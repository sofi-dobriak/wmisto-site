import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

document.addEventListener("DOMContentLoaded", initGalleryAnim);

function initGalleryAnim() {
  const section = document.querySelector(".gallery-section");
  if (!section) return;

  const titleSplit = SplitText.create(".gallery-title", {
    type: "lines",
    mask: "lines",
  });

  gsap
    .timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
        toggleActions: "play none none none",
      },
    })
    .fromTo(titleSplit.lines, { y: "100%" }, { y: "0%", duration: 0.8, ease: "power2.out" })
    .fromTo(
      ".gallery-swiper",
      { opacity: 0, y: 150 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.4",
    );
}

const swiper = new Swiper(".gallery-swiper", {
  modules: [Navigation],
  speed: 800,
  slidesPerView: 3,
  spaceBetween: 20,
  navigation: {
    prevEl: ".gallery-button-prev",
    nextEl: ".gallery-button-next",
  },
  loop: true,
  breakpoints: {
    0: {
      slidesPerView: 1.3,
      spaceBetween: 10,
      centeredSlides: true,
    },
    768: {
      slidesPerView: 1.3,
      spaceBetween: 20,
      centeredSlides: true,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 20,
      centeredSlides: false,
    },
  },
});
