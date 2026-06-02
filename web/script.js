// =========================
// NAVEGACIÓN ENTRE PÁGINAS
// =========================

const pageLinks = document.querySelectorAll("[data-page]");
const pages = document.querySelectorAll(".page");

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

// =========================
// ANIMACIONES AL HACER SCROLL
// =========================

const animatedElements = document.querySelectorAll(
  "section, article, .hero-card, .process-grid div, .impact-grid div, .mission-grid div, .method-note"
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
  element.classList.add("fade-in");
  observer.observe(element);
});