import { Layout } from '../components/Layout';

export function Settings() {
  return (
    <Layout disablePadding={true} title="Settings">
      <div className="p-4 sm:p-8 space-y-6 max-w-[1440px] mx-auto w-full">
        {/* Top Action / Breadcrumb Bar Synchronizer */}
        <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" data-purpose="page-header">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Settings</h1>
            <p className="text-sm text-neutral-400 mt-0.5">Manage your workspace preferences and configurations.</p>
          </div>
          {/* Quick Action Controls */}
          <div className="flex items-center gap-4 self-start lg:self-center">
            <button className="px-4 py-2 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-body-sm transition-colors flex items-center gap-1.5" type="button">
              <span className="material-symbols-outlined text-[18px]">replay</span>
              <span>Discard</span>
            </button>
            <button className="px-5 py-2 rounded-lg bg-primary-container hover:bg-primary-container/90 text-on-primary-container font-body-sm font-semibold transition-all shadow-[0_0_16px_rgba(37,99,235,0.35)] flex items-center gap-2" type="button">
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              <span>Save Changes</span>
            </button>
          </div>
        </section>

        {/* Primary Layout Bento Grid */}
        <div className="grid grid-cols-1 gap-8">
          <div className="flex flex-col gap-8">
            
            {/* Card: Profile & Identity */}
            <div className="bg-[#1c1b1c] border border-[rgba(255,255,255,0.08)] rounded-xl p-6">
              <div className="flex items-start justify-between pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[22px]">account_circle</span>
                  </div>
                  <div>
                    <h2 className="font-headline-md text-2xl text-on-surface tracking-tight">Identity &amp; Profile</h2>
                    <span className="font-label-md text-outline">PRIMARY ADMINISTRATIVE HOLDER</span>
                  </div>
                </div>
              </div>

              {/* Avatar Management Box */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-surface-container mb-8">
                <div className="flex items-center gap-4">
                  <div className="relative group">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary-container via-secondary-container to-tertiary flex items-center justify-center text-white font-headline-md font-bold shadow-lg shadow-primary/20">
                      OP
                    </div>
                    <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <span className="material-symbols-outlined text-white text-[20px]">photo_camera</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-body-md font-semibold text-on-surface">Omkar Patel</span>
                    <span className="font-mono-label text-outline text-[12px]">UID: ZRYTH-USR-9941</span>
                    <span className="font-body-sm text-on-surface-variant text-[12px] mt-0.5">Recommended: Square JPG, PNG or WebP, up to 2MB.</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 self-start sm:self-center">
                  <button className="px-3 py-1.5 rounded-lg bg-surface-container-low hover:bg-error-container/30 text-on-surface-variant hover:text-error font-body-sm transition-colors flex items-center gap-1" type="button">
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                    <span className="hidden sm:inline">Remove</span>
                  </button>
                </div>
              </div>

              {/* Detailed Form Input Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-md text-outline uppercase">Full Legal Name</label>
                  <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-surface-container focus-within:ring-1 focus-within:ring-primary transition-all">
                    <span className="material-symbols-outlined text-outline text-[18px]">person</span>
                    <input className="w-full bg-transparent font-body-sm text-on-surface focus:outline-none" type="text" defaultValue="Omkar Patel" />
                  </div>
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label className="font-label-md text-outline uppercase">Email Address</label>
                    <span className="font-mono-label text-tertiary text-[11px] flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">check_circle</span>
                      Verified
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-surface-container focus-within:ring-1 focus-within:ring-primary transition-all">
                    <span className="material-symbols-outlined text-outline text-[18px]">mail</span>
                    <input className="w-full bg-transparent font-body-sm text-on-surface focus:outline-none" type="email" defaultValue="omkar@zrythrealty.com" />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-label-md text-outline uppercase">Role / Title</label>
                  <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-surface-container focus-within:ring-1 focus-within:ring-primary transition-all">
                    <span className="material-symbols-outlined text-outline text-[18px]">work</span>
                    <input className="w-full bg-transparent font-body-sm text-on-surface focus:outline-none" type="text" defaultValue="Enterprise Administrator" />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-label-md text-outline uppercase">Direct Phone Line</label>
                  <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-surface-container focus-within:ring-1 focus-within:ring-primary transition-all">
                    <span className="material-symbols-outlined text-outline text-[18px]">phone</span>
                    <input className="w-full bg-transparent font-body-sm text-on-surface focus:outline-none" type="text" defaultValue="+1 (555) 019-2834" />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-label-md text-outline uppercase">Organization Account</label>
                  <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-surface-container focus-within:ring-1 focus-within:ring-primary transition-all">
                    <span className="material-symbols-outlined text-outline text-[18px]">corporate_fare</span>
                    <input className="w-full bg-transparent font-body-sm text-on-surface focus:outline-none" type="text" defaultValue="Zryth Realty Corp" />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-label-md text-outline uppercase">Telemetry Timezone</label>
                  <div className="relative">
                    <select className="w-full appearance-none px-3.5 py-2.5 rounded-xl bg-surface-container font-body-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-primary transition-all cursor-pointer" defaultValue="est">
                      <option value="est">(UTC-05:00) Eastern Time (US &amp; Canada)</option>
                      <option value="pst">(UTC-08:00) Pacific Time (US &amp; Canada)</option>
                      <option value="utc">(UTC+00:00) Coordinated Universal Time</option>
                      <option value="ist">(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-3 text-outline pointer-events-none text-[18px]">expand_more</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card: Appearance & Interface Themes */}
            <div className="bg-[#1c1b1c] border border-[rgba(255,255,255,0.08)] rounded-xl p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-tertiary/10 flex items-center justify-center text-tertiary">
                    <span className="material-symbols-outlined text-[22px]">dark_mode</span>
                  </div>
                  <div>
                    <h2 className="font-headline-md text-2xl text-on-surface tracking-tight">Appearance &amp; Interface</h2>
                    <span className="font-label-md text-outline">WORKSPACE VISUAL CANVAS ENGINE</span>
                  </div>
                </div>
              </div>

              {/* 3-Choice Theme Cards Layout */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Dark Mode Option (Active) */}
                <div className="theme-card active group relative p-4 rounded-xl cursor-pointer transition-all flex flex-col justify-between ring-2 ring-primary bg-surface-container-high">
                  <div className="w-full h-24 rounded-lg bg-surface-container-lowest p-2.5 flex flex-col justify-between overflow-hidden mb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-error"></span>
                        <span className="w-2 h-2 rounded-full bg-primary"></span>
                        <span className="w-2 h-2 rounded-full bg-tertiary"></span>
                      </div>
                      <span className="font-mono-label text-[10px] text-outline">#0E0E0F</span>
                    </div>
                    <div className="space-y-1.5">
                      <div className="h-2 w-3/4 bg-surface-container-high rounded"></div>
                      <div className="h-2 w-1/2 bg-primary-container rounded"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <div>
                      <span className="font-body-sm font-semibold text-on-surface block">Dark Mode</span>
                      <span className="font-label-md text-outline">Enterprise Default</span>
                    </div>
                    <div className="theme-radio-marker w-5 h-5 rounded-full bg-primary-container text-on-primary flex items-center justify-center">
                      <span className="material-symbols-outlined text-[14px] text-white">check</span>
                    </div>
                  </div>
                </div>

                {/* Light Mode Option */}
                <div className="theme-card group relative p-4 rounded-xl bg-surface-container hover:bg-surface-container-high cursor-pointer transition-all flex flex-col justify-between">
                  <div className="w-full h-24 rounded-lg bg-[#f4f5f8] p-2.5 flex flex-col justify-between overflow-hidden mb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#cbd5e1]"></span>
                        <span className="w-2 h-2 rounded-full bg-[#94a3b8]"></span>
                      </div>
                      <span className="font-mono-label text-[10px] text-[#64748b]">#F4F5F8</span>
                    </div>
                    <div className="space-y-1.5">
                      <div className="h-2 w-3/4 bg-[#cbd5e1] rounded"></div>
                      <div className="h-2 w-1/2 bg-[#2563eb] rounded"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <div>
                      <span className="font-body-sm font-semibold text-on-surface block">Light Mode</span>
                      <span className="font-label-md text-outline">High Lumens</span>
                    </div>
                    <div className="theme-radio-marker w-5 h-5 rounded-full bg-surface-container-highest flex items-center justify-center">
                      <span className="material-symbols-outlined text-[14px] text-transparent">check</span>
                    </div>
                  </div>
                </div>

                {/* Sync with System */}
                <div className="theme-card group relative p-4 rounded-xl bg-surface-container hover:bg-surface-container-high cursor-pointer transition-all flex flex-col justify-between">
                  <div className="w-full h-24 rounded-lg bg-gradient-to-r from-surface-container-lowest to-[#cbd5e1] p-2.5 flex flex-col justify-between overflow-hidden mb-3">
                    <div className="flex items-center justify-between">
                      <span className="material-symbols-outlined text-primary text-[16px]">settings_brightness</span>
                      <span className="font-mono-label text-[10px] text-white">AUTO</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="h-2 w-1/3 bg-primary rounded"></div>
                      <div className="h-2 w-1/3 bg-[#2563eb] rounded"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <div>
                      <span className="font-body-sm font-semibold text-on-surface block">Sync with System</span>
                      <span className="font-label-md text-outline">OS Responsive</span>
                    </div>
                    <div className="theme-radio-marker w-5 h-5 rounded-full bg-surface-container-highest flex items-center justify-center">
                      <span className="material-symbols-outlined text-[14px] text-transparent">check</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
