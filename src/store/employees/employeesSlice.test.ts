import employeesReducer, {
  fetchEmployees,
  toggleEmployeeStatus,
  EmployeesState
} from './employeesSlice';
import { describe, it, expect, vi } from 'vitest';
import { Employee } from '@/hooks/useEmployees';

vi.mock('../../infrastructure/services/user.service', () => ({
  UserService: {
    getEmployees: vi.fn(),
    toggleUserStatus: vi.fn()
  }
}));

describe('employeesSlice reducer', () => {
  const initialState: EmployeesState = {
    employees: [],
    isLoading: false,
    error: null,
  };

  const mockEmployee: Employee = {
    id: 'emp-1',
    name: 'Test',
    email: 'test@test.com',
    role: 'Employee',
    status: 'active',
    tenant_id: 't-1'
  };

  it('handles initial state', () => {
    expect(employeesReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  const REQ_ID = 'reqId';
  const MOCK_TENANT = 'tenant-123';

  describe('fetchEmployees', () => {
    it('handles fetchEmployees.pending', () => {
      const state = employeesReducer(initialState, fetchEmployees.pending(REQ_ID, MOCK_TENANT));
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('handles fetchEmployees.fulfilled', () => {
      const state = employeesReducer(
        { ...initialState, isLoading: true },
        fetchEmployees.fulfilled([mockEmployee], REQ_ID, MOCK_TENANT)
      );
      expect(state.isLoading).toBe(false);
      expect(state.employees).toEqual([mockEmployee]);
    });

    it('handles fetchEmployees.rejected', () => {
      const errorStr = 'Network Error';
      const state = employeesReducer(
        { ...initialState, isLoading: true },
        fetchEmployees.rejected(new Error(errorStr), REQ_ID, MOCK_TENANT, errorStr)
      );
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(errorStr);
    });
  });

  describe('toggleEmployeeStatus', () => {
    const populatedState: EmployeesState = {
      employees: [mockEmployee],
      isLoading: false,
      error: null
    };

    it('handles toggleEmployeeStatus.fulfilled', () => {
      const action = toggleEmployeeStatus.fulfilled(
        { employeeId: 'emp-1', newStatus: 'inactive' },
        REQ_ID,
        { employeeId: 'emp-1', currentStatus: 'active' }
      );
      const state = employeesReducer(populatedState, action);
      expect(state.employees[0].status).toBe('inactive');
    });

    it('handles toggleEmployeeStatus.fulfilled with unknown ID', () => {
      const action = toggleEmployeeStatus.fulfilled(
        { employeeId: 'emp-99', newStatus: 'inactive' },
        REQ_ID,
        { employeeId: 'emp-99', currentStatus: 'active' }
      );
      const state = employeesReducer(populatedState, action);
      expect(state.employees[0].status).toBe('active'); // unchanged
    });

    it('handles toggleEmployeeStatus.rejected', () => {
      const errorStr = 'Failed status update';
      const action = toggleEmployeeStatus.rejected(
        new Error(errorStr),
        REQ_ID,
        { employeeId: 'emp-1', currentStatus: 'active' },
        errorStr
      );
      const state = employeesReducer(populatedState, action);
      expect(state.error).toBe(errorStr);
    });
  });
});
