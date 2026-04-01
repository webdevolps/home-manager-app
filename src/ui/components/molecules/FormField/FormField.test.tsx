import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FormField } from './FormField';
import React from 'react';

describe('FormField Molecule', () => {
  it('renders underlying Input successfully', () => {
    render(<FormField placeholder="Molecule Input" />);
    expect(screen.getByPlaceholderText('Molecule Input')).toBeInTheDocument();
  });

  it('decorates the label with an asterisk when isRequired is true and links a11y correctly', () => {
    render(<FormField label="Username" isRequired id="user-input" />);
    
    // Debe existir un input identificable con el label enriquecido
    const input = screen.getByLabelText('Username *');
    expect(input).toBeInTheDocument();
    
    // Validamos accesibilidad inyectada
    expect(input).toBeRequired();
    expect(input).toHaveAttribute('aria-required', 'true');
    expect(input).toHaveAttribute('id', 'user-input');
  });

  it('delegates error rendering and presentation to the Input atom', () => {
    render(<FormField label="Email" error="Invalid format" />);
    
    expect(screen.getByRole('alert')).toHaveTextContent('Invalid format');
    expect(screen.getByLabelText('Email')).toHaveAttribute('aria-invalid', 'true');
  });

  it('forwards ref properly to the HTML input element', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<FormField label="Ref Test" ref={ref} />);
    
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current?.tagName).toBe('INPUT');
  });
});
