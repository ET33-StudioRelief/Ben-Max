import './index.css';

import { initTestItemClick } from './utils/gallery';
import {
  initAboutStarsFloating,
  initFooterLogoAnimation,
  initNavbarScroll,
  initRevealUpScroll,
  svgComponent,
} from './utils/global';
import {} from /*initAboutTextAnimation,
  initFeaturesSectionAnimation,
  initFeaturesTextAnimation,
  initHpGalleryHeadingAnimation,*/
/*initLandscapeImageMaskAnimation,*/
/*initLogoGridAnimation,
  initLogoSectionAnimation,*/
'./utils/home';
import { initContactModal } from './utils/modal';
import { initHpGallerySwiper } from './utils/swiper';

// Initialize floating stars animation with fallback
function initFloatingStars(): void {
  const stars = document.querySelectorAll(
    '.about_star-decorativ-bottom, .about_star-decorativ-top'
  );

  // Check if browser supports animation-timeline
  const supportsAnimationTimeline = CSS.supports('animation-timeline: view()');

  if (!supportsAnimationTimeline) {
    // Add fallback class for infinite animation
    stars.forEach((star) => star.classList.add('fallback'));
  }
}

window.Webflow ||= [];
window.Webflow.push(() => {
  initNavbarScroll();
  initHpGallerySwiper();
  svgComponent();
  initTestItemClick();
  initContactModal();
  /*initLandscapeImageMaskAnimation();*/
  initFloatingStars();
  initRevealUpScroll();
  initAboutStarsFloating();

  initFooterLogoAnimation();
});
