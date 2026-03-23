import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

document.addEventListener("DOMContentLoaded", initDocsAnim);

function initDocsAnim() {
  const section = document.querySelector(".docs-section");
  if (!section) return;

  const titleSplit = SplitText.create(".docs-title", {
    type: "lines",
    mask: "lines",
  });

  const cards = section.querySelectorAll(".docs-list");

  gsap
    .timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
        toggleActions: "play none none none",
      },
    })
    .fromTo(titleSplit.lines, { y: "100%" }, { y: "0%", duration: 0.8, stagger: 0.1, ease: "power2.out" })
    .fromTo(cards, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.4");
}
