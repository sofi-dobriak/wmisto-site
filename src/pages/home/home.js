import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Swiper from "swiper";
import { Navigation, Autoplay } from "swiper/modules";

import "./home.scss";

gsap.registerPlugin(ScrollTrigger);

import "./hero-section/hero-section.js";
import "./about-section/about-section.js";
import "./commercial-real-estate-section/commercial-real-estate-section.js";
import "./infrastructure-section/infrastructure-section.js";
import "./genplan-section/genplan-section.js";
import "./w-diagonal-section/w-diagonal-section.js";
import "./choose-real-estate-section/choose-real-estate-section.js";
import "./panorama-section/panorama-section.js";
import "./location-section/location-section.js";
import "./stats-section/stats-section.js";
import "./advantages-section/advantages-section.js";
import "./gallery-section/gallery-section.js";

import "@shared/scripts/liquid-glass-animation/liquid-glass-animation";
