import { Layout } from '../components/Layout';
import { useNavigate } from 'react-router-dom';

export function AllCalls() {
  const navigate = useNavigate();
  return (
    <Layout title="Maya AI Voice Agent - All Calls">
      <div className="max-w-[1440px] mx-auto flex flex-col w-full pb-16">
        {/* Top Metric & Title Area */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8">
          <div className="flex flex-col gap-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="font-mono-label text-[13px] uppercase tracking-widest text-tertiary font-medium">Telemetry & Audit Log</span>
              <span className="inline-block w-1 h-1 rounded-full bg-outline"></span>
              <span className="font-mono-label text-[13px] text-outline font-medium">Real-time Stream: Synced</span>
            </div>
            <h1 className="font-headline-lg text-3xl font-bold tracking-tight text-on-surface">Call Logs & Analysis</h1>
            <p className="font-body-md text-base text-on-surface-variant leading-relaxed">
              Complete history of incoming and outgoing AI voice agent conversations with synchronized acoustic transcripts, sentiment telemetry, and multi-tag lifecycle flags.
            </p>
          </div>

          {/* Quick Actions Header */}
          <div className="flex items-center gap-3 self-start lg:self-end">
            <button className="flex items-center justify-center w-10 h-10 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface transition-colors shadow-sm">
              <span className="material-symbols-outlined text-[20px] transition-transform duration-500">refresh</span>
            </button>
            <button className="flex items-center gap-2 px-4 h-10 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-xs transition-colors shadow-sm uppercase tracking-wider">
              <span className="material-symbols-outlined text-[18px] text-tertiary">tune</span>
              Columns
            </button>
            <button className="flex items-center gap-2 px-4 h-10 rounded-xl bg-primary-container text-on-primary-container font-label-md text-xs shadow-md hover:brightness-110 transition-all uppercase tracking-wider">
              <span className="material-symbols-outlined text-[18px]">download</span>
              Export CSV
            </button>
          </div>
        </div>

        {/* Key Metrics Ambient Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
          {/* Card 1 */}
          <div className="relative overflow-hidden bg-surface-container-low rounded-xl p-5 shadow-sm border border-white/5">
            <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-primary/5 blur-2xl pointer-events-none"></div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-label-md text-xs uppercase tracking-wider text-outline">Total Sessions</span>
              <span className="material-symbols-outlined text-outline text-[20px]">phone_in_talk</span>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="font-display-lg text-4xl font-bold text-on-surface leading-none">1,245</span>
              <span className="font-mono-label text-[13px] text-tertiary flex items-center">
                <span className="material-symbols-outlined text-[14px]">arrow_drop_up</span> +8.4%
              </span>
            </div>
            <span className="font-body-sm text-sm text-outline mt-2 block">Rolling 30-day cumulative</span>
          </div>

          {/* Card 2 */}
          <div className="relative overflow-hidden bg-surface-container-low rounded-xl p-5 shadow-sm border border-white/5">
            <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-tertiary/5 blur-2xl pointer-events-none"></div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-label-md text-xs uppercase tracking-wider text-outline">Current View Filter</span>
              <span className="material-symbols-outlined text-outline text-[20px]">filter_alt</span>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="font-display-lg text-4xl font-bold text-tertiary leading-none">128</span>
              <span className="font-body-sm text-sm text-outline">matching criteria</span>
            </div>
            <span className="font-body-sm text-sm text-outline mt-2 block">10.2% of global volume</span>
          </div>

          {/* Card 3 */}
          <div className="relative overflow-hidden bg-surface-container-low rounded-xl p-5 shadow-sm border border-white/5">
            <div className="flex items-center justify-between mb-2">
              <span className="font-label-md text-xs uppercase tracking-wider text-outline">Avg Call Duration</span>
              <span className="material-symbols-outlined text-outline text-[20px]">timer</span>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="font-display-lg text-4xl font-bold text-on-surface leading-none">3m 12s</span>
              <span className="font-mono-label text-[13px] text-outline">p95: 7m 40s</span>
            </div>
            <span className="font-body-sm text-sm text-outline mt-2 block">Mean agent talk-time: 58%</span>
          </div>

          {/* Card 4 */}
          <div className="relative overflow-hidden bg-surface-container-low rounded-xl p-5 shadow-sm border border-white/5">
            <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-error/10 blur-2xl pointer-events-none"></div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-label-md text-xs uppercase tracking-wider text-error">Urgent Attention</span>
              <span className="material-symbols-outlined text-error text-[20px]">priority_high</span>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="font-display-lg text-4xl font-bold text-error leading-none">14</span>
              <span className="font-mono-label px-2 py-0.5 rounded-full bg-error-container text-on-error-container text-[11px] font-semibold">Immediate Action</span>
            </div>
            <span className="font-body-sm text-sm text-outline mt-2 block">Escalated by sentiment polarity</span>
          </div>
        </div>

        {/* Advanced Interactive Filter Console */}
        <div className="bg-surface-container-low rounded-2xl p-5 shadow-lg flex flex-col gap-4 mb-6 border border-white/5">
          {/* Top Row: Search & Dropdown Controls */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Search */}
            <div className="md:col-span-5 relative flex items-center bg-surface-container-high rounded-xl px-3.5 py-2 border border-white/5 hover:border-white/10 transition-colors">
              <span className="material-symbols-outlined text-outline text-[20px] mr-2.5">search</span>
              <input className="w-full bg-transparent font-body-sm text-sm text-on-surface placeholder:text-outline focus:outline-none" placeholder="Search phone, agent, intent, or transcript snippets..." type="text" />
              <kbd className="hidden sm:inline-block font-mono-label text-[10px] px-1.5 py-0.5 rounded bg-surface-container-lowest text-outline border border-white/10">⌘K</kbd>
            </div>

            {/* Date Range Filter */}
            <div className="md:col-span-4 relative">
              <div className="flex items-center justify-between bg-surface-container-high rounded-xl px-3.5 py-2 cursor-pointer hover:bg-surface-container-highest transition-colors border border-white/5">
                <div className="flex items-center gap-2 overflow-hidden">
                  <span className="material-symbols-outlined text-outline text-[18px]">calendar_today</span>
                  <span className="font-body-sm text-sm text-on-surface truncate">Last 7 Days (Oct 18 - Oct 24)</span>
                </div>
                <span className="material-symbols-outlined text-outline text-[18px]">expand_more</span>
              </div>
            </div>

            {/* Time Slot Filter */}
            <div className="md:col-span-3 relative">
              <div className="flex items-center justify-between bg-surface-container-high rounded-xl px-3.5 py-2 cursor-pointer hover:bg-surface-container-highest transition-colors border border-white/5">
                <div className="flex items-center gap-2 overflow-hidden">
                  <span className="material-symbols-outlined text-outline text-[18px]">schedule</span>
                  <span className="font-body-sm text-sm text-on-surface truncate">All Call Times</span>
                </div>
                <span className="material-symbols-outlined text-outline text-[18px]">expand_more</span>
              </div>
            </div>
          </div>

          {/* Bottom Row: Filter Badges / Multi-select Pills */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-label-md text-xs text-outline mr-1 uppercase tracking-wider">Filter Tags:</span>
              
              <button className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-all font-label-md text-xs cursor-pointer group border border-white/5">
                <span className="w-2 h-2 rounded-full bg-error"></span>
                <span className="uppercase tracking-wider">Urgent Attention</span>
                <span className="font-mono-label text-[10px] px-1.5 rounded-full bg-surface-container-lowest text-outline group-hover:text-on-surface border border-white/5">14</span>
              </button>
              
              <button className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-all font-label-md text-xs cursor-pointer group border border-white/5">
                <span className="w-2 h-2 rounded-full bg-secondary"></span>
                <span className="uppercase tracking-wider">Follow-up Required</span>
                <span className="font-mono-label text-[10px] px-1.5 rounded-full bg-surface-container-lowest text-outline group-hover:text-on-surface border border-white/5">43</span>
              </button>
              
              <button className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-all font-label-md text-xs cursor-pointer group border border-white/5">
                <span className="w-2 h-2 rounded-full bg-tertiary"></span>
                <span className="uppercase tracking-wider">Project Requirement</span>
                <span className="font-mono-label text-[10px] px-1.5 rounded-full bg-surface-container-lowest text-outline group-hover:text-on-surface border border-white/5">62</span>
              </button>
              
              <button className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-all font-label-md text-xs cursor-pointer group border border-white/5">
                <span className="w-2 h-2 rounded-full bg-outline"></span>
                <span className="uppercase tracking-wider">Resolved / Clean</span>
                <span className="font-mono-label text-[10px] px-1.5 rounded-full bg-surface-container-lowest text-outline group-hover:text-on-surface border border-white/5">81</span>
              </button>
            </div>
            
            <button className="flex items-center gap-1 text-outline hover:text-primary transition-colors font-label-md text-xs py-1 uppercase tracking-wider">
              <span className="material-symbols-outlined text-[16px]">close</span>
              Clear All Filters
            </button>
          </div>
        </div>

        {/* Main Calls Log Table Container */}
        <div className="bg-surface-container-low rounded-2xl shadow-xl overflow-hidden border border-white/5">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-high/60 text-outline font-label-md text-xs uppercase tracking-wider select-none border-b border-white/5">
                  <th className="py-4 pl-6 pr-4 font-semibold">Caller Profile / Telephony</th>
                  <th className="py-4 px-4 font-semibold">Assigned AI Agent</th>
                  <th className="py-4 px-4 font-semibold">Timestamp & Length</th>
                  <th className="py-4 px-4 font-semibold">Language</th>
                  <th className="py-4 px-4 font-semibold">Inference Cost</th>
                  <th className="py-4 px-4 font-semibold">Tags & Lifecycle</th>
                  <th className="py-4 pl-4 pr-6 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="font-body-sm text-sm text-on-surface divide-y divide-white/5">
                {/* Row 1 */}
                <tr className="hover:bg-surface-container-high/40 transition-colors group cursor-pointer">
                  <td className="py-4 pl-6 pr-4 min-w-[220px]">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-surface-container-high flex items-center justify-center text-primary shrink-0 border border-white/5">
                        <span className="material-symbols-outlined text-[20px]">call_received</span>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-semibold text-on-surface tracking-tight group-hover:text-primary transition-colors truncate">+1 (415) 890-2341</span>
                        <span className="font-body-sm text-outline text-[12px] truncate">Marcus Sterling • SF, Bay Area</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 min-w-[180px]">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-[11px]">
                        MY
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold leading-none text-on-surface">Maya V2</span>
                        <span className="font-mono-label text-[11px] text-outline leading-tight mt-1">Enterprise Real Estate</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 min-w-[160px]">
                    <div className="flex flex-col">
                      <span className="text-on-surface">Oct 24, 2023 • 10:48 AM</span>
                      <span className="font-mono-label text-outline text-[12px] flex items-center gap-1 mt-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span> 4m 38s
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-mono-label text-on-surface-variant bg-surface-container-high px-2.5 py-1 rounded-md text-[11px] border border-white/5">English (US)</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-mono-label font-medium text-on-surface">$0.42</span>
                  </td>
                  <td className="py-4 px-4 min-w-[210px]">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-error-container text-on-error-container font-label-md text-[11px] font-medium border border-error-container">
                        <span className="w-1.5 h-1.5 rounded-full bg-error animate-pulse"></span> Urgent
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-container-highest text-tertiary font-label-md text-[11px] font-medium border border-white/5">
                        <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span> Project Req
                      </span>
                    </div>
                  </td>
                  <td className="py-4 pl-4 pr-6 text-right">
                    <button 
                      onClick={() => navigate('/calls/TR-98241')}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[12px] font-medium text-primary hover:text-on-surface bg-primary/5 hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-sm cursor-pointer border border-primary/10"
                    >
                      <span className="material-symbols-outlined text-[16px]">description</span> View Transcript
                    </button>
                  </td>
                </tr>

                {/* Row 2 */}
                <tr className="hover:bg-surface-container-high/40 transition-colors group cursor-pointer">
                  <td className="py-4 pl-6 pr-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-surface-container-high flex items-center justify-center text-outline shrink-0 border border-white/5">
                        <span className="material-symbols-outlined text-[20px]">call_made</span>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-semibold text-on-surface tracking-tight group-hover:text-primary transition-colors truncate">+1 (206) 555-0199</span>
                        <span className="font-body-sm text-outline text-[12px] truncate">Elena Rostova • Seattle, WA</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-[11px]">
                        JN
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold leading-none text-on-surface">John A.</span>
                        <span className="font-mono-label text-[11px] text-outline leading-tight mt-1">SaaS Outbound Sales</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-col">
                      <span className="text-on-surface">Oct 24, 2023 • 10:15 AM</span>
                      <span className="font-mono-label text-outline text-[12px] flex items-center gap-1 mt-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span> 2m 14s
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-mono-label text-on-surface-variant bg-surface-container-high px-2.5 py-1 rounded-md text-[11px] border border-white/5">English (US)</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-mono-label font-medium text-on-surface">$0.21</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary-container/40 text-secondary font-label-md text-[11px] font-medium border border-secondary-container/40">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Follow-up
                      </span>
                    </div>
                  </td>
                  <td className="py-4 pl-4 pr-6 text-right">
                    <button className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[12px] font-medium text-primary hover:text-on-surface bg-primary/5 hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-sm cursor-pointer border border-primary/10">
                      <span className="material-symbols-outlined text-[16px]">description</span> View Transcript
                    </button>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>

      </div>
    </Layout>
  );
}
