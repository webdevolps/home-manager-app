import { describe, it, expect } from 'vitest'
import { apiClient } from '@infrastructure/services/api.client'

describe('API Client', () => {
  it('should be initialized with the correct baseURL', () => {
    expect(apiClient.defaults.baseURL).toBe('http://localhost:8080/api')
  })

  it('should have the correct default headers', () => {
    expect(apiClient.defaults.headers['Content-Type']).toBe('application/json')
  })

  it('should add Authorization header if token exists in localStorage', async () => {
    const token = 'test-token'
    localStorage.setItem('token', token)
    
    // We need to trigger a request to run the interceptor
    // Since we are using axios instance, we can check the handlers
    const interceptor = (apiClient.interceptors.request as any).handlers[0]
    const config = await interceptor.fulfilled({ headers: {} })
    
    expect(config.headers.Authorization).toBe(`Bearer ${token}`)
    localStorage.removeItem('token')
  })

  it('should not add Authorization header if token does not exist', async () => {
    localStorage.removeItem('token')
    const interceptor = (apiClient.interceptors.request as any).handlers[0]
    const config = await interceptor.fulfilled({ headers: {} })
    
    expect(config.headers.Authorization).toBeUndefined()
  })
})
