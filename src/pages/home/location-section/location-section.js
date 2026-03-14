import "./location-section.scss";

const iframe = document.querySelector(".location-map-block");

iframe.addEventListener("click", () => {
  iframe.classList.add("is-active");
});

document.addEventListener("scroll", () => {
  iframe.classList.remove("is-active");
});
