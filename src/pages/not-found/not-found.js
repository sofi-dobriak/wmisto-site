function initNotFound() {}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initNotFound);
} else {
  initNotFound();
}
