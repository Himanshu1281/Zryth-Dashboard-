export interface CallData {
  id: string;
  livekit_room: string;
  phone: string;
  customer_name: string;
  language: string;
  started_at: string;
  ended_at: string | null;
  duration_seconds: number | null;
  requirement: string;
  agent_id: string;
  status?: string;
  estimated_duration?: number | null;
  messages?: { id: string; created_at: string }[];
}

export interface MessageData {
  id: string;
  call_id: string;
  speaker: 'customer' | 'maya';
  message: string;
  created_at: string;
}
