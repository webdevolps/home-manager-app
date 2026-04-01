import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DashboardPage from './DashboardPage';
import { useAuth } from '../../../hooks/useAuth';

vi.mock('../../../hooks/useAuth', () => ({
  useAuth: vi.fn(),
}));

describe('DashboardPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly the system variables from useAuth', () => {
    vi.mocked(useAuth).mockReturnValue({
      isAuthenticated: true,
      logoutUser: vi.fn(),
      loginUser: vi.fn(),
      user: { id: 'test-user-id', name: 'Albus Dumbledore', email: 'albus@hogwarts.com', tenant_id: 'HGB-199' },
      token: 'fake',
      currentTenantId: 'HGB-199',
      isLoading: false,
    });

    render(<DashboardPage />);
    
    expect(screen.getByText('Instancia Virtual')).toBeInTheDocument();
    expect(screen.getByText('HGB-199')).toBeInTheDocument();
    expect(screen.getByText('Albus Dumbledore')).toBeInTheDocument();
  });

  it('handles gracefully missing user properties falling back to email', () => {
    vi.mocked(useAuth).mockReturnValue({
      isAuthenticated: true,
      logoutUser: vi.fn(),
      loginUser: vi.fn(),
      user: { id: 'x', email: 'guest@agnes.com', tenant_id: '1' },
      token: 'fake',
      currentTenantId: null,
      isLoading: false,
    });

    render(<DashboardPage />);
    
    expect(screen.getByText('No asignado')).toBeInTheDocument();
    expect(screen.getByText('guest@agnes.com')).toBeInTheDocument();
  });
});
