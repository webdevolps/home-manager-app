import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from './Card';

describe('Card Atom', () => {
  it('renders children correctly', () => {
    render(<Card>Hello Card</Card>);
    expect(screen.getByText('Hello Card')).toBeInTheDocument();
  });

  it('applies padding and elevation classes based on props', () => {
    const { container: defaultContainer } = render(<Card>Normal</Card>);
    expect(defaultContainer.firstChild).toHaveClass('p-6 shadow-md');

    const { container: customContainer } = render(<Card padding="lg" elevation="lg">Large</Card>);
    expect(customContainer.firstChild).toHaveClass('p-8 shadow-lg');
  });
});
