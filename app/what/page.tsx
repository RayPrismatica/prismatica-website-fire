import Image from 'next/image';
import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import ContentTracker from '@/components/ContentTracker';
import { getDynamicContent } from '@/lib/getDynamicContent';

export const revalidate = 0; // Disable caching

export default async function WhatWeDoPage() {
  const content = await getDynamicContent();

  return (
    <PageLayout>
      <ContentTracker newsInsight={content.newsInsight} intelligenceExample={content.intelligenceExample} />
      <section id="what" className="section active">
        <div style={{ maxWidth: '700px' }}>
          <h2 style={{ fontFamily: 'var(--font-passion), sans-serif', fontSize: '56px', letterSpacing: '0.005em', marginBottom: '48px' }}>WHAT WE <span style={{ borderBottom: '4px solid #D43225' }}>DO</span></h2>

          <p><strong>Intelligence begins where answers end.</strong></p>

        <p>Answers are cheap. Google has them. ChatGPT has them. Your competitor's intern has them.</p>

        <p>{content.intelligenceExample}</p>

        <p style={{ position: 'relative', fontSize: '17px', fontWeight: 500 }}>
          <span style={{ position: 'absolute', left: '-20px', top: '0', bottom: '0', width: '3px', backgroundColor: '#D43225' }}></span>
          Split reality into new questions. New colours emerge. Like light through a prism.
        </p>

        <h3 style={{ fontFamily: '"Noto Sans", sans-serif', fontSize: '28px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginTop: '96px', marginBottom: '32px', whiteSpace: 'nowrap', overflow: 'visible' }}>The consulting status quo</h3>

        <p>Brilliant minds. World-class thinking. Trapped in day rates and retainers. Proprietary methodologies you can rent but never own.</p>

        <p><strong>Every firm guards their thinking like gold.</strong> Makes sense. Scarcity creates value.</p>

        <p>{content.consultingInsight}</p>

        <p><strong>So we went the opposite direction. We documented how we think. Then we turned patterns into mental models. Now those models run as code.</strong></p>

        <p style={{ position: 'relative', fontSize: '17px', fontWeight: 500 }}>
          <span style={{ position: 'absolute', left: '-20px', top: '0', bottom: '0', width: '3px', backgroundColor: '#D43225' }}></span>
          Thinking should be a utility, not a privilege.
        </p>

        <h3 style={{ fontFamily: '"Noto Sans", sans-serif', fontSize: '28px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginTop: '96px', marginBottom: '32px', whiteSpace: 'nowrap', overflow: 'visible' }}>Two ways to work with us</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '48px' }}>
          {/* Consulting Services Bento Box - PRIMARY */}
          <div
            className="bento-link"
            style={{
              backgroundColor: '#fff',
              padding: '40px 32px',
              borderRadius: '12px',
              transition: 'transform 0.3s ease',
              border: '1px solid #D43225'
            }}>
            <h3 style={{ fontSize: '17px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '20px', color: '#222' }}>Consulting Services</h3>

            <p style={{ marginBottom: '16px', fontSize: '16px', lineHeight: '1.6', color: '#444' }}><strong>Some problems need custom work.</strong> Every consultancy, SaaS pitch deck, and agency website uses the same words. 'Transformation over transaction.' 'Strategic partnerships.' 'Solutions.' We won't.</p>

            <p style={{ marginBottom: '20px', fontSize: '16px', lineHeight: '1.6', color: '#444' }}>We work directly with you and adapt as the problem reveals itself. First call is diagnostic. If we're not finding new angles within 30 minutes, walk away.</p>

            <div className="cta-divider" style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid #e0e0e0', transition: 'border-color 0.3s ease' }}>
              <p style={{ fontWeight: 600, fontSize: '18px', marginBottom: '4px', color: '#222' }}>We fix things. Then we leave.</p>
              <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>No retainers. No dependency.</p>
              <Link
                href="/consulting"
                style={{
                  display: 'inline-block',
                  padding: '12px 24px',
                  backgroundColor: '#D43225',
                  color: '#ffffff',
                  fontSize: '15px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  borderRadius: '4px',
                  transition: 'background-color 0.2s',
                  border: 'none',
                  cursor: 'pointer',
                  letterSpacing: '0.3px'
                }}
              >
                Explore Services
              </Link>
            </div>
          </div>

          {/* Product Suite Bento Box - SECONDARY */}
          <div
            className="bento-link"
            style={{
              backgroundColor: '#fff',
              padding: '32px',
              borderRadius: '12px',
              transition: 'transform 0.3s ease',
              border: '1px solid #e0e0e0'
            }}>
            <h3 style={{ fontSize: '17px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '20px', color: '#222' }}>Product Suite</h3>

            <p style={{ marginBottom: '16px', fontSize: '16px', lineHeight: '1.6', color: '#444' }}>Everyone knows thinking doesn't scale. Most companies accept it. We solved it. <strong>Turned our methodology into infrastructure so your team can use it without us.</strong></p>

            <p style={{ marginBottom: '16px', fontSize: '16px', lineHeight: '1.6', color: '#444' }}>Strategic frameworks for market decisions. Question patterns for product challenges. Mental models for operational problems. Code that works with you.</p>

            <p style={{ marginBottom: '20px', fontSize: '16px', lineHeight: '1.6', color: '#444' }}>Access to 25+ live products. More launching monthly. 30-day trial.</p>

            <div className="cta-divider" style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid #e0e0e0', transition: 'border-color 0.3s ease' }}>
              <p style={{ fontWeight: 600, fontSize: '18px', marginBottom: '4px', color: '#222' }}>£299/month</p>
              <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>per seat + API credits*</p>
              <Link
                href="/products"
                style={{
                  display: 'inline-block',
                  padding: '12px 24px',
                  backgroundColor: '#fff',
                  color: '#666',
                  fontSize: '15px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  borderRadius: '4px',
                  border: '1px solid #e0e0e0',
                  transition: 'border-color 0.2s, color 0.2s',
                  cursor: 'pointer',
                  letterSpacing: '0.3px'
                }}
              >
                Explore Products
              </Link>
              <p style={{ fontSize: '12px', color: '#999', marginTop: '12px' }}>*API costs separate. Most users: £50-200/month.</p>
            </div>
          </div>
        </div>

        <h3 style={{ fontFamily: '"Noto Sans", sans-serif', fontSize: '28px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginTop: '120px', marginBottom: '32px', whiteSpace: 'nowrap', overflow: 'visible' }}>Testimonials</h3>

        <p style={{ marginBottom: '12px' }}>We could call ten clients right now. They'd say yes. We'd get five stars, glowing quotes, the whole performance.</p>

        <p style={{ marginBottom: '12px' }}><strong>We both know that would mean absolutely nothing.</strong></p>

        <p style={{ marginBottom: '12px' }}>You're not here comparing star ratings. You don't need to see testimonials promising we 'exceeded expectations' or 'delivered on time and under budget' like we deserve a medal for basic competence.</p>

        <p style={{ position: 'relative', fontSize: '17px', fontWeight: 500, marginBottom: '12px' }}>
          <span style={{ position: 'absolute', left: '-20px', top: '0', bottom: '0', width: '3px', backgroundColor: '#D43225' }}></span>
          You're here because you think differently about problems.
        </p>

        <p style={{ marginBottom: '12px' }}>The decision to work with us is intellectual, not social. Either our thinking resonates or it doesn't, and a wall of logos won't change that. Testimonials are manufactured credibility for commodity services.</p>

        <p style={{ marginBottom: '12px' }}><strong>We're not a commodity. You're not a crowd. Respect works both ways.</strong></p>

        <p>If you need proof we can think, read what we write. Look at how we built this site. Watch how Athena, our AI Advisor, responds. That's the proof.</p>

        <Link
          href="/contact"
          className="what-cta-button"
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
            cursor: 'pointer',
            marginTop: '48px'
          }}
        >
          Reach Out
        </Link>
        </div>
      </section>
    </PageLayout>
  );
}
