import { describe, it, expect } from 'vitest';
import authReducer, { setCredentials, logout } from './authSlice';

describe('authSlice Redux State', () => {
  const initialState = {
    user: null,
    token: null,
    currentTenantId: null,
    isAuthenticated: false,
  };

  it('Debería retornar el estado inicial', () => {
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
  });

  it('Debería manejar la acción logout correctamente y resetear el estado', () => {
    const loggedInState = {
      user: { id: 'usr-1', email: 'admin@test.com', tenant_id: 't-123' },
      token: 'mock-jwt-token-123',
      currentTenantId: 't-123',
      isAuthenticated: true,
    };

    const actual = authReducer(loggedInState, logout());

    expect(actual).toEqual(initialState);
  });
});
