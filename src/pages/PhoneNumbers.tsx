import { Layout } from '../components/Layout';
import { useState } from 'react';

export function PhoneNumbers() {
  const [showModal, setShowModal] = useState(false);

  return (
    <Layout title="Phone Numbers">
      <div className="flex flex-col w-full pb-16 max-w-[1440px] mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
          <div className="flex items-start gap-3.5">
            <div className="mt-0.5 p-2 rounded-lg bg-primary-container/20 border border-primary-container/30 text-primary">
              <span className="material-symbols-outlined text-[20px]">phone</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-on-surface tracking-tight flex items-center gap-2">
                Phone Numbers
              </h1>
              <p className="text-xs text-on-surface-variant mt-0.5">3 numbers on your account</p>
            </div>
          </div>
          <button onClick={() => setShowModal(true)} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary hover:bg-primary-container text-white text-xs font-semibold transition shadow-lg active:scale-95">
            <span className="material-symbols-outlined text-[16px]">add</span>
            <span>Buy Number</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container-high shadow-md flex items-center justify-between">
            <div>
              <p className="text-xs text-on-surface-variant font-medium">Total Numbers</p>
              <p className="text-xl font-bold text-on-surface mt-1 font-mono-label">3</p>
            </div>
            <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[20px]">format_list_numbered</span>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container-high shadow-md flex items-center justify-between">
            <div>
              <p className="text-xs text-on-surface-variant font-medium">Active Numbers</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xl font-bold text-on-surface font-mono-label">2</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-tertiary-container/20 text-tertiary border border-tertiary/20 font-medium">In Service</span>
              </div>
            </div>
            <div className="w-9 h-9 rounded-lg bg-tertiary/10 border border-tertiary/20 flex items-center justify-center text-tertiary">
              <span className="material-symbols-outlined text-[20px]">check_circle</span>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container-high shadow-md flex items-center justify-between">
            <div>
              <p className="text-xs text-on-surface-variant font-medium">Inbound Routing</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
                <span className="text-sm font-semibold text-on-surface">Enabled</span>
              </div>
            </div>
            <div className="w-9 h-9 rounded-lg bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[20px]">route</span>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container-high shadow-md flex items-center justify-between">
            <div>
              <p className="text-xs text-on-surface-variant font-medium">Monthly Renewal</p>
              <p className="text-xl font-bold text-on-surface mt-1 font-mono-label">₹2,450 <span className="text-xs font-normal text-on-surface-variant">/ mo</span></p>
            </div>
            <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[20px]">payments</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-surface-container-low border border-surface-container-high shadow-2xl overflow-hidden flex flex-col">
          <div className="p-4 border-b border-surface-container-high flex flex-col sm:flex-row items-center justify-between gap-3 bg-surface-container/50">
            <div className="relative w-full sm:w-80">
              <span className="material-symbols-outlined text-on-surface-variant absolute left-3 top-2 text-[18px]">search</span>
              <input type="text" placeholder="Search number or agent..." className="w-full bg-surface-container border border-surface-container-high rounded-lg pl-9 pr-3.5 py-1.5 text-xs text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition" />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
              <div className="flex items-center p-0.5 rounded-lg bg-surface-container border border-surface-container-high text-xs">
                <button type="button" className="px-3 py-1 rounded-md bg-primary text-white font-medium shadow-sm">All (3)</button>
                <button type="button" className="px-3 py-1 rounded-md text-on-surface-variant hover:text-on-surface transition">Active (2)</button>
                <button type="button" className="px-3 py-1 rounded-md text-on-surface-variant hover:text-on-surface transition">Unassigned (1)</button>
              </div>
              <button type="button" title="Refresh" className="p-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition">
                <span className="material-symbols-outlined text-[18px]">refresh</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-surface-container-high bg-surface-container/50 text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider">
                  <th className="py-3 px-4">Phone Number</th>
                  <th className="py-3 px-4">Assigned Voice Agent</th>
                  <th className="py-3 px-4">Capabilities</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Added Date</th>
                  <th className="py-3 px-4">Renewal</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-high">
                <tr className="hover:bg-surface-container/30 transition group">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-surface-container border border-surface-container-high flex items-center justify-center text-sm flex-shrink-0">
                        🇺🇸
                      </div>
                      <div>
                        <span className="font-mono-label font-semibold text-on-surface tracking-wide block">+1 (555) 019-2834</span>
                        <span className="text-[11px] text-on-surface-variant flex items-center gap-1.5 mt-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Primary Inbound
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-primary-container/20 border border-primary-container/30 text-primary font-medium">
                      <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                      <span>Maya - Real Estate</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface border border-surface-container-high text-[10px] font-medium">Voice</span>
                      <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface border border-surface-container-high text-[10px] font-medium">SMS</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-tertiary-container/20 text-tertiary border border-tertiary/20 font-medium text-[11px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse"></span> Active
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-on-surface-variant font-mono-label text-[11px]">Oct 12, 2024</td>
                  <td className="py-3.5 px-4 text-on-surface font-mono-label font-medium">₹850<span className="text-on-surface-variant text-[10px]">/mo</span></td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="inline-flex items-center gap-1">
                      <button type="button" className="px-2.5 py-1 rounded-md bg-surface-container hover:bg-surface-container-high text-on-surface border border-surface-container-high text-xs font-medium transition">Configure</button>
                      <button type="button" className="p-1 rounded-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition">
                        <span className="material-symbols-outlined text-[16px]">more_vert</span>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-2xl bg-surface-container border border-surface-container-high shadow-2xl p-6 text-on-surface">
            <div className="flex items-center justify-between border-b border-surface-container-high pb-4 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-md bg-primary/10 text-primary">
                  <span className="material-symbols-outlined text-[18px]">phone</span>
                </div>
                <h3 className="text-sm font-semibold text-on-surface">Purchase Virtual Number</h3>
              </div>
              <button onClick={() => setShowModal(false)} className="text-on-surface-variant hover:text-on-surface p-1 rounded-md hover:bg-surface-container-high">
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-on-surface-variant mb-1.5">Search Country or Prefix</label>
                <input className="w-full bg-surface-container-low border border-surface-container-high rounded-lg px-3.5 py-2 text-xs text-on-surface focus:outline-none focus:border-primary transition" placeholder="e.g. +1 (United States) or area code" type="text" />
              </div>
              <div className="space-y-2">
                <span className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider">Available Inventory</span>
                <div className="flex items-center justify-between p-3 rounded-lg bg-surface-container-lowest border border-surface-container-high">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded bg-surface-container flex items-center justify-center text-xs font-mono-label">🇺🇸</div>
                    <div>
                      <p className="text-xs font-mono-label font-medium text-on-surface">+1 (555) 019-2834</p>
                      <p className="text-[10px] text-on-surface-variant">United States • Voice &amp; SMS</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-on-surface">₹160/mo</span>
                    <button className="px-3 py-1 bg-primary hover:bg-primary-container text-white text-xs font-medium rounded-md">Select</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between pt-4 border-t border-surface-container-high text-xs text-on-surface-variant">
              <span>Current Wallet: <strong className="text-on-surface font-mono-label">₹0.00</strong></span>
              <div className="flex gap-2">
                <button onClick={() => setShowModal(false)} className="px-3.5 py-1.5 rounded-lg border border-surface-container-high hover:bg-surface-container text-on-surface font-medium">Cancel</button>
                <button className="px-3.5 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-medium border border-surface-container-highest">Add Funds</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
