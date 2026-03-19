import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export const initNewsSwiper = () => {
  const swiperElement = document.querySelector(".news-single-swiper");
  if (!swiperElement) return;

  new Swiper(swiperElement, {
    modules: [Navigation],
    speed: 800,
    slidesPerView: 1,
    spaceBetween: 10,
    loop: false,
    navigation: {
      prevEl: ".news-single-button-prev",
      nextEl: ".news-single-button-next",
    },
  });
};
