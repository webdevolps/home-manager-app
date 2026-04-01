import { describe, it, expect } from 'vitest'
import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '@utils/test-utils'
import HomeApp from '@/ui/pages/HomeApp'

describe('HomeApp Page', () => {
  it('renders title', () => {
    renderWithProviders(<HomeApp />)
    expect(screen.getByRole('heading', { name: /^Agnes$/i })).toBeInTheDocument()
  })

  it('contains LoginForm for authentication', () => {
    renderWithProviders(<HomeApp />)
    expect(screen.getByRole('heading', { name: /^Bienvenido a Agnes$/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Iniciar Sesión/i })).toBeInTheDocument()
  })
})
