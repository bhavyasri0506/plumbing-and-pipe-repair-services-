/* ============================================
   AquaFix — Main JavaScript
   Header/Footer injection, Dark Mode, RTL,
   Scroll Animations, Counters, Forms
   ============================================ */

document.documentElement.classList.add('js');

/* ---------- Icon Helper (Bootstrap Icons) ---------- */
const iconMap = {
  'droplet': 'bi-droplet', 'chevron-down': 'bi-chevron-down', 'house': 'bi-house',
  'moon': 'bi-moon', 'log-in': 'bi-box-arrow-in-right', 'menu': 'bi-list',
  'facebook': 'bi-facebook', 'twitter': 'bi-twitter', 'instagram': 'bi-instagram',
  'linkedin': 'bi-linkedin', 'youtube': 'bi-youtube', 'chevron-right': 'bi-chevron-right',
  'map-pin': 'bi-geo-alt', 'phone': 'bi-telephone', 'mail': 'bi-envelope',
};
function icon(name, opts = {}) {
  const bi = iconMap[name] || name;
  const cls = opts.class ? ` ${opts.class}` : '';
  return `<i class="bi ${bi}${cls}"></i>`;
}

/* ---------- Header Injection ---------- */
function injectHeader(activePage) {
  const header = document.getElementById('site-header');
  if (!header) return;

  const navItems = [
    { label: 'Home', type: 'dropdown', active: activePage === 'home', children: [
      { label: 'Home 1', href: 'index.html', icon: 'house' },
      { label: 'Home 2', href: 'home-2.html', icon: 'house' },
    ]},
    { label: 'About', href: 'about-us.html', active: activePage === 'about' },
    { label: 'Services', href: 'services.html', active: activePage === 'services' },
    { label: 'Pricing', href: 'pricing.html', active: activePage === 'pricing' },
    { label: 'Blog', href: 'blog.html', active: activePage === 'blog' },
    { label: 'Contact', href: 'contact.html', active: activePage === 'contact' },
  ];

  const navLinksHtml = navItems.map(item => {
    if (item.type === 'dropdown') {
      return `
        <li class="nav-item dropdown">
          <a class="nav-link nav-link-c dropdown-toggle ${item.active ? 'active' : ''}" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            ${item.label}
            ${icon('chevron-down', { size: 16 })}
          </a>
          <ul class="dropdown-menu dropdown-menu-c">
            ${item.children.map(c => `
              <li>
                <a class="dropdown-item dropdown-item-c" href="${c.href}">
                  ${icon(c.icon, { size: 16 })} ${c.label}
                </a>
              </li>
            `).join('')}
          </ul>
        </li>`;
    }
    return `
      <li class="nav-item">
        <a class="nav-link nav-link-c ${item.active ? 'active' : ''}" href="${item.href}">${item.label}</a>
      </li>`;
  }).join('');

  header.innerHTML = `
    <nav class="navbar navbar-expand-lg" aria-label="Main navigation">
      <div class="container">
        <a class="navbar-brand navbar-brand-c" href="index.html" aria-label="AquaFix home">
          <span class="logo-icon">${icon('droplet', { size: 24 })}</span>
          <span><span class="brand-aqua">Aqua</span><span class="brand-fix">Fix</span></span>
        </a>

        <div class="header-controls order-lg-last d-flex align-items-center gap-2">
          <button class="icon-btn rtl-text-btn" id="rtl-toggle" aria-label="Toggle RTL" title="Toggle RTL">
            RTL
          </button>
          <button class="icon-btn" id="theme-toggle" aria-label="Toggle dark mode" title="Toggle dark mode">
            ${icon('moon', { size: 20 })}
          </button>
          <a href="login.html" class="btn-login d-none d-lg-inline-flex">
            ${icon('log-in', { size: 18 })} Login
          </a>
          <button class="navbar-toggler navbar-toggler-c d-lg-none" type="button"
            data-bs-toggle="collapse" data-bs-target="#navMain" aria-controls="navMain"
            aria-expanded="false" aria-label="Toggle navigation">
            ${icon('menu', { size: 24 })}
          </button>
        </div>

        <div class="collapse navbar-collapse" id="navMain">
          <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
            ${navLinksHtml}
          </ul>
          <a href="login.html" class="btn-login d-lg-none mb-2">
            ${icon('log-in', { size: 18 })} Login
          </a>
        </div>
      </div>
    </nav>
  `;

  setupThemeToggle();
  setupRtlToggle();
  setupHeaderScroll();
}

