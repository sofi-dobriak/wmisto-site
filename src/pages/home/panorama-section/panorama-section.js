import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

document.addEventListener("DOMContentLoaded", initPanoramaAnim);

function initPanoramaAnim() {
  const section = document.querySelector(".panorama-section");
  if (!section) return;

  const titleSplit = SplitText.create(".panorama-title", {
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
    .fromTo(titleSplit.lines, { y: "100%" }, { y: "0%", duration: 0.8, ease: "power2.out" });
}

function addClickIframe() {
  const iframe = document.querySelector(".panorama-iframe");
  if (!iframe) return;

  iframe.addEventListener("click", () => {
    iframe.classList.add("is-active");
  });

  document.addEventListener("scroll", () => {
    iframe.classList.remove("is-active");
  });
}

document.addEventListener("DOMContentLoaded", () => addClickIframe());
