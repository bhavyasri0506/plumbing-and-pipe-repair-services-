/* ==========================================================================
   AquaFix — components.js
   Injects shared navbar + footer so every page stays in sync.
   Pages set window.AQUA_PAGE = "home-1" etc. to highlight active link.
   ========================================================================== */
(function () {
  'use strict';

  var PAGE = (window.AQUA_PAGE || '').toLowerCase();
  var ROOT = window.AQUA_ROOT || '';

  var navLinks = [
    { id: 'home-1', label: 'Home 1', href: 'index.html' },
    { id: 'home-2', label: 'Home 2', href: 'home-2.html' },
    { id: 'about', label: 'About', href: 'about-us.html' },
    { id: 'services', label: 'Services', href: 'services.html' },
    { id: 'pricing', label: 'Pricing', href: 'pricing.html' },
    { id: 'blog', label: 'Blog', href: 'blogs.html' },
    { id: 'contact', label: 'Contact', href: 'contact.html' },
  ];

  function isHomeActive() { return PAGE === 'home-1' || PAGE === 'home-2'; }

  var navHTML = '<a class="navbar-brand-custom" href="' + ROOT + 'index.html">' +
    '<span class="logo-badge"><i class="bi bi-droplet-half"></i></span>' +
    '<span>AquaFix</span></a>';

  var desktopLinks = '<ul class="nav-links">';
  // Home dropdown — simple, just Home 1 and Home 2
  desktopLinks += '<li class="dropdown-custom"><a class="nav-link-custom ' + (isHomeActive() ? 'active' : '') + '" href="#" role="button" aria-haspopup="true">Home <i class="bi bi-chevron-down" style="font-size:.55rem"></i></a>' +
    '<div class="dropdown-menu-custom" style="min-width:10rem">' +
    '<a class="dropdown-item-custom" href="' + ROOT + 'index.html">Home 1</a>' +
    '<a class="dropdown-item-custom" href="' + ROOT + 'home-2.html">Home 2</a>' +
    '</div></li>';
  navLinks.slice(2).forEach(function (l) {
    desktopLinks += '<li><a class="nav-link-custom ' + (PAGE === l.id ? 'active' : '') + '" href="' + ROOT + l.href + '">' + l.label + '</a></li>';
  });
  desktopLinks += '</ul>';

  var actions = '<div class="nav-right">' +
    '<a href="' + ROOT + 'login.html" class="btn btn-ghost nav-desktop-only" style="display:none;font-size:.85rem;padding:.5rem 1rem" id="navLogin"><i class="bi bi-box-arrow-in-right"></i> Login</a>' +
    '<button class="icon-btn" id="rtlToggle" aria-label="Toggle RTL" title="Toggle RTL"><i class="bi bi-arrow-left-right"></i></button>' +
    '<button class="icon-btn" id="themeToggle" aria-label="Toggle dark mode" title="Toggle dark mode"></button>' +
    '<a href="' + ROOT + 'contact.html" class="btn btn-primary nav-desktop-only" style="display:none;font-size:.85rem;padding:.5rem 1.1rem" id="navCta"><i class="bi bi-calendar-check"></i> Book Now</a>' +
    '<button class="icon-btn nav-mobile-only" id="mobileMenuBtn" aria-label="Open menu"><i class="bi bi-list" style="font-size:1.3rem"></i></button>' +
    '</div>';

  var navbar = document.getElementById('navbar');
  if (navbar) {
    navbar.className = 'navbar-custom';
    navbar.innerHTML =
      '<div class="container-page nav-inner">' +
      '<div class="nav-left">' + navHTML + '</div>' +
      '<div class="nav-center"><span class="nav-spacer"></span>' + desktopLinks + '<span class="nav-spacer"></span></div>' +
      actions +
      '</div>';
  }

  // Show desktop CTA on larger screens
  var mq = window.matchMedia('(min-width: 992px)');
  var navCta = document.getElementById('navCta');
  var navLogin = document.getElementById('navLogin');
  function syncResponsive() {
    if (navCta) navCta.style.display = mq.matches ? 'inline-flex' : 'none';
    if (navLogin) navLogin.style.display = mq.matches ? 'inline-flex' : 'none';
  }
  syncResponsive();
  mq.addEventListener('change', syncResponsive);

  // Footer
  var footer = document.getElementById('footer');
  if (footer) {
    footer.className = 'footer';
    footer.innerHTML =
      '<div class="pointer-events-none" style="position:absolute;top:-8rem;left:50%;transform:translateX(-50%);width:40rem;height:16rem;border-radius:50%;background:rgba(52,163,255,.2);filter:blur(60px)"></div>' +
      '<div class="pointer-events-none" style="position:absolute;bottom:-8rem;right:0;width:24rem;height:16rem;border-radius:50%;background:rgba(8,207,159,.1);filter:blur(60px)"></div>' +
      '<div class="container-page" style="position:relative">' +
      '<div class="grid-4" style="gap:3rem">' +
      '<div style="grid-column:span 1">' +
        '<a class="navbar-brand-custom" href="' + ROOT + 'index.html" style="color:#fff"><span class="logo-badge"><i class="bi bi-droplet-half"></i></span>AquaFix</a>' +
        '<p style="margin-top:1.25rem;max-width:24rem;font-size:.875rem;color:rgba(255,255,255,.6)">Reliable, licensed plumbing services for homes and businesses across Hyderabad. Upfront pricing, on-time arrival, and a written guarantee on every job.</p>' +
        '<div class="flex gap-2" style="margin-top:1.5rem">' +
          '<a href="#" class="social-btn" aria-label="Facebook"><i class="bi bi-facebook"></i></a>' +
          '<a href="#" class="social-btn" aria-label="Twitter"><i class="bi bi-twitter-x"></i></a>' +
          '<a href="#" class="social-btn" aria-label="Instagram"><i class="bi bi-instagram"></i></a>' +
          '<a href="#" class="social-btn" aria-label="YouTube"><i class="bi bi-youtube"></i></a>' +
        '</div>' +
      '</div>' +
      '<div>' +
        '<h3 style="font-size:.8rem;font-weight:600;text-transform:uppercase;letter-spacing:.1em;color:#fff">Company</h3>' +
        '<ul style="list-style:none;margin:1.25rem 0 0;padding:0;display:flex;flex-direction:column;gap:.75rem;font-size:.875rem">' +
          '<li><a href="' + ROOT + 'about-us.html">About Us</a></li>' +
          '<li><a href="' + ROOT + 'services.html">Services</a></li>' +
          '<li><a href="' + ROOT + 'pricing.html">Pricing</a></li>' +
          '<li><a href="' + ROOT + 'blogs.html">Blog</a></li>' +
          '<li><a href="' + ROOT + 'contact.html">Contact</a></li>' +
        '</ul>' +
      '</div>' +
      '<div>' +
        '<h3 style="font-size:.8rem;font-weight:600;text-transform:uppercase;letter-spacing:.1em;color:#fff">Services</h3>' +
        '<ul style="list-style:none;margin:1.25rem 0 0;padding:0;display:flex;flex-direction:column;gap:.75rem;font-size:.875rem">' +
          '<li><a href="' + ROOT + 'services/pipe-repair.html">Pipe Repair</a></li>' +
          '<li><a href="' + ROOT + 'services/bathroom-fitting.html">Bathroom Fitting</a></li>' +
          '<li><a href="' + ROOT + 'services/drain-cleaning.html">Drain Cleaning</a></li>' +
          '<li><a href="' + ROOT + 'services/water-heater.html">Water Heaters</a></li>' +
          '<li><a href="' + ROOT + 'services/emergency-plumbing.html">Emergency Service</a></li>' +
        '</ul>' +
      '</div>' +
      '<div>' +
        '<h3 style="font-size:.8rem;font-weight:600;text-transform:uppercase;letter-spacing:.1em;color:#fff">Get in touch</h3>' +
        '<ul style="list-style:none;margin:1.25rem 0 0;padding:0;display:flex;flex-direction:column;gap:1rem;font-size:.875rem;color:rgba(255,255,255,.6)">' +
          '<li class="flex gap-2"><i class="bi bi-geo-alt" style="color:var(--brand-400)"></i> Plot 42, Road No 12, Banjara Hills, Hyderabad, Telangana 500034</li>' +
          '<li class="flex gap-2"><i class="bi bi-telephone" style="color:var(--brand-400)"></i> <a href="tel:+918005550199">+91 80055 50199</a></li>' +
          '<li class="flex gap-2"><i class="bi bi-envelope" style="color:var(--brand-400)"></i> <a href="mailto:hello@aquafixplumbing.com">hello@aquafixplumbing.com</a></li>' +
          '<li class="flex gap-2"><i class="bi bi-clock" style="color:var(--brand-400)"></i> Mon–Sat: 7am–8pm · 24/7 Emergency</li>' +
        '</ul>' +
        '<a href="' + ROOT + 'contact.html" class="btn btn-primary" style="margin-top:1.5rem;width:100%">Book a job <i class="bi bi-arrow-right"></i></a>' +
      '</div>' +
      '</div>' +
      '<div class="flex items-center justify-between" style="margin-top:3.5rem;border-top:1px solid rgba(255,255,255,.1);padding-top:2rem;font-size:.85rem;color:rgba(255,255,255,.5);flex-wrap:wrap;gap:1rem">' +
        '<p>© <span data-year>2026</span> AquaFix Plumbing. All rights reserved.</p>' +
        '<div class="flex gap-4">' +
          '<a href="' + ROOT + 'privacy-policy.html">Privacy Policy</a>' +
          '<a href="' + ROOT + 'terms-and-conditions.html">Terms &amp; Conditions</a>' +
        '</div>' +
      '</div>' +
      '</div>';
  }
})();
