import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Fonction helper pour animer les features dans une timeline
 */
/*function animateFeaturesInTimeline(timeline: gsap.core.Timeline): void {
  const featuresList = document.querySelector<HTMLElement>('.features_list-flex');

  if (!featuresList) {
    return;
  }

  // Trouver tous les enfants directs de features_list-flex
  const featureItems = Array.from(featuresList.children) as HTMLElement[];

  if (featureItems.length === 0) {
    return;
  }

  // Initialiser l'état de départ : opacité 0
  featureItems.forEach((item) => {
    gsap.set(item, {
      opacity: 0,
    });
  });

  // Ajouter les animations à la timeline
  featureItems.forEach((item, index) => {
    timeline.to(
      item,
      {
        opacity: 1,
        duration: 0.6, // Durée augmentée pour une animation plus lente
        ease: 'power2.out',
      },
      index * 0.15 // Délai augmenté à 0.15s entre chaque item
    );
  });
}*/

// Animates the features list items when the features section enters the viewport.
/*export function initFeaturesAnimation(): void {
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
    });
  });

  // Créer une animation séquentielle avec ScrollTrigger
  ScrollTrigger.create({
    trigger: featuresContent,
    start: 'top 20%', // Déclenche quand le haut de features_content atteint 20% du viewport
    onEnter: () => {
      // Créer une timeline pour animer les items séquentiellement
      const tl = gsap.timeline();
      animateFeaturesInTimeline(tl);
    },
    once: true, // Ne s'exécute qu'une seule fois
  });
}*/

// Animates the logo grid items row by row when the logo section enters the viewport.
/*export function initLogoGridAnimation(): void {
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
}*/

// Animates the features section: heading letters, intro text, then feature items.
/*export function initFeaturesSectionAnimation(): void {
  const sectionFeatures = document.querySelector<HTMLElement>('.section_features');
  const featuresHeading = document.getElementById('features-heading');
  const featuresText = document.getElementById('features-txt');
  const featuresList = document.querySelector<HTMLElement>('.features_list-flex');

  if (!sectionFeatures || !featuresHeading) {
    return;
  }

  // Prepare heading text for "moving letters" animation without breaking words across lines
  const headingLetterElements = prepareHeadingLetters(featuresHeading);
  if (headingLetterElements.length === 0) {
    return;
  }

  // Initial heading state
  headingLetterElements.forEach((letter) => {
    gsap.set(letter, {
      opacity: 0,
      y: 100,
      rotationX: -90,
    });
  });

  // Prepare intro text lines if present
  const textLineElements = featuresText ? prepareTextLines(featuresText) : [];

  // Prepare feature items if present
  const featureItems =
    featuresList && featuresList.children.length > 0
      ? (Array.from(featuresList.children) as HTMLElement[])
      : [];

  featureItems.forEach((item) => {
    gsap.set(item, {
      opacity: 0,
    });
  });

  ScrollTrigger.create({
    trigger: sectionFeatures,
    start: 'top 80%',
    onEnter: () => {
      const tl = gsap.timeline();

      // 1. Heading letters
      headingLetterElements.forEach((letter, index) => {
        tl.to(
          letter,
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.4,
            ease: 'back.out(1.7)',
          },
          index * 0.03
        );
      });

      const headingDuration = headingLetterElements.length * 0.03 + 0.4;

      // 2. Intro text lines
      let textTotalDuration = 0;
      if (textLineElements.length > 0) {
        textLineElements.forEach((line, index) => {
          const lineDelay = headingDuration + index * 0.4;
          tl.to(
            line,
            {
              clipPath: 'inset(0 0% 0 0)',
              duration: 1.2,
              ease: 'power2.out',
            },
            lineDelay
          );
          textTotalDuration = lineDelay + 1.2;
        });
      } else {
        textTotalDuration = headingDuration;
      }

      // 3. Feature items (start slightly before the end of the intro text)
      if (featureItems.length > 0) {
        featureItems.forEach((item, index) => {
          tl.to(
            item,
            {
              opacity: 1,
              duration: 0.6,
              ease: 'power2.out',
            },
            // Start a bit before textTotalDuration for a snappier transition
            textTotalDuration - 2 + index * 0.2
          );
        });
      }
    },
    once: true,
  });
}*/

