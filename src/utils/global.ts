import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function svgComponent(): void {
  document.querySelectorAll('[svg="component"]').forEach((element) => {
    const svgCode = element.textContent;
    if (svgCode !== null) {
      element.innerHTML = svgCode;
    }
  });
}

export function initNavbarScroll(): void {
  const navbar = document.querySelector<HTMLElement>('.navbar_component');

  if (!navbar) {
    return;
  }

  // Ajouter une transition smooth pour le transform
  navbar.style.transition = 'transform 0.5s ease-in-out';

  let lastScrollY = window.scrollY;
  let isScrolling = false;

  const handleScroll = () => {
    if (isScrolling) {
      return;
    }

    isScrolling = true;
    requestAnimationFrame(() => {
      const currentScrollY = window.scrollY;
      const scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';

      if (scrollDirection === 'down' && currentScrollY > 0) {
        // Scroll down : déplacer la navbar vers le haut de 5rem
        navbar.style.transform = 'translateY(-5rem)';
      } else {
        // Scroll up : remettre la navbar à sa position initiale
        navbar.style.transform = 'translateY(0)';
      }

      lastScrollY = currentScrollY;
      isScrolling = false;
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
}

export function initFooterLogoAnimation(): void {
  const footerComponent = document.querySelector<HTMLElement>('.footer_component');
  const footerLogo = document.getElementById('footer-logo');

  if (!footerComponent || !footerLogo) {
    return;
  }

  // Initialiser la position en bas
  gsap.set(footerLogo, { y: 202 });

  // Créer l'animation avec ScrollTrigger
  ScrollTrigger.create({
    trigger: footerComponent,
    start: 'top 30%',
    onEnter: () => {
      gsap.to(footerLogo, { y: 0, duration: 0.8, ease: 'power2.out' });
    },
    onEnterBack: () => {
      gsap.to(footerLogo, { y: 0, duration: 0.8, ease: 'power2.out' });
    },
    onLeaveBack: () => {
      gsap.set(footerLogo, { y: 50 });
    },
  });
}
