import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthLayout } from '../components/AuthLayout';

export function SignUp() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <AuthLayout>
      {/* Card Title & Subtitle */}
      <header className="mb-5">
        <h2 className="font-headline-lg text-3xl font-bold tracking-tight text-on-surface">Create your account</h2>
        <p className="mt-1 text-sm text-on-surface-variant">Start building and analyzing AI voice agents today.</p>
      </header>
      
      {/* Registration Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Full Name Field */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface mb-1" htmlFor="full-name">
            Full Name
          </label>
          <input 
            className="bg-surface-container-low border border-outline-variant/30 focus:border-primary focus:bg-surface-container-low focus:ring-1 focus:ring-primary transition-all w-full rounded-lg px-4 py-2.5 text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none" 
            id="full-name" 
            name="full-name" 
            placeholder="Jane Doe" 
            required 
            type="text"
          />
        </div>
        
        {/* Work Email Field */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface mb-1" htmlFor="email">
            Work Email
          </label>
          <input 
            className="bg-surface-container-low border border-outline-variant/30 focus:border-primary focus:bg-surface-container-low focus:ring-1 focus:ring-primary transition-all w-full rounded-lg px-4 py-2.5 text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none" 
            id="email" 
            name="email" 
            placeholder="name@company.com" 
            required 
            type="email"
          />
        </div>
        
        {/* Company / Workspace Field */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface mb-1" htmlFor="company">
            Company / Workspace Name
          </label>
          <input 
            className="bg-surface-container-low border border-outline-variant/30 focus:border-primary focus:bg-surface-container-low focus:ring-1 focus:ring-primary transition-all w-full rounded-lg px-4 py-2.5 text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none" 
            id="company" 
            name="company" 
            placeholder="Acme Corp" 
            required 
            type="text"
          />
        </div>
        
        {/* Password Field */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface" htmlFor="password">
              Password
            </label>
            <span className="text-xs text-on-surface-variant">At least 8 characters</span>
          </div>
          <input 
            className="bg-surface-container-low border border-outline-variant/30 focus:border-primary focus:bg-surface-container-low focus:ring-1 focus:ring-primary transition-all w-full rounded-lg px-4 py-2.5 text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none" 
            id="password" 
            minLength={8} 
            name="password" 
            placeholder="••••••••" 
            required 
            type="password"
          />
        </div>
        
        {/* Primary CTA Submit Button */}
        <div className="pt-1">
          <button 
            className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg bg-primary-container hover:bg-primary-container/90 active:scale-[0.98] text-on-primary-container font-semibold text-sm transition-all shadow-[0_0_24px_rgba(37,99,235,0.15)] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background" 
            type="submit"
          >
            <span>Create Account</span>
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
              <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </button>
        </div>
      </form>
      
      {/* Social Divider */}
      <div className="flex items-center gap-4 my-4">
        <div className="flex-1 h-px bg-outline-variant/20"></div>
        <span className="font-label-md text-xs font-semibold text-on-surface-variant uppercase tracking-wide">OR</span>
        <div className="flex-1 h-px bg-outline-variant/20"></div>
      </div>
      
      {/* Google Social Authentication Button */}
      <div>
        <button 
          className="w-full bg-transparent border border-outline-variant/30 text-on-surface font-label-md text-sm font-semibold tracking-wide py-3 px-4 rounded-lg flex items-center justify-center gap-3 hover:bg-white/5 transition-colors" 
          type="button"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"></path>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"></path>
          </svg>
          <span>Sign up with Google</span>
        </button>
      </div>
      
      {/* Navigation Link to Sign In */}
      <p className="mt-4 text-center text-sm text-on-surface-variant">
        Already have an account?{' '}
        <Link className="font-label-md text-sm font-semibold text-primary hover:text-primary-fixed transition-colors" to="/login">Sign in</Link>
      </p>
      
      {/* Terms & Privacy Footer */}
      <footer className="mt-5 text-center text-[11px] text-on-surface-variant leading-relaxed">
        By signing up, you agree to our{' '}
        <a className="hover:text-on-surface underline underline-offset-2 transition-colors" href="#">Terms of Service</a>{' '}
        and{' '}
        <a className="hover:text-on-surface underline underline-offset-2 transition-colors" href="#">Privacy Policy</a>.
      </footer>
    </AuthLayout>
  );
}