// Splits block text into lines and wraps each line in a div with a clip-path for line-by-line reveal.
/*function prepareTextLines(element: HTMLElement): HTMLElement[] {
  // Use innerText so we get the same visible spaces/line breaks as the browser renders,
  // then normalise all whitespace (spaces, newlines, tabs, etc.) to a single space.
  const originalText = (element as HTMLElement).innerText || '';
  const normalizedText = originalText.replace(/\s+/g, ' ').trim();
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

  // Diviser le texte normalisé en "mots" pour construire les lignes
  const words = normalizedText.length ? normalizedText.split(' ') : [];
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
}*/

// Splits a heading into word-wrapped animated letter spans so letters of a word never wrap onto a new line.
/*function prepareHeadingLetters(element: HTMLElement): HTMLElement[] {
  const originalText = element.textContent || '';
  const trimmed = originalText.trim();

  if (!trimmed) {
    return [];
  }

  // Clear existing content
  element.innerHTML = '';

  const lettersContainer = document.createElement('span');
  lettersContainer.className = 'letters-container';
  lettersContainer.style.display = 'inline-block';

  const letterElements: HTMLElement[] = [];
  const words = trimmed.split(/\s+/);

  words.forEach((word, wordIndex) => {
    const wordSpan = document.createElement('span');
    wordSpan.className = 'letters-word';
    wordSpan.style.display = 'inline-block';
    if (wordIndex < words.length - 1) {
      // Maintain space between words
      wordSpan.style.marginRight = '0.25em';
    }

    for (let i = 0; i < word.length; i += 1) {
      const char = word[i];
      const letterSpan = document.createElement('span');
      letterSpan.className = 'letter';
      letterSpan.style.display = 'inline-block';
      letterSpan.textContent = char;
      wordSpan.appendChild(letterSpan);
      letterElements.push(letterSpan);
    }

    lettersContainer.appendChild(wordSpan);
  });

  element.appendChild(lettersContainer);

  return letterElements;
}*/

// Reveals the about paragraph line by line and then fades in the about button.
/*export function initAboutTextAnimation(): void {
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
}*/

// Reveals the features intro text line by line
/*export function initFeaturesTextAnimation(): void {
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
}*/

// Applies the "moving letters" effect to all h2 elements on the page.
/*export function initMovingLettersAnimation(): void {
  const headings = document.querySelectorAll<HTMLElement>('h2');

  if (headings.length === 0) {
    return;
  }

  headings.forEach((heading) => {
    const letterElements = prepareHeadingLetters(heading);
    if (letterElements.length === 0) {
      return;
    }

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
}*/

