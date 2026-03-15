import "./progress-single.scss";
import { initProgressSwiper } from "./progress-single-section/progress-single-section.js";

function initConstructionProgressSingle() {
  initProgressSwiper();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initConstructionProgressSingle);
} else {
  initConstructionProgressSingle();
}
