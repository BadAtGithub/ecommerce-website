const products = [
  {
    id: 'monochrome-suite',
    name: 'Monochrome Signature Suite',
    price: 620,
    rating: 4.9,
    reviews: 184,
    category: 'branding',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'launchpad-web',
    name: 'Launchpad Web Experience',
    price: 880,
    rating: 4.8,
    reviews: 96,
    category: 'web',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'social-surge',
    name: 'Social Surge Template Pack',
    price: 280,
    rating: 4.7,
    reviews: 141,
    category: 'social',
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'type-foundry',
    name: 'Type Foundry Starter Kit',
    price: 360,
    rating: 5.0,
    reviews: 52,
    category: 'branding',
    image: 'https://images.unsplash.com/photo-1454165205744-3b78555e5572?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'immersive-ui',
    name: 'Immersive UI Wireframe Library',
    price: 420,
    rating: 4.6,
    reviews: 218,
    category: 'web',
    image: 'https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'creator-toolkit',
    name: 'Creator Launch Toolkit',
    price: 320,
    rating: 4.9,
    reviews: 121,
    category: 'social',
    image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=900&q=80',
  },
];

const state = {
  filter: 'all',
  cart: new Map(),
};

const productGrid = document.querySelector('.product-grid');
const filterChips = document.querySelectorAll('[data-filter]');
const cartCountBadge = document.querySelector('[data-cart-count]');
const yearEl = document.querySelector('[data-year]');
const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('#nav-links');
const newsletterForm = document.querySelector('.newsletter-form');
const feedbackEl = document.querySelector('.form-feedback');

const formatPrice = (value) => `$${value.toFixed(0)}`;

const renderProducts = () => {
  const filtered = products.filter((product) => state.filter === 'all' || product.category === state.filter);

  const html = filtered
    .map(
      (product) => `
        <article class="product-card" role="listitem">
          <img src="${product.image}" alt="${product.name}" loading="lazy" />
          <div>
            <h3>${product.name}</h3>
            <p class="price">${formatPrice(product.price)}</p>
            <div class="rating" aria-label="Rated ${product.rating} out of 5">
              <span>★</span>
              <span>${product.rating.toFixed(1)}</span>
              <span class="rating-count">(${product.reviews})</span>
            </div>
          </div>
          <button class="btn btn-secondary" data-add-to-cart="${product.id}">Add to cart</button>
        </article>
      `,
    )
    .join('');

  productGrid.innerHTML = html;
};

const updateCartBadge = () => {
  const count = Array.from(state.cart.values()).reduce((total, quantity) => total + quantity, 0);
  cartCountBadge.textContent = count;
};

const handleFilterClick = (event) => {
  const filter = event.target.dataset.filter;
  if (!filter) return;

  state.filter = filter;
  filterChips.forEach((chip) => chip.classList.toggle('is-active', chip.dataset.filter === filter));
  renderProducts();
};

const handleProductClick = (event) => {
  const button = event.target.closest('[data-add-to-cart]');
  if (!button) return;

  const productId = button.dataset.addToCart;
  const current = state.cart.get(productId) ?? 0;
  state.cart.set(productId, current + 1);
  updateCartBadge();

  button.textContent = 'Added!';
  button.disabled = true;
  setTimeout(() => {
    button.textContent = 'Add to cart';
    button.disabled = false;
  }, 1200);
};

const handleNavToggle = () => {
  const isOpen = navList.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
};

const handleNewsletterSubmit = (event) => {
  event.preventDefault();
  const formData = new FormData(newsletterForm);
  const email = formData.get('email');

  feedbackEl.textContent = `Welcome aboard, ${email}! Your PixelCrafted resources are on their way.`;
  newsletterForm.reset();
};

renderProducts();
updateCartBadge();

filterChips.forEach((chip) => chip.addEventListener('click', handleFilterClick));
productGrid.addEventListener('click', handleProductClick);
navToggle.addEventListener('click', handleNavToggle);
newsletterForm.addEventListener('submit', handleNewsletterSubmit);

yearEl.textContent = new Date().getFullYear();
