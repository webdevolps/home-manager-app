import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useUsers } from './useUsers';
import { UserService } from '../infrastructure/services/user.service';
import { useSelector } from 'react-redux';

vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
  useDispatch: vi.fn()
}));

vi.mock('../infrastructure/services/user.service', () => ({
  UserService: {
    getEmployees: vi.fn(),
    toggleUserStatus: vi.fn()
  }
}));

describe('useUsers Hook', () => {
  const mockTenantId = 'tenant-123';
  const mockEmployee = {
    id: 'emp-1',
    name: 'Ana',
    email: 'ana@test.com',
    role: 'Admin',
    status: 'active',
    tenant_id: 'tenant-123'
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useSelector).mockReturnValue(mockTenantId);
  });

  it('fetchUsers loads employees successfully', async () => {
    vi.mocked(UserService.getEmployees).mockResolvedValue([mockEmployee]);

    const { result } = renderHook(() => useUsers());

    // Initially loading state is false
    expect(result.current.isLoading).toBe(false);

    // Call fetch array
    await act(async () => {
      await result.current.fetchUsers();
    });

    expect(UserService.getEmployees).toHaveBeenCalledWith(mockTenantId);
    expect(result.current.users.length).toBe(1);
    expect(result.current.users[0].name).toBe('Ana');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('fetchUsers handles loading and errors', async () => {
    vi.mocked(UserService.getEmployees).mockRejectedValue(new Error('Network error'));

    const { result } = renderHook(() => useUsers());

    await act(async () => {
      await result.current.fetchUsers();
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe('Network error');
    expect(result.current.users.length).toBe(0);
  });

  it('toggleUserStatus optimistically updates status and handles success', async () => {
    vi.mocked(UserService.getEmployees).mockResolvedValue([mockEmployee]);
    vi.mocked(UserService.toggleUserStatus).mockResolvedValue({ id: 'emp-1', status: 'inactive' });

    const { result } = renderHook(() => useUsers());

    await act(async () => {
      await result.current.fetchUsers();
    });

    // Ana starts as active
    expect(result.current.users[0].status).toBe('active');

    // Toggle Ana
    await act(async () => {
      await result.current.toggleUserStatus('emp-1', 'active');
    });

    expect(UserService.toggleUserStatus).toHaveBeenCalledWith('emp-1', 'active');
    expect(result.current.users[0].status).toBe('inactive'); // updated optimistically
  });
});
