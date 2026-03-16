import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export const initProgressSwiper = () => {
  const swiperElement = document.querySelector(".progress-single-swiper");
  if (!swiperElement) return;

  new Swiper(swiperElement, {
    modules: [Navigation],
    speed: 500,
    slidesPerView: 1,
    loop: false,
    navigation: {
      prevEl: ".progress-single-button-prev",
      nextEl: ".progress-single-button-next",
    },
  });
};
