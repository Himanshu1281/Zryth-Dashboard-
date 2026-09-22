import { useState, useEffect, useMemo } from 'react';
import { useCallsWithMessages } from '../hooks/useCalls';
import { Layout } from '../components/Layout';
import { Link } from 'react-router-dom';
import { MetricCard } from '../components/ui/MetricCard';
import { Drawer } from '../components/ui/Drawer';
import { supabase } from '../config/supabase';
import type { CallData, MessageData } from '../types';
import * as XLSX from 'xlsx';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export function AllCalls() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedCall, setSelectedCall] = useState<CallData | null>(null);
  const [isTableView, setIsTableView] = useState(true);

  const [statusMenuOpen, setStatusMenuOpen] = useState(false);
  const [agentsMenuOpen, setAgentsMenuOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [selectedAgent, setSelectedAgent] = useState('All Agents');
  const [searchQuery, setSearchQuery] = useState('');
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Data states
  const [calls, setCalls] = useState<CallData[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Drawer messages state
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [drawerViewMode, setDrawerViewMode] = useState<'transcript' | 'summary'>('transcript');
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);

  useEffect(() => {
    fetchCalls();
  }, []);

  const fetchCalls = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('calls')
        .select('*, messages(id, created_at)')
        .order('started_at', { ascending: false });

      if (error) throw error;
      
      const callsData = data || [];
      
      // Fetch estimated duration for calls that crashed/ongoing
      callsData.forEach((call: CallData) => {
        if ((call.duration_seconds === null || call.duration_seconds === undefined) && call.messages && call.messages.length > 0) {
          // Find the latest message timestamp
          const lastMsg = call.messages.reduce((latest, msg) => {
            return new Date(msg.created_at) > new Date(latest.created_at) ? msg : latest;
          }, call.messages[0]);
              
          const start = new Date(call.started_at);
          const end = new Date(lastMsg.created_at);
          const diff = Math.floor((end.getTime() - start.getTime()) / 1000);
          if (diff > 0) {
            call.estimated_duration = diff;
          }
        }
      });

      setCalls(callsData);
    } catch (error) {
      console.error('Error fetching calls:', error);
    } finally {
      setLoading(false);
    }
  };

  const openDrawer = async (call: CallData) => {
    setSelectedCall(call);
    setDrawerOpen(true);
    setLoadingMessages(true);
    
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('call_id', call.id)
        .order('created_at', { ascending: true });
        
      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setMessages([]);
    } finally {
      setLoadingMessages(false);
    }
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setTimeout(() => {
      setSelectedCall(null);
      setMessages([]);
      setDrawerViewMode('transcript');
      setSummary(null);
    }, 300);
  };

  const handleSummarize = async () => {
    setDrawerViewMode('summary');
    if (summary) return;
    
    setIsSummarizing(true);
    
    try {
      if (!messages || messages.length === 0) {
        setSummary("There are no messages in this transcript to summarize.");
        setIsSummarizing(false);
        return;
      }
      
      const transcriptText = messages.map(m => `${m.speaker === 'maya' ? 'Maya (AI Agent)' : selectedCall?.customer_name || 'Customer'}: ${m.message}`).join('\n');
      const prompt = `You are an expert conversation analyst. Please read the following customer service transcript and write a concise, professional summary paragraph (3-5 sentences).

Make sure to include:
1. The customer's specific questions or requests.
2. Any exact product names, features, or details the agent provided (e.g., Finance Auditor Software, mill industry).
3. The final outcome of the call.

Please write it as a fluid paragraph, without bullet points or markdown.

Transcript:
${transcriptText}`;
      
      const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
      if (!apiKey) {
        setSummary("Google API Key not found. Please add VITE_GOOGLE_API_KEY to your .env file.");
        setIsSummarizing(false);
        return;
      }
      
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });
      
      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorBody}`);
      }
      
      const data = await response.json();
      const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (generatedText) {
        setSummary(generatedText);
      } else {
        setSummary(`API returned an unexpected response format: ${JSON.stringify(data)}`);
      }
    } catch (error: any) {
      console.error("Summarization error:", error);
      setSummary(`API Error: ${error.message || 'Unknown error occurred.'}`);
    } finally {
      setIsSummarizing(false);
    }
  };

  const clearFilters = () => {
    setSelectedStatus('All Statuses');
    setSelectedAgent('All Agents');
    setSearchQuery('');
    setFromDate(null);
    setToDate(null);
    setCurrentPage(1);
    const searchInput = document.getElementById('searchInput') as HTMLInputElement;
    if (searchInput) searchInput.value = '';
    setIsTableView(true);
  };

  const handleDownloadExcel = () => {
    if (filteredCalls.length === 0) {
      alert("No records to download");
      return;
    }

    const dataToExport = filteredCalls.map(call => ({
      'Phone Number': call.phone || 'Unknown',
      'Customer Name': call.customer_name || 'No Name Provided',
      'Assigned Agent': 'Maya V2',
      'Status': getDerivedStatus(call),
      'Duration': formatDuration(call.duration_seconds ?? call.estimated_duration),
      'Cost': formatCost(call.duration_seconds ?? call.estimated_duration),
      'Date & Time': formatDate(call.started_at)
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Call Records");

    const dateStr = new Date().toISOString().split('T')[0];
    XLSX.writeFile(workbook, `Call_Records_${dateStr}.xlsx`);
  };

  const formatDuration = (seconds: number | null | undefined) => {
    if (seconds === null || seconds === undefined) return '—';
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s < 10 ? '0' : ''}${s}s`;
  };

  const formatCost = (seconds: number | null | undefined) => {
    if (seconds === null || seconds === undefined) return '₹0.00';
    // ₹3.2 per minute
    const cost = (seconds / 60) * 3.2;
    return `₹${cost.toFixed(2)}`;
  };

  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    return d.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };
  
  const getDerivedStatus = (call: CallData) => {
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

  const getStatusColor = (status: string | undefined) => {
    if (!status) return 'bg-tertiary-container/30 text-tertiary';
    const s = status.toLowerCase();
    if (s.includes('fail') || s.includes('missed') || s.includes('drop')) return 'bg-error-container/50 text-error';
    if (s.includes('progress') || s.includes('transfer')) return 'bg-secondary-container/40 text-secondary';
    if (s.includes('complete') || s.includes('answer') || s.includes('convert')) return 'bg-tertiary-container/30 text-tertiary';
    return 'bg-surface-container-high text-on-surface';
  };
  
  const getStatusDotColor = (status: string | undefined) => {
    if (!status) return 'bg-tertiary';
    const s = status.toLowerCase();
    if (s.includes('fail') || s.includes('missed') || s.includes('drop')) return 'bg-error';
    if (s.includes('progress') || s.includes('transfer')) return 'bg-secondary';
    if (s.includes('complete') || s.includes('answer') || s.includes('convert')) return 'bg-tertiary';
    return 'bg-outline';
  };

  const statuses = ['All Statuses', 'Completed', 'Failed', 'Transferred', 'Converted', 'Interrupted'];

  // Apply filters
  const filteredCalls = calls.filter(call => {
    // 1. Status Filter
    if (selectedStatus !== 'All Statuses') {
      if (getDerivedStatus(call) !== selectedStatus) {
        return false;
      }
    }
    
    // 2. Search Filter
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      const phoneMatch = call.phone?.toLowerCase().includes(q) || false;
      const nameMatch = call.customer_name?.toLowerCase().includes(q) || false;
      if (!phoneMatch && !nameMatch) {
        return false;
      }
    }
    
    // 3. Date Filter
    if (fromDate) {
      if (new Date(call.started_at) < fromDate) return false;
    }
    if (toDate) {
      const endDate = new Date(toDate);
      endDate.setHours(23, 59, 59, 999);
      if (new Date(call.started_at) > endDate) return false;
    }
    
    return true;
  });

  // Pagination logic
  const totalPages = Math.max(1, Math.ceil(filteredCalls.length / itemsPerPage));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [filteredCalls.length, totalPages]);

  const currentCalls = filteredCalls.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Derived metrics from filteredCalls
  const totalSeconds = filteredCalls.reduce((acc, call) => acc + (call.duration_seconds ?? call.estimated_duration ?? 0), 0);
  const customerBill = isTableView ? formatCost(totalSeconds) : '₹0.00';
  const totalDurationStr = isTableView ? formatDuration(totalSeconds) : '—';
  const avgCostStr = isTableView && filteredCalls.length > 0 ? formatCost(totalSeconds / filteredCalls.length) : '₹0.00';
  const avgDurationStr = isTableView && filteredCalls.length > 0 ? formatDuration(Math.floor(totalSeconds / filteredCalls.length)) : '—';

  // Calculate estimated duration from transcript if duration_seconds is null
  let displayDuration = selectedCall?.duration_seconds ?? selectedCall?.estimated_duration;
  if ((displayDuration === null || displayDuration === undefined) && messages.length > 0 && selectedCall?.started_at) {
    const lastMessageDate = new Date(messages[messages.length - 1].created_at);
    const startDate = new Date(selectedCall.started_at);
    const diffSeconds = Math.floor((lastMessageDate.getTime() - startDate.getTime()) / 1000);
    displayDuration = diffSeconds > 0 ? diffSeconds : null;
  }

  return (
    <Layout disablePadding={true} title="Call History">
      <div className="p-4 sm:p-8 space-y-6 max-w-[1440px] mx-auto w-full">
          {/* Page Header (Title, Subtitle & Action Bar) */}
          <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" data-purpose="page-header">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Call History</h1>
            <p className="text-sm text-neutral-400 mt-0.5">All outbound call attempts and results</p>
          </div>
            <div className="flex items-center gap-2.5 self-start sm:self-auto">
              <button onClick={() => fetchCalls()} className="w-9 h-9 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant flex items-center justify-center transition-colors border border-surface-container-highest" title="Refresh">
                <span className={`material-symbols-outlined text-[19px] transition-transform duration-500 hover:rotate-180 ${loading ? 'animate-spin' : ''}`}>refresh</span>
              </button>
              <button onClick={handleDownloadExcel} className="flex items-center gap-2 px-3.5 h-9 rounded-lg border border-surface-container-highest bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs font-semibold tracking-wide transition-colors shadow-sm">
                <span className="material-symbols-outlined text-[17px] text-outline">download</span>
                <span className="">Download Records</span>
              </button>
            </div>
          </section>

          {/* Retention Alert Warning Box */}
          <div className="mb-6 rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-amber-200 text-xs sm:text-sm flex items-start sm:items-center gap-3 shadow-sm">
            <span className="material-symbols-outlined text-amber-400 text-[20px] shrink-0 mt-0.5 sm:mt-0">warning</span>
            <p className="leading-relaxed">
              Call history, transcripts, and recordings are retained for 90 days. Records older than 90 days are permanently erased from the database.
            </p>
          </div>

          {/* 5 Metric Stat Cards (Row across matching reference) */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 mb-6">
            <MetricCard variant="small" title="Total Calls" value={isTableView ? filteredCalls.length.toString() : '0'} icon="call" color="primary" />
            <MetricCard variant="small" title="Customer Bill" value={customerBill} icon={<span className="font-bold text-[15px] text-secondary leading-none">₹</span>} color="secondary" />
            <MetricCard variant="small" title="Total Duration" value={totalDurationStr} icon="timer" color="tertiary" />
            <MetricCard variant="small" title="Avg Cost / Call" value={avgCostStr} icon="trending_up" color="amber" />
            <div className="col-span-2 md:col-span-1">
              <MetricCard variant="small" title="Avg Duration" value={avgDurationStr} icon="schedule" color="tertiary" />
            </div>
          </div>

          {/* Comprehensive Filter Bar (Matching Reference Layout) */}
          <div className="bg-surface-container-low border border-surface-container-high/80 rounded-2xl p-4 mb-6 shadow-sm">
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Search Input */}
              <div className="flex-1 min-w-[240px] relative flex items-center bg-surface-container-high/70 border border-surface-container-highest rounded-xl px-3 py-2 text-sm">
                <input 
                  id="searchInput" 
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1); // Reset to page 1 on search
                  }}
                  className="w-full bg-transparent font-body-sm text-body-sm text-on-surface placeholder-outline focus:outline-none border-none ring-0 p-0" 
                  placeholder="Search contact name or phone number..." 
                  type="text" 
                />
              </div>
              
              {/* Dropdown 1: All Agents */}
              <div className="relative">
                <button className="flex items-center justify-between gap-3 bg-surface-container-high/70 hover:bg-surface-container-high border border-surface-container-highest rounded-xl px-3.5 py-2 text-sm text-on-surface transition-colors cursor-pointer" onClick={() => { setAgentsMenuOpen(!agentsMenuOpen); setStatusMenuOpen(false); }}>
                  <span className="">{selectedAgent}</span>
                  <span className="material-symbols-outlined text-outline text-[18px]">keyboard_arrow_down</span>
                </button>
                {agentsMenuOpen && (
                  <div className="absolute left-0 top-full mt-1.5 w-48 bg-surface-container-high border border-surface-container-highest rounded-xl shadow-2xl z-30 p-1.5 text-xs flex flex-col gap-0.5 backdrop-blur-xl">
                    {['All Agents', 'Maya V2'].map((agent) => (
                      <button key={agent} className={`w-full text-left px-3 py-2 rounded-lg hover:bg-surface-container-highest flex items-center justify-between ${selectedAgent === agent ? 'text-primary font-medium' : 'text-on-surface'}`} onClick={() => { setSelectedAgent(agent); setAgentsMenuOpen(false); }}>
                        <span className="">{agent}</span>
                        {selectedAgent === agent && <span className="material-symbols-outlined text-[16px]">check</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Dropdown 3: Statuses */}
              <div className="relative">
                <button className="flex items-center justify-between gap-3 bg-surface-container-high/70 hover:bg-surface-container-high border border-surface-container-highest rounded-xl px-3.5 py-2 text-sm text-on-surface transition-colors cursor-pointer" onClick={() => { setStatusMenuOpen(!statusMenuOpen); setAgentsMenuOpen(false); }}>
                  <span className="">{selectedStatus}</span>
                  <span className="material-symbols-outlined text-outline text-[18px]">keyboard_arrow_down</span>
                </button>
                {statusMenuOpen && (
                  <div className="absolute left-0 top-full mt-1.5 w-48 bg-surface-container-high border border-surface-container-highest rounded-xl shadow-2xl z-40 py-1.5 text-xs flex flex-col backdrop-blur-xl divide-y divide-surface-container-highest/40">
                    <div className="p-1">
                      {statuses.map((status) => (
                        <button key={status} className={`w-full text-left px-3 py-1.5 rounded-lg hover:bg-surface-container-highest flex items-center justify-between ${selectedStatus === status ? 'text-primary font-medium' : 'text-on-surface'}`} onClick={() => { setSelectedStatus(status); setStatusMenuOpen(false); setCurrentPage(1); }}>
                          <span>{status}</span>
                          {selectedStatus === status && <span className="material-symbols-outlined text-[16px]">check</span>}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Date Picker 1 */}
              <div className="flex items-center bg-surface-container-high/70 border border-surface-container-highest rounded-xl px-3.5 py-2 text-sm text-outline hover:border-outline transition-colors z-[100] relative">
                <DatePicker
                  selected={fromDate}
                  onChange={(date: Date | null) => { setFromDate(date); setCurrentPage(1); }}
                  selectsStart
                  startDate={fromDate || undefined}
                  endDate={toDate || undefined}
                  placeholderText="From Date"
                  className="bg-transparent text-sm outline-none border-none text-on-surface cursor-pointer w-24 p-0"
                  dateFormat="MMM d, yyyy"
                />
              </div>
              {/* Date Picker 2 */}
              <div className="flex items-center bg-surface-container-high/70 border border-surface-container-highest rounded-xl px-3.5 py-2 text-sm text-outline hover:border-outline transition-colors z-[100] relative">
                <DatePicker
                  selected={toDate}
                  onChange={(date: Date | null) => { setToDate(date); setCurrentPage(1); }}
                  selectsEnd
                  startDate={fromDate || undefined}
                  endDate={toDate || undefined}
                  minDate={fromDate || undefined}
                  placeholderText="To Date"
                  className="bg-transparent text-sm outline-none border-none text-on-surface cursor-pointer w-24 p-0"
                  dateFormat="MMM d, yyyy"
                />
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
                <span className="font-mono-label text-[11px] text-tertiary">{loading ? 'Loading...' : `${filteredCalls.length} Active Records`}</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-surface-container-high hover:bg-surface-container-highest text-on-surface border border-surface-container-highest transition-colors cursor-pointer" onClick={() => setIsTableView(!isTableView)}>
                  <span className="material-symbols-outlined text-[15px] text-primary">{isTableView ? 'phone_disabled' : 'table_view'}</span>
                  <span className="">{isTableView ? 'Show Empty State' : 'Show Records'}</span>
                </button>
              </div>
            </div>
            
            {/* View 1: Empty State or Loading */}
            {(!isTableView || filteredCalls.length === 0) && (
              <div className="flex flex-col items-center justify-center py-24 px-4 text-center my-auto flex-1">
                {loading ? (
                  <>
                    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-base text-outline font-medium tracking-wide">Fetching records...</p>
                  </>
                ) : (
                  <>
                    <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center text-outline/40 mb-3.5 ring-8 ring-surface-container-high/20">
                      <span className="material-symbols-outlined text-[32px]">phone_disabled</span>
                    </div>
                    <p className="text-base text-outline font-medium tracking-wide">No call logs found</p>
                    <p className="text-xs text-outline/70 mt-1 max-w-sm">No calls match your selected filters.</p>
                  </>
                )}
              </div>
            )}
            
            {/* View 2: Full Call Records Table */}
            {(isTableView && filteredCalls.length > 0) && (
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
                    {currentCalls.map((call) => (
                      <tr key={call.id} className="hover:bg-surface-container-high/40 transition-colors group cursor-pointer" onClick={() => openDrawer(call)}>
                        <td className="py-3.5 pl-6 pr-4 min-w-[200px]">
                          <div className="flex flex-col min-w-0">
                            <span className="font-semibold text-on-surface group-hover:text-primary transition-colors truncate">{call.phone || 'Unknown'}</span>
                            <span className="text-outline text-[11px] truncate">{call.customer_name || 'No Name Provided'}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded-md bg-secondary-container/40 text-secondary font-medium text-[11px]">Maya V2</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-medium text-[11px] ${getStatusColor(getDerivedStatus(call))}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${getStatusDotColor(getDerivedStatus(call))}`}></span> {getDerivedStatus(call)}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-mono-label text-outline">
                          {formatDuration(call.duration_seconds ?? call.estimated_duration)}
                          {(call.duration_seconds === null || call.duration_seconds === undefined) && call.estimated_duration !== null && call.estimated_duration !== undefined && (
                            <span className="text-[9px] text-outline ml-1">(est)</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 font-mono-label font-medium text-on-surface">
                          {formatCost(call.duration_seconds ?? call.estimated_duration)}
                        </td>
                        <td className="py-3.5 px-4 text-outline font-mono-label text-[11px]">{formatDate(call.started_at)}</td>
                        <td className="py-3.5 pl-4 pr-6 text-right">
                          <button className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-semibold text-primary bg-primary/10 hover:bg-primary hover:text-on-primary transition-colors" onClick={(e) => { e.stopPropagation(); openDrawer(call); }}>
                            <span className="material-symbols-outlined text-[15px]">description</span>
                            <span className="">View Transcript</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {/* Pagination Controls */}
                <div className="px-6 py-4 flex items-center justify-between border-t border-surface-container-high/40 bg-surface-container-low/30">
                  <span className="text-[11px] text-outline font-medium">
                    Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredCalls.length)} of {filteredCalls.length} records
                  </span>
                  <div className="flex gap-2">
                    <button 
                      disabled={currentPage === 1} 
                      onClick={() => setCurrentPage(p => p - 1)}
                      className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high border border-surface-container-highest text-on-surface text-[11px] font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                      Previous
                    </button>
                    <button 
                      disabled={currentPage >= totalPages || totalPages === 0} 
                      onClick={() => setCurrentPage(p => p + 1)}
                      className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high border border-surface-container-highest text-on-surface text-[11px] font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                      Next
                    </button>
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
                  <h3 className="font-headline-md text-base font-semibold text-on-surface">Session {selectedCall?.id.slice(0,8)}</h3>
                  <span className={`font-mono-label text-[10px] uppercase px-2 py-0.5 rounded font-semibold ${getStatusColor(selectedCall ? getDerivedStatus(selectedCall) : undefined)}`}>
                    {selectedCall ? getDerivedStatus(selectedCall) : ''}
                  </span>
                </div>
                <span className="font-body-sm text-xs text-outline">{selectedCall?.phone} • {selectedCall?.customer_name}</span>
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
              <span className="font-label-md text-outline uppercase block text-[10px]">Duration</span>
              <span className="font-mono-label text-xs font-semibold text-primary mt-0.5 block">
                {formatDuration(displayDuration)}
                {(selectedCall?.duration_seconds === null || selectedCall?.duration_seconds === undefined) && displayDuration !== null && (
                  <span className="text-[9px] text-outline ml-1">(est)</span>
                )}
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-surface-container-low border border-surface-container-high/60">
              <span className="font-label-md text-outline uppercase block text-[10px]">Total Cost</span>
              <span className="font-mono-label text-xs font-semibold text-on-surface mt-0.5 block">{formatCost(displayDuration)}</span>
            </div>
          </div>

          {/* Drawer Conversation Transcript Stream */}
          {drawerViewMode === 'summary' ? (
            <div className="flex-1 overflow-y-auto p-6 flex flex-col">
              <div className="flex items-center gap-2 mb-6 border-b border-surface-container-high pb-4">
                <span className="material-symbols-outlined text-tertiary text-2xl">auto_awesome</span>
                <h4 className="font-headline-md text-lg font-bold text-on-surface">AI Summary</h4>
              </div>
              
              {isSummarizing ? (
                <div className="flex flex-col items-center justify-center flex-1 py-10 opacity-70">
                  <div className="w-8 h-8 border-4 border-tertiary border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="font-body-md text-sm text-outline animate-pulse">Analyzing conversation context...</p>
                </div>
              ) : (
                <div className="bg-surface-container-low border border-surface-container-high rounded-xl p-5 leading-relaxed font-body-sm text-sm text-on-surface-variant">
                  {summary}
                </div>
              )}
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <span className="font-mono-label text-[11px] text-outline uppercase tracking-wider block text-center">
              Transcript Started {selectedCall?.started_at ? formatDate(selectedCall.started_at) : '...'}
            </span>
            
            {loadingMessages ? (
              <div className="flex justify-center py-10">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : messages.length === 0 ? (
              <div className="text-center py-10 text-outline text-sm">No messages available for this call.</div>
            ) : (
              messages.map((msg) => (
                msg.speaker === 'maya' ? (
                  <div key={msg.id} className="flex flex-col items-start max-w-[85%]">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-label-md text-xs text-primary font-semibold">Maya V2 (AI Agent)</span>
                      <span className="font-mono-label text-[10px] text-outline">{new Date(msg.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'})}</span>
                    </div>
                    <div className="p-3.5 rounded-2xl rounded-tl-none bg-surface-container-high text-on-surface font-body-sm text-xs shadow-sm leading-relaxed">
                      {msg.message}
                    </div>
                  </div>
                ) : (
                  <div key={msg.id} className="flex flex-col items-end self-end max-w-[85%] ml-auto">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono-label text-[10px] text-outline">{new Date(msg.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'})}</span>
                      <span className="font-label-md text-xs text-on-surface font-semibold">{selectedCall?.customer_name || 'Customer'}</span>
                    </div>
                    <div className="p-3.5 rounded-2xl rounded-tr-none bg-surface-container-low border border-surface-container-high/80 text-on-surface font-body-sm text-xs shadow-sm leading-relaxed">
                      {msg.message}
                    </div>
                  </div>
                )
              ))
            )}
            </div>
          )}

          {/* Drawer Footer Actions */}
          <div className="p-4 bg-surface-container-low flex items-center justify-between gap-3 border-t border-surface-container-high">
            {drawerViewMode === 'transcript' ? (
              <button 
                onClick={handleSummarize}
                className="w-full py-2 px-4 rounded-xl bg-tertiary/20 hover:bg-tertiary/30 text-tertiary border border-tertiary/30 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[17px]">auto_awesome</span>
                <span className="">AI Summarizer</span>
              </button>
            ) : (
              <button 
                onClick={() => setDrawerViewMode('transcript')}
                className="w-full py-2 px-4 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-semibold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[17px]">description</span>
                <span className="">View Transcript</span>
              </button>
            )}
          </div>
        </Drawer>

    </Layout>
  );
}
