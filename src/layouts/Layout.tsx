import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <div className="flex h-screen overflow-hidden antialiased bg-surface text-on-surface">
      <Sidebar />
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative bg-[#0c0c0e]">
        <Header />
        {/* Fixed Ambient Background */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary-container/5 rounded-full blur-[100px] pointer-events-none z-0"></div>
        
        <div className="flex-1 overflow-y-auto overscroll-none relative z-10 flex flex-col">
          <div className="flex-1 flex flex-col">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
