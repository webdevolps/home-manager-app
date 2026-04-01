import React from 'react';
import { Card } from '../../../components/atoms/Card/Card';

interface StatusCardProps {
  currentTenantId: string | null;
  userName: string;
}

const styles = {
  header: 'flex justify-between items-start mb-8',
  title: 'text-2xl font-black text-slate-800 tracking-tight',
  statusBadge: 'inline-flex items-center px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-green-100 text-green-700 border border-green-200 shadow-sm',
  section: 'space-y-6',
  label: 'text-xs font-bold text-slate-500 uppercase tracking-widest mb-1',
  value: 'text-lg text-slate-900 font-extrabold truncate'
};

export const StatusCard: React.FC<StatusCardProps> = ({ currentTenantId, userName }) => {
  return (
    <Card className="hover:shadow-xl transition-all duration-300 border-slate-200/60 !bg-white">
      <div className={styles.header}>
        <h2 className={styles.title}>Estatus de Entorno</h2>
        <span className={styles.statusBadge}>Online</span>
      </div>
      
      <div className={styles.section}>
        <div>
          <p className={styles.label}>Environment Hash</p>
          <p className={styles.value} title={currentTenantId ?? ''}>
            {currentTenantId || 'No asignado'}
          </p>
        </div>
        <div>
          <p className={styles.label}>Session Owner</p>
          <p className={styles.value}>
            {userName}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default StatusCard;
