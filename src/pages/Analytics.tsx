import React, { useState, useEffect, useMemo } from 'react';
import { useCallsWithMessages } from '../hooks/useCalls';
import { Layout } from '../components/Layout';
import { supabase } from '../config/supabase';
import * as XLSX from 'xlsx';

export function Analytics() {
  const { data: calls = [], isLoading: loading } = useCallsWithMessages();

  const getDerivedStatus = (call: any) => {
    if (call.status) return call.status;
    
    const msgCount = call.messages?.length || 0;
    if (msgCount <= 1) {
      return 'Failed';
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

  // Top Metrics
  const totalCalls = calls.length;
  
  // Cost Calculation (assuming ₹3.2 per minute)
  const COST_PER_MIN = 3.2;
  let totalDurationSec = 0;
  calls.forEach(c => {
    totalDurationSec += (c.duration_seconds ?? c.estimated_duration ?? 0);
  });
  
  const avgDurationSec = totalCalls > 0 ? Math.floor(totalDurationSec / totalCalls) : 0;
  const avgDurationFormatted = `${Math.floor(avgDurationSec / 60)}m ${avgDurationSec % 60}s`;

  const totalCost = (totalDurationSec / 60) * COST_PER_MIN;
  const avgCostPerCall = totalCalls > 0 ? (totalCost / totalCalls).toFixed(2) : '0.00';

  const transferredCalls = calls.filter(c => getDerivedStatus(c) === 'Transferred').length;
  const transferRate = totalCalls > 0 ? Math.round((transferredCalls / totalCalls) * 100) : 0;


  // 1. Calls Per Day Chart (Last 14 Days)
  const chartData = [];
  const dateLabels = [];
  let maxCallsPerDay = 1;

  for (let i = 13; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const label = d.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
    dateLabels.push(label);

    const count = calls.filter(c => c.started_at && c.started_at.startsWith(dateStr)).length;
    chartData.push(count);
    if (count > maxCallsPerDay) maxCallsPerDay = count;
  }

  const graphWidth = 1000;
  const graphHeight = 200; // Map Y values between 30 and 230 in viewBox (230 - 30 = 200)
  
  const points = chartData.map((val, idx) => {
    const x = Math.floor((idx / (chartData.length - 1)) * graphWidth);
    const y = 230 - Math.floor((val / maxCallsPerDay) * graphHeight);
    return `${x},${y}`;
  });
  
  const linePath = `M ${points.join(' L ')}`;
  const areaPath = `M 0,230 L ${points.join(' L ')} L 1000,230 Z`;

  const yLabels = [
    maxCallsPerDay,
    Math.round(maxCallsPerDay * 0.75),
    Math.round(maxCallsPerDay * 0.5),
    Math.round(maxCallsPerDay * 0.25),
    0
  ];


  // 2. Call Status Breakdown (Donut Chart)
  const completed = calls.filter(c => getDerivedStatus(c) === 'Completed').length;
  const transferred = calls.filter(c => getDerivedStatus(c) === 'Transferred').length;
  const missedFailed = calls.filter(c => {
    const s = getDerivedStatus(c);
    return s === 'Failed' || s === 'Missed' || s === 'Interrupted';
  }).length;
  const converted = calls.filter(c => getDerivedStatus(c) === 'Converted').length;

  // We only count calls that have one of these 4 mapped statuses
  const statusTotal = completed + transferred + missedFailed + converted || 1;
  const pctCompleted = completed / statusTotal;
  const pctTransferred = transferred / statusTotal;
  const pctMissed = missedFailed / statusTotal;
  const pctConverted = converted / statusTotal;

  const C = 238.76; // Circumference of r=38 circle

  // Overlay trick: we draw them from largest (100%) to smallest (pctConverted)
  // Blue (Completed) is bottom layer, Teal (Transferred) is next, Purple (Missed) is next, Pink (Converted) is top
  
  // Layer 1 (Blue): Total Size = 100% visible
  const offsetBlue = C - (1 * C); 
  
  // Layer 2 (Teal): Total Size = 100% - Completed
  const sizeTeal = 1 - pctCompleted;
  const offsetTeal = C - (sizeTeal * C);
  
  // Layer 3 (Purple): Total Size = previous - Transferred
  const sizePurple = sizeTeal - pctTransferred;
  const offsetPurple = C - (sizePurple * C);
  
  // Layer 4 (Pink): Total Size = previous - Missed (which equals Converted)
  const sizePink = pctConverted;
  const offsetPink = C - (sizePink * C);

  const mainContainmentRate = statusTotal >= 1 ? Math.round(((completed + converted) / statusTotal) * 100) : 0;


  // 3. Call Duration Distribution (Histogram)
  const buckets = [0, 0, 0, 0, 0];
  let longestDuration = 0;

  calls.forEach(c => {
    const sec = c.duration_seconds ?? c.estimated_duration ?? 0;
    if (sec > longestDuration) longestDuration = sec;
    
    if (sec < 60) buckets[0]++;
    else if (sec < 120) buckets[1]++;
    else if (sec < 300) buckets[2]++;
    else if (sec < 600) buckets[3]++;
    else buckets[4]++;
  });

  const maxBucket = Math.max(...buckets, 1);
  const getH = (val: number) => `${Math.max((val / maxBucket) * 100, 2)}%`;

  const bucketLabels = ["<1 min", "1-2 min", "2-5 min", "5-10 min", ">10 min"];
  let mostCommonIdx = 0;
  for (let i = 0; i < buckets.length; i++) {
    if (buckets[i] > buckets[mostCommonIdx]) mostCommonIdx = i;
  }
  
  const longestStr = `${Math.floor(longestDuration / 60)}m ${longestDuration % 60}s`;

  const handleDownloadReport = () => {
    if (calls.length === 0) {
      alert("No data available to download.");
      return;
    }

    const reportData = [
      { Metric: "Total AI Calls", Value: totalCalls },
      { Metric: "Average Call Duration", Value: avgDurationFormatted },
      { Metric: "Average Cost / Call", Value: `₹${avgCostPerCall}` },
      { Metric: "Transfer Rate", Value: `${transferRate}%` },
      { Metric: "Completed Calls", Value: completed },
      { Metric: "Transferred Calls", Value: transferred },
      { Metric: "Missed/Failed Calls", Value: missedFailed },
      { Metric: "Converted Calls", Value: converted },
      { Metric: "Containment Rate", Value: `${mainContainmentRate}%` },
      { Metric: "Longest Session", Value: longestStr },
      { Metric: "Most Common Duration Bucket", Value: bucketLabels[mostCommonIdx] },
    ];

    const worksheet = XLSX.utils.json_to_sheet(reportData);
    
    // Auto adjust column width
    worksheet['!cols'] = [{ wch: 35 }, { wch: 15 }];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Analytics Report");

    const dateStr = new Date().toISOString().split('T')[0];
    XLSX.writeFile(workbook, `Analytics_Report_${dateStr}.xlsx`);
  };

  return (
    <Layout disablePadding={true} title="Analytics - Zryth AI Voice">
      <div className="p-4 sm:p-8 space-y-6 max-w-[1440px] mx-auto w-full">
        {/* Header Title Section */}
        <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" data-purpose="page-header">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Analytics</h1>
            <p className="text-sm text-neutral-400 mt-0.5">Insights across all your campaigns and agents.</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-high border border-white/10 text-xs font-medium text-on-surface-variant">
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>calendar_today</span>
              <span>Last 14 Days</span>
            </div>
            <button onClick={handleDownloadReport} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-high border border-white/10 text-xs font-medium text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer" title="Download Report">
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>download</span>
              <span>Download Report</span>
            </button>
          </div>
        </section>
        
        {/* Top 4 Metrics Row */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" data-purpose="metrics-summary">
          <div className="bg-[#1c1b1c] border border-[rgba(255,255,255,0.08)] rounded-xl p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
            </div>
            <div>
              <div className="text-xs text-neutral-400 font-medium">Total AI Calls</div>
              <div className="text-xl font-bold text-white mt-0.5">{loading ? '...' : totalCalls}</div>
            </div>
          </div>
          
          <div className="bg-[#1c1b1c] border border-[rgba(255,255,255,0.08)] rounded-xl p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
            </div>
            <div>
              <div className="text-xs text-neutral-400 font-medium">Avg Call Duration</div>
              <div className="text-xl font-bold text-white mt-0.5">{loading ? '...' : avgDurationFormatted}</div>
            </div>
          </div>
          
          <div className="bg-[#1c1b1c] border border-[rgba(255,255,255,0.08)] rounded-xl p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <div>
              <div className="text-xs text-neutral-400 font-medium">Avg Cost / Call</div>
              <div className="text-xl font-bold text-white mt-0.5">{loading ? '...' : `₹${avgCostPerCall}`}</div>
            </div>
          </div>
          
          <div className="bg-[#1c1b1c] border border-[rgba(255,255,255,0.08)] rounded-xl p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>
            </div>
            <div>
              <div className="text-xs text-neutral-400 font-medium">Transfer Rate</div>
              <div className="text-xl font-bold text-white mt-0.5">{loading ? '...' : `${transferRate}%`}</div>
            </div>
          </div>
        </section>

        {/* Top Large Card: Calls Per Day */}
        <div className="bg-[#1c1b1c] border border-[rgba(255,255,255,0.08)] rounded-xl p-6">
          <div className="relative z-10 flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-on-surface tracking-tight">Calls Per Day</h3>
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
            
            {/* SVG Line Chart */}
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
              
              {totalCalls > 0 ? (
                <>
                  <path d={areaPath} fill="url(#primaryAreaGrad)"></path>
                  <path d={linePath} fill="none" stroke="url(#lineGrad)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path>
                  {/* Render dots for each point */}
                  {points.map((pt, i) => {
                    const [x, y] = pt.split(',');
                    return (
                      <circle key={i} className="cursor-pointer hover:r-[6px] transition-all" cx={x} cy={y} fill="#131316" r="4" stroke={i > 7 ? "#2563eb" : "#4fdbc8"} strokeWidth="2"></circle>
                    );
                  })}
                </>
              ) : (
                <path d="M 0,230 L 1000,230" fill="none" stroke="url(#lineGrad)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path>
              )}
            </svg>
            
            {/* Y-Axis Labels */}
            <div className="absolute left-0 top-3 bottom-8 flex flex-col justify-between text-[11px] font-mono-label text-outline text-right pr-2 w-6">
              {yLabels.map((l, i) => <span key={i}>{l}</span>)}
            </div>
            
            {/* X-Axis Labels */}
            <div className="absolute bottom-0 left-8 right-2 flex justify-between text-[10.5px] font-mono-label text-outline/80 overflow-hidden select-none">
              {dateLabels.map((lbl, i) => (
                <span key={i} className={i % 2 !== 0 ? 'hidden md:inline' : ''}>{lbl}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row: 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bottom Left Card: Call Status Breakdown */}
          <div className="bg-[#1c1b1c] border border-[rgba(255,255,255,0.08)] rounded-xl p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-5 z-10">
              <h3 className="text-base font-semibold text-on-surface tracking-tight">Call Status Breakdown</h3>
              <span className="text-xs text-on-surface-variant font-mono-label">Total: {totalCalls} Calls</span>
            </div>
            {/* Visualization Area */}
            <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-6 py-2 z-10">
              {/* Donut Graphic */}
              <div className="sm:col-span-5 flex justify-center items-center relative">
                <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" fill="transparent" r="38" stroke="#2563eb" strokeDasharray="238.76" strokeDashoffset={offsetBlue} strokeLinecap="round" strokeWidth="12"></circle>
                  <circle cx="50" cy="50" fill="transparent" r="38" stroke="#0d9488" strokeDasharray="238.76" strokeDashoffset={offsetTeal} strokeLinecap="round" strokeWidth="12"></circle>
                  <circle cx="50" cy="50" fill="transparent" r="38" stroke="#7c3aed" strokeDasharray="238.76" strokeDashoffset={offsetPurple} strokeLinecap="round" strokeWidth="12"></circle>
                  <circle cx="50" cy="50" fill="transparent" r="38" stroke="#db2777" strokeDasharray="238.76" strokeDashoffset={offsetPink} strokeLinecap="round" strokeWidth="12"></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-2xl font-bold text-on-surface font-mono-label">{mainContainmentRate}%</span>
                  <span className="text-[10px] uppercase font-semibold text-on-surface-variant tracking-wider">COMPLETED</span>
                </div>
              </div>
              
              {/* Legend List */}
              <div className="sm:col-span-7 space-y-3 font-body-sm text-xs">
                <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0"></span>
                    <span className="text-on-surface font-medium">Completed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-on-surface font-mono-label font-semibold">{completed}</span>
                    <span className="text-on-surface-variant text-[11px] font-mono-label">{(pctCompleted * 100).toFixed(1)}%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-teal-600 shrink-0"></span>
                    <span className="text-on-surface font-medium">Transferred</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-on-surface font-mono-label font-semibold">{transferred}</span>
                    <span className="text-on-surface-variant text-[11px] font-mono-label">{(pctTransferred * 100).toFixed(1)}%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-600 shrink-0"></span>
                    <span className="text-on-surface font-medium">Missed/Failed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-on-surface font-mono-label font-semibold">{missedFailed}</span>
                    <span className="text-on-surface-variant text-[11px] font-mono-label">{(pctMissed * 100).toFixed(1)}%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-pink-600 shrink-0"></span>
                    <span className="text-on-surface font-medium">Converted</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-on-surface font-mono-label font-semibold">{converted}</span>
                    <span className="text-on-surface-variant text-[11px] font-mono-label">{(pctConverted * 100).toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pt-3 mt-2 border-t border-white/5 flex items-center justify-between text-xs text-on-surface-variant z-10">
              <span>Goal: {'>'}65% Completed</span>
              <span className="text-tertiary flex items-center gap-1 font-mono-label">
                <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>check_circle</span> Optimized
              </span>
            </div>
          </div>

          {/* Bottom Right Card: Call Duration Distribution */}
          <div className="bg-[#1c1b1c] border border-[rgba(255,255,255,0.08)] rounded-xl p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4 z-10">
              <h3 className="text-base font-semibold text-on-surface tracking-tight">Call Duration Distribution</h3>
              <span className="text-xs text-on-surface-variant font-mono-label">Avg: {avgDurationFormatted}</span>
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
                <span>{maxBucket}</span>
                <span>{Math.round(maxBucket * 0.75)}</span>
                <span>{Math.round(maxBucket * 0.5)}</span>
                <span>{Math.round(maxBucket * 0.25)}</span>
                <span>0</span>
              </div>
              
              {/* Vertical Bars */}
              <div className="absolute inset-0 left-10 right-4 bottom-7 flex items-end justify-between px-3 gap-3">
                <div className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer" title={`${buckets[0]} calls`}>
                  <div className="w-full max-w-[42px] bg-primary/20 hover:bg-primary/40 border border-primary/40 rounded-t transition-all" style={{ height: getH(buckets[0]) }}></div>
                </div>
                <div className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer" title={`${buckets[1]} calls`}>
                  <div className="w-full max-w-[42px] bg-primary-container/80 hover:bg-primary-container border border-primary/60 rounded-t transition-all shadow-[0_0_12px_rgba(37,99,235,0.3)]" style={{ height: getH(buckets[1]) }}></div>
                </div>
                <div className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer" title={`${buckets[2]} calls`}>
                  <div className="w-full max-w-[42px] bg-tertiary-container/80 hover:bg-tertiary-container border border-tertiary/60 rounded-t transition-all shadow-[0_0_12px_rgba(79,219,200,0.2)]" style={{ height: getH(buckets[2]) }}></div>
                </div>
                <div className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer" title={`${buckets[3]} calls`}>
                  <div className="w-full max-w-[42px] bg-secondary-container/60 hover:bg-secondary-container border border-secondary/50 rounded-t transition-all" style={{ height: getH(buckets[3]) }}></div>
                </div>
                <div className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer" title={`${buckets[4]} calls`}>
                  <div className="w-full max-w-[42px] bg-surface-variant hover:bg-white/20 border border-white/20 rounded-t transition-all" style={{ height: getH(buckets[4]) }}></div>
                </div>
              </div>
              
              {/* X-Axis Labels */}
              <div className="absolute bottom-0 left-10 right-4 flex justify-between text-[11px] font-mono-label text-outline/80 text-center px-1">
                {bucketLabels.map((lbl, i) => (
                  <span key={i} className="flex-1">{lbl}</span>
                ))}
              </div>
            </div>
            
            <div className="pt-3 mt-2 border-t border-white/5 flex items-center justify-between text-xs text-on-surface-variant z-10">
              <span>Longest session: {totalCalls > 0 ? longestStr : '0m 0s'}</span>
              <span className="text-primary font-mono-label">Most common: {totalCalls > 0 ? bucketLabels[mostCommonIdx] : '-'}</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
