import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { SecureStorage } from '../../utils/secureStorage';

vi.mock('../../utils/secureStorage', () => ({
  SecureStorage: {
    setItem: vi.fn(),
    getItem: vi.fn(),
    removeItem: vi.fn(),
  }
}));

import authReducer, { setCredentials, logout } from './authSlice';

describe('authSlice Redux State', () => {
  const initialState = {
    user: null,
    token: null,
    currentTenantId: null,
    isAuthenticated: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('Debería retornar el estado inicial por defecto cuando localStorage está vacío', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('Debería manejar la acción setCredentials correctamente', () => {
    const mockUser = { id: 'usr-1', email: 'admin@test.com', name: 'Admin', tenant_id: 't-123' };
    const mockToken = 'mock-jwt-token-123';
    const mockTenantId = 't-123';

    const actual = authReducer(
      initialState,
      setCredentials({ user: mockUser, token: mockToken, tenant_id: mockTenantId })
    );

    expect(actual.user).toEqual(mockUser);
    expect(actual.token).toEqual(mockToken);
    expect(actual.currentTenantId).toEqual(mockTenantId);
    expect(actual.isAuthenticated).toEqual(true);

    expect(SecureStorage.setItem).toHaveBeenCalledWith('token', mockToken);
    expect(SecureStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify(mockUser));
    expect(SecureStorage.setItem).toHaveBeenCalledWith('tenant_id', mockTenantId);
  });

  it('Debería manejar la acción logout correctamente y resetear el estado', () => {
    const loggedInState = {
      user: { id: 'usr-1', email: 'admin@test.com', tenant_id: 't-123' },
      token: 'mock-jwt-token-123',
      currentTenantId: 't-123',
      isAuthenticated: true,
    };

    const actual = authReducer(loggedInState as unknown as ReturnType<typeof authReducer>, logout());

    expect(actual).toEqual(initialState);

    expect(SecureStorage.removeItem).toHaveBeenCalledWith('token');
    expect(SecureStorage.removeItem).toHaveBeenCalledWith('user');
    expect(SecureStorage.removeItem).toHaveBeenCalledWith('tenant_id');
  });
});
