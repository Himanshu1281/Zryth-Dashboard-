
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  disablePadding?: boolean;
  hideHeader?: boolean;
}

export function Layout({ children, title, disablePadding = false, hideHeader = false }: LayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden antialiased bg-surface text-on-surface">
      <Sidebar />
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative bg-[#0c0c0e]">
        {!hideHeader && <Header title={title} />}
        {/* Fixed Ambient Background */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary-container/5 rounded-full blur-[100px] pointer-events-none z-0"></div>
        
        <div className="flex-1 overflow-y-auto overscroll-none relative z-10 flex flex-col">
          <div className={`flex-1 flex flex-col ${disablePadding ? "" : "p-6 lg:p-10"}`}>
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
