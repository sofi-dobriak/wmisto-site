import "./call-popup.scss";
import { initPopups } from "@/shared/components/popup/popup";

const initCallPopup = () => {
  initPopups();

  document.addEventListener("click", (e) => {
    const openBtn = e.target.closest(".js-call-popup-open");
    if (!openBtn) return;

    e.preventDefault();

    const popup = document.querySelector(".js-call-popup");
    if (!popup) {
      console.error("Попап .js-call-popup не знайдено в розмітці!");
      return;
    }

    if (typeof popup.toggle === "function") {
      popup.toggle(true);
    } else {
      popup.classList.add("is-open");
      window.dispatchEvent(new Event("stop-scroll"));
    }
  });
};

document.addEventListener("DOMContentLoaded", initCallPopup);
