/* ========================================
   INTERNET KI AWAAZ — Utility JS Modules
   ======================================== */

// ── Dark Mode ──
const DarkMode = {
  init() {
    const saved = localStorage.getItem('ika_darkmode');
    if (saved === 'true' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.body.classList.add('dark-mode');
    }
    document.querySelectorAll('.dark-mode-toggle').forEach(btn => {
      btn.addEventListener('click', () => this.toggle());
    });
  },
  toggle() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('ika_darkmode', document.body.classList.contains('dark-mode'));
  }
};

// ── Ticker ──
const Ticker = {
  init() {
    const track = document.querySelector('.ticker-track');
    if (!track) return;
    const news = DataStore.getBreakingNews();
    if (!news.length) return;
    track.innerHTML = news.map(n =>
      `<span class="ticker-item"><a href="${n.link || '#'}">${n.text}</a></span><span class="ticker-separator">◆</span>`
    ).join('') + news.map(n =>
      `<span class="ticker-item"><a href="${n.link || '#'}">${n.text}</a></span><span class="ticker-separator">◆</span>`
    ).join('');
  }
};

// ── Share Buttons ──
const Share = {
  whatsapp(title, url) { window.open(`https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`); },
  facebook(url) { window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`); },
  twitter(title, url) { window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`); },
  telegram(title, url) { window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`); },
  copyLink(url) {
    navigator.clipboard.writeText(url).then(() => showToast('लिंक कॉपी हो गया!', 'success'));
  },
  init() {
    document.querySelectorAll('[data-share]').forEach(btn => {
      btn.addEventListener('click', () => {
        const type = btn.dataset.share;
        const title = document.title;
        const url = window.location.href;
        if (this[type]) this[type](title, url);
      });
    });
  }
};

// ── Search ──
const SearchEngine = {
  init() {
    document.querySelectorAll('.search-bar input').forEach(input => {
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          const q = input.value.trim();
          if (q) window.location.href = `search.html?q=${encodeURIComponent(q)}`;
        }
      });
    });
  }
};

// ── Toast Notifications ──
function showToast(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => { toast.remove(); }, 3000);
}

// ── Back to Top ──
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ── Lazy Loading ──
function initLazyImages() {
  const images = document.querySelectorAll('img[loading="lazy"]');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) { img.src = img.dataset.src; }
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    }, { rootMargin: '100px' });
    images.forEach(img => observer.observe(img));
  } else {
    images.forEach(img => { if (img.dataset.src) img.src = img.dataset.src; img.classList.add('loaded'); });
  }
}

// ── Hindi Date ──
function getHindiDate() {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return new Date().toLocaleDateString('hi-IN', options);
}

// ── Time Ago ──
function timeAgo(dateString) {
  const seconds = Math.floor((Date.now() - new Date(dateString)) / 1000);
  if (seconds < 60) return 'अभी';
  if (seconds < 3600) return `${Math.floor(seconds / 60)} मिनट पहले`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} घंटे पहले`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} दिन पहले`;
  return new Date(dateString).toLocaleDateString('hi-IN');
}

// ── Sticky Header ──
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  });
}

// ── Mobile Menu ──
function initMobileMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.mobile-menu');
  const overlay = document.querySelector('.mobile-menu-overlay');
  if (!toggle || !menu) return;
  toggle.addEventListener('click', () => {
    menu.classList.toggle('active');
    if (overlay) overlay.classList.toggle('active');
  });
  if (overlay) {
    overlay.addEventListener('click', () => {
      menu.classList.remove('active');
      overlay.classList.remove('active');
    });
  }
}

// ── URL Params ──
function getUrlParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

// ── Category Color ──
function getCategoryClass(catId) {
  const map = { politics: 'politics', crime: 'crime', entertainment: 'entertainment', sports: 'sports', business: 'business', health: 'health', education: 'education', local: 'local', video: 'video', breaking: 'breaking' };
  return map[catId] || '';
}

function getCategoryName(catId) {
  const cats = DataStore.get('categories');
  const cat = cats.find(c => c.id === catId);
  return cat ? cat.name : catId;
}

// ── Floating WhatsApp Button ──
function initFloatingWhatsApp() {
  const btn = document.createElement('a');
  btn.href = 'https://wa.me/917905895936';
  btn.target = '_blank';
  btn.className = 'floating-whatsapp';
  btn.innerHTML = '<i class="fab fa-whatsapp"></i>';
  document.body.appendChild(btn);
}

// ── Global Scroll Animations ──
function initScrollAnimations() {
  const elements = document.querySelectorAll('.news-card, .section-heading, .widget-title, .footer-col, .stat-card, .glass-panel, .contact-header');
  elements.forEach(el => el.classList.add('animate-on-scroll'));

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -80px 0px', threshold: 0.1 });
    elements.forEach(el => observer.observe(el));
  } else {
    elements.forEach(el => el.classList.add('is-visible'));
  }
}

// Automatically initialize global elements
document.addEventListener('DOMContentLoaded', () => {
  initFloatingWhatsApp();
  initScrollAnimations();
});

