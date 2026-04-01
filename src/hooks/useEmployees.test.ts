import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useEmployees } from './useEmployees';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEmployees, toggleEmployeeStatus } from '../store/employees/employeesSlice';

vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
  useDispatch: vi.fn()
}));

vi.mock('../store/employees/employeesSlice', () => ({
  fetchEmployees: vi.fn(),
  toggleEmployeeStatus: vi.fn()
}));

describe('useEmployees Hook', () => {
  const mockDispatch = vi.fn();

  const TENANT_ID = 'tenant-123';

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useDispatch).mockReturnValue(mockDispatch);
    
    // Mocking useSelector to return predictable state
    vi.mocked(useSelector).mockImplementation((selector: unknown) => {
      const mockState = {
        employees: {
          employees: [{ id: '1', name: 'Ana' }],
          isLoading: false,
          error: null
        },
        auth: {
          currentTenantId: TENANT_ID
        }
      };
      return (selector as (state: unknown) => unknown)(mockState);
    });
  });

  it('selects values from the redux store correctly', () => {
    const { result } = renderHook(() => useEmployees());

    expect(result.current.employees.length).toBe(1);
    expect(result.current.employees[0].name).toBe('Ana');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('getEmployees dispatches fetchEmployees with tenantId', () => {
    const { result } = renderHook(() => useEmployees());

    act(() => {
      result.current.getEmployees();
    });

    expect(fetchEmployees).toHaveBeenCalledWith(TENANT_ID);
    expect(mockDispatch).toHaveBeenCalledWith(fetchEmployees(TENANT_ID));
  });

  it('toggleStatus dispatches toggleEmployeeStatus', () => {
    const { result } = renderHook(() => useEmployees());

    act(() => {
      result.current.toggleStatus('emp-1', 'active');
    });

    expect(toggleEmployeeStatus).toHaveBeenCalledWith({ employeeId: 'emp-1', currentStatus: 'active' });
    expect(mockDispatch).toHaveBeenCalledWith(toggleEmployeeStatus({ employeeId: 'emp-1', currentStatus: 'active' }));
  });
});
