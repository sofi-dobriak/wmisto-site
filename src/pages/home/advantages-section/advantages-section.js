import "./advantages-section.scss";
import "../../../shared/components/swiper-nav/swiper-nav.scss";
import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

const swiper = new Swiper(".advantages-swiper", {
  modules: [Navigation],
  slidesPerView: "auto",
  spaceBetween: 20,
  speed: 400,
  initialSlide: 2,
  centeredSlides: true,
  loop: true,
  navigation: {
    prevEl: ".advantages-button-prev",
    nextEl: ".advantages-button-next",
  },
});
