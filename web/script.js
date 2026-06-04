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

  question.addEventListener("click", () => {
    item.classList.toggle("active");
  });
});

// =========================
// ANIMACIONES AL HACER SCROLL
// =========================

const animatedElements = document.querySelectorAll(
  "article, .impact-grid div, .mission-grid div, .method-note, .faq-item, .roadmap-step, .roadmap-content"
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