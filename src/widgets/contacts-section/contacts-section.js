import "./contacts-section.scss";

document.addEventListener("DOMContentLoaded", () => {
  const iframe = document.querySelector(".contacts-map-block");
  if (!iframe) return;

  iframe.addEventListener("click", () => {
    iframe.classList.add("is-active");
  });

  document.addEventListener("scroll", () => {
    iframe.classList.remove("is-active");
  });
});
