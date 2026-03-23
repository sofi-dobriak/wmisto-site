import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

document.addEventListener("DOMContentLoaded", initConstructionAnim);

function initConstructionAnim() {
  const section = document.querySelector(".construction-progress");
  if (!section) return;

  const cards = section.querySelectorAll(".construction-list > li");
  let mm = gsap.matchMedia();

  const titleSplit = SplitText.create(".construction-title", {
    type: "lines",
    mask: "lines",
  });

  mm.add("(min-width: 769px)", () => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      })
      .fromTo(titleSplit.lines, { y: "100%" }, { y: "0%", duration: 0.8, stagger: 0.1, ease: "power2.out" })
      .fromTo(
        cards,
        { opacity: 0, y: 150 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power2.out" },
        "-=0.4",
      );
  });

  mm.add("(max-width: 768px)", () => {
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
