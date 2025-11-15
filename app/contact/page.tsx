import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import EmailButton from '@/components/EmailButton';
import UserContentReminder from '@/components/UserContentReminder';
import { getDynamicContent } from '@/lib/getDynamicContent';

export default async function ContactPage() {
  const content = await getDynamicContent();

  const emailSubject = "Let's talk";
  const emailBody = `Hi Prismatica,

I've read your site. Here's what I'm solving:

[Describe your specific problem]

What I've already tried:

[What hasn't worked]

What I need:

[What you're looking for]

Best,
[Your name]`;

  const mailtoLink = `mailto:hello@prismaticalab.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

  return (
    <PageLayout>
      <section id="contact" className="section active">
        <div style={{ maxWidth: '700px' }}>
          <h2
            style={{
              fontFamily: 'var(--font-passion), sans-serif',
              fontSize: '56px',
              fontWeight: 600,
              lineHeight: 0.9,
              letterSpacing: '0.005em',
              marginBottom: '32px',
              wordWrap: 'break-word',
              overflowWrap: 'break-word'
            }}
          >
            <span style={{ borderBottom: '4px solid #D43225' }}>CONTACT</span>
          </h2>

          <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '0 0 32px 0' }} />

          <p style={{ fontSize: '17px', lineHeight: '1.6', marginBottom: '16px', color: '#444' }}>Most contact pages try to convince you to reach out.</p>

        <p style={{ fontSize: '17px', lineHeight: '1.6', marginBottom: '16px', color: '#444' }}>This one filters.</p>

        <p style={{ fontSize: '17px', lineHeight: '1.6', marginBottom: '16px', color: '#444' }}>If you're here, you've already decided. You read the site. You get what we do. You're not shopping. You're solving.</p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <h3
          style={{
            fontFamily: '"Noto Sans", sans-serif',
            fontSize: '28px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginTop: '48px',
            marginBottom: '24px',
            color: '#222'
          }}
        >
          What you're actually signing up for
        </h3>

        <p style={{ fontSize: '17px', lineHeight: '1.6', marginBottom: '16px', color: '#444' }}>We're about clarity, not comfort. We tend to challenge assumptions more than validate them. If you want validation, this won't work.</p>

        <p style={{ fontSize: '17px', lineHeight: '1.6', marginBottom: '16px', color: '#444' }}>First conversation is diagnostic. You'll know within 30 minutes if we're asking good questions.</p>

        <p style={{ fontSize: '17px', lineHeight: '1.6', marginBottom: '16px', color: '#444' }}>We optimize for honesty over politeness. Outcomes over output.</p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <h3
          style={{
            fontFamily: '"Noto Sans", sans-serif',
            fontSize: '28px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginTop: '48px',
            marginBottom: '24px',
            color: '#222'
          }}
        >
          Why there's no calendar here
        </h3>

        <p style={{ fontSize: '17px', lineHeight: '1.6', marginBottom: '16px', color: '#444' }}>Others optimize for volume. We optimize for fit.</p>

        <p style={{ fontSize: '17px', lineHeight: '1.6', marginBottom: '16px', color: '#444' }}>When you email first, you clarify the problem. We read it. If we can help, we show up already thinking through solutions. If not, we tell you before wasting your time.</p>

        <p style={{ fontSize: '17px', lineHeight: '1.6', marginBottom: '16px', color: '#444' }}>Calendars are convenient. Email is intentional. We'll take intentional every time.</p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <EmailButton mailtoLink={mailtoLink} />

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <div
          className="contact-box"
          style={{
            backgroundColor: '#fff',
            padding: '32px',
            borderRadius: '12px',
            marginTop: '48px',
            transition: 'transform 0.3s ease'
          }}
        >
          <h3
            style={{
              fontFamily: '"Noto Sans", sans-serif',
              fontSize: '28px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginTop: '0',
              marginBottom: '24px',
              color: '#222'
            }}
          >
            One more thing
          </h3>

          <UserContentReminder fallbackReminder={content.contentReminder || "Remember how the landing page showed today's news story, and the What We Do page wondered what question immediately came to mind?"} />

          <p style={{ fontSize: '17px', lineHeight: '1.6', marginBottom: '16px', color: '#444', marginTop: '16px', fontWeight: 700 }}>Same story, different angles. But if you come back tomorrow it'll be another event.</p>

          <p style={{ fontSize: '17px', lineHeight: '1.6', marginBottom: '16px', color: '#444' }}>It's a sweet little piece of code. A GitHub Action runs on schedule. Reads the same papers and magazines we read every day. Sends them to Claude with prompts that encode how we think. Claude then picks the most significant story, writes contextual takes, commits the update to our repo. Vercel detects the change. Site rebuilds. New content live. Simple. Fun.</p>

          <p style={{ fontSize: '17px', lineHeight: '1.6', marginBottom: '16px', color: '#444' }}>No database. No CMS. No manual work. Just code that thinks.</p>

          <p style={{ position: 'relative', fontSize: '17px', lineHeight: '1.6', marginBottom: '16px', color: '#444' }}>
            <span style={{ position: 'absolute', left: '-20px', top: '0', bottom: '0', width: '3px', backgroundColor: '#D43225' }}></span>
            We called it Synapsed.
          </p>

          <p style={{ fontSize: '17px', lineHeight: '1.6', marginBottom: '0', color: '#444' }}>Want this on your site? <a href="https://github.com/RayPrismatica/synapsed-with-love" target="_blank" rel="noopener noreferrer" className="contact-github-link" style={{ color: '#222', textDecoration: 'underline', transition: 'opacity 0.2s' }}>Take it</a>. Full code on GitHub. There you have it. That's a tiny example of what we mean by "Thinking As A Service".</p>
        </div>

        <p style={{ fontSize: '17px', lineHeight: '1.6', color: '#D43225', marginTop: '32px', marginBottom: '0' }}>Speak soon.</p>
        </div>
      </section>
    </PageLayout>
  );
}
