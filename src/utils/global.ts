/**
 * Nettoie les éléments vides générés par Webflow CMS
 * Supprime les éléments avec w-dyn-bind-empty ou contenant des placeholders
 * @param container - Le conteneur à nettoyer (optionnel, par défaut document)
 */
export function cleanEmptyWebflowItems(container: Document | HTMLElement = document): void {
  // Trouver tous les éléments avec w-dyn-bind-empty
  const emptyItems = container.querySelectorAll<HTMLElement>('.w-dyn-bind-empty');

  emptyItems.forEach((item) => {
    // Vérifier si c'est un élément de liste dynamique
    const isDynItem = item.classList.contains('w-dyn-item');

    if (isDynItem) {
      item.remove();
    }
  });

  // Trouver les images placeholder Webflow
  const images = container.querySelectorAll<HTMLImageElement>('img');

  images.forEach((img) => {
    const isPlaceholder =
      img.src.includes('placeholder') ||
      img.src.includes('Basic/assets/placeholder') ||
      !img.src ||
      img.src === '';

    if (isPlaceholder) {
      // Trouver le parent w-dyn-item et le supprimer
      const dynItem = img.closest('.w-dyn-item');
      if (dynItem) {
        dynItem.remove();
      }
    }
  });
}

export function svgComponent(): void {
  document.querySelectorAll('[svg="component"]').forEach((element) => {
    const svgCode = element.textContent;
    if (svgCode !== null) {
      element.innerHTML = svgCode;
    }
  });
}

/**
 * Gère le comportement de la navbar au scroll
 * La navbar se déplace vers le haut de 5rem au scroll down
 * et reprend sa position initiale au scroll up
 */
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
