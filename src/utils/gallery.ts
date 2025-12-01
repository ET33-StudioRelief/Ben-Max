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
 * Réorganise automatiquement les items en groupes dans des wrappers
 * @param container - Le conteneur parent (ex: .gallery_content)
 * @param itemsPerRow - Nombre d'items par row (défaut: 4)
 */
function organizeItemsIntoWrappers(container: HTMLElement, itemsPerRow: number = 4): void {
  // Trouver tous les items dans le conteneur (peu importe où ils sont)
  const allItems = Array.from(container.querySelectorAll<HTMLElement>('.gallery_item.w-dyn-item'));

  // Filtrer les items vides
  const isEmptyItem = (item: HTMLElement): boolean => {
    const hasImage = item.querySelector('img') !== null;
    const textContent = item.textContent?.trim();
    const hasText = textContent !== undefined && textContent.length > 0;
    return !hasImage && !hasText;
  };

  const validItems = allItems.filter((item) => !isEmptyItem(item));

  if (validItems.length === 0) {
    return;
  }

  // Trouver le conteneur pour les wrappers (peut être .gallery_content ou un w-dyn-list)
  let wrappersContainer = container.querySelector<HTMLElement>('.gallery_content') || container;

  // Si on trouve des w-dyn-list existants, utiliser le premier comme conteneur
  const existingDynList = container.querySelector<HTMLElement>('.w-dyn-list');
  if (existingDynList && existingDynList.parentElement) {
    wrappersContainer = existingDynList.parentElement;
  }

  // Supprimer les anciens wrappers existants (sauf ceux créés par Webflow qu'on veut garder)
  const existingWrappers = Array.from(
    wrappersContainer.querySelectorAll<HTMLElement>('.gallery_grid')
  );

  // Diviser les items en groupes
  const groups: HTMLElement[][] = [];
  for (let i = 0; i < validItems.length; i += itemsPerRow) {
    groups.push(validItems.slice(i, i + itemsPerRow));
  }

  // Créer ou réutiliser les wrappers
  groups.forEach((group, groupIndex) => {
    let wrapper: HTMLElement;

    // Réutiliser un wrapper existant ou en créer un nouveau
    if (groupIndex < existingWrappers.length) {
      wrapper = existingWrappers[groupIndex];
      // Vider le wrapper existant
      wrapper.innerHTML = '';
    } else {
      // Créer un nouveau wrapper
      wrapper = document.createElement('div');
      wrapper.className = 'gallery_grid w-dyn-items';
      wrapper.setAttribute('role', 'list');
      wrappersContainer.appendChild(wrapper);
    }

    // Ajouter les items au wrapper
    group.forEach((item) => {
      item.setAttribute('role', 'listitem');
      wrapper.appendChild(item);
    });
  });

  // Supprimer les wrappers en trop s'il y en a
  if (existingWrappers.length > groups.length) {
    for (let i = groups.length; i < existingWrappers.length; i++) {
      existingWrappers[i].remove();
    }
  }
}

/**
 * Calcule le nombre d'items par ligne et le gap selon la largeur de l'écran
 * @returns { itemsPerRow: number, gap: string }
 */
function getResponsiveConfig(): { itemsPerRow: number; gap: string } {
  const width = window.innerWidth;

  if (width >= 1300) {
    // Desktop : 4 items par ligne (défaut)
    return { itemsPerRow: 4, gap: '6rem' };
  }
  if (width >= 768) {
    // Tablette : 3 items par ligne avec gap de 2rem
    return { itemsPerRow: 3, gap: '2rem' };
  }
  // Mobile : 2 items par ligne avec gap de 1rem
  return { itemsPerRow: 2, gap: '1rem' };
}

/**
 * Applique le gap aux wrappers de la gallery
 */
function applyGapToWrappers(gap: string): void {
  const wrappers = document.querySelectorAll<HTMLElement>('.gallery_grid');
  wrappers.forEach((wrapper) => {
    // gap between items inside a wrapper
    wrapper.style.gap = gap;
    // vertical spacing between wrapper rows (between .gallery_grid)
    wrapper.style.marginBottom = gap;
  });
}

/**
 * Initialise l'interaction au clic sur les éléments gallery_item
 * Au clic, modifie grid-template-columns pour agrandir l'item cliqué
 * et rétrécir les autres
 */
