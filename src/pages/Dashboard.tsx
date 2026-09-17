import { Layout } from '../components/Layout';

export function Dashboard() {
  return (
    <Layout disablePadding={true} title="Dashboard - Zryth AI Voice">
      <div className="p-4 sm:p-8 space-y-6 max-w-[1440px] mx-auto w-full">
        {/* BEGIN: Page Header */}
        <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" data-purpose="page-header">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Dashboard</h1>
            <p className="text-sm text-neutral-400 mt-0.5">Welcome back — here's what's happening with your AI Voice Agents.</p>
          </div>
          <div className="flex items-center gap-3">
          </div>
        </section>
        {/* END: Page Header */}
        
        {/* BEGIN: 8-Card Metrics Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" data-purpose="metrics-summary">
          {/* Metric 2: Total Contacts */}
          <div className="bg-[#1c1b1c] border border-[rgba(255,255,255,0.08)] rounded-xl p-4 flex items-center gap-4 hover:border-neutral-700 transition">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
            </div>
            <div>
              <div className="text-xs text-neutral-400 font-medium">Total Contacts</div>
              <div className="text-xl font-bold text-white mt-0.5">0</div>
            </div>
          </div>
          
          {/* Metric 3: Total Calls */}
          <div className="bg-[#1c1b1c] border border-[rgba(255,255,255,0.08)] rounded-xl p-4 flex items-center gap-4 hover:border-neutral-700 transition">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
            </div>
            <div>
              <div className="text-xs text-neutral-400 font-medium">Total Calls</div>
              <div className="text-xl font-bold text-white mt-0.5">0</div>
            </div>
          </div>
          
          {/* Metric 4: Connected Calls */}
          <div className="bg-[#1c1b1c] border border-[rgba(255,255,255,0.08)] rounded-xl p-4 flex items-center gap-4 hover:border-neutral-700 transition">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
            </div>
            <div>
              <div className="text-xs text-neutral-400 font-medium">Connected Calls</div>
              <div className="text-xl font-bold text-white mt-0.5">0</div>
            </div>
          </div>
          
          {/* Metric 5: Failed Calls */}
          <div className="bg-[#1c1b1c] border border-[rgba(255,255,255,0.08)] rounded-xl p-4 flex items-center gap-4 hover:border-neutral-700 transition">
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
            </div>
            <div>
              <div className="text-xs text-neutral-400 font-medium">Failed Calls</div>
              <div className="text-xl font-bold text-white mt-0.5">0</div>
            </div>
          </div>
          
          {/* Metric 6: Avg Duration */}
          <div className="bg-[#1c1b1c] border border-[rgba(255,255,255,0.08)] rounded-xl p-4 flex items-center gap-4 hover:border-neutral-700 transition">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
            </div>
            <div>
              <div className="text-xs text-neutral-400 font-medium">Avg Duration</div>
              <div className="text-xl font-bold text-white mt-0.5">—</div>
            </div>
          </div>
          
          {/* Metric 7: Conversion Rate */}
          <div className="bg-[#1c1b1c] border border-[rgba(255,255,255,0.08)] rounded-xl p-4 flex items-center gap-4 hover:border-neutral-700 transition">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
            </div>
            <div>
              <div className="text-xs text-neutral-400 font-medium">Conversion Rate</div>
              <div className="text-xl font-bold text-white mt-0.5">0%</div>
            </div>
          </div>
          
          {/* Metric 8: Active Agents */}
          <div className="bg-[#1c1b1c] border border-[rgba(255,255,255,0.08)] rounded-xl p-4 flex items-center gap-4 hover:border-neutral-700 transition">
            <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
            </div>
            <div>
              <div className="text-xs text-neutral-400 font-medium">Active Agents</div>
              <div className="text-xl font-bold text-white mt-0.5">—</div>
            </div>
          </div>
        </section>
        {/* END: 8-Card Metrics Grid */}
        
        {/* BEGIN: Charts & Activity Row (Calls Over Time & Recent Campaigns) */}
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-2" data-purpose="charts-and-campaigns">
          {/* Left: Calls Over Time Chart Container (Span 7) */}
          <div className="bg-[#1c1b1c] border border-[rgba(255,255,255,0.08)] rounded-xl p-5 flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-white">Calls Over Time</h3>
              <span className="text-[11px] font-mono text-neutral-400 bg-neutral-800/80 px-2 py-0.5 rounded border border-neutral-700/60">Last 14 Days</span>
            </div>
            {/* Chart Area with Y-axis & SVG timeline */}
            <div className="relative w-full h-56 flex flex-col justify-between pt-2">
              {/* Grid Lines and Y-Axis numbers (4, 3, 2, 1, 0) */}
              <div className="relative w-full h-44 flex flex-col justify-between">
                {/* Y-Level 4 */}
                <div className="flex items-center gap-3 w-full">
                  <span className="w-4 text-[10px] font-mono text-neutral-500 text-right">4</span>
                  <div className="flex-1 border-b border-dashed border-neutral-800"></div>
                </div>
                {/* Y-Level 3 */}
                <div className="flex items-center gap-3 w-full">
                  <span className="w-4 text-[10px] font-mono text-neutral-500 text-right">3</span>
                  <div className="flex-1 border-b border-dashed border-neutral-800"></div>
                </div>
                {/* Y-Level 2 */}
                <div className="flex items-center gap-3 w-full">
                  <span className="w-4 text-[10px] font-mono text-neutral-500 text-right">2</span>
                  <div className="flex-1 border-b border-dashed border-neutral-800"></div>
                </div>
                {/* Y-Level 1 */}
                <div className="flex items-center gap-3 w-full">
                  <span className="w-4 text-[10px] font-mono text-neutral-500 text-right">1</span>
                  <div className="flex-1 border-b border-dashed border-neutral-800"></div>
                </div>
                {/* Y-Level 0 (baseline) */}
                <div className="flex items-center gap-3 w-full">
                  <span className="w-4 text-[10px] font-mono text-neutral-500 text-right">0</span>
                  <div className="flex-1 border-b border-neutral-800"></div>
                </div>
                {/* SVG Line Overlay matching zero/minimal calls baseline with subtle glow */}
                <div className="absolute inset-0 left-7 right-0 pointer-events-none">
                  <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 176">
                    {/* Subtle gradient fill under line */}
                    <defs>
                      <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.15"></stop>
                        <stop offset="100%" stopColor="#10b981" stopOpacity="0.0"></stop>
                      </linearGradient>
                    </defs>
                    {/* Area */}
                    <polygon fill="url(#chartGradient)" points="0,175 1000,175 1000,176 0,176"></polygon>
                    {/* Cyan / Teal timeline curve along zero mark from reference screenshot 205003 */}
                    <line stroke="#10b981" strokeWidth="2" x1="0" x2="1000" y1="175" y2="175"></line>
                  </svg>
                </div>
              </div>
              {/* X-Axis date markers (Sep 03 -> Sep 16) */}
              <div className="flex items-center justify-between pl-7 pr-1 text-[10px] font-mono text-neutral-500 select-none pt-2">
                <span className="">Sep 03</span>
                <span className="hidden sm:inline">Sep 05</span>
                <span className="">Sep 07</span>
                <span className="hidden sm:inline">Sep 09</span>
                <span className="">Sep 11</span>
                <span className="hidden sm:inline">Sep 13</span>
                <span className="">Sep 16</span>
              </div>
            </div>
          </div>
          {/* Right: Recent Campaigns Card (Span 5) */}
          
          <div className="bg-[#1c1b1c] border border-[rgba(255,255,255,0.08)] rounded-xl p-5 flex flex-col h-full" data-purpose="recent-call-logs">
            <div className="flex items-center justify-between pb-3 border-b border-[rgba(255,255,255,0.06)]">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-white">Recent Call Logs</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-400 border border-neutral-700">Live feed</span>
              </div>
              <a className="text-xs text-blue-400 hover:text-blue-300 font-medium" href="#call-logs">View all</a>
            </div>
            <div className="py-14 flex flex-col items-center justify-center text-center flex-1">
              <div className="w-12 h-12 rounded-full bg-neutral-800/80 border border-neutral-700/40 flex items-center justify-center text-neutral-500 mb-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                </svg>
              </div>
              <p className="text-xs text-neutral-400 font-medium">No call logs yet</p>
              <p className="text-[11px] text-neutral-600 mt-1 max-w-sm">When your voice agents start executing calls, detailed audio recordings and transcripts will appear here.</p>
            </div>
          </div>
        </section>
        {/* END: Charts & Activity Row */}
      </div>
    </Layout>
  );
}
