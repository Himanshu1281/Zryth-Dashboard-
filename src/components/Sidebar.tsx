
import { Link, useLocation } from 'react-router-dom';

export function Sidebar() {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: 'dashboard', label: 'Dashboard' },
    { path: '/analytics', icon: 'analytics', label: 'Analytics' },
    { path: '/agents', icon: 'robot_2', label: 'Agents' },
    { path: '/knowledge', icon: 'menu_book', label: 'Knowledge Base' },
    { path: '/settings', icon: 'settings', label: 'Settings' },
  ];

  return (
    <nav className="hidden md:flex flex-col h-full border-r border-white/5 bg-surface-container-lowest left-0 top-0 w-64 shrink-0 z-40">
      {/* Header */}
      <div className="px-6 py-8 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-container to-secondary-container flex items-center justify-center text-on-primary-container font-bold shadow-[0_0_15px_rgba(37,99,235,0.3)]">
            M
          </div>
          <div>
            <h1 className="font-headline-md text-xl font-bold text-on-surface">Maya AI</h1>
            <p className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider">Enterprise Voice</p>
          </div>
        </div>
        <button className="mt-6 w-full py-2.5 px-4 bg-primary-container text-on-primary-container rounded-lg font-body-sm text-sm font-medium flex items-center justify-center gap-2 hover:bg-inverse-primary transition-colors shadow-[0_0_10px_rgba(37,99,235,0.4)] active:opacity-80 cursor-pointer">
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add</span>
          New Agent
        </button>
      </div>

      {/* Main Nav Tabs */}
      <div className="flex-1 overflow-y-auto py-6 px-3 flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (location.pathname === '/' && item.path === '/analytics'); // default to analytics for now
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-body-sm text-sm transition-colors duration-200 active:opacity-80 ${
                isActive
                  ? 'bg-secondary-container text-on-secondary-container font-medium shadow-[0_0_10px_rgba(87,27,193,0.3)] border border-secondary-container/50'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-white/5'
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* Footer Nav */}
      <div className="p-3 border-t border-white/5 flex flex-col gap-1">
        <Link to="/help" className="flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:text-on-surface hover:bg-white/5 transition-colors duration-200 rounded-lg text-sm">
          <span className="material-symbols-outlined">help</span>
          Help
        </Link>
        <Link to="/login" className="flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:text-on-surface hover:bg-white/5 transition-colors duration-200 rounded-lg text-sm">
          <span className="material-symbols-outlined">logout</span>
          Sign Out
        </Link>
      </div>
    </nav>
  );
}
