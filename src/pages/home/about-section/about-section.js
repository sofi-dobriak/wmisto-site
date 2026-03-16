import Swiper from "swiper";
import { EffectFade, Controller } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

// ─── Utils ───────────────────────────────────────────────────────────────────

const formatNum = (num) => (num < 10 ? `0${num}` : num);

// ─── DOM ─────────────────────────────────────────────────────────────────────

const getElements = () => ({
  countBlock: document.querySelector(".js-about-main-count"),
  currentEl: document.querySelector(".js-about-main-count .js-about-current"),
  nextEl: document.querySelector(".js-about-main-count .js-about-next"),
  totalEl: document.querySelector(".js-about-total"),
  prevBtn: document.querySelector(".about-button-prev"),
  nextBtn: document.querySelector(".about-button-next"),
});

// ─── Counter ─────────────────────────────────────────────────────────────────

const initCounter = (totalEl, slidesCount) => {
  if (totalEl) {
    totalEl.textContent = `/ ${formatNum(slidesCount)}`;
  }
};

const animateCounter = (currentEl, nextEl, countBlock, realIndex) => {
  const nextNumber = realIndex + 1;

  if (!currentEl || !nextEl || currentEl.textContent == nextNumber) return;

  nextEl.textContent = nextNumber;
  countBlock.classList.add("is-changing");

  setTimeout(() => {
    currentEl.textContent = nextNumber;
    countBlock.classList.remove("is-changing");
  }, 500);
};

// ─── Swipers ─────────────────────────────────────────────────────────────────

const initTextSwiper = () =>
  new Swiper(".about-text-swiper", {
    modules: [EffectFade, Controller],
    allowTouchMove: false,
    speed: 500,
    effect: "fade",
    fadeEffect: { crossFade: true },
    loop: true,
  });

const initBigSwiper = (textSwiper, els) => {
  const { currentEl, nextEl, countBlock } = els;

  const swiper = new Swiper(".slider-big", {
    modules: [Controller],
    allowTouchMove: false,
    speed: 500,
    observer: true,
    observeParents: true,
    watchOverflow: true,
    slidesPerView: 1,
    loop: true,
    on: {
      init() {
        document.querySelector(".js-about-current").textContent = this.realIndex + 1;
      },
      slideChangeTransitionStart() {
        animateCounter(currentEl, nextEl, countBlock, this.realIndex);
      },
    },
  });

  swiper.controller.control = textSwiper;
  textSwiper.controller.control = swiper;

  return swiper;
};

const initSmallSwiper = () =>
  new Swiper(".slider-small", {
    allowTouchMove: false,
    speed: 500,
    observer: true,
    observeParents: true,
    watchOverflow: true,
    slidesPerView: 1,
    loop: true,
  });

// ─── Navigation buttons ───────────────────────────────────────────────────────

const bindNavButtons = (prevBtn, nextBtn, swipers) => {
  prevBtn.addEventListener("click", () => swipers.forEach((s) => s.slidePrev()));
  nextBtn.addEventListener("click", () => swipers.forEach((s) => s.slideNext()));
};

// ─── Init ─────────────────────────────────────────────────────────────────────

function initAboutSwiper() {
  const els = getElements();

  const slidesCount = document.querySelectorAll(".slider-big .swiper-slide").length;
  initCounter(els.totalEl, slidesCount);

  const textSwiper = initTextSwiper();
  const bigSwiper = initBigSwiper(textSwiper, els);
  const smallSwiper = initSmallSwiper();

  bindNavButtons(els.prevBtn, els.nextBtn, [bigSwiper, smallSwiper]);
}

document.addEventListener("DOMContentLoaded", () => initAboutSwiper());
