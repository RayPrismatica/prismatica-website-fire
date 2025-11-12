import Link from 'next/link';
import PageLayout from '@/components/PageLayout';

export default function WhoWeArePage() {
  return (
    <PageLayout>
      <section id="who" className="section active">
        <h2 style={{ fontFamily: 'var(--font-passion), sans-serif' }}>WHO WE ARE</h2>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '0 0 32px 0' }} />

        <p>A small team that thinks first and decorates never.</p>

        <p>We're not an agency. Agencies have account managers, creative directors, and people whose job is to make you feel important. We have people who do the work.</p>

        <p>Founded in London. Operating globally. Small by design, not by accident.</p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <h3>Our Background</h3>
        <p>We've worked with everyone from individual artists to Fortune 500s. The size doesn't matter. The problem does.</p>

        <p>We've seen enough innovation theatre to know the difference between motion and progress. We've sat through enough strategy decks to know that most strategy is procrastination with charts.</p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <p>We believe in:</p>
        <p>• Showing rather than telling</p>
        <p>• Testing rather than assuming</p>
        <p>• Building rather than presenting</p>
        <p>• Solving rather than discussing</p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <h3>The 5% we work with</h3>

        <p>Most companies hire consultants for credibility or convenience. Shareholder confidence. Framework delivery. Someone else to blame.</p>

        <p>We work with the ones who hire for intelligence. Who want their thinking challenged, not their egos managed. Who need allies, not authorities.</p>

        <p>95% of businesses need consulting. 5% need what we do.</p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <p>Want to work with people who do the work? Start here.</p>

        <Link href="/contact" className="cta-button red">Reach Out</Link>
      </section>
    </PageLayout>
  );
}
