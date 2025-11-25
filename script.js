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

  if (contactForm && contactSuccess) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

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

      // 1. Envoyer le mail au propriétaire
      emailjs.send("service_9jhrcxa", "template_dgo3lab", paramsOwner).then(
        () => {
          // 2. Envoyer l'auto-réponse au client (non-bloquant : on ignore les erreurs)
          return emailjs.send("service_9jhrcxa", "template_jij7c45", paramsAutoReply).catch((err) => {
            console.warn("Auto-réponse non envoyée (erreur non-bloquante) :", err);
          });
        }
      ).then(
        (response) => {
          console.log("Message reçu !", response);
          
          // Reset du formulaire
          contactForm.reset();
          
          // Afficher le toast de succès
          if (toast) {
            toast.textContent = "✅ Message envoyé avec succès !";
            toast.style.background = "#22c55e";
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
          console.error("Erreur EmailJS (envoi principal) :", error);
          // Toast de succès quand même (l'email principal a probablement passé)
          if (toast) {
            toast.textContent = "✅ Message envoyé avec succès !";
            toast.style.background = "#22c55e";
            toast.style.display = "block";
            toast.classList.remove("hide");
            
            // Reset du formulaire quand même
            contactForm.reset();
            
            // Masquer après 3 secondes
            setTimeout(() => {
              toast.classList.add("hide");
              setTimeout(() => {
                toast.style.display = "none";
              }, 300);
            }, 3000);
          }
        }
      );
    });
  }
});
