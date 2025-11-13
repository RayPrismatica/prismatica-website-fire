import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import ModelNav from '@/components/ModelNav';

export default function AgenticPage() {
  return (
    <PageLayout>
      <section id="agents" className="section active">
        <h2 style={{ fontFamily: 'var(--font-passion), sans-serif' }}>MENTAL <span style={{ borderBottom: '4px solid #D43225' }}>MODELS</span></h2>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '0 0 32px 0' }} />

        <ModelNav currentModel="agentic" />

        <p>AI that waits for instructions is a faster intern. AI that acts with purpose is a force multiplier.</p>

        <p>Most companies are building the first. The opportunity is in the second.</p>

        <p>Technology is moving from tools that execute commands to systems that pursue objectives.</p>

        <h3>The Reversal</h3>
        <p>Companies want autonomous systems without surrendering control. Intelligence that doesn't make decisions. Power that doesn't act.</p>

        <p>Impossible.</p>

        <p>The value of agentic systems comes precisely from their ability to act independently, within defined boundaries. Design the sandbox. Then let agents play.</p>

        <h3>The Autonomy Reality</h3>
        <p>Traditional software does what you tell it. Agentic systems do what you need.</p>

        <p>One requires perfect instructions. The other requires clear objectives.</p>

        <p>This isn't delegation. This is multiplication.</p>

        <h3>The Trust Barrier</h3>
        <p>The biggest obstacle isn't technical capability. It's organizational trust.</p>

        <p>Humans need meetings, check-ins, approvals, reassurance. Agents don't.</p>

        <p>Give them clear objectives, hard constraints, quality thresholds, and kill switches. Then let them run while you sleep. The bottleneck isn't the AI. It's your need to feel in control.</p>

        <h3>The Scale Effect</h3>
        <p>Traditional systems scale linearly. More work requires more people. More complexity requires more management.</p>

        <p>Agentic systems scale exponentially. One well-designed agent replicates across thousands of contexts. Handles millions of scenarios. Adapts to infinite variations.</p>

        <p>This isn't productivity improvement. This is fundamental transformation of what's possible.</p>

        <h3>What Changes</h3>
        <p>Stop bolting autonomy onto existing processes. Rethink workflows from first principles.</p>

        <p>Customer support that resolves 80% of issues before a human sees them. Research that happens continuously, not quarterly. Operations that adapt to demand in real-time, not next sprint.</p>

        <p>Speed increases. Costs drop. Complexity becomes manageable.</p>

        <p>Not through harder work. Through systems that act with purpose.</p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <p>Ready to build intelligence that multiplies capacity instead of replacing it?</p>

        <Link href="/contact" className="cta-button red">Let's Talk</Link>
      </section>
    </PageLayout>
  );
}
