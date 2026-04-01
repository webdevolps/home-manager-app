import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import { LoadingView, EmptyView } from './StateViews';

describe('StateViews', () => {
  describe('LoadingView', () => {
    it('renders with default message', () => {
      render(<LoadingView />);
      expect(screen.getByText('Cargando información...')).toBeInTheDocument();
    });

    it('renders with custom message and className', () => {
      render(<LoadingView message="Loading Custom..." className="custom-class" />);
      expect(screen.getByText('Loading Custom...')).toBeInTheDocument();
      expect(screen.getByText('Loading Custom...').parentElement).toHaveClass('custom-class');
    });
  });

  describe('EmptyView', () => {
    it('renders with default message', () => {
      render(<EmptyView />);
      expect(screen.getByText('No hay datos disponibles.')).toBeInTheDocument();
    });

    it('renders with custom message and className', () => {
      render(<EmptyView message="No items..." className="empty-custom" />);
      expect(screen.getByText('No items...')).toBeInTheDocument();
      expect(screen.getByText('No items...').parentElement).toHaveClass('empty-custom');
    });
  });
});
