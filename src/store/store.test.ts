import { describe, it, expect } from 'vitest'
import { store } from '@store'

describe('Store Configuration', () => {
  it('should initialize with the correct state', () => {
    const state = store.getState()
    expect(state).toBeDefined()
    // Add specific slice state checks once slices are added
  })

  it('should have the correct dispatch function', () => {
    expect(typeof store.dispatch).toBe('function')
  })
})
