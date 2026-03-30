import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../hooks/useAuth';
import { Button } from '../../atoms/Button/Button';

// Estilo Glassmorphism Premium
const styles = {
  container: 'w-64 h-full min-h-screen bg-slate-900/60 backdrop-blur-xl border-r border-slate-700/50 flex flex-col',
  brandBox: 'h-20 flex items-center justify-center border-b border-slate-700/50 shadow-[0_4px_30px_rgba(0,0,0,0.1)]',
  brandText: 'text-2xl font-extrabold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent transform hover:scale-105 transition-transform cursor-default',
  navList: 'flex-1 py-6 px-4 space-y-2 overflow-y-auto',
  navItemBase: 'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium',
  navItemInactive: 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200',
  navItemActive: 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-[inset_0px_0px_10px_rgba(99,102,241,0.1)]',
  footer: 'p-4 border-t border-slate-700/50 mt-auto',
  logoutButton: 'w-full flex justify-center',
};

export const Sidebar: React.FC = () => {
  const { logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  return (
    <aside className={styles.container}>
      <div className={styles.brandBox}>
        <span className={styles.brandText}>Agnes</span>
      </div>

      <nav className={styles.navList}>
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) => 
            `${styles.navItemBase} ${isActive ? styles.navItemActive : styles.navItemInactive}`
          }
        >
          {/* Dashboard Icon */}
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Dashboard
        </NavLink>

        <NavLink
          to="/dashboard/management"
          className={({ isActive }) => 
            `${styles.navItemBase} ${isActive ? styles.navItemActive : styles.navItemInactive}`
          }
        >
          {/* Settings Icon */}
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Control Hub
        </NavLink>

        <NavLink
          to="/dashboard/legacy"
          className={({ isActive }) => 
            `${styles.navItemBase} ${isActive ? styles.navItemActive : styles.navItemInactive}`
          }
        >
          {/* External Link Icon */}
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
  );
};

export default Sidebar;
