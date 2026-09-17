import React, { useEffect } from 'react';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Drawer({ isOpen, onClose, children }: DrawerProps) {
  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-[55] transition-opacity" 
          onClick={onClose}
        ></div>
      )}

      {/* Slide-out Panel */}
      <div 
        className={`fixed inset-y-0 right-0 w-full max-w-xl bg-surface-container-lowest/95 backdrop-blur-2xl shadow-2xl z-[60] transform transition-transform duration-300 ease-in-out flex flex-col border-l border-surface-container-high ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {children}
      </div>
    </>
  );
}
