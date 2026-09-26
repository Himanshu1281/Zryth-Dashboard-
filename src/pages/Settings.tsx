import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../layouts/Layout';
import toast from 'react-hot-toast';
import { supabase } from '../config/supabase';
import { useAuth } from '../context/AuthContext';

export function Settings() {
  const [theme, setTheme] = useState<'dark' | 'light' | 'auto'>('dark');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Profile Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Enterprise Administrator');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [timezone, setTimezone] = useState('est');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  useEffect(() => {
    async function loadProfile() {
      if (!currentUser) return;
      
      // Email is always available from Auth
      setEmail(currentUser.email || '');
      
      // Fetch custom profile from database
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', currentUser.id)
        .single();
        
      if (data) {
        setFullName(data.full_name || '');
        setCompany(data.company || '');
        if (data.role) setRole(data.role);
        if (data.phone) setPhone(data.phone);
        if (data.timezone) setTimezone(data.timezone);
        if (data.avatar_url) setAvatarUrl(data.avatar_url);
      }
    }
    loadProfile();
  }, [currentUser]);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    
    if (currentUser) {
      await supabase
        .from('users')
        .update({
          full_name: fullName,
          company: company,
          role: role,
          phone: phone,
          timezone: timezone,
          avatar_url: avatarUrl
        })
        .eq('id', currentUser.id);
    }
    
    setIsSaving(false);
    setSaveSuccess(true);
    window.dispatchEvent(new Event('profileUpdated'));
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmation !== 'DELETE') return;
    
    if (!currentUser) {
      toast.error("No active session found.");
      return;
    }
    
    setIsDeleting(true);
    
    try {
      // 1. Call the secure RPC function to delete the user completely
      const { error } = await supabase.rpc('delete_user');
        
      if (error) {
        console.error("Supabase RPC deletion error:", error);
        throw new Error(`Failed to securely delete user profile and auth record. Database says: ${error.message || JSON.stringify(error)}`);
      }
      
      // 2. Sign out the local session
      await logout();
      
      // 3. Redirect
      navigate('/login');
    } catch (err: any) {
      console.error("Error deleting account:", err);
      toast.error(err.message || "Failed to delete account. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const getInitials = () => {
    if (fullName) {
      const parts = fullName.trim().split(' ').filter(p => p.length > 0);
      if (parts.length > 1) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
      } else if (parts.length === 1) {
        return (parts[0][0] + (parts[0].length > 1 ? parts[0][1] : '')).toUpperCase();
      }
    }
    if (email) {
      return email.slice(0, 2).toUpperCase();
    }
    return 'US';
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.size > 2 * 1024 * 1024) {
      toast.error('File size must be less than 2MB');
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarUrl(reader.result as string);
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveAvatar = async () => {
    setAvatarUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
    if (currentUser) {
      await supabase
        .from('users')
        .update({ avatar_url: null })
        .eq('id', currentUser.id);
        
      window.dispatchEvent(new Event('profileUpdated'));
    }
  };

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
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className={`px-5 py-2 rounded-lg font-body-sm font-semibold transition-all flex items-center gap-2 ${
                saveSuccess 
                  ? 'bg-tertiary-container text-on-tertiary-container shadow-[0_0_16px_rgba(40,167,69,0.35)]' 
                  : 'bg-primary-container hover:bg-primary-container/90 text-on-primary-container shadow-[0_0_16px_rgba(37,99,235,0.35)]'
              }`} 
              type="button"
            >
              {isSaving ? (
                <div className="w-[18px] h-[18px] border-2 border-on-primary-container border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <span className="material-symbols-outlined text-[18px]">{saveSuccess ? 'done_all' : 'check_circle'}</span>
              )}
              <span>{isSaving ? 'Saving...' : saveSuccess ? 'Saved!' : 'Save Changes'}</span>
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
                  <label className="relative group cursor-pointer block">
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      onChange={handleAvatarChange}
                      className="hidden" 
                      accept="image/png, image/jpeg, image/webp" 
                    />
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary-container via-secondary-container to-tertiary flex items-center justify-center text-white font-headline-md font-bold shadow-lg shadow-primary/20 uppercase overflow-hidden">
                      {avatarUrl ? (
                        <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        getInitials()
                      )}
                    </div>
                    <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className={`material-symbols-outlined text-white text-[20px] ${isUploading ? 'animate-spin' : ''}`}>
                        {isUploading ? 'progress_activity' : 'photo_camera'}
                      </span>
                    </div>
                  </label>
                  <div className="flex flex-col">
                    <span className="font-body-md font-semibold text-on-surface">{fullName || 'Unknown User'}</span>
                    <span className="font-mono-label text-outline text-[12px]">ID: {currentUser?.id?.slice(0, 8).toUpperCase() || 'UNKNOWN'}</span>
                    <span className="font-body-sm text-on-surface-variant text-[12px] mt-0.5">Recommended: Square JPG, PNG or WebP, up to 2MB.</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 self-start sm:self-center">
                  <button onClick={handleRemoveAvatar} className="px-3 py-1.5 rounded-lg bg-surface-container-low hover:bg-error-container/30 text-on-surface-variant hover:text-error font-body-sm transition-colors flex items-center gap-1" type="button">
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
                    <input className="w-full bg-transparent font-body-sm text-on-surface focus:outline-none" type="text" value={fullName} onChange={e => setFullName(e.target.value)} />
                  </div>
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label className="font-label-md text-outline uppercase">Email Address</label>
                    <span className="font-mono-label text-tertiary text-[11px] flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">lock</span>
                      Auth Protected
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-surface-container opacity-70 cursor-not-allowed">
                    <span className="material-symbols-outlined text-outline text-[18px]">mail</span>
                    <input className="w-full bg-transparent font-body-sm text-on-surface focus:outline-none cursor-not-allowed" type="email" value={email} disabled />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-label-md text-outline uppercase">Role / Title</label>
                  <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-surface-container focus-within:ring-1 focus-within:ring-primary transition-all">
                    <span className="material-symbols-outlined text-outline text-[18px]">work</span>
                    <input className="w-full bg-transparent font-body-sm text-on-surface focus:outline-none" type="text" value={role} onChange={e => setRole(e.target.value)} />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-label-md text-outline uppercase">Direct Phone Line</label>
                  <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-surface-container focus-within:ring-1 focus-within:ring-primary transition-all">
                    <span className="material-symbols-outlined text-outline text-[18px]">phone</span>
                    <input className="w-full bg-transparent font-body-sm text-on-surface focus:outline-none" type="text" value={phone} onChange={e => setPhone(e.target.value)} />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-label-md text-outline uppercase">Organization Account</label>
                  <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-surface-container focus-within:ring-1 focus-within:ring-primary transition-all">
                    <span className="material-symbols-outlined text-outline text-[18px]">corporate_fare</span>
                    <input className="w-full bg-transparent font-body-sm text-on-surface focus:outline-none" type="text" value={company} onChange={e => setCompany(e.target.value)} />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-label-md text-outline uppercase">Telemetry Timezone</label>
                  <div className="relative">
                    <select className="w-full appearance-none px-3.5 py-2.5 rounded-xl bg-surface-container font-body-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-primary transition-all cursor-pointer" value={timezone} onChange={e => setTimezone(e.target.value)}>
                      <option value="est">(UTC-05:00) Eastern Time (US & Canada)</option>
                      <option value="pst">(UTC-08:00) Pacific Time (US & Canada)</option>
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
                {/* Dark Mode Option */}
                <div 
                  onClick={() => setTheme('dark')}
                  className={`theme-card group relative p-4 rounded-xl cursor-pointer transition-all flex flex-col justify-between ${theme === 'dark' ? 'active ring-2 ring-primary bg-surface-container-high' : 'bg-surface-container hover:bg-surface-container-high'}`}
                >
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
                    <div className={`theme-radio-marker w-5 h-5 rounded-full flex items-center justify-center transition-colors ${theme === 'dark' ? 'bg-primary-container text-on-primary' : 'bg-surface-container-highest text-transparent'}`}>
                      <span className="material-symbols-outlined text-[14px]">check</span>
                    </div>
                  </div>
                </div>

                {/* Light Mode Option */}
                <div 
                  onClick={() => setTheme('light')}
                  className={`theme-card group relative p-4 rounded-xl cursor-pointer transition-all flex flex-col justify-between ${theme === 'light' ? 'active ring-2 ring-primary bg-surface-container-high' : 'bg-surface-container hover:bg-surface-container-high'}`}
                >
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
                    <div className={`theme-radio-marker w-5 h-5 rounded-full flex items-center justify-center transition-colors ${theme === 'light' ? 'bg-primary-container text-on-primary' : 'bg-surface-container-highest text-transparent'}`}>
                      <span className="material-symbols-outlined text-[14px]">check</span>
                    </div>
                  </div>
                </div>

                {/* Sync with System */}
                <div 
                  onClick={() => setTheme('auto')}
                  className={`theme-card group relative p-4 rounded-xl cursor-pointer transition-all flex flex-col justify-between ${theme === 'auto' ? 'active ring-2 ring-primary bg-surface-container-high' : 'bg-surface-container hover:bg-surface-container-high'}`}
                >
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
                    <div className={`theme-radio-marker w-5 h-5 rounded-full flex items-center justify-center transition-colors ${theme === 'auto' ? 'bg-primary-container text-on-primary' : 'bg-surface-container-highest text-transparent'}`}>
                      <span className="material-symbols-outlined text-[14px]">check</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Danger Zone: Delete Account */}
            <div className="bg-error-container/10 border border-error/20 rounded-xl p-6 mt-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-headline-md text-lg text-error tracking-tight">Delete Account</h3>
                  <p className="font-body-sm text-on-surface-variant mt-1">
                    Permanently remove your account, profile, and all associated data from Zryth. This action is irreversible.
                  </p>
                </div>
                <button 
                  onClick={() => setShowDeleteModal(true)}
                  className="shrink-0 px-4 py-2 rounded-lg bg-error hover:bg-error/90 text-on-error font-body-sm font-semibold transition-colors"
                >
                  Delete Account
                </button>
              </div>
            </div>
            
          </div>
        </div>
      </div>
      
      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface-container-low border border-surface-container-high rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-error-container text-error flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-[28px]">warning</span>
              </div>
              <h2 className="text-xl font-bold text-on-surface mb-2">Delete Account?</h2>
              <p className="text-sm text-on-surface-variant mb-6">
                Are you absolutely sure you want to delete your account? All your data records will be permanently erased and cannot be retrieved.
              </p>
              
              <label className="block text-xs font-semibold text-on-surface-variant uppercase mb-2">
                Type <span className="text-error font-bold tracking-wider">DELETE</span> to confirm
              </label>
              <input 
                type="text"
                value={deleteConfirmation}
                onChange={(e) => setDeleteConfirmation(e.target.value)}
                className="w-full bg-surface-container border border-error/50 rounded-lg px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:border-error transition-colors placeholder:text-outline"
                placeholder="DELETE"
              />
            </div>
            <div className="p-4 border-t border-surface-container-high bg-surface-container flex justify-end gap-3">
              <button 
                onClick={() => { setShowDeleteModal(false); setDeleteConfirmation(''); }}
                className="px-4 py-2 rounded-lg hover:bg-surface-container-high text-on-surface text-sm font-medium transition-colors"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button 
                onClick={handleDeleteAccount}
                disabled={deleteConfirmation !== 'DELETE' || isDeleting}
                className="px-4 py-2 rounded-lg bg-error hover:bg-error/90 text-on-error text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isDeleting && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>}
                {isDeleting ? 'Deleting...' : 'Delete Account'}
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
