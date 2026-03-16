import "./progress-single.scss";
import { initProgressSwiper } from "./progress-single-section/progress-single-section.js";
import "./progress-more-cards-section/progress-more-cards-section";

function initConstructionProgressSingle() {
  initProgressSwiper();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initConstructionProgressSingle);
} else {
  initConstructionProgressSingle();
}
