import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

document.addEventListener("DOMContentLoaded", initNewsAnim);

function initNewsAnim() {
  const section = document.querySelector(".news-section");
  if (!section) return;

  const cards = section.querySelectorAll(".news-list > li");
  let mm = gsap.matchMedia();

  mm.add("(min-width: 769px)", () => {
    // ДЕСКТОП: твій оригінальний каскад
    gsap
      .timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none reset",
        },
      })
      .fromTo(
        cards,
        { opacity: 0, y: 150 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power2.out" },
      );
  });

  mm.add("(max-width: 768px)", () => {
    // МОБАЙЛ: кожна картка підвантажується окремо при доскролі
    cards.forEach((card) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reset",
          },
        },
      );
    });
  });
}
