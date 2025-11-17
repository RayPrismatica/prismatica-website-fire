import Link from 'next/link';
import Image from 'next/image';
import { getDynamicContent } from '@/lib/getDynamicContent';
import MobileHeader from './MobileHeader';
import styles from './test-mobile.module.css';

export const revalidate = 0;

export default async function TestMobilePage() {
  const content = await getDynamicContent();

  return (
    <div className={styles.container}>
      <MobileHeader />
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
            <p>See what happens? Split reality into new questions. New colours emerge. Like light through a prism.</p>
          </div>
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

        {/* Back to original homepage link */}
        <div className={styles.testNote}>
          <Link href="/" className={styles.backLink}>← Back to original homepage</Link>
        </div>
      </main>
    </div>
  );
}
