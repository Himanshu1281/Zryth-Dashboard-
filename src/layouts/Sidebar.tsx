import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="w-64 flex-shrink-0 bg-[#131314] border-r border-[#27272a] flex flex-col justify-between h-full select-none z-40" data-purpose="application-sidebar">
      <div className="flex flex-col overflow-hidden flex-1">
        {/* Zryth Application Brand Header */}
        <div className="px-5 py-5 border-b border-[#27272a] flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-600/30">
            Z
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-wider text-sm text-white uppercase">Zryth</span>
              <span className="text-[10px] bg-zinc-800 text-zinc-400 font-mono px-1.5 py-0.5 rounded border border-zinc-700">v2.4</span>
            </div>
            <span className="text-[11px] text-zinc-400 font-medium tracking-wide uppercase">Maya AI Voice</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="px-3 py-4 space-y-6 text-xs font-medium tracking-wide flex-1 overflow-y-auto">
          
          {/* PLATFORM Section */}
          <div>
            <div className="px-3 pb-2 text-[10px] uppercase font-semibold text-zinc-400 tracking-wider">Platform</div>
            <div className="space-y-1">
              <Link 
                to="/" 
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${isActive('/') ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'}`}
              >
                <svg className={`w-4 h-4 ${isActive('/') ? 'text-blue-400' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                Dashboard
              </Link>
              <Link 
                to="/analytics" 
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${isActive('/analytics') ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'}`}
              >
                <svg className={`w-4 h-4 ${isActive('/analytics') ? 'text-blue-400' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                Analytics
              </Link>
              <Link 
                to="/calls" 
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${isActive('/calls') ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'}`}
              >
                <svg className={`w-4 h-4 ${isActive('/calls') ? 'text-blue-400' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                Call Logs
              </Link>
              <Link 
                to="/phone-numbers" 
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${isActive('/phone-numbers') ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'}`}
              >
                <svg className={`w-4 h-4 ${isActive('/phone-numbers') ? 'text-blue-400' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                Phone Numbers
              </Link>
              <Link 
                to="/agents" 
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${isActive('/agents') ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'}`}
              >
                <svg className={`w-4 h-4 ${isActive('/agents') ? 'text-blue-400' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                Voice Agents
              </Link>

            </div>
          </div>

          {/* AGENT BEHAVIOR Section */}
          <div>
            <div className="px-3 pb-2 text-[10px] uppercase font-semibold text-zinc-400 tracking-wider">Agent Behavior</div>
            <div className="space-y-1">
              <Link 
                to="/prompts" 
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${isActive('/prompts') ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'}`}
              >
                <svg className={`w-4 h-4 ${isActive('/prompts') ? 'text-blue-400' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                Prompts
              </Link>
              <Link 
                to="/tools" 
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${isActive('/tools') ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'}`}
              >
                <svg className={`w-4 h-4 ${isActive('/tools') ? 'text-blue-400' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                Tools
              </Link>
            </div>
          </div>
          {/* KNOWLEDGE & DATA Section */}
          <div>
            <div className="px-3 pb-2 text-[10px] uppercase font-semibold text-zinc-400 tracking-wider">Knowledge & Data</div>
            <div className="space-y-1">
              <Link 
                to="/knowledge" 
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${isActive('/knowledge') ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'}`}
              >
                <svg className={`w-4 h-4 ${isActive('/knowledge') ? 'text-blue-400' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                Knowledge Base
              </Link>
            </div>
          </div>

          {/* SYSTEM Section */}
          <div>
            <div className="px-3 pb-2 text-[10px] uppercase font-semibold text-zinc-400 tracking-wider">System</div>
            <div className="space-y-1">
              <Link 
                to="/settings" 
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${isActive('/settings') ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'}`}
              >
                <svg className={`w-4 h-4 ${isActive('/settings') ? 'text-blue-400' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                Settings
              </Link>
            </div>
          </div>
        </nav>
      </div>

      {/* Sidebar Footer */}
      <div className="p-3 border-t border-[#27272a] space-y-2 shrink-0">
        <Link 
          to="/support" 
          className="flex items-center gap-3 px-3 py-1.5 rounded-md text-xs text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
          Support
        </Link>
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-1.5 rounded-md text-xs text-zinc-400 hover:text-red-400 hover:bg-zinc-800/40 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
          Sign Out
        </button>

        {/* Status Indicator */}
        <div className="pt-2 px-3 flex items-center justify-between text-[11px] text-zinc-400 border-t border-[#27272a]/50">
          <span className="">Telemetry Stream</span>
          <div className="flex items-center gap-1.5 font-medium text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            OK
          </div>
        </div>
      </div>
    </aside>
  );
}
