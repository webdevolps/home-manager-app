import React from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { Card } from '../../components/atoms/Card/Card';

const styles = {
  container: 'w-full max-w-5xl mx-auto space-y-6',
  header: 'mb-8 border-b border-slate-700/50 pb-6',
  title: 'text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mb-2',
  subtitle: 'text-slate-400 text-lg',
  grid: 'grid grid-cols-1 md:grid-cols-2 gap-6',
  propertyLabel: 'text-sm text-slate-400 font-medium mb-1',
  propertyValue: 'text-lg text-slate-200 font-semibold truncate',
  statusBadge: 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20',
};

export const DashboardPage: React.FC = () => {
  const { user, currentTenantId } = useAuth();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Instancia Virtual</h1>
        <p className={styles.subtitle}>Super Usuario conectado exitosamente al portal de administración.</p>
      </header>

      <div className={styles.grid}>
        <Card className="hover:border-indigo-500/50 transition-colors">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-xl font-semibold text-indigo-400">Estado del Tenant</h2>
            <span className={styles.statusBadge}>Activo</span>
          </div>
          
          <div className="space-y-5">
            <div>
              <p className={styles.propertyLabel}>ID de Entorno (Tenant ID)</p>
              <p className={styles.propertyValue} title={currentTenantId ?? ''}>
                {currentTenantId || 'No asignado'}
              </p>
            </div>
            <div>
              <p className={styles.propertyLabel}>Dueño del Entorno</p>
              <p className={styles.propertyValue} title={user?.email}>
                {user?.name || user?.email || 'Desconocido'}
              </p>
            </div>
          </div>
        </Card>

        <Card className="hover:border-blue-500/50 transition-colors">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-xl font-semibold text-blue-400">Nivel de Acceso</h2>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
              Root / Super Admin
            </span>
          </div>
          <div className="space-y-4 text-slate-300 text-base leading-relaxed">
            <p>
              Actualmente posees la llave maestra al entorno y a la base de datos distribuida 
              por *RLS (Row Level Security)*. 
            </p>
            <p>
              Desde este hub podrás gestionar empleados, habilitar accesos al backend heredado y supervisar operaciones en tiempo real.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
