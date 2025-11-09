# NovaStyle Ecommerce Website

NovaStyle is a modern, responsive landing page for a sustainable fashion ecommerce brand. It is built with semantic HTML, modern CSS, and a small amount of vanilla JavaScript for interactivity.

## Features

- Hero section with clear calls-to-action
- Curated collection highlights and new arrivals grid
- Category filters with animated chip states
- Interactive product cards and lightweight cart counter
- Newsletter signup experience with inline confirmation message
- Mobile navigation with accessible toggle
- Responsive layout that adapts from large desktop to mobile devices

## Getting started

This is a static site and does not require a build step.

```bash
# serve the site locally (requires Python 3)
python -m http.server 8000
```

Then open your browser to [http://localhost:8000](http://localhost:8000) to explore the site.

## Project structure

```
├── index.html          # Main page markup
├── assets
│   ├── css
│   │   └── style.css   # Stylesheet with responsive layout
│   └── js
│       └── main.js     # Interactivity (filters, cart badge, form feedback)
└── Readme.md           # Project overview and instructions
```

## Customization tips

- Update the `products` array in `assets/js/main.js` to adjust imagery or pricing.
- Swap the Unsplash image URLs for your own assets.
- Adjust the color system in `:root` within `assets/css/style.css` to re-theme the site.

Enjoy building your brand story with NovaStyle!
