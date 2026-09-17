import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex h-screen w-screen overflow-hidden selection:bg-primary-container selection:text-on-primary-container bg-background text-on-surface">
      {/* Left Side: Visual/Brand */}
      <div className="hidden lg:flex w-1/2 relative bg-surface-container-lowest border-r border-white/5 items-center justify-center overflow-hidden">
        {/* Background Graphic */}
        <img 
          alt="AI Voice Analytics 3D Glassmorphic Wave" 
          className="absolute inset-0 w-full h-full object-cover opacity-80" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPsX-XTXJlB4YvPn_BorzXCi1mcQB5Uk7lnUFPZo3etMRaxOXfqvyNiMJ1lbyORvaGIoIRz8TaZM2mTFTxEfH0NXJGfnsP7PPvtIXaeKscFQMezU0tgP4ySaz7bWlBYeqQRanEgHd2dmVxBM4-RKjLzOQYqDwvpVVdDt-cW_j8T2I7p5LUmJoTXYnUV0rksdn_2v_EBRDUIfF4EJWfYUZbHV1Ewq6_hbJC36JQdcK0I8JYPV6cybPX7cK3BYKJ2XKdgY5lSYJrit8I"
        />
        {/* Gradient Overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent"></div>
        
        {/* Brand Content Overlay */}
        <div className="relative z-10 flex flex-col items-start justify-center h-full px-16 max-w-lg">
          <div className="flex items-center gap-3 mb-stack-lg">
            <div className="h-10 w-10 bg-primary-container rounded-lg flex items-center justify-center shadow-[0_0_24px_rgba(37,99,235,0.15)]">
              <span className="material-symbols-outlined text-on-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>graphic_eq</span>
            </div>
            <span className="font-headline-lg text-3xl font-semibold text-on-surface tracking-tight">Maya AI</span>
          </div>
          <h1 className="font-display-lg text-5xl font-bold text-on-surface mb-stack-md leading-tight tracking-tight">
            Intelligence in every conversation.
          </h1>
          <p className="font-body-lg text-lg text-on-surface-variant max-w-md mt-4">
            The premium B2B voice analytics platform engineered for enterprise-level stakeholders. Clarity amidst complex datasets.
          </p>
          
          {/* Small subtle indicator */}
          <div className="absolute bottom-16 left-16 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></div>
            <span className="font-mono-label text-sm text-on-surface-variant font-medium tracking-wide">System Status: Optimal</span>
          </div>
        </div>
      </div>

      {/* Right Side: Form Area */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-[#0A0A0B] relative overflow-hidden">
        {/* Subtle Radial Glow behind form */}
        <div className="absolute w-[600px] h-[600px] bg-primary-container/5 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="w-full max-w-md px-8 sm:px-12 py-4 relative z-10 flex flex-col justify-center h-full">
          {/* Mobile Brand Header */}
          <div className="lg:hidden flex items-center gap-3 mb-6 justify-center">
            <div className="h-8 w-8 bg-primary-container rounded-md flex items-center justify-center shadow-[0_0_24px_rgba(37,99,235,0.15)]">
              <span className="material-symbols-outlined text-on-primary-container text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>graphic_eq</span>
            </div>
            <span className="font-headline-md text-2xl font-semibold text-on-surface">Maya AI</span>
          </div>
          
          {children}
        </div>
      </div>
    </div>
  );
}
