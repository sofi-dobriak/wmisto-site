import "./construction-progress.scss";
import "./progress-section/progress-section.scss";
import "../../shared/components/construction-card/construction-card.scss";
import "../../widgets/pagination/pagination.scss";

function initConstructionProgress() {}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initConstructionProgress);
} else {
  initConstructionProgress();
}
