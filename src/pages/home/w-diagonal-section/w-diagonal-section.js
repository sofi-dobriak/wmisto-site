import "./w-diagonal-section.scss";
import "../../../shared/components/swiper-nav/swiper-nav.scss";

import Swiper from "swiper";
import { Navigation, Parallax } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

const swiper = new Swiper(".w-diagonal-swiper", {
  modules: [Navigation, Parallax],
  speed: 1000,
  slidesPerView: 1,
  loop: true,
  parallax: true,
  navigation: {
    prevEl: ".w-diagonal-button-prev",
    nextEl: ".w-diagonal-button-next",
  },
});
