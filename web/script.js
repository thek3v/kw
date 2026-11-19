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

    const destinatario = "koxenteam@gmail.com";
    const asunto = `Solicitud de análisis inicial - ${nombre} ${apellidos}`.trim();

    const cuerpo = [
      "Hola KOXEN,",
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
  "article, .impact-grid div, .mission-grid div, .method-note, .faq-item, .roadmap-step, .roadmap-content, .contact-form-wrap, .team-profile-row, .team-profile-card, .team-profile-content"
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


// KOXEN V3 — ondas de datos y malla elástica con relieve hacia el espectador
(() => {
  const canvas = document.getElementById('kwHeroCanvas');
  const hero = canvas?.closest('.kw-hero-v2');
  const ctx = canvas?.getContext('2d', { alpha: true });
  if (!canvas || !hero || !ctx) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const fine = window.matchMedia('(pointer: fine)');
  let w=0,h=0,dpr=1,raf=0,visible=true,last=0,pressed=false;
  const pointer={x:-2000,y:-2000,tx:-2000,ty:-2000};
  const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
  const bump=(x,y)=>{
    if(!fine.matches||reduce.matches)return 0;
    const d=Math.hypot(x-pointer.x,y-pointer.y);
    const q=clamp(1-d/245,0,1);
    return q*q*(3-2*q);
  };
  function resize(){
    const r=hero.getBoundingClientRect();w=r.width;h=r.height;
    dpr=Math.min(devicePixelRatio||1,1.5);
    canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);draw(0);
  }
  function draw(t){
    ctx.clearRect(0,0,w,h);
    pointer.x+=(pointer.tx-pointer.x)*.13;
    pointer.y+=(pointer.ty-pointer.y)*.13;
    const tm=reduce.matches?0:t*.00045;
    const energy=pressed?1:0;
    // Rayos verticales y nodos suspendidos a ambos lados del logotipo.
    const count=Math.max(24,Math.round(w/43));
    for(let i=0;i<count;i++){
      const x=(i+.5)*w/count;
      const center=Math.abs(x-w*.5)/(w*.5);
      if(center<.26)continue;
      const seed=Math.sin(i*13.17)*43758.5453;const v=seed-Math.floor(seed);
      const y=h*(.18+.27*v)+Math.sin(tm*1.6+i)*8;
      const len=30+v*90;const b=bump(x,y);
      ctx.strokeStyle=`rgba(${i%3===0?'181,91,255':'29,204,242'},${.18+b*.5+energy*b*.2})`;
      ctx.lineWidth=1.05+b*1.2+energy*b*.7;ctx.beginPath();ctx.moveTo(x,y-len);ctx.lineTo(x,y+b*-24);ctx.stroke();
      ctx.beginPath();ctx.arc(x,y-b*24,1.4+v*1.7+b*3,0,Math.PI*2);
      ctx.fillStyle=i%3===0?'rgba(186,81,251,.85)':'rgba(32,217,246,.88)';ctx.fill();
      if((i%7===0||b>.65)&&w>700){
        const r=10+b*12+energy*b*8;
        const g=ctx.createRadialGradient(x,y-b*24,0,x,y-b*24,r);
        g.addColorStop(0,i%3===0?'rgba(184,82,255,.36)':'rgba(29,226,252,.4)');
        g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(x-r,y-b*24-r,r*2,r*2);
      }
    }
    // Misma geometría V3; doble pasada selectiva para brillo neón sin aumentar la malla.
    const waveY=(x,z)=>{
      const side=Math.abs(x-w*.5)/(w*.5);
      const envelope=Math.pow(clamp((side-.1)/.9,0,1),.72);
      const base=h*(.42+z*.115);
      const wave=Math.sin(x/w*10.2+tm*1.5+z*3.1)*h*.085*envelope;
      const fineWave=Math.sin(x/w*19.5-tm*.8+z*2)*h*.015*envelope;
      return base+wave+fineWave-bump(x,base+wave)*(85+energy*35);
    };
    for(let line=0;line<32;line++){
      const z=line/31,cyan=line%4!==0;
      const rgb=cyan?'23,215,255':'182,82,255';
      const path=()=>{ctx.beginPath();for(let x=0;x<=w+8;x+=12){const y=waveY(x,z);if(x===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);}};
      // Halo únicamente en filamentos seleccionados para mantener fluidez.
      if(line%6===0){path();ctx.strokeStyle=`rgba(${rgb},${.11+energy*.07})`;ctx.lineWidth=3.4;ctx.stroke();}
      path();ctx.strokeStyle=`rgba(${rgb},${.27+z*.24+energy*.12})`;
      ctx.lineWidth=line%6===0?1.45:.85;ctx.stroke();
      if(line%4===0){
        for(let x=14+(line%3)*8;x<w;x+=32){
          const y=waveY(x,z),hot=bump(x,y);
          ctx.fillStyle=`rgba(${rgb},${.34+hot*.38+energy*hot*.24})`;
          ctx.beginPath();ctx.arc(x,y,.8+hot*1.5+energy*hot,0,Math.PI*2);ctx.fill();
        }
      }
    }
    // Malla de perspectiva retirada; se conserva el halo y los puntos neón.
    // Resplandor local de la deformación, sin sustituir el efecto de relieve.
    if(pointer.x>0&&pointer.x<w&&pointer.y>0&&pointer.y<h&&!reduce.matches){
      const g=ctx.createRadialGradient(pointer.x,pointer.y,5,pointer.x,pointer.y,205);
      g.addColorStop(0,'rgba(29,222,245,.12)');g.addColorStop(.5,'rgba(117,56,244,.045)');g.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=g;ctx.fillRect(pointer.x-205,pointer.y-205,410,410);
    }
  }
  function tick(t){if(!visible)return;if(t-last>30){draw(t);last=t}raf=requestAnimationFrame(tick)}
  function start(){if(!raf&&!reduce.matches&&visible)raf=requestAnimationFrame(tick)}
  function stop(){cancelAnimationFrame(raf);raf=0}
  hero.addEventListener('pointermove',e=>{if(!fine.matches)return;const r=hero.getBoundingClientRect();pointer.tx=e.clientX-r.left;pointer.ty=e.clientY-r.top},{passive:true});
  hero.addEventListener('pointerleave',()=>{pointer.tx=-2000;pointer.ty=-2000;pressed=false});
  hero.addEventListener('pointerdown',()=>{pressed=true});
  window.addEventListener('pointerup',()=>{pressed=false});
  window.addEventListener('pointercancel',()=>{pressed=false});
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting&&!document.hidden;if(visible)start();else stop()}).observe(hero);
  document.addEventListener('visibilitychange',()=>{visible=!document.hidden&&hero.getBoundingClientRect().bottom>0;if(visible)start();else stop()});
  reduce.addEventListener('change',()=>{stop();draw(0);start()});
  window.addEventListener('resize',resize,{passive:true});resize();start();
})();
