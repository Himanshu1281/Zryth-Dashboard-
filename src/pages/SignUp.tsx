import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthLayout } from '../components/AuthLayout';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../config/supabase';

export function SignUp() {
  const navigate = useNavigate();
  const { signup, signInWithGoogle } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    
    try {
      // 0. Check if email already exists in our database
      const { data: existingUser } = await supabase
        .from('users')
        .select('email')
        .eq('email', email.trim())
        .maybeSingle();
        
      if (existingUser) {
        throw new Error("User already exist . please sign in instead.");
      }

      // 1. Create Supabase Auth User
      const { data: userCredential, error: signupError } = await signup({ email, password });
      
      if (signupError) throw signupError;
      
      const user = userCredential.user;
      
      if (!user) {
        throw new Error("Failed to retrieve user data after signup.");
      }

      // 2. Insert Profile into Supabase
      const { error: supabaseError } = await supabase
        .from('users')
        .insert([
          {
            id: user.id,
            full_name: fullName,
            email: email,
            company: company
          }
        ]);

      if (supabaseError) {
        console.error("Failed to save profile to Supabase:", supabaseError);
        // We might want to alert the user, but they are already authenticated in Firebase.
      }

      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Failed to create an account.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      {/* Card Title & Subtitle */}
      <header className="mb-5">
        <h2 className="font-headline-lg text-3xl font-bold tracking-tight text-on-surface">Create your account</h2>
        <p className="mt-1 text-sm text-on-surface-variant">Start building and analyzing AI voice agents today.</p>
      </header>
      
      {error && (
        <div className="mb-4 p-3 rounded-lg bg-error/10 border border-error/20 text-error text-sm">
          {error}
        </div>
      )}
      
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
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={company}
            onChange={(e) => setCompany(e.target.value)}
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
          <div className="relative">
            <input 
              className="w-full bg-surface-container-low border border-outline-variant/30 focus:border-primary focus:bg-surface-container-low focus:ring-1 focus:ring-primary transition-all rounded-lg pl-4 pr-11 py-2.5 text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none" 
              id="password" 
              minLength={8} 
              name="password" 
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
        
        {/* Primary CTA Submit Button */}
        <div className="pt-1">
          <button 
            className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg bg-primary-container hover:bg-primary-container/90 active:scale-[0.98] text-on-primary-container font-semibold text-sm transition-all shadow-[0_0_24px_rgba(37,99,235,0.15)] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background disabled:opacity-70 disabled:cursor-not-allowed" 
            type="submit"
            disabled={isSubmitting}
          >
            <span>{isSubmitting ? 'Creating Account...' : 'Create Account'}</span>
            {!isSubmitting && (
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            )}
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
          onClick={signInWithGoogle}
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
