import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

document.addEventListener("DOMContentLoaded", initInfrastructureAnim);

function initInfrastructureAnim() {
  const section = document.querySelector(".infrastructure-section");
  if (!section) return;

  const titleSplit = SplitText.create(".infrastructure-title, .infrastructure-text", {
    type: "lines",
    mask: "lines",
  });

  gsap.fromTo(
    titleSplit.lines,
    { y: "100%" },
    {
      y: "0%",
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: { trigger: ".infrastructure-title-block", start: "top 80%", once: true },
    },
  );

  const leftTitleSplit = SplitText.create(".infrastructure-left-title", { type: "lines", mask: "lines" });

  gsap
    .timeline({
      scrollTrigger: { trigger: ".infrastructure-left-block", start: "top 80%", once: true },
    })
    .fromTo(leftTitleSplit.lines, { y: "100%" }, { y: "0%", duration: 0.8, stagger: 0.1, ease: "power2.out" })
    .fromTo(
      ".infrastructure-left-item",
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" },
      "-=0.4",
    );

  const rightTitleSplit = SplitText.create(".infrastructure-right-title", { type: "lines", mask: "lines" });

  gsap
    .timeline({
      scrollTrigger: { trigger: ".infrastructure-right-block", start: "top 80%", once: true },
    })
    .fromTo(
      rightTitleSplit.lines,
      { y: "100%" },
      { y: "0%", duration: 0.8, stagger: 0.1, ease: "power2.out" },
    )
    .fromTo(
      ".infrastructure-right-item",
      { opacity: 0, x: 30 },
      { opacity: 1, x: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" },
      "-=0.4",
    );
}
