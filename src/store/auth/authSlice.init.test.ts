import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SecureStorage } from '../../utils/secureStorage';

vi.mock('../../utils/secureStorage', () => ({
  SecureStorage: {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
  }
}));

describe('authSlice initial state', () => {
  const MOCK_TOKEN = 'mock-token';
  const MOCK_TENANT = 't-1';
  
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
  });

  it('loads state successfully from secure storage', async () => {
    const mockUser = { id: 'usr-1', email: 'test@t.com', tenant_id: MOCK_TENANT };
    vi.mocked(SecureStorage.getItem).mockImplementation((key) => {
      if (key === 'token') return MOCK_TOKEN;
      if (key === 'user') return JSON.stringify(mockUser);
      if (key === 'tenant_id') return MOCK_TENANT;
      return null;
    });

    const { default: authReducer } = await import('./authSlice');
    const state = authReducer(undefined, { type: 'unknown' });

    expect(state.isAuthenticated).toBe(true);
    expect(state.token).toBe(MOCK_TOKEN);
    expect(state.currentTenantId).toBe(MOCK_TENANT);
  });

  it('handles JSON.parse error gracefully', async () => {
    vi.mocked(SecureStorage.getItem).mockImplementation((key) => {
      if (key === 'token') return MOCK_TOKEN;
      if (key === 'user') return 'invalid-json-{';
      if (key === 'tenant_id') return MOCK_TENANT;
      return null;
    });

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    const { default: authReducer } = await import('./authSlice');
    const state = authReducer(undefined, { type: 'unknown' });

    expect(state.isAuthenticated).toBe(false);
    expect(consoleSpy).toHaveBeenCalledWith(
      'Failed to parse auth state from secure storage',
      expect.any(Error)
    );
    consoleSpy.mockRestore();
  });
});
