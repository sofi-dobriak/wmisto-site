import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", initHeroAnim);

function initHeroAnim() {
  const section = document.querySelector(".hero-section");
  if (!section) return;

  gsap.set(".hero-video-block", { opacity: 0, x: -350 });
  gsap.set(".hero-text-block", { opacity: 0, x: 350 });

  const animate = () => {
    gsap
      .timeline()
      .fromTo(
        ".hero-video-block",
        { opacity: 0, x: -350 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: "power2.out",
        },
      )
      .fromTo(
        ".hero-text-block",
        { opacity: 0, x: 350 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: "power2.out",
        },
        "<",
      );
  };

  if (sessionStorage.getItem("loaderClosed")) {
    animate();
  } else {
    window.addEventListener("loader:closed", animate, { once: true });
  }
}
