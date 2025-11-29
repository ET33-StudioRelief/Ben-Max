import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initFeaturesAnimation(): void {
  const featuresContent = document.querySelector<HTMLElement>('.features_content');
  const featuresList = document.querySelector<HTMLElement>('.features_list-flex');

  if (!featuresContent || !featuresList) {
    return;
  }

  // Trouver tous les enfants directs de features_list-flex
  const featureItems = Array.from(featuresList.children) as HTMLElement[];

  if (featureItems.length === 0) {
    return;
  }

  // Initialiser l'état de départ : opacité 0 et translateY pour un effet d'apparition
  featureItems.forEach((item) => {
    gsap.set(item, {
      opacity: 0,
      y: 30, // Légère translation vers le bas
    });
  });

  // Créer une animation séquentielle avec ScrollTrigger
  ScrollTrigger.create({
    trigger: featuresContent,
    start: 'top 20%', // Déclenche quand le haut de features_content atteint 20% du viewport
    onEnter: () => {
      // Créer une timeline pour animer les items séquentiellement
      const tl = gsap.timeline();

      featureItems.forEach((item, index) => {
        tl.to(
          item,
          {
            opacity: 1,
            y: 0,
            duration: 0.9, // Durée augmentée pour une animation plus lente
            ease: 'power2.out',
          },
          index * 0.15 // Délai augmenté à 0.15s entre chaque item
        );
      });
    },
    once: true, // Ne s'exécute qu'une seule fois
  });
}

export function initLogoGridAnimation(): void {
  const sectionLogo = document.querySelector<HTMLElement>('.section_logo');
  const logoGrid = document.querySelector<HTMLElement>('.logo_grid');

  if (!sectionLogo || !logoGrid) {
    return;
  }

  // Trouver tous les enfants directs de logo_grid
  const logoItems = Array.from(logoGrid.children) as HTMLElement[];

  if (logoItems.length === 0) {
    return;
  }

  // Fonction pour calculer le nombre d'items par ligne selon la largeur d'écran
  const getItemsPerRow = (): number => {
    const width = window.innerWidth;
    if (width <= 479) {
      return 2; // Mobile : 2 colonnes
    }
    if (width <= 767) {
      return 3; // Tablette : 3 colonnes
    }
    return 5; // Desktop : 5 colonnes
  };

  // Fonction pour diviser les items en lignes
  const getRows = (items: HTMLElement[], itemsPerRow: number): HTMLElement[][] => {
    const rows: HTMLElement[][] = [];
    for (let i = 0; i < items.length; i += itemsPerRow) {
      const row = items.slice(i, i + itemsPerRow);
      rows.push(row);
    }
    return rows;
  };

  // Initialiser immédiatement l'état de départ : opacité 0 pour l'effet fadeIn
  logoItems.forEach((item) => {
    gsap.set(item, {
      opacity: 0,
      force3D: true, // Forcer le rendu GPU pour de meilleures performances
    });
  });

  // Créer une animation avec ScrollTrigger
  ScrollTrigger.create({
    trigger: sectionLogo,
    start: 'top 80%', // Déclenche quand le haut de section_logo atteint 80% du viewport
    onEnter: () => {
      const itemsPerRow = getItemsPerRow();
      const rows = getRows(logoItems, itemsPerRow);

      // Créer une timeline pour animer ligne par ligne
      const tl = gsap.timeline();

      rows.forEach((row, rowIndex) => {
        // Animer de gauche vers la droite dans l'ordre naturel
        row.forEach((item, itemIndex) => {
          // Position dans la timeline : ligne * délai entre lignes + position dans la ligne
          const delay = rowIndex * 0.3 + itemIndex * 0.1;

          tl.to(
            item,
            {
              opacity: 1, // FadeIn smooth
              duration: 1.2, // Durée plus longue pour un effet plus doux
              ease: 'sine.out', // Easing plus smooth
              force3D: true, // Forcer le rendu GPU
            },
            delay
          );
        });
      });
    },
    once: true, // Ne s'exécute qu'une seule fois
  });
}

