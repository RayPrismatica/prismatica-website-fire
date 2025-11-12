import Link from 'next/link';
import PageLayout from '@/components/PageLayout';

export default function TrinityPage() {
  return (
    <PageLayout>
      <section id="trinity" className="section active">
        <h2 style={{ fontFamily: 'var(--font-passion), sans-serif' }}>TRINITY</h2>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '0 0 32px 0' }} />

        <p>Three forces. One system. No boundaries.</p>

        <p>Everyone else divides to conquer. We unite to understand.</p>

        <p>Marketing is how you're found. Technology is how you deliver. Game theory is how you win. Separate them and you get corporate theatre. Unite them and you get unfair advantages.</p>

        <p>The boundaries were always fake anyway.</p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <h3>Marketing</h3>
        <p>Marketing is the space between who you are and who knows you exist. Stories made wisdom portable. Symbols made belonging visible. Money made value exchangeable. We're working on making truth profitable.</p>

        <p>Stories that reach the right people at the right time. Not spray and pray. Not growth hacking. Just clear communication that respects intelligence and accelerates decisions.</p>

        <p>The only rule that matters: Meet people where they are, learn what moves them, then trigger the change they're already considering. That's not marketing. That's respect with a business model.</p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <h3>Technology</h3>
        <p>Technology is anything that makes impossible things boring. Writing made memory optional. Wheels made distance negotiable. Internet made geography irrelevant. We're working on making complexity invisible.</p>

        <p>We build tomorrow's solutions with today's constraints. Innovation isn't about what's possible, it's about what's useful. Every line of code serves the strategy. Every feature serves a purpose.</p>

        <p>The only rule that matters: When given the choice between using humans to improve technology or technology to improve being human, choose human. Every time. That's not idealism. That's sustainable business.</p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <h3>Game Theory</h3>
        <p>Game theory is how finite beings navigate infinite possibilities. War made strategy necessary. Trade made trust profitable. Democracy made consensus valuable. Internet made reputation everything. We're working on making competition collaborative.</p>

        <p>Markets are games. People are players. We think three moves ahead because everyone else is looking at their shoes. We map real behaviour, not wishful thinking. We hunt for patterns in chaos.</p>

        <p>The only rule that matters: Every decision creates the next game. Know what game you're playing. Know what game they think they're playing. Play the game that hasn't started yet.</p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <p>The convergence is where the magic lives.</p>

        <p>Marketing without technology is just noise. Technology without strategy is just toys. Strategy without execution is just expensive thinking.</p>

        <p>When all three work as one system, you get something rare: Solutions that actually work.</p>

        <p>Not because they're clever. Not because they're beautiful. Because they understand how the world actually operates, not how we wish it would.</p>

        <p>This isn't interdisciplinary. It's anti-disciplinary.</p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <p>Ready to stop separating what should never be divided? Let's build something unified.</p>

        <Link href="/" className="cta-button red">Reach Out</Link>
      </section>
    </PageLayout>
  );
}
