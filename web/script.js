// =========================
// ANIMACIONES AL HACER SCROLL
// =========================

// Seleccionamos los elementos que queremos animar
const animatedElements = document.querySelectorAll(
  "section, article, .hero-card, .process-grid div"
);

// Creamos un observador que detecta cuándo un elemento entra en pantalla
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      // Si el elemento entra en la pantalla, le añadimos la clase visible
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.15,
  }
);

// Aplicamos la clase inicial y activamos el observador
animatedElements.forEach((element) => {
  element.classList.add("fade-in");
  observer.observe(element);
});