/**
 * Fonction réutilisable pour préparer un texte en lignes avec clip-path
 * Retourne les éléments de ligne créés
 */
function prepareTextLines(element: HTMLElement): HTMLElement[] {
  // Sauvegarder le texte original et les styles
  const originalText = element.textContent || '';
  const computedStyle = window.getComputedStyle(element);
  const textWidth = element.offsetWidth;

  // Créer un élément temporaire pour mesurer les lignes
  const tempDiv = document.createElement('div');
  tempDiv.style.position = 'absolute';
  tempDiv.style.visibility = 'hidden';
  tempDiv.style.width = `${textWidth}px`;
  tempDiv.style.fontSize = computedStyle.fontSize;
  tempDiv.style.fontFamily = computedStyle.fontFamily;
  tempDiv.style.fontWeight = computedStyle.fontWeight;
  tempDiv.style.lineHeight = computedStyle.lineHeight;
  tempDiv.style.letterSpacing = computedStyle.letterSpacing;
  document.body.appendChild(tempDiv);

  // Diviser le texte en lignes
  const words = originalText.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  words.forEach((word) => {
    const testLine = currentLine + (currentLine ? ' ' : '') + word;
    tempDiv.textContent = testLine;
    const lineHeight =
      parseFloat(computedStyle.lineHeight) || parseFloat(computedStyle.fontSize) * 1.2;

    if (tempDiv.offsetHeight > lineHeight * 1.1 && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  });

  if (currentLine) {
    lines.push(currentLine);
  }

  document.body.removeChild(tempDiv);

  // Créer les éléments de ligne
  element.innerHTML = '';
  const lineElements: HTMLElement[] = [];

  lines.forEach((lineText) => {
    const lineElement = document.createElement('div');
    lineElement.className = 'line';
    lineElement.style.overflow = 'hidden';
    lineElement.style.display = 'block';
    // Copier les styles de texte de l'élément parent
    lineElement.style.fontSize = computedStyle.fontSize;
    lineElement.style.fontFamily = computedStyle.fontFamily;
    lineElement.style.fontWeight = computedStyle.fontWeight;
    lineElement.style.lineHeight = computedStyle.lineHeight;
    lineElement.style.letterSpacing = computedStyle.letterSpacing;
    lineElement.style.color = computedStyle.color;
    lineElement.style.textAlign = computedStyle.textAlign;
    lineElement.style.textTransform = computedStyle.textTransform;
    lineElement.style.fontStyle = computedStyle.fontStyle;
    lineElement.textContent = lineText;
    element.appendChild(lineElement);
    lineElements.push(lineElement);
  });

  // Initialiser l'état de départ : chaque ligne masquée avec clip-path
  lineElements.forEach((line) => {
    gsap.set(line, {
      clipPath: 'inset(0 100% 0 0)', // Masqué à droite
    });
  });

  return lineElements;
}

/**
 * Anime le texte about_p ligne par ligne avec un effet de révélation
 * Utilise une approche native pour diviser le texte en lignes
 */
export function initAboutTextAnimation(): void {
  const aboutText = document.querySelector<HTMLElement>('.about_p');

  if (!aboutText) {
    return;
  }

  // Préparer les lignes avec la fonction réutilisable
  const lineElements = prepareTextLines(aboutText);

  // Trouver le bouton about-button et l'initialiser comme masqué
  const aboutButton = document.getElementById('about-button');
  if (aboutButton) {
    gsap.set(aboutButton, {
      opacity: 0,
    });
  }

  // Créer une animation avec ScrollTrigger
  ScrollTrigger.create({
    trigger: aboutText,
    start: 'top 80%',
    onEnter: () => {
      const tl = gsap.timeline();

      lineElements.forEach((line, index) => {
        tl.to(
          line,
          {
            clipPath: 'inset(0 0% 0 0)', // Révélé complètement
            duration: 1.2, // Durée plus longue pour chaque ligne
            ease: 'power2.out',
          },
          index * 0.4 // Délai de 0.4s entre chaque ligne pour que chaque ligne soit bien visible
        );
      });

      // Afficher le bouton avec un léger chevauchement pour un enchaînement plus rapide
      if (aboutButton) {
        const lastLineDelay = (lineElements.length - 1) * 0.4;
        const lastLineDuration = 1.2;
        // Commencer l'animation du bouton 0.3s avant la fin de la dernière ligne
        tl.to(
          aboutButton,
          {
            opacity: 1,
            duration: 0.2, // Durée réduite pour un enchaînement plus rapide
            ease: 'power2.out',
          },
          lastLineDelay + lastLineDuration - 0.3 // Chevauchement de 0.3s
        );
      }
    },
    once: true,
  });
}

/**
 * Fonction réutilisable pour animer un texte ligne par ligne avec clip-path
 */
/**
 * Anime le texte features-txt ligne par ligne avec le même effet que about_p
 */
export function initFeaturesTextAnimation(): void {
  const featuresText = document.getElementById('features-txt');

  if (!featuresText) {
    return;
  }

  // Préparer les lignes avec la fonction réutilisable
  const lineElements = prepareTextLines(featuresText);

  // Créer une animation avec ScrollTrigger
  ScrollTrigger.create({
    trigger: featuresText,
    start: 'top 80%',
    onEnter: () => {
      const tl = gsap.timeline();

      lineElements.forEach((line, index) => {
        tl.to(
          line,
          {
            clipPath: 'inset(0 0% 0 0)', // Révélé complètement
            duration: 1.2, // Durée plus longue pour chaque ligne
            ease: 'power2.out',
          },
          index * 0.4 // Délai de 0.4s entre chaque ligne pour que chaque ligne soit bien visible
        );
      });
    },
    once: true,
  });
}

/**
 * Applique l'animation "Moving Letters" à tous les h2 du site
 * Inspiré de https://tobiasahlin.com/moving-letters/#2
 */
export function initMovingLettersAnimation(): void {
  const headings = document.querySelectorAll<HTMLElement>('h2');

  if (headings.length === 0) {
    return;
  }

  headings.forEach((heading) => {
    // Sauvegarder le texte original
    const originalText = heading.textContent || '';
    if (!originalText.trim()) {
      return;
    }

    // Diviser le texte en lettres (en gardant les espaces)
    const letters = originalText.split('').map((char) => {
      if (char === ' ') {
        return '&nbsp;';
      }
      return char;
    });

    // Créer un wrapper pour les lettres
    heading.innerHTML = '';
    const lettersContainer = document.createElement('span');
    lettersContainer.className = 'letters-container';
    lettersContainer.style.display = 'inline-block';

    // Créer un span pour chaque lettre
    const letterElements: HTMLElement[] = [];
    letters.forEach((letter) => {
      const letterSpan = document.createElement('span');
      letterSpan.className = 'letter';
      letterSpan.style.display = 'inline-block';
      letterSpan.innerHTML = letter;
      lettersContainer.appendChild(letterSpan);
      letterElements.push(letterSpan);
    });

    heading.appendChild(lettersContainer);

    // Initialiser l'état de départ : lettres masquées avec translation
    letterElements.forEach((letter) => {
      gsap.set(letter, {
        opacity: 0,
        y: 100, // Translation vers le bas
        rotationX: -90, // Rotation pour l'effet 3D
      });
    });

    // Créer une animation avec ScrollTrigger
    ScrollTrigger.create({
      trigger: heading,
      start: 'top 80%',
      onEnter: () => {
        const tl = gsap.timeline();

        letterElements.forEach((letter, index) => {
          tl.to(
            letter,
            {
              opacity: 1,
              y: 0,
              rotationX: 0,
              duration: 0.4, // Durée réduite pour une animation plus rapide
              ease: 'back.out(1.7)', // Easing avec rebond pour l'effet "moving"
            },
            index * 0.03 // Délai réduit à 0.03s entre chaque lettre
          );
        });
      },
      once: true,
    });
  });
}
