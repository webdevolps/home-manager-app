import { describe, it, expect } from 'vitest'
import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '@utils/test-utils'
import HomeApp from '@/ui/pages/HomeApp'

describe('HomeApp Page', () => {
  it('renders title and greeting', () => {
    renderWithProviders(<HomeApp />)
    expect(screen.getByRole('heading', { name: /^Home Manager$/i })).toBeInTheDocument()
    expect(screen.getByText(/Your smart home dashboard/i)).toBeInTheDocument()
  })

  it('contains Architecture and Tech Stack sections', () => {
    renderWithProviders(<HomeApp />)
    expect(screen.getByRole('heading', { name: /^Architecture$/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /^Tech Stack$/i })).toBeInTheDocument()
  })
})
