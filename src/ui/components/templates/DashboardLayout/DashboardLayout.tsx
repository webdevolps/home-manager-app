import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../organisms/Sidebar/Sidebar';
import MobileHeader from '../../molecules/MobileHeader/MobileHeader';

const styles = {
  layout: 'flex h-screen bg-slate-900 text-white overflow-hidden selection:bg-indigo-500/30',
  mainContent: 'flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar',
};

export const DashboardLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className={styles.layout}>
      <MobileHeader onToggleMenu={toggleSidebar} />

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      {/* Área Dinámica Principal */}
      <main className={`${styles.mainContent} mt-16 lg:mt-0 lg:ml-72 w-full`}>
        {/* React Router inyecta la página que corresponda */}
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
