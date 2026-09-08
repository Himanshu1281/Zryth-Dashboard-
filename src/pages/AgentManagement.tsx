
import { Layout } from '../components/Layout';

export function AgentManagement() {
  return (
    <Layout title="Agent Management - Maya AI">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-8">
        <h3 className="font-headline-lg text-3xl font-bold text-on-surface tracking-tight">Agent Management</h3>
        <p className="font-body-md text-base text-on-surface-variant mt-1">Configure and monitor your AI agents.</p>
        <div className="glass-panel p-6 rounded-xl">
          <p>Agent Management content coming soon...</p>
        </div>
      </div>
    </Layout>
  );
}
