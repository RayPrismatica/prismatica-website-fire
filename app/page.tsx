import Link from 'next/link';
import PrismaticaHeader from '@/components/PrismaticaHeader';
import ContentTracker from '@/components/ContentTracker';
import { getDynamicContent } from '@/lib/getDynamicContent';
import styles from './homepage.module.css';

export const revalidate = 0;

export default async function HomePage() {
  const content = await getDynamicContent();

  return (
    <>
      <PrismaticaHeader />
      <ContentTracker newsInsight={content.newsInsight} intelligenceExample={content.intelligenceExample} />

      <div className={styles.container}>
        <main className={styles.main}>
          {/* SECTION 1: IDENTITY - Above fold */}
          <h1 className={styles.hero}>
            FINALLY<br/>
            <span className={styles.heroRed}>THINKING</span> AS A SERVICE
          </h1>

          <div className={styles.intro}>
            <p className={styles.identity}>We're Prismatica Labs.</p>
            <p className={styles.valueProp}>We solve problems with thinking, not themes.</p>
          </div>

          {/* SECTION 2: POSITIONING */}
          <div className={styles.positioningSection}>
            <p className={styles.positioningStatement}>
              <strong>Intelligence begins where answers end.</strong>
            </p>

            <p className={styles.evidence}>
              Answers are cheap. Google has them. ChatGPT has them. Your competitor's intern has them.
            </p>
          </div>

          {/* SECTION 3: PROOF */}
          <div className={styles.proofSection}>
            <div className={styles.dynamicProofCard}>
              <span className={styles.proofLabel}>Right now:</span>
              <p className={styles.proofContent}>{content.newsInsight}</p>
            </div>

            <div className={styles.payoffStatement}>
              <p>The point is... are you asking the right questions?</p>
            </div>

            <p className={styles.silentThought}>Split reality into new variables. New colours emerge. Like light through a prism.</p>
          </div>

          {/* SECTION 4: NAVIGATION */}
          <div className={styles.navCards}>
            <Link href="/consulting" className={styles.navCard}>
              <div className={styles.redAccent}></div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>Solutions</h3>
                <p className={styles.cardDesc}>Consulting &amp; Products</p>
              </div>
              <div className={styles.arrow}>→</div>
            </Link>

            <Link href="/what" className={styles.navCard}>
              <div className={styles.redAccent}></div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>About</h3>
                <p className={styles.cardDesc}>How we think</p>
              </div>
              <div className={styles.arrow}>→</div>
            </Link>

            <Link href="/contact" className={`${styles.navCard} ${styles.navCardPrimary}`}>
              <div className={styles.redAccent}></div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>Contact</h3>
                <p className={styles.cardDesc}>Start here</p>
              </div>
              <div className={styles.arrow}>→</div>
            </Link>
          </div>

          {/* SECTION 5: PHILOSOPHY */}
          <div className={styles.philosophySection}>
            <hr className={styles.divider} />

            <p className={styles.philosophyText}>This is a website. It loads fast, tells you what we&nbsp;do. Everything here serves that&nbsp;purpose.</p>

            <p className={styles.philosophyText}>Focus is the only currency that matters. You&nbsp;get&nbsp;it when you&nbsp;remove&nbsp;noise.</p>

            <p className={styles.philosophyQuiet}>Welcome to the quietest room on&nbsp;the&nbsp;internet.</p>

            <hr className={styles.divider} />
          </div>
        </main>
      </div>
    </>
  );
}