// Animates logo heading letters, features, then fades in the logo button in the logo section.
/*export function initLogoSectionAnimation(): void {
  const sectionLogo = document.querySelector<HTMLElement>('.section_logo');
  const logoH2 = document.getElementById('logo-h2');
  const logoBtn = document.getElementById('logo-btn');

  if (!sectionLogo || !logoH2) {
    return;
  }

  // Initialiser logo-btn avec opacity 0
  if (logoBtn) {
    gsap.set(logoBtn, {
      opacity: 0,
    });
  }

  // Initialiser les features avec opacity 0 dès le début
  const featuresList = document.querySelector<HTMLElement>('.features_list-flex');
  if (featuresList) {
    const featureItems = Array.from(featuresList.children) as HTMLElement[];
    featureItems.forEach((item) => {
      gsap.set(item, {
        opacity: 0,
      });
    });
  }

  // Prepare "moving letters" for logo-h2 without breaking words across lines
  const letterElements = prepareHeadingLetters(logoH2);
  if (letterElements.length === 0) {
    return;
  }

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
    trigger: sectionLogo,
    start: 'top 80%',
    onEnter: () => {
      // Timeline principale pour toute la séquence
      const mainTl = gsap.timeline();

      // 1. Animation Moving Letters sur logo-h2
      letterElements.forEach((letter, index) => {
        mainTl.to(
          letter,
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.4,
            ease: 'back.out(1.7)',
          },
          index * 0.03
        );
      });

      // Calculer la durée totale de l'animation du h2
      const h2Duration = letterElements.length * 0.03 + 0.4;

      // 2. Animation des features (après l'animation du h2)
      if (featuresList) {
        const featureItems = Array.from(featuresList.children) as HTMLElement[];

        // Ajouter les animations à la timeline après l'animation du h2
        featureItems.forEach((item, index) => {
          mainTl.to(
            item,
            {
              opacity: 1,
              duration: 0.6,
              ease: 'power2.out',
            },
            h2Duration + index * 0.15 // Commencer après l'animation du h2
          );
        });

        // Calculer la durée totale de l'animation des features
        const featuresDuration = featureItems.length * 0.15 + 0.6;

        // 3. FadeIn du bouton logo-btn (pendant l'animation des features pour un enchaînement plus rapide)
        if (logoBtn) {
          mainTl.to(
            logoBtn,
            {
              opacity: 1,
              duration: 0.3, // Durée réduite pour une apparition plus rapide
              ease: 'power2.out',
            },
            h2Duration + featuresDuration - 1.5 // Commence beaucoup plus tôt pendant l'animation des features
          );
        }
      } else if (logoBtn) {
        // Si pas de features, afficher le bouton pendant l'animation du h2
        mainTl.to(
          logoBtn,
          {
            opacity: 1,
            duration: 0.5, // Durée réduite pour une apparition plus rapide
            ease: 'power2.out',
          },
          h2Duration - 0.5 // Commence pendant l'animation du h2
        );
      }
    },
    once: true,
  });
}*/

// Animates the HP gallery heading letters
/*export function initHpGalleryHeadingAnimation(): void {
  const sectionHpGallery = document.querySelector<HTMLElement>('.section_hp-galery');
  const hpGalleryHeading = document.getElementById('hp-galery-heading');

  if (!sectionHpGallery || !hpGalleryHeading) {
    return;
  }

  const letterElements = prepareHeadingLetters(hpGalleryHeading);
  if (letterElements.length === 0) {
    return;
  }

  // État de départ : lettres masquées avec translation
  letterElements.forEach((letter) => {
    gsap.set(letter, {
      opacity: 0,
      y: 100,
      rotationX: -90,
    });
  });

  // Animation déclenchée à l'entrée de section_hp-galery dans le viewport
  ScrollTrigger.create({
    trigger: sectionHpGallery,
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
            duration: 0.4,
            ease: 'back.out(1.7)',
          },
          index * 0.03
        );
      });
    },
    once: true,
  });
}*/

