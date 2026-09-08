
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

export function Layout({ children, title }: LayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden antialiased bg-surface text-on-surface">
      <Sidebar />
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <Header title={title} />
        <div className="flex-1 overflow-y-auto p-6 lg:p-10 relative z-10">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary-container/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
          {children}
        </div>
      </main>
    </div>
  );
}
