import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EmployeesPage from './EmployeesPage';
import { useEmployees } from '../../../hooks/useEmployees';

vi.mock('../../../hooks/useEmployees', () => ({
  useEmployees: vi.fn()
}));

describe('EmployeesPage', () => {
  it('renders correctly and calls getEmployees', () => {
    const mockGetEmployees = vi.fn();
    vi.mocked(useEmployees).mockReturnValue({
      employees: [],
      isLoading: false,
      error: null,
      getEmployees: mockGetEmployees,
      toggleStatus: vi.fn()
    });

    render(<EmployeesPage />);

    expect(screen.getByText('Control Hub')).toBeInTheDocument();
    expect(screen.getByText(/Supervisa y administra el acceso/i)).toBeInTheDocument();
    expect(mockGetEmployees).toHaveBeenCalled();
  });

  it('renders error state correctly', () => {
    vi.mocked(useEmployees).mockReturnValue({
      employees: [],
      isLoading: false,
      error: 'Hubo un fallo de red simulado',
      getEmployees: vi.fn(),
      toggleStatus: vi.fn()
    });

    render(<EmployeesPage />);

    expect(screen.getByText(/Hubo un fallo de red simulado/i)).toBeInTheDocument();
  });
});
