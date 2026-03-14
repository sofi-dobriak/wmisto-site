import "./panorama-section.scss";

const iframe = document.querySelector(".panorama-iframe");

iframe.addEventListener("click", () => {
  iframe.classList.add("is-active");
});

document.addEventListener("scroll", () => {
  iframe.classList.remove("is-active");
});
