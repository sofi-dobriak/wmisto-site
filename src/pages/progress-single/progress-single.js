import {
  initProgressSwiper,
  applyProgressEditorStyles,
} from "./progress-single-section/progress-single-section.js";

function initConstructionProgressSingle() {
  applyProgressEditorStyles();
  initProgressSwiper();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initConstructionProgressSingle);
} else {
  initConstructionProgressSingle();
}
