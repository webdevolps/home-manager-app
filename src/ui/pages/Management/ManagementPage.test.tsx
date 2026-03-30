import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ManagementPage from './ManagementPage';
import { useUsers } from '../../../hooks/useUsers';

vi.mock('../../../hooks/useUsers', () => ({
  useUsers: vi.fn()
}));

describe('ManagementPage', () => {
  it('renders correctly and calls fetchUsers', () => {
    const mockFetch = vi.fn();
    vi.mocked(useUsers).mockReturnValue({
      users: [],
      isLoading: false,
      error: null,
      fetchUsers: mockFetch,
      toggleUserStatus: vi.fn()
    });

    render(<ManagementPage />);

    expect(screen.getByText('Control Hub')).toBeInTheDocument();
    expect(screen.getByText(/Supervisa y administra el acceso/i)).toBeInTheDocument();
    expect(mockFetch).toHaveBeenCalled();
  });

  it('renders error state correctly', () => {
    vi.mocked(useUsers).mockReturnValue({
      users: [],
      isLoading: false,
      error: 'Hubo un fallo de red simulado',
      fetchUsers: vi.fn(),
      toggleUserStatus: vi.fn()
    });

    render(<ManagementPage />);

    expect(screen.getByText(/Hubo un fallo de red simulado/i)).toBeInTheDocument();
  });
});
