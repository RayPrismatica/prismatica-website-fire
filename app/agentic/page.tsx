import Link from 'next/link';
import PageLayout from '@/components/PageLayout';

export default function AgenticPage() {
  return (
    <PageLayout>
      <section id="agents" className="section active">
        <h2 style={{ fontFamily: 'var(--font-passion), sans-serif' }}>AGENTIC</h2>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '0 0 32px 0' }} />

        <p>We build intelligence that multiplies rather than replace human judgment.</p>

        <p>Here's the shift most organisations are missing.</p>

        <p>Technology is moving from tools that wait for commands to systems that act with purpose.</p>

        <h3>The Change</h3>
        <p>We're watching a fundamental transformation. Not incremental improvement, but a complete shift in how technology operates.</p>

        <p>Most systems still wait for instructions. Require constant supervision. Demand explicit commands.</p>

        <p>But agentic systems understand goals, not just commands. They navigate complexity, not just execute functions.</p>

        <p>This isn't evolution. It's revolution.</p>

        <h3>The Autonomy Reality</h3>
        <p>We're no longer building tools. We're creating partners that understand intent, context, constraints.</p>

        <p>Traditional software does what you tell it. Agentic systems do what you need.</p>

        <p>The difference is massive. One requires perfect instructions. The other requires clear objectives.</p>

        <p>This isn't delegation. This is multiplication.</p>

        <h3>The Fire Dynamic</h3>
        <p>Fire doesn't wait for permission. It adapts. Spreads. Transforms.</p>

        <p>Most businesses try to contain agentic capabilities with guardrails and restrictions. They're missing the point.</p>

        <p>You can't control fire by building smaller matches. You control it by understanding its nature and channeling its force.</p>

        <p>Fire understands what executives don't. Transformation can't be controlled, only channeled.</p>

        <h3>The Trust Barrier</h3>
        <p>The biggest obstacle isn't technical capability. It's organisational trust.</p>

        <p>Leaders want the benefits of autonomous systems without surrendering control. They want intelligence that doesn't make decisions. Power that doesn't act.</p>

        <p>Impossible.</p>

        <p>The value of agentic systems comes precisely from their ability to act independently, within defined boundaries.</p>

        <h3>The Design Principle</h3>
        <p>Smart organisations don't program every step. They establish boundaries, set objectives, define values.</p>

        <p>Then they let the systems act.</p>

        <p>This requires a different mindset. Less about control, more about guidance. Less about commands, more about constraints.</p>

        <p>Design the sandbox. Then let agents play.</p>

        <h3>The Scale Effect</h3>
        <p>Traditional systems scale linearly. More work requires more people. More complexity requires more management.</p>

        <p>Agentic systems scale exponentially. One well-designed agent can replicate across thousands of contexts. Handle millions of scenarios. Adapt to infinite variations.</p>

        <p>This isn't productivity improvement. This is fundamental transformation of what's possible.</p>

        <h3>The Implementation</h3>
        <p>Most organisations approach agentic systems wrong. They try to bolt autonomy onto existing processes.</p>

        <p>Won't work.</p>

        <p>Agentic systems require rethinking workflows from first principles. What should remain human? What can be autonomous? Where do they intersect?</p>

        <p>The companies that answer these questions correctly will dominate their markets. The ones that don't will wonder what happened.</p>

        <h3>The Transformation</h3>
        <p>When agency emerges within your systems, everything transforms.</p>

        <p>Speed increases. Costs decrease. Complexity becomes manageable. Scale becomes feasible.</p>

        <p>Not through harder work. Through fundamental architectural change.</p>

        <p>Because when systems act with purpose, they don't just execute faster. They solve problems you didn't know you had.</p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <p>Ready to multiply human judgment instead of replacing it? Let's build intelligence that acts.</p>

        <Link href="/contact" className="cta-button red">Reach Out</Link>
      </section>
    </PageLayout>
  );
}