// Creates a 3x3 clipPath reveal effect on the landscape image
export function initLandscapeImageMaskAnimation(): void {
  const sectionLandscape = document.querySelector<HTMLElement>('.section_landscape');
  const landscapeImg = document.getElementById('landscape-img') as HTMLImageElement | null;

  if (!sectionLandscape || !landscapeImg) {
    return;
  }

  const wrapper = landscapeImg.parentElement as HTMLElement | null;
  if (!wrapper) {
    return;
  }

  // Ensure wrapper can host overlay masks
  if (!wrapper.style.position) {
    wrapper.style.position = 'relative';
  }
  if (!wrapper.style.display) {
    wrapper.style.display = 'grid';
  }
  if (!wrapper.style.overflow) {
    wrapper.style.overflow = 'hidden';
  }

  // Hide the base image so the reveal effect is clearly visible
  landscapeImg.style.opacity = '0';

  // Clip path definitions (3x3 grid)
  const initialClipPaths = [
    'polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)',
    'polygon(33.33% 0%, 33.33% 0%, 33.33% 0%, 33.33% 0%)',
    'polygon(66.66% 0%, 66.66% 0%, 66.66% 0%, 66.66% 0%)',
    'polygon(0% 33.33%, 0% 33.33%, 0% 33.33%, 0% 33.33%)',
    'polygon(33.33% 33.33%, 33.33% 33.33%, 33.33% 33.33%, 33.33% 33.33%)',
    'polygon(66.66% 33.33%, 66.66% 33.33%, 66.66% 33.33%, 66.66% 33.33%)',
    'polygon(0% 66.66%, 0% 66.66%, 0% 66.66%, 0% 66.66%)',
    'polygon(33.33% 66.66%, 33.33% 66.66%, 33.33% 66.66%, 33.33% 66.66%)',
    'polygon(66.66% 66.66%, 66.66% 66.66%, 66.66% 66.66%, 66.66% 66.66%)',
  ];

  const finalClipPaths = [
    // ligne 1 - sans espaces, masks qui se touchent
    'polygon(0% 0%, 33.33% 0%, 33.33% 33.33%, 0% 33.33%)',
    'polygon(33.33% 0%, 66.66% 0%, 66.66% 33.33%, 33.33% 33.33%)',
    'polygon(66.66% 0%, 100% 0%, 100% 33.33%, 66.66% 33.33%)',

    // ligne 2 - sans espaces, masks qui se touchent
    'polygon(0% 33.33%, 33.33% 33.33%, 33.33% 66.66%, 0% 66.66%)',
    'polygon(33.33% 33.33%, 66.66% 33.33%, 66.66% 66.66%, 33.33% 66.66%)',
    'polygon(66.66% 33.33%, 100% 33.33%, 100% 66.66%, 66.66% 66.66%)',

    // ligne 3 - sans espaces, masks qui se touchent
    'polygon(0% 66.66%, 33.33% 66.66%, 33.33% 100%, 0% 100%)',
    'polygon(33.33% 66.66%, 66.66% 66.66%, 66.66% 100%, 33.33% 100%)',
    'polygon(66.66% 66.66%, 100% 66.66%, 100% 100%, 66.66% 100%)',
  ];

  // Clean previous masks if any (in case of re-init)
  wrapper.querySelectorAll('.landscape-mask').forEach((el) => el.remove());

  const imgUrl = landscapeImg.src;
  const computedImgStyle = window.getComputedStyle(landscapeImg);

  // Create 9 mask tiles
  for (let i = 0; i < 9; i += 1) {
    const mask = document.createElement('div');
    mask.classList.add('landscape-mask', `m-${i + 1}`);
    mask.style.backgroundImage = `url(${imgUrl})`;
    mask.style.backgroundSize = 'cover';
    mask.style.backgroundPosition = 'center';
    mask.style.borderRadius = computedImgStyle.borderRadius;
    mask.style.gridArea = '1 / 1 / 2 / 2';
    mask.style.width = '100%';
    mask.style.height = '100%';
    mask.style.maxHeight = '100%';
    mask.style.zIndex = '2'; // Above the base image
    wrapper.appendChild(mask);
  }

  const masks = Array.from(wrapper.querySelectorAll<HTMLElement>('.landscape-mask'));

  // Set initial clipPath for each mask
  masks.forEach((mask, index) => {
    gsap.set(mask, {
      clipPath: initialClipPaths[index],
    });
  });

  // Animation order (like the example)
  const animationOrder: string[][] = [
    ['.m-1'],
    ['.m-2', '.m-4'],
    ['.m-3', '.m-5', '.m-7'],
    ['.m-6', '.m-8'],
    ['.m-9'],
  ];

  ScrollTrigger.create({
    trigger: sectionLandscape,
    start: 'top 40%',
    onEnter: () => {
      const tl = gsap.timeline();

      animationOrder.forEach((targets, groupIndex) => {
        const targetElements = targets.flatMap((cls) =>
          Array.from(wrapper.querySelectorAll<HTMLElement>(cls))
        );

        tl.to(
          targetElements,
          {
            clipPath: (_i, el) => {
              const index = masks.indexOf(el as HTMLElement);
              return finalClipPaths[index];
            },
            duration: 1,
            ease: 'power4.out',
            stagger: 0.1,
          },
          groupIndex * 0.125
        );
      });
    },
    once: true,
  });
}
