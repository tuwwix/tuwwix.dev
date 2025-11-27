// Tarteaucitron + GA4 direct (sans GTM) – version compacte et simplifiée
(function () {
  // Préparer le contexte
  window.tarteaucitronForceCDN = "./";
  window.tarteaucitronForceLanguage = "fr";

  const tac = window.tarteaucitron;
  if (!tac) {
    console.error("tarteaucitron.js introuvable au moment de l'init.");
    return;
  }

  // Initialisation
  tac.init({
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

  // GA4 direct (gtag) – remplace GTM
  tac.user.gtagUa = "G-75W6C8YKMX";
  tac.job = tac.job || [];
  tac.job.push("gtag");

  // Fallback : rouvrir si pas de cookie et bannière masquée
  setTimeout(() => {
    const hasConsentCookie = document.cookie.indexOf("tarteaucitron=") !== -1;
    const alert = document.getElementById("tarteaucitronAlertBig");
    if (!hasConsentCookie && alert && alert.style.display === "none" && tac?.userInterface?.openAlert) {
      tac.userInterface.openAlert();
    }
  }, 800);
})();
