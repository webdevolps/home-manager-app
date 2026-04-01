import { describe, it, expect, vi } from 'vitest'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import PrivateRoute from '@/ui/components/hoc/PrivateRoute'
import React from 'react'

import { useAuth } from '@/hooks/useAuth'

vi.mock('@/hooks/useAuth')

describe('PrivateRoute HOC', () => {
  it('renders loading state', () => {
    vi.mocked(useAuth).mockReturnValue({ isAuthenticated: false, isLoading: true, loginUser: vi.fn(), logoutUser: vi.fn(), user: null, token: null, currentTenantId: null })
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
    vi.mocked(useAuth).mockReturnValue({ isAuthenticated: false, isLoading: false, loginUser: vi.fn(), logoutUser: vi.fn(), user: null, token: null, currentTenantId: null })
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
    vi.mocked(useAuth).mockReturnValue({ isAuthenticated: true, isLoading: false, loginUser: vi.fn(), logoutUser: vi.fn(), user: null, token: null, currentTenantId: null })
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
