import Link from 'next/link';
import PageLayout from '@/components/PageLayout';

export default function ProductsPage() {
  return (
    <PageLayout>
      <section id="products" className="section active">
        <h2 style={{ fontFamily: 'var(--font-passion), sans-serif' }}>PRODUCT SUITE</h2>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '0 0 32px 0' }} />

        <p>We build products that multiply strategic intelligence.</p>

        <p>Not more software. Not more complexity. Just tools that make smart decisions easier.</p>

        <h3>The Philosophy</h3>
        <p>Most products add features. We eliminate friction.</p>

        <p>The best tools don't demand attention. They disappear into your workflow and amplify what matters.</p>

        <p>We build systems that think with you, not for you.</p>

        <h3>What We're Building</h3>

        <div style={{ marginTop: '32px', marginBottom: '32px' }}>
          <div style={{
            backgroundColor: '#f8f8f8',
            padding: '24px',
            borderLeft: '3px solid #D43225',
            marginBottom: '24px'
          }}>
            <h4 style={{
              fontFamily: '"Noto Sans", sans-serif',
              fontSize: '16px',
              fontWeight: 600,
              marginBottom: '8px',
              letterSpacing: '0.5px'
            }}>
              Strategic Intelligence Platform
            </h4>
            <p style={{
              fontSize: '13px',
              color: '#666',
              marginBottom: '12px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              fontWeight: 600
            }}>
              In Development
            </p>
            <p>Pattern recognition across markets, competitors, and adjacent industries. See connections others miss. Make decisions with context most executives don't have.</p>
            <p style={{ marginTop: '12px', fontSize: '14px', color: '#888' }}>
              Invite-only beta launching Q2 2025
            </p>
          </div>

          <div style={{
            backgroundColor: '#f8f8f8',
            padding: '24px',
            borderLeft: '3px solid #EA9336',
            marginBottom: '24px'
          }}>
            <h4 style={{
              fontFamily: '"Noto Sans", sans-serif',
              fontSize: '16px',
              fontWeight: 600,
              marginBottom: '8px',
              letterSpacing: '0.5px'
            }}>
              Incentive Mapping Tools
            </h4>
            <p style={{
              fontSize: '13px',
              color: '#666',
              marginBottom: '12px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              fontWeight: 600
            }}>
              In Development
            </p>
            <p>Visualize the invisible forces driving behavior in your organization. Map incentive flows. Identify misalignments. Design systems that work with human nature, not against it.</p>
            <p style={{ marginTop: '12px', fontSize: '14px', color: '#888' }}>
              Early access Q3 2025
            </p>
          </div>

          <div style={{
            backgroundColor: '#f8f8f8',
            padding: '24px',
            borderLeft: '3px solid #10B981',
            marginBottom: '24px'
          }}>
            <h4 style={{
              fontFamily: '"Noto Sans", sans-serif',
              fontSize: '16px',
              fontWeight: 600,
              marginBottom: '8px',
              letterSpacing: '0.5px'
            }}>
              Agentic Workflow Systems
            </h4>
            <p style={{
              fontSize: '13px',
              color: '#666',
              marginBottom: '12px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              fontWeight: 600
            }}>
              In Development
            </p>
            <p>Autonomous intelligence that acts on objectives, not commands. Systems that scale exponentially. Workflows that multiply human judgment instead of replacing it.</p>
            <p style={{ marginTop: '12px', fontSize: '14px', color: '#888' }}>
              Pilot program Q4 2025
            </p>
          </div>
        </div>

        <h3>The Approach</h3>
        <p>We don't build products because we can. We build them because the alternative is expensive, inefficient, or impossible.</p>

        <p>Every tool we create solves a problem we've encountered repeatedly in consulting work. Real friction. Real cost. Real opportunity.</p>

        <p>If it doesn't multiply strategic capability, we don't build it.</p>

        <h3>Early Access</h3>
        <p>We're selective about who gets early access. Not because we're exclusive. Because feedback from the right users shapes better products.</p>

        <p>If you're building something that matters and these tools could multiply your impact, let's talk.</p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <h3>Current Focus</h3>
        <p>Right now we're heads-down building. Testing with select partners. Refining based on real usage, not assumptions.</p>

        <p>Updates come when we have something worth sharing. No marketing noise. No vaporware. Just signal.</p>

        <p>Want to stay informed? Reach out and we'll add you to the list.</p>

        <Link href="/contact" className="cta-button red">Request Early Access</Link>
      </section>
    </PageLayout>
  );
}
