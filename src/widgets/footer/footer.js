import "./footer.scss";

document.body.addEventListener("click", (evt) => {
  const target = evt.target.closest("[data-up-arrow]");
  if (!target) return;

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
