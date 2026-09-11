import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { AnalyticsDashboard } from './pages/AnalyticsDashboard';
import { KnowledgeBase } from './pages/KnowledgeBase';
import { AllCalls } from './pages/AllCalls';
import { CallTranscript } from './pages/CallTranscript';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/analytics" element={<AnalyticsDashboard />} />
        <Route path="/calls" element={<AllCalls />} />
        <Route path="/calls/:id" element={<CallTranscript />} />
        <Route path="/knowledge" element={<KnowledgeBase />} />
        
        {/* Redirect root to analytics for now */}
        <Route path="/" element={<Navigate to="/analytics" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
