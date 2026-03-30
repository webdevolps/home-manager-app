import ApiImpl from '../Api';

const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
const sanitizedUrl = backendUrl.endsWith('/') ? backendUrl : `${backendUrl}/`;

const api = new ApiImpl({ url: sanitizedUrl });
api.createEntity({ name: 'users/employees' });

export const UserService = {
  getEmployees: async (tenantId: string) => {
    const useMock = import.meta.env.VITE_USE_MOCK === 'true';

    if (useMock) {
      const { employeesMock } = await import('../mocks/employees.mock');
      return new Promise((resolve) => {
        setTimeout(() => {
          const filtered = employeesMock.filter((emp) => emp.tenant_id === tenantId);
          resolve(filtered);
        }, 800);
      });
    }

    // Petición real: ApiImpl ya inyecta el X-Tenant-ID en los headers gracias a su axios interceptor
    const endpoints = api.getEndpoints();
    const response = await endpoints['users/employees'].getAll({});
    return response.data;
  },

  toggleUserStatus: async (employeeId: string, currentStatus: string) => {
    const useMock = import.meta.env.VITE_USE_MOCK === 'true';
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';

    if (useMock) {
      const { employeesMock } = await import('../mocks/employees.mock');
      return new Promise((resolve) => {
        setTimeout(() => {
          const emp = employeesMock.find((e) => e.id === employeeId);
          if (emp) emp.status = newStatus;
          resolve({ id: employeeId, status: newStatus });
        }, 500);
      });
    }

    const endpoints = api.getEndpoints();
    // Simulando que ApiImpl tuviera patch o usando update (PUT)
    const response = await endpoints['users/employees'].update({
      id: employeeId,
      toUpdate: { status: newStatus }
    });
    return response.data;
  }
};
