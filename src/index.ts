import './index.css';

import { initNavbarScroll, svgComponent } from './utils/global';
import { initHpGallerySwiper } from './utils/swiper';
import { initTestItemClick } from './utils/test';

window.Webflow ||= [];
window.Webflow.push(() => {
  // Nettoyer les éléments vides de Webflow CMS sur toutes les pages
  initNavbarScroll();
  initHpGallerySwiper();
  svgComponent();
  initTestItemClick();
});
