import { describe, it, expect, vi } from 'vitest'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import PrivateRoute from '@/ui/components/hoc/PrivateRoute'
import React from 'react'

import { useAuth } from '@/hooks/transversal/useAuth'

vi.mock('@/hooks/transversal/useAuth')

describe('PrivateRoute HOC', () => {
  it('renders loading state', () => {
    vi.mocked(useAuth).mockReturnValue({ isAuthenticated: false, isLoading: true, canQuote: false })
    render(
      <MemoryRouter>
        <PrivateRoute>
          <div>Content</div>
        </PrivateRoute>
      </MemoryRouter>
    )
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('redirects to login when not authenticated', () => {
    vi.mocked(useAuth).mockReturnValue({ isAuthenticated: false, isLoading: false, canQuote: false })
    render(
      <MemoryRouter initialEntries={['/private']}>
        <Routes>
          <Route path="/login" element={<div data-testid="login-page">Login Page</div>} />
          <Route 
            path="/private" 
            element={
              <PrivateRoute redirectTo="/login">
                <div data-testid="private-content">Private Content</div>
              </PrivateRoute>
            } 
          />
        </Routes>
      </MemoryRouter>
    )
    expect(screen.getByTestId('login-page')).toBeInTheDocument()
  })

  it('renders children when authenticated', () => {
    vi.mocked(useAuth).mockReturnValue({ isAuthenticated: true, isLoading: false, canQuote: true })
    render(
      <MemoryRouter>
        <PrivateRoute>
          <div data-testid="private-content">Private Content</div>
        </PrivateRoute>
      </MemoryRouter>
    )
    expect(screen.getByTestId('private-content')).toBeInTheDocument()
  })
})
