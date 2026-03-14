import "./advantages-section.scss";
import Swiper from "swiper";
import { Navigation, EffectFade, Controller } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

function initAdvantagesSwiper() {
  const swiperElement = document.querySelector(".advantages-swiper");

  if (!swiperElement) {
    console.error("Swiper element not found");
    return;
  }

  // КОНСТАНТИ РОЗМІРІВ (точно як в CSS)
  // Важливо: ці значення мають збігатись з CSS
  const getSizes = () => {
    const ww = window.innerWidth;

    return {
      activeW: (760 / 1920) * ww,
      inactiveW: (380 / 1920) * ww,
      gap: 20,
    };
  };

  const totalEl = document.querySelector(".adv-js-total");
  const currentEl = document.querySelector(".adv-js-current");
  const nextEl = document.querySelector(".adv-js-next");
  const countBlock = document.querySelector(".adv-js-count");

  const slides = swiperElement.querySelectorAll(".swiper-slide");
  const totalSlides = slides.length;

  const formatNum = (num) => (num < 10 ? `0${num}` : num);

  if (totalEl) {
    totalEl.textContent = `/ ${formatNum(totalSlides)}`;
  }

  const swiper_text = new Swiper(".advantages-text-block", {
    modules: [EffectFade, Controller],
    allowTouchMove: false,
    speed: 800,
    initialSlide: 2,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
  });

  const swiper = new Swiper(".advantages-swiper", {
    modules: [Navigation, Controller],
    slidesPerView: "auto",
    spaceBetween: window.innerWidth <= 767 ? 10 : window.innerWidth <= 1023 ? 16 : 20,
    speed: 800,
    watchSlidesProgress: true,
    initialSlide: 2,
    centeredSlides: true,
    allowTouchMove: false,
    slideToClickedSlide: false,
    on: {
      init() {
        document.querySelector(".current").textContent = this.realIndex + 1;
      },
      slideChange: function () {
        swiper_text.slideTo(this.activeIndex);
      },
      setTransition: function (swiper, duration) {
        swiper.wrapperEl.style.transitionTimingFunction = "cubic-bezier(0.36, 1, 0.86, 1)";
        swiper.wrapperEl.style.transitionDuration = `${duration}ms`;
      },
      setTranslate: function (swiper, translate) {
        // if (swiper.animating) return;

        const { activeW, inactiveW, gap } = getSizes();
        const activeIndex = swiper.activeIndex;

        const widthOfPrevSlides = activeIndex * inactiveW;
        const gapsOfPrevSlides = activeIndex * gap;

        const centerOffset = (swiper.width - activeW) / 2;
        const newTranslate = -widthOfPrevSlides - gapsOfPrevSlides + centerOffset;

        if (!isNaN(newTranslate)) {
          swiper.translate = newTranslate;
          swiper.wrapperEl.style.transform = `translate3d(${newTranslate}px, 0, 0)`;
        }

        // swiper.wrapperEl.style.transform = `translate3d(${newTranslate}px, 0, 0)`;
      },

      slideChangeTransitionStart: function (swiper) {
        swiper.emit("setTranslate", swiper, swiper.translate);

        const nextNumber = formatNum(swiper.realIndex + 1);

        if (!currentEl || !nextEl || currentEl.textContent === nextNumber) return;

        nextEl.textContent = nextNumber;
        countBlock.classList.add("is-changing");

        setTimeout(() => {
          currentEl.textContent = nextNumber;
          countBlock.classList.remove("is-changing");
        }, 800);
      },

      resize: function (swiper) {
        swiper.update();
        swiper.emit("setTranslate", swiper, swiper.translate);
      },
    },
  });

  document.querySelector(".advantages-button-prev").addEventListener("click", (e) => {
    e.stopPropagation();
    if (swiper.activeIndex > 0) {
      swiper.slideTo(swiper.activeIndex - 1, 800);
    }
  });

  document.querySelector(".advantages-button-next").addEventListener("click", (e) => {
    e.stopPropagation();
    if (swiper.activeIndex < swiper.slides.length - 1) {
      swiper.slideTo(swiper.activeIndex + 1, 800);
    }
  });

  setTimeout(() => {
    swiper.update();
    // Примусово викликаємо твій кастомний транслейт, щоб він став рівно
    swiper.emit("setTranslate", swiper, swiper.translate);
  }, 100);
}

document.addEventListener("DOMContentLoaded", () => initAdvantagesSwiper());
