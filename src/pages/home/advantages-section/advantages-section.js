import Swiper from "swiper";
import { Navigation, EffectFade, Controller } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

// ─── Utils ───────────────────────────────────────────────────────────────────

const formatNum = (num) => (num < 10 ? `0${num}` : num);
const isMobileViewport = () => window.innerWidth <= 767;

const getSizes = () => {
  const ww = window.innerWidth;

  if (ww <= 767) {
    return {
      activeW: 375,
      inactiveW: 375,
      gap: 10,
    };
  } else if (ww <= 1023) {
    return {
      activeW: (534 / 1023) * ww,
      inactiveW: (444 / 1023) * ww,
      gap: 16,
    };
  } else {
    return {
      activeW: (760 / 1920) * ww,
      inactiveW: (380 / 1920) * ww,
      gap: 20,
    };
  }
};

// ─── DOM ─────────────────────────────────────────────────────────────────────

const getElements = () => ({
  swiperElement: document.querySelector(".advantages-swiper"),
  counters: [
    {
      totalEl: document.querySelector(".adv-js-total"),
      currentEl: document.querySelector(".adv-js-current"),
      nextEl: document.querySelector(".adv-js-next"),
      countBlock: document.querySelector(".adv-js-count"),
    },
    {
      totalEl: document.querySelector(".adv-tab-js-total"),
      currentEl: document.querySelector(".adv-tab-js-current"),
      nextEl: document.querySelector(".adv-tab-js-next"),
      countBlock: document.querySelector(".adv-tab-js-count"),
    },
  ],
});

// ─── Counter ─────────────────────────────────────────────────────────────────

const initCounter = (counters, totalSlides) => {
  counters.forEach(({ totalEl }) => {
    if (totalEl) {
      totalEl.textContent = `/ ${formatNum(totalSlides)}`;
    }
  });
};

const setCurrentCounter = (counters, realIndex) => {
  const width = window.innerWidth;
  const currentNumber = width <= 1023 ? String(realIndex + 1) : formatNum(realIndex + 1);

  counters.forEach(({ currentEl, nextEl }) => {
    if (currentEl) currentEl.textContent = currentNumber;
    if (nextEl) nextEl.textContent = "";
  });
};

const animateCounter = (currentEl, nextEl, countBlock, realIndex) => {
  const width = window.innerWidth;
  const nextNumber = width <= 1023 ? String(realIndex + 1) : formatNum(realIndex + 1);

  if (!currentEl || !nextEl || !countBlock || currentEl.textContent === nextNumber) return;

  nextEl.textContent = nextNumber;
  countBlock.classList.add("is-changing");

  setTimeout(() => {
    currentEl.textContent = nextNumber;
    countBlock.classList.remove("is-changing");
  }, 800);
};

const animateCounters = (counters, realIndex) => {
  counters.forEach(({ currentEl, nextEl, countBlock }) => {
    animateCounter(currentEl, nextEl, countBlock, realIndex);
  });
};

// ─── Translate ───────────────────────────────────────────────────────────────

const applyCustomTranslate = (swiper) => {
  if (window.innerWidth <= 767) return;

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
};

// ─── Swipers ──────────────────────────────────────────────────────────────────

const initTextSwiper = () =>
  new Swiper(".advantages-text-block", {
    modules: [EffectFade, Controller],
    slidesPerView: 1,
    allowTouchMove: false,
    speed: 800,
    initialSlide: 2,
    effect: "fade",
    fadeEffect: { crossFade: true },
  });

const initMainSwiper = (swiper_text, elements) => {
  const { counters } = elements;

  return new Swiper(".advantages-swiper", {
    modules: [Navigation, Controller],
    slidesPerView: 1,
    spaceBetween: 10,
    speed: 800,
    watchSlidesProgress: true,
    initialSlide: 2,
    centeredSlides: true,
    breakpoints: {
      768: {
        slidesPerView: "auto",
        spaceBetween: 16,
      },
      1024: {
        slidesPerView: "auto",
        spaceBetween: 20,
      },
    },
    on: {
      init(swiper) {
        setCurrentCounter(counters, this.realIndex);
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
        animateCounters(counters, swiper.realIndex);
      },
      resize(swiper) {
        setCurrentCounter(counters, swiper.realIndex);
        swiper.update();
        swiper.emit("setTranslate", swiper, swiper.translate);
      },
    },
  });
};

// ─── Navigation buttons ───────────────────────────────────────────────────────

// const bindNavButtons = (swiper) => {
//   const prevSelector = isMobileViewport()
//     ? ".advantages-button-prev--mobile"
//     : ".advantages-button-prev--desktop";
//   const nextSelector = isMobileViewport()
//     ? ".advantages-button-next--mobile"
//     : ".advantages-button-next--desktop";

//   const prevBtns = document.querySelectorAll(prevSelector);
//   const nextBtns = document.querySelectorAll(nextSelector);

//   prevBtns.forEach((btn) => {
//     btn.addEventListener("click", (e) => {
//       e.preventDefault();
//       console.log("click");
//       if (swiper.activeIndex > 0) {
//         swiper.slideTo(swiper.activeIndex - 1, 800);
//       }
//     });
//   });

//   nextBtns.forEach((btn) => {
//     btn.addEventListener("click", (e) => {
//       e.preventDefault();
//       console.log("click");
//       if (swiper.activeIndex < swiper.slides.length - 1) {
//         swiper.slideTo(swiper.activeIndex + 1, 800);
//       }
//     });
//   });
// };

const bindNavButtons = (swiper) => {
  const prevBtns = document.querySelectorAll(".advantages-button-prev");
  const nextBtns = document.querySelectorAll(".advantages-button-next");

  prevBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      if (swiper.activeIndex > 0) {
        swiper.slideTo(swiper.activeIndex - 1, 800);
      }
    });
  });

  nextBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      if (swiper.activeIndex < swiper.slides.length - 1) {
        swiper.slideTo(swiper.activeIndex + 1, 800);
      }
    });
  });
};

// ─── Init ─────────────────────────────────────────────────────────────────────

function initAdvantagesSwiper() {
  const elements = getElements();

  if (!elements.swiperElement) {
    console.error("Swiper element not found");
    return;
  }

  const totalSlides = elements.swiperElement.querySelectorAll(".swiper-slide").length;
  initCounter(elements.counters, totalSlides);

  const swiper_text = initTextSwiper();
  const swiper = initMainSwiper(swiper_text, elements);

  bindNavButtons(swiper);
}

document.addEventListener("DOMContentLoaded", () => initAdvantagesSwiper());
