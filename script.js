const store = {
  name: "Aurora Boutique",
  city: "Cascavel - PR",
  whatsapp: "5545999999999",
  instagram: "@auroraboutique",
  address: "Avenida Brasil, 1550 - Centro, Cascavel - PR",
  hours: "Segunda a sábado, das 9h às 18h30"
};

const products = [
  {
    name: "Vestido Midi Areia",
    category: "Vestidos",
    price: "R$ 189,90",
    sizes: "P, M e G",
    description: "Midi leve em tom areia, com presença suficiente para trabalho e encontros de fim de tarde.",
    badge: "Destaque",
    novelty: true,
    featured: true,
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85"
  },
  {
    name: "Blazer Alfaiataria Off",
    category: "Blazers",
    price: "R$ 249,90",
    sizes: "P, M, G e GG",
    description: "Alfaiataria clara para sobrepor vestidos, jeans ou pantalona com acabamento alinhado.",
    badge: "Novo",
    novelty: true,
    image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=85"
  },
  {
    name: "Calça Pantalona Preta",
    category: "Calças",
    price: "R$ 159,90",
    sizes: "36, 38, 40 e 42",
    description: "Pantalona fluida com cintura marcada e leitura elegante para dias longos fora de casa.",
    badge: "Curadoria",
    novelty: false,
    image: "https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=900&q=85"
  },
  {
    name: "Camisa Linho Natural",
    category: "Camisas",
    price: "R$ 139,90",
    sizes: "P, M e G",
    description: "Linho de toque fresco, ideal para compor com alfaiataria, saia acetinada ou denim claro.",
    badge: "Leve",
    novelty: false,
    image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=900&q=85"
  },
  {
    name: "Saia Cetim Champagne",
    category: "Saias",
    price: "R$ 129,90",
    sizes: "P, M e G",
    description: "Cetim discreto, brilho suave e caimento que funciona com camisa, tricot fino ou cropped.",
    badge: "Novo",
    novelty: true,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85"
  },
  {
    name: "Cropped Canelado Nude",
    category: "Blusas",
    price: "R$ 89,90",
    sizes: "P, M e G",
    description: "Base canelada para usar com cintura alta, blazer aberto ou saias de tecido leve.",
    badge: "Base",
    novelty: false,
    image: "https://images.unsplash.com/photo-1495385794356-15371f348c31?auto=format&fit=crop&w=900&q=85"
  },
  {
    name: "Bolsa Minimal Caramelo",
    category: "Acessórios",
    price: "R$ 179,90",
    sizes: "Único",
    description: "Bolsa estruturada em caramelo, tamanho prático para acompanhar a rotina sem pesar o look.",
    badge: "Acessório",
    novelty: false,
    image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=900&q=85"
  },
  {
    name: "Conjunto Casual Elegance",
    category: "Conjuntos",
    price: "R$ 219,90",
    sizes: "P, M e G",
    description: "Conjunto coordenado para resolver a produção inteira com caimento macio e visual polido.",
    badge: "Novo",
    novelty: true,
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=900&q=85"
  }
];

const categories = ["Todos", "Vestidos", "Blusas", "Calças", "Conjuntos", "Acessórios", "Novidades"];
const state = {
  category: "Todos",
  search: ""
};

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const productGrid = document.querySelector("#productGrid");
const categoryFilters = document.querySelector("#categoryFilters");
const searchInput = document.querySelector("#searchInput");
const emptyState = document.querySelector("#emptyState");
const clearFilters = document.querySelector("#clearFilters");
const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");

function whatsappLink(message) {
  return `https://wa.me/${store.whatsapp}?text=${encodeURIComponent(message)}`;
}

function generalMessage() {
  return `Olá, vim pelo site da ${store.name} e quero consultar peças, tamanhos e disponibilidade.`;
}

function productMessage(productName) {
  return `Olá, vim pelo site da ${store.name} e tenho interesse na peça ${productName}. Poderia me informar tamanhos, cores e disponibilidade?`;
}

function applyWhatsAppLinks() {
  document.querySelectorAll(".js-whatsapp-general").forEach((link) => {
    link.href = whatsappLink(generalMessage());
  });

  const featureLink = document.querySelector(".js-feature-whatsapp");
  if (featureLink) {
    featureLink.href = whatsappLink(productMessage("Vestido Midi Areia"));
  }
}

