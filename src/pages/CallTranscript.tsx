import { Layout } from '../components/Layout';
import { useNavigate } from 'react-router-dom';

export function CallTranscript() {
  const navigate = useNavigate();

  return (
    <Layout title="Maya AI Voice Agent - Call Transcript" disablePadding={true}>
      <div className="w-full max-w-[1440px] mx-auto pb-16 px-6 lg:px-10">
        
        {/* Sticky Sub-Navigation Header */}
        <div className="sticky top-0 z-30 flex flex-col gap-3 pt-6 lg:pt-10 pb-3 -mx-6 lg:-mx-10 px-6 lg:px-10 bg-surface border-b border-surface-container-high mb-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => navigate('/calls')}
                className="inline-flex items-center gap-1 text-on-surface-variant hover:text-on-surface font-body-sm text-sm transition-colors group"
              >
                <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-0.5 transition-transform">arrow_back</span>
                <span className="font-medium">Call Logs & Analysis</span>
              </button>
              <span className="text-outline text-xs">/</span>
              <div className="flex items-center gap-2">
                <span className="font-mono-label text-[13px] text-primary bg-surface-container-high px-2 py-0.5 rounded">#TR-98241</span>
                <button className="text-outline hover:text-on-surface transition-colors p-1" title="Copy Call ID">
                  <span className="material-symbols-outlined text-[16px]">content_copy</span>
                </button>
              </div>
            </div>
            
            {/* Action Utilities */}
            <div className="flex items-center gap-2">
              <div className="relative inline-block text-left">
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-body-sm text-sm transition-colors">
                  <span className="material-symbols-outlined text-[18px] text-primary">download</span>
                  <span>Export</span>
                  <span className="material-symbols-outlined text-[16px] text-outline">expand_more</span>
                </button>
              </div>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-body-sm text-sm transition-colors">
                <span className="material-symbols-outlined text-[18px] text-secondary">share</span>
                <span>Share</span>
              </button>
            </div>
          </div>

          {/* Call Session Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-surface-container-high flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[26px]">record_voice_over</span>
                </div>
                <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-tertiary border-2 border-surface flex items-center justify-center" title="Live Synced"></span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <h1 className="font-headline-md text-2xl font-bold text-on-surface tracking-tight">Marcus Sterling</h1>
                  <span className="font-mono-label text-[13px] text-outline">+1 (415) 890-2341</span>
                </div>
                <div className="flex items-center gap-2 text-on-surface-variant font-body-sm text-sm mt-1">
                  <span>San Francisco, Bay Area</span>
                  <span className="text-outline">•</span>
                  <span className="text-on-surface">Maya V2 (Enterprise Real Estate)</span>
                  <span className="text-outline">•</span>
                  <span>Oct 24, 2023 at 10:48 AM EST</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2.5 flex-wrap">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface font-mono-label text-[13px]">
                <span className="material-symbols-outlined text-[16px] text-outline">schedule</span>
                <span>4m 38s</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface font-mono-label text-[13px]">
                <span className="material-symbols-outlined text-[16px] text-tertiary">payments</span>
                <span>$0.42</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-error-container/40 text-error font-mono-label text-[13px]">
                <span className="w-1.5 h-1.5 rounded-full bg-error animate-pulse"></span>
                <span>Urgent Attention</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary-container/30 text-primary-fixed font-mono-label text-[13px]">
                <span className="material-symbols-outlined text-[14px]">domain</span>
                <span>Project Requirement</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Analysis Grid */}
        <div className="w-full mx-auto flex flex-col lg:flex-row items-start gap-6 pb-12">
          
          {/* Synchronized Transcript (Left) */}
          <div className="flex-1 w-full min-w-0 flex flex-col gap-6">
            <div className="bg-surface-container-low rounded-2xl p-5 border border-white/5 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-container/20 text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[24px]">forum</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h2 className="font-headline-md text-xl font-bold text-on-surface">Synchronized Transcript</h2>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-tertiary/10 text-tertiary border border-tertiary/20 inline-flex items-center gap-1.5 whitespace-nowrap">
                        8 Turns <span className="text-white/30">•</span> <span className="inline-block w-1.5 h-1.5 rounded-full bg-tertiary"></span> Synced
                      </span>
                    </div>
                    <p className="font-body-sm text-on-surface-variant text-xs mt-0.5">Full call recording dialogue between Maya V2 and Marcus Sterling</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="flex items-center gap-2 bg-surface-container-high rounded-xl px-3 py-2 border border-white/5 hover:border-white/10 transition-colors focus-within:border-primary w-full sm:w-72">
                    <span className="material-symbols-outlined text-outline text-[18px]">search</span>
                    <input className="w-full bg-transparent font-body-sm text-sm text-on-surface placeholder:text-outline focus:outline-none" placeholder="Filter dialogue..." type="text" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-low rounded-2xl p-6 sm:p-8 shadow-xl border border-white/5 flex flex-col gap-6">
              <div className="flex flex-col gap-6">
                
                {/* Turn 1 */}
                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-2xl bg-primary-container/20 text-primary flex items-center justify-center shrink-0 shadow-sm">
                    <span className="material-symbols-outlined text-[22px]">smart_toy</span>
                  </div>
                  <div className="flex-1 flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-body-sm text-sm font-semibold text-primary">Maya V2 (Real Estate Specialist)</span>
                        <span className="px-2 py-0.5 rounded bg-surface-container-high font-mono-label text-[10px] text-tertiary font-medium border border-white/5">99.4% conf</span>
                      </div>
                      <span className="font-mono-label text-outline text-xs">00:02</span>
                    </div>
                    <div className="p-4 rounded-2xl rounded-tl-none bg-surface-container/70 text-on-surface font-body-sm text-sm leading-relaxed max-w-2xl shadow-sm border border-white/5">
                      Good morning! Thank you for calling Premier Asset Partners. My name is Maya, your AI specialist. How may I assist with your commercial portfolio search today?
                    </div>
                  </div>
                </div>

                {/* Turn 2 */}
                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-2xl bg-surface-container-highest text-on-surface-variant flex items-center justify-center shrink-0 font-mono-label font-bold text-sm border border-white/5">
                    MS
                  </div>
                  <div className="flex-1 flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-body-sm text-sm font-semibold text-on-surface">Marcus Sterling</span>
                        <span className="font-mono-label text-[11px] text-outline">Verified Inbound</span>
                      </div>
                      <span className="font-mono-label text-outline text-xs">00:14</span>
                    </div>
                    <div className="p-4 rounded-2xl rounded-tl-none bg-surface-container-low border border-white/10 text-on-surface font-body-sm text-sm leading-relaxed max-w-2xl">
                      Hi Maya. Yes, we are in urgent need of a new headquarters space in San Francisco. Ideally looking in the South of Market corridor. We need roughly 7,000 to 8,000 square feet, and our capital threshold is around 4.2 million for long lease or outright purchase.
                    </div>
                  </div>
                </div>

                {/* Turn 3 */}
                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-2xl bg-primary-container/20 text-primary flex items-center justify-center shrink-0 shadow-sm">
                    <span className="material-symbols-outlined text-[22px]">smart_toy</span>
                  </div>
                  <div className="flex-1 flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-body-sm text-sm font-semibold text-primary">Maya V2</span>
                        <span className="px-2 py-0.5 rounded bg-surface-container-high font-mono-label text-[10px] text-tertiary font-medium border border-white/5">98.8% conf</span>
                      </div>
                      <span className="font-mono-label text-outline text-xs">00:46</span>
                    </div>
                    <div className="p-4 rounded-2xl rounded-tl-none bg-surface-container/70 text-on-surface font-body-sm text-sm leading-relaxed max-w-2xl shadow-sm border border-white/5">
                      Understood, Marcus. I am filtering our prime listings right now. In SoMa, we have an exceptional space at <span className="text-primary font-medium underline">450 Mission Street, 8th Floor</span>. It measures 7,200 square feet with existing high-end tech fit-outs, boardrooms, and natural lighting. The annual rate equates to roughly $3.9M amortized over the lease term.
                    </div>
                  </div>
                </div>

                {/* Turn 4 */}
                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-2xl bg-surface-container-highest text-on-surface-variant flex items-center justify-center shrink-0 font-mono-label font-bold text-sm border border-white/5">
                    MS
                  </div>
                  <div className="flex-1 flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-body-sm text-sm font-semibold text-on-surface">Marcus Sterling</span>
                        <span className="px-2 py-0.5 rounded bg-error-container/20 text-error font-mono-label text-[10px] border border-error/20">Price Objection Flag</span>
                      </div>
                      <span className="font-mono-label text-outline text-xs">01:31</span>
                    </div>
                    <div className="p-4 rounded-2xl rounded-tl-none bg-surface-container-low border border-white/10 text-on-surface font-body-sm text-sm leading-relaxed max-w-2xl">
                      450 Mission is well known to us. That could work very nicely. However, does that $3.9M include operating costs and building maintenance, or are those billed separately as Triple Net?
                    </div>
                  </div>
                </div>

                {/* Turn 5 */}
                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-2xl bg-primary-container/20 text-primary flex items-center justify-center shrink-0 shadow-sm">
                    <span className="material-symbols-outlined text-[22px]">smart_toy</span>
                  </div>
                  <div className="flex-1 flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-body-sm text-sm font-semibold text-primary">Maya V2</span>
                        <span className="px-2 py-0.5 rounded bg-surface-container-high font-mono-label text-[10px] text-tertiary font-medium border border-white/5">99.1% conf</span>
                      </div>
                      <span className="font-mono-label text-outline text-xs">02:15</span>
                    </div>
                    <div className="p-4 rounded-2xl rounded-tl-none bg-surface-container/70 text-on-surface font-body-sm text-sm leading-relaxed max-w-2xl shadow-sm border border-white/5">
                      That is a modified gross figure. Common Area Maintenance and tier-1 seismic insurance are covered. Only internal HVAC after normal business hours is billed independently. I can send the detailed pro-forma breakdown right to your email.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Summary (Right) */}
          <aside className="w-full lg:w-96 flex flex-col shrink-0 gap-4 sticky top-24">
            <div className="bg-surface-container-low rounded-2xl border border-white/5 shadow-xl p-5 flex flex-col gap-5">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center text-on-primary-container shadow-[0_0_15px_rgba(37,99,235,0.3)]">
                    <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                  </div>
                  <div>
                    <h3 className="font-headline-md text-base font-bold text-on-surface flex items-center gap-1.5">AI Summary</h3>
                    <span className="font-mono-label text-[11px] text-outline block">GPT-4o Realtime Engine</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-tertiary-container/30 text-tertiary font-mono-label text-[10px] font-medium border border-tertiary/20">Synced</span>
              </div>
              
              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-on-primary font-body-sm font-semibold hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary/20">
                <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                <span>✨ Summarize Call</span>
              </button>
              
              <div className="flex flex-col gap-3.5 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <span className="font-mono-label text-[11px] uppercase tracking-wider text-outline font-semibold">Call Synthesis (3-4 Key Lines)</span>
                  <span className="text-[11px] font-mono-label text-tertiary bg-surface-container-high border border-white/5 px-2 py-0.5 rounded">1.2s</span>
                </div>
                
                <div className="space-y-2.5 transition-all duration-300">
                  <div className="p-3.5 rounded-xl bg-surface-container-high/60 border border-white/5">
                    <div className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0"></span>
                      <div className="flex-1">
                        <span className="font-semibold text-primary text-xs block mb-0.5">Key Objective</span>
                        <p className="text-xs text-on-surface leading-relaxed">
                          Marcus Sterling looking for commercial HQ space in San Francisco (SoMa corridor) with a <strong>$4.2M</strong> budget threshold.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3.5 rounded-xl bg-surface-container-high/60 border border-white/5">
                    <div className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-tertiary mt-1.5 shrink-0"></span>
                      <div className="flex-1">
                        <span className="font-semibold text-tertiary text-xs block mb-0.5">Proposed Solution</span>
                        <p className="text-xs text-on-surface leading-relaxed">
                          Maya recommended <strong>450 Mission Street</strong> (8th Floor, 7,200–8,000 sq ft) at an amortized rate of ~$3.9M/yr gross.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3.5 rounded-xl bg-surface-container-high/60 border border-white/5">
                    <div className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shrink-0"></span>
                      <div className="flex-1">
                        <span className="font-semibold text-secondary text-xs block mb-0.5">Action & Outcome</span>
                        <p className="text-xs text-on-surface leading-relaxed">
                          Confirmed in-person walkthrough for <strong>Thursday, Oct 26 at 2:00 PM PT</strong> with SVP Julian Vance; sent priority dossier via SMS/calendar invite.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-outline font-mono-label">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px] text-tertiary">verified</span> High Confidence (99.2%)
                  </span>
                  <button className="hover:text-on-surface transition-colors flex items-center gap-1" title="Copy summary text">
                    <span className="material-symbols-outlined text-[14px]">content_copy</span> Copy
                  </button>
                </div>
              </div>
            </div>
          </aside>
          
        </div>
      </div>
    </Layout>
  );
}
