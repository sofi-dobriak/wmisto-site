function addClickToLocationIframe() {
  const iframe = document.querySelector(".location-map-block");
  if (!iframe) return;

  iframe.addEventListener("click", () => {
    iframe.classList.add("is-active");
  });

  document.addEventListener("scroll", () => {
    iframe.classList.remove("is-active");
  });
}

document.addEventListener("DOMContentLoaded", () => addClickToLocationIframe);
