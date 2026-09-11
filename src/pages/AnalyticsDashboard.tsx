
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
          <div className="xl:col-span-12 glass-panel rounded-xl flex flex-col overflow-hidden shadow-xl">
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

        </div>

      </div>
    </Layout>
  );
}
