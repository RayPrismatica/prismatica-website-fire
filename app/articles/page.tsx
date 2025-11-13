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
          <h2 style={{ fontFamily: 'var(--font-passion), sans-serif' }}><span style={{ borderBottom: '4px solid #D43225' }}>ARTICLES</span></h2>

          <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '0 0 32px 0' }} />

          {articles.length === 0 ? (
            <p>Loading articles...</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {articles.map((article) => (
                <article
                  key={article.id}
                  style={{
                    cursor: 'pointer',
                    borderLeft: '3px solid transparent',
                    paddingLeft: '24px',
                    paddingTop: '32px',
                    paddingBottom: '32px',
                    borderBottom: '1px solid #e0e0e0',
                    transition: 'border-left-color 0.2s ease',
                  }}
                  onClick={() => setSelectedArticle(article)}
                  onMouseEnter={(e) => e.currentTarget.style.borderLeftColor = '#D43225'}
                  onMouseLeave={(e) => e.currentTarget.style.borderLeftColor = 'transparent'}
                >
                  {/* Article Metadata */}
                  <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '11px', color: '#999', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, fontFamily: '"Noto Sans", sans-serif' }}>
                    <time>{new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</time>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>

                  {/* Title */}
                  <h3 style={{
                    fontFamily: '"Noto Sans", sans-serif',
                    fontSize: '22px',
                    fontWeight: 700,
                    lineHeight: '1.3',
                    marginBottom: '12px',
                    color: '#000',
                    letterSpacing: '-0.3px'
                  }}>
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p style={{
                    fontSize: '15px',
                    lineHeight: '1.6',
                    color: '#666',
                    marginBottom: '0'
                  }}>
                    {article.excerpt}
                  </p>
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
        <div style={{ marginBottom: '48px', maxWidth: '680px' }}>
          <div style={{
            marginBottom: '16px',
            fontSize: '11px',
            color: '#999',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            fontWeight: 600,
            fontFamily: '"Noto Sans", sans-serif'
          }}>
            <time>{new Date(selectedArticle.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</time>
            <span style={{ margin: '0 8px' }}>•</span>
            <span>{selectedArticle.readTime}</span>
          </div>

          <h1 style={{
            fontFamily: '"Noto Sans", sans-serif',
            fontSize: '44px',
            fontWeight: 700,
            lineHeight: '1.15',
            marginBottom: '24px',
            color: '#000',
            letterSpacing: '-0.5px'
          }}>
            {selectedArticle.title}
          </h1>

          <p style={{
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: '22px',
            lineHeight: '1.6',
            color: '#555',
            marginBottom: '0',
            fontStyle: 'italic'
          }}>
            {selectedArticle.excerpt}
          </p>

          <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />
        </div>

        {/* Article Content */}
        <article style={{
          maxWidth: '680px',
          fontFamily: 'Georgia, "Times New Roman", serif',
          fontSize: '20px',
          lineHeight: '1.7',
          color: '#1a1a1a'
        }}>
          {selectedArticle.content.map((block: ArticleContent, index: number) => {
            if (block.type === 'heading') {
              return (
                <h2
                  key={index}
                  style={{
                    fontFamily: '"Noto Sans", sans-serif',
                    fontSize: '24px',
                    fontWeight: 700,
                    lineHeight: '1.3',
                    marginTop: '48px',
                    marginBottom: '20px',
                    color: '#000',
                    letterSpacing: '-0.3px'
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
                    marginBottom: '28px',
                    fontSize: '20px',
                    lineHeight: '1.7',
                    fontFamily: 'Georgia, "Times New Roman", serif'
                  }}
                >
                  {block.text}
                </p>
              );
            }
            return null;
          })}
        </article>

        {/* Author and Share Section */}
        <div style={{ maxWidth: '680px', marginTop: '48px' }}>
          {/* Author */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '32px',
            paddingBottom: '32px',
            borderBottom: '1px solid #e0e0e0'
          }}>
            <span style={{
              fontFamily: '"Noto Sans", sans-serif',
              fontSize: '15px',
              color: '#666',
              fontWeight: 600
            }}>
              By {selectedArticle.author}
            </span>
            <a
              href="https://www.linkedin.com/in/raytarantino/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                color: '#0077B5',
                transition: 'opacity 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>

          {/* Share Section */}
          <div>
            <p style={{
              fontFamily: '"Noto Sans", sans-serif',
              fontSize: '13px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              fontWeight: 600,
              color: '#999',
              marginBottom: '16px'
            }}>
              Share this article
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              {/* LinkedIn */}
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 16px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  color: '#0077B5',
                  fontSize: '14px',
                  fontWeight: 500,
                  textDecoration: 'none',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#0077B5';
                  e.currentTarget.style.backgroundColor = '#f8f8f8';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#ddd';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>

              {/* X (Twitter) */}
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&text=${encodeURIComponent(selectedArticle.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 16px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  color: '#000',
                  fontSize: '14px',
                  fontWeight: 500,
                  textDecoration: 'none',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#000';
                  e.currentTarget.style.backgroundColor = '#f8f8f8';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#ddd';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                X
              </a>

              {/* Email */}
              <a
                href={`mailto:?subject=${encodeURIComponent(selectedArticle.title)}&body=${encodeURIComponent(`Check out this article: ${typeof window !== 'undefined' ? window.location.href : ''}`)}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 16px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  color: '#666',
                  fontSize: '14px',
                  fontWeight: 500,
                  textDecoration: 'none',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#666';
                  e.currentTarget.style.backgroundColor = '#f8f8f8';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#ddd';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                Email
              </a>

              {/* Copy Link */}
              <button
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    navigator.clipboard.writeText(window.location.href);
                    const btn = document.activeElement as HTMLButtonElement;
                    const originalText = btn.innerHTML;
                    btn.innerHTML = btn.innerHTML.replace('Copy link', 'Copied!');
                    setTimeout(() => {
                      btn.innerHTML = originalText;
                    }, 2000);
                  }
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 16px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  backgroundColor: 'transparent',
                  color: '#666',
                  fontSize: '14px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#666';
                  e.currentTarget.style.backgroundColor = '#f8f8f8';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#ddd';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                </svg>
                Copy link
              </button>
            </div>
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '48px 0 32px 0' }} />

        <Link href="/contact" className="cta-button red">Reach Out</Link>
      </section>
    </PageLayout>
  );
}
