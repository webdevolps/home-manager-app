import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Input from './Input';

describe('Input Atom', () => {
  it('renders an input element', () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('renders a label and links it to the input', () => {
    render(<Input label="Email Address" id="email-input" />);
    const input = screen.getByLabelText('Email Address');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('id', 'email-input');
  });

  it('displays error messages and sets aria-invalid', () => {
    render(<Input error="Invalid email" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Invalid email');
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });
});
