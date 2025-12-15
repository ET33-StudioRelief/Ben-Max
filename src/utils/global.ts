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

/**
 * Reveals elements on scroll by adding `.is-revealed` when they enter the viewport.
 * Targets: elements with `section-animation="reveal-up-scroll"`.
 */
export function initRevealUpScroll(): void {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>('[section-animation="reveal-up-scroll"]')
  );

  if (elements.length === 0) {
    return;
  }

  // Respect reduced motion: reveal immediately (no animation)
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    elements.forEach((el) => el.classList.add('is-revealed'));
    return;
  }

  // If IntersectionObserver isn't supported, reveal everything immediately
  if (!('IntersectionObserver' in window)) {
    elements.forEach((el) => el.classList.add('is-revealed'));
    return;
  }

  const io = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }
        const el = entry.target as HTMLElement;
        el.classList.add('is-revealed');
        observer.unobserve(el); // play once
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -10% 0px',
    }
  );

  elements.forEach((el) => io.observe(el));
}

/**
 * Adds a scroll-driven floating/parallax effect to the two decorative stars in `section_about`.
 * Uses ScrollTrigger scrub so the motion is directly tied to scroll progress.
 */
export function initAboutStarsFloating(): void {
  const sectionAbout = document.querySelector<HTMLElement>('.section_about');
  const starTop = document.querySelector<HTMLElement>('.about_star-decorativ-top');
  const starBottom = document.querySelector<HTMLElement>('.about_star-decorativ-bottom');

  if (!sectionAbout || (!starTop && !starBottom)) {
    return;
  }

  // Respect reduced motion: keep elements in place
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.set([starTop, starBottom].filter(Boolean), { y: 0 });
    return;
  }

  // Reset to a known baseline so refreshes don't accumulate transforms
  gsap.set([starTop, starBottom].filter(Boolean), { y: 0 });

  // Top star moves slightly up as you scroll through the about section
  if (starTop) {
    gsap.to(starTop, {
      y: 120,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionAbout,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        invalidateOnRefresh: true,
      },
    });
  }

  // Bottom star moves slightly down (opposite direction) for depth
  if (starBottom) {
    gsap.to(starBottom, {
      y: 200,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionAbout,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        invalidateOnRefresh: true,
        markers: true,
      },
    });
  }
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
