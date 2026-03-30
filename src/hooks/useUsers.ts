import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { UserService } from '../infrastructure/services/user.service';

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  tenant_id: string;
}

export const useUsers = () => {
  const [users, setUsers] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentTenantId = useSelector((state: RootState) => state.auth.currentTenantId);

  const fetchUsers = useCallback(async () => {
    if (!currentTenantId) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const data = await UserService.getEmployees(currentTenantId);
      setUsers(data as Employee[]);
    } catch (err: any) {
      setError(err.message || 'Error fetching users');
    } finally {
      setIsLoading(false);
    }
  }, [currentTenantId]);

  const toggleUserStatus = useCallback(async (employeeId: string, currentStatus: string) => {
    // Optimistic UI Update
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    setUsers((prev) =>
      prev.map((u) => (u.id === employeeId ? { ...u, status: newStatus as 'active' | 'inactive' } : u))
    );

    try {
      await UserService.toggleUserStatus(employeeId, currentStatus);
    } catch (err: any) {
      // Revert in case of failure
      setUsers((prev) =>
        prev.map((u) => (u.id === employeeId ? { ...u, status: currentStatus as 'active' | 'inactive' } : u))
      );
      setError('Failed to toggle user status');
    }
  }, []);

  return {
    users,
    isLoading,
    error,
    fetchUsers,
    toggleUserStatus
  };
};
