import { Link, useLocation } from 'react-router-dom';

export function Sidebar() {
  const location = useLocation();

  const isPathActive = (path: string) => {
    return location.pathname === path || (location.pathname === '/' && path === '/analytics');
  };

  return (
    <nav className="hidden md:flex flex-col h-full border-r border-white/5 bg-surface-container-lowest left-0 top-0 w-64 shrink-0 z-40">
      {/* Header */}
      <div className="px-6 py-6 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary-container flex items-center justify-center text-on-primary-container shadow-[0_0_15px_rgba(37,99,235,0.3)] shrink-0">
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>graphic_eq</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-headline-md text-xl font-bold text-on-surface tracking-tight leading-none">Zryth</h1>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono-label font-bold bg-white/5 text-primary border border-white/10">v2.4</span>
            </div>
            <p className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider text-[10px] mt-1">Maya AI Voice</p>
          </div>
        </div>
      </div>

      {/* Main Nav Tabs */}
      <div className="flex-1 overflow-y-auto py-6 px-3 flex flex-col gap-6">
        
        {/* PLATFORM */}
        <div className="flex flex-col gap-1">
          <div className="font-label-md text-[10px] font-semibold tracking-wider text-outline uppercase px-3 mb-1.5 opacity-60">Platform</div>
          <div className="flex flex-col gap-1">
            <Link
              to="/analytics"
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg font-body-sm text-sm transition-colors duration-200 ${
                isPathActive('/analytics')
                  ? 'bg-primary-container text-on-primary-container font-medium shadow-[0_0_15px_rgba(37,99,235,0.3)]'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-white/5'
              }`}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>dashboard</span>
              <span>Analytics</span>
            </Link>
            <Link
              to="/calls"
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg font-body-sm text-sm transition-colors duration-200 ${
                isPathActive('/calls')
                  ? 'bg-primary-container text-on-primary-container font-medium shadow-[0_0_15px_rgba(37,99,235,0.3)]'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-white/5'
              }`}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>call</span>
              <span>All Calls</span>
            </Link>
          </div>
        </div>

        {/* KNOWLEDGE & DATA */}
        <div className="flex flex-col gap-1">
          <div className="font-label-md text-[10px] font-semibold tracking-wider text-outline uppercase px-3 mb-1.5 opacity-60">Knowledge & Data</div>
          <div className="flex flex-col gap-1">
            <Link
              to="/knowledge"
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg font-body-sm text-sm transition-colors duration-200 ${
                isPathActive('/knowledge')
                  ? 'bg-primary-container text-on-primary-container font-medium shadow-[0_0_15px_rgba(37,99,235,0.3)]'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-white/5'
              }`}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>menu_book</span>
              <span>Knowledge Base</span>
            </Link>
          </div>
        </div>

        {/* SYSTEM */}
        <div className="flex flex-col gap-1">
          <div className="font-label-md text-[10px] font-semibold tracking-wider text-outline uppercase px-3 mb-1.5 opacity-60">System</div>
          <div className="flex flex-col gap-1">
            <Link
              to="/settings"
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg font-body-sm text-sm transition-colors duration-200 ${
                isPathActive('/settings')
                  ? 'bg-primary-container text-on-primary-container font-medium shadow-[0_0_15px_rgba(37,99,235,0.3)]'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-white/5'
              }`}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>settings</span>
              <span>Settings</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Nav & Telemetry Stream */}
      <div className="p-3 border-t border-white/5 flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <Link
            to="/support"
            className="flex items-center gap-3 px-3.5 py-2 text-on-surface-variant hover:text-on-surface hover:bg-white/5 transition-colors duration-200 rounded-lg font-body-sm text-sm"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>help</span>
            <span>Support</span>
          </Link>
          <Link
            to="/login"
            className="flex items-center gap-3 px-3.5 py-2 text-on-surface-variant hover:text-error hover:bg-error/10 transition-colors duration-200 rounded-lg font-body-sm text-sm"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>logout</span>
            <span>Sign Out</span>
          </Link>
        </div>
        <div className="px-3 py-2 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-between text-mono-label text-xs mt-1">
          <span className="flex items-center gap-2 text-tertiary font-mono-label">
            <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
            Telemetry Stream: OK
          </span>
        </div>
      </div>
    </nav>
  );
}
