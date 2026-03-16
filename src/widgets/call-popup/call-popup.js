import "./call-popup.scss";
import { initPopups } from "@/shared/components/popup/popup";

const initCallPopup = () => {
  initPopups();

  const openBtn = document.querySelector(".js-call-popup-open");
  const popup = document.querySelector(".js-call-popup");

  if (!openBtn || !popup) return;

  openBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (typeof popup.toggle === "function") {
      popup.toggle(true);
    } else {
      popup.classList.add("is-open");
      window.dispatchEvent(new Event("stop-scroll"));
    }
  });
};

document.addEventListener("DOMContentLoaded", initCallPopup);
