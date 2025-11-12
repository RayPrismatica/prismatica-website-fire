import PageLayout from '@/components/PageLayout';

export default function FocusPage() {
  return (
    <PageLayout>
      <section id="focus" className="section active">
        <h2 style={{ fontFamily: 'var(--font-passion), sans-serif' }}>
          FINALLY<br/>
          <span style={{ color: '#D43225' }}>THINKING</span> AS A SERVICE
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

        <a href="/what" className="cta-button red">See What We Do</a>
      </section>
    </PageLayout>
  );
}
