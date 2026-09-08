
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { AnalyticsDashboard } from './pages/AnalyticsDashboard';
import { AgentManagement } from './pages/AgentManagement';
import { KnowledgeBase } from './pages/KnowledgeBase';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/analytics" element={<AnalyticsDashboard />} />
        <Route path="/agents" element={<AgentManagement />} />
        <Route path="/knowledge" element={<KnowledgeBase />} />
        
        {/* Redirect root to analytics for now */}
        <Route path="/" element={<Navigate to="/analytics" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
