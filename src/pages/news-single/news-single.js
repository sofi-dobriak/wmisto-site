import { initNewsSwiper, applyWpEditorStyles } from "./news-single-section/news-single-section";

function initNewsSingle() {
  applyWpEditorStyles();
  initNewsSwiper();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initNewsSingle);
} else {
  initNewsSingle();
}
