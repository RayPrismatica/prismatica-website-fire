import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import EmailButton from '@/components/EmailButton';
import UserContentReminder from '@/components/UserContentReminder';
import { getDynamicContent } from '@/lib/getDynamicContent';

export default async function ContactPage() {
  const content = await getDynamicContent();

  // Check if content is 15+ minutes old
  const isContentStale = content.generated
    ? (new Date().getTime() - new Date(content.generated).getTime()) / 60000 >= 15
    : false;

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
        <h2 style={{ fontFamily: 'var(--font-passion), sans-serif' }}>CONTACT</h2>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '0 0 32px 0' }} />

        <p>Most contact pages try to convince you to reach out.</p>

        <p>This one filters.</p>

        <p>If you're here, you've already decided. You read the site. You get what we do. You're not shopping. You're solving.</p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <h3 style={{ fontFamily: '"Noto Sans", sans-serif', fontSize: '18px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginTop: '48px', marginBottom: '24px' }}>What you're actually signing up for</h3>

        <p>We're about clarity, not comfort. We tend to challenge assumptions more than validate them. If you want validation, this won't work.</p>

        <p>First conversation is diagnostic. You'll know within 30 minutes if we're asking good questions.</p>

        <p>We optimize for honesty over politeness. Outcomes over output.</p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <h3 style={{ fontFamily: '"Noto Sans", sans-serif', fontSize: '18px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginTop: '48px', marginBottom: '24px' }}>Why there's no calendar here</h3>

        <p>Others optimize for volume. We optimize for fit.</p>

        <p>When you email first, you clarify the problem. We read it. If we can help, we show up already thinking through solutions. If not, we tell you before wasting your time.</p>

        <p>Calendars are convenient. Email is intentional. We'll take intentional every time.</p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <EmailButton mailtoLink={mailtoLink} />

        <p style={{ fontSize: '14px', color: '#666', fontStyle: 'italic', marginBottom: '32px' }}>
          Noticed this is the only red button on the entire site? That's intentional. <span style={{ color: '#D43225' }}>Red draws the eye.</span> We promised no tricks, so here's the one we used: big red button right when you're ready. If it made you want to click, good. You already decided. We just made it easier.
        </p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <h3 style={{ fontFamily: '"Noto Sans", sans-serif', fontSize: '18px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginTop: '48px', marginBottom: '24px', color: '#D43225' }}>One more thing</h3>

        <p>The opening paragraph on the landing page and on What We Do changes every 15 minutes.</p>

        <UserContentReminder fallbackReminder={content.contentReminder || "Remember how the landing page showed today's news story, and the What We Do page wondered what question immediately came to mind?"} />

        <p style={{ marginTop: '16px' }}>Same story, different angles.</p>

        <p>{isContentStale ? "It's been over 15 minutes since the content updated, so go back now. They're probably showing something completely different." : "But it's only been a few minutes since the content updated. Still probably the same. Check back in 15."}</p>

        <p>It's a sweet piece of code. A GitHub Action runs on schedule. Fetches headlines from BBC and NYT, same stuff we read. Sends them to Claude with prompts that encode how we think. Claude picks the most significant story, writes two contextual takes (one for each page), commits the update to our repo. Vercel detects the change. Site rebuilds. New content live.</p>

        <p>No database. No CMS. No manual work. Just code that thinks.</p>

        <p>Want this on your site? <a href="https://github.com/RayPrismatica/prismaticalab-dynamic-ai-website-content" target="_blank" rel="noopener noreferrer" style={{ color: '#000', textDecoration: 'none', borderBottom: '1px solid #000' }}>Take it</a>. Full code on GitHub. There you have it. That's a tiny example of what we mean by "Thinking As A Service".</p>

        <p style={{ color: '#D43225', marginTop: '32px' }}>Speak soon.</p>

      </section>
    </PageLayout>
  );
}
