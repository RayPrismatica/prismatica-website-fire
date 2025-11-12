import PageLayout from '@/components/PageLayout';
import { getDynamicContent } from '@/lib/getDynamicContent';

export const revalidate = 0; // Disable caching

export default async function HomePage() {
  const content = await getDynamicContent();

  return (
    <PageLayout>
      <section id="focus" className="section active">
        <h2 style={{ fontFamily: 'var(--font-passion), sans-serif' }}>
          FINALLY<br/>
          <span style={{ color: '#D43225' }}>THINKING</span> AS A SERVICE
        </h2>

        <p>{content.newsInsight}</p>

        <p>We're Prismatica Labs. We solve problems with thinking, not themes.</p>

        <p>The point is... are you solving for the right variable?</p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <p>And, we want to work with adults who don't need to be entertained.</p>

        <p>This is a website. It loads fast, tells you what we do. No cognitive candy. No design theatre. No emotional manipulation through carefully crafted user journeys.</p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <p>Focus is the only currency that matters. You get it when you remove noise.</p>

        <p>Welcome to the quietest room on the internet.</p>

        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }} />

        <a href="/what" className="cta-button red">See What We Do</a>
      </section>
    </PageLayout>
  );
}
