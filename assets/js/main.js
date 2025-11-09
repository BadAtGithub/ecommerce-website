const products = [
  {
    id: 'blue-hour-jacket',
    name: 'Blue Hour Jacket',
    price: 168,
    rating: 4.9,
    reviews: 184,
    category: 'apparel',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'solstice-mule',
    name: 'Solstice Leather Mule',
    price: 220,
    rating: 4.8,
    reviews: 96,
    category: 'footwear',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'lumen-crossbody',
    name: 'Lumen Crossbody Bag',
    price: 148,
    rating: 4.7,
    reviews: 73,
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'cloud-rib-set',
    name: 'Cloud Rib Knit Set',
    price: 198,
    rating: 5.0,
    reviews: 52,
    category: 'apparel',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'terra-sneaker',
    name: 'Terra Canvas Sneaker',
    price: 138,
    rating: 4.6,
    reviews: 218,
    category: 'footwear',
    image: 'https://images.unsplash.com/photo-1542293787938-4d2226c2f58c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'halo-scarf',
    name: 'Halo Silk Scarf',
    price: 98,
    rating: 4.9,
    reviews: 121,
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
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

  feedbackEl.textContent = `Thanks, ${email}! We just sent a welcome gift to your inbox.`;
  newsletterForm.reset();
};

renderProducts();
updateCartBadge();

filterChips.forEach((chip) => chip.addEventListener('click', handleFilterClick));
productGrid.addEventListener('click', handleProductClick);
navToggle.addEventListener('click', handleNavToggle);
newsletterForm.addEventListener('submit', handleNewsletterSubmit);

yearEl.textContent = new Date().getFullYear();
