import Link from 'next/link';
import PageLayout from '@/components/PageLayout';

export default function IncentivesPage() {
  return (
    <PageLayout>
      <section id="incentives" className="section active">
        <h2 style={{ fontFamily: 'var(--font-passion), sans-serif' }}>INCENTIVES</h2>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '0 0 32px 0' }} />

        <p>We like mapping how humans actually behave, not how they should.</p>

        <p>Here's what most leaders refuse to see about human behavior.</p>

        <p>Water always finds its way. So do incentives.</p>

        <h3>The Reality</h3>
        <p>We see the world through incentive architecture, not wishful thinking.</p>

        <p>Most organisations miss this completely. They draft policies then wonder why nobody follows them. Create systems nobody uses. Launch products nobody wants.</p>

        <p>They're fighting human nature instead of designing for it.</p>

        <h3>The Game Dynamic</h3>
        <p>We keep watching companies play two different games without realizing it.</p>

        <p>Finite games have winners, losers, endpoints. Quarterly battles. Market share wars. Traditional business thinking.</p>

        <p>But markets run on infinite games. Ongoing. Evolving. Never ending.</p>

        <p>Companies playing finite games against infinite players always lose. Eventually. Inevitably.</p>

        <h3>The Perception Truth</h3>
        <p>Value is never objective. The coffee tastes better in expensive mugs. The medicine works better with colorful pills.</p>

        <p>This isn't manipulation. This is human reality.</p>

        <p>We call this psycho-logic. The actual logic of how people operate, not how economists wish they operated.</p>

        <h3>The Invisible Force</h3>
        <p>Smart leaders don't focus on what people say. They focus on what gets rewarded, what gets punished, what gets celebrated.</p>

        <p>Boeing built planes that crashed because their incentives prioritized speed over safety. Wells Fargo created fake accounts because their incentives rewarded account creation over customer service.</p>

        <p>Not complicated. Completely predictable.</p>

        <h3>The Tribal Need</h3>
        <p>The greatest incentive structures tap our primal need for belonging. They create tribes, not customers.</p>

        <p>Apple users. Harley riders. CrossFit devotees.</p>

        <p>Weak companies sell products. Strong companies create identities.</p>

        <h3>The Water Force</h3>
        <p>Water never argues with gravity. Never fights the landscape. It adapts. Flows. Finds a way.</p>

        <p>Most businesses try to dam natural incentives with policies and procedures. Pointless.</p>

        <p>Water understands what executives miss. The path will be found. The flow cannot be stopped.</p>

        <h3>The Transformation</h3>
        <p>When you view your business through incentive architecture, everything shifts.</p>

        <p>Align incentives properly and friction vanishes. Resistance dissolves. Momentum builds.</p>

        <p>Not through control. Through alignment.</p>

        <p>Because when incentives shift, everything shifts.</p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <p>Ready to design systems that flow with human nature, not against it? Let's align the forces.</p>

        <Link href="/contact" className="cta-button red">Reach Out</Link>
      </section>
    </PageLayout>
  );
}
