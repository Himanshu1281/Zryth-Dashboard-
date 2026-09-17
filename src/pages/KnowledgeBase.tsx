import { Layout } from '../components/Layout';

export function KnowledgeBase() {
  return (
    <Layout disablePadding={true} title="Knowledge Base">
      <div 
        className="p-4 sm:p-8 space-y-6 max-w-[1440px] mx-auto w-full min-h-full"
        style={{ background: 'radial-gradient(circle at center, rgba(37,99,235,0.05) 0%, transparent 70%)' }}
      >
        <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" data-purpose="page-header">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Knowledge Base</h1>
            <p className="text-sm text-neutral-400 mt-0.5">Upload and manage documents for your AI to learn from.</p>
          </div>
        </section>

        {/* Upload Section */}
        <section className="bg-[#1c1b1c] border border-[rgba(255,255,255,0.08)] rounded-xl p-8 text-center border-dashed hover:border-neutral-700 transition-colors duration-300 cursor-pointer group">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center group-hover:bg-primary-container/20 transition-colors">
              <span className="material-symbols-outlined text-4xl text-on-surface-variant group-hover:text-primary transition-colors">cloud_upload</span>
            </div>
            <h3 className="font-headline-md text-2xl font-bold text-on-surface">Drag and Drop PDF here</h3>
            <p className="font-body-md text-base text-on-surface-variant max-w-md mx-auto">
              Supports PDF files up to 50MB. Documents are automatically vectorized and synced to the Supabase backend.
            </p>
            <button className="mt-4 bg-transparent border border-white/15 text-on-surface px-6 py-2 rounded-lg font-label-md text-xs uppercase tracking-wider hover:bg-white/5 transition-colors font-semibold">
              Browse Files
            </button>
          </div>
        </section>

        {/* Document Table */}
        <section className="space-y-4">
          <h3 className="font-headline-md text-2xl font-bold text-on-surface">Uploaded Documents</h3>
          <div className="bg-[#1c1b1c] border border-[rgba(255,255,255,0.08)] rounded-xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-surface-container-lowest/50">
                  <th className="py-4 px-6 font-label-md text-xs text-on-surface-variant opacity-50 uppercase tracking-wider font-semibold">Document Name</th>
                  <th className="py-4 px-6 font-label-md text-xs text-on-surface-variant opacity-50 uppercase tracking-wider font-semibold">Upload Date</th>
                  <th className="py-4 px-6 font-label-md text-xs text-on-surface-variant opacity-50 uppercase tracking-wider font-semibold">Status</th>
                  <th className="py-4 px-6 font-label-md text-xs text-on-surface-variant opacity-50 uppercase tracking-wider font-semibold">Size</th>
                  <th className="py-4 px-6 font-label-md text-xs text-on-surface-variant opacity-50 uppercase tracking-wider font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="font-body-sm text-sm text-on-surface">
                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                  <td className="py-4 px-6 flex items-center gap-3">
                    <span className="material-symbols-outlined text-outline">description</span>
                    Q3_Financial_Report.pdf
                  </td>
                  <td className="py-4 px-6 font-mono-label text-[13px] text-on-surface-variant">2023-10-24</td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-tertiary-container/20 text-tertiary border border-tertiary/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                      Vectorized
                    </span>
                  </td>
                  <td className="py-4 px-6 font-mono-label text-[13px] text-on-surface-variant">2.4 MB</td>
                  <td className="py-4 px-6 text-right space-x-2">
                    <button className="text-outline hover:text-primary transition-colors opacity-50 group-hover:opacity-100">
                      <span className="material-symbols-outlined text-sm">visibility</span>
                    </button>
                    <button className="text-outline hover:text-error transition-colors opacity-50 group-hover:opacity-100">
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </td>
                </tr>

                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                  <td className="py-4 px-6 flex items-center gap-3">
                    <span className="material-symbols-outlined text-outline">description</span>
                    Employee_Handbook_2023.pdf
                  </td>
                  <td className="py-4 px-6 font-mono-label text-[13px] text-on-surface-variant">2023-10-22</td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-container/20 text-primary border border-primary/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                      Processing
                    </span>
                  </td>
                  <td className="py-4 px-6 font-mono-label text-[13px] text-on-surface-variant">15.1 MB</td>
                  <td className="py-4 px-6 text-right space-x-2">
                    <button className="text-outline hover:text-primary transition-colors opacity-50 group-hover:opacity-100">
                      <span className="material-symbols-outlined text-sm">visibility</span>
                    </button>
                    <button className="text-outline hover:text-error transition-colors opacity-50 group-hover:opacity-100">
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-white/5 transition-colors group">
                  <td className="py-4 px-6 flex items-center gap-3">
                    <span className="material-symbols-outlined text-outline">description</span>
                    Product_Architecture_v2.pdf
                  </td>
                  <td className="py-4 px-6 font-mono-label text-[13px] text-on-surface-variant">2023-10-18</td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-tertiary-container/20 text-tertiary border border-tertiary/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                      Vectorized
                    </span>
                  </td>
                  <td className="py-4 px-6 font-mono-label text-[13px] text-on-surface-variant">8.7 MB</td>
                  <td className="py-4 px-6 text-right space-x-2">
                    <button className="text-outline hover:text-primary transition-colors opacity-50 group-hover:opacity-100">
                      <span className="material-symbols-outlined text-sm">visibility</span>
                    </button>
                    <button className="text-outline hover:text-error transition-colors opacity-50 group-hover:opacity-100">
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </Layout>
  );
}
