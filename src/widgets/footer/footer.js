import "./footer.scss";

const iframe = document.querySelector(".footer-map-block");

iframe.addEventListener("click", () => {
  iframe.classList.add("is-active");
});

document.addEventListener("scroll", () => {
  iframe.classList.remove("is-active");
});

document.body.addEventListener("click", (evt) => {
  const target = evt.target.closest("[data-up-arrow]");
  if (!target) return;
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
