import { useQuery } from '@tanstack/react-query';
import { supabase } from '../config/supabase';
import type { CallData } from '../types';

export const useCallsWithMessages = () =>
  useQuery({
    queryKey: ['calls', 'with-messages'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('calls')
        .select('*, messages(id, created_at)')
        .order('started_at', { ascending: false });
      
      if (error) throw error;
      
      // Compute estimated_duration once per fetch instead of on every render
      const callsWithDuration = (data || []).map((call: any) => {
        if (call.duration_seconds == null && call.messages && call.messages.length > 0) {
          const lastMsg = call.messages.reduce((latest: any, current: any) => {
            return new Date(current.created_at) > new Date(latest.created_at) ? current : latest;
          }, call.messages[0]);
          const diff = Math.floor((new Date(lastMsg.created_at).getTime() - new Date(call.started_at).getTime()) / 1000);
          if (diff > 0) {
            return { ...call, estimated_duration: diff };
          }
        }
        return call;
      });
      
      return callsWithDuration as CallData[];
    },
    staleTime: 30_000,
  });
