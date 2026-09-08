
import { Layout } from '../components/Layout';

export function KnowledgeBase() {
  return (
    <Layout title="Knowledge Base - Maya AI">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-8">
        <h3 className="font-headline-lg text-3xl font-bold text-on-surface tracking-tight">Knowledge Base</h3>
        <p className="font-body-md text-base text-on-surface-variant mt-1">Manage documents and data sources.</p>
        <div className="glass-panel p-6 rounded-xl">
          <p>Knowledge Base content coming soon...</p>
        </div>
      </div>
    </Layout>
  );
}
