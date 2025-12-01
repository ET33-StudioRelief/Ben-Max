import './index.css';

import { initTestItemClick } from './utils/gallery';
import { initFooterLogoAnimation, initNavbarScroll, svgComponent } from './utils/global';
import {
  initAboutTextAnimation,
  initFeaturesSectionAnimation,
  initFeaturesTextAnimation,
  initHpGalleryHeadingAnimation,
  initLandscapeImageMaskAnimation,
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
  initHpGalleryHeadingAnimation();
  initFeaturesSectionAnimation();
  initLogoGridAnimation();
  initLandscapeImageMaskAnimation();
  initAboutTextAnimation();
  initFeaturesTextAnimation();
  initFooterLogoAnimation();
});
