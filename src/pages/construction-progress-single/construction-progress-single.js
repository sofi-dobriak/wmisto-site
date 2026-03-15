import "./construction-progress-single.scss";
import "./progress-single-section/progress-single-section.scss";

import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

function initConstructionProgressSingle() {}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initConstructionProgressSingle);
} else {
  initConstructionProgressSingle();
}

const swiper = new Swiper(".progress-single-swiper", {
  modules: [Navigation],
  speed: 1000,
  slidesPerView: 1,
  spaceBetween: 0,
  navigation: {
    prevEl: ".progress-single-button-prev",
    nextEl: ".progress-single-button-next",
  },
  loop: true,
});
