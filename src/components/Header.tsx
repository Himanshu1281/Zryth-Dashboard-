import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { supabase } from '../config/supabase';

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  const { currentUser } = useAuth();
  const [initials, setInitials] = useState('U');
  const [fullName, setFullName] = useState('User');

  // Extract the page name from the title, e.g., "Analytics - Zryth AI Voice" -> "Analytics"
  const pageName = title.split(' - ')[0];

  useEffect(() => {
    if (currentUser) {
      // Fetch full name from the users table
      supabase
        .from('users')
        .select('full_name')
        .eq('id', currentUser.id)
        .single()
        .then(({ data, error }) => {
          let name = '';
          if (data && data.full_name) {
            name = data.full_name;
          } else if (currentUser.email) {
            name = currentUser.email.split('@')[0];
          }
          
          if (name) {
            setFullName(name);
            const parts = name.trim().split(' ');
            if (parts.length > 1) {
              setInitials((parts[0][0] + parts[parts.length - 1][0]).toUpperCase());
            } else if (parts.length === 1 && parts[0].length > 0) {
              setInitials((parts[0][0] + (parts[0].length > 1 ? parts[0][1] : '')).toUpperCase());
            }
          }
        });
    }
  }, [currentUser]);
  
  return (
    <header className="h-16 flex-shrink-0 bg-[#0e0e0f] border-b border-[rgba(255,255,255,0.08)] px-8 flex items-center justify-between z-10 w-full">
      {/* Breadcrumb / Title */}
      <div className="flex items-center gap-2 text-xs">
        <span className="text-neutral-400 font-medium tracking-wide uppercase">Enterprise Workspace</span>
        <span className="text-neutral-600">/</span>
        <span className="text-neutral-200 font-semibold">{pageName}</span>
      </div>

      {/* Trailing Actions */}
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800/60 transition-colors" title="Notifications">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
          </svg>
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
        </button>
        <Link to="/settings" className="w-8 h-8 rounded-full bg-gradient-to-tr from-neutral-800 to-neutral-700 border border-[rgba(255,255,255,0.15)] flex items-center justify-center text-white text-xs font-semibold hover:border-primary/50 transition-colors cursor-pointer" title={`Profile: ${fullName}`}>
          {initials}
        </Link>
      </div>
    </header>
  );
}
