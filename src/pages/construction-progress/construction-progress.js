import "./construction-progress.scss";
import "./progress-catalog/progress-catalog.scss";
import "@/shared/components/construction-card/construction-card.scss";
import "@/widgets/pagination/pagination.scss";
import "@/shared/components/swiper-nav/swiper-nav.scss";

function initConstructionProgress() {}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initConstructionProgress);
} else {
  initConstructionProgress();
}
