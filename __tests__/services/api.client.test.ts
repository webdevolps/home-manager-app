import { describe, it, expect } from 'vitest'
import { apiClient } from '@infrastructure/services/api.client'

describe('API Client', () => {
  it('should be initialized with the correct baseURL', () => {
    expect(apiClient.defaults.baseURL).toBe('http://localhost:8080/api')
  })

  it('should have the correct default headers', () => {
    expect(apiClient.defaults.headers['Content-Type']).toBe('application/json')
  })
})
