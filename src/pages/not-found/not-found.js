import "./not-found.scss";
import "./not-found-section/not-found-section.scss";

function initNotFound() {}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initNotFound);
} else {
  initNotFound();
}
