import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { Dashboard } from './pages/Dashboard';
import { Analytics } from './pages/Analytics';
import { KnowledgeBase } from './pages/KnowledgeBase';
import { AllCalls } from './pages/AllCalls';
import { CallTranscript } from './pages/CallTranscript';

import { Settings } from './pages/Settings';
import { VoiceAgents } from './pages/VoiceAgents';
import { PhoneNumbers } from './pages/PhoneNumbers';
import { Prompts } from './pages/Prompts';
import { Tools } from './pages/Tools';

import { ProtectedRoute } from './components/ProtectedRoute';
import { ErrorBoundary } from './components/ErrorBoundary';

import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Retry network/server errors, never client errors (401/403/404/409...)
      retry: (count, error: any) => {
        const status = error?.status ?? 0;
        return status >= 400 && status < 500 ? false : count < 2;
      },
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-right" toastOptions={{
        style: {
          background: '#1a1a22',
          color: '#fff',
          border: '1px solid #2b2b36',
          fontSize: '14px',
          borderRadius: '8px'
        },
      }} />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            
            {/* Protected Routes */}
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
            <Route path="/calls" element={<ProtectedRoute><AllCalls /></ProtectedRoute>} />
            <Route path="/calls/:id" element={<ProtectedRoute><CallTranscript /></ProtectedRoute>} />
            <Route path="/knowledge" element={<ProtectedRoute><KnowledgeBase /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="/agents" element={<ProtectedRoute><VoiceAgents /></ProtectedRoute>} />
            <Route path="/phone-numbers" element={<ProtectedRoute><PhoneNumbers /></ProtectedRoute>} />
            <Route path="/prompts" element={<ProtectedRoute><Prompts /></ProtectedRoute>} />
            <Route path="/tools" element={<ProtectedRoute><Tools /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
