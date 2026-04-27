'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { DataStore } from '@/lib/data';
import { initSampleData } from '@/lib/sample-data';

export default function Home() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    initSampleData();
    
    // Load initial data
    const allArticles = DataStore.getPublished(5);
    const trending = DataStore.getTrending(8);
    const categoriesList = DataStore.get('categories');
    
    setData({
      allArticles,
      trending,
      categories: categoriesList,
      politics: DataStore.getByCategory('politics', 4),
      crime: DataStore.getByCategory('crime', 4),
      sports: DataStore.getByCategory('sports', 4),
      entertainment: DataStore.getByCategory('entertainment', 4),
      business: DataStore.getByCategory('business', 4),
    });
  }, []);

  if (!data) return <main className="container" style={{ paddingTop: 'var(--space-6)', minHeight: '60vh' }}>Loading...</main>;

  const defaultImages: Record<string, string> = {
    politics: '/assets/images/news-politics.png',
    sports: '/assets/images/news-sports.png',
    local: '/assets/images/news-local.png',
    hero: '/assets/images/hero-banner.png'
  };

  const getArticleImage = (article: any) => {
    if (article.thumbnail) return article.thumbnail;
    if (defaultImages[article.category]) return defaultImages[article.category];
    return '/assets/images/hero-banner.png';
  };

  const getCategoryClass = (cat: string) => cat; // simplified
  const getCategoryName = (cat: string) => {
    const c = data.categories.find((c: any) => c.id === cat);
    return c ? c.name : cat;
  };

  const timeAgo = (dateStr: string) => {
    return "हाल ही में"; // Placeholder for timeAgo logic to keep it simple
  };

  return (
    <>
      {/* ═══ Breaking News Ticker ═══ */}
      <div className="ticker-bar">
        <div className="ticker-label">
          ब्रेकिंग न्यूज़
        </div>
        <div className="ticker-content">
          <div className="ticker-track">
            {/* Implement dynamic breaking news here if needed */}
            <span className="ticker-item"><span className="ticker-badge">Live</span> लखनऊ में भारी बारिश की चेतावनी...</span>
          </div>
        </div>
      </div>

      {/* ═══ Main Content ═══ */}
      <main className="container" style={{ paddingTop: 'var(--space-6)' }}>
        
        {/* Hero Section */}
        <section className="hero-section" id="hero-section">
          {data.allArticles.length > 0 && (
            <Link href={`/article/${data.allArticles[0].id}`} className="news-card-hero">
              <img src={getArticleImage(data.allArticles[0])} alt="Hero News" loading="eager" />
              <div className="hero-overlay">
                <span className={`category-badge ${getCategoryClass(data.allArticles[0].category)}`}>{getCategoryName(data.allArticles[0].category)}</span>
                <h1 className="card-title">{data.allArticles[0].title}</h1>
                <p className="card-excerpt">{data.allArticles[0].excerpt}</p>
                <div className="card-meta">
                  <span className="author">{data.allArticles[0].author || 'संपादक'}</span>
                  <span>•</span>
                  <span>{timeAgo(data.allArticles[0].publishDate)}</span>
                </div>
              </div>
            </Link>
          )}

          <div className="hero-sidebar-grid">
            {data.allArticles.slice(1, 5).map((a: any) => (
              <Link href={`/article/${a.id}`} className="news-card-horizontal" style={{ background: 'var(--bg-card)' }} key={a.id}>
                <div className="card-image"><img src={getArticleImage(a)} alt={a.title} loading="lazy" /></div>
                <div className="card-body">
                  <span className={`category-badge ${getCategoryClass(a.category)}`} style={{ fontSize: '10px', marginBottom: '4px' }}>{getCategoryName(a.category)}</span>
                  <h4 className="card-title line-clamp-2" style={{ fontSize: 'var(--text-sm)' }}>{a.title}</h4>
                  <div className="card-meta"><span>{timeAgo(a.publishDate)}</span></div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Main Layout: Content + Sidebar */}
        <div className="main-layout">
          <div className="main-content">

            {/* Category Sections */}
            {['politics', 'crime', 'sports', 'entertainment', 'business'].map((catKey) => {
              const catArticles = data[catKey] || [];
              const categoryDetails = data.categories.find((c: any) => c.id === catKey);
              if (!categoryDetails) return null;

              return (
                <section className="category-section" key={catKey}>
                  <div className="section-heading">
                    <h2>{categoryDetails.icon} {categoryDetails.name}</h2>
                    <Link href={`/category/${catKey}`} className="view-all">और पढ़ें <i className="fas fa-arrow-right"></i></Link>
                  </div>
                  <div className="news-grid">
                    {catArticles.length > 0 ? catArticles.map((a: any) => (
                      <Link href={`/article/${a.id}`} className="news-card" key={a.id}>
                        <div className="card-image">
                          <img src={getArticleImage(a)} alt={a.title} loading="lazy" />
                          <span className={`category-badge ${getCategoryClass(a.category)}`}>{getCategoryName(a.category)}</span>
                        </div>
                        <div className="card-body">
                          <h3 className="card-title line-clamp-2">{a.title}</h3>
                          <p className="card-excerpt line-clamp-2">{a.excerpt}</p>
                          <div className="card-meta">
                            <span className="author">{a.author || 'संपादक'}</span>
                            <span>•</span>
                            <span>{timeAgo(a.publishDate)}</span>
                            <span>•</span>
                            <span><i className="far fa-eye"></i> {a.views || 0}</span>
                          </div>
                        </div>
                      </Link>
                    )) : (
                      <p style={{ color: 'var(--text-tertiary)', padding: 'var(--space-4)' }}>इस श्रेणी में अभी कोई खबर नहीं है।</p>
                    )}
                  </div>
                </section>
              );
            })}

            {/* Facebook Page Plugin Section */}
            <section className="category-section fb-section">
              <div className="fb-feed-wrapper">
                <div className="fb-page" data-href="https://www.facebook.com/Internetkiawaaz/" data-tabs="timeline" data-width="500" data-height="" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true">
                  <blockquote cite="https://www.facebook.com/Internetkiawaaz/" className="fb-xfbml-parse-ignore">
                    <a href="https://www.facebook.com/Internetkiawaaz/">Internet ki Awaaz</a>
                  </blockquote>
                </div>
              </div>
            </section>

          </div>

          {/* Sidebar */}
          <aside className="sidebar">
            <div className="sidebar-widget">
              <h3 className="widget-title">🔥 ट्रेंडिंग</h3>
              <div className="trending-list">
                {data.trending.map((a: any, i: number) => (
                  <Link href={`/article/${a.id}`} className="trending-item" key={a.id}>
                    <span className="trending-number">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <div className="trending-title line-clamp-2">{a.title}</div>
                      <div className="trending-time">{timeAgo(a.publishDate)}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="sidebar-widget">
              <h3 className="widget-title">📂 श्रेणियाँ</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                {data.categories.map((c: any) => (
                  <Link href={`/category/${c.id}`} key={c.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-2) var(--space-3)', borderRadius: 'var(--radius-md)', transition: 'all 0.2s', color: 'var(--text-primary)', fontSize: 'var(--text-sm)' }}>
                    <span>{c.icon} {c.name}</span>
                    <span style={{ color: 'var(--text-tertiary)' }}><i className="fas fa-chevron-right" style={{ fontSize: '10px' }}></i></span>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
