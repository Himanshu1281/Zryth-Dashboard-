import { Layout } from '../layouts/Layout';
import { useState, useEffect, useRef, useMemo } from 'react';
import { supabase } from '../config/supabase';
import { useCallsWithMessages } from '../hooks/useCalls';


export function VoiceAgents() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isActive, setIsActive] = useState(false);
  const lastHeartbeatRef = useRef<number>(0);

  const { data: calls = [] } = useCallsWithMessages();

  const { totalCalls, avgDurationStr, resolutionPct } = useMemo(() => {
    const total = calls.length;
    if (total === 0) return { totalCalls: 0, avgDurationStr: '0m 0s', resolutionPct: '0%' };

    const getDerivedStatus = (call: any) => {
      const msgCount = call.messages?.length || 0;
      if (msgCount <= 1) return 'Failed';
      if (call.status && call.status.toLowerCase() !== 'failed') return call.status;
      if (!call.ended_at) {
        const req = call.requirement?.trim().toLowerCase() || '';
        if (req && !req.includes('none') && req !== 'null') return 'Converted';
        return 'Interrupted';
      }
      return 'Completed';
    };

    let totalDuration = 0;
    let completedCount = 0;

    calls.forEach(call => {
      totalDuration += (call.duration_seconds ?? call.estimated_duration ?? 0);
      
      const status = getDerivedStatus(call);
      if (status === 'Completed' || status === 'Converted') {
        completedCount++;
      }
    });

    const avgSeconds = Math.floor(totalDuration / total);
    const mins = Math.floor(avgSeconds / 60);
    const secs = avgSeconds % 60;
    
    const resPct = ((completedCount / total) * 100).toFixed(1);

    return {
      totalCalls: total,
      avgDurationStr: `${mins}m ${secs}s`,
      resolutionPct: `${resPct}%`
    };
  }, [calls]);


  
  // Realtime Agent Status
  useEffect(() => {
    const evaluateStatus = (status: string, heartbeat: string) => {
      if (status !== 'active') {
        setIsActive(false);
        return;
      }
      
      const hbTime = heartbeat ? new Date(heartbeat).getTime() : 0;
      lastHeartbeatRef.current = hbTime;
      
      if (Date.now() - hbTime > 30000) {
        setIsActive(false);
      } else {
        setIsActive(true);
      }
    };

    const fetchStatus = async () => {
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
        if (data && data.length > 0) {
          const maya = data.find((d: any) => d.agent_id === 'maya_v2');
          if (maya) {
            evaluateStatus(maya.status, maya.last_heartbeat);
          }
        }
      } catch (err) {
        console.error('Error in raw fetch:', err);
      }
    };

    fetchStatus();

    const channel = supabase
      .channel('agent_status_changes')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'agent_status' }, (payload) => {
        if (payload.new && payload.new.agent_id === 'maya_v2') {
          evaluateStatus(payload.new.status, payload.new.last_heartbeat);
        }
      })
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'agent_status' }, (payload) => {
        if (payload.new && payload.new.agent_id === 'maya_v2') {
          evaluateStatus(payload.new.status, payload.new.last_heartbeat);
        }
      })
      .subscribe();

    const intervalId = setInterval(() => {
      if (lastHeartbeatRef.current > 0) {
        if (Date.now() - lastHeartbeatRef.current > 30000) {
           setIsActive(false);
        }
      }
    }, 5000);

    return () => {
      supabase.removeChannel(channel);
      clearInterval(intervalId);
    };
  }, []);



  return (
    <Layout disablePadding={true} title="Voice Agents - Maya AI Voice">
      <div className="flex-1 overflow-y-auto px-8 py-8 flex flex-col justify-start">
        {/* Page Title & Primary Subheading Area */}
        
{/* Page Title & Primary Subheading Area */}
<div className="flex flex-col md:flex-row md:items-center justify-between pb-6 gap-4 border-b border-[#1c1c24]">
<div>
<h1 className="text-2xl font-bold tracking-tight text-white">Voice Agents</h1>
<p className="text-sm text-zinc-400 mt-1">Manage and inspect AI voice agents assigned to your company workspace.</p>
</div>

</div>
{/* Container: Empty State (Default) */}
{/* Container: Sample Agents Grid (Hidden initially, togglable) */}
<section className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
{/* CARD 1: Maya V2 */}
<div className="bg-[#0e0e11] border border-[#1f1f26] rounded-xl p-5 flex flex-col justify-between hover:border-[#2b2b36] transition-all relative overflow-hidden group shadow-lg shadow-black/40">
<div className="absolute top-0 right-0 left-0 h-[2px] bg-gradient-to-r from-blue-500 via-indigo-500 to-transparent opacity-70"></div>
<div className="space-y-4">
<div className="flex items-start justify-between gap-3">
<div className="flex items-center gap-3.5">
<div className="relative w-16 h-16 rounded-xl overflow-hidden bg-[#15151b] border border-[#23232c] flex-shrink-0">
<img alt="Maya AI Voice Agent" className="w-full h-full object-cover" src="/maya_avatar.jpg"/>
</div>
<div>
<div className="flex items-center gap-2">
<h3 className="text-base font-semibold text-white tracking-tight">Maya V2</h3>
{isActive ? (
  <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 inline-flex items-center gap-1.5">
    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
    Active
  </span>
) : (
  <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20 inline-flex items-center gap-1.5">
    <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
    Inactive
  </span>
)}
</div>
<span className="inline-block mt-1 px-2 py-0.5 rounded text-[11px] font-medium bg-[#1a1a22] text-zinc-300 border border-[#262630]">Zryth Voice Agent</span>
</div>
</div>
</div>
<div className="space-y-2 py-2.5 border-y border-[#1a1a22] text-xs">
<div className="flex items-center justify-between text-zinc-400">
<span className="flex items-center gap-1.5"><svg className="w-3.5 h-3.5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>Voice Model</span>
<span className="font-medium text-zinc-200">Sarvam Bulbul TTS <span className="text-zinc-500 font-normal">(Roopa)</span></span>
</div>
<div className="flex items-center justify-between text-zinc-400">
<span className="flex items-center gap-1.5"><svg className="w-3.5 h-3.5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>Assigned Number</span>
<span className="font-mono text-zinc-200">+91 8071 579 674</span>
</div>
<div className="flex items-center justify-between text-zinc-400">
<span className="flex items-center gap-1.5"><svg className="w-3.5 h-3.5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>Languages</span>
<span className="text-zinc-200 font-medium">English (US), Hindi</span>
</div>
</div>

<div className="grid grid-cols-3 gap-2 bg-[#141419] p-2.5 rounded-lg border border-[#1f1f27]">
<div>
<div className="text-[10px] uppercase font-semibold text-zinc-500 tracking-wider">Total Calls</div>
<div className="text-sm font-semibold font-mono text-white mt-0.5">{totalCalls.toLocaleString()}</div>
</div>
<div>
<div className="text-[10px] uppercase font-semibold text-zinc-500 tracking-wider">Avg Duration</div>
<div className="text-sm font-semibold font-mono text-zinc-200 mt-0.5">{avgDurationStr}</div>
</div>
<div>
<div className="text-[10px] uppercase font-semibold text-zinc-500 tracking-wider">Resolution</div>
<div className="text-sm font-semibold font-mono text-emerald-400 mt-0.5">{resolutionPct}</div>
</div>
</div>
</div>

</div>
</section>

      </div>
    </Layout>
  );
}
