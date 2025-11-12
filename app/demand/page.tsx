import Link from 'next/link';
import PageLayout from '@/components/PageLayout';

export default function DemandPage() {
  return (
    <PageLayout>
      <section id="demand" className="section active">
        <h2 style={{ fontFamily: 'var(--font-passion), sans-serif' }}>DEMAND</h2>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '0 0 32px 0' }} />

        <p>We're obsessed with unearthing what people will actually want, not what they say they want.</p>

        <p>Here's the dynamic most companies refuse to see.</p>

        <p>Growth is demand driven. Not supply driven. Not product driven. Not business driven. Demand driven.</p>

        <h3>The Reversal</h3>
        <p>We keep watching companies build products then hunt for buyers. Create systems that serve themselves. Design experiences that fit their processes.</p>

        <p>They have it backward. Completely backward.</p>

        <p>The companies that thrive look at their business through customer eyes, not at customers through business eyes.</p>

        <p>This isn't philosophy. It's survival.</p>

        <h3>The Abundance Problem</h3>
        <p>We live in the age of too much. Too much information. Too much selection. Too much noise.</p>

        <p>Every market is saturated. Every niche is crowded. Every customer is overwhelmed.</p>

        <p>Creating what nobody wants isn't business. It's waste. And markets punish waste brutally.</p>

        <p>The question isn't "can we build it?" The question is "does anyone actually want this enough to change their behavior?"</p>

        <h3>The Mirror Principle</h3>
        <p>Most companies look at customers through their own lens. Their processes. Their logic. Their convenience.</p>

        <p>Then they wonder why conversion rates stay low. Why churn stays high. Why growth plateaus.</p>

        <p>Demand-driven companies flip the mirror. They see themselves through customer eyes. Every assumption gets tested. Every process gets questioned.</p>

        <p>The view from the other side reveals truths you can't see from inside the building.</p>

        <h3>The Signal Truth</h3>
        <p>Demand sends signals. Constantly. Clearly. Most companies just aren't listening.</p>

        <p>They're too busy broadcasting. Too focused on their message. Too invested in their plan.</p>

        <p>Smart companies listen first, speak second. They read the signals. They follow the data. They adapt to what demand actually is, not what they hoped it would be.</p>

        <h3>The Friction Map</h3>
        <p>Every business has friction. The gap between what customers want and what you deliver.</p>

        <p>Most companies add friction without realizing it. Complex pricing. Confusing navigation. Unnecessary steps. Death by a thousand paper cuts.</p>

        <p>Demand-driven companies obsess over friction. They map it. Measure it. Eliminate it.</p>

        <p>Because demand flows like water. It takes the path of least resistance. Always.</p>

        <h3>The Elephant Force</h3>
        <p>Demand is the elephant in the room. Massive. Unmistakable. Unstoppable.</p>

        <p>You can ignore it. Fight it. Wish it were different.</p>

        <p>Or you can study it. Understand it. Ride it.</p>

        <h3>The Transformation</h3>
        <p>When you view your company through demand architecture, everything shifts.</p>

        <p>Product roadmaps change. Priorities realign. Blind spots vanish. Opportunities emerge where none existed.</p>

        <p>This isn't incremental change. It's seeing the system differently.</p>

        <p>Because when demand leads, growth follows.</p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <p>Want to see your business through demand's eyes? Let's flip the mirror.</p>

        <Link href="/" className="cta-button red">Reach Out</Link>
      </section>
    </PageLayout>
  );
}
