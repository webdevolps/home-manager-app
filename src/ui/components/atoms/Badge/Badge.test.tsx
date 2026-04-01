import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Badge } from './Badge';

describe('Badge Atom', () => {
  it('renders active state correctly', () => {
    render(<Badge status="active" />);
    const badge = screen.getByRole('status');
    expect(badge).toHaveTextContent('Activo');
    expect(badge).toHaveClass('bg-green-100/50');
  });

  it('renders inactive state correctly', () => {
    render(<Badge status="inactive" />);
    const badge = screen.getByRole('status');
    expect(badge).toHaveTextContent('Inactivo');
    expect(badge).toHaveClass('bg-red-100/50');
  });

  it('allows custom labels', () => {
    render(<Badge status="active" label="Online" />);
    expect(screen.getByRole('status')).toHaveTextContent('Online');
  });
});
