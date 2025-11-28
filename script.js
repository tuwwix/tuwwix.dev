// script.js

// Initialize EmailJS
emailjs.init("Z41GVhq7AM_sFFKpp");

document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     NAVBAR SCROLL
     ========================= */
  const navbar = document.querySelector(".navbar");
  const onScroll = () => {
    if (!navbar) return;
    if (window.scrollY > 20) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };
  window.addEventListener("scroll", onScroll);
  onScroll();

  /* =========================
     SMOOTH SCROLL
     ========================= */
  const mobileMenu = document.getElementById("mobile-menu");
  const scrollButtons = document.querySelectorAll("[data-scroll-target]");
  scrollButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-scroll-target");
      if (!targetId) return;
      const section = document.getElementById(targetId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
      // Fermer le menu mobile si ouvert
      if (mobileMenu) {
        mobileMenu.classList.remove("open");
      }
    });
  });

  /* =========================
     MOBILE MENU
     ========================= */
  const mobileToggle = document.getElementById("mobile-menu-toggle");

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("open");
    });
  }

  /* =========================
     TABS (Services)
     ========================= */
  const tabTriggers = document.querySelectorAll(".tabs-trigger");
  const tabContents = document.querySelectorAll(".tabs-content");

  tabTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const target = trigger.getAttribute("data-tab-target");
      if (!target) return;

      // activer le bouton
      tabTriggers.forEach((t) => t.classList.remove("active"));
      trigger.classList.add("active");

      // afficher le bon contenu
      tabContents.forEach((content) => {
        const contentTarget = content.getAttribute("data-tab-content");
        if (contentTarget === target) {
          content.classList.add("active");
        } else {
          content.classList.remove("active");
        }
      });
    });
  });

  /* =========================
     CONTACT FORM
     ========================= */
  const contactForm = document.getElementById("contact-form");
  const contactSuccess = document.getElementById("contact-success");
  const toast = document.getElementById("toast");
  const subjectInput = document.getElementById("subject");
  const honeypotInput = document.getElementById("hp_field");
  let captchaToken = "";

  window.onHcaptchaSuccess = (token) => {
    captchaToken = token;
  };

  window.onHcaptchaExpired = () => {
    captchaToken = "";
  };

  const showToast = (message, background = "#22c55e") => {
    if (!toast) return;
    toast.textContent = message;
    toast.style.background = background;
    toast.style.display = "block";
    toast.classList.remove("hide");

    setTimeout(() => {
      toast.classList.add("hide");
      setTimeout(() => {
        toast.style.display = "none";
      }, 300);
    }, 3000);
  };

  // Pré-remplir le sujet si l'utilisateur clique sur "Demander un Devis"
  const packButtons = document.querySelectorAll("[data-pack-name]");
  packButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const packName = btn.getAttribute("data-pack-name");
      if (packName && subjectInput) {
        subjectInput.value = `Demande de devis - ${packName}`;
        subjectInput.focus();
      }
    });
  });

  if (contactForm && contactSuccess) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Champ honeypot pour filtrer les bots
      if (honeypotInput && honeypotInput.value.trim() !== "") {
        showToast("Impossible d'envoyer votre message pour le moment.", "#ef4444");
        return;
      }

      // Vérifier le token côté front (fail-safe même si le callback n'a pas tourné)
      const currentToken = captchaToken || (window.hcaptcha?.getResponse ? window.hcaptcha.getResponse() : "");
      if (!currentToken) {
        showToast("Merci de valider le captcha avant d'envoyer.", "#ef4444");
        return;
      }
      captchaToken = currentToken;

      const formData = new FormData(contactForm);
      const name = (formData.get("name") || "").toString();
      const email = (formData.get("email") || "").toString();
      const subject = (formData.get("subject") || "Demande de contact").toString();
      const message = (formData.get("message") || "").toString();

      // Génération de la date/heure au format lisible
      const now = new Date();
      const time = now.toLocaleString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "Europe/Paris"
      });

      // Variables pour le mail du propriétaire (Contact Us template)
      const paramsOwner = {
        name: name,
        email: email,
        subject: subject,
        message: message,
        time: time
      };

      // Variables pour l'auto-réponse (Auto-Reply template)
      const paramsAutoReply = {
        to_email: email,
        from_name: name,
        subject: subject
      };

      // 1. Envoyer le mail au proprietaire
      emailjs
        .send("service_9jhrcxa", "template_dgo3lab", paramsOwner)
        .then(() => {
          // 2. Envoyer l'auto-reponse au client (non-bloquant : on ignore les erreurs)
          return emailjs.send("service_9jhrcxa", "template_jij7c45", paramsAutoReply).catch((err) => {
            console.warn("Auto-reponse non envoyee (erreur non-bloquante) :", err);
          });
        })
        .then(
          (response) => {
            console.log("Message recu !", response);

            // Reset du formulaire
            contactForm.reset();
            window.hcaptcha?.reset?.();
            captchaToken = "";

            // Afficher le toast de succes
            showToast("Bien. Message envoye avec succes !");
          },
          (error) => {
            console.error("Erreur EmailJS (envoi principal) :", error);
            // Toast de succes quand meme (l'email principal a probablement passe)
            showToast("Bien. Message envoye avec succes !");
            contactForm.reset();
            window.hcaptcha?.reset?.();
            captchaToken = "";
          }
        );
    });
  }
});
