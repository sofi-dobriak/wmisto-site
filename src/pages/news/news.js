import { paginationInit } from "@/widgets/pagination/pagination";

document.addEventListener("DOMContentLoaded", () => {
  paginationInit(".news-catalog-list", ".news-item");
});
