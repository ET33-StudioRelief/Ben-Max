/**
 * Initialise la modal de contact
 * Au clic sur les éléments avec data-button="contact-modal",
 * affiche la modal avec l'id "contact-modal"
 */
export function initContactModal(): void {
  // Trouver tous les boutons qui ouvrent la modal
  const triggerButtons = document.querySelectorAll<HTMLElement>('[data-button="contact-modal"]');

  // Trouver la modal
  const modal = document.getElementById('contact-modal');

  if (!modal || triggerButtons.length === 0) {
    return;
  }

  // Fonction pour ouvrir la modal
  const openModal = (): void => {
    modal.style.display = 'flex';
    // Désactiver le scroll du body sur desktop (>767px)
    if (window.innerWidth > 767) {
      document.body.classList.add('modal-open');
    }
  };

  // Fonction pour fermer la modal
  const closeModal = (): void => {
    modal.style.display = 'none';
    // Réactiver le scroll du body
    document.body.classList.remove('modal-open');
  };

  // Ajouter les écouteurs d'événements sur chaque bouton
  triggerButtons.forEach((button) => {
    // Gérer le clic
    button.addEventListener('click', (e) => {
      e.stopPropagation(); // Empêcher la propagation pour éviter les conflits
      openModal();
    });

    // Gérer les interactions clavier pour l'accessibilité (Enter et Espace)
    button.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault(); // Empêcher le scroll avec Espace
        e.stopPropagation();
        openModal();
      }
    });
  });

  // Trouver les éléments pour fermer la modal
  const closeButton = document.getElementById('close-modal');
  const modalWrapper = document.getElementById('modal-wrapper');
  const modalForm = document.getElementById('modal-form');

  // Fermer la modal en cliquant sur le bouton de fermeture
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      closeModal();
    });
  }

  // Fermer la modal en cliquant sur modal-wrapper, sauf si le clic est dans modal-form
  // (sauf si c'est sur close-modal qui est géré séparément)
  if (modalWrapper) {
    modalWrapper.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;

      // Si le clic est sur close-modal, ne rien faire (déjà géré ci-dessus)
      if (target.id === 'close-modal' || target.closest('#close-modal')) {
        return;
      }

      // Si le clic est dans modal-form (mais pas sur close-modal), ne pas fermer
      if (modalForm && (target === modalForm || modalForm.contains(target))) {
        return;
      }

      // Sinon, fermer la modal (clic sur le wrapper mais pas sur le formulaire)
      closeModal();
    });
  }

  // Fermer la modal avec la touche Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
      closeModal();
    }
  });
}
