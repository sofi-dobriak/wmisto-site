import "./popup.scss";

export const initPopups = () => {
  const backdrops = document.querySelectorAll(".js-backdrop");

  backdrops.forEach((backdrop) => {
    setTimeout(() => backdrop.classList.add("js-inited"), 100);

    const closeBtn = backdrop.querySelector(".js-close-btn");

    const togglePopup = (isOpen) => {
      backdrop.classList.toggle("is-open", isOpen);
      window.dispatchEvent(new Event(isOpen ? "stop-scroll" : "start-scroll"));
    };

    closeBtn?.addEventListener("click", () => togglePopup(false));

    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) togglePopup(false);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && backdrop.classList.contains("is-open")) {
        togglePopup(false);
      }
    });

    backdrop.toggle = togglePopup;
  });
};
