

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="flex justify-between items-center px-6 lg:px-10 py-4 sticky top-0 z-50 w-full bg-surface/80 backdrop-blur-xl border-b border-white/5 shrink-0">
      {/* Brand / Product Name */}
      <div className="flex items-center gap-4">
        <button className="md:hidden text-on-surface-variant p-2 -ml-2 rounded-lg hover:bg-white/5">
          <span className="material-symbols-outlined">menu</span>
        </button>
        <h2 className="font-headline-md text-xl font-bold text-on-surface">{title}</h2>
      </div>

      {/* Trailing Actions */}
      <div className="flex items-center gap-6">
        <div className="hidden lg:flex items-center bg-surface-container-high rounded-full px-4 py-2 border border-white/10 w-64 hover:border-white/20 transition-colors cursor-text">
          <span className="material-symbols-outlined text-on-surface-variant mr-2" style={{ fontSize: '18px' }}>search</span>
          <input 
            className="bg-transparent border-none text-sm text-on-surface placeholder:text-outline focus:outline-none w-full p-0" 
            placeholder="Search calls, numbers..." 
            type="text" 
          />
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button className="text-on-surface-variant hover:text-primary transition-all text-sm cursor-pointer">Support</button>
          <button className="bg-primary-container/10 border border-primary-container text-primary rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider hover:bg-primary-container/20 transition-all cursor-pointer flex items-center gap-2">
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>upload_file</span>
            Upload PDF
          </button>
        </div>

        <div className="flex items-center gap-3 border-l border-white/10 pl-6">
          <button className="text-on-surface-variant hover:text-primary transition-all p-2 rounded-full hover:bg-white/5 cursor-pointer relative">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full"></span>
          </button>
          <button className="text-on-surface-variant hover:text-primary transition-all p-2 rounded-full hover:bg-white/5 cursor-pointer overflow-hidden w-9 h-9 border border-white/10">
            <img 
              alt="User Profile" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7kR0fpYy3DqqrGQta_PwVM1w3FjO7QpCJkYGGkH32DdSs_IVdyioSOEnb84wXUk0WuhIhfWeK6RHV-cohzvjzPt11NlFucBCXdj_XkYhkt9KBsueYX3nJF5onjdmFcoR-TIhljGDb_BE8wusGb1WLJuMAEEWSe4TWjfYgbn02LsHRWYRBKxL6SKMCCi2_GPniwRByoZ5wnCbgZbnNo6NbeQZ-zs_oX7taJvZgOkTyLC5toDMZoz3Q36BAayTSfiHE50WoaQXlzD1v"
            />
          </button>
        </div>
      </div>
    </header>
  );
}
