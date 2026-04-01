import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import '@testing-library/jest-dom';
import LegacyPlaceholder from './LegacyPlaceholder';

describe('LegacyPlaceholder', () => {
  const INIT_MSG = 'Inicializando Agnes Legacy Framework...';

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('renders initial loading state', () => {
    render(<LegacyPlaceholder />);
    expect(screen.getByText('Módulo Complementario')).toBeInTheDocument();
    expect(screen.getByText('Agnes Legacy Ecosystem')).toBeInTheDocument();
    expect(screen.getByText(INIT_MSG)).toBeInTheDocument();
  });

  it('transitions to unavailable message after timeout', () => {
    render(<LegacyPlaceholder />);
    
    // Initially testing loading
    expect(screen.getByText(INIT_MSG)).toBeInTheDocument();

    // Fast-forward 2500ms
    act(() => {
      vi.advanceTimersByTime(2500);
    });

    expect(screen.queryByText(INIT_MSG)).not.toBeInTheDocument();
    expect(screen.getByText('Módulo No Disponible')).toBeInTheDocument();
    expect(screen.getByText(/El submódulo heredado al que intentas acceder/i)).toBeInTheDocument();
  });
});
