const products = [
  {
    id: 'launch-website',
    name: 'Launch Website Accelerator',
    price: 4200,
    rating: 5.0,
    reviews: 68,
    category: 'websites',
    image: 'https://images.unsplash.com/photo-1487015307662-6ce6210680f1?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'conversion-commerce',
    name: 'Conversion Commerce Build',
    price: 5600,
    rating: 4.9,
    reviews: 54,
    category: 'websites',
    image: 'https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'signature-logo',
    name: 'Signature Logo Lab',
    price: 1800,
    rating: 4.8,
    reviews: 132,
    category: 'branding',
    image: 'https://images.unsplash.com/photo-1522199997878-95f2072e0b83?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'brand-guidelines',
    name: 'Brand Guideline Suite',
    price: 2400,
    rating: 4.9,
    reviews: 97,
    category: 'branding',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'idea-lab',
    name: 'Idea Validation Lab',
    price: 1450,
    rating: 4.7,
    reviews: 88,
    category: 'strategy',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'pitch-ready',
    name: 'Pitch &amp; Funding System',
    price: 2100,
    rating: 4.9,
    reviews: 113,
    category: 'strategy',
    image: 'https://images.unsplash.com/photo-1526378722484-bd91ca387e72?auto=format&fit=crop&w=900&q=80',
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
const navLinks = document.querySelectorAll('#nav-links a');
const newsletterForm = document.querySelector('.newsletter-form');
const feedbackEl = document.querySelector('.form-feedback');

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

const formatPrice = (value) => currencyFormatter.format(value);

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

const closeNav = () => {
  navList.classList.remove('is-open');
  navToggle.setAttribute('aria-expanded', 'false');
};

const handleNavToggle = () => {
  const isOpen = navList.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
};

const handleNewsletterSubmit = (event) => {
  event.preventDefault();
  const formData = new FormData(newsletterForm);
  const email = formData.get('email');

  feedbackEl.textContent = `Thanks, ${email}! We'll follow up from contact@pixelcrafted.uk shortly.`;
  newsletterForm.reset();
};

renderProducts();
updateCartBadge();

filterChips.forEach((chip) => chip.addEventListener('click', handleFilterClick));
productGrid.addEventListener('click', handleProductClick);
navToggle.addEventListener('click', handleNavToggle);
newsletterForm.addEventListener('submit', handleNewsletterSubmit);

navLinks.forEach((link) =>
  link.addEventListener('click', () => {
    if (navList.classList.contains('is-open')) {
      closeNav();
    }
  }),
);

document.addEventListener('keyup', (event) => {
  if (event.key === 'Escape') {
    closeNav();
  }
});

yearEl.textContent = new Date().getFullYear();
