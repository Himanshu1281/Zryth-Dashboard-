import { useQuery } from '@tanstack/react-query';
import apiClient from '../api/client';

export interface MetricsData {
  totalCalls: number;
  totalMinutes: number;
  totalCost: number;
  activeAgents: number;
}

export const useMetrics = () => {
  return useQuery({
    queryKey: ['metrics'],
    queryFn: async (): Promise<MetricsData> => {
      const response = await apiClient.get('/metrics');
      return response.data.data;
    },
    refetchInterval: 30000, // Refetch every 30s
  });
};
