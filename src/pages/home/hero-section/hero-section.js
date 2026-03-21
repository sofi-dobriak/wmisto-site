import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

document.addEventListener("DOMContentLoaded", initHeroAnim);

function initHeroAnim() {
  const section = document.querySelector(".hero-section");
  if (!section) return;

  gsap.set(".hero-video-block", { opacity: 0, x: -350, scale: 1.5 });

  const animate = () => {
    const split = SplitText.create(" .hero-text", {
      type: "lines",
      mask: "lines",
    });

    gsap
      .timeline()
      .fromTo(
        ".hero-video-block",
        { opacity: 0, x: -350, scale: 1.5 },
        { opacity: 1, x: 0, scale: 1, duration: 1, ease: "power2.out" },
      )
      .fromTo(".hero-text-block__bg", { x: 350 }, { x: 0, duration: 1, ease: "power2.out" }, "<")
      .fromTo(
        ".hero-logo-clip, .hero-desc-block, hero-plannings-link",
        { clipPath: "inset(100% 0 0 0)" },
        { clipPath: "inset(0% 0 0 0)", duration: 1, ease: "power2.out" },
        "<",
      )
      .fromTo(split.lines, { y: "100%" }, { y: "0%", duration: 1, ease: "power2.out" }, "<");
  };

  if (sessionStorage.getItem("loaderClosed")) {
    animate();
  } else {
    window.addEventListener("loader:closed", animate, { once: true });
  }
}
