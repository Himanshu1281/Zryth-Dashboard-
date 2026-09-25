import { Layout } from '../layouts/Layout';
import { useState, useEffect, useRef, useMemo } from 'react';
import { supabase } from '../config/supabase';
import { useCallsWithMessages } from '../hooks/useCalls';


export function VoiceAgents() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [isConfigDrawerOpen, setIsConfigDrawerOpen] = useState(false);
  const lastHeartbeatRef = useRef<number>(0);
  const [dbPrompts, setDbPrompts] = useState<any[]>([]);
  const [dbTools, setDbTools] = useState<any[]>([]);

  const [assignedPrompts, setAssignedPrompts] = useState<any[]>([]);
  const [assignedTools, setAssignedTools] = useState<any[]>([]);

  const [isPromptMenuOpen, setIsPromptMenuOpen] = useState(false);
  const [isToolMenuOpen, setIsToolMenuOpen] = useState(false);

  useEffect(() => {
    if (isConfigDrawerOpen) {
      const fetchData = async () => {
        // Fetch all available prompts
        const { data: promptsData } = await supabase.from('prompts').select('*').order('created_at', { ascending: false });
        let allPrompts = [];
        if (promptsData) {
          allPrompts = promptsData.map((p: any) => ({
            id: p.id,
            name: p.tag,
            desc: p.content,
            role: 'Database Prompt'
          }));
          setDbPrompts(allPrompts);
        }

        // Fetch assigned prompts for Maya V2
        const { data: agentPromptsData } = await supabase.from('agent_prompts').select('*').eq('agent_id', 'maya_v2');
        if (agentPromptsData) {
          const assignedTags = agentPromptsData.map(ap => ap.prompt_tag);
          const assigned = allPrompts.filter(p => assignedTags.includes(p.name));
          setAssignedPrompts(assigned);
        }

        // Fetch all available tools
        const { data: toolsData } = await supabase.from('tools').select('*').order('created_at', { ascending: false });
        let allTools: any[] = [];
        if (toolsData) {
          allTools = toolsData.map((t: any) => ({
            id: t.id,
            name: t.name,
            desc: t.description || t.execution_instruction || '',
            type: 'Database Tool'
          }));
          setDbTools(allTools);
        }

        // Fetch assigned tools for Maya V2
        const { data: agentToolsData } = await supabase.from('agent_tools').select('*').eq('agent_id', 'maya_v2');
        if (agentToolsData) {
          const assignedToolNames = agentToolsData.map(at => at.tool_name);
          const assigned = allTools.filter(t => assignedToolNames.includes(t.name));
          setAssignedTools(assigned);
        }
      };
      fetchData();
    }
  }, [isConfigDrawerOpen]);

  const handleAttachPrompt = async (prompt: any) => {
    // Avoid duplicates
    if (assignedPrompts.find(p => p.name === prompt.name)) {
      setIsPromptMenuOpen(false);
      return;
    }
    const { error } = await supabase.from('agent_prompts').insert({
      agent_id: 'maya_v2',
      prompt_tag: prompt.name
    });
    if (error) {
      console.error('Insert error:', error);
      alert('Error attaching prompt: ' + error.message);
    } else {
      setAssignedPrompts([...assignedPrompts, prompt]);
    }
    setIsPromptMenuOpen(false);
  };

  const handleDetachPrompt = async (prompt: any) => {
    const { error } = await supabase.from('agent_prompts').delete()
      .eq('agent_id', 'maya_v2')
      .eq('prompt_tag', prompt.name);
    if (error) {
      console.error('Delete error:', error);
      alert('Error detaching prompt: ' + error.message);
    } else {
      setAssignedPrompts(assignedPrompts.filter(p => p.name !== prompt.name));
    }
  };

  const handleAttachTool = async (tool: any) => {
    if (assignedTools.find(t => t.name === tool.name)) {
      setIsToolMenuOpen(false);
      return;
    }
    const { error } = await supabase.from('agent_tools').insert({
      agent_id: 'maya_v2',
      tool_name: tool.name
    });
    if (error) {
      console.error('Insert error:', error);
      alert('Error attaching tool: ' + error.message);
    } else {
      setAssignedTools([...assignedTools, tool]);
    }
    setIsToolMenuOpen(false);
  };

  const handleDetachTool = async (tool: any) => {
    const { error } = await supabase.from('agent_tools').delete()
      .eq('agent_id', 'maya_v2')
      .eq('tool_name', tool.name);
    if (error) {
      console.error('Delete error:', error);
      alert('Error detaching tool: ' + error.message);
    } else {
      setAssignedTools(assignedTools.filter(t => t.name !== tool.name));
    }
  };

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
      fetchStatus(); // Poll status periodically
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

