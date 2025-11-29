import './index.css';

import { initTestItemClick } from './utils/gallery';
import { initNavbarScroll, svgComponent } from './utils/global';
import {
  initAboutTextAnimation,
  initFeaturesAnimation,
  initFeaturesTextAnimation,
  initLogoGridAnimation,
} from './utils/home';
import { initContactModal } from './utils/modal';
import { initHpGallerySwiper } from './utils/swiper';

window.Webflow ||= [];
window.Webflow.push(() => {
  // Nettoyer les éléments vides de Webflow CMS sur toutes les pages
  initNavbarScroll();
  initHpGallerySwiper();
  svgComponent();
  initTestItemClick();
  initContactModal();
  initFeaturesAnimation();
  initLogoGridAnimation();
  initAboutTextAnimation();
  initFeaturesTextAnimation();
});
