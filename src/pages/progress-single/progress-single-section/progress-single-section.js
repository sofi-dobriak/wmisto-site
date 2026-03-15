import "./progress-single-section.scss";

import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export const initProgressSwiper = () => {
  const swiperElement = document.querySelector(".progress-single-swiper");
  if (!swiperElement) return;

  new Swiper(swiperElement, {
    modules: [Navigation],
    speed: 1000,
    slidesPerView: 1,
    loop: true,
    navigation: {
      prevEl: ".progress-single-button-prev",
      nextEl: ".progress-single-button-next",
    },
  });
};
