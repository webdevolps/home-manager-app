import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { EmployeesTable } from './EmployeesTable';
import { Employee } from '../../../../hooks/useEmployees';

describe('EmployeesTable Organism', () => {
  const mockUsers: Employee[] = [
    { id: '1', name: 'Albus', email: 'albus@test.com', role: 'Director', status: 'active', tenant_id: 't-1' },
    { id: '2', name: 'Severus', email: 'severus@test.com', role: 'Profesor', status: 'inactive', tenant_id: 't-1' }
  ];

  it('renders users accurately', () => {
    render(<EmployeesTable employees={mockUsers} onToggleStatus={vi.fn()} />);
    expect(screen.getAllByText('Albus').length).toBeGreaterThan(0);
    expect(screen.getAllByText('albus@test.com').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Director').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Severus').length).toBeGreaterThan(0);
  });

  it('calls onToggleStatus handler when action button is clicked', () => {
    const handleToggle = vi.fn();
    render(<EmployeesTable employees={mockUsers} onToggleStatus={handleToggle} />);
    
    // Desktop button might say "Suspender", Mobile might say "Suspender Acceso"
    const suspendButtons = screen.getAllByRole('button', { name: /Suspender/i });
    fireEvent.click(suspendButtons[0]);
    expect(handleToggle).toHaveBeenCalledWith('1', 'active');
  });
});
