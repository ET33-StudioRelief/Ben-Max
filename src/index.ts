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
  initNavbarScroll();
  initHpGallerySwiper();
  svgComponent();
  initTestItemClick();
  initContactModal();
  initLogoSectionAnimation();
  initFeaturesAnimation();
  initLogoGridAnimation();
  initAboutTextAnimation();
  initFeaturesTextAnimation();
  initFooterLogoAnimation();
});
