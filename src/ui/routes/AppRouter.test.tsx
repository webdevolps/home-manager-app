import { describe, it, expect } from 'vitest'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import AppRouter, { AppRoutes } from '@/ui/routes/AppRouter'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { ModalProvider } from '@/context/ModalContext'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'

const mockStore = configureStore({
  reducer: (state = {}) => state
})

describe('AppRouter', () => {
  it('renders landing page by default', () => {
    render(
      <Provider store={mockStore}>
        <ModalProvider>
          <AppRouter />
        </ModalProvider>
      </Provider>
    )
    expect(screen.getByRole('heading', { name: /^Agnes$/i })).toBeInTheDocument()
  })

  it('renders ExceptionPage for unknown routes', () => {
    render(
      <Provider store={mockStore}>
        <ModalProvider>
          <MemoryRouter initialEntries={['/unknown']}>
            <AppRoutes />
          </MemoryRouter>
        </ModalProvider>
      </Provider>
    )
    expect(screen.getByText('404')).toBeInTheDocument()
  })
})
