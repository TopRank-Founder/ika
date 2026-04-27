'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { DataStore } from '@/lib/data';
import { initSampleData } from '@/lib/sample-data';

export default function CategoryPage() {
  const { cat } = useParams();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    initSampleData();
    const articles = DataStore.getByCategory(cat as string, 20);
    const categoriesList = DataStore.get('categories');
    const categoryDetails = categoriesList.find((c: any) => c.id === cat);
    
    setData({
      articles,
      categoryDetails
    });
  }, [cat]);

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

  return (
    <main className="container" style={{ paddingTop: 'var(--space-6)', minHeight: '60vh' }}>
      <div className="section-heading">
        <h2>{data.categoryDetails ? `${data.categoryDetails.icon} ${data.categoryDetails.name}` : cat}</h2>
      </div>
      
      <div className="news-grid">
        {data.articles.length > 0 ? data.articles.map((a: any) => (
          <Link href={`/article/${a.id}`} className="news-card" key={a.id}>
            <div className="card-image">
              <img src={getArticleImage(a)} alt={a.title} loading="lazy" />
              <span className={`category-badge ${a.category}`}>{data.categoryDetails?.name || a.category}</span>
            </div>
            <div className="card-body">
              <h3 className="card-title line-clamp-2">{a.title}</h3>
              <p className="card-excerpt line-clamp-2">{a.excerpt}</p>
              <div className="card-meta">
                <span className="author">{a.author || 'संपादक'}</span>
                <span>•</span>
                <span><i className="far fa-eye"></i> {a.views || 0}</span>
              </div>
            </div>
          </Link>
        )) : (
          <p style={{ color: 'var(--text-tertiary)', padding: 'var(--space-4)' }}>इस श्रेणी में अभी कोई खबर नहीं है।</p>
        )}
      </div>
    </main>
  );
}
