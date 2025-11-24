// --- Data ---------------------------------------------------------------
const PROJECTS = [
  {
    title: "Réseau (AireServices) — en cours de développement",
    blurb:
      "Refonte full-stack avec SSR, SSO JWT, blocs dynamiques, API publique/privée, PostgreSQL JSONB, contenu généré par IA.",
    chips: ["Vue 3", "Vuetify", "Express", "PostgreSQL", "JWT", "SSR"],
    demo: "https://reseau.qipeo.com",
    images: ["reseau-1.png", "reseau-2.png", "reseau-3.png", "reseau-4.png", "reseau-5.png"]
  },
  {
    title: "Enchères (projet école) — Spring Boot",
    blurb:
      "Application d'enchères : authentification, création/offres, gestion des lots, vues Thymeleaf.",
    chips: ["Java", "Spring Boot", "Thymeleaf"],
    images: ["enchere-1.png", "enchere-2.png", "enchere-3.png"]
  },
  {
    title: "Sortir.com — Symfony",
    blurb:
      "Plateforme d'événements/sorties : gestion des utilisateurs, inscriptions, back-office.",
    chips: ["Symfony", "Twig", "Doctrine"],
    images: ["sortir-1.png", "sortir-2.png", "sortir-3.png"]
  }
];

const SKILLS = [
  "Node.js (v20)",
  "Express",
  "JavaScript",
  "Vue 3 / Vuetify",
  "Vite",
  "PostgreSQL (+ JSONB)",
  "MariaDB",
  "Docker",
  "Symfony",
  "Composer",
  "Java / Spring Boot",
  "Thymeleaf",
  "JWT / SSO",
  "Linux Debian",
  "CI/CD",
  "SSR",
  "i18n",
  "REST APIs",
  "Google Analytics 4",
  "Tag Manager",
  "Wix",
  "Bases en Python/C/C++/Flutter/Kotlin"
];

// --- DOM helpers --------------------------------------------------------
function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);

  Object.entries(attrs).forEach(([k, v]) => {
    if (k === "class") {
      node.className = v;
    } else if (k.startsWith("on") && typeof v === "function") {
      node.addEventListener(k.substring(2), v);
    } else if (k === "html") {
      node.innerHTML = v;
    } else {
      node.setAttribute(k, v);
    }
  });

  (Array.isArray(children) ? children : [children])
    .filter(Boolean)
    .forEach((c) => node.append(c));

  return node;
}

// --- Projects render ----------------------------------------------------
const grid = document.getElementById("projectsGrid");

PROJECTS.forEach((p) => {
  const hasCarousel = Array.isArray(p.images) && p.images.length > 1;

  if (hasCarousel) {
    // Carousel card
    const slides = el(
      "div",
      { class: "slides" },
      p.images.map((src) => {
        const s = el("div", { class: "slide" });
        s.append(el("img", { src, alt: `${p.title} - capture` }));
        return s;
      })
    );

    let idx = 0;

    const card = el("article", { class: "card project" }, [
      el("div", { class: "carousel" }, [
        slides,
        el("div", { class: "ctrl" }, [
          el(
            "button",
            {
              onclick: () => {
                idx = (idx - 1 + p.images.length) % p.images.length;
                slides.style.transform = `translateX(-${idx * 100}%)`;
              },
              "aria-label": "Précédent"
            },
            "‹"
          ),
          el(
            "button",
            {
              onclick: () => {
                idx = (idx + 1) % p.images.length;
                slides.style.transform = `translateX(-${idx * 100}%)`;
              },
              "aria-label": "Suivant"
            },
            "›"
          )
        ])
      ]),
      el("h4", {}, p.title),
      el("p", { class: "muted" }, p.blurb),
      el(
        "div",
        { class: "chips" },
        p.chips.map((c) => el("span", { class: "chip" }, c))
      ),
      el("div", { class: "row" }, [
        p.demo
          ? el(
              "a",
              {
                href: p.demo,
                class: "btn",
                target: "_blank",
                rel: "noreferrer"
              },
              "Voir le site"
            )
          : null
      ])
    ]);

    grid.append(card);
  } else {
    // Standard card (avec image unique si présente)
    const visual =
      p.images && p.images.length === 1
        ? el("div", { class: "thumb" }, [
            el("img", {
              src: p.images[0],
              alt: `Aperçu ${p.title}`,
              style: "width:100%; height:100%; object-fit:cover; border-radius:12px"
            })
          ])
        : el("div", { class: "thumb" }, "Aperçu indisponible");

    const card = el("article", { class: "card project" }, [
      visual,
      el("h4", {}, p.title),
      el("p", { class: "muted" }, p.blurb),
      el(
        "div",
        { class: "chips" },
        p.chips.map((c) => el("span", { class: "chip" }, c))
      )
    ]);

    grid.append(card);
  }
});

// --- Skills render ------------------------------------------------------
const skills = document.getElementById("skills");
SKILLS.forEach((s) => skills.append(el("span", { class: "skill" }, s)));

// --- Misc ---------------------------------------------------------------
document.getElementById("year").textContent = new Date().getFullYear();

// Smooth scroll for internal anchors
document.querySelectorAll('a[href^="#"]').forEach((a) =>
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href").slice(1);
    const target = document.getElementById(id);

    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  })
);

// Add a "Tarifs" button/link in the main navigation (if not present)
(function addTarifLink(){
  const navLinks = document.querySelector('.nav .links') || document.querySelector('.links');
  if(!navLinks) return;
  // avoid duplicate
  if(navLinks.querySelector('a[href="tarif.html"]')) return;
  const tarifAnchor = el('a', { href: 'tarif.html', class: 'btn', title: 'Tarifs' }, 'Tarifs');
  navLinks.append(tarifAnchor);
})();
