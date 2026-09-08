
import { Layout } from '../components/Layout';
import { GlassCard } from '../components/GlassCard';

export function AnalyticsDashboard() {
  return (
    <Layout title="Maya AI Voice Agent - Acme Realty">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-8">
        
        {/* Section Header */}
        <div className="flex justify-between items-end">
          <div>
            <h3 className="font-headline-lg text-3xl font-bold text-on-surface tracking-tight">Analytics Overview</h3>
            <p className="font-body-md text-base text-on-surface-variant mt-1">Real-time performance metrics and conversation logs.</p>
          </div>
          <div className="flex gap-2">
            <select className="bg-surface-container-high border border-white/10 rounded-lg text-sm text-on-surface py-2 pl-3 pr-8 focus:ring-primary focus:border-primary cursor-pointer hover:border-white/20 transition-colors">
              <option>Last 24 Hours</option>
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
        </div>

        {/* Top Row: Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <GlassCard glowColor="primary" hoverEffect>
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/5 text-primary">
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>call</span>
              </div>
              <span className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider">Total Calls</span>
            </div>
            <div>
              <div className="font-display-lg text-4xl font-bold text-on-surface glow-text">1,245</div>
              <div className="flex items-center gap-1 mt-2 text-tertiary font-mono-label text-sm">
                <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>trending_up</span>
                +12.5% from last week
              </div>
            </div>
          </GlassCard>

          <GlassCard glowColor="primary" hoverEffect>
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/5 text-secondary">
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>schedule</span>
              </div>
              <span className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider">Total Minutes</span>
            </div>
            <div>
              <div className="font-display-lg text-4xl font-bold text-on-surface glow-text">340.5</div>
              <div className="flex items-center gap-1 mt-2 text-tertiary font-mono-label text-sm">
                <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>trending_up</span>
                +5.2% from last week
              </div>
            </div>
          </GlassCard>

          <GlassCard glowColor="tertiary" hoverEffect>
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/5 text-tertiary">
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>payments</span>
              </div>
              <span className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider">Total Cost</span>
            </div>
            <div>
              <div className="font-display-lg text-4xl font-bold text-on-surface glow-text">$45.00</div>
              <div className="flex items-center gap-1 mt-2 text-error font-mono-label text-sm">
                <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>trending_down</span>
                -2.1% from last week
              </div>
            </div>
          </GlassCard>

          <GlassCard glowColor="primary" hoverEffect>
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/5 text-primary">
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>analytics</span>
              </div>
              <span className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider">Avg Cost / Min</span>
            </div>
            <div>
              <div className="font-display-lg text-4xl font-bold text-on-surface glow-text">$0.13</div>
              <div className="flex items-center gap-1 mt-2 text-on-surface-variant font-mono-label text-sm">
                <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>horizontal_rule</span>
                Stable
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Middle/Bottom Area */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 h-[600px] xl:h-auto min-h-[600px]">
          
          {/* Recent Calls Table */}
          <div className="xl:col-span-8 glass-panel rounded-xl flex flex-col overflow-hidden shadow-xl">
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
              <h4 className="font-headline-md text-xl font-semibold text-on-surface">Recent Calls</h4>
              <button className="text-primary hover:text-primary-container transition-colors font-label-md text-xs uppercase tracking-wider flex items-center gap-1">
                View All
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_forward</span>
              </button>
            </div>
            <div className="overflow-x-auto flex-1 relative">
              <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 bg-[#0A0A0B]/90 backdrop-blur z-20 border-b border-white/10">
                  <tr>
                    <th className="py-4 px-6 font-label-md text-xs text-on-surface-variant uppercase tracking-wider w-10">Dir</th>
                    <th className="py-4 px-6 font-label-md text-xs text-on-surface-variant uppercase tracking-wider">Phone Number</th>
                    <th className="py-4 px-6 font-label-md text-xs text-on-surface-variant uppercase tracking-wider">Date/Time</th>
                    <th className="py-4 px-6 font-label-md text-xs text-on-surface-variant uppercase tracking-wider">Lang</th>
                    <th className="py-4 px-6 font-label-md text-xs text-on-surface-variant uppercase tracking-wider">Cost</th>
                    <th className="py-4 px-6 font-label-md text-xs text-on-surface-variant uppercase tracking-wider">Flags</th>
                    <th className="py-4 px-6 text-right font-label-md text-xs text-on-surface-variant uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-body-sm text-sm">
                  {/* Row 1 */}
                  <tr className="hover:bg-white/[0.03] transition-colors group cursor-pointer bg-primary-container/5">
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-tertiary/20 text-tertiary border border-tertiary/20" title="Inbound">
                        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>call_received</span>
                      </span>
                    </td>
                    <td className="py-4 px-6 font-mono-label text-sm text-on-surface">+1 (555) 019-2834</td>
                    <td className="py-4 px-6 text-on-surface-variant">Today, 10:24 AM<br/><span className="text-xs opacity-60">2m 14s</span></td>
                    <td className="py-4 px-6 text-on-surface-variant">English</td>
                    <td className="py-4 px-6 font-mono-label text-sm text-on-surface">$0.29</td>
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-error/20 text-error border border-error/20">Urgent</span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button className="text-primary font-medium hover:underline text-sm">View Transcript</button>
                    </td>
                  </tr>
                  
                  {/* Row 2 */}
                  <tr className="hover:bg-white/[0.03] transition-colors group cursor-pointer">
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-primary-container/20 text-primary border border-primary/20" title="Outbound">
                        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>call_made</span>
                      </span>
                    </td>
                    <td className="py-4 px-6 font-mono-label text-sm text-on-surface">+1 (555) 948-1122</td>
                    <td className="py-4 px-6 text-on-surface-variant">Today, 09:15 AM<br/><span className="text-xs opacity-60">5m 02s</span></td>
                    <td className="py-4 px-6 text-on-surface-variant">Spanish</td>
                    <td className="py-4 px-6 font-mono-label text-sm text-on-surface">$0.65</td>
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-secondary-container/20 text-secondary border border-secondary/20">Follow-up</span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button className="text-primary opacity-0 group-hover:opacity-100 transition-opacity font-medium hover:underline text-sm">View Transcript</button>
                    </td>
                  </tr>

                  {/* Row 3 */}
                  <tr className="hover:bg-white/[0.03] transition-colors group cursor-pointer">
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-tertiary/20 text-tertiary border border-tertiary/20" title="Inbound">
                        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>call_received</span>
                      </span>
                    </td>
                    <td className="py-4 px-6 font-mono-label text-sm text-on-surface">+1 (555) 234-5678</td>
                    <td className="py-4 px-6 text-on-surface-variant">Yesterday, 04:30 PM<br/><span className="text-xs opacity-60">1m 45s</span></td>
                    <td className="py-4 px-6 text-on-surface-variant">English</td>
                    <td className="py-4 px-6 font-mono-label text-sm text-on-surface">$0.22</td>
                    <td className="py-4 px-6">
                      <span className="text-on-surface-variant opacity-50">-</span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button className="text-primary opacity-0 group-hover:opacity-100 transition-opacity font-medium hover:underline text-sm">View Transcript</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Call Analysis Panel */}
          <div className="xl:col-span-4 glass-panel rounded-xl flex flex-col shadow-2xl relative overflow-hidden">
            <div className="p-6 border-b border-white/10 bg-white/[0.02] flex justify-between items-center z-10 relative">
              <div>
                <h4 className="font-headline-md text-xl font-semibold text-on-surface">Call Analysis</h4>
                <p className="font-label-md text-xs text-on-surface-variant mt-1 font-mono-label">+1 (555) 019-2834</p>
              </div>
              <button className="p-2 rounded-lg hover:bg-white/10 text-on-surface-variant transition-colors">
                <span className="material-symbols-outlined">more_vert</span>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 z-10 relative">
              {/* AI Summary */}
              <div className="bg-primary-container/5 border border-primary/10 rounded-lg p-4 relative overflow-hidden">
                <div className="absolute -right-4 -top-4 text-primary/10 pointer-events-none">
                  <span className="material-symbols-outlined" style={{ fontSize: '80px' }}>auto_awesome</span>
                </div>
                <h5 className="font-label-md text-xs text-primary uppercase tracking-wider mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>psychology</span>
                  AI Summary
                </h5>
                <p className="font-body-sm text-sm text-on-surface leading-relaxed">
                  Caller enquired about a 3 BHK property in downtown. Expressed interest in a viewing this Saturday. Marked as urgent due to high intent to lease.
                </p>
              </div>

              {/* System Latency */}
              <div>
                <h5 className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider mb-3">System Latency</h5>
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-container-high border border-white/5">
                    <span className="text-[10px] uppercase text-on-surface-variant font-bold">EOU</span>
                    <span className="font-mono-label text-[11px] text-tertiary">120ms</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-container-high border border-white/5">
                    <span className="text-[10px] uppercase text-on-surface-variant font-bold">STT</span>
                    <span className="font-mono-label text-[11px] text-tertiary">450ms</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-error/10 border border-error/20">
                    <span className="text-[10px] uppercase text-on-surface-variant font-bold">LLM</span>
                    <span className="font-mono-label text-[11px] text-error">1.2s</span>
                  </div>
                </div>
              </div>

              {/* Transcript */}
              <div className="flex flex-col gap-4">
                <h5 className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider">Transcript Excerpt</h5>
                
                <div className="flex flex-col gap-1 items-end">
                  <span className="font-mono-label text-[10px] text-on-surface-variant mr-1">Caller • 00:12</span>
                  <div className="bg-surface-container-high border border-white/10 text-on-surface px-4 py-2 rounded-2xl rounded-tr-sm max-w-[85%] font-body-sm text-[13px] leading-relaxed">
                    Hi, I was looking at the 3 bedroom apartment downtown. Is that still available to view this weekend?
                  </div>
                </div>

                <div className="flex flex-col gap-1 items-start">
                  <span className="font-mono-label text-[10px] text-primary ml-1">Maya • 00:18</span>
                  <div className="bg-secondary-container/10 border border-secondary-container/30 text-on-surface px-4 py-2 rounded-2xl rounded-tl-sm max-w-[85%] font-body-sm text-[13px] leading-relaxed relative overflow-hidden backdrop-blur-sm">
                    Hello! Yes, the 3-bedroom unit at 124 Main St is currently available. I can help you schedule a viewing for this Saturday.
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </Layout>
  );
}
