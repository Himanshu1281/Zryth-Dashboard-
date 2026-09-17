import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { Dashboard } from './pages/Dashboard';
import { Analytics } from './pages/Analytics';
import { KnowledgeBase } from './pages/KnowledgeBase';
import { AllCalls } from './pages/AllCalls';
import { CallTranscript } from './pages/CallTranscript';
import BehaviorGreetings from './pages/BehaviorGreetings';
import { Settings } from './pages/Settings';
import { VoiceAgents } from './pages/VoiceAgents';
import { PhoneNumbers } from './pages/PhoneNumbers';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/calls" element={<AllCalls />} />
            <Route path="/calls/:id" element={<CallTranscript />} />
            <Route path="/knowledge" element={<KnowledgeBase />} />
            <Route path="/behavior" element={<BehaviorGreetings />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/agents" element={<VoiceAgents />} />
            <Route path="/phone-numbers" element={<PhoneNumbers />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
