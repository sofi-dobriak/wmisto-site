// Swiper styles.
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

//ion-rangeSlier styles
import "/node_modules/ion-rangeslider/css/ion.rangeSlider.min.css";

// Forms initialization.
import "@features/form/form-init";

// Smooth scroll
import "@shared/scripts/scroll/leniscroll";

const modules = import.meta.glob(["../widgets/**/*.js", "../features/**/*.js", "../shared/ui/**/*.js"], {
  eager: true,
});
