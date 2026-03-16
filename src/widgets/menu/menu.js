import "./menu.scss";

const initMenu = () => {
  const burgerBtn = document.querySelector(".js-burger-btn");
  const closeBtn = document.querySelector(".js-close-btn");
  const menu = document.querySelector(".js-menu-backdrop");
  const menuLinks = menu.querySelectorAll(".menu__link");

  if (!burgerBtn || !menu) return;

  setTimeout(() => {
    menu.classList.add("js-inited");
  }, 100);

  const toggleMenu = (isOpen) => {
    menu.classList.toggle("is-open", isOpen);
    window.dispatchEvent(new Event(isOpen ? "stop-scroll" : "start-scroll"));
  };

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const href = link.getAttribute("href");
      const isAnchor = href.includes("#");
      const isSamePage =
        href.startsWith("#") || href.includes(window.location.pathname.split("/").pop() || "home.html");

      if (isAnchor && isSamePage) toggleMenu(false);
    });
  });

  burgerBtn.addEventListener("click", () => toggleMenu(true));
  closeBtn.addEventListener("click", () => toggleMenu(false));

  menu.addEventListener("click", (e) => {
    if (e.target === menu) toggleMenu(false);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("is-open")) {
      toggleMenu(false);
    }
  });
};

document.addEventListener("DOMContentLoaded", initMenu);
