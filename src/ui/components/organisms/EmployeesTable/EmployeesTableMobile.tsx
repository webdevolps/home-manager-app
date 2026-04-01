import React from 'react';
import { Badge } from '../../atoms/Badge/Badge';
import { Button } from '../../atoms/Button/Button';
import { EmployeesTableVariantProps } from './EmployeesTableDesktop';

const styles = {
  mobileWrapper: 'block md:hidden flex flex-col gap-4 p-4',
  mobileCard: 'bg-slate-800/50 rounded-xl p-5 shadow-lg border border-slate-700/50 flex flex-col gap-3',
  mobileRow: 'flex justify-between items-center',
  mobileLabel: 'text-xs text-slate-400 font-bold uppercase tracking-widest',
  textPrimary: 'text-base font-bold text-slate-100 transition-colors',
  textSecondary: 'text-sm text-slate-400 font-medium',
};

export const EmployeesTableMobile: React.FC<EmployeesTableVariantProps> = ({ employees, onToggleStatus }) => {
  return (
    <div className={styles.mobileWrapper}>
      {employees.map((employee) => (
        <div key={employee.id} className={styles.mobileCard}>
          <div>
            <div className={styles.textPrimary}>{employee.name}</div>
            <div className={styles.textSecondary}>{employee.email}</div>
          </div>
          <div className={styles.mobileRow}>
            <span className={styles.mobileLabel}>Rol</span>
            <span className={styles.textSecondary}>{employee.role}</span>
          </div>
          <div className={styles.mobileRow}>
            <span className={styles.mobileLabel}>Estado</span>
            <Badge status={employee.status as 'active' | 'inactive'} />
          </div>
          <div className="pt-2 border-t border-slate-700/50 mt-1">
            <Button
              variant={employee.status === 'active' ? 'danger' : 'secondary'}
              onClick={() => onToggleStatus(employee.id, employee.status)}
              className="w-full justify-center !py-2 text-sm"
            >
              {employee.status === 'active' ? 'Suspender Acceso' : 'Activar Acceso'}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
