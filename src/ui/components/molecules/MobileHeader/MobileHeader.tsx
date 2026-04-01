import React from 'react';

export interface MobileHeaderProps {
  onToggleMenu: () => void;
  brandName?: string;
}

const styles = {
  header: 'lg:hidden fixed top-0 left-0 w-full h-16 bg-slate-900/80 backdrop-blur-lg border-b border-slate-800 z-40 flex items-center px-4',
  button: 'p-2 text-slate-400 hover:text-white transition-colors',
  brand: 'ml-4 text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent'
};

export const MobileHeader: React.FC<MobileHeaderProps> = ({ 
  onToggleMenu, 
  brandName = 'Agnes' 
}) => {
  return (
    <header className={styles.header}>
      <button 
        onClick={onToggleMenu}
        className={styles.button}
        aria-label="Toggle Menu"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <span className={styles.brand}>{brandName}</span>
    </header>
  );
};

export default MobileHeader;
