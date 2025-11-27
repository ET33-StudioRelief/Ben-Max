import { gsap } from 'gsap';

/**
 * Initialise l'interaction au clic sur les éléments test_item
 * Au clic, modifie grid-template-columns pour agrandir l'item cliqué
 * et rétrécir les autres
 */
export function initTestItemClick(): void {
  const testWrappers = document.querySelectorAll<HTMLElement>('.test_wrapper');

  if (testWrappers.length === 0) {
    return;
  }

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
    const allItems = Array.from(wrapper.querySelectorAll<HTMLElement>('.test_item'));

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

    let selectedIndex: number | null = null;

    items.forEach((item, index) => {
      item.addEventListener('click', () => {
        // Si on reclique sur l'item déjà sélectionné, on reset
        if (selectedIndex === index) {
          gsap.to(wrapper, {
            gridTemplateColumns: defaultColumns,
            duration: animationConfig.duration,
            ease: animationConfig.ease,
          });
          items.forEach((it) => it.classList.remove('active'));
          selectedIndex = null;
          return;
        }

        // Retirer la classe active de tous les items
        items.forEach((it) => it.classList.remove('active'));

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
}
