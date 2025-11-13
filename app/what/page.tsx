import Image from 'next/image';
import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import ContentTracker from '@/components/ContentTracker';
import CarmenChat from '@/components/CarmenChat';
import { getDynamicContent } from '@/lib/getDynamicContent';

export const revalidate = 0; // Disable caching

export default async function WhatWeDoPage() {
  const content = await getDynamicContent();

  return (
    <PageLayout>
      <ContentTracker newsInsight={content.newsInsight} intelligenceExample={content.intelligenceExample} />
      <section id="what" className="section active">
        <h2 style={{ fontFamily: 'var(--font-passion), sans-serif' }}>WHAT WE <span style={{ borderBottom: '4px solid #D43225' }}>DO</span></h2>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '0 0 32px 0' }} />

        <p>We believe intelligence begins where answers end.</p>

        <p>{content.intelligenceExample}</p>

        <p>Answers are cheap. Google has them. ChatGPT has them. Your competitor's intern has them.</p>

        <p>Split reality into new questions. New colours emerge. Like light through a prism.</p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <h3 style={{ fontFamily: '"Noto Sans", sans-serif', fontSize: '18px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginTop: '48px', marginBottom: '24px' }}>The consulting paradox</h3>

        <p>Brilliant minds. World-class thinking. Trapped in day rates and retainers. Proprietary methodologies you can rent but never own. Frameworks applied FOR you, never shared WITH you.</p>

        <p>Every firm guards their thinking like gold. Makes sense. Scarcity creates value.</p>

        <p>Beautiful slides without implementable insights are expensive decoration.</p>

        <p>{content.consultingInsight}</p>

        <p>So we went the opposite direction. Documented how we think. Turned patterns into mental models. Made questions into code.</p>

        <p>Make thinking infrastructure. It compounds. Problems that took months take days. Insights that cost £50k become common knowledge.</p>

        <p>Thinking should be a utility, not a privilege.</p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <h3 style={{ fontFamily: '"Noto Sans", sans-serif', fontSize: '18px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginTop: '48px', marginBottom: '24px' }}>Two ways to think with us</h3>

        <h3 style={{ marginTop: '32px', marginBottom: '16px' }}>Direct Engagement</h3>

        <p>Some problems need custom work. Every consultancy, SaaS pitch deck, and agency website uses the same words. 'Transformation over transaction.' 'Strategic partnerships.' 'Solutions.' We won't. We work directly with you and adapt as the problem reveals itself. First call is diagnostic. If we're not asking better questions than you within 30 minutes, walk away.</p>

        <p style={{ fontWeight: 600 }}>Starting at £5,000 per project</p>

        <h3 style={{ marginTop: '32px', marginBottom: '16px' }}>Product Suite</h3>

        <p>Everyone knows thinking doesn't scale. Most companies accept it. We solved it. Turned our methodology into infrastructure so your team can use it without us.</p>

        <p>Strategic frameworks for market decisions. Question patterns for product challenges. Mental models for operational problems. The thinking consultants apply in workshops, available when you need it.</p>

        <p>Your strategist pressure-tests an expansion plan. Your product lead reframes a roadblock. Your ops team sees what they're actually solving. No scheduling. No dependencies. Just better questions when the problem demands them.</p>

        <p>Access to 25+ live products. More launching monthly. 30-day trial. No commitment.</p>

        <p style={{ fontWeight: 600 }}>£299/month per seat + API credits*</p>

        <p style={{ fontSize: '12px', color: '#999', marginTop: '8px' }}>*Base subscription for yearly plans. API costs separate and user-controlled. Most users: £50-200/month. Heavy usage: up to £500/month. VAT excluded.</p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <h3 style={{ fontFamily: '"Noto Sans", sans-serif', fontSize: '18px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginTop: '48px', marginBottom: '24px' }}>Where did all the testimonials go?</h3>

        <p>We could call ten clients right now. They'd say yes. We'd get five stars, glowing quotes, the whole performance. You'd see them here, neatly arranged in a grid, with headshots and company names.</p>

        <p>It would mean absolutely nothing.</p>

        <p>You're not here comparing star ratings. You don't need to see testimonials promising we 'exceeded expectations' or 'delivered on time and under budget' like we deserve a medal for basic competence. You're here because you think differently about problems.</p>

        <p>The decision to work with us is intellectual, not social. Either our thinking resonates or it doesn't. A wall of logos won't change that. Testimonials are manufactured credibility for commodity services.</p>

        <p>We're not a commodity. You're not a crowd. Respect works both ways.</p>

        <p>If you need proof we can think, read what we write. Look at how we built this site. Watch how Carmen responds. That's the proof.</p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <p>Three minutes with Carmen beats three hours researching on your own.</p>

        {/* Carmen Chat Component */}
        <CarmenChat />

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <p>Would you rather speak to a human?</p>

        <Link href="/contact" className="cta-button red">Get In Touch</Link>

      </section>
    </PageLayout>
  );
}
