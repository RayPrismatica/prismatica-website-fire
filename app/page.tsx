import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import ContentTracker from '@/components/ContentTracker';
import { getDynamicContent } from '@/lib/getDynamicContent';

export const revalidate = 0; // Disable caching

export default async function HomePage() {
  const content = await getDynamicContent();

  return (
    <PageLayout>
      <ContentTracker newsInsight={content.newsInsight} intelligenceExample={content.intelligenceExample} />
      <section id="focus" className="section active">
        <div style={{ maxWidth: '1200px' }}>
          <h2 style={{ fontFamily: 'var(--font-passion), sans-serif', fontSize: 'clamp(40px, 5vw + 1rem, 80px)', letterSpacing: '0.015em' }}>
            FINALLY<br/>
            <span style={{ color: '#D43225' }}>THINKING</span> AS A SERVICE
          </h2>
          <div style={{ maxWidth: '700px' }}>
            <p>{content.newsInsight}</p>

            <p>We're Prismatica Labs. We solve problems with thinking, not themes.</p>

            <p style={{ position: 'relative', fontSize: '17px', fontWeight: 500 }}>
              <span style={{ position: 'absolute', left: '-20px', top: '0', bottom: '0', width: '3px', backgroundColor: '#D43225' }}></span>
              But the real point is... are you solving for the right variable?
            </p>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

            <p>This is a website. It loads fast, tells you what we do. Everything here serves that purpose.</p>

            <p><strong>Focus is the only currency that matters. You get it when you remove noise.</strong></p>

            <p><strong>Welcome to the quietest room on the internet.</strong></p>

            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />
          </div>
        </div>

        <Link
          href="/what"
          className="home-cta-button"
          style={{
            display: 'inline-block',
            padding: '14px 28px',
            backgroundColor: '#D43225',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '4px',
            fontSize: '17px',
            fontWeight: 600,
            transition: 'all 0.2s',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          What We Do
        </Link>
      </section>
    </PageLayout>
  );
}
