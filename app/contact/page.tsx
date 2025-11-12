import Link from 'next/link';
import PageLayout from '@/components/PageLayout';

export default function ContactPage() {
  return (
    <PageLayout>
      <section id="contact" className="section active">
        <h2 style={{ fontFamily: 'var(--font-passion), sans-serif' }}>CONTACT</h2>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '0 0 32px 0' }} />

        <p>We work with leaders who see their market differently.</p>

        <p>If you're building something that matters and need thinking that cuts through, let's talk.</p>

        <h3>Who We Work With</h3>
        <p>Founders launching category-defining products. Executives navigating transformation. Teams solving problems their industry hasn't cracked yet.</p>

        <p>We're selective. Not because we're exclusive. Because fit matters more than volume.</p>

        <h3>What Happens Next</h3>
        <p>Reach out. We'll have a conversation. No pitch. No pressure. Just signal.</p>

        <p>If there's alignment, we'll explore what's possible. If not, we'll tell you honestly.</p>

        <p>Most consulting relationships start with vague promises and end with mediocre results. We prefer clarity from the start.</p>

        <h3>Get In Touch</h3>

        <div style={{
          backgroundColor: '#f8f8f8',
          padding: '24px',
          borderLeft: '3px solid #D43225',
          marginTop: '32px',
          marginBottom: '32px'
        }}>
          <p style={{
            fontFamily: '"Noto Sans", sans-serif',
            fontSize: '14px',
            fontWeight: 600,
            marginBottom: '16px',
            letterSpacing: '0.5px',
            textTransform: 'uppercase'
          }}>
            Email
          </p>
          <p style={{
            fontSize: '16px',
            marginBottom: '0'
          }}>
            <a href="mailto:hello@prismaticlabs.com" style={{
              color: '#D43225',
              textDecoration: 'none',
              borderBottom: '1px solid #D43225'
            }}>
              hello@prismaticlabs.com
            </a>
          </p>
        </div>

        <h3>What To Include</h3>
        <p>Tell us what you're building. What's working. What's not. What you've tried. What you need.</p>

        <p>We'll respond within 48 hours. Usually faster.</p>

        <p>If it makes sense to talk, we'll schedule a proper conversation. If it doesn't, we'll say so and point you toward resources that might help.</p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <h3>Not Ready Yet?</h3>
        <p>Explore our mental models. Read about our consulting approach. Understand how we think.</p>

        <p>When the timing is right, you'll know where to find us.</p>

        <div style={{ marginTop: '32px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Link href="/mental-models" className="cta-button orange">
            Mental Models
          </Link>
          <Link href="/consulting" className="cta-button green">
            Consulting
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}
