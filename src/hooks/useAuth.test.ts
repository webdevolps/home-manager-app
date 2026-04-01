import { renderHook, act } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { useAuth } from './useAuth';
import { setCredentials, logout } from '../store/auth/authSlice';

// Mockeamos hooks de react-redux para no depender de un Provider real en los tests
vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

describe('useAuth Custom Hook', () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    (useDispatch as unknown as Mock).mockReturnValue(mockDispatch);
    vi.clearAllMocks();
  });

  it('Debería obtener el estado por defecto (sin autenticación)', () => {
    // Simulamos el selector devolviendo estado vacío
    (useSelector as unknown as Mock).mockReturnValue({
      user: null,
      token: null,
      currentTenantId: null,
      isAuthenticated: false,
    });

    const { result } = renderHook(() => useAuth());

    expect(result.current.user).toBeNull();
    expect(result.current.token).toBeNull();
    expect(result.current.currentTenantId).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });

  it('Debería obtener el estado autenticado correctamente', () => {
    const mockAuthState = {
      user: { id: 'usr-1', email: 'user@test.com', tenant_id: 't-123' },
      token: 'eyJhbGci...',
      currentTenantId: 't-123',
      isAuthenticated: true,
    };
    (useSelector as unknown as Mock).mockReturnValue(mockAuthState);

    const { result } = renderHook(() => useAuth());

    expect(result.current.user).toEqual(mockAuthState.user);
    expect(result.current.token).toEqual('eyJhbGci...');
    expect(result.current.currentTenantId).toEqual('t-123');
    expect(result.current.isAuthenticated).toBe(true);
  });

  it('loginUser debería disparar setCredentials(dispatch) con tenant_id mapeado al tenant', () => {
    (useSelector as unknown as Mock).mockReturnValue({}); // ignoramos selección en esta prueba
    const { result } = renderHook(() => useAuth());

    const authPayload = {
      user: { id: 'usr-8', email: 'user@test.com', tenant_id: 'ten-99' },
      token: 'mock-jwt-token',
      tenant: { id: 'ten-99', name: 'Empresa Frontend' }
    };

    act(() => {
      result.current.loginUser(authPayload);
    });

    expect(mockDispatch).toHaveBeenCalledWith(
      setCredentials({
        user: authPayload.user,
        token: authPayload.token,
        tenant_id: authPayload.tenant.id,
      })
    );
  });

  it('logoutUser debería disparar la acción logout(dispatch)', () => {
    (useSelector as unknown as Mock).mockReturnValue({});
    const { result } = renderHook(() => useAuth());

    act(() => {
      result.current.logoutUser();
    });

    expect(mockDispatch).toHaveBeenCalledWith(logout());
  });
});
