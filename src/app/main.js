// Swiper styles.
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

//ion-rangeSlier styles
import "/node_modules/ion-rangeslider/css/ion.rangeSlider.min.css";

// Forms initialization.
import "@features/form/form-init";

// Smooth scroll
import "@shared/scripts/scroll/leniscroll";

const modules = import.meta.glob(["../widgets/**/*.js", "../features/**/*.js", "../shared/ui/**/*.js"], {
  eager: true,
});

// const setSectionHeight = (selector) => {
//   const section = document.querySelector(selector);
//   if (!section) return;
//   if (window.innerWidth <= 767) {
//     section.style.height = `${window.innerHeight}px`;
//   } else {
//     section.style.height = "";
//   }
// };

// setSectionHeight(".hero-section");
// setSectionHeight(".genplan-section");
// setSectionHeight(".developer-section");

const vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vh}px`);

window.addEventListener("resize", () => {
  if (window.screen.width < 1025) return;
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
});
