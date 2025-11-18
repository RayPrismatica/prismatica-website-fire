import styles from './PageLayout.module.css';

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Desktop: Content area (Sidebar is in root layout) */}
      <div className={styles.desktopLayout}>
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
