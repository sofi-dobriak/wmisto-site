import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

const swiper = new Swiper(".gallery-swiper", {
  modules: [Navigation],
  speed: 800,
  slidesPerView: 3,
  spaceBetween: 20,
  navigation: {
    prevEl: ".gallery-button-prev",
    nextEl: ".gallery-button-next",
  },
  loop: true,
  breakpoints: {
    0: {
      slidesPerView: 1.3,
      spaceBetween: 10,
      centeredSlides: true,
    },
    768: {
      slidesPerView: 1.3,
      spaceBetween: 20,
      centeredSlides: true,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 20,
      centeredSlides: false,
    },
  },
});