/* ---------- Footer Injection ---------- */
function injectFooter() {
  const footer = document.getElementById('site-footer');
  if (!footer) return;

  footer.innerHTML = `
    <div class="container">
      <div class="row g-4">
        <div class="col-lg-3 col-md-6">
          <div class="footer-brand">
            <div class="d-flex align-items-center gap-2 mb-3">
              <span class="logo-icon">${icon('droplet', { size: 24 })}</span>
              <span class="brand-name"><span class="brand-aqua">Aqua</span><span class="brand-fix">Fix</span></span>
            </div>
            <p class="footer-text">
              Reliable plumbing and pipe repair services you can trust. From emergency leaks to full bathroom
              installations, our certified plumbers deliver quality workmanship every time.
            </p>
            <div class="footer-social">
              <a href="#" aria-label="Facebook">${icon('facebook', { size: 18 })}</a>
              <a href="#" aria-label="Twitter">${icon('twitter', { size: 18 })}</a>
              <a href="#" aria-label="Instagram">${icon('instagram', { size: 18 })}</a>
              <a href="#" aria-label="LinkedIn">${icon('linkedin', { size: 18 })}</a>
              <a href="#" aria-label="YouTube">${icon('youtube', { size: 18 })}</a>
            </div>
          </div>
        </div>

        <div class="col-lg-3 col-md-6 col-6">
          <h4 class="footer-heading">Company</h4>
          <ul class="footer-links">
            <li><a href="index.html">${icon('chevron-right', { size: 14 })} Home</a></li>
            <li><a href="about-us.html">${icon('chevron-right', { size: 14 })} About Us</a></li>
            <li><a href="services.html">${icon('chevron-right', { size: 14 })} Services</a></li>
            <li><a href="pricing.html">${icon('chevron-right', { size: 14 })} Pricing</a></li>
            <li><a href="blog.html">${icon('chevron-right', { size: 14 })} Blog</a></li>
            <li><a href="contact.html">${icon('chevron-right', { size: 14 })} Contact</a></li>
          </ul>
        </div>

        <div class="col-lg-3 col-md-6 col-6">
          <h4 class="footer-heading">Services</h4>
          <ul class="footer-links">
            <li><a href="service-pipe-repair.html">${icon('chevron-right', { size: 14 })} Pipe Repair</a></li>
            <li><a href="service-bathroom-fitting.html">${icon('chevron-right', { size: 14 })} Bathroom Fitting</a></li>
            <li><a href="service-drain-cleaning.html">${icon('chevron-right', { size: 14 })} Drain Cleaning</a></li>
            <li><a href="service-water-heater.html">${icon('chevron-right', { size: 14 })} Water Heaters</a></li>
            <li><a href="services.html">${icon('chevron-right', { size: 14 })} All Services</a></li>
          </ul>
        </div>

        <div class="col-lg-3 col-md-6">
          <h4 class="footer-heading">Get in Touch</h4>
          <div class="footer-contact-item">
            <span class="icon-wrap">${icon('map-pin', { size: 20 })}</span>
            <div>
              <div class="label">Address</div>
              <div class="value">Plot No 42, Road No 12, Banjara Hills, Hyderabad, Telangana 500034</div>
            </div>
          </div>
          <div class="footer-contact-item">
            <span class="icon-wrap">${icon('phone', { size: 20 })}</span>
            <div>
              <div class="label">Emergency Hotline</div>
              <div class="value">+91 90000 12345</div>
            </div>
          </div>
          <div class="footer-contact-item">
            <span class="icon-wrap">${icon('mail', { size: 20 })}</span>
            <div>
              <div class="label">Email</div>
              <div class="value">support@aquafix.in</div>
            </div>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; 2026 AquaFix Plumbing. All rights reserved.</p>
        <ul class="footer-bottom-links">
          <li><a href="privacy-policy.html">Privacy Policy</a></li>
          <li><a href="terms-and-conditions.html">Terms &amp; Conditions</a></li>
          <li><a href="404.html">404</a></li>
          <li><a href="coming-soon.html">Coming Soon</a></li>
          <li><a href="maintenance.html">Maintenance</a></li>
        </ul>
      </div>
    </div>
  `;


}

