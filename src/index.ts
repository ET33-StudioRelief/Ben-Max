import './index.css';

import { initTestItemClick } from './utils/gallery';
import { initFooterLogoAnimation, initNavbarScroll, svgComponent } from './utils/global';
import {
  initAboutTextAnimation,
  initFeaturesAnimation,
  initFeaturesTextAnimation,
  initLogoGridAnimation,
  initLogoSectionAnimation,
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
  initLogoSectionAnimation(); // Animation logo-h2 -> logo-btn (quand section_logo entre dans viewport)
  initFeaturesAnimation(); // Animation des features (indépendante)
  initLogoGridAnimation();
  initAboutTextAnimation();
  initFeaturesTextAnimation();
  initFooterLogoAnimation(); // Animation footer-logo avec move up (quand footer_component entre dans viewport)
});
