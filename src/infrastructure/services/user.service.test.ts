import { describe, it, expect, vi, afterEach } from 'vitest';
import { UserService } from './user.service';

const { EMPLOYEES_MOCK } = vi.hoisted(() => ({
  EMPLOYEES_MOCK: [
    { id: '1', tenant_id: 't-1', name: 'A', email: 'a@a.com', role: 'rol', status: 'active' },
    { id: '2', tenant_id: 't-2', name: 'B', email: 'b@b.com', role: 'rol', status: 'active' },
  ]
}));

vi.mock('../mocks/employees.mock', () => ({
  employeesMock: EMPLOYEES_MOCK
}));

vi.mock('../Api', () => {
  return {
    default: vi.fn().mockImplementation(() => {
      return {
        createEntity: vi.fn(),
        getEndpoints: vi.fn().mockReturnValue({
          'users/employees': {
            getAll: vi.fn().mockResolvedValue({ data: [{ id: 'api-1', tenant_id: 't-api' }] }),
            update: vi.fn().mockResolvedValue({ data: { id: 'api-1', status: 'inactive' } })
          }
        })
      };
    })
  };
});

describe('UserService', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('fetch getEmployees en modo Mock filtra por tenant_id', async () => {
    vi.stubEnv('VITE_USE_MOCK', 'true');
    const result = await UserService.getEmployees('t-1');

    expect(result.length).toBe(1);
    expect(result[0].id).toBe('1');
    vi.unstubAllEnvs();
  });

  it('toggleUserStatus en modo Mock cambia el estado simulado en memoria', async () => {
    vi.stubEnv('VITE_USE_MOCK', 'true');
    const result = await UserService.toggleUserStatus('1', 'active');

    expect(result.id).toBe('1');
    expect(result.status).toBe('inactive');
    vi.unstubAllEnvs();
  });

  it('fetch getEmployees en modo Real llama al ApiImpl configurado', async () => {
    vi.stubEnv('VITE_USE_MOCK', 'false');
    const result = await UserService.getEmployees('t-real');
    expect((result as { id: string }[])[0].id).toBe('api-1');
    vi.unstubAllEnvs();
  });

  it('toggleUserStatus en modo Real llama update del ApiImpl', async () => {
    vi.stubEnv('VITE_USE_MOCK', 'false');
    const result = await UserService.toggleUserStatus('api-1', 'active') as { status: string };
    expect(result.status).toBe('inactive');
    vi.unstubAllEnvs();
  });
});
