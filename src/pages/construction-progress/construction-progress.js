function initConstructionProgress() {}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initConstructionProgress);
} else {
  initConstructionProgress();
}
