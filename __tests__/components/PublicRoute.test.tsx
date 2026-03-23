import { describe, it, expect, vi } from 'vitest'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import PublicRoute from '@/ui/components/hoc/PublicRoute'
import React from 'react'

import { useAuth } from '@/hooks/transversal/useAuth'

vi.mock('@/hooks/transversal/useAuth')

describe('PublicRoute HOC', () => {
  it('renders loading state', () => {
    vi.mocked(useAuth).mockReturnValue({ isAuthenticated: false, isLoading: true, canQuote: false })
    render(
      <MemoryRouter>
        <PublicRoute>
          <div>Content</div>
        </PublicRoute>
      </MemoryRouter>
    )
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('renders children when not authenticated', () => {
    vi.mocked(useAuth).mockReturnValue({ isAuthenticated: false, isLoading: false, canQuote: false })
    render(
      <MemoryRouter>
        <PublicRoute>
          <div data-testid="public-content">Public Content</div>
        </PublicRoute>
      </MemoryRouter>
    )
    expect(screen.getByTestId('public-content')).toBeInTheDocument()
  })

  it('redirects to dashboard when authenticated', () => {
    vi.mocked(useAuth).mockReturnValue({ isAuthenticated: true, isLoading: false, canQuote: true })
    render(
      <MemoryRouter initialEntries={['/public']}>
        <Routes>
          <Route path="/dashboard" element={<div data-testid="dashboard">Dashboard</div>} />
          <Route 
            path="/public" 
            element={
              <PublicRoute redirectTo="/dashboard">
                <div>Public Content</div>
              </PublicRoute>
            } 
          />
        </Routes>
      </MemoryRouter>
    )
    expect(screen.getByTestId('dashboard')).toBeInTheDocument()
  })
})
