import { Layout } from '../components/Layout';
import { useState } from 'react';

export function VoiceAgents() {
  const [isShowingSample] = useState(false);

  return (
    <Layout disablePadding={true} title="Voice Agents">
      <div className="p-4 sm:p-8 space-y-6 max-w-[1440px] mx-auto w-full">
        <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" data-purpose="page-header">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Voice Agents</h1>
            <p className="text-sm text-neutral-400 mt-0.5">View the voice agents assigned to your company.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium bg-primary hover:bg-primary-container text-white transition-all shadow-sm" type="button">
              <span className="material-symbols-outlined text-[14px]">add</span>
              <span>Request New Agent</span>
            </button>
          </div>
        </section>

        {!isShowingSample ? (
          <section className="flex-1 flex flex-col items-center justify-center py-20 px-4 text-center select-none" id="empty-state-section">
            <div className="max-w-md mx-auto flex flex-col items-center text-center">
              <div className="w-24 h-24 mx-auto mb-4 bg-primary-container/20 rounded-full flex items-center justify-center text-primary drop-shadow-[0_0_20px_rgba(37,99,235,0.35)]">
                <span className="material-symbols-outlined text-4xl">smart_toy</span>
              </div>
              <h3 className="text-lg font-semibold text-on-surface tracking-tight">No agents yet</h3>
              <p className="text-sm text-on-surface-variant mt-1 max-w-sm">You don't have any voice agents configured. Request an agent or contact your administrator to set up Maya AI for your workspace.</p>
              <div className="mt-6">
                <button type="button" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium bg-primary hover:bg-primary-container text-white transition-all shadow-md">
                  <span className="material-symbols-outlined text-[14px]">add</span>
                  <span>Request New Agent</span>
                </button>
              </div>
            </div>
          </section>
        ) : (
          <div className="py-20 text-center text-on-surface-variant">
            Sample agents would appear here...
          </div>
        )}
      </div>
    </Layout>
  );
}
