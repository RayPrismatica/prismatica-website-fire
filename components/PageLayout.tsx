import Sidebar from './Sidebar';

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container flex min-h-screen">
      <Sidebar />
      <main className="main">
        {children}
      </main>
    </div>
  );
}
