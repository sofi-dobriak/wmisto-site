import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export const initProgressSwiper = () => {
  const swiperElement = document.querySelector(".progress-single-swiper");
  if (!swiperElement) return;

  new Swiper(swiperElement, {
    modules: [Navigation],
    speed: 800,
    slidesPerView: 1,
    loop: false,
    navigation: {
      prevEl: ".progress-single-button-prev",
      nextEl: ".progress-single-button-next",
    },
  });
};

export const applyProgressEditorStyles = () => {
  const containers = document.querySelectorAll(".wp-editor-styles");
  if (!containers.length) return;

  const TEXT_TAGS = ["P", "STRONG", "EM", "BLOCKQUOTE", "SPAN"];

  containers.forEach((container) => {
    // 1. СТВОРЮЄМО ОБГОРТКУ, ЯКУ ОЧІКУЄ ВАШ SCSS
    // Якщо її ще немає всередині wp-editor-styles
    let infoContent = container.querySelector(".progress-info-content");

    if (!infoContent) {
      infoContent = document.createElement("div");
      infoContent.classList.add("progress-info-content");

      // Переміщуємо весь контент (тексти, списки) всередину цієї обгортки
      // крім дати, якщо вона раптом там є
      while (container.firstChild) {
        infoContent.appendChild(container.firstChild);
      }
      container.appendChild(infoContent);
    }

    // 2. ТЕПЕР ДОДАЄМО КЛАСИ ЕЛЕМЕНТАМ ВЖЕ ВСЕРЕДИНІ ОБГОРТКИ
    Array.from(infoContent.children).forEach((el) => {
      // Пропускаємо елементи з класами (дати тощо)
      if (el.classList.length > 0) return;

      const tag = el.tagName;

      // Текстові блоки
      if (TEXT_TAGS.includes(tag)) {
        el.classList.add("progress-text");
        if (tag !== "P" && tag !== "BLOCKQUOTE") {
          el.style.display = "block";
        }
      }

      // Списки
      if (tag === "UL") {
        el.classList.add("progress-list");
        el.querySelectorAll("li").forEach((li) => {
          li.classList.add("progress-item");
        });
      }
    });

    // 3. Картинки та посилання
    infoContent.querySelectorAll("a:not([class])").forEach((link) => {
      link.classList.add("progress-text");
    });

    infoContent.querySelectorAll("img").forEach((img) => {
      if (!img.classList.contains("progress-image")) {
        img.classList.add("progress-image");
      }
    });
  });
};
