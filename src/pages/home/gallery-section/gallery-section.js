import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

const swiper = new Swiper(".gallery-swiper", {
  modules: [Navigation],
  speed: 500,
  slidesPerView: 3,
  spaceBetween: 20,
  navigation: {
    prevEl: ".gallery-button-prev",
    nextEl: ".gallery-button-next",
  },
  loop: true,
});
