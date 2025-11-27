// Tarteaucitron + GTM setup avec style compact noir/blanc et fallback
(function () {
  // Forcer les assets locaux et la langue FR
  window.tarteaucitronForceCDN = "./";
  window.tarteaucitronForceLanguage = "fr";

  if (typeof tarteaucitron === "undefined") {
    console.error("tarteaucitron.js introuvable au moment de l'init.");
    return;
  }

  tarteaucitron.init({
    privacyUrl: "mentions.html",
    hashtag: "#tarteaucitron",
    cookieName: "tarteaucitron",
    orientation: "bottom",
    showAlertSmall: false,
    showIcon: false,
    cookieslist: true,
    adblocker: false,
    AcceptAllCta: true,
    DenyAllCta: true,
    highPrivacy: true,
    handleBrowserDNTRequest: false,
    removeCredit: true,
    moreInfoLink: true,
    mandatory: true
  });

  // GTM (conteneur GTM-MGRWS6HP; pensez à publier GA4 dans GTM)
  tarteaucitron.user.googletagmanagerId = "GTM-MGRWS6HP";
  (tarteaucitron.job = tarteaucitron.job || []).push("googletagmanager");

  // Fermer la bannière après action (même si cookie bloqué)
  const forceCloseOnChoice = () => {
    setTimeout(() => {
      if (tarteaucitron?.userInterface?.closeAlert) {
        tarteaucitron.userInterface.closeAlert();
      }
    }, 120);
  };

  const bindButtons = (attempt = 0) => {
    let allBound = true;
    ["tarteaucitronAcceptAll", "tarteaucitronDenyAll", "tarteaucitronPersonalize"].forEach((id) => {
      const btn = document.getElementById(id);
      if (btn && !btn.dataset.tacBound) {
        btn.dataset.tacBound = "1";
        btn.addEventListener("click", forceCloseOnChoice);
      }
      if (!btn) allBound = false;
    });
    if (!allBound && attempt < 20) {
      setTimeout(() => bindButtons(attempt + 1), 150);
    }
  };
  window.addEventListener("tac.open_alert", () => setTimeout(bindButtons, 50));
  setTimeout(bindButtons, 400);

  // Style compact noir & blanc
  const style = document.createElement("style");
  style.textContent = `
    #tarteaucitronRoot { font-family: 'Inter','Segoe UI',sans-serif; }
    #tarteaucitronAlertBig {
      max-width: 360px;
      width: calc(100% - 32px);
      left: 16px;
      right: auto;
      bottom: 16px;
      background: #0f0f0f;
      color: #f5f5f5;
      border-radius: 12px;
      box-shadow: 0 12px 40px rgba(0,0,0,0.45);
      padding: 16px 16px 14px;
    }
    #tarteaucitronAlertBig #tarteaucitronDisclaimerAlert { margin: 0 0 12px; font-size: 14px; line-height: 1.45; }
    #tarteaucitronAlertBig #tarteaucitronPrivacyUrl { margin-bottom: 10px; font-size: 12px; }
    #tarteaucitronAlertBig button,
    #tarteaucitronAlertBig button#tarteaucitronAcceptAll,
    #tarteaucitronAlertBig button#tarteaucitronDenyAll,
    #tarteaucitronAlertBig button#tarteaucitronPersonalize {
      border-radius: 10px !important;
      border: 1px solid #2a2a2a !important;
      padding: 10px 14px !important;
      font-weight: 600 !important;
      font-size: 13px !important;
      cursor: pointer !important;
      transition: transform 0.08s ease, background 0.12s ease, color 0.12s ease, border-color 0.12s ease !important;
    }
    #tarteaucitronAlertBig button#tarteaucitronAcceptAll {
      background: #0f0f0f !important;
      color: #f5f5f5 !important;
      border-color: #f5f5f5 !important;
      margin-right: 8px !important;
    }
    #tarteaucitronAlertBig button#tarteaucitronDenyAll {
      background: transparent !important;
      color: #f5f5f5 !important;
      border-color: #f5f5f5 !important;
    }
    #tarteaucitronAlertBig button#tarteaucitronPersonalize {
      background: #1a1a1a !important;
      color: #f5f5f5 !important;
      border-color: #2a2a2a !important;
      margin-right: 8px !important;
    }
    #tarteaucitronAlertBig button:hover { transform: translateY(-1px) !important; border-color: #777 !important; }
    #tarteaucitronAlertBig #tarteaucitronCloseAlert { display: none; }
  `;
  document.head.appendChild(style);

  // Fallback : forcer l'ouverture si pas de cookie et bannière masquée
  setTimeout(() => {
    const hasConsentCookie = document.cookie.indexOf("tarteaucitron=") !== -1;
    const alert = document.getElementById("tarteaucitronAlertBig");
    if (!hasConsentCookie && alert && alert.style.display === "none" && tarteaucitron?.userInterface?.openAlert) {
      tarteaucitron.userInterface.openAlert();
    }
  }, 800);
})();
