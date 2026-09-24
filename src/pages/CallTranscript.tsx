import { Layout } from '../layouts/Layout';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../config/supabase';

export function CallTranscript() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [call, setCall] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    let active = true;
    const fetchCall = async () => {
      setLoading(true);
      try {
        const [{ data: callData }, { data: msgs }] = await Promise.all([
          supabase.from('calls').select('*').eq('id', id).single(),
          supabase.from('messages').select('*').eq('call_id', id).order('created_at'),
        ]);
        if (active) {
          setCall(callData);
          setMessages(msgs || []);
        }
      } catch (err) {
        console.error("Error fetching call:", err);
      } finally {
        if (active) setLoading(false);
      }
    };
    fetchCall();
    return () => { active = false; };
  }, [id]);

  const copyCallId = () => {
    if (call?.id) {
      navigator.clipboard.writeText(call.id);
    }
  };

  const getStatusColor = (status: string) => {
    const s = (status || '').toLowerCase();
    if (s === 'completed' || s === 'converted') return 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400';
    if (s === 'failed' || s === 'missed') return 'bg-rose-500/10 border-rose-500/20 text-rose-400';
    if (s === 'transferred') return 'bg-blue-500/10 border-blue-500/20 text-blue-400';
    return 'bg-zinc-500/10 border-zinc-500/20 text-zinc-400';
  };

  const statusStr = call?.status || (call?.ended_at ? 'Completed' : 'Failed');

  return (
    <Layout title="Call Transcript" disablePadding={true}>
      <div className="w-full max-w-[1440px] mx-auto pb-16 px-6 lg:px-10">
        
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
                <span className="font-mono-label text-[13px] text-primary bg-surface-container-high px-2 py-0.5 rounded">
                  #{call?.id?.slice(0,8) || id?.slice(0,8) || 'Unknown'}
                </span>
                <button onClick={copyCallId} className="text-outline hover:text-on-surface transition-colors p-1" title="Copy Call ID">
                  <span className="material-symbols-outlined text-[16px]">content_copy</span>
                </button>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="relative inline-block text-left">
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-body-sm text-sm transition-colors">
                  <span className="material-symbols-outlined text-[18px] text-primary">download</span>
                  <span>Export</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : !call ? (
          <div className="flex items-center justify-center py-20 text-zinc-400">
            Call not found.
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
            <div className="lg:col-span-8 flex flex-col gap-6">
              <div className="bg-surface-container rounded-2xl border border-surface-container-high overflow-hidden shadow-sm flex flex-col">
                <div className="px-6 py-4 border-b border-surface-container-high bg-surface-container-low flex justify-between items-center sticky top-[92px] z-20">
                  <h2 className="text-sm font-semibold tracking-wide text-white uppercase flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-primary">forum</span>
                    Transcript
                  </h2>
                </div>
                
                <div className="p-6 md:p-8 flex-1 bg-gradient-to-b from-surface-container-low/30 to-transparent">
                  {messages.length === 0 ? (
                    <div className="text-center text-zinc-500 py-10 text-sm">No messages available for this call.</div>
                  ) : (
                    <div className="space-y-6">
                      {messages.map((msg, index) => {
                        const isAgent = msg.speaker === 'maya';
                        return (
                          <div key={msg.id || index} className={`flex w-full ${isAgent ? 'justify-start' : 'justify-end'}`}>
                            <div className={`max-w-[85%] md:max-w-[75%] rounded-2xl p-4 md:p-5 relative ${
                              isAgent 
                                ? 'bg-surface-container-high border border-surface-container-highest text-on-surface rounded-tl-sm shadow-sm' 
                                : 'bg-primary/10 border border-primary/20 text-on-surface rounded-tr-sm shadow-sm'
                            }`}>
                              <div className="flex items-center gap-2 mb-2">
                                {isAgent ? (
                                  <>
                                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                                      <span className="material-symbols-outlined text-[12px] text-primary">smart_toy</span>
                                    </div>
                                    <span className="font-semibold text-xs tracking-wider text-primary uppercase">Maya (AI Agent)</span>
                                  </>
                                ) : (
                                  <>
                                    <span className="font-semibold text-xs tracking-wider text-on-surface-variant uppercase">{call.customer_name || 'Customer'}</span>
                                    <div className="w-5 h-5 rounded-full bg-surface-container-highest flex items-center justify-center">
                                      <span className="material-symbols-outlined text-[12px] text-on-surface">person</span>
                                    </div>
                                  </>
                                )}
                              </div>
                              <p className="text-[15px] leading-relaxed font-body-sm whitespace-pre-wrap">{msg.message}</p>
                              <div className={`text-[10px] text-outline/60 mt-3 font-mono-label ${isAgent ? 'text-left' : 'text-right'}`}>
                                {new Date(msg.created_at).toLocaleTimeString()}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-4 flex flex-col gap-6 relative">
              <div className="sticky top-[92px] space-y-6">
                
                {/* Meta Overview */}
                <div className="bg-surface-container rounded-2xl border border-surface-container-high overflow-hidden shadow-sm">
                  <div className="px-5 py-3 border-b border-surface-container-high bg-surface-container-low">
                     <h3 className="text-xs font-semibold tracking-wide text-white uppercase">Overview</h3>
                  </div>
                  <div className="p-5 space-y-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-outline font-medium uppercase tracking-wider">Customer</span>
                      <div className="flex items-center gap-2">
                         <span className="font-medium text-white">{call.customer_name || 'Unknown'}</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-outline font-medium uppercase tracking-wider">Phone</span>
                      <span className="text-sm font-mono-label text-on-surface-variant">{call.phone || 'N/A'}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-outline font-medium uppercase tracking-wider">Status</span>
                      <div>
                        <span className={`inline-flex px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider border ${getStatusColor(statusStr)}`}>
                          {statusStr}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-outline font-medium uppercase tracking-wider">Time</span>
                      <span className="text-sm text-on-surface-variant">
                        {new Date(call.started_at).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