<div className="mt-4 pt-3 border-t border-[#1a1a22] flex items-center justify-between gap-3">
  <button 
    onClick={() => setIsConfigDrawerOpen(true)}
    className="flex-1 bg-[#15151b] hover:bg-[#1a1a22] text-zinc-300 hover:text-white py-1.5 px-3 rounded-lg text-xs font-medium border border-[#23232c] transition-colors inline-flex items-center justify-center gap-1.5" 
    type="button"
  >
    <svg className="w-3.5 h-3.5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
    Configure Agent
  </button>
</div>

</div>
</section>

{isConfigDrawerOpen && (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-end select-none">
    <div className="w-full max-w-md h-full bg-[#0e0e12] border-l border-[#1f1f26] shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300">
      
      <div className="px-6 py-5 border-b border-[#1f1f26] flex items-center justify-between bg-[#111116]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold text-white tracking-tight">Configure Maya V2</h2>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">Manage configuration for this agent.</p>
          </div>
        </div>
        <button onClick={() => setIsConfigDrawerOpen(false)} type="button" className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-[#1a1a22] transition-colors border border-transparent hover:border-[#23232c]">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-7">
        
        {/* SECTION 1: PROMPTS */}
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-1 relative">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-white tracking-tight">Assigned Prompts</h3>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#1b1b22] text-zinc-400 border border-[#2b2b36]">{assignedPrompts.length} Attached</span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">Prompt layers executed sequentially during conversational turns.</p>
            </div>

            <div className="relative">
              <button 
                onClick={() => { setIsPromptMenuOpen(!isPromptMenuOpen); setIsToolMenuOpen(false); }}
                type="button" 
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#1a1a22] hover:bg-[#20202b] text-blue-400 border border-blue-500/30 hover:border-blue-500 transition-colors shadow-sm"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                <span>+ Add Prompt</span>
              </button>
              
              {isPromptMenuOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-[#141419] border border-[#2b2b36] rounded-xl shadow-xl z-20 py-1.5">
                  <div className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-500 border-b border-[#1f1f26] mb-1">Available Prompts</div>
                  <div className="max-h-48 overflow-y-auto space-y-0.5 px-1">
                    {dbPrompts.filter(p => !assignedPrompts.find(ap => ap.name === p.name)).length === 0 ? (
                      <div className="p-2 text-xs text-zinc-500 text-center">No new prompts available.</div>
                    ) : dbPrompts.filter(p => !assignedPrompts.find(ap => ap.name === p.name)).map(prompt => (
                      <button 
                        key={prompt.id}
                        onClick={() => handleAttachPrompt(prompt)}
                        className="w-full text-left p-2 rounded-lg hover:bg-[#1f1f29] transition-colors flex flex-col gap-0.5 border border-transparent hover:border-[#2b2b36]"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono text-white font-medium">{prompt.name}</span>
                          <span className="text-[10px] text-blue-400">{prompt.role}</span>
                        </div>
                        <span className="text-[10px] text-zinc-400 truncate block w-full">{prompt.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2.5">
            {assignedPrompts.length === 0 ? (
              <div className="p-4 rounded-xl border border-dashed border-[#23232c] bg-[#121216] text-center text-xs text-zinc-500">
                <p>No prompts attached.</p>
              </div>
            ) : assignedPrompts.map((prompt, index) => (
              <div key={prompt.id} className="p-3 rounded-xl bg-[#141419] border border-[#1f1f27] hover:border-[#2b2b36] transition-all flex items-center justify-between gap-3 group">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-8 h-8 rounded-lg bg-[#1a1a22] border border-[#262630] flex items-center justify-center text-blue-400 font-mono text-xs flex-shrink-0">
                    P{index + 1}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-medium text-white tracking-tight truncate">{prompt.name}</span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-[#1c1c24] text-zinc-400 border border-[#2b2b36]">{prompt.role}</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 truncate mt-0.5">{prompt.desc}</p>
                  </div>
                </div>
                <button 
                  onClick={() => handleDetachPrompt(prompt)}
                  className="px-2 py-1 rounded text-[11px] font-medium text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-1 border border-transparent hover:border-red-500/20 flex-shrink-0"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                  <span>Detach</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="h-[1px] bg-[#1a1a22]"></div>

        {/* SECTION 2: TOOLS */}
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-1 relative">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-white tracking-tight">Functional Tools</h3>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#1b1b22] text-zinc-400 border border-[#2b2b36]">{assignedTools.length} Attached</span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">External APIs and actions the agent can trigger autonomously.</p>
            </div>

            <div className="relative">
              <button 
                onClick={() => { setIsToolMenuOpen(!isToolMenuOpen); setIsPromptMenuOpen(false); }}
                type="button" 
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#1a1a22] hover:bg-[#20202b] text-teal-400 border border-teal-500/30 hover:border-teal-500 transition-colors shadow-sm"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                <span>+ Add Tool</span>
              </button>
              
              {isToolMenuOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-[#141419] border border-[#2b2b36] rounded-xl shadow-xl z-20 py-1.5">
                  <div className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-500 border-b border-[#1f1f26] mb-1">Available Tools</div>
                  <div className="max-h-48 overflow-y-auto space-y-0.5 px-1">
                    {dbTools.filter(t => !assignedTools.find(at => at.name === t.name)).length === 0 ? (
                      <div className="p-2 text-xs text-zinc-500 text-center">No new tools available.</div>
                    ) : dbTools.filter(t => !assignedTools.find(at => at.name === t.name)).map(tool => (
                      <button 
                        key={tool.id}
                        onClick={() => handleAttachTool(tool)}
                        className="w-full text-left p-2 rounded-lg hover:bg-[#1f1f29] transition-colors flex flex-col gap-0.5 border border-transparent hover:border-[#2b2b36]"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono text-white font-medium">{tool.name}</span>
                          <span className="text-[10px] text-teal-400">{tool.type}</span>
                        </div>
                        <span className="text-[10px] text-zinc-400 truncate block w-full">{tool.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2.5">
            {assignedTools.length === 0 ? (
              <div className="p-4 rounded-xl border border-dashed border-[#23232c] bg-[#121216] text-center text-xs text-zinc-500">
                <p>No tools attached.</p>
              </div>
            ) : assignedTools.map((tool) => (
              <div key={tool.id} className="p-3 rounded-xl bg-[#141419] border border-[#1f1f27] hover:border-[#2b2b36] transition-all flex items-center justify-between gap-3 group">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-8 h-8 rounded-lg bg-[#1a1a22] border border-[#262630] flex items-center justify-center text-teal-400 flex-shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-medium text-white tracking-tight truncate">{tool.name}</span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-[#1c1c24] text-teal-400/90 border border-teal-500/20">{tool.type}</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 truncate mt-0.5">{tool.desc}</p>
                  </div>
                </div>
                <button 
                  onClick={() => handleDetachTool(tool)}
                  className="px-2 py-1 rounded text-[11px] font-medium text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-1 border border-transparent hover:border-red-500/20 flex-shrink-0"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                  <span>Detach</span>
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

      <div className="px-6 py-4 bg-[#111116] border-t border-[#1f1f26] flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>Changes autosaved to workspace</span>
        </div>
        <button onClick={() => setIsConfigDrawerOpen(false)} type="button" className="px-4 py-2 rounded-lg text-xs font-medium bg-[#2563eb] hover:bg-blue-600 text-white transition-colors shadow-sm shadow-blue-500/20">
          Done Configuring
        </button>
      </div>
    </div>
  </div>
)}

      </div>
    </Layout>
  );
}
