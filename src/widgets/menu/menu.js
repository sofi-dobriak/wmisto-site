import "./menu.scss";
import { initPopups } from "@/shared/components/popup/popup";

const initMenu = () => {
  initPopups();

  const burgerBtn = document.querySelector(".js-burger-btn");
  const menu = document.querySelector(".popup-menu");
  const menuLinks = menu?.querySelectorAll(".menu__link");

  if (!burgerBtn || !menu) return;

  burgerBtn.addEventListener("click", () => menu.toggle(true));

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const href = link.getAttribute("href");
      if (!href) return;

      const isAnchor = href.includes("#");
      const isSamePage =
        href.startsWith("#") || href.includes(window.location.pathname.split("/").pop() || "home.html");

      if (isAnchor && isSamePage) {
        menu.toggle(false);
      }
    });
  });
};

document.addEventListener("DOMContentLoaded", initMenu);
