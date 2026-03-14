import "./advantages-section.scss";
import "../../../shared/components/swiper-nav/swiper-nav.scss";
import Swiper from "swiper";
import { EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

const getSizes = () => {
  const ww = window.innerWidth;
  const vw = (px) => (px / 1920) * ww;

  return {
    activeW: vw(760),
    inactiveW: vw(380),
    gap: vw(20),
  };
};

const adv_swiper_text = new Swiper(".advantages-text-block", {
  modules: [EffectFade],
  allowTouchMove: false,
  speed: 800,
  effect: "fade",
});

const format = (n) => (n < 10 ? `0${n}` : n);
const adv_section = document.querySelector(".advantages-section");

const totalVal = adv_section.querySelectorAll(".advantages-swiper .swiper-slide").length;
adv_section.querySelector(".adv-js-total").textContent = `/ ${format(totalVal)}`;

const adv_swiper_images = new Swiper(".advantages-swiper", {
  slidesPerView: "auto",
  spaceBetween: window.innerWidth <= 767 ? 10 : window.innerWidth <= 1023 ? 16 : 20,
  speed: 800,
  watchSlidesProgress: true,
  initialSlide: 0,
  centeredSlides: true,
  allowTouchMove: false,
  watchOverflow: false,
  centerInsufficientSlides: false,
  on: {
    setTransition: function (swiper, duration) {
      swiper.wrapperEl.style.transitionDuration = `${duration}ms`;
    },
    setTranslate: function (swiper, translate) {
      if (swiper.animating) return;

      const { activeW, inactiveW, gap } = getSizes();
      const activeIndex = swiper.activeIndex;

      const widthOfPrevSlides = activeIndex * inactiveW;
      const gapsOfPrevSlides = activeIndex * gap;

      const centerOffset = (swiper.width - activeW) / 2;
      const newTranslate = -widthOfPrevSlides - gapsOfPrevSlides + centerOffset;

      if (!isNaN(newTranslate)) {
        swiper.translate = newTranslate;
        swiper.wrapperEl.style.transform = `translate3d(${newTranslate}px, 0, 0)`;
        swiper.snapIndex = activeIndex;
      }

      swiper.wrapperEl.style.transform = `translate3d(${newTranslate}px, 0, 0)`;
    },
    slideChangeTransitionStart: function (swiper) {
      const currentEl = adv_section.querySelector(".adv-js-current");
      const nextEl = adv_section.querySelector(".adv-js-next");
      const nextNumber = format(swiper.realIndex + 1);

      if (currentEl.textContent !== nextNumber) {
        nextEl.textContent = nextNumber;
        adv_section.querySelector(".adv-js-count").classList.add("is-changing");

        setTimeout(() => {
          currentEl.textContent = nextNumber;
          adv_section.querySelector(".adv-js-count").classList.remove("is-changing");
        }, 800);
      }

      swiper.emit("setTranslate", swiper, swiper.translate);
    },
    resize: function (swiper) {
      swiper.update();
      swiper.emit("setTranslate", swiper, swiper.translate);
    },
  },
});

adv_section.querySelector(".adv-js-current").textContent = format(adv_swiper_images.realIndex + 1);

document.querySelector(".advantages-button-prev").addEventListener("click", (e) => {
  e.stopPropagation();
  if (adv_swiper_images.activeIndex > 0) {
    adv_swiper_images.slideTo(adv_swiper_images.activeIndex - 1, 800);
  }
  if (adv_swiper_text.activeIndex > 0) {
    adv_swiper_text.slideTo(adv_swiper_text.activeIndex - 1, 800);
  }
});

document.querySelector(".advantages-button-next").addEventListener("click", (e) => {
  e.stopPropagation();
  if (adv_swiper_images.activeIndex < adv_swiper_images.slides.length - 1) {
    adv_swiper_images.slideTo(adv_swiper_images.activeIndex + 1, 800);
  }
  if (adv_swiper_text.activeIndex < adv_swiper_text.slides.length - 1) {
    adv_swiper_text.slideTo(adv_swiper_text.activeIndex + 1, 800);
  }
});
