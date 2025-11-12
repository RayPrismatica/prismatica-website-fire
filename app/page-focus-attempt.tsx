'use client';

import Link from 'next/link';

export default function FocusPage() {
  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '80px 24px 120px',
      fontFamily: '"Noto Sans", sans-serif',
      fontSize: '16px',
      lineHeight: '1.8',
      color: '#222'
    }}>
      <section id="focus">
        <h2 style={{
          fontFamily: 'var(--font-passion), sans-serif',
          fontSize: '48px',
          lineHeight: '1.2',
          marginBottom: '48px'
        }}>
          FINALLY.<br/>
          THINKING AS A SERVICE.<br/>
          NO PERFORMANCE.<br/>
          <span style={{ color: '#D43225' }}>JUST</span> PERFORMANCE.
        </h2>

        <p>We work with adults who don't need to be entertained.</p>

        <p>This is a website. It loads fast, tells you what we do. No cognitive candy. No design theatre. No emotional manipulation through carefully crafted user journeys.</p>

        <p>We believe the internet has enough noise. Enough brands "delighting" you. Enough experiences trying to "engage" you. Enough companies treating you like you need shiny things to maintain focus.</p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <p>Want beauty? Museums.</p>
        <p>Want surprise? Nature.</p>
        <p>Want stories? Books.</p>
        <p>Want clarity?</p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <p>We're Prismatica Labs. We solve problems with thinking, not themes.</p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <p>Focus is the only currency that matters. You get it when you remove noise.</p>

        <p>Welcome to the quietest room on the internet.</p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <p>We work on two levels. You have options.</p>

        <Link
          href="/what"
          className="cta-button red"
          style={{
            display: 'inline-block',
            padding: '12px 24px',
            fontSize: '11px',
            fontFamily: '"Noto Sans", sans-serif',
            fontWeight: 600,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            background: '#D43225',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            textDecoration: 'none',
            transition: 'opacity 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
        >
          See What We Do
        </Link>
      </section>
    </div>
  );
}
