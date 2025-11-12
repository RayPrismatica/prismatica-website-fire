import Link from 'next/link';
import PageLayout from '@/components/PageLayout';

export default function ContactPage() {
  return (
    <PageLayout>
      <section id="contact" className="section active">
        <h2 style={{ fontFamily: 'var(--font-passion), sans-serif' }}>CONTACT</h2>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '0 0 32px 0' }} />

        <p>Most contact pages try to convince you to reach out.</p>

        <p>This one filters.</p>

        <p>If you're here, you've already decided. You read the site. You get what we do. You're not shopping. You're solving.</p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <h3>Two ways to start</h3>

        <p><strong>Email us directly:</strong> Best if you already know what you need. Skip the forms, skip the qualifiers. Just tell us what's broken.</p>

        <div style={{
          backgroundColor: '#f8f8f8',
          padding: '24px',
          borderLeft: '3px solid #D43225',
          marginTop: '24px',
          marginBottom: '32px'
        }}>
          <p style={{
            fontSize: '16px',
            marginBottom: '0'
          }}>
            <a href="mailto:hello@prismaticalab.com" style={{
              color: '#D43225',
              textDecoration: 'none',
              borderBottom: '1px solid #D43225'
            }}>
              hello@prismaticalab.com
            </a>
          </p>
        </div>

        <p><strong>Book a service directly:</strong> Want to skip the back and forth? Pick what you need. We'll confirm feasibility and start.</p>

        <div style={{ marginTop: '24px', marginBottom: '32px' }}>
          <Link href="/consulting" className="cta-button red">
            See Services & Pricing
          </Link>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <h3>What happens next</h3>

        <p>We respond within 24 hours. If we can help, we'll tell you how. If we can't, we'll tell you that too.</p>

        <p>No discovery calls where we ask you to repeat everything you wrote. No "let me loop in my team." No 47-slide pitch deck.</p>

        <p>First conversation is diagnostic. Free. We figure out if this makes sense. If we're not asking better questions than you within the first 30 minutes, walk away.</p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <h3>Who this works for</h3>

        <p>You're solving something specific. Not "we need innovation." Not "help us with strategy." Actual problems with edges.</p>

        <p>You've already tried the obvious solutions. Hired smart people. Followed best practices. Still stuck.</p>

        <p>You value thinking over execution. You know the bottleneck isn't doing more, it's knowing what to do.</p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <h3>Who this doesn't work for</h3>

        <p>You need validation more than solutions. We're not here to make you feel smart. We're here to make you effective.</p>

        <p>You're shopping for consultants like you're shopping for sofas. Comparing day rates. Asking for proposals. We don't do beauty contests.</p>

        <p>You want someone to execute your plan. Hire an agency. We change the plan.</p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <p>Still reading? Good sign.</p>

        <p>Email us. Let's see if this fits.</p>

      </section>
    </PageLayout>
  );
}
