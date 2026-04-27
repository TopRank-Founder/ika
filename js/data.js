/* ========================================
   INTERNET KI AWAAZ — Data Store
   ======================================== */

const DataStore = {
  // ── Get collection ──
  get(collection) {
    try {
      const data = localStorage.getItem(`ika_${collection}`);
      return data ? JSON.parse(data) : [];
    } catch { return []; }
  },

  // ── Save collection ──
  save(collection, data) {
    localStorage.setItem(`ika_${collection}`, JSON.stringify(data));
  },

  // ── Get single item by id ──
  getById(collection, id) {
    return this.get(collection).find(item => item.id === id) || null;
  },

  // ── Get by slug ──
  getBySlug(collection, slug) {
    return this.get(collection).find(item => item.slug === slug) || null;
  },

  // ── Create item ──
  create(collection, item) {
    const items = this.get(collection);
    item.id = this.generateId();
    item.createdAt = new Date().toISOString();
    item.updatedAt = new Date().toISOString();
    items.unshift(item);
    this.save(collection, items);
    return item;
  },

  // ── Update item ──
  update(collection, id, updates) {
    const items = this.get(collection);
    const index = items.findIndex(item => item.id === id);
    if (index === -1) return null;
    items[index] = { ...items[index], ...updates, updatedAt: new Date().toISOString() };
    this.save(collection, items);
    return items[index];
  },

  // ── Delete item ──
  delete(collection, id) {
    const items = this.get(collection).filter(item => item.id !== id);
    this.save(collection, items);
  },

  // ── Query helpers ──
  getByCategory(category, limit) {
    let articles = this.get('articles').filter(a => a.isPublished && a.category === category);
    if (limit) articles = articles.slice(0, limit);
    return articles;
  },

  getPublished(limit, offset = 0) {
    let articles = this.get('articles').filter(a => a.isPublished);
    articles.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
    if (limit) return articles.slice(offset, offset + limit);
    return articles;
  },

  getBreakingNews() {
    return this.get('breakingNews').filter(n => n.isActive);
  },

  getTrending(limit = 10) {
    return this.get('articles')
      .filter(a => a.isPublished)
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .slice(0, limit);
  },

  getByType(type, limit) {
    let articles = this.get('articles').filter(a => a.isPublished && a.type === type);
    if (limit) articles = articles.slice(0, limit);
    return articles;
  },

  search(query) {
    if (!query || query.length < 2) return [];
    const q = query.toLowerCase();
    return this.get('articles').filter(a =>
      a.isPublished && (
        a.title.toLowerCase().includes(q) ||
        (a.body && a.body.toLowerCase().includes(q)) ||
        (a.tags && a.tags.some(t => t.toLowerCase().includes(q)))
      )
    );
  },

  incrementViews(id) {
    const items = this.get('articles');
    const item = items.find(a => a.id === id);
    if (item) {
      item.views = (item.views || 0) + 1;
      this.save('articles', items);
    }
  },

  // ── Settings ──
  getSetting(key) {
    try {
      const settings = JSON.parse(localStorage.getItem('ika_settings') || '{}');
      return settings[key];
    } catch { return null; }
  },

  setSetting(key, value) {
    try {
      const settings = JSON.parse(localStorage.getItem('ika_settings') || '{}');
      settings[key] = value;
      localStorage.setItem('ika_settings', JSON.stringify(settings));
    } catch { /* ignore */ }
  },

  getSettings() {
    try {
      return JSON.parse(localStorage.getItem('ika_settings') || '{}');
    } catch { return {}; }
  },

  saveSettings(settings) {
    localStorage.setItem('ika_settings', JSON.stringify(settings));
  },

  // ── Page Content ──
  getPage(slug) {
    return this.get('pages').find(p => p.slug === slug) || null;
  },

  savePage(slug, content) {
    const pages = this.get('pages');
    const index = pages.findIndex(p => p.slug === slug);
    if (index >= 0) {
      pages[index].content = content;
      pages[index].updatedAt = new Date().toISOString();
    } else {
      pages.push({ id: this.generateId(), slug, content, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
    }
    this.save('pages', pages);
  },

  // ── Helpers ──
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
  },

  generateSlug(text) {
    return text.trim().toLowerCase()
      .replace(/[^\u0900-\u097Fa-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .substring(0, 80);
  },

  // ── Export / Import ──
  exportAll() {
    const data = {};
    ['articles', 'categories', 'breakingNews', 'pages', 'media'].forEach(c => {
      data[c] = this.get(c);
    });
    data.settings = this.getSettings();
    return JSON.stringify(data, null, 2);
  },

  importAll(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      ['articles', 'categories', 'breakingNews', 'pages', 'media'].forEach(c => {
        if (data[c]) this.save(c, data[c]);
      });
      if (data.settings) this.saveSettings(data.settings);
      return true;
    } catch { return false; }
  },

  isInitialized() {
    return localStorage.getItem('ika_initialized') === 'true';
  },

  markInitialized() {
    localStorage.setItem('ika_initialized', 'true');
  }
};
