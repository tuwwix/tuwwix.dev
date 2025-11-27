// Consent and GTM bootstrap (tarteaucitron)
(function () {
  // Force local assets and language for dev/prod consistency
  window.tarteaucitronForceCDN = "./";
  window.tarteaucitronForceLanguage = "fr";

  const MAX_TRIES = 40; // ~10s
  let tries = 0;

  const initConsent = () => {
    const tac = window.tarteaucitron;
    if (!tac) {
      if (tries >= MAX_TRIES) {
        console.warn("tarteaucitron not available after waiting.");
        return;
      }
      tries += 1;
      setTimeout(initConsent, 250);
      return;
    }

    tac.init({
      privacyUrl: "",
      hashtag: "#tarteaucitron",
      cookieName: "tarteaucitron",
      orientation: "bottom",
      showAlertSmall: false, // supprime le widget "Gestion des services"
      showIcon: false,       // pas d'icône flottante
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

    tac.user.gtmId = "GTM-MGRWS6HP";
    tac.job = tac.job || [];
    tac.job.push("gtm");
  };

  if (document.readyState === "complete") {
    initConsent();
  } else {
    window.addEventListener("load", initConsent);
  }
})();
