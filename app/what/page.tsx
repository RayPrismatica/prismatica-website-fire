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
          <h2 style={{ fontFamily: 'var(--font-passion), sans-serif', fontSize: '56px', letterSpacing: '0.005em' }}>WHAT WE <span style={{ borderBottom: '4px solid #D43225' }}>DO</span></h2>

          <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '0 0 32px 0' }} />

          <p><strong>Intelligence begins where answers end.</strong></p>

        <p>Answers are cheap. Google has them. ChatGPT has them. Your competitor's intern has them.</p>

        <p>{content.intelligenceExample}</p>

        <p style={{ position: 'relative', fontSize: '17px', fontWeight: 500 }}>
          <span style={{ position: 'absolute', left: '-20px', top: '0', bottom: '0', width: '3px', backgroundColor: '#D43225' }}></span>
          Split reality into new questions. New colours emerge. Like light through a prism.
        </p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <h3 style={{ fontFamily: '"Noto Sans", sans-serif', fontSize: '28px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginTop: '48px', marginBottom: '24px' }}>The consulting status quo</h3>

        <p>Brilliant minds. World-class thinking. Trapped in day rates and retainers. Proprietary methodologies you can rent but never own.</p>

        <p><strong>Every firm guards their thinking like gold.</strong> Makes sense. Scarcity creates value.</p>

        <p>{content.consultingInsight}</p>

        <p><strong>So we went the opposite direction. We documented how we think. Then we turned patterns into mental models. Now those models run as code.</strong></p>

        <p style={{ position: 'relative', fontSize: '17px', fontWeight: 500 }}>
          <span style={{ position: 'absolute', left: '-20px', top: '0', bottom: '0', width: '3px', backgroundColor: '#D43225' }}></span>
          Thinking should be a utility, not a privilege.
        </p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <h3 style={{ fontFamily: '"Noto Sans", sans-serif', fontSize: '28px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginTop: '48px', marginBottom: '32px' }}>Two ways to work with us</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '48px' }}>
          {/* Consulting Services Bento Box */}
          <div
            className="bento-link"
            style={{
              backgroundColor: '#fff',
              padding: '32px',
              borderRadius: '12px',
              transition: 'transform 0.3s ease'
            }}>
            <h3 style={{ fontSize: '17px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '20px', color: '#222' }}>Consulting Services</h3>

            <p style={{ marginBottom: '16px', fontSize: '16px', lineHeight: '1.6', color: '#444' }}><strong>Some problems need custom work.</strong> Every consultancy, SaaS pitch deck, and agency website uses the same words. 'Transformation over transaction.' 'Strategic partnerships.' 'Solutions.' We won't.</p>

            <p style={{ marginBottom: '20px', fontSize: '16px', lineHeight: '1.6', color: '#444' }}>We work directly with you and adapt as the problem reveals itself. First call is diagnostic. If we're not finding new angles within 30 minutes, walk away.</p>

            <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid #e0e0e0', transition: 'border-color 0.3s ease', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontWeight: 600, fontSize: '18px', marginBottom: '0', color: '#222' }}>We fix things. Then we leave.</p>
                <p style={{ fontSize: '14px', color: '#666', marginTop: '4px' }}>No retainers. No dependency.</p>
              </div>
              <Link
                href="/consulting"
                className="service-cta-link"
                style={{ color: '#666', fontSize: '17px', fontWeight: 400, textDecoration: 'none', transition: 'color 0.2s, text-decoration 0.2s' }}
              >
                Explore &gt;
              </Link>
            </div>
          </div>

          {/* Product Suite Bento Box */}
          <div
            className="bento-link"
            style={{
              backgroundColor: '#fff',
              padding: '32px',
              borderRadius: '12px',
              transition: 'transform 0.3s ease'
            }}>
            <h3 style={{ fontSize: '17px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '20px', color: '#222' }}>Product Suite</h3>

            <p style={{ marginBottom: '16px', fontSize: '16px', lineHeight: '1.6', color: '#444' }}>Everyone knows thinking doesn't scale. Most companies accept it. We solved it. <strong>Turned our methodology into infrastructure so your team can use it without us.</strong></p>

            <p style={{ marginBottom: '16px', fontSize: '16px', lineHeight: '1.6', color: '#444' }}>Strategic frameworks for market decisions. Question patterns for product challenges. Mental models for operational problems. Code that works with you.</p>

            <p style={{ marginBottom: '20px', fontSize: '16px', lineHeight: '1.6', color: '#444' }}>Access to 25+ live products. More launching monthly. 30-day trial.</p>

            <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid #e0e0e0', transition: 'border-color 0.3s ease', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontWeight: 600, fontSize: '18px', marginBottom: '0', color: '#222' }}>£299/month</p>
                <p style={{ fontSize: '14px', color: '#666', marginTop: '4px' }}>per seat + API credits*</p>
                <p style={{ fontSize: '12px', color: '#999', marginTop: '8px' }}>*API costs separate. Most users: £50-200/month.</p>
              </div>
              <Link
                href="/products"
                className="service-cta-link"
                style={{ color: '#666', fontSize: '17px', fontWeight: 400, textDecoration: 'none', transition: 'color 0.2s, text-decoration 0.2s' }}
              >
                Explore &gt;
              </Link>
            </div>
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <h3 style={{ fontFamily: '"Noto Sans", sans-serif', fontSize: '28px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginTop: '48px', marginBottom: '24px' }}>Where did all the testimonials go?</h3>

        <p>We could call ten clients right now. They'd say yes. We'd get five stars, glowing quotes, the whole performance.</p>

        <p><strong>We both know that would mean absolutely nothing.</strong></p>

        <p>You're not here comparing star ratings. You don't need to see testimonials promising we 'exceeded expectations' or 'delivered on time and under budget' like we deserve a medal for basic competence.</p>

        <p style={{ position: 'relative', fontSize: '17px', fontWeight: 500 }}>
          <span style={{ position: 'absolute', left: '-20px', top: '0', bottom: '0', width: '3px', backgroundColor: '#D43225' }}></span>
          You're here because you think differently about problems.
        </p>

        <p>The decision to work with us is intellectual, not social. Either our thinking resonates or it doesn't, and a wall of logos won't change that. Testimonials are manufactured credibility for commodity services.</p>

        <p><strong>We're not a commodity. You're not a crowd. Respect works both ways.</strong></p>

        <p>If you need proof we can think, read what we write. Look at how we built this site. Watch how Athena, our AI Advisor, responds. That's the proof.</p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

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
            cursor: 'pointer'
          }}
        >
          Reach Out
        </Link>
        </div>
      </section>
    </PageLayout>
  );
}
