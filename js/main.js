/* ==========================================================================
   AquaFix — main.js
   Shared: navbar scroll, mobile menu, theme toggle, RTL toggle, reveal, FAQ
   ========================================================================== */
(function () {
  'use strict';

  var ROOT = window.AQUA_ROOT || '';

  /* ---------- Navbar scroll state ---------- */
  var navbar = document.querySelector('.navbar-custom');
  if (navbar) {
    var onScroll = function () {
      navbar.classList.toggle('scrolled', window.scrollY > 16);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Mobile drawer menu ---------- */
  var menuBtn = document.getElementById('mobileMenuBtn');
  if (menuBtn) {
    var links = [
      { href: ROOT + 'about-us.html', label: 'About', icon: 'bi-info-circle' },
      { href: ROOT + 'services.html', label: 'Services', icon: 'bi-wrench' },
      { href: ROOT + 'pricing.html', label: 'Pricing', icon: 'bi-tag' },
      { href: ROOT + 'blogs.html', label: 'Blog', icon: 'bi-journal-text' },
      { href: ROOT + 'contact.html', label: 'Contact', icon: 'bi-telephone' }
    ];
    var here = location.pathname.split('/').pop() || 'home-1.html';
    var homeActive = (here === 'home-1.html' || here === 'home-2.html') ? ' active' : '';
    var homeItem =
      '<li class="mobile-drawer-dropdown">' +
        '<button class="mobile-drawer-toggle" type="button"><i class="bi bi-house"></i> Home <i class="bi bi-chevron-down mobile-drawer-caret"></i></button>' +
        '<ul class="mobile-drawer-sublinks">' +
          '<li><a href="' + ROOT + 'home-1.html"' + (here === 'home-1.html' ? ' class="active"' : '') + '><i class="bi bi-house-door"></i> Home 1</a></li>' +
          '<li><a href="' + ROOT + 'home-2.html"' + (here === 'home-2.html' ? ' class="active"' : '') + '><i class="bi bi-house-door"></i> Home 2</a></li>' +
        '</ul>' +
      '</li>';
    var items = homeItem + links.map(function (l) {
      var active = (l.href === here) ? ' active' : '';
      return '<li><a href="' + l.href + '" class="' + active.trim() + '"><i class="bi ' + l.icon + '"></i>' + l.label + '</a></li>';
    }).join('');
    var drawer = document.createElement('aside');
    drawer.className = 'mobile-drawer';
    drawer.innerHTML =
      '<button class="mobile-drawer-close" aria-label="Close menu"><i class="bi bi-x-lg"></i></button>' +
      '<ul class="mobile-drawer-links">' + items + '</ul>' +
      '<div class="mobile-drawer-cta">' +
        '<a href="' + ROOT + 'contact.html" class="btn btn-primary" style="width:100%"><i class="bi bi-calendar-check"></i> Book Now</a>' +
        '<a href="' + ROOT + 'login.html" class="btn btn-ghost" style="width:100%"><i class="bi bi-box-arrow-in-right"></i> Login</a>' +
      '</div>';
    var overlay = document.createElement('div');
    overlay.className = 'mobile-drawer-overlay';
    document.body.appendChild(overlay);
    document.body.appendChild(drawer);
    function openMenu() { drawer.classList.add('open'); overlay.classList.add('open'); document.body.style.overflow = 'hidden'; }
    function closeMenu() { drawer.classList.remove('open'); overlay.classList.remove('open'); document.body.style.overflow = ''; }
    menuBtn.addEventListener('click', openMenu);
    overlay.addEventListener('click', closeMenu);
    drawer.querySelector('.mobile-drawer-close').addEventListener('click', closeMenu);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });
    drawer.querySelectorAll('.mobile-drawer-toggle').forEach(function (toggle) {
      toggle.addEventListener('click', function () {
        var item = toggle.closest('.mobile-drawer-dropdown');
        if (item) item.classList.toggle('open');
      });
    });
    drawer.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { closeMenu(); });
    });
  }

  /* ---------- Theme toggle ---------- */
  var themeBtn = document.getElementById('themeToggle');
  var getTheme = function () {
    return localStorage.getItem('theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  };
  var applyTheme = function (t) {
    document.documentElement.setAttribute('data-bs-theme', t);
    localStorage.setItem('theme', t);
    if (themeBtn) {
      themeBtn.innerHTML = t === 'dark' ? '<i class="bi bi-sun-fill"></i>' : '<i class="bi bi-moon-stars-fill"></i>';
      themeBtn.setAttribute('aria-label', t === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
  };
  applyTheme(getTheme());
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      applyTheme(document.documentElement.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark');
    });
  }

  /* ---------- RTL toggle ---------- */
  var rtlBtn = document.getElementById('rtlToggle');
  var getDir = function () { return localStorage.getItem('dir') || 'ltr'; };
  var applyDir = function (d) {
    document.documentElement.setAttribute('dir', d);
    document.documentElement.lang = d === 'rtl' ? 'ar' : 'en';
    localStorage.setItem('dir', d);
    if (rtlBtn) {
      rtlBtn.innerHTML = d === 'rtl' ? '<i class="bi bi-arrow-left-right"></i>' : '<i class="bi bi-arrow-left-right"></i>';
      rtlBtn.style.transform = d === 'rtl' ? 'scaleX(-1)' : 'scaleX(1)';
      rtlBtn.setAttribute('aria-label', d === 'rtl' ? 'Switch to left-to-right' : 'Switch to right-to-left');
    }
  };
  applyDir(getDir());
  if (rtlBtn) {
    rtlBtn.addEventListener('click', function () {
      applyDir(document.documentElement.getAttribute('dir') === 'rtl' ? 'ltr' : 'rtl');
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-toggle').forEach(function (toggle) {
    toggle.addEventListener('click', function () {
      var item = toggle.closest('.faq-item');
      var isOpen = item.classList.contains('open');
      // close siblings in same group
      var group = item.closest('.faq-group');
      if (group) group.querySelectorAll('.faq-item.open').forEach(function (o) {
        if (o !== item) o.classList.remove('open');
      });
      item.classList.toggle('open', !isOpen);
    });
  });

  /* ---------- Footer year ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Before/After slider ---------- */
  document.querySelectorAll('.ba-slider').forEach(function (slider) {
    var after = slider.querySelector('.ba-after');
    var handle = slider.querySelector('.ba-handle');
    var isDragging = false;
    function setPos(clientX) {
      var rect = slider.getBoundingClientRect();
      var x = Math.max(0, Math.min(rect.width, clientX - rect.left));
      var pct = (x / rect.width) * 100;
      if (after) after.style.width = pct + '%';
      if (handle) handle.style.left = pct + '%';
    }
    slider.addEventListener('mousedown', function (e) { isDragging = true; setPos(e.clientX); });
    window.addEventListener('mousemove', function (e) { if (isDragging) setPos(e.clientX); });
    window.addEventListener('mouseup', function () { isDragging = false; });
    slider.addEventListener('touchstart', function (e) { isDragging = true; setPos(e.touches[0].clientX); }, { passive: true });
    window.addEventListener('touchmove', function (e) { if (isDragging) setPos(e.touches[0].clientX); }, { passive: true });
    window.addEventListener('touchend', function () { isDragging = false; });
  });

  /* ---------- Live counter animation ---------- */
  document.querySelectorAll('[data-counter]').forEach(function (el) {
    var target = parseInt(el.getAttribute('data-counter'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var started = false;
    function animate() {
      if (started) return; started = true;
      var current = 0;
      var step = Math.max(1, Math.ceil(target / 60));
      var interval = setInterval(function () {
        current += step;
        if (current >= target) { current = target; clearInterval(interval); }
        el.textContent = current.toLocaleString('en-IN') + suffix;
      }, 25);
    }
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { animate(); io.unobserve(e.target); } });
      }, { threshold: 0.5 });
      io.observe(el);
    } else { animate(); }
  });
  /* ---------- Accordion (service detail pages) ---------- */
  document.querySelectorAll('.accordion-button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.accordion-item');
      var target = item.querySelector('.accordion-collapse');
      var isOpen = target.classList.contains('show');
      var parent = btn.closest('.accordion');
      if (parent) parent.querySelectorAll('.accordion-collapse.show').forEach(function (c) { c.classList.remove('show'); });
      if (!isOpen) target.classList.add('show');
    });
  });

  /* ---------- Booking form (service detail pages) ---------- */
  var bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var alert = document.getElementById('bookingAlert');
      if (alert) {
        alert.classList.remove('d-none');
        alert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      bookingForm.reset();
    });
  }
})();
