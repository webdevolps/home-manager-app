import React from 'react';
import { Badge } from '../../atoms/Badge/Badge';
import { Button } from '../../atoms/Button/Button';
import { Employee } from '../../../../hooks/useUsers';

export interface UserTableProps {
  users: Employee[];
  isLoading: boolean;
  onToggleStatus: (userId: string, currentStatus: string) => void;
}

const styles = {
  container: 'overflow-hidden rounded-xl border border-white/20 bg-white/40 backdrop-blur-xl shadow-lg',
  table: 'min-w-full divide-y divide-gray-200/50',
  thead: 'bg-white/50 backdrop-blur-md',
  th: 'px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider',
  tbody: 'divide-y divide-gray-200/50 bg-white/20',
  tr: 'hover:bg-white/40 transition-colors duration-200',
  td: 'px-6 py-4 whitespace-nowrap',
  textPrimary: 'text-sm font-medium text-gray-900',
  textSecondary: 'text-sm text-gray-500',
  emptyState: 'px-6 py-12 text-center text-sm text-gray-500',
  loadingState: 'px-6 py-12 text-center text-sm text-indigo-500 font-medium'
};

export const UserTable: React.FC<UserTableProps> = ({ users, isLoading, onToggleStatus }) => {
  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingState}>Cargando plantilla de empleados...</div>
      </div>
    );
  }

  if (!users || users.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyState}>No hay empleados registrados en la institución.</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className="overflow-x-auto">
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
            {users.map((user) => (
              <tr key={user.id} className={styles.tr}>
                <td className={styles.td}>
                  <div className={styles.textPrimary}>{user.name}</div>
                  <div className={styles.textSecondary}>{user.email}</div>
                </td>
                <td className={styles.td}>
                  <div className={styles.textSecondary}>{user.role}</div>
                </td>
                <td className={styles.td}>
                  <Badge status={user.status as 'active' | 'inactive'} />
                </td>
                <td className={styles.td}>
                  <Button
                    variant={user.status === 'active' ? 'danger' : 'secondary'}
                    onClick={() => onToggleStatus(user.id, user.status)}
                    className="!px-3 !py-1 text-xs"
                  >
                    {user.status === 'active' ? 'Suspender' : 'Activar'}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
