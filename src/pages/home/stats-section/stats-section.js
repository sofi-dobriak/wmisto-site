import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

document.addEventListener("DOMContentLoaded", () => {
  initStatsnAnim();
});

function initStatsnAnim() {
  const section = document.querySelector(".stats-section");
  if (!section) return;

  const userAgent = navigator.userAgent || "";
  const isIOS =
    /iPad|iPhone|iPod/.test(userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

  const list = section.querySelector(".stats-list");
  const items = gsap.utils.toArray(".stats-item");
  const stickyBaseTop = 100;
  const stickyStep = 10;

  if (list) {
    list.style.setProperty("--items-count", items.length);
    list.style.setProperty("--sticky-base-top", `${stickyBaseTop}px`);
    list.style.setProperty("--sticky-step", `${stickyStep}px`);
  }

  // Встановлюємо унікальний --item-index для кожної картки
  items.forEach((item, i) => {
    item.style.setProperty("--item-index", i + 1);
  });

  const titleSplit = SplitText.create(".stats-title-block .stats-title", {
    type: "lines",
    mask: "lines",
  });

  const tl = gsap
    .timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
        toggleActions: "play none none none",
      },
    })
    .fromTo(titleSplit.lines, { y: "100%" }, { y: "0%", duration: 0.8, stagger: 0.1, ease: "power2.out" });

  const matchMedia = gsap.matchMedia();

  matchMedia.add("(max-width: 1023px)", () => {
    if (!list) return;
    const lastItem = items[items.length - 1];
    const lastItemTop = stickyBaseTop + (items.length - 1) * stickyStep;

    const createDimTweens = () => {
      return items.slice(0, -1).map((item, i) => {
        const nextItem = items[i + 1];
        const currentTop = stickyBaseTop + i * stickyStep;
        const nextTop = stickyBaseTop + (i + 1) * stickyStep;

        gsap.set(item, { "--after-opacity": 0 });

        return gsap.to(item, {
          "--after-opacity": 0.5,
          ease: "none",
          scrollTrigger: {
            trigger: item,
            start: `top top+=${currentTop}`,
            endTrigger: nextItem,
            end: `top top+=${nextTop}`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      });
    };

    if (isIOS) {
      const originalPaddingBottom = list.style.paddingBottom;
      const extraBottom = (items.length - 1) * stickyStep + stickyBaseTop;
      list.style.paddingBottom = `${extraBottom}px`;

      items.forEach((item, i) => {
        item.style.position = "sticky";
        item.style.top = `${stickyBaseTop + i * stickyStep}px`;
        item.style.zIndex = String(i + 1);
      });

      const dimTweens = createDimTweens();

      return () => {
        dimTweens.forEach((tween) => tween.kill());
        list.style.paddingBottom = originalPaddingBottom;
        items.forEach((item) => {
          item.style.position = "";
          item.style.top = "";
          item.style.zIndex = "";
        });
      };
    }

    const pinTriggers = items.map((item, i) => {
      gsap.set(item, { zIndex: i + 1 });

      return ScrollTrigger.create({
        trigger: item,
        start: `top top+=${stickyBaseTop + i * stickyStep}`,
        endTrigger: lastItem,
        end: `top top+=${lastItemTop}`,
        pin: true,
        pinSpacing: false,
        invalidateOnRefresh: true,
      });
    });

    const dimTweens = createDimTweens();

    return () => {
      pinTriggers.forEach((trigger) => trigger.kill());
      dimTweens.forEach((tween) => tween.kill());
      items.forEach((item) => gsap.set(item, { clearProps: "zIndex" }));
    };
  });
}
