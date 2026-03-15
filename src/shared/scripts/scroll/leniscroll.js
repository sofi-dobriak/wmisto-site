// eslint-disable-next-line import/no-extraneous-dependencies
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

let lenis;
let isInited = false;

export const initSmoothScrolling = () => {
  if (isInited) return lenis;

  lenis = new Lenis({
    lerp: 0.1,
    infinite: false,
    smoothWheel: true,
  });

  lenis.on("scroll", () => ScrollTrigger.update());
  window.lenis = lenis;

  window.addEventListener("stop-scroll", () => lenis.stop());
  window.addEventListener("start-scroll", () => lenis.start());

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const target = document.querySelector(targetId);

      if (target) {
        setTimeout(() => {
          lenis.scrollTo(target, {
            offset: -10,
            duration: 1,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        }, 10);
      }
    });
  });

  const scrollFn = (time) => {
    lenis.raf(time);
    requestAnimationFrame(scrollFn);
  };
  requestAnimationFrame(scrollFn);

  // ОНОВЛЕННЯ ВИСОТИ: додаємо ТУТ (перед return)
  window.addEventListener("load", () => {
    lenis.resize();
    ScrollTrigger.refresh();
  });

  // Також додаємо ресайз при зміні розміру вікна
  window.addEventListener("resize", () => {
    lenis.resize();
  });

  isInited = true;
  return lenis;
};

initSmoothScrolling();
