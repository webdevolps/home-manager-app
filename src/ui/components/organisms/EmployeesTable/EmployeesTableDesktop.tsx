import React from 'react';
import { Badge } from '../../atoms/Badge/Badge';
import { Button } from '../../atoms/Button/Button';
import { Employee } from '../../../../hooks/useEmployees';

export interface EmployeesTableVariantProps {
  employees: Employee[];
  onToggleStatus: (userId: string, currentStatus: string) => void;
}

const styles = {
  tableWrapper: 'hidden md:block overflow-x-auto',
  table: 'min-w-full divide-y divide-slate-800',
  thead: 'bg-slate-950/30 backdrop-blur-md',
  th: 'px-8 py-5 text-left text-xs font-black text-slate-400 uppercase tracking-widest',
  tbody: 'divide-y divide-slate-800/50 bg-transparent',
  tr: 'hover:bg-indigo-500/5 transition-colors duration-300 group',
  td: 'px-8 py-5 whitespace-nowrap align-middle',
  textPrimary: 'text-base font-bold text-slate-100 md:group-hover:text-white transition-colors',
  textSecondary: 'text-sm text-slate-400 font-medium',
};

export const EmployeesTableDesktop: React.FC<EmployeesTableVariantProps> = ({ employees, onToggleStatus }) => {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th scope="col" className={styles.th}>Nombre</th>
            <th scope="col" className={styles.th}>Rol</th>
            <th scope="col" className={styles.th}>Estado</th>
            <th scope="col" className={styles.th}>Acción</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {employees.map((employee) => (
            <tr key={employee.id} className={styles.tr}>
              <td className={styles.td}>
                <div className={styles.textPrimary}>{employee.name}</div>
                <div className={styles.textSecondary}>{employee.email}</div>
              </td>
              <td className={styles.td}>
                <div className={styles.textSecondary}>{employee.role}</div>
              </td>
              <td className={styles.td}>
                <Badge status={employee.status as 'active' | 'inactive'} />
              </td>
              <td className={styles.td}>
                <Button
                  variant={employee.status === 'active' ? 'danger' : 'secondary'}
                  onClick={() => onToggleStatus(employee.id, employee.status)}
                  className="!px-3 !py-1 text-xs"
                >
                  {employee.status === 'active' ? 'Suspender' : 'Activar'}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
