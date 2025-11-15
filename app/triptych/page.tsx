import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import ModelNav from '@/components/ModelNav';

export default function TriptychPage() {
  return (
    <PageLayout>
      <section id="triptych" className="section active">
        <div style={{ maxWidth: '700px' }}>
          <h2 style={{ fontFamily: 'var(--font-passion), sans-serif', fontSize: '56px', letterSpacing: '0.005em' }}>MENTAL <span style={{ borderBottom: '4px solid #D43225' }}>MODELS</span></h2>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '0 0 32px 0' }} />

        <ModelNav currentModel="triptych" />

        <p>Marketing is how you're found. Technology is how you deliver. Game theory is how you win.</p>

        <p>Most companies separate these into departments. Different budgets. Different leaders. Different meetings.</p>

        <p>The boundaries were always fake.</p>

        <h3>The Reversal</h3>
        <p>Everyone else divides to conquer. We unite to understand.</p>

        <p>Marketing without technology is noise. Technology without strategy is toys. Strategy without execution is expensive thinking.</p>

        <p>Separate them and you get corporate theatre. Unite them and you get unfair advantages.</p>

        <h3>Marketing</h3>
        <p>Marketing is the space between who you are and who knows you exist.</p>

        <p>Not spray and pray. Not growth hacking. Clear communication that respects intelligence and accelerates decisions.</p>

        <p>Meet people where they are, learn what moves them, then trigger the change they're already considering.</p>

        <h3>Technology</h3>
        <p>Technology is anything that makes impossible things boring.</p>

        <p>Innovation isn't about what's possible. It's about what's useful. Every line of code serves the strategy. Every feature serves a purpose.</p>

        <p>When given the choice between using humans to improve technology or technology to improve being human, choose human. Every time.</p>

        <h3>Game Theory</h3>
        <p>Game theory is how finite beings navigate infinite possibilities.</p>

        <p>Markets are games. People are players. We think three moves ahead because everyone else is looking at their shoes.</p>

        <p>Every decision creates the next game. Know what game you're playing. Know what game they think they're playing. Play the game that hasn't started yet.</p>

        <h3>What Changes</h3>
        <p>When all three work as one system, everything aligns.</p>

        <p>Marketing messages that actually convert because technology delivers on the promise and game theory predicts the competitive response. Products that scale because marketing creates pull and strategy creates moats. Strategies that execute because technology enables them and marketing funds them.</p>

        <p>This isn't interdisciplinary. It's anti-disciplinary.</p>

        <p>Solutions that actually work. Not because they're clever. Because they understand how the world operates.</p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <p>Ready to stop dividing what should never be separated?</p>

        <Link
          href="/contact"
          className="triptych-cta-button"
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
