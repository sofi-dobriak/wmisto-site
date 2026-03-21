import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

document.addEventListener("DOMContentLoaded", initNewsAnim);

function initNewsAnim() {
  const section = document.querySelector(".news-section");
  if (!section) return;

  const cards = section.querySelectorAll(".news-list > li");

  const titleSplit = SplitText.create(".news-title", {
    type: "lines",
    mask: "lines",
  });

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
      "-=1",
    );
}
