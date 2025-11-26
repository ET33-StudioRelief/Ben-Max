import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Vérifie si un élément est partiellement ou complètement visible dans le viewport
 */
function isInViewport(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  // L'élément est visible si une partie de lui est dans le viewport
  return rect.top < windowHeight && rect.bottom > 0;
}

/**
 * Initialise l'animation d'apparition des items de la galerie
 * Les images visibles au chargement s'animent immédiatement
 * Les autres s'animent au scroll quand elles entrent dans le viewport
 */
export function initGalleryAnimation(): void {
  const gallerySection = document.querySelector<HTMLElement>('.section_gallery');

  if (!gallerySection) {
    return;
  }

  const galleryContent = gallerySection.querySelector<HTMLElement>('.gallery_content');

  if (!galleryContent) {
    return;
  }

  const images = gallerySection.querySelectorAll<HTMLImageElement>('.gallery-item.w-dyn-item img');

  if (images.length === 0) {
    return;
  }

  // Rendre le conteneur visible (opacity: 0 est défini dans Webflow)
  gsap.set(galleryContent, {
    opacity: 1,
  });

  // Séparer les images visibles et non visibles
  const visibleImages: HTMLImageElement[] = [];
  const hiddenImages: HTMLImageElement[] = [];

  // Valeur de translateY par défaut (100px comme dans l'exemple, ou 50px sur mobile)
  const shutterTranslate = window.innerWidth <= 600 ? 50 : 100;

  // Initialiser l'état de toutes les images
  // Exactement comme l'exemple : clip-path: rect(auto auto 0% auto) et translateY(100px)
  images.forEach((img) => {
    gsap.set(img, {
      clipPath: 'rect(auto auto 0% auto)', // 0% visible au début
      y: shutterTranslate, // translateY(100px) au début
    });

    if (isInViewport(img)) {
      visibleImages.push(img);
    } else {
      hiddenImages.push(img);
    }
  });

  // Animer toutes les images visibles en même temps
  // Exactement comme l'exemple : 1s avec cubic-bezier(0.77, 0, 0.175, 1)
  if (visibleImages.length > 0) {
    const tl = gsap.timeline({ delay: 0.3 });
    visibleImages.forEach((img) => {
      tl.to(
        img,
        {
          clipPath: 'rect(auto auto 100% auto)', // 100% visible à la fin
          y: 0, // translateY(0) à la fin
          duration: 1, // 1s comme dans l'exemple
          ease: 'cubic-bezier(0.77, 0, 0.175, 1)', // Même courbe
        },
        0 // Toutes à la position 0 = en même temps
      );
    });
  }

  // Animer les images cachées au scroll
  hiddenImages.forEach((img) => {
    ScrollTrigger.create({
      trigger: img,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(img, {
          clipPath: 'rect(auto auto 100% auto)', // 100% visible
          y: 0, // translateY(0)
          duration: 1, // 1s
          ease: 'cubic-bezier(0.77, 0, 0.175, 1)', // Même courbe
        });
      },
      once: true,
    });
  });

  // Initialiser l'interaction au clic sur les items
  initGalleryClickInteraction(gallerySection);
}

/**
 * Gère l'interaction au clic sur les items de la galerie
 * Colonne de l'item cliqué : scale up + plus de largeur
 * Autres colonnes : scale down + moins de largeur
 */
function initGalleryClickInteraction(gallerySection: HTMLElement): void {
  const items = gallerySection.querySelectorAll<HTMLElement>('.gallery-item.w-dyn-item');
  const gridContainer = gallerySection.querySelector<HTMLElement>('.gallery_content');

  if (items.length === 0 || !gridContainer) {
    return;
  }

  const maxScale = 1.4;
  const minScale = 0.7;
  const animationConfig = {
    duration: 0.6,
    ease: 'power2.out',
  };

  // Gap initial de la grille
  const initialGap = parseFloat(window.getComputedStyle(gridContainer).gap) || 96; // 6rem = 96px par défaut
  // Valeur initiale de grid-template-columns (par ex. "1fr 1fr 1fr 1fr")
  const initialGridTemplateColumns =
    window.getComputedStyle(gridContainer).gridTemplateColumns || '1fr 1fr 1fr 1fr';

  // Détecter la colonne d'un élément dans la grille (1-4)
  const getColumn = (item: HTMLElement): number => {
    const containerRect = gridContainer.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    const itemCenterX = itemRect.left + itemRect.width / 2;
    const columnWidth = containerRect.width / 4;
    const relativeX = itemCenterX - containerRect.left;
    const column = Math.floor(relativeX / columnWidth) + 1;
    return Math.max(1, Math.min(4, column));
  };

  // Calculer les valeurs de grid-template-columns pour une colonne sélectionnée
  const getGridTemplateColumnsForColumn = (column: number): string => {
    // On garde la somme des "fr" à 4 pour rester cohérent avec 4 colonnes
    const selectedColumnSize = 1.7;
    const otherColumnSize = (4 - selectedColumnSize) / 3; // ≈ 0.77

    const columns = ['1fr', '1fr', '1fr', '1fr'];
    columns[column - 1] = `${selectedColumnSize}fr`;

    for (let i = 0; i < 4; i++) {
      if (i !== column - 1) {
        columns[i] = `${otherColumnSize}fr`;
      }
    }

    return columns.join(' ');
  };

  let selectedItem: HTMLElement | null = null;

  const resetAllItems = () => {
    const tl = gsap.timeline();

    // Réinitialiser la grille (gap + colonnes)
    tl.to(
      gridContainer,
      {
        gap: `${initialGap}px`,
        gridTemplateColumns: initialGridTemplateColumns,
        duration: animationConfig.duration,
        ease: animationConfig.ease,
      },
      0
    );

    // Réinitialiser tous les items
    items.forEach((item) => {
      tl.to(
        item,
        {
          scale: 1,
          duration: animationConfig.duration,
          ease: animationConfig.ease,
        },
        0
      );
    });

    selectedItem = null;
  };

  // Gestion du clic sur chaque item
  items.forEach((item) => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();

      // Si on reclique sur l'item déjà sélectionné, on reset
      if (selectedItem === item) {
        resetAllItems();
        return;
      }

      const column = getColumn(item);

      const tl = gsap.timeline();

      // 1. La grille donne plus de place à la colonne sélectionnée
      tl.to(
        gridContainer,
        {
          gridTemplateColumns: getGridTemplateColumnsForColumn(column),
          gap: `${initialGap}px`,
          duration: animationConfig.duration,
          ease: animationConfig.ease,
        },
        0
      );

      // 2. Gérer le scale de chaque item
      items.forEach((other) => {
        let targetScale = 1;
        if (other === item) {
          // Item cliqué : scale up
          targetScale = maxScale;
        } else {
          // Tous les autres items (même colonne ou non) : scale down
          targetScale = minScale;
        }

        tl.to(
          other,
          {
            scale: targetScale,
            duration: animationConfig.duration,
            ease: animationConfig.ease,
          },
          0
        );
      });

      selectedItem = item;
    });
  });

  // Clic en dehors de la galerie : reset
  document.addEventListener('click', (e) => {
    if (!(e.target as HTMLElement).closest('.gallery-item.w-dyn-item') && selectedItem) {
      resetAllItems();
    }
  });
}
