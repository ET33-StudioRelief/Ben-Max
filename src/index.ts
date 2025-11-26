import './index.css';

import { cleanEmptyWebflowItems, initNavbarScroll, svgComponent } from './utils/global';
import { initGalleryAnimation } from './utils/gsap';
import { initHpGallerySwiper } from './utils/swiper';

window.Webflow ||= [];
window.Webflow.push(() => {
  // Nettoyer les éléments vides de Webflow CMS sur toutes les pages
  cleanEmptyWebflowItems();
  initNavbarScroll();
  initHpGallerySwiper();
  svgComponent();
  initGalleryAnimation();
});
