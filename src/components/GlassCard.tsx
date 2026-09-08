

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'primary' | 'secondary' | 'tertiary';
  hoverEffect?: boolean;
}

export function GlassCard({ children, className = '', glowColor, hoverEffect = false }: GlassCardProps) {
  const glowClass = glowColor === 'primary' ? 'glow-bg-primary' : 
                    glowColor === 'tertiary' ? 'glow-bg-tertiary' : '';

  const hoverClasses = hoverEffect ? "group transition-all duration-300 hover:border-white/20 hover:-translate-y-1" : "";

  return (
    <div style={{
      background: '#0A0A0B',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderTop: '1px solid rgba(255, 255, 255, 0.15)',
      position: 'relative',
      overflow: 'hidden',
    }} className={`${hoverClasses} rounded-xl p-6 ${className}`}>
      {glowColor && (
        <div className={`absolute inset-0 ${glowClass} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
      )}
      <div className="relative z-10 flex flex-col h-full">
        {children}
      </div>
    </div>
  );
}
