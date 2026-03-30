import ApiImpl from '../Api';
import { AuthResponse } from '../../interfaces/auth.interface';

// Configurar el cliente instanciado reutilizando nuestra arquitectura
const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
// Garantizar sufijo para no romper el constructor dinámico
const sanitizedUrl = backendUrl.endsWith('/') ? backendUrl : `${backendUrl}/`;

const api = new ApiImpl({ url: sanitizedUrl });

// Al registrar auth/login se genera el resourceURL y un POST mediante endpoint.create
api.createEntity({ name: 'auth/login' });

export const AuthService = {
  login: async (credentials: Record<string, unknown>): Promise<AuthResponse> => {
    // Leer variable de entorno para saber si es un MOCK
    const useMock = import.meta.env.VITE_USE_MOCK === 'true';

    if (useMock) {
      // PROCESO MOCK
      return new Promise<AuthResponse>((resolve, reject) => {
        setTimeout(() => {
          if (credentials?.email === 'error@agnes.com') {
            reject(new Error('Simulated network error for testing globalError UI'));
            return;
          }

          resolve({
            user: {
              id: 'usr-admin-001',
              email: (credentials?.email as string) || 'admin@agnes.com',
              name: 'Super Usuario',
              tenant_id: 'tenant-uuid-12345'
            },
            token: 'mock-jwt-token-testing-string', // eslint-disable-line no-secrets/no-secrets
            tenant: {
              id: 'tenant-uuid-12345',
              name: 'Agnes Demo Corp',
              domain: 'demo'
            }
          });
        }, 1500); // 1.5s simulación
      });
    }

    // PROCESO REAL: usar axios subyacente de la factoría API
    const endpoints = api.getEndpoints();
    
    // create mapea al POST por defecto de ApiImpl
    const response = await endpoints['auth/login'].create({ toCreate: credentials });
    return response.data as AuthResponse;
  }
};
