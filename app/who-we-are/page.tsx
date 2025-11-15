import Link from 'next/link';
import PageLayout from '@/components/PageLayout';

export default function WhoWeArePage() {
  return (
    <PageLayout>
      <section id="who" className="section active">
        <div style={{ maxWidth: '700px' }}>
          <h2 style={{ fontFamily: 'var(--font-passion), sans-serif', fontSize: '56px', fontWeight: 600, lineHeight: 0.9, marginBottom: '32px', letterSpacing: '0.005em', wordWrap: 'break-word', overflowWrap: 'break-word' }}><span style={{ borderBottom: '4px solid #D43225' }}>WHO</span> WE ARE</h2>

          <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '0 0 32px 0' }} />

          <p style={{ position: 'relative', fontSize: '17px', fontWeight: 500 }}>
            <span style={{ position: 'absolute', left: '-20px', top: '0', bottom: '0', width: '3px', backgroundColor: '#D43225' }}></span>
            A small team that thinks first and decorates never.
          </p>

        <p>We're not an agency. Agencies have account managers, creative directors, and people whose job is to make you feel important. We have people who do the work.</p>

        <p>We're not a vendor. Vendors deliver what you ordered. We solve what you need.</p>

        <p><strong>Founded in London. Operating globally. Small by design, not by accident.</strong></p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <h3 style={{ fontFamily: '"Noto Sans", sans-serif', fontSize: '28px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginTop: '48px', marginBottom: '24px' }}>Our Background</h3>
        <p>We've worked with everyone from individual artists to Fortune 500s. The size doesn't matter. The problem does.</p>

        <p>We've seen enough innovation theatre to know the difference between motion and progress. We've sat through enough strategy decks to know that most strategy is procrastination with charts.</p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <div
          style={{
            backgroundColor: '#fff',
            padding: '32px',
            borderRadius: '12px',
            marginBottom: '32px'
          }}>
          <h3
            style={{
              fontFamily: '"Noto Sans", sans-serif',
              fontSize: '17px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginTop: '0',
              marginBottom: '20px',
              color: '#222'
            }}
          >
            Our Principles
          </h3>

          <p style={{ marginBottom: '12px', fontSize: '17px', lineHeight: '1.6', color: '#444' }}>• Showing rather than telling</p>
          <p style={{ marginBottom: '12px', fontSize: '17px', lineHeight: '1.6', color: '#444' }}>• Testing rather than assuming</p>
          <p style={{ marginBottom: '12px', fontSize: '17px', lineHeight: '1.6', color: '#444' }}>• Building rather than presenting</p>
          <p style={{ marginBottom: '20px', fontSize: '17px', lineHeight: '1.6', color: '#444' }}>• Solving rather than discussing</p>

          <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid #e0e0e0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ fontWeight: 600, fontSize: '17px', marginBottom: '0', color: '#222' }}>Complexity is the job. Clarity is the deliverable.</p>
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <h3 style={{ fontFamily: '"Noto Sans", sans-serif', fontSize: '28px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginTop: '48px', marginBottom: '24px' }}>The 5% we work with</h3>

        <p>Most companies hire consultants for credibility or convenience. Shareholder confidence. Framework delivery. Someone else to blame.</p>

        <p>We work with the ones who hire for intelligence. Who want their thinking challenged, not their egos managed. Who need allies, not authorities.</p>

        <p>95% of businesses need consulting. 5% need what we do.</p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <p>Want to work with people who do the work? Start here.</p>

        <Link
          href="/contact"
          className="who-cta-button"
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
