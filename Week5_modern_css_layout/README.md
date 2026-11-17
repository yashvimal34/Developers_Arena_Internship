# Yash Vimal — Advanced Portfolio

A responsive personal portfolio built with semantic HTML, CSS Grid, Flexbox, CSS custom properties, and vanilla JavaScript.

## Project structure

```text
Week5_modern_css_layout/
├── index.html
├── css/
│   ├── main.css
│   ├── layout.css
│   └── animations.css
├── js/
│   └── theme-switcher.js
├── images/
│   ├── img.png
│   └── yash.jpeg
├── screenshots/
└── README.md
```

## Run locally

Open `index.html` in a browser. No build step or package installation is required. The display font is loaded from Google Fonts when a network connection is available; local system fonts are used otherwise.

## Features

- CSS Grid portfolio layout with responsive breakpoints and Flexbox-based components.
- Light/dark theme switcher that remembers the selected theme in browser storage.
- Live project search with an accessible no-results message.
- Contact-form validation with inline error feedback. A valid submission opens the configured email application; update the `mailto:` address in `index.html` to use your own email.
- Entrance, hover, and focus transitions with support for reduced-motion preferences.
- Keyboard skip link, visible focus states, semantic landmarks, and live status messages.

## CSS organization

- `css/main.css` — theme tokens, shared components, and global styles.
- `css/layout.css` — page sections, Grid/Flexbox layouts, and responsive rules.
- `css/animations.css` — entrance motion and reduced-motion overrides.

Place portfolio screenshots in `screenshots/` before submission.
