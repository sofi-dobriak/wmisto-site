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
}
