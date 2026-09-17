import { useQuery } from '@tanstack/react-query';
import apiClient from '../api/client';

export interface CallData {
  id: string;
  duration: number;
  sentiment: string;
  status: string;
}

export const useCalls = () => {
  return useQuery({
    queryKey: ['calls'],
    queryFn: async (): Promise<CallData[]> => {
      const response = await apiClient.get('/calls');
      return response.data.data;
    }
  });
};
