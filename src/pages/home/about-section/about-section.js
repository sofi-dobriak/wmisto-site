import Swiper from "swiper";
import { EffectFade, Controller } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

document.addEventListener("DOMContentLoaded", initAboutAnim);

function initAboutAnim() {
  const section = document.querySelector(".about-section");
  if (!section) return;

  const titleSplit = SplitText.create(".about-title", {
    type: "lines",
    mask: "lines",
  });

  gsap
    .timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 90%",
        once: true,
      },
    })
    .fromTo(titleSplit.lines, { y: "100%" }, { y: "0%", duration: 0.8, stagger: 0.1, ease: "power2.out" })
    .fromTo(
      ".about-text",
      { y: "100%" },
      { y: "0%", duration: 0.6, stagger: 0.05, ease: "power2.out" },
      "-=0.4",
    )
    .fromTo(
      ".slider-block",
      { opacity: 0, y: window.innerWidth <= 767 ? 60 : 0, x: window.innerWidth > 767 ? 60 : 0 },
      { opacity: 1, y: 0, x: 0, duration: 1, ease: "power2.out" },
      "<",
    );
}

// ─── Utils ───────────────────────────────────────────────────────────────────

const formatNum = (num) => (num < 10 ? `0${num}` : num);

// ─── DOM ─────────────────────────────────────────────────────────────────────

const getElements = () => ({
  countBlock: document.querySelector(".js-about-main-count"),
  currentEl: document.querySelector(".js-about-main-count .js-about-current"),
  nextEl: document.querySelector(".js-about-main-count .js-about-next"),
  totalEl: document.querySelector(".js-about-total"),
  prevBtn: document.querySelectorAll(".about-button-prev"),
  nextBtn: document.querySelectorAll(".about-button-next"),
});

// ─── Counter ─────────────────────────────────────────────────────────────────

const initCounter = (totalEl, slidesCount) => {
  if (totalEl) {
    totalEl.textContent = `/ ${formatNum(Math.floor(slidesCount / 2))}`;
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
  }, 800);
};

// ─── Swipers ─────────────────────────────────────────────────────────────────

const initTextSwiper = () =>
  new Swiper(".about-text-swiper", {
    modules: [EffectFade, Controller],
    allowTouchMove: false,
    speed: 800,
    effect: "fade",
    fadeEffect: { crossFade: true },
    loop: true,
  });

const initBigSwiper = (textSwiper, els) => {
  const { currentEl, nextEl, countBlock } = els;

  const swiper = new Swiper(".slider-big", {
    modules: [Controller],

    speed: 800,
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
    speed: 800,
    observer: true,
    observeParents: true,
    watchOverflow: true,
    slidesPerView: 1,
    loop: true,
  });

// ─── Navigation buttons ───────────────────────────────────────────────────────

const bindNavButtons = (prevBtns, nextBtns, swipers) => {
  prevBtns.forEach((btn) => btn.addEventListener("click", () => swipers.forEach((s) => s.slidePrev())));
  nextBtns.forEach((btn) => btn.addEventListener("click", () => swipers.forEach((s) => s.slideNext())));
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
