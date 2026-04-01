import React, { useEffect } from 'react';
import { useEmployees } from '../../../hooks/useEmployees';
import EmployeesTable from '../../components/organisms/EmployeesTable/EmployeesTable';
import PageHeader from '../../components/molecules/PageHeader/PageHeader';
import { LoadingView, EmptyView } from '../../components/molecules/StateViews/StateViews';

const styles = {
  container: 'w-full max-w-6xl mx-auto space-y-10 py-6',
};

export const EmployeesPage: React.FC = () => {
  const { employees, isLoading, error, getEmployees, toggleStatus } = useEmployees();

  useEffect(() => {
    getEmployees();
  }, [getEmployees]);

  const renderContent = () => {
    if (isLoading) return <LoadingView message="Cargando plantilla de empleados..." />;
    if (!employees || employees.length === 0) return <EmptyView message="No hay empleados registrados en la institución." />;
    return <EmployeesTable employees={employees} onToggleStatus={toggleStatus} />;
  };

  return (
    <div className={styles.container}>
      <PageHeader 
        title="Control Hub"
        subtitle="Supervisa y administra el acceso de los empleados de tu institución."
      />

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 font-medium">
          Error al cargar los empleados: {error}
        </div>
      )}

      {renderContent()}
    </div>
  );
};

export default EmployeesPage;
