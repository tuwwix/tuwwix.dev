// script.js

// Initialize EmailJS (guarded in case the library failed to load)
if (typeof emailjs !== "undefined" && typeof emailjs.init === "function") {
  emailjs.init("Z41GVhq7AM_sFFKpp");
} else {
  console.warn("EmailJS library not loaded — les envois d'email côté client seront indisponibles.");
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("script.js: DOMContentLoaded — initialisation des handlers");
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
      console.log("nav click ->", targetId, btn);
      if (!targetId) return;
      const section = document.getElementById(targetId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      } else {
        console.warn("Section cible introuvable pour :", targetId);
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

  if (contactForm && contactSuccess) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const name = (formData.get("name") || "").toString();
      const email = (formData.get("email") || "").toString();
      const subject = (formData.get("subject") || "Demande de contact").toString();
      const message = (formData.get("message") || "").toString();

      // Envoyer via EmailJS
      if (typeof emailjs === 'undefined' || typeof emailjs.send !== 'function') {
        console.error('Impossible d\'envoyer : EmailJS non chargé.');
        alert("Le service d'envoi est actuellement indisponible. Réessayez plus tard.");
        return;
      }

      emailjs.send("service_9jhrcxa", "template_3ice70q", {
        to_email: "tom.dev.eadl@gmail.com",
        from_name: name,
        from_email: email,
        subject: subject,
        message: message
      }).then(
        (response) => {
          console.log("Email envoyé avec succès !", response);
          
          // Reset du formulaire
          contactForm.reset();
          
          // Afficher le toast
          if (toast) {
            toast.style.display = "block";
            toast.classList.remove("hide");
            
            // Masquer après 3 secondes
            setTimeout(() => {
              toast.classList.add("hide");
              setTimeout(() => {
                toast.style.display = "none";
              }, 300);
            }, 3000);
          }
        },
        (error) => {
          console.error("Erreur EmailJS :", error);
          alert("Erreur lors de l'envoi : " + JSON.stringify(error));
        }
      );
    });
  }
});
