import { useState } from 'react';
import { Layout } from '../components/Layout';
import { Link } from 'react-router-dom';
import { MetricCard } from '../components/ui/MetricCard';
import { Drawer } from '../components/ui/Drawer';

export function AllCalls() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedCallId, setSelectedCallId] = useState<string | null>(null);
  const [isTableView, setIsTableView] = useState(true);

  // Filter states
  const [statusMenuOpen, setStatusMenuOpen] = useState(false);
  const [agentsMenuOpen, setAgentsMenuOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [selectedAgent, setSelectedAgent] = useState('All Agents');

  const openDrawer = (callId: string) => {
    setSelectedCallId(callId);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setTimeout(() => setSelectedCallId(null), 300);
  };

  const clearFilters = () => {
    setSelectedStatus('All Statuses');
    setSelectedAgent('All Agents');
    const searchInput = document.getElementById('searchInput') as HTMLInputElement;
    if (searchInput) searchInput.value = '';
    setIsTableView(true);
  };

  return (
    <Layout title="Call History - Zryth AI Voice" disablePadding>
      <div className="relative w-full px-8 min-h-screen bg-background pb-16 pt-6">
        <div className="flex flex-col w-full max-w-[1440px] mx-auto">
          {/* Page Header (Title, Subtitle & Action Bar) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 pb-5">
            <div>
              <h1 className="font-headline-lg text-2xl md:text-[28px] font-bold tracking-tight text-on-surface leading-tight">Call History</h1>
              <p className="font-body-sm text-body-sm text-outline mt-0.5">All outbound call attempts and results</p>
            </div>
            <div className="flex items-center gap-2.5 self-start sm:self-auto">
              <button className="w-9 h-9 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant flex items-center justify-center transition-colors border border-surface-container-highest" title="Alerts">
                <span className="material-symbols-outlined text-[19px]">notifications</span>
              </button>
              <button className="w-9 h-9 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant flex items-center justify-center transition-colors border border-surface-container-highest" title="Refresh">
                <span className="material-symbols-outlined text-[19px] transition-transform duration-500 hover:rotate-180">refresh</span>
              </button>
              <button className="flex items-center gap-2 px-3.5 h-9 rounded-lg border border-surface-container-highest bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs font-semibold tracking-wide transition-colors shadow-sm">
                <span className="material-symbols-outlined text-[17px] text-outline">download</span>
                <span className="">Download Records</span>
              </button>
            </div>
          </div>

          {/* Retention Alert Warning Box */}
          <div className="mb-6 rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-amber-200 text-xs sm:text-sm flex items-start sm:items-center gap-3 shadow-sm">
            <span className="material-symbols-outlined text-amber-400 text-[20px] shrink-0 mt-0.5 sm:mt-0">warning</span>
            <p className="leading-relaxed">
              Call history, transcripts, and recordings are retained for 90 days. Records older than 90 days are permanently erased from the database.
            </p>
          </div>

          {/* 5 Metric Stat Cards (Row across matching reference) */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 mb-6">
            <MetricCard variant="small" title="Total Calls" value={isTableView ? '4' : '0'} icon="call" color="primary" />
            <MetricCard variant="small" title="Customer Bill" value={isTableView ? '₹116.40' : '₹0.00'} icon={<span className="font-bold text-[15px] text-secondary leading-none">₹</span>} color="secondary" />
            <MetricCard variant="small" title="Total Duration" value={isTableView ? '14m 39s' : '—'} icon="timer" color="tertiary" />
            <MetricCard variant="small" title="Avg Cost / Call" value={isTableView ? '₹29.10' : '₹0.00'} icon="trending_up" color="amber" />
            <div className="col-span-2 md:col-span-1">
              <MetricCard variant="small" title="Avg Duration" value={isTableView ? '3m 40s' : '—'} icon="schedule" color="tertiary" />
            </div>
          </div>

          {/* Comprehensive Filter Bar (Matching Reference Layout) */}
          <div className="bg-surface-container-low border border-surface-container-high/80 rounded-2xl p-4 mb-6 shadow-sm">
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Search Input */}
              <div className="flex-1 min-w-[240px] relative flex items-center bg-surface-container-high/70 border border-surface-container-highest rounded-xl px-3 py-2 text-sm">
                <input id="searchInput" className="w-full bg-transparent font-body-sm text-body-sm text-on-surface placeholder-outline focus:outline-none border-none ring-0 p-0" placeholder="Search contact name or phone number..." type="text" />
              </div>
              
              {/* Dropdown 1: All Agents */}
              <div className="relative">
                <button className="flex items-center justify-between gap-3 bg-surface-container-high/70 hover:bg-surface-container-high border border-surface-container-highest rounded-xl px-3.5 py-2 text-sm text-on-surface transition-colors cursor-pointer" onClick={() => { setAgentsMenuOpen(!agentsMenuOpen); setStatusMenuOpen(false); }}>
                  <span className="">{selectedAgent}</span>
                  <span className="material-symbols-outlined text-outline text-[18px]">keyboard_arrow_down</span>
                </button>
                {agentsMenuOpen && (
                  <div className="absolute left-0 top-full mt-1.5 w-48 bg-surface-container-high border border-surface-container-highest rounded-xl shadow-2xl z-30 p-1.5 text-xs flex flex-col gap-0.5 backdrop-blur-xl">
                    {['All Agents', 'Maya V2', 'John A.', 'Sarah K.'].map((agent) => (
                      <button key={agent} className={`w-full text-left px-3 py-2 rounded-lg hover:bg-surface-container-highest flex items-center justify-between ${selectedAgent === agent ? 'text-primary font-medium' : 'text-on-surface'}`} onClick={() => { setSelectedAgent(agent); setAgentsMenuOpen(false); }}>
                        <span className="">{agent}</span>
                        {selectedAgent === agent && <span className="material-symbols-outlined text-[16px]">check</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Dropdown 3: All Statuses */}
              <div className="relative">
                <button className="flex items-center justify-between gap-3 bg-surface-container-high/70 hover:bg-surface-container-high border border-surface-container-highest rounded-xl px-3.5 py-2 text-sm text-on-surface transition-colors cursor-pointer" onClick={() => { setStatusMenuOpen(!statusMenuOpen); setAgentsMenuOpen(false); }}>
                  <span className="">{selectedStatus}</span>
                  <span className="material-symbols-outlined text-outline text-[18px]">keyboard_arrow_down</span>
                </button>
                {statusMenuOpen && (
                  <div className="absolute left-0 top-full mt-1.5 w-48 bg-surface-container-high border border-surface-container-highest rounded-xl shadow-2xl z-40 py-1.5 text-xs flex flex-col backdrop-blur-xl divide-y divide-surface-container-highest/40">
                    <div className="p-1">
                      {['All Statuses', 'Pending', 'In Progress', 'Answered', 'No Answer', 'Busy', 'Failed', 'Completed', 'Converted'].map((status) => (
                        <button key={status} className={`w-full text-left px-3 py-1.5 rounded-lg hover:bg-surface-container-highest flex items-center justify-between ${selectedStatus === status ? 'text-primary font-medium' : 'text-on-surface'}`} onClick={() => { setSelectedStatus(status); setStatusMenuOpen(false); }}>
                          <span>{status}</span>
                          {selectedStatus === status && <span className="material-symbols-outlined text-[16px]">check</span>}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Date Picker 1 */}
              <div className="flex items-center justify-between gap-2 bg-surface-container-high/70 border border-surface-container-highest rounded-xl px-3 py-2 text-sm text-outline cursor-pointer hover:border-outline transition-colors">
                <span className="text-xs">dd-mm-yyyy</span>
                <span className="material-symbols-outlined text-[17px] text-outline">calendar_today</span>
              </div>
              {/* Date Picker 2 */}
              <div className="flex items-center justify-between gap-2 bg-surface-container-high/70 border border-surface-container-highest rounded-xl px-3 py-2 text-sm text-outline cursor-pointer hover:border-outline transition-colors">
                <span className="text-xs">dd-mm-yyyy</span>
                <span className="material-symbols-outlined text-[17px] text-outline">calendar_today</span>
              </div>
              {/* Clear All Text Button */}
              <button className="text-xs text-outline hover:text-primary transition-colors ml-1 font-medium px-2 py-1 cursor-pointer" onClick={clearFilters}>
                Clear all
              </button>
            </div>
          </div>

          {/* Main Card Container: Empty State & Sample Table Toggle */}
          <div className="bg-surface-container-low border border-surface-container-high/80 rounded-2xl shadow-xl overflow-hidden min-h-[380px] flex flex-col">
            {/* Card Utility Toolbar (View Toggle) */}
            <div className="px-6 py-3.5 border-b border-surface-container-high/60 flex items-center justify-between bg-surface-container-high/30">
              <div className="flex items-center gap-2">
                <span className="font-label-md text-xs uppercase tracking-wider text-outline font-semibold">Records Feed</span>
                <span className="inline-block w-1 h-1 rounded-full bg-outline"></span>
                <span className="font-mono-label text-[11px] text-tertiary">{isTableView ? '4 Active Records' : 'Ready'}</span>
              </div>
              {/* Toggle between Empty State and Live Logs Preview */}
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-surface-container-high hover:bg-surface-container-highest text-on-surface border border-surface-container-highest transition-colors cursor-pointer" onClick={() => setIsTableView(!isTableView)}>
                  <span className="material-symbols-outlined text-[15px] text-primary">{isTableView ? 'phone_disabled' : 'table_view'}</span>
                  <span className="">{isTableView ? 'Show Empty State (Default)' : 'Preview Sample Records (4)'}</span>
                </button>
              </div>
            </div>
            
            {/* View 1: Empty State */}
            {!isTableView && (
              <div className="flex flex-col items-center justify-center py-24 px-4 text-center my-auto flex-1">
                <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center text-outline/40 mb-3.5 ring-8 ring-surface-container-high/20">
                  <span className="material-symbols-outlined text-[32px]">phone_disabled</span>
                </div>
                <p className="text-base text-outline font-medium tracking-wide">No call logs found</p>
                <p className="text-xs text-outline/70 mt-1 max-w-sm">No outbound or inbound calls match your selected date range and filter criteria.</p>
              </div>
            )}
            
            {/* View 2: Full Call Records Table */}
            {isTableView && (
              <div className="overflow-x-auto w-full flex-1">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-high/60 text-outline font-label-md text-xs uppercase tracking-wider select-none border-b border-surface-container-high">
                      <th className="py-3.5 pl-6 pr-4 font-semibold">Contact / Phone Number</th>
                      <th className="py-3.5 px-4 font-semibold">Assigned Agent</th>
                      <th className="py-3.5 px-4 font-semibold">Status</th>
                      <th className="py-3.5 px-4 font-semibold">Duration</th>
                      <th className="py-3.5 px-4 font-semibold">Cost</th>
                      <th className="py-3.5 px-4 font-semibold">Date &amp; Time</th>
                      <th className="py-3.5 pl-4 pr-6 font-semibold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="font-body-sm text-xs text-on-surface divide-y divide-surface-container-high/40">
                    {/* Row 1 */}
                    <tr className="hover:bg-surface-container-high/40 transition-colors group cursor-pointer" onClick={() => openDrawer('CALL-9821')}>
                      <td className="py-3.5 pl-6 pr-4 min-w-[200px]">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-primary shrink-0">
                            <span className="material-symbols-outlined text-[17px]">call_received</span>
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="font-semibold text-on-surface group-hover:text-primary transition-colors truncate">+1 (415) 890-2341</span>
                            <span className="text-outline text-[11px] truncate">Marcus Sterling</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-md bg-secondary-container/40 text-secondary font-medium text-[11px]">Maya V2</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-tertiary-container/30 text-tertiary font-medium text-[11px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span> Answered
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono-label text-outline">4m 38s</td>
                      <td className="py-3.5 px-4 font-mono-label font-medium text-on-surface">₹34.50</td>
                      <td className="py-3.5 px-4 text-outline font-mono-label text-[11px]">Oct 24, 10:48 AM</td>
                      <td className="py-3.5 pl-4 pr-6 text-right">
                        <button className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-semibold text-primary bg-primary/10 hover:bg-primary hover:text-on-primary transition-colors" onClick={(e) => { e.stopPropagation(); openDrawer('CALL-9821'); }}>
                          <span className="material-symbols-outlined text-[15px]">description</span>
                          <span className="">View Transcript</span>
                        </button>
                      </td>
                    </tr>
                    
                    {/* Row 2 */}
                    <tr className="hover:bg-surface-container-high/40 transition-colors group cursor-pointer" onClick={() => openDrawer('CALL-9820')}>
                      <td className="py-3.5 pl-6 pr-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-outline shrink-0">
                            <span className="material-symbols-outlined text-[17px]">call_made</span>
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="font-semibold text-on-surface group-hover:text-primary transition-colors truncate">+1 (206) 555-0199</span>
                            <span className="text-outline text-[11px] truncate">Elena Rostova</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-md bg-primary-container/40 text-primary font-medium text-[11px]">John A.</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary-container/40 text-secondary font-medium text-[11px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Converted
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono-label text-outline">2m 14s</td>
                      <td className="py-3.5 px-4 font-mono-label font-medium text-on-surface">₹17.20</td>
                      <td className="py-3.5 px-4 text-outline font-mono-label text-[11px]">Oct 24, 10:15 AM</td>
                      <td className="py-3.5 pl-4 pr-6 text-right">
                        <button className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-semibold text-primary bg-primary/10 hover:bg-primary hover:text-on-primary transition-colors" onClick={(e) => { e.stopPropagation(); openDrawer('CALL-9820'); }}>
                          <span className="material-symbols-outlined text-[15px]">description</span>
                          <span className="">View Transcript</span>
                        </button>
                      </td>
                    </tr>
                    
                    {/* Row 3 */}
                    <tr className="hover:bg-surface-container-high/40 transition-colors group cursor-pointer" onClick={() => openDrawer('CALL-9818')}>
                      <td className="py-3.5 pl-6 pr-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-error shrink-0">
                            <span className="material-symbols-outlined text-[17px]">phone_missed</span>
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="font-semibold text-on-surface group-hover:text-primary transition-colors truncate">+1 (312) 441-9012</span>
                            <span className="text-outline text-[11px] truncate">David Chen</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-md bg-secondary-container/40 text-secondary font-medium text-[11px]">Maya V2</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-error-container/50 text-error font-medium text-[11px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-error"></span> Failed / Drop
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono-label text-outline">1m 02s</td>
                      <td className="py-3.5 px-4 font-mono-label font-medium text-on-surface">₹9.00</td>
                      <td className="py-3.5 px-4 text-outline font-mono-label text-[11px]">Oct 24, 09:20 AM</td>
                      <td className="py-3.5 pl-4 pr-6 text-right">
                        <button className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-semibold text-primary bg-primary/10 hover:bg-primary hover:text-on-primary transition-colors" onClick={(e) => { e.stopPropagation(); openDrawer('CALL-9818'); }}>
                          <span className="material-symbols-outlined text-[15px]">description</span>
                          <span className="">View Transcript</span>
                        </button>
                      </td>
                    </tr>
                    
                    {/* Row 4 */}
                    <tr className="hover:bg-surface-container-high/40 transition-colors group cursor-pointer" onClick={() => openDrawer('CALL-9819')}>
                      <td className="py-3.5 pl-6 pr-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-primary shrink-0">
                            <span className="material-symbols-outlined text-[17px]">call_received</span>
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="font-semibold text-on-surface group-hover:text-primary transition-colors truncate">+34 91 901 8842</span>
                            <span className="text-outline text-[11px] truncate">Carlos Alvarez</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-md bg-tertiary-container/40 text-tertiary font-medium text-[11px]">Sarah K.</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-tertiary-container/30 text-tertiary font-medium text-[11px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span> Completed
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono-label text-outline">6m 45s</td>
                      <td className="py-3.5 px-4 font-mono-label font-medium text-on-surface">₹55.70</td>
                      <td className="py-3.5 px-4 text-outline font-mono-label text-[11px]">Oct 24, 09:55 AM</td>
                      <td className="py-3.5 pl-4 pr-6 text-right">
                        <button className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-semibold text-primary bg-primary/10 hover:bg-primary hover:text-on-primary transition-colors" onClick={(e) => { e.stopPropagation(); openDrawer('CALL-9819'); }}>
                          <span className="material-symbols-outlined text-[15px]">description</span>
                          <span className="">View Transcript</span>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                {/* Table Footer Pagination */}
                <div className="px-6 py-3.5 bg-surface-container-high/20 border-t border-surface-container-high/60 flex items-center justify-between text-xs text-outline">
                  <span className="">Showing 1 to 4 of 4 active entries</span>
                  <div className="flex items-center gap-1">
                    <button className="px-2.5 py-1 rounded bg-surface-container-high text-outline hover:text-on-surface">Prev</button>
                    <button className="px-2.5 py-1 rounded bg-primary text-on-primary font-semibold">1</button>
                    <button className="px-2.5 py-1 rounded bg-surface-container-high text-outline hover:text-on-surface">Next</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <Drawer isOpen={drawerOpen} onClose={closeDrawer}>
          {/* Drawer Header */}
          <div className="p-6 bg-surface-container-low flex items-center justify-between border-b border-surface-container-high">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">record_voice_over</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-headline-md text-base font-semibold text-on-surface">Session {selectedCallId}</h3>
                  <span className="font-mono-label text-[10px] uppercase px-2 py-0.5 rounded bg-tertiary-container/40 text-tertiary font-semibold">Answered</span>
                </div>
                <span className="font-body-sm text-xs text-outline">+1 (415) 890-2341 • Marcus Sterling</span>
              </div>
            </div>
            <button className="w-9 h-9 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-outline hover:text-on-surface flex items-center justify-center transition-colors" onClick={closeDrawer}>
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Drawer Telemetry Ribbon */}
          <div className="grid grid-cols-3 gap-2 p-4 bg-surface-container-high/40">
            <div className="p-2.5 rounded-xl bg-surface-container-low border border-surface-container-high/60">
              <span className="font-label-md text-outline uppercase block text-[10px]">Sentiment</span>
              <span className="font-mono-label text-xs font-semibold text-tertiary flex items-center gap-1 mt-0.5">
                <span className="material-symbols-outlined text-[14px]">sentiment_satisfied</span> Positive
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-surface-container-low border border-surface-container-high/60">
              <span className="font-label-md text-outline uppercase block text-[10px]">Latency (p90)</span>
              <span className="font-mono-label text-xs font-semibold text-primary mt-0.5 block">395 ms</span>
            </div>
            <div className="p-2.5 rounded-xl bg-surface-container-low border border-surface-container-high/60">
              <span className="font-label-md text-outline uppercase block text-[10px]">Total Cost</span>
              <span className="font-mono-label text-xs font-semibold text-on-surface mt-0.5 block">₹34.50</span>
            </div>
          </div>

          {/* Drawer Conversation Transcript Stream */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <span className="font-mono-label text-[11px] text-outline uppercase tracking-wider block text-center">Transcript Started 10:48:12 AM</span>
            
            <div className="flex flex-col items-start max-w-[85%]">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-label-md text-xs text-primary font-semibold">Maya V2 (AI Agent)</span>
                <span className="font-mono-label text-[10px] text-outline">00:02</span>
              </div>
              <div className="p-3.5 rounded-2xl rounded-tl-none bg-surface-container-high text-on-surface font-body-sm text-xs shadow-sm leading-relaxed">
                Hello Marcus! Thanks for reaching out to Zryth Realty Partners. I see you were reviewing the Presidio Commercial portfolio. How can I assist you today?
              </div>
            </div>

            <div className="flex flex-col items-end self-end max-w-[85%] ml-auto">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono-label text-[10px] text-outline">00:15</span>
                <span className="font-label-md text-xs text-on-surface font-semibold">Marcus Sterling</span>
              </div>
              <div className="p-3.5 rounded-2xl rounded-tr-none bg-surface-container-low border border-surface-container-high/80 text-on-surface font-body-sm text-xs shadow-sm leading-relaxed">
                Hi Maya, we have an immediate requirement for an 85,000 sq ft biotech lab conversion. Can you verify HVAC zoning before this Thursday?
              </div>
            </div>

            <div className="flex flex-col items-start max-w-[85%]">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-label-md text-xs text-primary font-semibold">Maya V2 (AI Agent)</span>
                <span className="font-mono-label text-[10px] text-outline">00:32</span>
              </div>
              <div className="p-3.5 rounded-2xl rounded-tl-none bg-surface-container-high text-on-surface font-body-sm text-xs shadow-sm leading-relaxed">
                Yes, I have pulled the architectural MEP schematics and flagged your inquiry to Senior Asset Director Sarah. I've sent the specifications to your email.
              </div>
            </div>
          </div>

          {/* Drawer Footer Actions */}
          <div className="p-4 bg-surface-container-low flex items-center justify-between gap-3 border-t border-surface-container-high">
            <Link to={`/calls/${selectedCallId || 'CALL-9821'}`} className="flex-1 py-2 px-4 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-semibold text-xs transition-colors flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[17px]">open_in_new</span>
              <span className="">Full Page View</span>
            </Link>
            <button className="flex-1 py-2 px-4 rounded-xl bg-primary-container text-on-primary-container font-semibold text-xs transition-transform active:scale-95 flex items-center justify-center gap-2 shadow">
              <span className="material-symbols-outlined text-[17px]">download</span>
              <span className="">Download Audio (.wav)</span>
            </button>
          </div>
        </Drawer>

      </div>
    </Layout>
  );
}
