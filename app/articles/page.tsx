'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PageLayout from '@/components/PageLayout';

interface ArticleContent {
  type: string;
  text: string;
}

interface Article {
  id: string;
  title: string;
  author: string;
  date: string;
  excerpt: string;
  coverImage: string;
  coverImageCaption?: string;
  readTime: string;
  tags: string[];
  content: ArticleContent[];
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // Load articles
  useEffect(() => {
    async function loadArticles() {
      try {
        const response = await fetch('/data/articles.json');
        const data = await response.json();
        setArticles(data.articles || []);
      } catch (error) {
        console.log('Failed to load articles');
      }
    }
    loadArticles();
  }, []);

  // List view
  if (!selectedArticle) {
    return (
      <PageLayout>
        <section id="articles" className="section active">
          <h2 style={{ fontFamily: 'var(--font-passion), sans-serif' }}>ARTICLES</h2>

          <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '0 0 32px 0' }} />

          {articles.length === 0 ? (
            <p>Loading articles...</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
              {articles.map((article) => (
                <article
                  key={article.id}
                  style={{
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease',
                  }}
                  onClick={() => setSelectedArticle(article)}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  {/* Cover Image */}
                  <div style={{
                    position: 'relative',
                    width: '100%',
                    height: '400px',
                    marginBottom: '24px',
                    overflow: 'hidden',
                    borderRadius: '4px'
                  }}>
                    <Image
                      src={article.coverImage}
                      alt={article.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      priority
                    />
                  </div>

                  {/* Article Metadata */}
                  <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '16px', fontSize: '14px', color: '#666' }}>
                    <time>{new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                    <span>•</span>
                    <span>{article.readTime}</span>
                    {article.tags && article.tags.length > 0 && (
                      <>
                        <span>•</span>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          {article.tags.slice(0, 3).map((tag: string) => (
                            <span key={tag} style={{
                              padding: '4px 12px',
                              backgroundColor: '#f5f5f5',
                              borderRadius: '12px',
                              fontSize: '12px'
                            }}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Title */}
                  <h3 style={{
                    fontFamily: 'var(--font-passion), sans-serif',
                    fontSize: '32px',
                    lineHeight: '1.2',
                    marginBottom: '16px',
                    color: '#000'
                  }}>
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p style={{
                    fontSize: '18px',
                    lineHeight: '1.6',
                    color: '#333',
                    marginBottom: '16px'
                  }}>
                    {article.excerpt}
                  </p>

                  {/* Read More Link */}
                  <span style={{
                    color: '#D43225',
                    fontWeight: '500',
                    fontSize: '16px'
                  }}>
                    Read article →
                  </span>
                </article>
              ))}
            </div>
          )}
        </section>
      </PageLayout>
    );
  }

  // Expanded article view
  return (
    <PageLayout>
      <section id="article-detail" className="section active">
        {/* Back Button */}
        <button
          onClick={() => setSelectedArticle(null)}
          style={{
            background: 'none',
            border: 'none',
            color: '#D43225',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer',
            padding: '0',
            marginBottom: '32px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          ← Back to articles
        </button>

        {/* Article Header */}
        <div style={{ marginBottom: '48px' }}>
          <h1 style={{
            fontFamily: 'var(--font-passion), sans-serif',
            fontSize: '48px',
            lineHeight: '1.1',
            marginBottom: '24px',
            color: '#000'
          }}>
            {selectedArticle.title}
          </h1>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            fontSize: '16px',
            color: '#666',
            marginBottom: '32px'
          }}>
            <span style={{ fontWeight: '500', color: '#000' }}>{selectedArticle.author}</span>
            <span>•</span>
            <time>{new Date(selectedArticle.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
            <span>•</span>
            <span>{selectedArticle.readTime}</span>
          </div>

          {/* Cover Image */}
          <div style={{
            position: 'relative',
            width: '100%',
            height: '500px',
            marginBottom: '16px',
            overflow: 'hidden',
            borderRadius: '4px'
          }}>
            <Image
              src={selectedArticle.coverImage}
              alt={selectedArticle.title}
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
          {selectedArticle.coverImageCaption && (
            <p style={{
              fontSize: '14px',
              color: '#666',
              fontStyle: 'italic',
              textAlign: 'center'
            }}>
              {selectedArticle.coverImageCaption}
            </p>
          )}
        </div>

        {/* Article Content */}
        <article style={{
          maxWidth: '720px',
          margin: '0 auto',
          fontSize: '18px',
          lineHeight: '1.8',
          color: '#333'
        }}>
          {selectedArticle.content.map((block: ArticleContent, index: number) => {
            if (block.type === 'heading') {
              return (
                <h2
                  key={index}
                  style={{
                    fontFamily: 'var(--font-passion), sans-serif',
                    fontSize: '32px',
                    lineHeight: '1.3',
                    marginTop: '48px',
                    marginBottom: '24px',
                    color: '#000'
                  }}
                >
                  {block.text}
                </h2>
              );
            } else if (block.type === 'paragraph') {
              return (
                <p
                  key={index}
                  style={{
                    marginBottom: '24px',
                    fontSize: '18px',
                    lineHeight: '1.8'
                  }}
                >
                  {block.text}
                </p>
              );
            }
            return null;
          })}
        </article>

        {/* Tags */}
        {selectedArticle.tags && selectedArticle.tags.length > 0 && (
          <div style={{
            marginTop: '64px',
            paddingTop: '32px',
            borderTop: '1px solid #e0e0e0',
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap'
          }}>
            {selectedArticle.tags.map((tag: string) => (
              <span
                key={tag}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#f5f5f5',
                  borderRadius: '16px',
                  fontSize: '14px',
                  color: '#666'
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '48px 0 32px 0' }} />

        <Link href="/contact" className="cta-button red">Get In Touch</Link>
      </section>
    </PageLayout>
  );
}