function renderFilters() {
  categoryFilters.innerHTML = categories.map((category) => {
    const isActive = category === state.category ? "is-active" : "";
    return `<button class="filter-btn ${isActive}" type="button" data-category="${category}">${category}</button>`;
  }).join("");
}

function getFilteredProducts() {
  const searchTerm = state.search.trim().toLowerCase();

  return products.filter((product) => {
    const matchesCategory =
      state.category === "Todos" ||
      product.category === state.category ||
      (state.category === "Blusas" && product.category === "Camisas") ||
      (state.category === "Novidades" && product.novelty);

    const searchable = `${product.name} ${product.category} ${product.description}`.toLowerCase();
    return matchesCategory && searchable.includes(searchTerm);
  });
}

function productCard(product) {
  const featuredClass = product.featured ? "is-featured" : "";
  return `
    <article class="product-card ${featuredClass}">
      <div class="product-media">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        <span class="badge">${product.badge}</span>
      </div>
      <div class="product-info">
        <div class="product-category">${product.category}</div>
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <div class="product-meta">
          <span>Tamanhos: ${product.sizes}</span>
          <small>Sujeito à disponibilidade</small>
        </div>
        <div class="product-footer">
          <span class="price">${product.price}</span>
          <a class="consult-link" href="${whatsappLink(productMessage(product.name))}" target="_blank" rel="noopener">Consultar tamanho</a>
        </div>
      </div>
    </article>
  `;
}

function revealRenderedCards() {
  const cards = document.querySelectorAll(".product-card");

  if (prefersReducedMotion) {
    cards.forEach((card) => card.classList.add("is-visible"));
    return;
  }

  requestAnimationFrame(() => {
    cards.forEach((card, index) => {
      setTimeout(() => card.classList.add("is-visible"), index * 65);
    });
  });
}

function renderProducts() {
  const filteredProducts = getFilteredProducts();
  productGrid.innerHTML = filteredProducts.map(productCard).join("");
  emptyState.hidden = filteredProducts.length > 0;
  revealRenderedCards();
}

function setHeaderState() {
  header.classList.toggle("is-scrolled", window.scrollY > 18);
}

function closeMenu() {
  document.body.classList.remove("menu-open");
  header.classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
}

function initMenu() {
  menuToggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("menu-open");
    document.body.classList.toggle("menu-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}

function initCatalogEvents() {
  categoryFilters.addEventListener("click", (event) => {
    const button = event.target.closest("[data-category]");
    if (!button) return;

    state.category = button.dataset.category;
    renderFilters();
    renderProducts();
  });

  searchInput.addEventListener("input", (event) => {
    state.search = event.target.value;
    renderProducts();
  });

  clearFilters.addEventListener("click", () => {
    state.category = "Todos";
    state.search = "";
    searchInput.value = "";
    renderFilters();
    renderProducts();
  });
}

function initMagneticButtons() {
  if (prefersReducedMotion || window.innerWidth < 900) return;

  document.querySelectorAll(".magnetic").forEach((button) => {
    button.addEventListener("mousemove", (event) => {
      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      button.style.transform = `translate(${x * 0.12}px, ${y * 0.2}px)`;
    });

    button.addEventListener("mouseleave", () => {
      button.style.transform = "";
    });
  });
}

function initAnimations() {
  if (prefersReducedMotion || !window.gsap) {
    document.querySelectorAll(".reveal, .hero-item").forEach((element) => {
      element.style.opacity = 1;
      element.style.transform = "none";
    });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  gsap.from(".hero-item", {
    autoAlpha: 0,
    y: 34,
    duration: 0.9,
    ease: "power3.out",
    stagger: 0.12
  });

  gsap.utils.toArray(".reveal").forEach((element) => {
    gsap.to(element, {
      autoAlpha: 1,
      y: 0,
      duration: 0.85,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 84%"
      }
    });
  });

  gsap.utils.toArray(".feature-image img, .location-image img").forEach((image) => {
    gsap.to(image, {
      yPercent: -7,
      ease: "none",
      scrollTrigger: {
        trigger: image.parentElement,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  });
}

function init() {
  applyWhatsAppLinks();
  renderFilters();
  renderProducts();
  initCatalogEvents();
  initMenu();
  initMagneticButtons();
  initAnimations();
  setHeaderState();
  window.addEventListener("scroll", setHeaderState, { passive: true });
}

window.addEventListener("DOMContentLoaded", init);
