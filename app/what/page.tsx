import Image from 'next/image';
import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import CarmenChat from '@/components/CarmenChat';
import { getDynamicContent } from '@/lib/getDynamicContent';

export const revalidate = 0; // Disable caching

export default async function WhatWeDoPage() {
  const content = await getDynamicContent();

  return (
    <PageLayout>
      <section id="what" className="section active">
        <h2 style={{ fontFamily: 'var(--font-passion), sans-serif' }}>WHAT WE DO</h2>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '0 0 32px 0' }} />

        <p>We believe intelligence lives in questions, not answers.</p>

        <p>{content.intelligenceExample}</p>

        <p>Answers are cheap. Google has them. ChatGPT has them. Your competitor's intern has them.</p>

        <p>But answers only work if you're asking the right questions.</p>

        <p>Wonderful things emerge when you split a challenge into multiple questions. Like light through a prism.</p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <h3 style={{ fontFamily: '"Noto Sans", sans-serif', fontSize: '18px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginTop: '48px', marginBottom: '24px' }}>The consulting paradox</h3>

        <p>Brilliant minds. World-class thinking. Trapped in day rates and retainers. Proprietary methodologies you can rent but never own. Frameworks applied FOR you, never shared WITH you.</p>

        <p>Every firm guards their thinking like gold. Makes sense. Scarcity creates value.</p>

        <p>{content.consultingInsight}</p>

        <p>So we went the opposite direction. Documented how we think. Turned patterns into mental models. Made questions into code.</p>

        <p>Because when thinking becomes infrastructure, humanity levels up. Problems that took months take days. Insights that required consultants become common knowledge. The rising tide of shared thinking lifts every business.</p>

        <p>Thinking should be a utility, not a privilege.</p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <h3 style={{ fontFamily: '"Noto Sans", sans-serif', fontSize: '18px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginTop: '48px', marginBottom: '24px' }}>Two ways to think with us</h3>

        <h3 style={{ marginTop: '32px', marginBottom: '16px' }}>Direct Engagement</h3>

        <p>Some problems don't sit still. They evolve as you engage with them. The real issue isn't in the brief, it's between the lines. Algorithms find patterns in data. Humans find patterns in silence, hesitation, what's not being said. We turn outputs into outcomes. Insights into foresight. We connect dots across domains no one else considered. When the problem demands depth over speed, gravitas over volume, transformation over transaction, you need people who think, not just tools that process.</p>

        <p><strong>What you get:</strong> Direct access to our team. Real-time problem solving. Ability to pivot as new information emerges. We think with you, not for you.</p>

        <p><strong>How it works:</strong> First call is diagnostic. Free. We figure out if we can actually help. If we're not asking better questions than you within the first hour, walk away. If we take the work and don't shift how you see the problem, we'll refund the engagement.</p>

        <p style={{ fontWeight: 600 }}>Starting at £5,000 per project</p>

        <p style={{ fontSize: '14px', color: '#666', fontStyle: 'italic' }}>We typically book 4-6 weeks out. Current availability fills fast.</p>

        <h3 style={{ marginTop: '32px', marginBottom: '16px' }}>Product Suite</h3>

        <p>Most companies solve the same problem twice because thinking doesn't scale. We turned our methodology into infrastructure. Question patterns that run on demand. Mental models your entire team can access instantly. No waiting for consultants. No dependency on day rates. The same strategic thinking that costs £5,000 in a room becomes £299 in your workflow. We codified what consultants hoard. Now your team moves faster, thinks sharper, and compounds intelligence instead of renting it.</p>

        <p><strong>What you get:</strong> AI tools trained on our frameworks. Question patterns you can run repeatedly. Mental models codified so your team thinks better without us in the room.</p>

        <p><strong>Try it risk-free:</strong> 30 days to test every tool. If it doesn't change how your team thinks about problems, cancel for a full refund. No questions asked.</p>

        <p style={{ fontWeight: 600 }}>£299/month*</p>

        <p style={{ fontSize: '12px', color: '#999', marginTop: '8px' }}>* For yearly subscriptions, does not include API costs and VAT</p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <h3 style={{ fontFamily: '"Noto Sans", sans-serif', fontSize: '18px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginTop: '48px', marginBottom: '24px' }}>Why there are no testimonials here</h3>

        <p>We could call ten clients right now. They'd say yes. We'd get five stars, glowing quotes, the whole performance. You'd see them here, neatly arranged in a grid, with headshots and company names.</p>

        <p>It would mean absolutely nothing.</p>

        <p>You're not here to check reviews like you're picking a restaurant. You're not evaluating if the bathrooms are clean or if we show up on time. You're here because you think differently about problems.</p>

        <p>The decision to work with us is intellectual, not social. Either our thinking resonates or it doesn't. A wall of logos won't change that. Testimonials are manufactured credibility for commodity services.</p>

        <p>We're not a commodity. You're not a crowd. Respect works both ways.</p>

        <p>If you need proof we can think, read what we write. Look at how we built this site. Watch how Carmen responds. That's the proof.</p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <p>Carmen knows our methodology inside out. She'll help you figure out what actually makes sense for your situation. Three minutes with her beats three hours researching on your own.</p>

        {/* Carmen Chat Component */}
        <CarmenChat />

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <p>Would you rather speak to a human?</p>

        <Link href="/contact" className="cta-button red">Get In Touch</Link>

      </section>
    </PageLayout>
  );
}
