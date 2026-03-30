import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { UserTable } from './UserTable';
import { Employee } from '../../../../hooks/useUsers';

describe('UserTable Organism', () => {
  const mockUsers: Employee[] = [
    { id: '1', name: 'Albus', email: 'albus@test.com', role: 'Director', status: 'active', tenant_id: 't-1' },
    { id: '2', name: 'Severus', email: 'severus@test.com', role: 'Profesor', status: 'inactive', tenant_id: 't-1' }
  ];

  it('renders loading state correctly', () => {
    render(<UserTable users={[]} isLoading={true} onToggleStatus={vi.fn()} />);
    expect(screen.getByText(/Cargando plantilla/i)).toBeInTheDocument();
  });

  it('renders empty state when no users are provided', () => {
    render(<UserTable users={[]} isLoading={false} onToggleStatus={vi.fn()} />);
    expect(screen.getByText(/No hay empleados/i)).toBeInTheDocument();
  });

  it('renders users accurately', () => {
    render(<UserTable users={mockUsers} isLoading={false} onToggleStatus={vi.fn()} />);
    expect(screen.getByText('Albus')).toBeInTheDocument();
    expect(screen.getByText('albus@test.com')).toBeInTheDocument();
    expect(screen.getByText('Director')).toBeInTheDocument();
    expect(screen.getByText('Severus')).toBeInTheDocument();
  });

  it('calls onToggleStatus handler when action button is clicked', () => {
    const handleToggle = vi.fn();
    render(<UserTable users={mockUsers} isLoading={false} onToggleStatus={handleToggle} />);
    
    // Albus is active -> Button says "Suspender"
    const suspendButton = screen.getByRole('button', { name: /Suspender/i });
    fireEvent.click(suspendButton);
    expect(handleToggle).toHaveBeenCalledWith('1', 'active');
  });
});
