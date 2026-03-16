function addClickIframe() {
  const iframe = document.querySelector(".panorama-iframe");
  if (!iframe) return;

  iframe.addEventListener("click", () => {
    iframe.classList.add("is-active");
  });

  document.addEventListener("scroll", () => {
    iframe.classList.remove("is-active");
  });
}

document.addEventListener("DOMContentLoaded", () => addClickIframe());
