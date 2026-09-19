import { Layout } from '../components/Layout';
import { useState, useEffect } from 'react';

export function PhoneNumbers() {
  const [showModal, setShowModal] = useState(false);
  const [vobizNumbers, setVobizNumbers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [inventoryNumbers, setInventoryNumbers] = useState<any[]>([]);
  const [inventoryLoading, setInventoryLoading] = useState(false);
  const [inventoryPage, setInventoryPage] = useState(1);
  const [inventoryTotalPages, setInventoryTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'unassigned'>('all');

  const fetchInventoryNumbers = async (page: number = 1, searchParam: string = '') => {
    setInventoryLoading(true);
    try {
      const authId = import.meta.env.VITE_VOBIZ_AUTH_ID;
      const authToken = import.meta.env.VITE_VOBIZ_AUTH_TOKEN;
      
      let url = `https://api.vobiz.ai/api/v1/Account/${authId}/inventory/numbers?per_page=50&page=${page}`;
      if (searchParam) {
        url += `&search=${encodeURIComponent(searchParam)}`;
      }

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "X-Auth-ID": authId,
          "X-Auth-Token": authToken,
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      });

      const raw = await response.text();
      if (!response.ok) {
        console.error(`Vobiz API Error (${response.status}):`, raw);
        return;
      }

      try {
        const data = JSON.parse(raw);
        
        if (data.total && data.per_page) {
          setInventoryTotalPages(Math.ceil(data.total / data.per_page));
        }

        let numbersArray: any[] = [];
        if (data && data.data && Array.isArray(data.data)) {
          numbersArray = data.data;
        } else if (data && data.objects && Array.isArray(data.objects)) {
          numbersArray = data.objects;
        } else if (data && data.items && Array.isArray(data.items)) {
          numbersArray = data.items;
        } else if (Array.isArray(data)) {
          numbersArray = data;
        }
        
        setInventoryNumbers(numbersArray);
      } catch (e) {
        console.error("Vobiz returned non-JSON:", raw);
      }
    } catch (err) {
      console.error("Failed to fetch Vobiz inventory numbers:", err);
    } finally {
      setInventoryLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    if (showModal) {
      setInventoryPage(1);
      fetchInventoryNumbers(1, debouncedSearchQuery);
    }
  }, [showModal, debouncedSearchQuery]);

  const fetchVobizNumbers = async () => {
    setLoading(true);
    try {
      const authId = import.meta.env.VITE_VOBIZ_AUTH_ID;
      const authToken = import.meta.env.VITE_VOBIZ_AUTH_TOKEN;
      
      const response = await fetch(`https://api.vobiz.ai/api/v1/Account/${authId}/numbers`, {
        method: "GET",
        headers: {
          "X-Auth-ID": authId,
          "X-Auth-Token": authToken,
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      });

      const raw = await response.text();
      if (!response.ok) {
        console.error(`Vobiz API Error (${response.status}):`, raw);
        return;
      }

      try {
        const data = JSON.parse(raw);
        let numbersArray: any[] = [];
        if (Array.isArray(data)) {
          numbersArray = data;
        } else if (data && data.objects && Array.isArray(data.objects)) {
          numbersArray = data.objects;
        } else if (data && data.data && Array.isArray(data.data)) {
          numbersArray = data.data;
        } else if (data && data.numbers && Array.isArray(data.numbers)) {
          numbersArray = data.numbers;
        } else if (data && data.results && Array.isArray(data.results)) {
          numbersArray = data.results;
        } else if (data && data.items && Array.isArray(data.items)) {
          numbersArray = data.items;
        }
        
        setVobizNumbers(numbersArray);
      } catch (e) {
        console.error("Vobiz returned non-JSON:", raw);
      }
    } catch (err) {
      console.error("Failed to fetch Vobiz numbers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVobizNumbers();
  }, []);

  const totalNumbers = vobizNumbers.length;
  const activeNumbers = vobizNumbers.filter(n => n.status === 'active').length;
  const unassignedNumbers = totalNumbers; // Assuming all are unassigned for now until agent mapping is built
  const totalRenewal = vobizNumbers.reduce((sum, n) => sum + (n.monthly_fee || 0), 0);
  const currencySymbol = vobizNumbers.length > 0 ? (vobizNumbers[0].currency === 'INR' ? '₹' : '$') : '₹';

  return (
    <Layout disablePadding={true} title="Phone Numbers">
      <div className="p-4 sm:p-8 space-y-6 max-w-[1440px] mx-auto w-full">
        <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" data-purpose="page-header">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Phone Numbers</h1>
            <p className="text-sm text-neutral-400 mt-0.5">{totalNumbers} numbers on your account</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setShowModal(true)} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary hover:bg-primary-container text-white text-xs font-semibold transition shadow-lg active:scale-95">
              <span className="material-symbols-outlined text-[16px]">add</span>
              <span>Buy Number</span>
            </button>
          </div>
        </section>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container-high shadow-md flex items-center justify-between">
            <div>
              <p className="text-xs text-on-surface-variant font-medium">Total Numbers</p>
              <p className="text-xl font-bold text-on-surface mt-1 font-mono-label">{totalNumbers}</p>
            </div>
            <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[20px]">format_list_numbered</span>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container-high shadow-md flex items-center justify-between">
            <div>
              <p className="text-xs text-on-surface-variant font-medium">Active Numbers</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xl font-bold text-on-surface font-mono-label">{activeNumbers}</span>
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
              <p className="text-xl font-bold text-on-surface mt-1 font-mono-label">{currencySymbol}{totalRenewal.toLocaleString()} <span className="text-xs font-normal text-on-surface-variant">/ mo</span></p>
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
                <button 
                  onClick={() => setActiveTab('all')} 
                  type="button" 
                  className={`px-3 py-1 rounded-md font-medium transition ${activeTab === 'all' ? 'bg-primary text-white shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
                >
                  All ({totalNumbers})
                </button>
                <button 
                  onClick={() => setActiveTab('active')} 
                  type="button" 
                  className={`px-3 py-1 rounded-md font-medium transition ${activeTab === 'active' ? 'bg-primary text-white shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
                >
                  Active ({activeNumbers})
                </button>
                <button 
                  onClick={() => setActiveTab('unassigned')} 
                  type="button" 
                  className={`px-3 py-1 rounded-md font-medium transition ${activeTab === 'unassigned' ? 'bg-primary text-white shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
                >
                  Unassigned ({unassignedNumbers})
                </button>
              </div>
              <button onClick={fetchVobizNumbers} type="button" title="Refresh" className={`p-1.5 rounded-lg transition ${loading ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'}`}>
                <span className={`material-symbols-outlined text-[18px] ${loading ? 'animate-spin' : ''}`}>refresh</span>
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
                {loading ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-on-surface-variant text-sm">
                      <div className="flex items-center justify-center gap-2">
                        <div className="animate-spin w-4 h-4 border-2 border-primary border-t-transparent rounded-full"></div>
                        Fetching Vobiz numbers...
                      </div>
                    </td>
                  </tr>
                ) : vobizNumbers.length > 0 ? (
                  vobizNumbers
                    .filter((numberObj) => {
                      if (activeTab === 'active') return numberObj.status === 'active';
                      if (activeTab === 'unassigned') return !numberObj.assigned_to;
                      return true;
                    })
                    .map((numberObj: any, index: number) => (
                    <tr key={index} className="hover:bg-surface-container/30 transition group">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-surface-container border border-surface-container-high flex items-center justify-center text-sm flex-shrink-0">
                            {numberObj.country === 'IN' ? '🇮🇳' : numberObj.country === 'US' ? '🇺🇸' : '📞'}
                          </div>
                          <div>
                            <span className="font-mono-label font-semibold text-on-surface tracking-wide block">
                              {numberObj.e164 || numberObj.number || numberObj.phone_number}
                            </span>
                            <span className="text-[11px] text-on-surface-variant flex items-center gap-1.5 mt-0.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span> {numberObj.region || 'Vobiz API'}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-primary-container/20 border border-primary-container/30 text-primary font-medium">
                          <span>Unassigned</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5">
                          {numberObj.voice_enabled && <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface border border-surface-container-high text-[10px] font-medium">Voice</span>}
                          {numberObj.sms_enabled && <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface border border-surface-container-high text-[10px] font-medium">SMS</span>}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full font-medium text-[11px] ${numberObj.status === 'active' ? 'bg-tertiary-container/20 text-tertiary border border-tertiary/20' : 'bg-surface-container text-on-surface-variant border border-surface-container-high'}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${numberObj.status === 'active' ? 'bg-tertiary animate-pulse' : 'bg-on-surface-variant'}`}></span> {numberObj.status || 'Active'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-on-surface-variant font-mono-label text-[11px]">
                        {numberObj.purchased_at 
                          ? new Date(numberObj.purchased_at).toLocaleDateString() 
                          : numberObj.created_at 
                            ? new Date(numberObj.created_at).toLocaleDateString() 
                            : 'Today'}
                      </td>
                      <td className="py-3.5 px-4 text-on-surface font-mono-label font-medium">
                        {numberObj.currency === 'INR' ? '₹' : '$'}{numberObj.monthly_fee || 0}<span className="text-on-surface-variant text-[10px]">/mo</span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-1">
                          <button type="button" className="px-2.5 py-1 rounded-md bg-surface-container hover:bg-surface-container-high text-on-surface border border-surface-container-high text-xs font-medium transition">Configure</button>
                          <button type="button" className="p-1 rounded-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition">
                            <span className="material-symbols-outlined text-[16px]">more_vert</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-surface-container border border-surface-container-high flex items-center justify-center text-on-surface-variant mb-3">
                          <span className="material-symbols-outlined text-[24px]">sim_card_alert</span>
                        </div>
                        <p className="text-sm font-semibold text-on-surface">No phone numbers found</p>
                        <p className="text-xs text-on-surface-variant mt-1 max-w-sm">
                          Your Vobiz account successfully connected, but there are no phone numbers in your inventory.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
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
                <input 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-surface-container-low border border-surface-container-high rounded-lg px-3.5 py-2 text-xs text-on-surface focus:outline-none focus:border-primary transition" 
                  placeholder="e.g. India, +91, US, or area code" 
                  type="text" 
                />
              </div>
              <div className="space-y-2">
                <span className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider">Available Inventory</span>
                
                <div className="max-h-60 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                  {inventoryLoading ? (
                    <div className="flex justify-center items-center py-8">
                      <div className="animate-spin w-5 h-5 border-2 border-primary border-t-transparent rounded-full"></div>
                    </div>
                  ) : inventoryNumbers.length > 0 ? (
                    inventoryNumbers
                      .map((invNum: any, idx: number) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-surface-container-lowest border border-surface-container-high">
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded bg-surface-container flex items-center justify-center text-xs font-mono-label">
                            {invNum.country === 'IN' ? '🇮🇳' : invNum.country === 'US' ? '🇺🇸' : '📞'}
                          </div>
                          <div>
                            <p className="text-xs font-mono-label font-medium text-on-surface">{invNum.e164}</p>
                            <p className="text-[10px] text-on-surface-variant">{invNum.region || invNum.country} • {invNum.voice_enabled ? 'Voice' : ''}{invNum.voice_enabled && invNum.sms_enabled ? ' & ' : ''}{invNum.sms_enabled ? 'SMS' : ''}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-on-surface">
                            {invNum.currency === 'INR' ? '₹' : '$'}{invNum.monthly_fee}<span className="text-[10px] text-on-surface-variant">/mo</span>
                          </span>
                          <button className="px-3 py-1 bg-primary hover:bg-primary-container text-white text-[11px] font-medium rounded-md shadow-sm transition">Buy</button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 text-xs text-on-surface-variant">
                      No numbers found in inventory.
                    </div>
                  )}
                </div>
                
                {/* Pagination Controls */}
                <div className="flex items-center justify-between pt-2">
                  <button 
                    disabled={inventoryPage <= 1 || inventoryLoading}
                    onClick={() => { 
                      const newPage = inventoryPage - 1;
                      setInventoryPage(newPage); 
                      fetchInventoryNumbers(newPage, debouncedSearchQuery); 
                    }}
                    className="px-3 py-1.5 text-[11px] font-medium rounded-md bg-surface-container hover:bg-surface-container-high disabled:opacity-50 disabled:cursor-not-allowed text-on-surface transition"
                  >
                    Previous
                  </button>
                  <span className="text-[10px] text-on-surface-variant font-mono-label">
                    Page {inventoryPage} of {inventoryTotalPages}
                  </span>
                  <button 
                    disabled={inventoryPage >= inventoryTotalPages || inventoryLoading}
                    onClick={() => { 
                      const newPage = inventoryPage + 1;
                      setInventoryPage(newPage); 
                      fetchInventoryNumbers(newPage, debouncedSearchQuery); 
                    }}
                    className="px-3 py-1.5 text-[11px] font-medium rounded-md bg-surface-container hover:bg-surface-container-high disabled:opacity-50 disabled:cursor-not-allowed text-on-surface transition"
                  >
                    Next
                  </button>
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