export function initTestItemClick(): void {
  // Trouver le conteneur parent (peut être .gallery_content ou .section_gallery)
  const container =
    document.querySelector<HTMLElement>('.gallery_content') ||
    document.querySelector<HTMLElement>('.section_gallery') ||
    document.body;

  // Obtenir la configuration responsive
  const config = getResponsiveConfig();

  // Organiser automatiquement les items en wrappers selon la configuration responsive
  organizeItemsIntoWrappers(container, config.itemsPerRow);

  // Appliquer le gap
  applyGapToWrappers(config.gap);

  // Trouver l'élément gallery_content pour l'animation d'apparition
  const galleryContent = document.querySelector<HTMLElement>('.gallery_content');
  if (galleryContent) {
    // Initialiser l'opacité à 0
    gsap.set(galleryContent, {
      opacity: 0,
    });

    // Animer l'apparition de gallery_content
    gsap.to(galleryContent, {
      opacity: 1,
      duration: 0.5,
      ease: 'ease-out',
    });
  }

  // Stocker la configuration actuelle pour détecter les changements
  let currentConfig = getResponsiveConfig();

  // Fonction pour réinitialiser la gallery avec la configuration responsive
  const reinitGallery = (): void => {
    const responsiveConfig = getResponsiveConfig();
    organizeItemsIntoWrappers(container, responsiveConfig.itemsPerRow);
    applyGapToWrappers(responsiveConfig.gap);
    currentConfig = responsiveConfig;

    // Réinitialiser les interactions après réorganisation
    setTimeout(() => {
      initGalleryInteractions();
    }, 100);
  };

  // Gérer le redimensionnement de la fenêtre
  let resizeTimeout: ReturnType<typeof setTimeout>;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const newConfig = getResponsiveConfig();
      // Réinitialiser seulement si la configuration a changé
      if (
        newConfig.itemsPerRow !== currentConfig.itemsPerRow ||
        newConfig.gap !== currentConfig.gap
      ) {
        reinitGallery();
      } else {
        // Sinon, juste mettre à jour le gap au cas où
        applyGapToWrappers(newConfig.gap);
      }
    }, 250);
  });

  // Fonction pour initialiser les interactions de la gallery
  const initGalleryInteractions = (): void => {
    const testWrappers = document.querySelectorAll<HTMLElement>('.gallery_grid');

    if (testWrappers.length === 0) {
      return;
    }

    // Appliquer le gap actuel aux wrappers
    const config = getResponsiveConfig();
    applyGapToWrappers(config.gap);

    const expandedColumn = 'minmax(0, 5fr)';
    const collapsedColumn = 'minmax(0, 0.5fr)';
    const animationConfig = {
      duration: 0.5,
      ease: 'ease-in-out',
    };

    /**
     * Vérifie si un item est vide (généré par Webflow mais sans contenu)
     */
    const isEmptyItem = (item: HTMLElement): boolean => {
      // Vérifier si l'item contient une image
      const hasImage = item.querySelector('img') !== null;
      // Vérifier si l'item a du contenu textuel
      const textContent = item.textContent?.trim();
      const hasText = textContent !== undefined && textContent.length > 0;
      // Un item est vide s'il n'a ni image ni texte
      return !hasImage && !hasText;
    };

    /**
     * Génère les colonnes par défaut pour le grid
     */
    const generateDefaultColumns = (count: number): string => {
      return Array(count).fill('minmax(0, 1fr)').join(' ');
    };

    testWrappers.forEach((wrapper) => {
      const allItems = Array.from(wrapper.querySelectorAll<HTMLElement>('.gallery_item'));

      // Filtrer les items vides générés par Webflow
      const items = allItems.filter((item) => !isEmptyItem(item));

      if (items.length === 0) {
        return; // Pas d'items réels, on skip
      }

      // Générer les colonnes par défaut en fonction du nombre réel d'items
      const defaultColumns = generateDefaultColumns(items.length);

      // S'assurer que grid-template-columns est initialisé
      gsap.set(wrapper, {
        gridTemplateColumns: defaultColumns,
      });

      // Initialiser la hauteur fixe pour tous les items
      const defaultHeight = '17rem';
      items.forEach((it) => {
        it.style.height = defaultHeight;
      });

      // Animation d'apparition avec clip-path pour chaque item
      // Trouver toutes les images dans les items
      const images = items
        .map((item) => item.querySelector<HTMLImageElement>('img'))
        .filter((img): img is HTMLImageElement => img !== null);

      // Animer l'apparition seulement s'il y a des images
      if (images.length > 0) {
        // Valeur de translateY par défaut (100px comme dans l'exemple, ou 50px sur mobile)
        const shutterTranslate = window.innerWidth <= 600 ? 50 : 100;

        // Séparer les images visibles et non visibles
        const visibleImages: HTMLImageElement[] = [];
        const hiddenImages: HTMLImageElement[] = [];

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
      }

      let selectedIndex: number | null = null;

      // Fonction pour mettre height: auto sur tous les items (ignore la hauteur fixe)
      const setAutoHeight = (): void => {
        items.forEach((it) => {
          it.style.height = 'auto';
        });
      };

      items.forEach((item, index) => {
        item.addEventListener('click', () => {
          // Si on reclique sur l'item déjà sélectionné, on reset
          if (selectedIndex === index) {
            // Mettre height: auto pour ignorer la hauteur fixe lors du scaleDown
            setAutoHeight();

            // Créer une timeline pour synchroniser les animations
            const tl = gsap.timeline();

            // Animer le grid-template-columns
            tl.to(wrapper, {
              gridTemplateColumns: defaultColumns,
              duration: animationConfig.duration,
              ease: animationConfig.ease,
            });

            // Animer la restauration de la hauteur fixe en parallèle,
            // en commençant vers la fin de l'animation du grid pour une transition fluide
            items.forEach((it) => {
              tl.to(
                it,
                {
                  height: defaultHeight,
                  duration: animationConfig.duration * 0.8,
                  ease: animationConfig.ease,
                },
                '-=0.3' // Commence 0.3s avant la fin de l'animation du grid
              );
            });

            items.forEach((it) => it.classList.remove('active'));
            selectedIndex = null;
            return;
          }

          // Retirer la classe active de tous les items
          items.forEach((it) => it.classList.remove('active'));

          // Mettre height: auto pour ignorer la hauteur fixe lors du scaleUp
          setAutoHeight();

          // Construire la nouvelle configuration de grid-template-columns
          const columns: string[] = [];
          for (let i = 0; i < items.length; i++) {
            if (i === index) {
              columns.push(expandedColumn);
            } else {
              columns.push(collapsedColumn);
            }
          }

          // Utiliser requestAnimationFrame pour synchroniser les animations
          requestAnimationFrame(() => {
            // Ajouter la classe active à l'item cliqué
            item.classList.add('active');

            gsap.to(wrapper, {
              gridTemplateColumns: columns.join(' '),
              duration: animationConfig.duration,
              ease: animationConfig.ease,
            });
          });

          selectedIndex = index;
        });
      });
    });
  };

  // Initialiser les interactions au démarrage
  initGalleryInteractions();
}
