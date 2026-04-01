import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchEmployees, toggleEmployeeStatus } from '../store/employees/employeesSlice';

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  tenant_id: string;
}

export const useEmployees = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  const employees = useSelector((state: RootState) => state.employees.employees);
  const isLoading = useSelector((state: RootState) => state.employees.isLoading);
  const error = useSelector((state: RootState) => state.employees.error);
  const currentTenantId = useSelector((state: RootState) => state.auth.currentTenantId);

  const getEmployees = useCallback(() => {
    if (currentTenantId) {
      dispatch(fetchEmployees(currentTenantId));
    }
  }, [currentTenantId, dispatch]);

  const toggleStatus = useCallback((employeeId: string, currentStatus: string) => {
    dispatch(toggleEmployeeStatus({ employeeId, currentStatus }));
  }, [dispatch]);

  return {
    employees,
    isLoading,
    error,
    getEmployees,
    toggleStatus
  };
};
