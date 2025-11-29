import Swiper from 'swiper';
import { Autoplay } from 'swiper/modules';

export function initHpGallerySwiper() {
  const swiperElement = document.querySelector<HTMLElement>('.swiper.is-hp-galery');

  if (!swiperElement) {
    return;
  }

  const wrapper = swiperElement.querySelector<HTMLElement>('.swiper-wrapper.is-hp-galery');

  if (!wrapper) {
    return;
  }

  // Vérifier qu'il reste des slides après le nettoyage global
  const remainingSlides = wrapper.querySelectorAll('.swiper-slide.is-hp-galery');

  if (remainingSlides.length === 0) {
    return;
  }

  // Initialiser Swiper
  new Swiper(swiperElement, {
    modules: [Autoplay],
    slidesPerView: 'auto',
    centeredSlides: true,
    spaceBetween: 23,
    loop: true,
    autoplay: {
      delay: 0,
      disableOnInteraction: true,
      pauseOnMouseEnter: true, // Pause automatique au survol
    },
    speed: 1000,
  });
}
