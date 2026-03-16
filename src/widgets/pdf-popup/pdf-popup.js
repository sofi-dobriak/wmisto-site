import { initPopups } from "@/shared/components/popup/popup";

const initPdfPopup = () => {
  initPopups();

  const openBtn = document.querySelector(".js-pdf-popup-open");
  const popup = document.querySelector(".js-pdf-popup");

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

document.addEventListener("DOMContentLoaded", initPdfPopup);
