import React, { PropsWithChildren } from 'react'
import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import { Provider } from 'react-redux'
import type { AppStore, RootState } from '@/store/store'
import { configureStore } from '@reduxjs/toolkit'

import authReducer from '../store/auth/authSlice'

// Re-define AppStore type if needed to allow creating a fresh store for tests
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>
  store?: AppStore
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Create a fresh store if one isn't provided
    store = configureStore({
      reducer: {
        _placeholder: (state: Record<string, unknown> = {}) => state,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        auth: authReducer as any
      },
      preloadedState,
    }) as unknown as AppStore,
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren): React.JSX.Element {
    return <Provider store={store}>{children}</Provider>
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
