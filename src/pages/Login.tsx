import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { AuthLayout } from '../components/AuthLayout';
import { useAuth } from '../context/AuthContext';

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, signInWithGoogle } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // The ProtectedRoute passes the location we tried to access before redirecting here
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    
    try {
      const { error } = await login({ email, password });
      if (error) throw error;
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || 'Failed to sign in. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <div className="mb-stack-lg mb-8">
        <h2 className="font-headline-lg text-3xl lg:text-3xl font-semibold text-on-surface mb-2">Welcome back</h2>
        <p className="font-body-sm text-sm text-on-surface-variant">Sign in to your enterprise dashboard.</p>
      </div>
      
      {error && (
        <div className="mb-4 p-3 rounded-lg bg-error/10 border border-error/20 text-error text-sm">
          {error}
        </div>
      )}
      
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* Email Field */}
        <div className="flex flex-col gap-2">
          <label className="font-label-md text-xs font-semibold text-on-surface tracking-wide uppercase" htmlFor="email">Email Address</label>
          <input 
            className="bg-surface-container-low border border-outline-variant/30 rounded-lg px-4 py-3 font-body-sm text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" 
            id="email" 
            placeholder="name@company.com" 
            required 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        
        {/* Password Field */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <label className="font-label-md text-xs font-semibold text-on-surface tracking-wide uppercase" htmlFor="password">Password</label>
            <a className="font-label-md text-xs font-semibold text-primary hover:text-primary-fixed transition-colors" href="#">Forgot Password?</a>
          </div>
          <div className="relative">
            <input 
              className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg pl-4 pr-11 py-3 font-body-sm text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" 
              id="password" 
              placeholder="••••••••" 
              required 
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors focus:outline-none flex items-center justify-center p-1"
              tabIndex={-1}
            >
              <span className="material-symbols-outlined text-[20px]">
                {showPassword ? 'visibility_off' : 'visibility'}
              </span>
            </button>
          </div>
        </div>
        
        {/* Sign In Button */}
        <button 
          className="mt-4 w-full bg-primary-container text-on-primary-container font-label-md text-sm font-semibold tracking-wide py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-primary-container/90 transition-all active:scale-[0.98] shadow-[0_0_24px_rgba(37,99,235,0.15)] disabled:opacity-70 disabled:cursor-not-allowed" 
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Signing in...' : 'Sign In'}
          {!isSubmitting && <span className="material-symbols-outlined text-[18px]">arrow_forward</span>}
        </button>
      </form>
      
      {/* Sign Up Link */}
      <div className="mt-6 text-center">
        <span className="font-body-sm text-sm text-on-surface-variant">Don't have an account? </span>
        <Link to="/signup" className="font-label-md text-sm font-semibold text-primary hover:text-primary-fixed transition-colors">
          Sign Up
        </Link>
      </div>
      
      <div className="flex items-center gap-4 my-6">
        <div className="flex-1 h-px bg-outline-variant/20"></div>
        <span className="font-label-md text-xs font-semibold text-on-surface-variant uppercase tracking-wide">OR</span>
        <div className="flex-1 h-px bg-outline-variant/20"></div>
      </div>
      
      {/* Google SSO */}
      <button 
        onClick={signInWithGoogle}
        className="w-full bg-transparent border border-outline-variant/30 text-on-surface font-label-md text-sm font-semibold tracking-wide py-3 px-4 rounded-lg flex items-center justify-center gap-3 hover:bg-white/5 transition-colors" 
        type="button"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
          <path d="M1 1h22v22H1z" fill="none"></path>
        </svg>
        Sign in with Google
      </button>
      
      {/* Footer Links */}
      <div className="mt-8 flex justify-center gap-6">
        <a className="font-label-md text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors" href="#">Privacy Policy</a>
        <a className="font-label-md text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors" href="#">Terms of Service</a>
      </div>
    </AuthLayout>
  );
}

