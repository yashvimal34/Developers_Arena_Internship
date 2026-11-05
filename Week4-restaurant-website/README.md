# Saffron & Stone Restaurant Website

A responsive restaurant website demo built with semantic HTML, CSS and vanilla JavaScript.

## Pages
- `index.html`: home, featured dishes and calls to action
- `menu.html`: menu with interactive category tabs
- `about.html`: restaurant story and values
- `contact.html`: contact details and validated booking enquiry form

## Features
- Four linked HTML pages
- Responsive mobile navigation
- Responsive desktop, tablet and mobile layouts
- Interactive menu categories
- Booking form validation for name, email, Indian mobile number, date, time, guest count and consent
- Accessible form feedback and labels
- Reduced-motion support

## Structure
```text
restaurant-website/
├── index.html
├── menu.html
├── about.html
├── contact.html
├── css/style.css
├── js/main.js
├── images/
└── README.md
```

## Run locally
No build tools are required. Open `index.html` in a browser or use VS Code Live Server.

## Images
The demo requests compressed, width-limited images from Unsplash using `w` and `q` URL parameters. Images require internet access. For a fully self-contained site, use appropriately licensed local images, resize/compress them to WebP, save them in `images/`, and update the CSS/HTML image paths.

## Booking form
The form currently validates input in the browser and displays a demo confirmation. It does not save or send reservations. Connect the submit handler in `js/main.js` to a backend API or form service before accepting real bookings.

## Render deployment (not done)
This project has **not** been deployed.
1. Push the project folder to a GitHub repository.
2. In Render, choose **New → Static Site** and connect the repository.
3. Set the publish directory to the folder containing `index.html` (project root if this is the repository root).
4. Leave the build command empty because this is plain HTML/CSS/JS.
5. Deploy when you are ready and test each page and the booking form.

The restaurant name, address, menu, prices, phone and email are fictional demo content. Replace them before using this for a real business.
