import { initPopups } from "@/shared/components/popup/popup";

const initMenu = () => {
  initPopups();

  const burgerBtn = document.querySelector(".js-burger-btn");
  const menu = document.querySelector(".popup-menu");
  if (!burgerBtn || !menu) return;

  const menuLinks = menu.querySelectorAll(".menu__link");

  burgerBtn.addEventListener("click", () => {
    if (typeof menu.toggle === "function") menu.toggle(true);
  });

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const href = link.getAttribute("href");
      if (!href) return;

      if (href.includes("#")) {
        if (typeof menu.toggle === "function") {
          menu.toggle(false); // ← це диспатчить start-scroll → lenis.start()
        }
      }
    });
  });
};

document.addEventListener("DOMContentLoaded", initMenu);