/* ---------- Theme Toggle ---------- */
function setupThemeToggle() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;

  const saved = localStorage.getItem('aquafix-theme') || 'light';
  applyTheme(saved);

  btn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-bs-theme') || 'light';
    const next = current === 'light' ? 'dark' : 'light';
    applyTheme(next);
    localStorage.setItem('aquafix-theme', next);
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-bs-theme', theme);
  const btn = document.getElementById('theme-toggle');
  if (btn) {
    btn.innerHTML = theme === 'dark' ? '<i class="bi bi-sun"></i>' : '<i class="bi bi-moon"></i>';
  }
}

/* ---------- RTL Toggle ---------- */
function setupRtlToggle() {
  const btn = document.getElementById('rtl-toggle');
  if (!btn) return;

  const saved = localStorage.getItem('aquafix-rtl') || 'ltr';
  applyRtl(saved);

  btn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('dir') || 'ltr';
    const next = current === 'ltr' ? 'rtl' : 'ltr';
    applyRtl(next);
    localStorage.setItem('aquafix-rtl', next);
  });
}

function applyRtl(dir) {
  document.documentElement.setAttribute('dir', dir);
  if (dir === 'rtl') {
    document.documentElement.setAttribute('lang', 'ar');
  } else {
    document.documentElement.setAttribute('lang', 'en');
  }
}

/* ---------- Header Scroll Shadow ---------- */
function setupHeaderScroll() {
  const header = document.getElementById('site-header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }, { passive: true });
}

/* ---------- Scroll Animations ---------- */
function setupScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.animate-on-scroll, .reveal, .service-row, .testimonial-card, .story-card').forEach(el => observer.observe(el));
}

/* ---------- Counter Animation ---------- */
function setupCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.counter, 10);
        const suffix = el.dataset.suffix || '';
        const duration = 2000;
        let start = 0;
        const stepTime = 20;
        const steps = duration / stepTime;
        const increment = target / steps;
        const timer = setInterval(() => {
          start += increment;
          if (start >= target) {
            el.textContent = target.toLocaleString() + suffix;
            clearInterval(timer);
          } else {
            el.textContent = Math.floor(start).toLocaleString() + suffix;
          }
        }, stepTime);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

/* ---------- Password Eye Toggle ---------- */
function setupPasswordToggles() {
  document.querySelectorAll('[data-password-toggle]').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.passwordToggle;
      const input = document.getElementById(targetId);
      if (!input) return;
      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';
      btn.innerHTML = isPassword ? '<i class="bi bi-eye-slash"></i>' : '<i class="bi bi-eye"></i>';
    });
  });
}

