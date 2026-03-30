import React, { useEffect } from 'react';
import { useUsers } from '../../../hooks/useUsers';
import { UserTable } from '../../components/organisms/UserTable/UserTable';

const styles = {
  container: 'w-full h-full flex flex-col',
  header: 'mb-8',
  title: 'text-3xl font-bold bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent',
  subtitle: 'text-sm text-gray-400 mt-2',
};

const ManagementPage: React.FC = () => {
  const { users, isLoading, error, fetchUsers, toggleUserStatus } = useUsers();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Control Hub</h1>
        <p className={styles.subtitle}>Supervisa y administra el acceso de los empleados de tu institución.</p>
      </header>

      {error ? (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
          Error al cargar los empleados: {error}
        </div>
      ) : (
        <UserTable 
          users={users} 
          isLoading={isLoading} 
          onToggleStatus={toggleUserStatus}
        />
      )}
    </div>
  );
};

export default ManagementPage;
