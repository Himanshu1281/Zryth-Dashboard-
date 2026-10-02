import { useQuery } from '@tanstack/react-query';
import { api } from '../api';
import type { CallData } from '../types';

// The backend computes estimated_duration and message_count for each call.
export const useCallsWithMessages = () =>
  useQuery({
    queryKey: ['calls', 'with-messages'],
    queryFn: () => api.calls.list() as Promise<CallData[]>,
    staleTime: 30_000,
  });
