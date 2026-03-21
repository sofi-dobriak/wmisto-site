import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

document.addEventListener("DOMContentLoaded", initChooseAnim);

function initChooseAnim() {
  const section = document.querySelector(".choose-real-estate");
  if (!section) return;

  const links = section.querySelectorAll(".grid-link");
  const images = section.querySelectorAll(".grid-item-image-block");

  const titleSplit = SplitText.create(".choose-title", {
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

  // десктоп — висота картинок
  if (window.innerWidth > 1023) {
    gsap.fromTo(
      images,
      { height: 0 },
      {
        height: "100%",
        duration: 0.8,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      },
    );
  }

  // планшет і мобілка — підплив карток
  if (window.innerWidth <= 1023) {
    links.forEach((link) => {
      gsap.fromTo(
        link,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: link,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );
    });
  }
}
