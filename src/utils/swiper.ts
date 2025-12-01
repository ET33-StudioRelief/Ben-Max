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

  const remainingSlides = wrapper.querySelectorAll('.swiper-slide.is-hp-galery');
  if (remainingSlides.length === 0) {
    return;
  }

  new Swiper(swiperElement, {
    modules: [Autoplay],
    slidesPerView: 'auto',
    centeredSlides: true,
    spaceBetween: 23,
    loop: true,
    speed: 3000,
    autoplay: {
      delay: 0,
      disableOnInteraction: true,
      pauseOnMouseEnter: true,
    },
  });
}
