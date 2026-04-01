import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../hooks/useAuth';
import { Button } from '../../atoms/Button/Button';

// Estilo Glassmorphism Premium
const styles = {
  container: 'fixed inset-y-0 left-0 bg-slate-900/90 backdrop-blur-3xl border-r border-slate-700/50 flex flex-col z-50 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]',
  brandBox: 'h-24 flex items-center justify-center border-b border-slate-700/30 px-8',
  brandText: 'text-3xl font-black bg-gradient-to-br from-blue-400 via-indigo-400 to-white bg-clip-text text-transparent transform hover:scale-105 transition-all duration-300 cursor-default tracking-tighter',
  navList: 'flex-1 py-8 px-5 space-y-3 overflow-y-auto custom-scrollbar',
  navItemBase: 'flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 font-bold tracking-tight',
  navItemInactive: 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-100 hover:translate-x-1',
  navItemActive: 'bg-gradient-to-r from-indigo-500/10 to-transparent text-indigo-300 border border-indigo-500/20 shadow-lg shadow-indigo-500/5',
  footer: 'p-6 border-t border-slate-700/30 bg-slate-900/50',
  logoutButton: 'w-full py-4 rounded-2xl font-bold transition-all duration-300 hover:shadow-xl hover:shadow-red-500/10 active:scale-95',
};

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/');
    onClose();
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      <aside className={`${styles.container} ${isOpen ? 'translate-x-0 w-72' : '-translate-x-full lg:translate-x-0 lg:w-72'}`}>
        <div className={styles.brandBox}>
          <span className={styles.brandText}>Agnes</span>
        </div>

        <nav className={styles.navList}>
          <NavLink
            to="/dashboard"
            end
            onClick={onClose}
            className={({ isActive }) => 
              `${styles.navItemBase} ${isActive ? styles.navItemActive : styles.navItemInactive}`
            }
          >
            {/* Dashboard Icon */}
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Dashboard
          </NavLink>

          <NavLink
            to="/dashboard/management"
            onClick={onClose}
            className={({ isActive }) => 
              `${styles.navItemBase} ${isActive ? styles.navItemActive : styles.navItemInactive}`
            }
          >
            {/* Settings Icon */}
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Control Hub
          </NavLink>

          <NavLink
            to="/dashboard/legacy"
            onClick={onClose}
            className={({ isActive }) => 
              `${styles.navItemBase} ${isActive ? styles.navItemActive : styles.navItemInactive}`
            }
          >
            {/* External Link Icon */}
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Legacy Launcher
          </NavLink>
        </nav>

        <div className={styles.footer}>
          <Button 
            variant="secondary" 
            onClick={handleLogout} 
            className={styles.logoutButton}
          >
            Cerrar Sesión
          </Button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
