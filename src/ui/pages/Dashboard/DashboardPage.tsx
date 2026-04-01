import React from 'react';
import { useAuth } from '../../../hooks/useAuth';
import StatusCard from './molecules/StatusCard';
import AuthorityCard from './molecules/AuthorityCard';
import PageHeader from '../../components/molecules/PageHeader/PageHeader';

const styles = {
  container: 'w-full max-w-6xl mx-auto space-y-10 py-6',
  grid: 'grid grid-cols-1 lg:grid-cols-2 gap-8',
};

export const DashboardPage: React.FC = () => {
  const { user, currentTenantId } = useAuth();

  return (
    <div className={styles.container}>
      <PageHeader 
        title="Instancia Virtual" 
        subtitle="Super Usuario conectado exitosamente al portal de administración." 
      />

      <div className={styles.grid}>
        <StatusCard 
          currentTenantId={currentTenantId} 
          userName={user?.name || user?.email || 'Desconocido'} 
        />
        <AuthorityCard />
      </div>
    </div>
  );
};

export default DashboardPage;
