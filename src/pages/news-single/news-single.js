import "./news-single.scss";
import "./news-single-section/news-single-section";
import { initNewsSwiper } from "./news-single-section/news-single-section";

function initNewsSingle() {
  initNewsSwiper();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initNewsSingle);
} else {
  initNewsSingle();
}
