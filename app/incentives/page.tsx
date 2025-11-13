import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import ModelNav from '@/components/ModelNav';

export default function IncentivesPage() {
  return (
    <PageLayout>
      <section id="incentives" className="section active">
        <h2 style={{ fontFamily: 'var(--font-passion), sans-serif' }}>MENTAL <span style={{ borderBottom: '4px solid #D43225' }}>MODELS</span></h2>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '0 0 32px 0' }} />

        <ModelNav currentModel="incentives" />

        <p>People don't do what you want them to do. They do what they're incentivized to do.</p>

        <p>Water always finds its way. So do incentives.</p>

        <p>Most organizations draft policies then wonder why nobody follows them. Create systems nobody uses. Launch products nobody wants.</p>

        <h3>The Reversal</h3>
        <p>Companies try to control behavior with policies and procedures. Pointless.</p>

        <p>They're fighting human nature instead of designing for it. Building dams instead of channels.</p>

        <p>Smart companies don't fight the current. They redirect it.</p>

        <h3>The Invisible Force</h3>
        <p>Smart leaders don't focus on what people say. They focus on what gets rewarded, what gets punished, what gets celebrated.</p>

        <p>Boeing built planes that crashed because their incentives prioritized speed over safety. Wells Fargo created fake accounts because their incentives rewarded account creation over customer service.</p>

        <p>Not complicated. Completely predictable.</p>

        <h3>Psycho-Logic</h3>
        <p>Value is never objective. The coffee tastes better in expensive mugs. The medicine works better with colorful pills.</p>

        <p>This isn't manipulation. This is human reality.</p>

        <p>We call this psycho-logic. The actual logic of how people operate, not how economists wish they operated.</p>

        <h3>The Tribal Force</h3>
        <p>The greatest incentive structures tap our primal need for belonging. They create tribes, not customers.</p>

        <p>Apple users. Harley riders. CrossFit devotees.</p>

        <p>Weak companies sell products. Strong companies create identities.</p>

        <h3>What Changes</h3>
        <p>Align incentives properly and behavior shifts overnight.</p>

        <p>Sales teams stop gaming metrics and start closing real deals. Support teams stop deflecting tickets and start solving problems. Marketing stops chasing vanity metrics and starts driving revenue.</p>

        <p>Turnover drops. Performance climbs. The things you wanted all along start happening naturally.</p>

        <p>Not through control. Through alignment.</p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <p>Ready to stop fighting human nature and start designing for it?</p>

        <Link href="/contact" className="cta-button red">Reach Out</Link>
      </section>
    </PageLayout>
  );
}
