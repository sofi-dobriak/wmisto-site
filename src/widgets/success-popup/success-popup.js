import "./success-popup.scss";
import "@/shared/components/general-btn/general-btn.scss";

const initSuccessPopup = () => {
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".js-success-popup-link");
    if (!btn) return;

    e.preventDefault();

    const successBlock = btn.closest(".js-success-popup-block");
    const parentPopup = btn.closest(".js-backdrop");

    if (parentPopup && typeof parentPopup.toggle === "function") {
      parentPopup.toggle(false);

      setTimeout(() => {
        successBlock?.classList.remove("is-active");
      }, 600);
    } else {
      successBlock?.classList.remove("is-active");
    }
  });
};

document.addEventListener("DOMContentLoaded", initSuccessPopup);
