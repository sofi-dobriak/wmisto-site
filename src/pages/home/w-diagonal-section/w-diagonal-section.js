import Swiper from "swiper";
import { Navigation, Parallax, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

document.addEventListener("DOMContentLoaded", () => {
  const swiper = new Swiper(".w-diagonal-swiper", {
    modules: [Navigation, Parallax],
    speed: 1200,
    slidesPerView: 1,
    loop: false,
    parallax: true,
    navigation: {
      prevEl: ".w-diagonal-button-prev",
      nextEl: ".w-diagonal-button-next",
    },
  });
});
