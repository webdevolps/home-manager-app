import React from 'react';
import { Employee } from '../../../../hooks/useEmployees';
import { EmployeesTableDesktop } from './EmployeesTableDesktop';
import { EmployeesTableMobile } from './EmployeesTableMobile';

export interface EmployeesTableProps {
  employees: Employee[];
  onToggleStatus: (userId: string, currentStatus: string) => void;
}

const styles = {
  container: 'overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-3xl shadow-2xl shadow-black/20',
};

export const EmployeesTable: React.FC<EmployeesTableProps> = ({ employees, onToggleStatus }) => {
  return (
    <div className={styles.container}>
      <EmployeesTableMobile employees={employees} onToggleStatus={onToggleStatus} />
      <EmployeesTableDesktop employees={employees} onToggleStatus={onToggleStatus} />
    </div>
  );
};

export default EmployeesTable;
