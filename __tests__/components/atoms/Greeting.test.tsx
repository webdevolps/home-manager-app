import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Greeting from '@components/atoms/Greeting/Greeting';

describe('Greeting Component', () => {
  it('renders with default name', () => {
    render(<Greeting />);
    expect(screen.getByText(/Hello, User!/i)).toBeInTheDocument();
  });

  it('renders with custom name', () => {
    render(<Greeting name="Klyswer" />);
    expect(screen.getByText(/Hello, Klyswer!/i)).toBeInTheDocument();
  });
});
