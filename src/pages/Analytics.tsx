import { Layout } from '../components/Layout';

export function Analytics() {
  return (
    <Layout title="Analytics - Maya AI Voice">
      <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6 max-w-[1440px] mx-auto w-full">
        {/* Header Title Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl lg:text-[28px] font-bold text-on-surface tracking-tight">Analytics</h2>
            <p className="text-sm text-on-surface-variant mt-0.5">Insights across all your campaigns and agents.</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-high border border-white/10 text-xs font-medium text-on-surface-variant hover:text-on-surface cursor-pointer">
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>calendar_today</span>
              <span>Aug 19, 2024 - Sep 16, 2024</span>
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>expand_more</span>
            </div>
            <button className="p-1.5 rounded-lg bg-surface-container-high border border-white/10 text-on-surface-variant hover:text-on-surface" title="Download Report">
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>download</span>
            </button>
          </div>
        </div>

        {/* Top Large Card: Calls Per Day */}
        <div className="glass-panel rounded-2xl p-6 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full w-full h-full pointer-events-none opacity-30"></div>
          <div className="relative z-10 flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-on-surface tracking-tight">Calls Per Day</h3>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-2 text-on-surface-variant">
                <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block"></span>
                Completed Calls
              </span>
              <span className="flex items-center gap-2 text-on-surface-variant">
                <span className="w-2.5 h-2.5 rounded-full bg-tertiary inline-block"></span>
                Total Attempts
              </span>
            </div>
          </div>
          
          {/* Chart Canvas */}
          <div className="relative w-full h-[280px] pt-4 pb-2 z-10">
            {/* Grid horizontal lines */}
            <div className="absolute inset-0 left-6 right-2 flex flex-col justify-between pointer-events-none pb-7">
              <div className="w-full border-b border-dashed border-white/10"></div>
              <div className="w-full border-b border-dashed border-white/10"></div>
              <div className="w-full border-b border-dashed border-white/10"></div>
              <div className="w-full border-b border-dashed border-white/10"></div>
              <div className="w-full border-b border-dashed border-white/10"></div>
            </div>
            
            {/* SVG Line Chart with Gradient Curve & Markers */}
            <svg className="w-[calc(100%-2rem)] h-[calc(100%-28px)] ml-8 overflow-visible relative z-10" preserveAspectRatio="none" viewBox="0 0 1000 240">
              <defs>
                <linearGradient id="primaryAreaGrad" x1="0%" x2="0%" y1="0%" y2="100%">
                  <stop offset="0%" stopColor="#2563eb" stopOpacity="0.35"></stop>
                  <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0"></stop>
                </linearGradient>
                <linearGradient id="lineGrad" x1="0%" x2="100%" y1="0%" y2="0%">
                  <stop offset="0%" stopColor="#4fdbc8"></stop>
                  <stop offset="50%" stopColor="#b4c5ff"></stop>
                  <stop offset="100%" stopColor="#2563eb"></stop>
                </linearGradient>
              </defs>
              <path d="M 0,220 L 62,210 L 125,190 L 187,175 L 250,150 L 312,160 L 375,130 L 437,110 L 500,80 L 562,95 L 625,60 L 687,75 L 750,45 L 812,65 L 875,30 L 1000,50 L 1000,230 L 0,230 Z" fill="url(#primaryAreaGrad)"></path>
              <path d="M 0,220 L 62,210 L 125,190 L 187,175 L 250,150 L 312,160 L 375,130 L 437,110 L 500,80 L 562,95 L 625,60 L 687,75 L 750,45 L 812,65 L 875,30 L 1000,50" fill="none" stroke="url(#lineGrad)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path>
              <circle className="cursor-pointer hover:r-[6px] transition-all" cx="250" cy="150" fill="#131316" r="4" stroke="#4fdbc8" strokeWidth="2"></circle>
              <circle className="cursor-pointer hover:r-[6px] transition-all" cx="500" cy="80" fill="#131316" r="4" stroke="#b4c5ff" strokeWidth="2"></circle>
              <circle className="cursor-pointer hover:r-[6px] transition-all" cx="750" cy="45" fill="#131316" r="4" stroke="#2563eb" strokeWidth="2"></circle>
              <circle className="cursor-pointer hover:r-[7px] transition-all drop-shadow-[0_0_8px_rgba(37,99,235,0.8)]" cx="875" cy="30" fill="#2563eb" r="5" stroke="#ffffff" strokeWidth="2"></circle>
            </svg>
            
            {/* Y-Axis Labels */}
            <div className="absolute left-0 top-3 bottom-8 flex flex-col justify-between text-[11px] font-mono-label text-outline text-right pr-2 w-6">
              <span>4k</span>
              <span>3k</span>
              <span>2k</span>
              <span>1k</span>
              <span>0</span>
            </div>
            
            {/* X-Axis Labels */}
            <div className="absolute bottom-0 left-8 right-2 flex justify-between text-[10.5px] font-mono-label text-outline/80 overflow-hidden select-none">
              <span>Aug 19</span>
              <span className="hidden md:inline">Aug 21</span>
              <span>Aug 23</span>
              <span className="hidden md:inline">Aug 25</span>
              <span>Aug 27</span>
              <span className="hidden md:inline">Aug 29</span>
              <span>Aug 31</span>
              <span className="hidden md:inline">Sep 02</span>
              <span>Sep 04</span>
              <span className="hidden md:inline">Sep 06</span>
              <span>Sep 08</span>
              <span className="hidden sm:inline">Sep 10</span>
              <span className="hidden lg:inline">Sep 11</span>
              <span>Sep 12</span>
              <span className="hidden md:inline">Sep 14</span>
              <span>Sep 16</span>
            </div>
          </div>
        </div>

        {/* Bottom Row: 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bottom Left Card: Call Status Breakdown */}
          <div className="glass-panel rounded-2xl p-6 shadow-xl relative flex flex-col justify-between">
            <div className="flex items-center justify-between mb-5 z-10">
              <h3 className="text-base font-semibold text-on-surface tracking-tight">Call Status Breakdown</h3>
              <span className="text-xs text-on-surface-variant font-mono-label">Total: 1,245 Calls</span>
            </div>
            
            {/* Visualization Area */}
            <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-6 py-2 z-10">
              {/* Donut Graphic */}
              <div className="sm:col-span-5 flex justify-center items-center relative">
                <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" fill="transparent" r="38" stroke="#2563eb" strokeDasharray="238.76" strokeDashoffset="85.95" strokeLinecap="round" strokeWidth="12"></circle>
                  <circle cx="50" cy="50" fill="transparent" r="38" stroke="#4fdbc8" strokeDasharray="238.76" strokeDashoffset="195.78" strokeLinecap="round" strokeWidth="12"></circle>
                  <circle cx="50" cy="50" fill="transparent" r="38" stroke="#d0bcff" strokeDasharray="238.76" strokeDashoffset="210.11" strokeLinecap="round" strokeWidth="12"></circle>
                  <circle cx="50" cy="50" fill="transparent" r="38" stroke="#434655" strokeDasharray="238.76" strokeDashoffset="224.43" strokeLinecap="round" strokeWidth="12"></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-2xl font-bold text-on-surface font-mono-label">64%</span>
                  <span className="text-[10px] uppercase font-semibold text-on-surface-variant tracking-wider">Success</span>
                </div>
              </div>
              
              {/* Legend List */}
              <div className="sm:col-span-7 space-y-3 font-body-sm text-xs">
                <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary-container shrink-0"></span>
                    <span className="text-on-surface font-medium">Completed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-on-surface font-mono-label font-semibold">796</span>
                    <span className="text-on-surface-variant text-[11px] font-mono-label">64.0%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-tertiary shrink-0"></span>
                    <span className="text-on-surface font-medium">Transferred to Human</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-on-surface font-mono-label font-semibold">224</span>
                    <span className="text-on-surface-variant text-[11px] font-mono-label">18.0%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-secondary shrink-0"></span>
                    <span className="text-on-surface font-medium">User Busy / Declined</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-on-surface font-mono-label font-semibold">150</span>
                    <span className="text-on-surface-variant text-[11px] font-mono-label">12.0%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#434655] shrink-0"></span>
                    <span className="text-on-surface font-medium">Voicemail</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-on-surface font-mono-label font-semibold">75</span>
                    <span className="text-on-surface-variant text-[11px] font-mono-label">6.0%</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pt-3 mt-2 border-t border-white/5 flex items-center justify-between text-xs text-on-surface-variant z-10">
              <span>Target resolution rate: &gt;60%</span>
              <span className="text-tertiary flex items-center gap-1 font-mono-label">
                <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>check_circle</span> Optimized
              </span>
            </div>
          </div>

          {/* Bottom Right Card: Call Duration Distribution */}
          <div className="glass-panel rounded-2xl p-6 shadow-xl relative flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4 z-10">
              <h3 className="text-base font-semibold text-on-surface tracking-tight">Call Duration Distribution</h3>
              <span className="text-xs text-on-surface-variant font-mono-label">Avg: 2m 14s</span>
            </div>
            
            {/* Duration Histogram */}
            <div className="relative w-full h-[210px] pt-2 pb-2 z-10">
              {/* Horizontal dashed lines */}
              <div className="absolute inset-0 left-6 right-2 flex flex-col justify-between pointer-events-none pb-7">
                <div className="w-full border-b border-dashed border-white/10"></div>
                <div className="w-full border-b border-dashed border-white/10"></div>
                <div className="w-full border-b border-dashed border-white/10"></div>
                <div className="w-full border-b border-dashed border-white/10"></div>
                <div className="w-full border-b border-dashed border-white/10"></div>
              </div>
              
              {/* Y-Axis */}
              <div className="absolute left-0 top-1 bottom-8 flex flex-col justify-between text-[11px] font-mono-label text-outline text-right pr-2 w-6">
                <span>400</span>
                <span>300</span>
                <span>200</span>
                <span>100</span>
                <span>0</span>
              </div>
              
              {/* Vertical Bars */}
              <div className="absolute inset-0 left-10 right-4 bottom-7 flex items-end justify-between px-3 gap-3">
                <div className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer">
                  <div className="w-full max-w-[42px] bg-primary/20 hover:bg-primary/40 border border-primary/40 rounded-t transition-all" style={{ height: '45%' }}></div>
                </div>
                <div className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer">
                  <div className="w-full max-w-[42px] bg-primary-container/80 hover:bg-primary-container border border-primary/60 rounded-t transition-all shadow-[0_0_12px_rgba(37,99,235,0.3)]" style={{ height: '85%' }}></div>
                </div>
                <div className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer">
                  <div className="w-full max-w-[42px] bg-tertiary-container/80 hover:bg-tertiary-container border border-tertiary/60 rounded-t transition-all shadow-[0_0_12px_rgba(79,219,200,0.2)]" style={{ height: '65%' }}></div>
                </div>
                <div className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer">
                  <div className="w-full max-w-[42px] bg-secondary-container/60 hover:bg-secondary-container border border-secondary/50 rounded-t transition-all" style={{ height: '30%' }}></div>
                </div>
                <div className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer">
                  <div className="w-full max-w-[42px] bg-surface-variant hover:bg-white/20 border border-white/20 rounded-t transition-all" style={{ height: '15%' }}></div>
                </div>
              </div>
              
              {/* X-Axis Labels */}
              <div className="absolute bottom-0 left-10 right-4 flex justify-between text-[11px] font-mono-label text-outline/80 text-center px-1">
                <span className="flex-1">&lt;1 min</span>
                <span className="flex-1">1-2 min</span>
                <span className="flex-1">2-5 min</span>
                <span className="flex-1">5-10 min</span>
                <span className="flex-1">&gt;10 min</span>
              </div>
            </div>
            
            <div className="pt-3 mt-2 border-t border-white/5 flex items-center justify-between text-xs text-on-surface-variant z-10">
              <span>Longest session: 14m 20s</span>
              <span className="text-primary font-mono-label">Most common: 1-2 min</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
