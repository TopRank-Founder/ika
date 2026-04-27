'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { DataStore } from '@/lib/data';
import { initSampleData } from '@/lib/sample-data';

export default function ArticlePage() {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    initSampleData();
    const article = DataStore.getById('articles', id as string);
    if (article) {
      DataStore.incrementViews(id as string);
      
      const categoriesList = DataStore.get('categories');
      const categoryDetails = categoriesList.find((c: any) => c.id === article.category);
      
      setData({
        article,
        categoryDetails
      });
    } else {
      setData({ notFound: true });
    }
  }, [id]);

  if (!data) return <main className="container" style={{ paddingTop: 'var(--space-6)', minHeight: '60vh' }}>Loading...</main>;
  if (data.notFound) return <main className="container" style={{ paddingTop: 'var(--space-6)', minHeight: '60vh' }}>Article not found</main>;

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
    <main className="container" style={{ paddingTop: 'var(--space-6)', minHeight: '60vh', paddingBottom: 'var(--space-6)' }}>
      <article className="single-article">
        <header className="article-header" style={{ marginBottom: 'var(--space-4)' }}>
          <span className={`category-badge ${data.article.category}`} style={{ marginBottom: 'var(--space-2)', display: 'inline-block' }}>
            {data.categoryDetails?.name || data.article.category}
          </span>
          <h1 style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-2)' }}>{data.article.title}</h1>
          <div className="card-meta" style={{ color: 'var(--text-secondary)' }}>
            <span><i className="fas fa-user"></i> {data.article.author || 'संपादक'}</span>
            <span>•</span>
            <span><i className="far fa-eye"></i> {data.article.views || 0}</span>
          </div>
        </header>

        <div className="article-featured-image" style={{ marginBottom: 'var(--space-6)' }}>
          <img src={getArticleImage(data.article)} alt={data.article.title} style={{ width: '100%', borderRadius: 'var(--radius-lg)' }} />
        </div>

        <div className="article-content" dangerouslySetInnerHTML={{ __html: data.article.body }} style={{ fontSize: 'var(--text-lg)', lineHeight: 1.8 }}>
        </div>
      </article>
    </main>
  );
}
