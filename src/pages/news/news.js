import "./news.scss";
import "./news-catalog/news-catalog.scss";
import "../../shared/components/news-card/news-card.scss";
import "../../widgets/pagination/pagination.scss";

function initNews() {}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initNews);
} else {
  initNews();
}
