import "./about-section.scss";

import Swiper from "swiper";
import { EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

const swiper1 = new Swiper(".about-text-swiper", {
  modules: [EffectFade],
  allowTouchMove: false,
  speed: 600,
  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },
  loop: true,
});

const slidesCount = document.querySelectorAll(".slider-big .swiper-slide").length;
document.querySelector(".total").textContent = `/ 0${slidesCount}`;

const swiper2 = new Swiper(".slider-big", {
  allowTouchMove: false,
  speed: 1000,
  observer: true,
  observeParents: true,
  watchOverflow: true,
  slidesPerView: 1,
  loop: true,
  on: {
    init() {
      document.querySelector(".current").textContent = this.realIndex + 1;
    },
    slideChangeTransitionStart() {
      const countBlock = document.querySelector(".main-count");
      const currentEl = countBlock.querySelector(".current");
      const nextEl = countBlock.querySelector(".next");

      const nextNumber = this.realIndex + 1;

      if (currentEl.textContent == nextNumber) return;

      nextEl.textContent = nextNumber;

      countBlock.classList.add("is-changing");

      setTimeout(() => {
        currentEl.textContent = nextNumber;
        countBlock.classList.remove("is-changing");
      }, 800);
    },
  },
});

const swiper3 = new Swiper(".slider-small", {
  allowTouchMove: false,
  speed: 1000,
  observer: true,
  observeParents: true,
  watchOverflow: true,
  slidesPerView: 1,
  loop: true,
});

document.querySelector(".button-prev").addEventListener("click", () => {
  swiper1.slidePrev();
  swiper2.slidePrev();
  swiper3.slidePrev();
});

document.querySelector(".button-next").addEventListener("click", () => {
  swiper1.slideNext();
  swiper2.slideNext();
  swiper3.slideNext();
});
