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

export const applyWpEditorStyles = () => {
  const containers = document.querySelectorAll(".wp-editor-styles");
  if (!containers.length) return;

  const INLINE_BLOCK_TAGS = ["EM", "SPAN", "I"];
  const BOLD_BLOCK_TAGS = ["STRONG", "B"];

  containers.forEach((container) => {
    container.childNodes.forEach((node) => {
      if (node.nodeType !== Node.ELEMENT_NODE) return;

      const tag = node.tagName;

      if (BOLD_BLOCK_TAGS.includes(tag) && !node.classList.length) {
        node.classList.add("news-single-list-title");
        node.style.display = "block";
        return;
      }

      if (INLINE_BLOCK_TAGS.includes(tag) && !node.classList.length) {
        node.classList.add("news-single-text");
        node.style.display = "block";
      }
    });

    container.querySelectorAll("p:not([class])").forEach((el) => {
      el.classList.add("news-single-text");
    });

    container
      .querySelectorAll("h2:not([class]), h3:not([class]), h4:not([class])")
      .forEach((el) => el.classList.add("news-single-list-title"));

    container.querySelectorAll("ul:not([class])").forEach((el) => {
      el.classList.add("news-single-list");
    });

    container.querySelectorAll("li:not([class])").forEach((el) => {
      el.classList.add("news-single-item");
    });

    // Картинки
    container.querySelectorAll("img").forEach((img) => {
      const parent = img.parentElement;

      // Перевіряємо, чи картинка вже має потрібний клас
      if (!img.classList.contains("news-single-image")) {
        img.classList.add("news-single-image");
      }

      // Логіка для обгортки (image-block)
      // Якщо картинка лежить безпосередньо в контейнері (без обгортки типу figure або p)
      if (parent === container) {
        const wrapper = document.createElement("div");
        wrapper.classList.add("news-single-image-block");

        // Вставляємо обгортку перед картинкою і переміщуємо картинку всередину
        img.parentNode.insertBefore(wrapper, img);
        wrapper.appendChild(img);
      } else {
        // Якщо обгортка вже є (наприклад, figure або p від WordPress), додаємо клас їй
        parent.classList.add("news-single-image-block");
      }
    });

    container.querySelectorAll("blockquote:not([class])").forEach((el) => {
      el.classList.add("news-single-text");
    });

    container.querySelectorAll("a:not([class])").forEach((el) => {
      el.classList.add("news-single-link");
    });
  });
};
