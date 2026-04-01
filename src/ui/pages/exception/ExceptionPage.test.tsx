import { describe, it, expect } from 'vitest'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import ExceptionPage from '@/ui/pages/exception'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'

describe('ExceptionPage', () => {
  it('renders 404 and error message', () => {
    render(
      <MemoryRouter>
        <ExceptionPage />
      </MemoryRouter>
    )
    expect(screen.getByText('404')).toBeInTheDocument()
    expect(screen.getByText('Página no encontrada')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Volver al Inicio/i })).toBeInTheDocument()
  })
})
