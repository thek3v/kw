// =========================
// NAVEGACIÓN ENTRE PÁGINAS
// =========================

const pageLinks = document.querySelectorAll("[data-page]");
const pages = document.querySelectorAll(".page");

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

function closeMobileMenu() {
  if (menuToggle && navMenu) {
    menuToggle.classList.remove("active");
    navMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
}

function showPage(pageId) {
  pages.forEach((page) => {
    page.classList.remove("active-page");
  });

  const selectedPage = document.getElementById(pageId);

  if (selectedPage) {
    selectedPage.classList.add("active-page");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  pageLinks.forEach((link) => {
    link.classList.remove("active-link");

    if (link.dataset.page === pageId) {
      link.classList.add("active-link");
    }
  });

  closeMobileMenu();
}

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");

    menuToggle.classList.toggle("active", isOpen);
    menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
}

pageLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const pageId = link.dataset.page;

    history.pushState(null, "", `#${pageId}`);
    showPage(pageId);
  });
});

window.addEventListener("load", () => {
  const initialPage = window.location.hash.replace("#", "") || "inicio";
  showPage(initialPage);
});

window.addEventListener("popstate", () => {
  const pageId = window.location.hash.replace("#", "") || "inicio";
  showPage(pageId);
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    closeMobileMenu();
  }
});

// =========================
// FAQ
// =========================

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");

  if (question) {
    question.addEventListener("click", () => {
      item.classList.toggle("active");
    });
  }
});

// =========================
// FORMULARIO DE CONTACTO MAILTO
// =========================

const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const nameInput = contactForm.querySelector("#nombre");
    const surnameInput = contactForm.querySelector("#apellidos");
    const emailInput = contactForm.querySelector("#email");
    const messageInput = contactForm.querySelector("#mensaje");

    const nombre = nameInput ? nameInput.value.trim() : "";
    const apellidos = surnameInput ? surnameInput.value.trim() : "";
    const email = emailInput ? emailInput.value.trim() : "";
    const mensaje = messageInput ? messageInput.value.trim() : "";

    const destinatario = "kwdataintelligence@gmail.com";
    const asunto = `Solicitud de análisis inicial - ${nombre} ${apellidos}`.trim();

    const cuerpo = [
      "Hola KW,",
      "",
      "Me gustaría solicitar un análisis inicial para valorar posibles mejoras en mi empresa.",
      "",
      "Datos de contacto:",
      `Nombre: ${nombre}`,
      `Apellidos: ${apellidos}`,
      `Email: ${email}`,
      "",
      "Mensaje:",
      mensaje,
      "",
      "Gracias."
    ].join("\n");

    const mailtoLink = `mailto:${destinatario}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;

    window.location.href = mailtoLink;
  });
}

// =========================
// ANIMACIONES AL HACER SCROLL
// =========================

const animatedElements = document.querySelectorAll(
  "article, .impact-grid div, .mission-grid div, .method-note, .faq-item, .roadmap-step, .roadmap-content, .contact-form-wrap"
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.15,
  }
);

animatedElements.forEach((element) => {
  if (!element.classList.contains("no-fade")) {
    element.classList.add("fade-in");
    observer.observe(element);
  }
});