/* ---------- Toast ---------- */
function showToast(message) {
  let container = document.querySelector('.toast-container-c');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container-c';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = 'toast-c';
  toast.innerHTML = `<i class="bi bi-check-circle"></i><span class="msg">${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    toast.style.transition = 'all .3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

/* ---------- FAQ Accordion ---------- */
function setupFaq() {
  document.querySelectorAll('[data-faq-item]').forEach(item => {
    const header = item.querySelector('[data-faq-header]');
    const body = item.querySelector('[data-faq-body]');
    if (!header || !body) return;
    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('[data-faq-item].open').forEach(o => {
        o.classList.remove('open');
        const b = o.querySelector('[data-faq-body]');
        if (b) b.style.maxHeight = null;
        const i = o.querySelector('[data-faq-icon]');
        if (i) i.style.transform = 'rotate(0deg)';
      });
      if (!isOpen) {
        item.classList.add('open');
        body.style.maxHeight = body.scrollHeight + 'px';
        const i = item.querySelector('[data-faq-icon]');
        if (i) i.style.transform = 'rotate(180deg)';
      }
    });
  });
}

/* ---------- FAQ Tabs ---------- */
function setupFaqTabs() {
  document.querySelectorAll('[data-faq-tabs]').forEach(wrap => {
    const buttons = wrap.querySelectorAll('.faq-tab-btn');
    const panels = wrap.querySelectorAll('.faq-tab-panel');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-tab');
        buttons.forEach(b => b.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const panel = wrap.querySelector('#' + target);
        if (panel) panel.classList.add('active');
      });
    });
  });
}

/* ---------- Before/After Slider ---------- */
function setupBeforeAfter() {
  document.querySelectorAll('[data-ba-slider]').forEach(slider => {
    const handle = slider.querySelector('[data-ba-handle]');
    const after = slider.querySelector('[data-ba-after]');
    if (!handle || !after) return;
    let isDragging = false;

    const setPos = (x) => {
      const rect = slider.getBoundingClientRect();
      let pct = ((x - rect.left) / rect.width) * 100;
      pct = Math.max(0, Math.min(100, pct));
      after.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
      handle.style.left = pct + '%';
    };

    slider.addEventListener('mousedown', (e) => { isDragging = true; setPos(e.clientX); });
    window.addEventListener('mousemove', (e) => { if (isDragging) setPos(e.clientX); });
    window.addEventListener('mouseup', () => { isDragging = false; });
    slider.addEventListener('touchstart', (e) => { isDragging = true; setPos(e.touches[0].clientX); }, { passive: true });
    window.addEventListener('touchmove', (e) => { if (isDragging) setPos(e.touches[0].clientX); }, { passive: true });
    window.addEventListener('touchend', () => { isDragging = false; });
  });
}

/* ---------- Form Handlers ---------- */
function setupForms() {
  document.querySelectorAll('[data-booking-form]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Booking request sent! We will call you shortly.');
      form.reset();
    });
  });
  document.querySelectorAll('[data-contact-form]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Message sent! We will get back to you soon.');
      form.reset();
    });
  });
  document.querySelectorAll('[data-comment-form]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Comment posted successfully!');
      form.reset();
    });
  });
  document.querySelectorAll('[data-auth-form]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Success! Redirecting...');
      setTimeout(() => { window.location.href = 'index.html'; }, 1200);
    });
  });
  document.querySelectorAll('[data-newsletter-form]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Subscribed successfully!');
      form.reset();
    });
  });
}

/* ---------- Expose to global scope for inline scripts ---------- */
window.setupThemeToggle = setupThemeToggle;
window.setupRtlToggle = setupRtlToggle;
window.setupPasswordToggles = setupPasswordToggles;
window.setupForms = setupForms;
window.showToast = showToast;
window.icon = icon;

/* ---------- Hero Slider ---------- */
function setupHeroSlider() {
  const slider = document.querySelector('[data-hero-slider]');
  if (!slider) return;

  const slides = slider.querySelectorAll('.hero-slide');
  const indicators = slider.querySelectorAll('[data-hero-indicators] .hero-indicator');
  const prevBtn = slider.querySelector('[data-hero-prev]');
  const nextBtn = slider.querySelector('[data-hero-next]');
  if (!slides.length) return;

  let current = 0;
  let timer = null;

  function show(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((s, i) => s.classList.toggle('active', i === current));
    indicators.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function restart() {
    clearInterval(timer);
    timer = setInterval(next, 4000);
  }

  const next = () => { show(current + 1); restart(); };
  const prev = () => { show(current - 1); restart(); };

  if (nextBtn) nextBtn.addEventListener('click', next);
  if (prevBtn) prevBtn.addEventListener('click', prev);

  indicators.forEach((d, i) => d.addEventListener('click', () => { show(i); restart(); }));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  });

  let touchStartX = 0;
  slider.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
  slider.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { diff > 0 ? next() : prev(); }
  }, { passive: true });

  timer = setInterval(next, 6000);
}

/* ---------- Init ---------- */
function initApp() {
  injectHeader(detectActivePage());
  injectFooter();
  setupScrollAnimations();
  setupCounters();
  setupPasswordToggles();
  setupFaq();
  setupFaqTabs();
  setupBeforeAfter();
  setupForms();
  setupHeroSlider();
}

function detectActivePage() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  if (path === '' || path === 'index.html' || path === 'home-2.html') return 'home';
  if (path === 'about-us.html') return 'about';
  if (path === 'services.html' || path.startsWith('service-')) return 'services';
  if (path === 'pricing.html') return 'pricing';
  if (path === 'blog.html' || path.startsWith('blog-details-')) return 'blog';
  if (path === 'contact.html') return 'contact';
  return '';
}

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});
