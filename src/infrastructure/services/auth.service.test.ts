import { describe, it, expect, afterEach, vi } from 'vitest';
import { AuthService } from './auth.service';

const { REAL_TENANT_ID, REAL_EMAIL } = vi.hoisted(() => ({
  REAL_TENANT_ID: 'real-tenant',
  REAL_EMAIL: 'real@agnes.com'
}));

// Ignorar el comportamiento dinámico inicial
vi.mock('../Api', () => {
  return {
    default: vi.fn().mockImplementation(() => {
      return {
        createEntity: vi.fn(),
        getEndpoints: vi.fn().mockReturnValue({
          'auth/login': {
            create: vi.fn().mockResolvedValue({
              data: {
                token: 'real-token-999',
                user: { id: 'usr-1', email: REAL_EMAIL, tenant_id: REAL_TENANT_ID },
                tenant: { id: REAL_TENANT_ID, name: 'Real Corp' }
              }
            })
          }
        })
      };
    })
  };
});

describe('AuthService Layer', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('Ejecuta login en modo MOCK y retorna el usuario semilla con retraso', async () => {
    // Forzamos MOCK=true
    vi.stubEnv('VITE_USE_MOCK', 'true');

    const promise = AuthService.login({ email: 'admin@agnes.com' });
    
    const response = await promise;
    expect(response.token).toContain('mock-jwt');
    expect(response.tenant.id).toBe('tenant-agnes-101');
    expect(response.user.email).toBe('admin@agnes.com');
    
    vi.unstubAllEnvs();
  });

  it('Ejecuta login en modo REAL interactuando con ApiImpl factory', async () => {
    // Forzamos MOCK=false o indeterminado
    vi.stubEnv('VITE_USE_MOCK', 'false');

    const response = await AuthService.login({ email: REAL_EMAIL, password: '123' });
    
    expect(response.token).toBe('real-token-999');
    expect(response.tenant.name).toBe('Real Corp');
    expect(response.user.tenant_id).toBe(REAL_TENANT_ID);

    vi.unstubAllEnvs();
  });
});
