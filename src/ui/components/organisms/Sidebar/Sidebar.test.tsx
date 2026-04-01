import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Sidebar from './Sidebar';
import { useAuth } from '../../../../hooks/useAuth';

// Mockeamos el hook de autenticación
vi.mock('../../../../hooks/useAuth', () => ({
  useAuth: vi.fn(),
}));

// Mockeamos useNavigate de react-router-dom
const mockedNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

describe('Sidebar Organism', () => {
  const mockedLogout = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAuth).mockReturnValue({
      isAuthenticated: true,
      logoutUser: mockedLogout,
      loginUser: vi.fn(),
      user: null,
      token: null,
      currentTenantId: null,
      isLoading: false,
    });
  });

  it('renderiza la marca Agnes y los enlaces del menú', () => {
    render(
      <MemoryRouter>
        <Sidebar isOpen={true} onClose={() => {}} />
      </MemoryRouter>
    );

    expect(screen.getByText('Agnes')).toBeInTheDocument();
    
    // Validamos los enlaces del pre-plan
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Control Hub')).toBeInTheDocument();
    expect(screen.getByText('Legacy Launcher')).toBeInTheDocument();
  });

  it('despacha el cierre de sesión y redirige al index al clickear el botón correspondiente', () => {
    render(
      <MemoryRouter>
        <Sidebar isOpen={true} onClose={() => {}} />
      </MemoryRouter>
    );

    const logoutBtn = screen.getByRole('button', { name: /Cerrar Sesión/i });
    expect(logoutBtn).toBeInTheDocument();

    fireEvent.click(logoutBtn);

    expect(mockedLogout).toHaveBeenCalledOnce();
    expect(mockedNavigate).toHaveBeenCalledWith('/');
  });
});
