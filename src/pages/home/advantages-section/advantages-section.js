import "./advantages-section.scss";
import Swiper from "swiper";
import { Navigation, EffectFade, Controller } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

// ─── Utils ───────────────────────────────────────────────────────────────────

const formatNum = (num) => (num < 10 ? `0${num}` : num);

const getSizes = () => {
  const ww = window.innerWidth;
  return {
    activeW: (760 / 1920) * ww,
    inactiveW: (380 / 1920) * ww,
    gap: 20,
  };
};

// ─── DOM ─────────────────────────────────────────────────────────────────────

const getElements = () => ({
  swiperElement: document.querySelector(".advantages-swiper"),
  totalEl: document.querySelector(".adv-js-total"),
  currentEl: document.querySelector(".adv-js-current"),
  nextEl: document.querySelector(".adv-js-next"),
  countBlock: document.querySelector(".adv-js-count"),
  prevBtn: document.querySelector(".advantages-button-prev"),
  nextBtn: document.querySelector(".advantages-button-next"),
});

// ─── Counter ─────────────────────────────────────────────────────────────────

const initCounter = (totalEl, totalSlides) => {
  if (totalEl) {
    totalEl.textContent = `/ ${formatNum(totalSlides)}`;
  }
};

const animateCounter = (currentEl, nextEl, countBlock, realIndex) => {
  const nextNumber = formatNum(realIndex + 1);

  if (!currentEl || !nextEl || currentEl.textContent === nextNumber) return;

  nextEl.textContent = nextNumber;
  countBlock.classList.add("is-changing");

  setTimeout(() => {
    currentEl.textContent = nextNumber;
    countBlock.classList.remove("is-changing");
  }, 800);
};

// ─── Translate ───────────────────────────────────────────────────────────────

const applyCustomTranslate = (swiper) => {
  const { activeW, inactiveW, gap } = getSizes();
  const activeIndex = swiper.activeIndex;

  const widthOfPrevSlides = activeIndex * inactiveW;
  const gapsOfPrevSlides = activeIndex * gap;
  const centerOffset = (swiper.width - activeW) / 2;

  let newTranslate = -widthOfPrevSlides - gapsOfPrevSlides + centerOffset;

  const maxTranslate = swiper.maxTranslate();
  if (newTranslate < maxTranslate) newTranslate = maxTranslate;

  if (!isNaN(newTranslate)) {
    swiper.translate = newTranslate;
    swiper.wrapperEl.style.transform = `translate3d(${newTranslate}px, 0, 0)`;
  }
};

// ─── Swipers ──────────────────────────────────────────────────────────────────

const initTextSwiper = () =>
  new Swiper(".advantages-text-block", {
    modules: [EffectFade, Controller],
    allowTouchMove: false,
    speed: 800,
    initialSlide: 2,
    effect: "fade",
    fadeEffect: { crossFade: true },
  });

const initMainSwiper = (swiper_text, els) => {
  const { currentEl, nextEl, countBlock } = els;

  return new Swiper(".advantages-swiper", {
    modules: [Navigation, Controller],
    slidesPerView: "auto",
    spaceBetween: window.innerWidth <= 767 ? 10 : window.innerWidth <= 1023 ? 16 : 20,
    speed: 800,
    watchSlidesProgress: true,
    initialSlide: 2,
    centeredSlides: false,
    allowTouchMove: false,
    slideToClickedSlide: false,
    resistanceRatio: 0,
    edgeSwipeDetection: true,
    on: {
      init(swiper) {
        document.querySelector(".adv-js-current").textContent = formatNum(this.realIndex + 1);
        applyCustomTranslate(swiper);
      },
      slideChange() {
        swiper_text.slideTo(this.activeIndex);
      },
      setTransition(swiper, duration) {
        swiper.wrapperEl.style.transitionDuration = `${duration}ms`;
      },
      setTranslate(swiper) {
        applyCustomTranslate(swiper);
      },
      slideChangeTransitionStart(swiper) {
        swiper.emit("setTranslate", swiper, swiper.translate);
        animateCounter(currentEl, nextEl, countBlock, swiper.realIndex);
      },
      resize(swiper) {
        swiper.update();
        swiper.emit("setTranslate", swiper, swiper.translate);
      },
    },
  });
};

// ─── Navigation buttons ───────────────────────────────────────────────────────

const bindNavButtons = (swiper, prevBtn, nextBtn) => {
  prevBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (swiper.activeIndex > 0) {
      swiper.slideTo(swiper.activeIndex - 1, 800);
    }
  });

  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (swiper.activeIndex < swiper.slides.length - 1) {
      swiper.slideTo(swiper.activeIndex + 1, 800);
    }
  });
};

// ─── Init ─────────────────────────────────────────────────────────────────────

function initAdvantagesSwiper() {
  const els = getElements();

  if (!els.swiperElement) {
    console.error("Swiper element not found");
    return;
  }

  const totalSlides = els.swiperElement.querySelectorAll(".swiper-slide").length;
  initCounter(els.totalEl, totalSlides);

  const swiper_text = initTextSwiper();
  const swiper = initMainSwiper(swiper_text, els);

  bindNavButtons(swiper, els.prevBtn, els.nextBtn);
}

document.addEventListener("DOMContentLoaded", () => initAdvantagesSwiper());
