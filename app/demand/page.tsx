import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import ModelNav from '@/components/ModelNav';

export default function DemandPage() {
  return (
    <PageLayout>
      <section id="demand" className="section active">
        <div style={{ maxWidth: '700px' }}>
          <h2 style={{ fontFamily: 'var(--font-passion), sans-serif', fontSize: '56px', letterSpacing: '0.005em' }}>MENTAL <span style={{ borderBottom: '4px solid #D43225' }}>MODELS</span></h2>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '0 0 32px 0' }} />

        <ModelNav currentModel="demand" />

        <p>What people say they want and what they actually buy are rarely the same thing.</p>

        <p>Most companies build products, then hunt for buyers. That's backwards.</p>

        <p>Growth is demand driven. Not supply driven. Not product driven. Not business driven. Demand driven.</p>

        <h3>The Reversal</h3>
        <p>Companies create systems that serve themselves. Design experiences that fit their processes. Build what's convenient for them, not what customers actually want.</p>

        <p>They have it backward. Completely backward.</p>

        <p>The companies that thrive look at their business through customer eyes, not at customers through business eyes.</p>

        <p>This isn't philosophy. It's survival.</p>

        <h3>The Abundance Problem</h3>
        <p>We live in the age of too much. Too much information. Too much selection. Too much noise.</p>

        <p>Every market is saturated. Every niche is crowded. Every customer is overwhelmed.</p>

        <p>Creating what nobody wants isn't business. It's waste. And markets punish waste brutally.</p>

        <p>The question isn't "can we build it?" The question is "does anyone actually want this enough to change their behaviour?"</p>

        <h3>The Mirror Principle</h3>
        <p>Most companies look at customers through their own lens. Their processes. Their logic. Their convenience.</p>

        <p>Then they wonder why conversion rates stay low. Why churn stays high. Why growth plateaus.</p>

        <p>Demand-driven companies flip the mirror. They see themselves through customer eyes. Every assumption gets tested. Every process gets questioned.</p>

        <p>The view from the other side reveals truths you can't see from inside the building.</p>

        <p>Most companies aren't listening to the signals. They're too busy broadcasting their message, too invested in their plan.</p>

        <p>Smart companies listen first, speak second.</p>

        <h3>The Friction Map</h3>
        <p>Every business has friction. The gap between what customers want and what you deliver.</p>

        <p>Most companies add friction without realizing it. Complex pricing. Confusing navigation. Unnecessary steps. Death by a thousand paper cuts.</p>

        <p>Demand-driven companies obsess over friction. They map it. Measure it. Eliminate it.</p>

        <p>Because demand flows like water. It takes the path of least resistance. Always.</p>

        <h3>What Changes</h3>
        <p>Start with demand and everything realigns.</p>

        <p>Product roadmaps stop chasing features nobody wants. Marketing budget flows to channels that actually convert. Pricing reflects what people will pay, not what you hope they'll pay.</p>

        <p>Churn drops. Acquisition costs drop. Lifetime value climbs.</p>

        <p>Not because you worked harder. Because you stopped fighting the current.</p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <p>Ready to stop fighting demand and start riding it?</p>

        <Link
          href="/contact"
          className="demand-cta-button"
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
            marginTop: '8px'
          }}
        >
          Reach Out
        </Link>
        </div>
      </section>
    </PageLayout>
  );
}
