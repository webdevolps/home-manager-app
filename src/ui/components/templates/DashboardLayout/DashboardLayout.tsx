import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../organisms/Sidebar/Sidebar';

const styles = {
  layout: 'flex h-screen bg-slate-900 text-white overflow-hidden selection:bg-indigo-500/30',
  mainContent: 'flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar',
};

export const DashboardLayout: React.FC = () => {
  return (
    <div className={styles.layout}>
      {/* Sidebar Fijo en Desktop */}
      <Sidebar />
      
      {/* Área Dinámica Principal */}
      <main className={styles.mainContent}>
        {/* React Router inyecta la página que corresponda */}
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
