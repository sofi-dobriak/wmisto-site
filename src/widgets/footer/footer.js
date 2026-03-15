import "./footer.scss";

const iframe = document.querySelector(".footer-map-block");

iframe.addEventListener("click", () => {
  iframe.classList.add("is-active");
});

document.addEventListener("scroll", () => {
  iframe.classList.remove("is-active");
});
