import React, { useState, useEffect, useMemo } from 'react';
import { useCallsWithMessages } from '../hooks/useCalls';
import { Link } from 'react-router-dom';
import { Layout } from '../layouts/Layout';
import { supabase } from '../config/supabase';

export function Dashboard() {
  const { data: calls = [], isLoading: loading } = useCallsWithMessages();

  const getDerivedStatus = (call: any) => {
    const msgCount = call.messages?.length || 0;
    
    // Strict rule: <= 1 message is always Failed. 
    if (msgCount <= 1) {
      return 'Failed';
    }
    
    // If the database status says 'Failed' but there are >= 2 messages, 
    // we ignore it and calculate based on the logic below.
    if (call.status && call.status.toLowerCase() !== 'failed') {
      return call.status;
    }
    
    if (!call.ended_at) {
      const req = call.requirement?.trim().toLowerCase() || '';
      if (req && !req.includes('none') && req !== 'null') {
        return 'Converted';
      }
      return 'Interrupted';
    }
    
    return 'Completed';
  };

  // Calculate Metrics
  const [activeAgentsCount, setActiveAgentsCount] = useState(0);

  useEffect(() => {
    const fetchActiveAgents = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/agent_status?select=*`, {
          headers: {
            'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          },
          cache: 'no-store'
        });
        
        const data = await response.json();
        
        if (data && Array.isArray(data)) {
          // Consider agent active if status is 'active' or heartbeat is within last 30s
          const active = data.filter(a => {
            if (a.status === 'active') return true;
            if (a.last_heartbeat) {
              const hb = new Date(a.last_heartbeat).getTime();
              if (Date.now() - hb < 30000) return true;
            }
            return false;
          }).length;
          setActiveAgentsCount(active);
        }
      } catch (err) {
        console.error('Error fetching active agents:', err);
      }
    };
    fetchActiveAgents();
  }, []);

  const metrics = useMemo(() => {
    let connected = 0;
    let failed = 0;
    let converted = 0;
    let totalDuration = 0;

    let interrupted = 0;

    for (const c of calls) {
      const s = getDerivedStatus(c);
      if (s === 'Completed' || s === 'Converted' || s === 'Transferred') connected++;
      if (s === 'Failed' || s === 'Missed') failed++;
      if (s === 'Interrupted') interrupted++;
      if (s === 'Converted') converted++;
      totalDuration += (c.duration_seconds ?? c.estimated_duration ?? 0);
    }

    const total = calls.length;
    const avgDurationSec = total > 0 ? Math.floor(totalDuration / total) : 0;
    
    return {
      totalCalls: total,
      connectedCalls: connected,
      failedCalls: failed,
      interruptedCalls: interrupted,
      totalDuration,
      avgDurationFormatted: `${Math.floor(avgDurationSec / 60)}m ${avgDurationSec % 60}s`,
      convertedCalls: converted,
      conversionRate: total > 0 ? Math.round((converted / total) * 100) : 0
    };
  }, [calls]);

  const { totalCalls, connectedCalls, failedCalls, interruptedCalls, avgDurationFormatted, conversionRate } = metrics;

  // Chart Data Preparation (Last 14 Days)
  const chartData = [];
  const dateLabels = [];
  let maxCallsPerDay = 1;

  for (let i = 13; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    
    // Format label (e.g., "Sep 03")
    const label = d.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
    dateLabels.push(label);

    // Count calls for this day
    const count = calls.filter(c => c.started_at && c.started_at.startsWith(dateStr)).length;
    chartData.push(count);
    if (count > maxCallsPerDay) maxCallsPerDay = count;
  }

  // Generate SVG path for chart
  const graphWidth = 1000;
  const graphHeight = 175;
  const points = chartData.map((val, idx) => {
    const x = (idx / (chartData.length - 1)) * graphWidth;
    const y = graphHeight - (val / maxCallsPerDay) * graphHeight;
    return `${x},${y}`;
  }).join(' ');
  
  // Y-Axis Labels
  const yLabels = [
    maxCallsPerDay,
    Math.round(maxCallsPerDay * 0.75),
    Math.round(maxCallsPerDay * 0.5),
    Math.round(maxCallsPerDay * 0.25),
    0
  ];

  // Recent Logs
  const recentCalls = calls.slice(0, 5);

  const getStatusDotColor = (status: string | undefined) => {
    if (!status) return 'bg-tertiary';
    const s = status.toLowerCase();
    if (s.includes('fail') || s.includes('missed') || s.includes('drop')) return 'bg-error';
    if (s.includes('progress') || s.includes('transfer')) return 'bg-secondary';
    if (s.includes('complete') || s.includes('answer') || s.includes('convert')) return 'bg-tertiary';
    return 'bg-outline';
  };

  const getStatusColor = (status: string | undefined) => {
    if (!status) return 'text-tertiary';
    const s = status.toLowerCase();
    if (s.includes('fail') || s.includes('missed') || s.includes('drop')) return 'text-error';
    if (s.includes('progress') || s.includes('transfer')) return 'text-secondary';
    if (s.includes('complete') || s.includes('answer') || s.includes('convert')) return 'text-tertiary';
    return 'text-on-surface';
  };

  return (
    <Layout disablePadding={true} title="Dashboard - Zryth AI Voice">
      <div className="p-4 sm:p-8 space-y-6 max-w-[1440px] mx-auto w-full">
        {/* BEGIN: Page Header */}
        <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" data-purpose="page-header">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Dashboard</h1>
            <p className="text-sm text-neutral-400 mt-0.5">Welcome back — here's what's happening with your AI Voice Agents.</p>
          </div>
        </section>
        {/* END: Page Header */}
        
        {/* BEGIN: 8-Card Metrics Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" data-purpose="metrics-summary">
          
          {/* Metric 3: Total Calls */}
          <div className="bg-[#1c1b1c] border border-[rgba(255,255,255,0.08)] rounded-xl p-4 flex items-center gap-4 hover:border-neutral-700 transition">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
            </div>
            <div>
              <div className="text-xs text-neutral-400 font-medium">Total Calls</div>
              <div className="text-xl font-bold text-white mt-0.5">{loading ? '...' : totalCalls}</div>
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
              <div className="text-xl font-bold text-white mt-0.5">{loading ? '...' : connectedCalls}</div>
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
              <div className="text-xl font-bold text-white mt-0.5">{loading ? '...' : failedCalls}</div>
            </div>
          </div>

          {/* Metric 5.5: Interrupted Calls */}
          <div className="bg-[#1c1b1c] border border-[rgba(255,255,255,0.08)] rounded-xl p-4 flex items-center gap-4 hover:border-neutral-700 transition">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path>
              </svg>
            </div>
            <div>
              <div className="text-xs text-neutral-400 font-medium">Interrupted Calls</div>
              <div className="text-xl font-bold text-white mt-0.5">{loading ? '...' : interruptedCalls}</div>
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
              <div className="text-xl font-bold text-white mt-0.5">{loading ? '...' : avgDurationFormatted}</div>
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
              <div className="text-xl font-bold text-white mt-0.5">{loading ? '...' : `${conversionRate}%`}</div>
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
              <div className="text-xl font-bold text-white mt-0.5">{loading ? '...' : activeAgentsCount}</div>
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
              <div className="relative w-full h-44 flex flex-col justify-between">
                {yLabels.map((val, i) => (
                  <div key={i} className="flex items-center gap-3 w-full">
                    <span className="w-4 text-[10px] font-mono text-neutral-500 text-right">{val}</span>
                    <div className={`flex-1 ${i === 4 ? 'border-b border-neutral-800' : 'border-b border-dashed border-neutral-800'}`}></div>
                  </div>
                ))}
                
                <div className="absolute inset-0 left-7 right-0 pointer-events-none">
                  <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 176">
                    <defs>
                      <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.15"></stop>
                        <stop offset="100%" stopColor="#10b981" stopOpacity="0.0"></stop>
                      </linearGradient>
                    </defs>
                    {totalCalls > 0 && (
                      <>
                        <polygon fill="url(#chartGradient)" points={`0,175 ${points} 1000,175`}></polygon>
                        <polyline fill="none" stroke="#10b981" strokeWidth="2" strokeLinejoin="round" points={points}></polyline>
                      </>
                    )}
                    {totalCalls === 0 && (
                      <>
                        <polygon fill="url(#chartGradient)" points="0,175 1000,175 1000,176 0,176"></polygon>
                        <line stroke="#10b981" strokeWidth="2" x1="0" x2="1000" y1="175" y2="175"></line>
                      </>
                    )}
                  </svg>
                </div>
              </div>
              <div className="flex items-center justify-between pl-7 pr-1 text-[10px] font-mono text-neutral-500 select-none pt-2">
                {dateLabels.filter((_, i) => i % 2 === 0).map((lbl, i) => (
                  <span key={i} className={i % 2 !== 0 ? 'hidden sm:inline' : ''}>{lbl}</span>
                ))}
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
              <Link className="text-xs text-blue-400 hover:text-blue-300 font-medium" to="/calls">View all</Link>
            </div>
            
            {loading ? (
              <div className="py-14 flex items-center justify-center">
                <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full"></div>
              </div>
            ) : recentCalls.length > 0 ? (
              <div className="mt-3 flex flex-col gap-1 overflow-y-auto max-h-[220px] pr-1 custom-scrollbar">
                {recentCalls.map(call => (
                  <div key={call.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors group cursor-pointer border border-transparent hover:border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center border border-outline-variant/30 group-hover:border-primary/30 transition-colors">
                        <svg className="w-4 h-4 text-on-surface-variant" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">{call.phone || 'Unknown'}</div>
                        <div className="text-[11px] text-neutral-400 flex items-center gap-2 mt-0.5">
                          <span>{new Date(call.started_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                          <span className="w-1 h-1 rounded-full bg-neutral-600"></span>
                          <span>{Math.floor((call.duration_seconds ?? call.estimated_duration ?? 0) / 60)}m {(call.duration_seconds ?? call.estimated_duration ?? 0) % 60}s</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium border border-[rgba(255,255,255,0.05)] bg-surface-container-low`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${getStatusDotColor(getDerivedStatus(call))}`}></span>
                        <span className={getStatusColor(getDerivedStatus(call))}>{getDerivedStatus(call)}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-14 flex flex-col items-center justify-center text-center flex-1">
                <div className="w-12 h-12 rounded-full bg-neutral-800/80 border border-neutral-700/40 flex items-center justify-center text-neutral-500 mb-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                  </svg>
                </div>
                <p className="text-xs text-neutral-400 font-medium">No call logs yet</p>
                <p className="text-[11px] text-neutral-600 mt-1 max-w-sm">When your voice agents start executing calls, detailed audio recordings and transcripts will appear here.</p>
              </div>
            )}
          </div>
        </section>
        {/* END: Charts & Activity Row */}
      </div>
    </Layout>
  );
}

