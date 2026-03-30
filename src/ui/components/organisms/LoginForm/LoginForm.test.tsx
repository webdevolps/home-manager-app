import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LoginForm } from './LoginForm';
import { AuthService } from '../../../../infrastructure/services/auth.service';
import { renderWithProviders } from '../../../../utils/test-utils';

// Interceptamos la llamada al servicio simulado para testear 
// la reacción de la UI puramente en modo aislado
vi.mock('../../../../infrastructure/services/auth.service', () => ({
  AuthService: {
    login: vi.fn(),
  },
}));

const EMAIL_LABEL = 'Email *';
const PASSWORD_LABEL = 'Password *';
const OWNER_EMAIL = 'owner@agnes.com';
const TEST_TENANT_ID = 'tenant-999';

describe('LoginForm Organism', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renderiza la estructura visual del formulario correctamente', () => {
    renderWithProviders(<LoginForm />);
    
    expect(screen.getByText('Bienvenido a Agnes')).toBeInTheDocument();
    
    // El aterisco se renderiza porque son isRequired por defecto en este Organismo
    expect(screen.getByLabelText(EMAIL_LABEL)).toBeInTheDocument();
    expect(screen.getByLabelText(PASSWORD_LABEL)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Iniciar Sesión/i })).toBeInTheDocument();
  });

  it('despliega validaciones de React Hook Form nativas si los inputs están vacíos', async () => {
    renderWithProviders(<LoginForm />);
    
    // Enviamos el formulario vacío
    fireEvent.click(screen.getByRole('button', { name: /Iniciar Sesión/i }));

    // Validamos que salten los errores locales de RHF sin llamar la API
    await waitFor(() => {
      expect(screen.getByText('El correo electrónico es requerido')).toBeInTheDocument();
      expect(screen.getByText('La contraseña es requerida')).toBeInTheDocument();
      expect(AuthService.login).not.toHaveBeenCalled();
    });
  });

  it('despliega alerta global cuando AuthService.login es rechazado', async () => {
    vi.mocked(AuthService.login).mockRejectedValueOnce(new Error('Rejected Promise'));

    renderWithProviders(<LoginForm />);
    
    // Rellenamos inputs
    fireEvent.change(screen.getByLabelText(EMAIL_LABEL), { target: { value: 'error@bad.com' } });
    fireEvent.change(screen.getByLabelText(PASSWORD_LABEL), { target: { value: '123456' } });
    
    // Disparamos
    fireEvent.click(screen.getByRole('button', { name: /Iniciar Sesión/i }));

    // Validamos la aparición del contenedor rojo de Error general en el top
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/Credenciales inválidas/i);
    });
  });

  it('consume AuthService exitosamente y despacha los stores globales de Redux vía useAuth', async () => {
    const fakeApiResponse = {
      token: 'success-token-testing',
      user: { id: '9', email: OWNER_EMAIL, name: 'Dueño', tenant_id: TEST_TENANT_ID },
      tenant: { id: TEST_TENANT_ID, name: 'Agnes Testing', domain: 'tester' }
    };
    vi.mocked(AuthService.login).mockResolvedValueOnce(fakeApiResponse);

    const { store } = renderWithProviders(<LoginForm />);
    
    // Llenamos el form
    fireEvent.change(screen.getByLabelText(EMAIL_LABEL), { target: { value: OWNER_EMAIL } });
    fireEvent.change(screen.getByLabelText(PASSWORD_LABEL), { target: { value: 'mysecretpass' } });
    
    fireEvent.click(screen.getByRole('button', { name: /Iniciar Sesión/i }));

    // Validamos que se envíe localmente el llamado
    await waitFor(() => {
      expect(AuthService.login).toHaveBeenCalledWith({ email: OWNER_EMAIL, password: 'mysecretpass' });
    });
    console.log("AuthService resolved, storing: ", store.getState());

    // Validamos de paso el side-effect global de que se llenó Redux (useAuth lo hace por detrás)
    await waitFor(() => {
      const globalState = store.getState();
      expect(globalState.auth.isAuthenticated).toBe(true);
      expect(globalState.auth.token).toBe('success-token-testing');
      expect(globalState.auth.currentTenantId).toBe(TEST_TENANT_ID);
    });
  });
});
