// Tarteaucitron + GA4 direct – Rétablissement à un état fonctionnel
(function () {
  // Contexte
  window.tarteaucitronForceCDN = "./";
  window.tarteaucitronForceLanguage = "fr";

  const tac = window.tarteaucitron;
  if (!tac) {
    console.error("tarteaucitron.js introuvable.");
    return;
  }

  // Initialisation
  tac.init({
    privacyUrl: "", 
    hashtag: "#tarteaucitron",
    cookieName: "tarteaucitron",
    orientation: "bottom",
    showAlertSmall: false,
    showIcon: false,
    cookieslist: true,
    adblocker: false,
    AcceptAllCta: true,
    DenyAllCta: true, /* MODIFIÉ : Réactive le bouton "Tout refuser" */
    highPrivacy: true,
    handleBrowserDNTRequest: false,
    removeCredit: true,
    moreInfoLink: false, /* MODIFIÉ : Supprime le lien "En savoir plus" */
    mandatory: true
  });

  // Service GA4
  tac.user.gtagUa = "G-75W6C8YKMX";
  tac.job = tac.job || [];
  tac.job.push("gtag");

  // Injection de style AVEC LES BONS SÉLECTEURS ET LE BON FORMAT DE BOX
  const style = document.createElement("style");
  style.textContent = `
    #tarteaucitronAlertBig {
      /* --- Format de la boîte --- */
      max-width: 380px;
      width: calc(100% - 32px);
      left: 16px;
      right: auto;
      bottom: 16px;
      border-radius: 12px !important;
      box-shadow: 0 12px 40px rgba(0,0,0,0.15) !important;
      padding: 24px !important;
      
      /* --- Couleurs --- */
      background: #ffffff !important;
      color: #0f0f0f !important;
    }
    #tarteaucitronDisclaimerAlert {
      margin-bottom: 20px !important;
    }
    #tarteaucitronPersonalize2,
    #tarteaucitronAllDenied2,
    #tarteaucitronCloseAlert {
      margin-top: 8px !important;
      padding-top: 12px !important;
      padding-bottom: 12px !important;
    }
    #tarteaucitronPersonalize2 { /* ID Correct pour "Tout Accepter" */
      background: #0f0f0f !important;
      color: #ffffff !important;
      border-color: #0f0f0f !important;
    }
    #tarteaucitronAllDenied2 { /* ID Correct pour "Tout Refuser" */
      background: #ffffff !important;
      color: #0f0f0f !important;
      border: 1px solid #0f0f0f !important;
    }
    #tarteaucitronCloseAlert { /* MODIFIÉ : Masque le bouton "Personnaliser" */
      display: none !important;
    }
  `;
  document.head.appendChild(style);
})();