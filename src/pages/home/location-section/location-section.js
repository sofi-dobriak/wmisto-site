import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

document.addEventListener("DOMContentLoaded", () => {
  addClickToLocationIframe();
  initLocationAnim();
});

function addClickToLocationIframe() {
  const iframe = document.querySelector(".location-map-block");
  if (!iframe) return;

  iframe.addEventListener("click", () => {
    iframe.classList.add("is-active");
  });

  document.addEventListener("scroll", () => {
    iframe.classList.remove("is-active");
  });
}

function initLocationAnim() {
  const section = document.querySelector(".location-section");
  if (!section) return;

  const titleSplit = SplitText.create(".location-title", {
    type: "lines",
    mask: "lines",
  });

  const textSplit = SplitText.create(".location-text", {
    type: "lines",
    mask: "lines",
  });

  const tl = gsap
    .timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
        // once: true,
        toggleActions: "play none none none",
      },
    })
    .fromTo(titleSplit.lines, { y: "100%" }, { y: "0%", duration: 0.8, stagger: 0.1, ease: "power2.out" })
    .fromTo(
      textSplit.lines,
      { y: "100%" },
      { y: "0%", duration: 0.6, stagger: 0.05, ease: "power2.out" },
      "-=0.4",
    )
    .fromTo(
      ".location-build-block",
      {
        opacity: 0,
        y: 250,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power2.out",
      },
    );
}
