/* =========================================================
   Top Rio Verde — interações
   ========================================================= */

// ⚙️ CONFIGURAÇÃO — troque pelos dados reais da empresa
const CONFIG = {
  whatsapp: "5564984517323", // DDI + DDD + número, só dígitos
  instagram: "https://www.instagram.com/toprioverde/",
};

const waLink = (msg) => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;

// ---------- Links de contato ----------
document.querySelectorAll(".js-whatsapp").forEach((a) => {
  a.href = waLink("Olá! Vim pelo site da Top Rio Verde e gostaria de saber mais sobre financiamento.");
  a.target = "_blank";
  a.rel = "noopener";
});
document.getElementById("instagramLink").href = CONFIG.instagram;
document.getElementById("ano").textContent = new Date().getFullYear();

// ---------- Header ao rolar ----------
const header = document.querySelector(".header");
const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 30);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// ---------- Menu mobile ----------
const nav = document.getElementById("nav");
const toggle = document.getElementById("navToggle");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", open);
});
nav.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  })
);

// ---------- Reveal on scroll ----------
const io = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("is-visible");
        io.unobserve(e.target);
      }
    }),
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el, i) => {
  el.style.transitionDelay = `${(i % 4) * 80}ms`;
  io.observe(el);
});

// ---------- Brilho que segue o mouse nos cards ----------
document.querySelectorAll(".card").forEach((card) =>
  card.addEventListener("pointermove", (e) => {
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - r.left}px`);
    card.style.setProperty("--my", `${e.clientY - r.top}px`);
  })
);
