import Sidebar from './Sidebar';
import PrismaticaHeader from './PrismaticaHeader';
import styles from './PageLayout.module.css';

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Mobile: Show new header */}
      <div className={styles.mobileOnly}>
        <PrismaticaHeader />
      </div>

      {/* Desktop: Show sidebar + content */}
      <div className={styles.desktopLayout}>
        <Sidebar />
        <main className="main">
          {children}
        </main>
      </div>

      {/* Mobile: Main content with header spacing */}
      <div className={styles.mobileContent}>
        <main className={styles.mobileMain}>
          {children}
        </main>
      </div>
    </>
  );
}
